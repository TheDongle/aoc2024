import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect/expect";
import { ClawMachine } from "./clawMachine.ts";
import { partOne, partOneGreedy, simulateGamesGreedy } from "./index.ts";
import answer from "../spoilers.json" with { type: "json" };

const setupTest = {
  a: { x: 94, y: 34 },
  b: { x: 22, y: 67 },
  prize: { x: 8400, y: 5400 },
};

// describe("One claw machine", () => {
//   it("solves first case in example file", () => {
//     const { a, b, prize } = setupTest;
//     const ans = simulateGames(
//       new ClawMachine({
//         a: ({ x: a.x, y: a.y, cost: 3 }),
//         b: ({ x: b.x, y: b.y, cost: 1 }),
//         prize: ({ x: prize.x, y: prize.y }),
//       }),
//       100,
//     );
//     expect(ans).toBe(280);
//   });
// });

describe("One claw machine", () => {
  it("solves first case in example file", () => {
    const { a, b, prize } = setupTest;
    const ans = simulateGamesGreedy(
      new ClawMachine({
        a: ({ x: a.x, y: a.y, cost: 3 }),
        b: ({ x: b.x, y: b.y, cost: 1 }),
        prize: ({ x: prize.x, y: prize.y }),
      }),
      100,
    );
    expect(ans).toBe(280);
  });
});

// describe("Part One", () => {
//   it("Solves tutorial", () => {
//     expect(partOne("./day13/example.txt")).toBe(480);
//   });
//   it("solves puzzle", () => {
//     expect(partOne("./day13/puzzle.txt")).toBe(answer["13"]["1"]);
//   });
// });

describe("Part One", () => {
  it("Solves tutorial", () => {
    expect(partOneGreedy("./day13/example.txt")).toBe(480);
  });
  it("solves puzzle", () => {
    expect(partOneGreedy("./day13/puzzle.txt")).toBe(answer["13"]["1"]);
  });
});

// describe("Part Two", () => {
//   it("Solves tutorial", () => {
//     expect(partTwo("./day13/example.txt")).toBe(480);
//   });
// });
