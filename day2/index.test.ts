import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import day2 from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

describe("Day Two", () => {
  const finalTest = [
    {
      input: "./day2/sample1.txt",
      output: {
        1: 2,
        2: 4,
      },
    },
    {
      input: "./day2/puzzle.txt",
      output: {
        1: answer["2"]["1"],
        2: answer["2"]["2"],
      },
    },
  ];
  describe("Part One", () => {
    finalTest.forEach((t) => {
      it(`returns safety count of ${t.output[1]} for file ${t.input}`, () => {
        expect(day2(t.input, 0)).toBe(t.output[1]);
      });
    });
  });
  describe("Part Two", () => {
    finalTest.forEach((t) => {
      it(`returns safety count of ${t.output[2]} for file ${t.input}`, () => {
        expect(day2(t.input, 1)).toBe(t.output[2]);
      });
    });
  });
});
