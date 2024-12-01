import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import {
  distanceBetweenLists,
  getSimilarity,
  parseListsToSorted,
  readfile,
} from "./index.ts";

describe("Day one - part One", () => {
  const samples = [
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
  describe("Read file", () => {
    const read = readfile(samples[0].input);
    it("outputs string type", () => {
      expect(typeof read).toBe("string");
    });
    it("outputs string of length greater than 0", () => {
      expect(read.length).toBeGreaterThan(0);
    });
  });
  describe("parse and sort", () => {
    samples.forEach((sample) => {
      const [listOne, listTwo] = parseListsToSorted(readfile(sample.input));
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
  describe("Main component", () => {
    samples.forEach((sample) => {
      it(`returns expected output ${sample.output}`, () => {
        expect(distanceBetweenLists(sample.input)).toBe(sample.output);
      });
    });
  });
});

describe("Day one - Part 2", () => {
  const samples = [
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
    samples.forEach((sample) => {
      it(`returns expected output ${sample.output}`, () => {
        expect(getSimilarity(sample.input)).toBe(sample.output);
      });
    });
  });
});
