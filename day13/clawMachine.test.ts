import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect/expect";
import { Button, claw, Prize, setupClawMachines } from "./clawMachine.ts";

const setupTest = {
  a: { x: 94, y: 34 },
  b: { x: 22, y: 67 },
  prize: { x: 8400, y: 5400 },
};

describe("Setup", () => {
  it("Creates claw machines", () => {
    const created = setupClawMachines("./day13/example.txt", 0);
    const { a, b, prize } = created[0];
    expect(a.strength).toMatchObject(setupTest.a);
    expect(b.strength).toMatchObject(setupTest.b);
    expect(prize.location).toMatchObject(setupTest.prize);
  });
  it("adds 10000000000000", () => {
    const created = setupClawMachines("./day13/example.txt", 10000000000000);
    const { prize } = created[0];
    expect(prize.location.x).toBe(setupTest.prize.x + 10000000000000);
    expect(prize.location.y).toBe(setupTest.prize.y + 10000000000000);
  });
});

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
