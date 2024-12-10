import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { countAllTrailHeads, followTrail } from "./index.ts";
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
      expect(followTrail(trailMap, row, col)).toBe(output);
    });
  });
});

const mainTest: { input: string; output: number }[] = [
  {
    input: "./day10/example.txt",
    output: 36,
  },
  {
    input: "./day10/puzzle.txt",
    output: answer["10"]["1"],
  },
];

describe("Day 10: Part 1", () => {
  mainTest.forEach((t) => {
    const { input, output } = t;
    it(`returns ${output} from test file ${input}`, () => {
      expect(countAllTrailHeads(input)).toBe(output);
    });
  });
});
