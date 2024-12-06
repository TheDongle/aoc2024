import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { nextPosition, type Position } from "./compass.ts";

const positionTest = [
  ["a", "b", "c", "d", "e"],
  ["aa", "bb", "cc", "dd", "ee"],
  ["aaa", "bbb", "ccc", "ddd", "eee"],
];

describe("nextPosition", () => {
  const start: Position = [1, 2];
  it("moves E", () => {
    const [row, col] = nextPosition(start, "E");
    expect(positionTest[row][col]).toBe("dd");
  });
  it("moves SE", () => {
    const [row, col] = nextPosition(start, "SE");
    expect(positionTest[row][col]).toBe("ddd");
  });
  it("moves S", () => {
    const [row, col] = nextPosition(start, "S");
    expect(positionTest[row][col]).toBe("ccc");
  });
  it("moves SW", () => {
    const [row, col] = nextPosition(start, "SW");
    expect(positionTest[row][col]).toBe("bbb");
  });
  it("moves W", () => {
    const [row, col] = nextPosition(start, "W");
    expect(positionTest[row][col]).toBe("bb");
  });
  it("moves NW", () => {
    const [row, col] = nextPosition(start, "NW");
    expect(positionTest[row][col]).toBe("b");
  });
  it("moves N", () => {
    const [row, col] = nextPosition(start, "N");
    expect(positionTest[row][col]).toBe("c");
  });
  it("moves NE", () => {
    const [row, col] = nextPosition(start, "NE");
    expect(positionTest[row][col]).toBe("d");
  });
});
