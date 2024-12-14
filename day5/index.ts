import TextParser from "../day2/parse.ts";
import { mergeSort } from "./sort.ts";

type Rules = Map<number, Set<number>>;
type Manuals = number[][];

function defineMan(path: string): { rules: Rules; manuals: Manuals } {
  const data = new TextParser(path).numberArrays();
  const splitPoint = data.findIndex((x) => x.length === 0);
  const rules: Rules = new Map();
  for (const [first, second] of data.slice(0, splitPoint)) {
    rules.set(first, (rules.get(first) ?? new Set<number>()).add(second));
  }
  return { rules, manuals: data.slice(splitPoint + 1) };
}

const sortMan = (manual: number[], rules: Rules): number[] =>
  mergeSort(
    manual.slice(),
    (a, b) => rules.get(a)?.has(b) ? -1 : rules.get(b)?.has(a) ? 1 : 0,
  );

function manMiddle(
  rules: Rules,
  manual: number[],
  middlesOf: "ordered" | "unordered",
): number {
  const sorted = sortMan(manual, rules);
  if (manEqual(sorted, manual)) {
    return middlesOf === "ordered" ? sorted[Math.floor(manual.length / 2)] : 0;
  }
  return middlesOf === "unordered" ? sorted[Math.floor(manual.length / 2)] : 0;
}

function manEqual(a: number[], b: number[]): boolean {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function mainMan(
  path: string,
  middlesOf: "ordered" | "unordered",
): number {
  const { manuals, rules } = defineMan(path);
  return manuals.reduce((a, b) => a + manMiddle(rules, b, middlesOf), 0);
}

export { defineMan, manMiddle, sortMan };
export default mainMan;
