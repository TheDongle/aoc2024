import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { mapDistance } from "./mapper.ts";
import answer from "../spoilers.json" with { type: "json" };

const samples = [
  {
    input: Deno.readTextFileSync("./dayOne/sample1.txt"),
    length: 6,
    output: 11,
  },
  {
    input: Deno.readTextFileSync("./dayOne/sample2.txt"),
    length: 2,
    output: 0,
  },
  {
    input: Deno.readTextFileSync("./dayOne/puzzle1.txt"),
    length: 1000,
    output: answer["1"]["1"],
  },
];

describe("Day one - part One", () => {
  describe("Get Sorted Arrays", () => {
    samples.forEach((sample) => {
      const listOne = Object.values(mapDistance(sample.input)).map((v) => v[0]);
      const listTwo = Object.values(mapDistance(sample.input)).map((v) => v[1]);
      it(`outputs arrays of length ${sample.length}`, () => {
        expect(listOne.length).toBe(sample.length);
        expect(listTwo.length).toBe(sample.length);
      });
      it("Outputs sorted arrays", () => {
        expect({ ...listOne }).toMatchObject({
          ...listOne.toSorted((a, b) => a - b),
        });
        expect({ ...listTwo }).toMatchObject({
          ...listTwo.toSorted((a, b) => a - b),
        });
      });
    });
  });
});
