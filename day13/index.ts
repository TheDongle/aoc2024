import {
  Button,
  ClawMachine,
  Coordinate,
  Prize,
  setupClawMachines,
} from "./clawMachine.ts";

type Score = {
  location: Coordinate;
  cost: number;
};

export function simulateGames(
  clawMachine: ClawMachine,
  limit: number,
): number {
  function updateScore(
    score: Score,
    buttonName: keyof Pick<ClawMachine, "a" | "b">,
  ): Score {
    const output = { ...score };
    output.location = clawMachine.claw(output.location).moveWith(
      clawMachine[buttonName],
    );
    output.cost += clawMachine[buttonName].cost;
    return output;
  }
  function updateResult(score: Score, result: number): number {
    if (clawMachine.claw(score.location).hasPrize(clawMachine.prize)) {
      return Math.min(score.cost, result);
    }
    return result;
  }
  function isDeadEnd(score: Score): boolean {
    return clawMachine.claw(score.location).isBeyondPrize(clawMachine.prize);
  }

  // Fan out in the manner of Pascal's triangle
  function triangle(
    limit: number,
    result?: number,
    prevRow?: Score[],
  ): { result: number; prevRow: Score[] } {
    result ??= Infinity;
    prevRow ??= [{
      location: { x: 0, y: 0 },
      cost: 0,
    }];

    if (limit === 0 || prevRow.length === 0) {
      return { result, prevRow };
    }

    const currentRow: Score[] = Array(prevRow.length + 1);
    const middle = Math.ceil(currentRow.length / 2);

    const toFilter = new Set<number>();

    for (let j = 0; j < middle; j++) {
      currentRow[j] = updateScore(prevRow[j], "a");
      result = updateResult(currentRow[j], result);
      if (isDeadEnd(currentRow[j])) {
        toFilter.add(j);
      }
    }

    for (let j = middle; j < currentRow.length; j++) {
      currentRow[j] = updateScore(prevRow[j - 1], "b");
      result = updateResult(currentRow[j], result);
      if (isDeadEnd(currentRow[j])) {
        toFilter.add(j);
      }
    }

    return triangle(
      limit - 1,
      result,
      toFilter.size === 0
        ? currentRow
        : currentRow.filter((_, i) => toFilter.has(i) === false),
    );
  }

  function upsideDownTriangle(
    result: number,
    prevRow: Score[],
  ): { result: number; prevRow: Score[] } {
    if (prevRow.length <= 1) {
      return { result, prevRow };
    }

    const currentRow: Score[] = Array(prevRow.length - 2);
    const middle = Math.floor(currentRow.length / 2);

    for (let j = currentRow.length; j > middle; j--) {
      currentRow[j] = updateScore(prevRow[j + 1], "a");
      result = updateResult(currentRow[j], result);
    }

    for (let j = middle; j >= 0; j--) {
      currentRow[j] = updateScore(prevRow[j], "b");
      result = updateResult(currentRow[j], result);
    }

    return upsideDownTriangle(
      result,
      currentRow,
    );
  }

  let { result, prevRow } = triangle(limit);

  if (limit !== Infinity) {
    result = upsideDownTriangle(result, prevRow).result;
  }

  return result !== Infinity ? result : 0;
}

export function simulateGamesGreedy(
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

export function partOneGreedy(path: string): number {
  const clawMachines = setupClawMachines(path, 0);
  let sum = 0;
  for (const machine of clawMachines) {
    sum += simulateGamesGreedy(machine, 100);
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
