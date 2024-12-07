import { expect } from "@std/expect";
import {
  type Operation,
  operations,
  sumOfValidEquations,
  updateQueue,
} from "./index.ts";
import { describe, it } from "@std/testing/bdd";
import answer from "../spoilers.json" with { type: "json" };

const updateQueueTest: {
  input: {
    ops: Operation[];
    target: number;
    currentValue: number;
    queue: (number | undefined)[];
  };
  output: number[];
}[] = [
  {
    input: {
      ops: [operations["mul"], operations["sum"]],
      target: 0,
      currentValue: 1,
      queue: [undefined],
    },
    output: [],
  },
  {
    input: {
      ops: [operations["mul"], operations["sum"]],
      target: 1,
      currentValue: 1,
      queue: [undefined],
    },
    output: [1],
  },
  {
    input: {
      ops: [operations["mul"], operations["sum"]],
      target: 2,
      currentValue: 1,
      queue: [1],
    },
    output: [1, 2],
  },
  {
    input: {
      ops: [operations["mul"], operations["sum"]],
      target: 3,
      currentValue: 2,
      queue: [1, 2],
    },
    output: [2, 3],
  },
  {
    input: {
      ops: [operations["mul"], operations["sum"], operations["concat"]],
      target: 11,
      currentValue: 1,
      queue: [1],
    },
    output: [1, 2, 11],
  },
];

describe("Update Queue", () => {
  updateQueueTest.forEach((t) => {
    const { ops, target, currentValue, queue } = t.input;
    it(`returns update queue ${JSON.stringify(t.output)}`, () => {
      const expected = updateQueue(ops, target, currentValue, queue);
      // console.log(expected);
      expect(expected).toMatchObject({
        ...t.output,
      });
    });
  });
});

const mainTests: {
  name: string;
  input: string;
  output1: number;
  output2: number;
}[] = [
  {
    name: "tutorial",
    input: "./day7/example.txt",
    output1: 3749,
    output2: 11387,
  },
  {
    name: "puzzle",
    input: "./day7/puzzle.txt",
    output1: answer["7"]["1"],
    output2: answer["7"]["2"],
  },
];

describe("Day 7 - Main", () => {
  mainTests.forEach((t) => {
    it(`passes the ${t.name} for Part One`, () => {
      expect(sumOfValidEquations(t.input, operations["mul"], operations["sum"]))
        .toBe(
          t.output1,
        );
    });
    it(`passes the ${t.name} for Part Two`, () => {
      expect(
        sumOfValidEquations(
          t.input,
          operations["mul"],
          operations["sum"],
          operations["concat"],
        ),
      )
        .toBe(
          t.output2,
        );
    });
  });
});
