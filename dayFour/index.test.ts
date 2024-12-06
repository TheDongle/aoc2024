import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import solveWordsearchOneDirection from "./index.ts";
import { searchOneDirection } from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const mainTests: {
  name: string;
  input: string;
  output1: number;
  output2: number;
}[] = [
  {
    name: "Tutorial",
    input: "./dayFour/example.txt",
    output1: 18,
    output2: 9,
  },
  {
    name: "Puzzle",
    input: "./dayFour/puzzle1.txt",
    output1: answer["4"]["1"],
    output2: answer["4"]["2"],
  },
];

describe("Day Four - Part One", () => {
  mainTests.forEach((t) => {
    it(`finds ${t.output1} results in ${t.name}`, () => {
      expect(solveWordsearchOneDirection(t.input)).toBe(t.output1);
    });
  });
});

describe("Day Four - Part Two", () => {
  mainTests.forEach((t) => {
    it(`finds ${t.output2} results in ${t.name}`, () => {
      expect(solveWordsearchOneDirection(t.input, 2)).toBe(t.output2);
    });
  });
});

const thingy = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["6", "8", "9"],
];

describe("Depth First", () => {
  it("traverses E", () => {
    expect(searchOneDirection(thingy, "123", "E", [0, 0])).toBeTruthy;
  });
  it("traverses SE", () => {
    expect(searchOneDirection(thingy, "159", "SE", [0, 0])).toBeTruthy;
  });
  it("traverses S", () => {
    expect(searchOneDirection(thingy, "146", "S", [0, 0])).toBeTruthy;
  });
  it("traverses SW", () => {
    expect(searchOneDirection(thingy, "356", "SW", [0, 2])).toBeTruthy;
  });
  it("traverses W", () => {
    expect(searchOneDirection(thingy, "321", "W", [0, 2])).toBeTruthy;
  });
  it("traverses NW", () => {
    expect(searchOneDirection(thingy, "951", "NW", [2, 2])).toBeTruthy;
  });
  it("traverses N", () => {
    expect(searchOneDirection(thingy, "852", "N", [2, 1])).toBeTruthy;
  });
  it("traverses NE", () => {
    expect(searchOneDirection(thingy, "653", "NE", [2, 0])).toBeTruthy;
  });
});




