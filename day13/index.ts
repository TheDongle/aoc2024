import {
  Button,
  ClawMachine,
  Coordinate,
  setupClawMachines,
} from "./clawMachine.ts";

function greediestButtons(a: Button, b: Button): { a: Button; b: Button } {
  if (a.relativeValue < b.relativeValue) {
    const temp = b;
    b = a;
    a = temp;
  }
  return { a, b };
}

function greedyDivide(target: Coordinate, c: Coordinate): number {
  const xFactor = Math.max(Math.floor(target.x / c.x), 0);
  const yFactor = Math.max(Math.floor(target.y / c.y), 0);
  return Math.min(xFactor, yFactor);
}
function multiply({ x, y }: Coordinate, num: number): Coordinate {
  return { x: x * num, y: y * num };
}
function subtract(target: Coordinate, c: Coordinate): Coordinate {
  return { x: target.x - c.x, y: target.y - c.y };
}
function add(a: Coordinate, b: Coordinate): Coordinate {
  return { x: a.x + b.x, y: a.y + b.y };
}

function greediestPossible(
  a: Button,
  b: Button,
  target: Coordinate,
  limit: number,
): { aCount: number; bCount: number; remainder: Coordinate; cost: number } {
  const aCount = Math.min(
    greedyDivide(target, a.strength),
    limit,
  );
  const bCount = greedyDivide(
    subtract(target, multiply(a.strength, aCount)),
    b.strength,
  );
  const aMul = multiply(a.strength, aCount);
  const bMul = multiply(b.strength, bCount);

  return {
    aCount,
    bCount,
    remainder: subtract(target, add(aMul, bMul)),
    cost: (a.cost * aCount) + (b.cost * bCount),
  };
}

export function simulateGames(
  clawMachine: ClawMachine,
  target: Coordinate,
  limit: number,
): { remainder: Coordinate; cost: number } {
  function spendTokens(
    a: Button,
    b: Button,
    limit: number,
    target: Coordinate,
  ): { remainder: Coordinate; cost: number } {
    let { aCount, bCount, remainder, cost } = greediestPossible(
      a,
      b,
      target,
      limit,
    );

    while (aCount > 0 && limit > bCount) {
      const aMul = multiply(a.strength, aCount);
      const bMul = multiply(b.strength, bCount);
      const remainder = subtract(target, add(aMul, bMul));

      if (remainder.x === 0 && remainder.y === 0) {
        return {
          remainder: { x: 0, y: 0 },
          cost: (a.cost * aCount) + (b.cost * bCount),
        };
      }
      aCount--;
      bCount = greedyDivide(
        subtract(target, multiply(a.strength, aCount)),
        b.strength,
      );
    }
    return { remainder, cost };
  }

  const { a, b } = greediestButtons(clawMachine.a, clawMachine.b);
  return spendTokens(a, b, limit, target);
}

export function partOne(path: string): number {
  const clawMachines = setupClawMachines(path, 0);
  let sum = 0;
  for (const machine of clawMachines) {
    const target = machine.prize.location;
    const { remainder, cost } = simulateGames(machine, target, 100);
    if (remainder.x === 0 && remainder.y === 0) {
      sum += cost;
    }
  }
  return sum;
}

// export function partTwo(path: string): number {
//   const clawMachines = setupClawMachines(path, 10000000000000);
//   let sum = 0;
//   for (const machine of clawMachines) {
//     const target = machine.prize.location;
//     const { remainder, cost } = simulateGames(machine, target, Infinity);
//     if (remainder.x === 0 && remainder.y === 0) {
//       sum += cost;
//     }
//   }
//   return sum;
// }
