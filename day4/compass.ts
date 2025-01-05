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
  row: number,
  col: number,
  direction: Direction,
  rowMultipler = 1,
  colMultipler = 1,
): [number, number] => {
  const [rowMod, colMod] = directions[direction];
  return [row + (rowMod * rowMultipler), col + (colMod * colMultipler)];
};

const paths = {
  diagonal: [
    "SE",
    "SW",
    "NW",
    "NE",
  ] as const,
  cardinal: [
    "E",
    "S",
    "W",
    "N",
  ] as const,
};

type Position = [number,number]

export { directions, nextPosition, paths };
export type { Direction, Position };
