import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import answer from "../spoilers.json" with { type: "json" };
import { countAntiNodes, whichWayIs } from "./index.ts";

const relationshipTest: {
  input: { position: [number, number]; comparePosition: [number, number] };
  output: string;
}[] = [
  {
    input: {
      position: [0, 0],
      comparePosition: [0, 1],
    },
    output: "E",
  },
  {
    input: {
      position: [0, 1],
      comparePosition: [0, 0],
    },
    output: "W",
  },
  {
    input: {
      position: [0, 0],
      comparePosition: [1, 0],
    },
    output: "S",
  },
  {
    input: {
      position: [1, 0],
      comparePosition: [0, 0],
    },
    output: "N",
  },
  {
    input: {
      position: [0, 0],
      comparePosition: [1, 1],
    },
    output: "SE",
  },
  {
    input: {
      position: [1, 1],
      comparePosition: [0, 0],
    },
    output: "NW",
  },
  {
    input: {
      position: [0, 1],
      comparePosition: [1, 0],
    },
    output: "SW",
  },
  {
    input: {
      position: [1, 0],
      comparePosition: [0, 1],
    },
    output: "NE",
  },
];

describe("Which way", () => {
  relationshipTest.forEach((t) => {
    const { input, output } = t;
    const { position, comparePosition } = input;
    it(`recognises that ${comparePosition} is ${output} of ${position}`, () => {
      expect(whichWayIs(position, comparePosition)).toBe(output);
    });
  });
});

// const antinodeTest: {
//   input: { position: [number, number]; comparePosition: [number, number] };
//   output: [[number, number], [number, number]];
// }[] = [
//   {
//     input: {
//       position: [0, 2],
//       comparePosition: [0, 3],
//     },
//     output: [[0, 1], [0, 4]],
//   },
//   {
//     input: {
//       position: [1, 0],
//       comparePosition: [2, 0],
//     },
//     output: [[0, 0], [3, 0]],
//   },
//   {
//     input: {
//       position: [1, 1],
//       comparePosition: [2, 2],
//     },
//     output: [[0, 0], [3, 3]],
//   },
//   {
//     input: {
//       position: [1, 2],
//       comparePosition: [2, 1],
//     },
//     output: [[0, 3], [3, 0]],
//   },
//   {
//     input: {
//       position: [5, 5],
//       comparePosition: [8, 10],
//     },
//     output: [[2, 0], [11, 15]],
//   },
// ];

// describe("Antenns", () => {
//   antinodeTest.forEach((t) => {
//     const map = Array(100).fill("".padEnd(100," "))
//     const { input, output } = t;
//     const { position, comparePosition } = input;
//     it(`retrieves antinode coordinates for ${position} & ${comparePosition}`, () => {
//       expect(findAntiNodes(position, comparePosition, map)).toMatchObject({
//         ...output,
//       });
//     });
//   });
// });

const mainTest: { input: string; name: string; output1: number, output2: number }[] = [
  {
    "name": "tutorial example",
    "input": "./day8/example.txt",
    "output1": 14,
    "output2": 34
  },
  {
    "name": "Puzzle",
    "input": "./day8/puzzle.txt",
    "output1": answer["8"]["1"],
    "output2": answer["8"]["2"]
  },
];

describe("Day 8 Part One", () => {
  mainTest.forEach((t) => {
    it(`gets ${t.output1} from ${t.name}`, () => {
      expect(countAntiNodes(t.input)).toBe(t.output1);
    });
  });
});

// describe("Day 8 Part Two", () => {
//   mainTest.forEach((t) => {
//     it(`gets ${t.output2} from ${t.name}`, () => {
//       expect(countAntiNodes(t.input, true)).toBe(t.output2);
//     });
//   });
// });
