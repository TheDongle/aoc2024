import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import {
  mulOverAndOver,
  mulPattern,
  mulWrapper,
  numInMullPattern,
} from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const multTest = {
  input: Deno.readTextFileSync("./dayThree/example.txt"),
  output: 4,
};

describe("Mul() Pattern", () => {
  it(`gets regexp array of length ${multTest.output} from example`, () => {
    const expected = multTest.input.match(mulPattern);
    console.log(expected);
    expect(expected).toHaveLength(4);
  });
});

const digitTest = {
  input: "mul(12,1)",
  output: ["12", "1"],
};

describe("Num in Mul Pattern", () => {
  it(`gets numbers ${digitTest.output} from ${digitTest.input}`, () => {
    const expected = digitTest.input.match(numInMullPattern);
    expect(expected).toMatchObject({ ...digitTest.output });
  });
});

const wrappertests: { input: string; output: number }[] = [{
  input: "mul(12,1)",
  output: 12,
}, {
  input: "mul(0,0)",
  output: 0,
}, {
  input: "mul(121,2)",
  output: 242,
}];

describe("mulwrapper", () => {
  wrappertests.forEach((t) => {
    it(`correctly multiplies ${t.input}`, () => {
      expect(mulWrapper(t.input)).toBe(t.output);
    });
  });
});

const partOneTest: { name: string; input: string; output: number }[] = [{
  name: "tutorial example",
  input: "./dayThree/example.txt",
  output: 161,
}, {
  name: "puzzle input",
  input: "./dayThree/puzzle1.txt",
  output: answer["3"]["1"],
}];

describe("Part one - Main", () => {
  partOneTest.forEach((t) => {
    it(`returns ${t.output} from ${t.name}`, () => {
      expect(mulOverAndOver(t.input)).toBe(t.output);
    });
  });
});
