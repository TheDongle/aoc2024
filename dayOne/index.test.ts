import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { samples as partOneSamples } from "./partOne.test.ts";
import LocationLists from "./index.ts";

describe("Day One - Part 1", () => {
  partOneSamples.forEach((sample) => {
    it(`returns expected output ${sample.output}`, () => {
      expect(LocationLists.distanceBetween(sample.input)).toBe(sample.output);
    });
  });
});

describe("Day one - Part 2", () => {
  const partTwoSamples = [
    {
      input: "./dayOne/sample1.txt",
      output: 31,
    },
    {
      input: "./dayOne/puzzle1.txt",
      output: 22014209,
    },
  ];
  describe("Main component", () => {
    partTwoSamples.forEach((sample) => {
      it(`returns expected output ${sample.output}`, () => {
        expect(LocationLists.similarityBetween(sample.input)).toBe(
          sample.output,
        );
      });
    });
  });
});
