import TextParser from "../dayTwo/parse.ts";
import { type Direction, nextPosition, paths } from "./compass.ts";

export function searchOneDirection(
  wordsearchOneDirection: string[][],
  targetWord: string,
  direction: Direction,
  position: number[],
  midpoint = "",
  count = 0,
): string {
  if (count >= targetWord.length) {
    return midpoint;
  }
  if (
    wordsearchOneDirection[position[0]]?.[position[1]] !== targetWord[count]
  ) {
    return "";
  }
  return searchOneDirection(
    wordsearchOneDirection,
    targetWord,
    direction,
    nextPosition(position[0], position[1], direction),
    count === Math.floor(targetWord.length / 2)
      ? JSON.stringify(position)
      : midpoint,
    count + 1,
  );
}

type MidPointMap = Map<string, number>;

const solverOptions: {
  [index: number]: {
    target: string;
    directions: Direction[];
    finalCount: (arg0: MidPointMap) => number;
  };
} = {
  1: {
    target: "XMAS",
    directions: [...paths.diagonal, ...paths.cardinal],
    finalCount: (map: MidPointMap) => [...map.values()].reduce((a, b) => a + b),
  },
  2: {
    target: "MAS",
    directions: [...paths.diagonal],
    finalCount: (map: MidPointMap) =>
      [...map.values()].reduce((a, b) => b === 2 ? a + 1 : a, 0),
  },
};

function wordSearchSolver(
  path: string,
  part: 1 | 2 = 1,
): number {
  const { target, directions, finalCount } = solverOptions[part];

  const midpoints: MidPointMap = new Map();

  const wordsearchOneDirection = new TextParser(path).stringArrays(
    /\w/g,
  );

  for (let row = 0; row < wordsearchOneDirection.length; row++) {
    for (let col = 0; col < wordsearchOneDirection[0].length; col++) {
      for (const d of directions) {
        const searchOneDirectionResult = searchOneDirection(
          wordsearchOneDirection,
          target,
          d,
          [row, col],
        );
        if (searchOneDirectionResult) {
          midpoints.set(
            searchOneDirectionResult,
            (midpoints.get(searchOneDirectionResult) ?? 0) + 1,
          );
        }
      }
    }
  }
  return finalCount(midpoints);
}

export default wordSearchSolver;
