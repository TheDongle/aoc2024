import TextParser from "../day2/parse.ts";

const markers = {
  "guard": "^",
  "space": ".",
  "obstacle": "#",
} as const;

export function parseData(path: string): {
  map: string[][];
  position: [number, number];
  heading: number;
} {
  const map = new TextParser(path).stringArrays(/./g);
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "^") {
        return {
          map: map,
          position: [i, j],
          heading: 0,
        };
      }
    }
  }
  throw new Error("Guard is on break");
}

const rotations: { [index: number]: [number, number] } = {
  0: [-1, 0],
  90: [0, 1],
  180: [1, 0],
  270: [0, -1],
};

const handleStep = (
  row: number,
  col: number,
  heading: number,
): [number, number] => {
  const [rowMod, colMod] = rotations[heading];
  return [row + rowMod, col + colMod];
};

const handleRotate = (
  map: string[][],
  row: number,
  col: number,
  heading: number,
): number => {
  const [nextRow, nextCol] = handleStep(row, col, heading);
  if (map[nextRow]?.[nextCol] === markers["obstacle"]) {
    return heading === 270 ? 0 : heading + 90;
  }
  return heading;
};

export function partOne(path: string): number {
  const data = parseData(path);
  let [row, col] = data.position;
  const { map } = data;
  let { heading } = data;
  const visited = new Set<string>();
  while (0 <= row && 0 <= col && row < map.length && col < map[row].length) {
    visited.add(JSON.stringify([row, col]));
    heading = handleRotate(map, row, col, heading);
    const nextPosition = handleStep(row, col, heading);
    row = nextPosition[0];
    col = nextPosition[1];
  }
  return visited.size;
}
