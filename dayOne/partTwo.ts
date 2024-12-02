import readMatches from "./readMatches.ts";

type QuantityMap = Map<number, [number, number]>;

function getQuantityMap(pathToFile: string): QuantityMap {
  const appearances: QuantityMap = new Map();

  readMatches(pathToFile, /\d+/g, (v, i) => {
    const locationID = parseInt(v);
    const count = appearances.get(locationID) ?? [0, 0];
    count[i % 2]++;
    appearances.set(locationID, count);
  });
  return appearances;
}

function calcSimilarity(appearances: QuantityMap): number {
  return appearances.entries().reduce(
    (a, b) => a += (b[0] * b[1][0]) * b[1][1],
    0,
  );
}

export { calcSimilarity, getQuantityMap };
