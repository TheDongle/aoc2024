import {
  Button,
  ClawMachine,
  Coordinate,
  setupClawMachines,
} from "./clawMachine.ts";

export function simulateGames(
  clawMachine: ClawMachine,
  limit: number,
): { remainder: Coordinate; cost: number } {
  function greedyDivide(target: Coordinate, c: Coordinate): number {
    const xFactor = Math.max(Math.floor(target.x / c.x), 0);
    const yFactor = Math.max(Math.floor(target.y / c.y), 0);
    if (xFactor > yFactor && (xFactor * c.y) <= target.y) {
      return xFactor;
    }
    return yFactor;
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

  function greediest(
    a: Button,
    b: Button,
  ): { aCount: number; bCount: number; remainder: Coordinate; cost: number } {
    const aCount = Math.min(
      greedyDivide(clawMachine.prize.location, a.strength),
      limit,
    );
    const bCount = greedyDivide(
      subtract(clawMachine.prize.location, multiply(a.strength, aCount)),
      b.strength,
    );
    const aMul = multiply(a.strength, aCount);
    const bMul = multiply(b.strength, bCount);
    const remainder = subtract(clawMachine.prize.location, add(aMul, bMul));

    return {
      aCount,
      bCount,
      remainder,
      cost: (a.cost * aCount) + (b.cost * bCount),
    };
  }

  function greedyGobbles(
    a: Button,
    b: Button,
    limit: number,
  ): { remainder: Coordinate; cost: number } {
    let { aCount, bCount, remainder, cost } = greediest(a, b);
    limit = 100;

    while (aCount > 0 && limit > bCount) {
      const aMul = multiply(a.strength, aCount);
      const bMul = multiply(b.strength, bCount);
      const remainder = subtract(clawMachine.prize.location, add(aMul, bMul));

      if (remainder.x === 0 && remainder.y === 0) {
        return {
          remainder: { x: 0, y: 0 },
          cost: (a.cost * aCount) + (b.cost * bCount),
        };
      }
      aCount--;
      bCount = greedyDivide(
        subtract(clawMachine.prize.location, multiply(a.strength, aCount)),
        b.strength,
      );
    }
    return { remainder, cost };
  }

  let { a, b } = clawMachine;
  if (a.relativeValue < b.relativeValue) {
    b = clawMachine.a;
    a = clawMachine.b;
  }
  return greedyGobbles(a, b, limit);
}

export function partOne(path: string): number {
  const clawMachines = setupClawMachines(path, 0);
  let sum = 0;
  for (const machine of clawMachines) {
    const { remainder, cost } = simulateGames(machine, 100);
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
//     sum += simulateGames(machine, Infinity);
//   }
//   return sum;
// }
