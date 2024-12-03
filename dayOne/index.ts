import { default as hashFns, type Options } from "./mapper.ts";
import { callbacks, reduceMap } from "./reducer.ts";

function compareLists(path: string, comparing: Options = "distance"): number {
  const text = Deno.readTextFileSync(path);
  return reduceMap(hashFns[comparing](text), callbacks[comparing]);
}

export default compareLists;
