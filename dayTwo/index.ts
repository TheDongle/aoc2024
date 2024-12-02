import { isSafeReport } from "./isSafe.ts";
import { parseNumberArray } from "./parse.ts";

function countSafeReports(path: string, tolerance: number): number {
  return parseNumberArray(path).reduce(
    (a, b) => isSafeReport(b, tolerance) ? a + 1 : a,
    0,
  );
}

export default countSafeReports;
