import matchEach from "../dayOne/matcher.ts";

export const mulPattern = /mul\(\d{1,3},\d{1,3}\)/g;

export const numInMullPattern = /\d+/g;

export const inBetweenDosPattern = /(do\(\)|^).*?(don't\(\)|$)/

export function mulWrapper(mulFn: string): number {
  const [num1, num2] = mulFn.match(numInMullPattern) ?? ["0", "0"];
  return parseInt(num1) * parseInt(num2);
}

export function mulOverAndOver(path: string): number {
  const text = Deno.readTextFileSync(path);
  let sum = 0;
  matchEach(text, mulPattern, (v) => {
    sum += mulWrapper(v);
  });
  return sum;
}
