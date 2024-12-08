import TextParser from "../day2/parse.ts";
import { type Direction, nextPosition } from "../day4/compass.ts";

const oppositeDirection: Record<Direction, Direction> = {
  "N": "S",
  "NE": "SW",
  "E": "W",
  "SE": "NW",
  "S": "N",
  "SW": "NE",
  "W": "E",
  "NW": "SE",
};

type Position = [number, number];

// from current antenna, retrieve direction of the target node
export function whichWayIs(current: Position, target: Position): Direction {
  // target  is upward
  if (current[0] > target[0]) {
    return current[1] > target[1] ? "NW" : current[1] < target[1] ? "NE" : "N";
  }
  // target is downward
  if (current[0] < target[0]) {
    return current[1] > target[1] ? "SW" : current[1] < target[1] ? "SE" : "S";
  }
  // target is sideward
  return current[1] > target[1] ? "W" : "E";
}

// Distance between two antennae
function spaceBetween(pos1: Position, pos2: Position): [number, number] {
  return [Math.abs(pos1[0] - pos2[0]), Math.abs(pos1[1] - pos2[1])];
}

type PositionPair = [Position, Position];

// Given two antenna, retrieve position of two antinodes
export function findAntiNodes(
  position: Position,
  compare: Position,
): PositionPair {
  const [rowMultipler, colMultipler] = spaceBetween(position, compare);

  const posToCompDirection = whichWayIs(position, compare);
  const compToPosDirection = oppositeDirection[posToCompDirection];

  const [row, col] = position;
  const [comparerow, compareCol] = compare;

  return [
    nextPosition(
      row,
      col,
      compToPosDirection,
      rowMultipler,
      colMultipler,
    ),
    nextPosition(
      comparerow,
      compareCol,
      posToCompDirection,
      rowMultipler,
      colMultipler,
    ),
  ];
}

export function countAntiNodes(path: string): number {
  const antennaGraph = new Map<string, Position[]>();
  const map = new TextParser(path).newLineArray();
  const antiNodesSeen = new Set<string>();

  const isAntiNodeValid = (antiPos: Position, currAntenna: string) => {
    const [antiRow, antiCol] = antiPos;
    const element = map[antiRow]?.[antiCol];
    return element !== undefined && element !== currAntenna;
  };

  const setAntiNodes = (
    antennaPositions: Position[],
    currPos: Position,
    currAntenna: string,
  ) => {
    for (const antennaPos of antennaPositions) {
      for (const antiPosition of findAntiNodes(currPos, antennaPos)) {
        if (isAntiNodeValid(antiPosition, currAntenna)) {
          antiNodesSeen.add(JSON.stringify(antiPosition));
        }
      }
    }
  };

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const currAntenna = map[row][col];
      if (/\w/.test(currAntenna)) {
        const prevAntennaPositions = antennaGraph.get(currAntenna) ?? [];
        setAntiNodes(prevAntennaPositions, [row, col], currAntenna);
        antennaGraph.set(currAntenna, [...prevAntennaPositions, [row, col]]);
      }
    }
  }
  return antiNodesSeen.size;
}
