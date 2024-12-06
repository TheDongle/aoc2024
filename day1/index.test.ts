import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import LocationLists from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

export const partOneSamples = [
  {
    input: "./day1/sample1.txt",
    length: 6,
    output: 11,
  },
  {
    input: "./day1/sample2.txt",
    length: 2,
    output: 0,
  },
  {
    input: "./day1/puzzle.txt",
    length: 1000,
    output: answer["1"]["1"],
  },
];

describe("Day One - Part 1", () => {
  partOneSamples.forEach((sample) => {
    it(`returns expected output ${sample.output}`, () => {
      expect(LocationLists(sample.input, "distance")).toBe(sample.output);
    });
  });
});

describe("Day one - Part 2", () => {
  const partTwoSamples = [
    {
      input: "./day1/sample1.txt",
      output: 31,
    },
    {
      input: "./day1/puzzle.txt",
      output: answer["1"]["2"],
    },
  ];
  describe("Main component", () => {
    partTwoSamples.forEach((sample) => {
      it(`returns expected output ${sample.output}`, () => {
        expect(LocationLists(sample.input, "similarity")).toBe(
          sample.output,
        );
      });
    });
  });
});
