import { isSafeReport } from "./isSafe.ts";
import { parseNumberArray } from "./parse.ts"

function countSafeReports(path: string, isDampenerOn: boolean): number {
  return parseNumberArray(path).reduce(
    (a, b) => isSafeReport(b, isDampenerOn) ? a + 1 : a,
    0,
  );
}

export default countSafeReports;