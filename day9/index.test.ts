import {
  default as day9,
} from "./index.ts";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import answer from "../spoilers.json" with { type: "json" };

// describe("Decode Disk Map", () => {
//   const input = Deno.readTextFileSync("./day9/example.txt");
//   it(`outputs decoded disk map from tutorial`, () => {
//     expect({ ...decodeDiskMap(input) }).toMatchObject({
//       ...Array.from(
//         "00...111...2...333.44.5555.6666.777.888899".split(""),
//         (v) => /\d/.test(v) ? parseInt(v) : undefined,
//       ),
//     });
//   });
// });

// describe("Draw Graph", () => {
//   const map = drawFileSizeGraph("2020305");
//   const keys = [...map.keys()];
//   const vals = [...map.values()];
//   it(`ordered last size as first`, () => {
//     expect(keys[0]).toBe(5);
//   });
//   it(`ordered first size as last key`, () => {
//     expect(keys.at(-1)).toBe(2);
//   });
// });

// const compactTestInput = Array.from(
//   "00...111...2...333.44.5555.6666.777.888899".split(""),
//   (v) => /\d/.test(v) ? parseInt(v) : undefined,
// );

// describe("Compact files", () => {
//   it(`outputs compacted file system from tutorial`, () => {
//     expect(
//       compactFiles(compactTestInput).join("").padEnd(
//         compactTestInput.length,
//         ".",
//       ),
//     ).toBe(
//       "0099811188827773336446555566..............",
//     );
//   });
// });

// describe("Update File System checksum", () => {
//   it(`outputs total from tutorial`, () => {
//     expect(
//       updateFileSystemChecksum(
//         Array.from(
//           "0099811188827773336446555566..............".split(""),
//           (v) => /\d/.test(v) ? parseInt(v) : undefined,
//         ),
//       ),
//     ).toBe(
//       1928,
//     );
//   });
// });

const mainTests: { input: string; name: string; output: number }[] = [
  {
    name: "tutorial",
    input: "./day9/example.txt",
    output: 1928,
  },
  {
    name: "puzzle",
    input: "./day9/puzzle.txt",
    output: answer["9"]["1"],
  },
];

describe("Day 9 part 1", () => {
  mainTests.forEach((t) => {
    it(`${t.name} sample returns ${t.output}`, () => {
      expect(day9(t.input)).toBe(t.output);
    });
  });
});

// const mainTests2: { input: string; name: string; output: number }[] = [
//   {
//     name: "tutorial",
//     input: "./day9/example.txt",
//     output: 2858,
//   },
//   {
//     name: "puzzle",
//     input: "./day9/puzzle.txt",
//     output: answer["9"]["2"],
//   },
// ];

// describe("Day 9 part 2", () => {
//   mainTests2.forEach((t) => {
//     it(`${t.name} sample returns ${t.output}`, () => {
//       expect(day9Part2(t.input)).toBe(t.output);
//     });
//   });
// });
