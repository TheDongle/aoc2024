import {
  Button,
  ClawMachine,
  Coordinate,
  setupClawMachines,
} from "./clawMachine.ts";


export function simulateGames(
  clawMachine: ClawMachine,
  limit: number,
): number {
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

  function greedyGobbles(
    a: Button,
    b: Button,
    limit: number,
    aCount?: number,
    bCount?: number,
  ): number {
    aCount ??= Math.min(
      greedyDivide(clawMachine.prize.location, a.strength),
      limit,
    );
    bCount ??= greedyDivide(
      subtract(clawMachine.prize.location, multiply(a.strength, aCount)),
      b.strength,
    );

    if (bCount < 0) {
      bCount = 0;
    }

    if (aCount < 0 || limit < bCount) {
      return 0;
    }

    const aMul = multiply(a.strength, aCount);
    const bMul = multiply(b.strength, bCount);

    const remainder = subtract(clawMachine.prize.location, add(aMul, bMul));

    if (remainder.x === 0 && remainder.y === 0) {
      return (a.cost * aCount) + (b.cost * bCount);
    }

    return greedyGobbles(
      a,
      b,
      limit,
      aCount - 1,
      greedyDivide(
        subtract(clawMachine.prize.location, multiply(a.strength, aCount - 1)),
        b.strength,
      ),
    );
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
    sum += simulateGames(machine, 100);
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
