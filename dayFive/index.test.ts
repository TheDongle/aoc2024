import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { menInTheMiddle, parseData, validMiddlePage } from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const manTest = [61, 53, 29, 0, 0, 0];

describe("single Manual result", () => {
  const { rules, manuals } = parseData("./dayFive/example.txt");
  manTest.forEach((v, i) => {
    const man = manuals[i];
    it(`returns ${v} from row ${man}`, () => {
      expect(validMiddlePage(rules, man)).toBe(v);
    });
  });
});

describe("Part One", () => {
  it("Solves the tutorial", () => {
    expect(menInTheMiddle("./dayFive/example.txt")).toBe(143);
  });
  it("Solves the puzzle", () => {
    expect(menInTheMiddle("./dayFive/puzzle1.txt")).toBe(answer[5][1]);
  });
});
