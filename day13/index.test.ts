import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect/expect";
import {
  Button,
  claw,
  drawDiamond,
  partOne,
  Prize,
  setupClawMachines,
} from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

describe("Claw", () => {
  it("Moves with button", () => {
    const c = { x: 3, y: 1 };
    const b = new Button({ x: 4, y: 5, cost: 2 });
    expect(claw(c).moveWith(b)).toMatchObject({ x: 7, y: 6 });
  });
  it("Knows when it's touching prize", () => {
    const c = { x: 2, y: 3 };
    const p = new Prize({ x: 2, y: 3 });
    expect(claw(c).hasPrize(p)).toBe(true);
  });
  it("knows when it's not touching prize", () => {
    const c = { x: 2, y: 3 };
    const p = new Prize({ x: 2, y: 4 });
    expect(claw(c).hasPrize(p)).toBe(false);
  });
});

const setupTest = {
  a: { x: 94, y: 34 },
  b: { x: 22, y: 67 },
  prize: { x: 8400, y: 5400 },
};

const created = setupClawMachines("./day13/example.txt", 3, 1);

describe("Setup", () => {
  it("Creates claw machines", () => {
    const { a, b, prize } = created[0];
    expect(a.strength).toMatchObject(setupTest.a);
    expect(b.strength).toMatchObject(setupTest.b);
    expect(prize.location).toMatchObject(setupTest.prize);
  });
});

describe("One claw machine", () => {
  it("solves first case in example file", () => {
    const { a, b, prize } = setupTest;
    const ans = drawDiamond(
      new Button({ x: a.x, y: a.y, cost: 3 }),
      new Button({ x: b.x, y: b.y, cost: 1 }),
      new Prize({ x: prize.x, y: prize.y }),
      100,
    );
    expect(ans).toBe(280);
  });
});

describe("Part One", () => {
  it("Solves tutorial", () => {
    expect(partOne("./day13/example.txt")).toBe(480);
  });
  it("solves puzzle", () => {
    expect(partOne("./day13/puzzle.txt")).toBe(answer["13"]["1"]);
  });
});
