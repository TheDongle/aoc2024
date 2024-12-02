import { mapAscending, mapSimilarity } from "./mapper.ts";
import { reduceMap } from "./reducer.ts";

function compareLists(
  pathToFile: string,
  comparing?: "distance" | "similarity",
): number {
  const hashFn = comparing === "similarity" ? mapSimilarity : mapAscending;
  return reduceMap(hashFn(pathToFile), comparing);
}

export default compareLists;
