import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import {
  inBetweenDosPattern,
  mulOverAndOver,
  mulPattern,
  mulWrapper,
  numInMulPattern,
} from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const multTest = {
  input: Deno.readTextFileSync("./dayThree/example.txt"),
  output: 4,
};

describe("Mul() Pattern", () => {
  it(`gets regexp array of length ${multTest.output} from example`, () => {
    const expected = multTest.input.match(mulPattern);
    expect(expected).toHaveLength(4);
  });
});

const digitTest = {
  input: "mul(12,1)",
  output: ["12", "1"],
};

describe("Num in Mul Pattern", () => {
  it(`gets numbers ${digitTest.output} from ${digitTest.input}`, () => {
    const expected = digitTest.input.match(numInMulPattern);
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
      expect(mulOverAndOver(t.input, false)).toBe(t.output);
    });
  });
});

const dosAnddontsTests: { name: string; input: string; length: number }[] = [{
  name: "tutorial example 2",
  input: Deno.readTextFileSync("./dayThree/example2.txt"),
  length: 2,
}, {
  name: "Custom test",
  input: Deno.readTextFileSync("./dayThree/customTest.txt"),
  length: 2,
}];

describe("In between dos pattern", () => {
  dosAnddontsTests.forEach((t) => {
    const expected = t.input.match(inBetweenDosPattern);
    it(`retrieves sections of length ${t.name} from ${t.name}`, () => {
      expect(expected).toHaveLength(t.length);
    });
  });
});

const partTwoTest: { name: string; input: string; output: number }[] = [{
  name: "tutorial example",
  input: "./dayThree/example2.txt",
  output: 48,
}, {
  name: "puzzle input",
  input: "./dayThree/puzzle1.txt",
  output: answer["3"]["2"],
}, {
  name: "custom test 1",
  input: "./dayThree/customTest.txt",
  output: 14,
}];

describe("Part Two - Main", () => {
  partTwoTest.forEach((t) => {
    it(`returns ${t.output} from ${t.name}`, () => {
      expect(mulOverAndOver(t.input, true)).toBe(t.output);
    });
  });
});
