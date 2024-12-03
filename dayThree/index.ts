import matchEach from "../dayOne/matcher.ts";

export const mulPattern = /mul\(\d{1,3},\d{1,3}\)/g;

export const numInMulPattern = /\d+/g;

export const inBetweenDosPattern = /(do\(\)|^).*?(don't\(\)|$)/gs

export const numInMullPattern = /\d+/g;

export function mulWrapper(mulFn: string): number {
  const [num1, num2] = mulFn.match(numInMullPattern) ?? ["0", "0"];
  return parseInt(num1) * parseInt(num2);
}

function mullOver(text: string, pattern: RegExp): string {
  let filtered = "";
  matchEach(text, pattern, (v) => {
    filtered += v;
  });
  return filtered;
}

export function mulOverAndOver(path: string, filter: boolean): number {
  let text = Deno.readTextFileSync(path);
  if (filter) {
    text = mullOver(text, inBetweenDosPattern);
  }
  let sum = 0;
  matchEach(text, mulPattern, (v) => {
    sum += mulWrapper(v);
  });
  return sum;
}
