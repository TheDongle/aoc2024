export type Position = [Row: number, Col: number];

const directions = {
  E: [0, 1],
  SE: [1, 1],
  S: [1, 0],
  SW: [1, -1],
  W: [0, -1],
  NW: [-1, -1],
  N: [-1, 0],
  NE: [-1, 1],
} as const;

type Direction = keyof typeof directions;

const nextPosition = (
  position: Position,
  direction: Direction,
): Position => {
  const [rowMod, colMod] = directions[direction];
  const [row, col] = position;
  return [row + rowMod, col + colMod];
};

const diagonalDirections = [
  "SE",
  "SW",
  "NW",
  "NE",
] satisfies Direction[];

const cardinalDirections = [
  "E",
  "S",
  "W",
  "N",
] satisfies Direction[];

export { cardinalDirections, diagonalDirections, nextPosition };
export type { Direction };
