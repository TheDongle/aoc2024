import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import solveWordSearch from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const mainTests: { name: string; input: string; output: number }[] = [
  {
    name: "Tutorial",
    input: "./dayFour/example.txt",
    output: 18,
  },
  {
    name: "Puzzle",
    input: "./dayFour/puzzle1.txt",
    output: answer["4"]["1"],
  }
];

describe("Day Four - tutorial example", () => {
  mainTests.forEach((t) => {
    it(`finds ${t.output} results in ${t.name}`, () => {
      expect(solveWordSearch(t.input)).toBe(t.output);
    });
  });
});
