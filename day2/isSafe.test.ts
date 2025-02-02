import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { isSafeLevel } from "./isSafe.ts";

const safeLevelTest: {
  input: [number, number, number];
  output: boolean;
}[] = [
  {
    input: [1, 2, 3],
    output: true,
  },
  {
    input: [1, 1, 3],
    output: false,
  },
  {
    input: [2, 5, 8],
    output: true,
  },
  {
    input: [1, 5, 8],
    output: false,
  },
];

describe("Safe level", () => {
  safeLevelTest.forEach((t) => {
    const [prev, current, next] = t.input;
    it(`returns ${t.output} for ${JSON.stringify(t.input)}`, () => {
      expect(isSafeLevel(prev, current, next)).toBe(t.output);
    });
  });
});
