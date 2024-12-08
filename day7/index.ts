import TextParser from "../day2/parse.ts";

// Parsing the data
type StrippedEquation = { target: number; values: number[] };

const getEquations = (path: string): StrippedEquation[] => (
  Array.from(
    new TextParser(path).numberArrays(),
    (v) => ({ target: v[0], values: v.slice(1) }),
  )
);

// using functions to stand-in for missing operators
export type Operation = (arg0: number, arg1: number) => number;

export const operations = {
  "mul": (prev: number, next: number) => prev * next,
  "sum": (prev: number, next: number) => prev + next,
  "concat": (prev: number, next: number) => parseInt(`${prev}${next}`),
} as const satisfies Record<"mul" | "sum" | "concat", Operation>;

// Need the queue to be initialised with at least one value
// that way the operations formulae don't have to account for undefined
export class Queue {
  private arr: number[];
  constructor(value: number, ...values: number[]) {
    this.arr = [value, ...values];
  }
  get value(): number[] {
    return this.arr;
  }
  get length(): number {
    return this.arr.length;
  }
  includes(value: number): boolean {
    return this.arr.includes(value);
  }
  update(
    ops: Operation[],
    target: number,
    currentValue: number,
  ): void {
    const nextQueue: number[] = [];
    for (let i = 0; i < this.arr.length; i++) {
      for (const fn of ops) {
        const calculated = fn(this.arr[i], currentValue);
        if (calculated <= target) {
          nextQueue.push(calculated);
        }
      }
    }
    this.arr = nextQueue;
  }
}

// Main function works for part 1 and part 2
// missing operators are parametised as rest arguments
export function sumOfValidEquations(
  path: string,
  ...operations: Operation[]
): number {
  const equations = getEquations(path);
  let total = 0;
  for (const eq of equations) {
    const { target, values } = eq;
    const queue = new Queue(values[0]);
    let i = 1;
    while (i < values.length && 0 < queue.length) {
      queue.update(operations, target, values[i]);
      i++;
    }
    total += queue.includes(target) ? target : 0;
  }
  return total;
}
