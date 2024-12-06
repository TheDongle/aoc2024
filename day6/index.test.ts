import { describe, it } from "@std/testing/bdd";
import { parseData, partOne } from "./index.ts";
import { expect } from "@std/expect/expect";
import answer from "../spoilers.json" with { type: "json" };

const parseTest = {
  input: "./day6/example.txt",
  output: {
    position: [6, 4],
    heading: 0,
  },
};

describe("Parse Data", () => {
  const { position, heading } = parseData(parseTest.input);
  it("knows correct guard position", () => {
    expect(position).toMatchObject({ ...parseTest.output.position });
  });
  it("knows correct heading", () => {
    expect(heading).toBe(parseTest.output.heading);
  });
});

const maintests: { name: string; input: string; output: number }[] = [
  {
    name: "Tutorial",
    input: "./day6/example.txt",
    output: 41,
  },
  {
    name: "Puzzle",
    input: "./day6/puzzle.txt",
    output: answer["6"]["1"],
  },
];

describe("Part One - Main", () => {
  maintests.forEach((t) => {
    it(`returns ${t.output} for ${t.name} input`, () => {
      expect(partOne(t.input)).toBe(t.output);
    });
  });
});
