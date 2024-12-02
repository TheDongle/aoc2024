type Entries = [string, [number, number]];

function reduceMap(
  hashMap: { [index: number]: [number, number] },
  operation?: "similarity" | "distance",
): number {
  const fn = operation === "similarity"
    ? (a: number, b: Entries) => a + (parseInt(b[0]) * b[1][0] * b[1][1])
    : (a: number, b: Entries) => a + (Math.abs(b[1][0] - b[1][1]));
  return Object.entries(hashMap).reduce(fn, 0);
}

export { reduceMap };
