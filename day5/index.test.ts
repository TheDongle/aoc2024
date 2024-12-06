import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import {
  default as mainMan,
  manMiddle,
  sortMan,
  defineMan,
} from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const manTest = [61, 53, 29, 0, 0, 0];

const { rules, manuals } = defineMan("./day5/example.txt");

describe("single Manual result", () => {
  manTest.forEach((v, i) => {
    const man = manuals[i];
    it(`returns ${v} from row ${man}`, () => {
      expect(manMiddle(rules, man, "ordered")).toBe(v);
    });
  });
});

describe("Part One", () => {
  it("Solves the tutorial", () => {
    expect(mainMan("./day5/example.txt", "ordered")).toBe(143);
  });
  it("Solves the puzzle", () => {
    expect(mainMan("./day5/puzzle.txt", "ordered")).toBe(
      answer["5"]["1"],
    );
  });
});

describe("Part Two", () => {
  it("Solves the tutorial", () => {
    expect(mainMan("./day5/example.txt", "unordered")).toBe(123);
  });
  it("Solves the puzzle", () => {
    expect(mainMan("./day5/puzzle.txt", "unordered")).toBe(
      answer["5"]["2"],
    );
  });
});

const sortTests: { input: number[]; output: number[] }[] = [
  {
    input: [75, 97, 47, 61, 53],
    output: [97, 75, 47, 61, 53],
  },
  {
    input: [61, 13, 29],
    output: [61, 29, 13],
  },
  {
    input: [97, 13, 75, 29, 47],
    output: [97, 75, 47, 29, 13],
  },
];

describe("Sort tests", () => {
  sortTests.forEach((t) => {
    it(`sorts ${t.input} into ${t.output}`, () => {
      expect(sortMan(t.input, rules)).toMatchObject({ ...t.output });
    });
  });
});
