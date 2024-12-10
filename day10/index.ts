import { nextPosition, paths } from "../day4/compass.ts";
import TextParser from "../day2/parse.ts";

const { cardinal: cardinalDirections } = paths;

// identfies trail heads and calls breadth-first search
// returns total of all searches
function countAccessibleTrails(
  path: string,
  uniqueEndsOnly = true,
): number {
  const trailMap = new TextParser(path).newLineArray();
  let outputTotal = 0;

  for (let row = 0; row < trailMap.length; row++) {
    for (let col = 0; col < trailMap[row].length; col++) {
      if (trailMap[row][col] === "0") {
        outputTotal += countConnectedEnds(trailMap, row, col, uniqueEndsOnly);
      }
    }
  }
  return outputTotal;
}

// counts all trail ends connected to starting location
function countConnectedEnds(
  trailMap: string[],
  trailHeadRow: number,
  trailHeadCol: number,
  uniqueEndsOnly = true,
  locationsVisited = new Set<string>(),
  outputCount = 0,
): number {
  const trailLocationQueue = [[trailHeadRow, trailHeadCol]];

  while (trailLocationQueue.length > 0) {
    const searchRange = trailLocationQueue.length;
    for (let i = 0; i < searchRange; i++) {
      const [row, col] = trailLocationQueue.shift()!;
      const prevStep = parseInt(trailMap[row]?.[col]);
      for (const direction of cardinalDirections) {
        const nextLocation = nextPosition(row, col, direction);
        const [nextRow, nextCol] = nextLocation;
        const nextStep = parseInt(trailMap[nextRow]?.[nextCol]);
        // has correct Gradient
        if (nextStep === prevStep + 1) {
          // is unique, if necessary
          if (
            !(uniqueEndsOnly &&
              locationsVisited.has(JSON.stringify(nextLocation)))
          ) {
            // is trail head
            if (nextStep === 9) {
              outputCount += 1;
            } else {
              trailLocationQueue.push(nextLocation);
            }
            if (uniqueEndsOnly) {
              locationsVisited.add(JSON.stringify(nextLocation));
            }
          }
        }
      }
    }
  }
  return outputCount;
}

export { countAccessibleTrails, countConnectedEnds };
