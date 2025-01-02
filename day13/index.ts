import { ClawMachine, Coordinate, setupClawMachines } from "./clawMachine.ts";

type Score = {
  location: Coordinate;
  cost: number;
};

export function simulateGames(
  clawMachine: ClawMachine,
  n = 100,
): number {
  const { a, b, prize, claw } = clawMachine;

  function updateScore(score: Score, button: ClawMachine["a"]): Score {
    const output = { ...score };
    output.location = claw(output.location).moveWith(button);
    output.cost += button.cost;
    return output;
  }
  function updateResult(score: Score, result: number): number {
    if (claw(score.location).hasPrize(prize)) {
      return Math.min(score.cost, result);
    }
    return result;
  }
  function isDeadEnd(score: Score): boolean {
    return claw(score.location).isBeyondPrize(prize);
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
      currentRow[j] = updateScore(prevRow[j], a);
      result = updateResult(currentRow[j], result);
      if (isDeadEnd(currentRow[j])) {
        toFilter.add(j);
      }
    }

    for (let j = middle; j < currentRow.length; j++) {
      currentRow[j] = updateScore(prevRow[j - 1], b);
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

    const toFilter = new Set<number>();

    const currentRow: Score[] = Array(prevRow.length - 2);
    const middle = Math.floor(currentRow.length / 2);

    for (let j = currentRow.length; j > middle; j--) {
      currentRow[j] = updateScore(prevRow[j + 1], a);
      result = updateResult(currentRow[j], result);
      if (isDeadEnd(currentRow[j])) {
        toFilter.add(j);
      }
    }

    for (let j = middle; j >= 0; j--) {
      currentRow[j] = updateScore(prevRow[j], b);
      result = updateResult(currentRow[j], result);
      if (isDeadEnd(currentRow[j])) {
        toFilter.add(j);
      }
    }

    return upsideDownTriangle(
      result,
      toFilter.size === 0
        ? currentRow
        : currentRow.filter((_, i) => toFilter.has(i) === false),
    );
  }

  let { result, prevRow } = triangle(100);

  if (n !== Infinity) {
    result = upsideDownTriangle(result, prevRow).result;
  }

  return result !== Infinity ? result : 0;
}

export function partOne(path: string): number {
  const clawMachines = setupClawMachines(path);
  let sum = 0;
  for (const machine of clawMachines) {
    sum += simulateGames(machine, 100);
  }
  return sum;
}

// export function partTwo(path: string): number {
//   const clawMachines = setupClawMachines(path);
// }
