import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { nextPosition } from "./compass.ts";

const positionTest = [
  ["a", "b", "c", "d", "e"],
  ["aa", "bb", "cc", "dd", "ee"],
  ["aaa", "bbb", "ccc", "ddd", "eee"],
];

describe("nextPosition", () => {
  const start: [number, number] = [1, 2];
  it("moves E", () => {
    const [row, col] = nextPosition(start[0], start[1], "E");
    expect(positionTest[row][col]).toBe("dd");
  });
  it("moves SE", () => {
    const [row, col] = nextPosition(start[0], start[1], "SE");
    expect(positionTest[row][col]).toBe("ddd");
  });
  it("moves S", () => {
    const [row, col] = nextPosition(start[0], start[1], "S");
    expect(positionTest[row][col]).toBe("ccc");
  });
  it("moves SW", () => {
    const [row, col] = nextPosition(start[0], start[1], "SW");
    expect(positionTest[row][col]).toBe("bbb");
  });
  it("moves W", () => {
    const [row, col] = nextPosition(start[0], start[1], "W");
    expect(positionTest[row][col]).toBe("bb");
  });
  it("moves NW", () => {
    const [row, col] = nextPosition(start[0], start[1], "NW");
    expect(positionTest[row][col]).toBe("b");
  });
  it("moves N", () => {
    const [row, col] = nextPosition(start[0], start[1], "N");
    expect(positionTest[row][col]).toBe("c");
  });
  it("moves NE", () => {
    const [row, col] = nextPosition(start[0], start[1], "NE");
    expect(positionTest[row][col]).toBe("d");
  });
});
