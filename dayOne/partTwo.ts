import readMatches from "./readMatches.ts";

type QuantityMap = { [index: number]: [number, number] };

function getQuantityMap(pathToFile: string): QuantityMap {
  const appearances: QuantityMap = {};

  readMatches(pathToFile, /\d+/g, (v, i) => {
    const locationID = parseInt(v);
    const count = appearances[locationID] ?? [0, 0];
    count[i % 2]++;
    appearances[locationID] = count;
  });
  return appearances;
}

function calcSimilarity(appearances: QuantityMap): number {
  return Object.entries(appearances).reduce((a, b) => {
    const [locationID, quantities] = b;
    const [leftCount, rightCount] = quantities;
    return a += (parseInt(locationID) * leftCount) * rightCount;
  }, 0);
}

export { calcSimilarity, getQuantityMap };
