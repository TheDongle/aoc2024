import { describe, it } from "@std/testing/bdd";
import { default as main } from "./index.ts";
import { expect } from "@std/expect/expect";
import answer from "../spoilers.json" with { type: "json" };

const maintests: {
  name: string;
  input: string;
  output1: number;
  output2: number;
}[] = [
  {
    name: "Tutorial",
    input: "./day6/example.txt",
    output1: 41,
    output2: 6,
  },
  {
    name: "Puzzle",
    input: "./day6/puzzle.txt",
    output1: answer["6"]["1"],
    output2: 0,
  },
];

describe("Main", () => {
  describe("Part One", () => {
    maintests.forEach((t) => {
      it(`returns ${t.output1} for ${t.name} input`, () => {
        expect(main(t.input)).toBe(t.output1);
      });
    });
  });
  // describe("Part two", () => {
  //   maintests.forEach((t) => {
  //     it(`returns ${t.output2} for ${t.name} input`, () => {
  //       expect(main(t.input, true)).toBe(t.output2);
  //     });
  //   });
  // });
});
