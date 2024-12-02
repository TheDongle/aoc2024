import type { HashMap, Options } from "./mapper.ts";

type Entries = [keyof HashMap & string, HashMap[keyof HashMap]];

type CallBackType = (a: number, b: Entries) => number;

const callbacks = {
  similarity: (a: number, b: Entries) =>
    a + (parseInt(b[0]) * b[1][0] * b[1][1]),
  distance: (a: number, b: Entries) => a + (Math.abs(b[1][0] - b[1][1])),
} as const satisfies Record<Options, CallBackType>;

function reduceMap(
  hashMap: HashMap,
  callback = callbacks.distance,
): number {
  return Object.entries(hashMap).reduce(callback, 0);
}

export { reduceMap };
export { callbacks };
