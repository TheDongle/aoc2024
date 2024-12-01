import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { getsortedLists } from "./partOne.ts";

export const samples = [
  {
    input: "./dayOne/sample1.txt",
    length: 6,
    output: 11,
  },
  {
    input: "./dayOne/sample2.txt",
    length: 2,
    output: 0,
  },
  {
    input: "./dayOne/puzzle1.txt",
    length: 1000,
    output: 1938424,
  },
];

describe("Day one - part One", () => {
  describe("Get Sorted Arrays", () => {
    samples.forEach((sample) => {
      const [listOne, listTwo] = getsortedLists(sample.input);
      it(`outputs arrays of length ${sample.length}`, () => {
        expect(listOne.length).toBe(sample.length);
        expect(listTwo.length).toBe(sample.length);
      });
      it("Outputs sorted arrays", () => {
        expect(listOne).toMatchObject({ ...listOne.toSorted((a, b) => a - b) });
        expect(listTwo).toMatchObject({ ...listTwo.toSorted((a, b) => a - b) });
      });
    });
  });
});
