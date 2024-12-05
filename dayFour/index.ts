import TextParser from "../dayTwo/parse.ts";


// Only Part One passed so far
// 
// Plan for part two involves a Map full of "A" positions
// Counts as a cross when there's two instances of one A
// 
export type Position = [Row: number, Col: number];

export const directions = {
  right: [0, 1],
  downRight: [1, 1],
  down: [1, 0],
  downLeft: [1, -1],
  left: [0, -1],
  upLeft: [-1, -1],
  up: [-1, 0],
  upRight: [-1, 1],
} as const;

type Direction = keyof typeof directions;

export const nextPosition = (
  position: Position,
  direction: Direction,
): Position => {
  const [rowMod, colMod] = directions[direction];
  const [row, col] = position;
  return [row + rowMod, col + colMod];
};

const diagonal = [
  "downRight",
  "downLeft",
  "upLeft",
  "upRight",
] satisfies Direction[];

const cardinal = [
  "right",
  "down",
  "left",
  "up",
] satisfies Direction[];

function solveWordSearch(
  path: string,
  partTwo = false,
): number {
  const target = partTwo ? "MAS" : "XMAS";

  const directions = partTwo ? [...diagonal] : [...diagonal, ...cardinal];

  const wordSearch = new TextParser(path).stringArrays(
    /\w/g,
  );

  const search = (direction: Direction, startingPosition: Position) =>
    traverseDepth(wordSearch, target, direction, startingPosition);

  let resultCount = 0;
  for (let row = 0; row < wordSearch.length; row++) {
    for (let col = 0; col < wordSearch[0].length; col++) {
      for (const d of directions) {
        resultCount += search(d, [row, col]);
      }
    }
  }
  return resultCount;
}

export function traverseDepth(
  wordSearch: string[][],
  targetWord: string,
  direction: Direction,
  position: Position,
  count = 0,
): number {
  if (count >= targetWord.length) {
    return 1;
  }
  if (wordSearch[position[0]]?.[position[1]] !== targetWord[count]) {
    return 0;
  }
  return traverseDepth(
    wordSearch,
    targetWord,
    direction,
    nextPosition(position, direction),
    count + 1,
  );
}

export default solveWordSearch;
