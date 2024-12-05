import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import solveWordSearch from "./index.ts";
import { nextPosition, type Position, traverseDepth } from "./index.ts";
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
    output2: 0,
  },
];

describe("Day Four - Part One", () => {
  mainTests.forEach((t) => {
    it(`finds ${t.output1} results in ${t.name}`, () => {
      expect(solveWordSearch(t.input)).toBe(t.output1);
    });
  });
});

// describe("Day Four - Part Two", () => {
//   mainTests.forEach((t) => {
//     it(`finds ${t.output2} results in ${t.name}`, () => {
//       expect(solveWordSearch(t.input, true)).toBe(t.output2);
//     });
//   });
// });


const thingum = [
  ["a", "b", "c", "d", "e"],
  ["aa", "bb", "cc", "dd", "ee"],
  ["aaa", "bbb", "ccc", "ddd", "eee"],
];

describe("nextPosition", () => {
  const start: Position = [1, 2];
  it("moves right", () => {
    const [row, col] = nextPosition(start, "right");
    expect(thingum[row][col]).toBe("dd");
  });
  it("moves downRight", () => {
    const [row, col] = nextPosition(start, "downRight");
    expect(thingum[row][col]).toBe("ddd");
  });
  it("moves down", () => {
    const [row, col] = nextPosition(start, "down");
    expect(thingum[row][col]).toBe("ccc");
  });
  it("moves downLeft", () => {
    const [row, col] = nextPosition(start, "downLeft");
    expect(thingum[row][col]).toBe("bbb");
  });
  it("moves left", () => {
    const [row, col] = nextPosition(start, "left");
    expect(thingum[row][col]).toBe("bb");
  });
  it("moves upLeft", () => {
    const [row, col] = nextPosition(start, "upLeft");
    expect(thingum[row][col]).toBe("b");
  });
  it("moves up", () => {
    const [row, col] = nextPosition(start, "up");
    expect(thingum[row][col]).toBe("c");
  });
  it("moves upRight", () => {
    const [row, col] = nextPosition(start, "upRight");
    expect(thingum[row][col]).toBe("d");
  });
});

const thingy = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["6", "8", "9"],
];

describe("Depth First", () => {
  it("traverses right", () => {
    expect(traverseDepth(thingy, "123", "right", [0, 0])).toBe(1);
  });
  it("traverses downRight", () => {
    expect(traverseDepth(thingy, "159", "downRight", [0, 0])).toBe(1);
  });
  it("traverses down", () => {
    expect(traverseDepth(thingy, "146", "down", [0, 0])).toBe(1);
  });
  it("traverses downLeft", () => {
    expect(traverseDepth(thingy, "356", "downLeft", [0, 2])).toBe(1);
  });
  it("traverses left", () => {
    expect(traverseDepth(thingy, "321", "left", [0, 2])).toBe(1);
  });
  it("traverses upLeft", () => {
    expect(traverseDepth(thingy, "951", "upLeft", [2, 2])).toBe(1);
  });
  it("traverses up", () => {
    expect(traverseDepth(thingy, "852", "up", [2, 1])).toBe(1);
  });
  it("traverses upRight", () => {
    expect(traverseDepth(thingy, "653", "upRight", [2, 0])).toBe(1);
  });
});




