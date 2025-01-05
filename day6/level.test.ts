import { StringMap } from "./level.ts";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect/expect";

const parseTest = {
  input: "./day6/example.txt",
  output: {
    position: [6, 4],
  },
};

describe("String Map", () => {
  const level = new StringMap(parseTest.input);
  const position = level.findCharacter("guard");
  it("can find guard position", () => {
    expect(position).toMatchObject({ ...parseTest.output.position });
  });
  it("describes obstacles", () => {
    expect(level.characterAt([0, 4])).toBe("obstacle");
  });
  it("describes empty space", () => {
    expect(level.characterAt([0, 0])).toBe("space");
  });
  it("describes top wall", () => {
    expect(level.characterAt([-1, 0])).toBe("wall");
  });
  it("describes left wall", () => {
    expect(level.characterAt([0, -1])).toBe("wall");
  });
  it("describes bottom wall", () => {
    expect(level.characterAt([level.rowLength, 0])).toBe("wall");
  });
  it("describes right wall", () => {
    expect(level.characterAt([0, level.colLength])).toBe("wall");
  });
  it("describes guard", () => {
    expect(level.characterAt([6, 4])).toBe("guard");
  });
});
