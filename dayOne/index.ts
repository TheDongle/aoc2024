import { default as hashFns, type Options } from "./mapper.ts";
import { callbacks, reduceMap } from "./reducer.ts";

function compareLists(path: string, comparing: Options = "distance"): number {
  return reduceMap(hashFns[comparing](path), callbacks[comparing]);
}

export default compareLists;
