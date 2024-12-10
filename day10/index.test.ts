import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { countAccessibleTrails, countConnectedEnds } from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const trailendtests: {
  input: { trailMap: string[]; row: number; col: number };
  output: number;
}[] = [
  {
    input: {
      trailMap: [
        "...0...",
        "...1...",
        "...2...",
        "6543456",
        "7.....7",
        "8.....8",
        "9.....9",
      ],
      row: 0,
      col: 3,
    },
    output: 2,
  },
  {
    input: {
      trailMap: [
        "..90..9",
        "...1.98",
        "...2..7",
        "6543456",
        "765.987",
        "876....",
        "987....",
      ],
      row: 0,
      col: 3,
    },
    output: 4,
  },
  {
    input: {
      trailMap: [
        "10..9..",
        "2...8..",
        "3...7..",
        "4567654",
        "...8..3",
        "...9..2",
        ".....01",
      ],
      row: 0,
      col: 0,
    },
    output: 1,
  },
  {
    input: {
      trailMap: [
        "10..9..",
        "2...8..",
        "3...7..",
        "4567654",
        "...8..3",
        "...9..2",
        ".....01",
      ],
      row: 6,
      col: 6,
    },
    output: 2,
  },
];

describe("Count trail ends", () => {
  trailendtests.forEach((t, i) => {
    const { input, output } = t;
    const { trailMap, row, col } = input;
    it(`returns ${output} from test ${i}`, () => {
      expect(countConnectedEnds(trailMap, row, col)).toBe(output);
    });
  });
});

const mainTest: { input: string; output1: number; output2: number }[] = [
  {
    input: "./day10/example.txt",
    output1: 36,
    output2: 81,
  },
  {
    input: "./day10/puzzle.txt",
    output1: answer["10"]["1"],
    output2: answer["10"]["2"],
  },
];

describe("Day 10: Part 1", () => {
  mainTest.forEach((t) => {
    const { input, output1 } = t;
    it(`returns ${output1} from test file ${input}`, () => {
      expect(countAccessibleTrails(input)).toBe(output1);
    });
  });
});

describe("Day 10: Part 2", () => {
  mainTest.forEach((t) => {
    const { input, output2 } = t;
    it(`returns ${output2} from test file ${input}`, () => {
      expect(countAccessibleTrails(input, false)).toBe(output2);
    });
  });
});
