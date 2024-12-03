import matchEach from "../dayOne/matcher.ts";

export const mulArgsPattern = /\d+/g;

export const mulFnPattern = /mul\(\d{1,3},\d{1,3}\)/g;

export const filterPattern = /(do\(\)|^).*?(don't\(\)|$)/gs;

export function mul(mulString: string): number {
  const [num1, num2] = mulString.match(mulArgsPattern) ?? ["0", "0"];
  return parseInt(num1) * parseInt(num2);
}

function mulOver(text: string, pattern: RegExp): string {
  let filtered = "";
  matchEach(text, pattern, (v) => {
    filtered += v;
  });
  return filtered;
}

export function mulOverAndOver(path: string, filter: boolean): number {
  let text = Deno.readTextFileSync(path);
  if (filter) {
    text = mulOver(text, filterPattern);
  }
  let sum = 0;
  matchEach(text, mulFnPattern, (v) => {
    sum += mul(v);
  });
  return sum;
}
