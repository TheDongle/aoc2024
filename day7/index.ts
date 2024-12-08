import TextParser from "../day2/parse.ts";
import { mul } from "../day3/index.ts";

// Parsing the data
type StrippedEquation = { target: number; values: number[] };

const getEquations = (path: string): StrippedEquation[] => (
  Array.from(
    new TextParser(path).numberArrays(),
    (v) => ({ target: v[0], values: v.slice(1) }),
  )
);

// using functions to stand-in for missing operators
type Operation = (arg0: number, arg1: number) => number;

// I thought it would be funny to import "mul()"
const operations = {
  mul,
  "sum": (prev: number, next: number) => prev + next,
  "concat": (prev: number, next: number) => parseInt(`${prev}${next}`),
} as const satisfies Record<"mul" | "sum" | "concat", Operation>;

// cycles through all possible operations for a value and the last value/s
function updateQueue(
  queue: number[],
  currentValue: number,
  target: number,
  ...operations: Operation[]
): number[] {
  const nextQueue: number[] = [];
  for (let i = 0; i < queue.length; i++) {
    for (const fn of operations) {
      const calculated = fn(queue[i], currentValue);
      if (calculated <= target) {
        nextQueue.push(calculated);
      }
    }
  }
  return nextQueue;
}

// Main function works for part 1 and part 2
// missing operators are parametised as rest arguments
function sumOfValidEquations(
  path: string,
  ...operations: Operation[]
): number {
  const equations = getEquations(path);
  let total = 0;
  for (const eq of equations) {
    const { target, values } = eq;
    let queue = [values[0]];
    let i = 1;
    while (i < values.length && 0 < queue.length) {
      queue = updateQueue(queue, values[i], target, ...operations);
      i++;
    }
    if (queue.includes(target)) {
      total += target;
    }
  }
  return total;
}

export type { Operation };
export { operations, updateQueue };
export default sumOfValidEquations;