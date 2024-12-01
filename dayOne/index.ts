import { calcDifference, getsortedLists } from "./partOne.ts";
import { calcSimilarity, getQuantityMap } from "./partTwo.ts";

const locationLists = {
  distanceBetween: function (pathToFile: string): number {
    return calcDifference(getsortedLists(pathToFile));
  },
  similarityBetween: function (pathToFile: string): number {
    return calcSimilarity(getQuantityMap(pathToFile));
  },
} as const;

export default locationLists;
