export type Position = [number, number];

const edgeLookup: { [index: number]: [number, number] } = {
  0: [-1, 0],
  90: [0, 1],
  180: [1, 0],
  270: [0, -1],
};

const directions = {
  front: 0,
  right: 90,
  left: 270,
  back: 180,
};

export type DirectionDescription = keyof typeof directions;

export function rotate(
  heading: number,
  direction: DirectionDescription,
): number {
  let nextHeading = heading + directions[direction];
  while (nextHeading >= 360) {
    nextHeading -= 360;
  }
  return nextHeading;
}

export function takeStep(
  position: Position,
  heading: number,
  direction: DirectionDescription,
): Position {
  const [row, col] = position;
  const index = rotate(heading, direction);
  const [rowMod, colMod] = edgeLookup[index];
  return [row + rowMod, col + colMod];
}
