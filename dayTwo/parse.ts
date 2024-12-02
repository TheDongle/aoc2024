import readTextMatches from "../dayOne/readMatches.ts";

function parseNumberArray(
  pathToFile: string,
): number[][] {
  const resultArray: number[][] = [[]];
  let row = 0;
  let column = 0;
  readTextMatches(pathToFile, /\w+|\n/g, (v) => {
    if (/\w+/.test(v)) {
      resultArray[row][column++] = parseInt(v);
    } else {
      resultArray[++row] = [];
      column = 0;
    }
  });
  return resultArray;
}

export { parseNumberArray };
