import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import {
  blinkAtStones,
  getNextEngraving,
} from "./index.ts";

import answer from "../spoilers.json" with { type: "json" };

const blinkTests: { input: number; output: number[] }[] = [
  {
    input: 0,
    output: [1],
  },
  {
    input: 1,
    output: [2024],
  },
  {
    input: 2,
    output: [4048],
  },
  {
    input: 2024,
    output: [20, 24],
  },
  {
    input: 202,
    output: [408848],
  },
  {
    input: 123123,
    output: [123, 123],
  },
  {
    input: 123000,
    output: [123, 0],
  },
];

describe("Next engraving", () => {
  blinkTests.forEach((t) => {
    it(`transforms ${t.input} into ${t.output} after one blink`, () => {
      expect(getNextEngraving(t.input)).toMatchObject({ ...t.output });
    });
  });
});


const maintests: { input: { path: string; blinks: number }; output: number }[] =
  [
    {
      input: {
        path: "./day11/example1.txt",
        blinks: 1,
      },
      output: 3,
    },
    {
      input: {
        path: "./day11/example1.txt",
        blinks: 2,
      },
      output: 4,
    },
    {
      input: {
        path: "./day11/example1.txt",
        blinks: 6,
      },
      output: 22,
    },
    {
      input: {
        path: "./day11/example1.txt",
        blinks: 25,
      },
      output: 55312,
    },
    {
      input: {
        path: "./day11/puzzle.txt",
        blinks: 25,
      },
      output: answer["11"]["1"],
    },
    // {
    //   input: {
    //     path: "./day11/puzzle.txt",
    //     blinks: 75,
    //   },
    //   output: 0,
    // },
  ];

describe("Main - Part One", () => {
  maintests.forEach((t) => {
    const { input, output } = t;
    const { path, blinks } = input;
    it(`returns total ${output} when blinking ${blinks} times at example file ${path}`, () => {
      expect(blinkAtStones(path, blinks)).toBe(output);
    });
  });
});
