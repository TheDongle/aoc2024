import TextParser from "../day2/parse.ts";

// Parsing the data
type StrippedEquation = { target: number; values: number[] };

const getEquations = (path: string): StrippedEquation[] => (
  Array.from(
    new TextParser(path).numberArrays(),
    (v) => ({ target: v[0], values: v.slice(1) }),
  )
);

// Queue starts with one empty space
class Queue extends Array {
  constructor() {
    super(1);
  }
}

// using functions to stand-in for missing operators
export type Operation = (arg0: number, arg1?: number) => number;

export const operations = {
  "mul": (a: number, dequeued = 1) => a * dequeued,
  "sum": (a: number, dequeued = 0) => a + dequeued,
  "concat": (a: number, dequeued?: number) => parseInt(`${dequeued}${a}`),
} as const satisfies Record<"mul" | "sum" | "concat", Operation>;

export function updateQueue(
  ops: Operation[],
  target: number,
  currentValue: number,
  queue: Queue,
): number[] {
  const nextQueue: number[] = [];
  for (let i = 0; i < queue.length; i++) {
    for (const fn of ops) {
      const calculated = fn(currentValue, queue[i]);
      if (calculated <= target) {
        nextQueue.push(calculated);
      }
    }
  }
  return nextQueue;
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
    let queue = new Queue();
    let i = 0;
    while (i < values.length && 0 < queue.length) {
      queue = updateQueue(operations, target, values[i], queue);
      i++;
    }
    total += queue.includes(target) ? target : 0;
  }
  return total;
}
