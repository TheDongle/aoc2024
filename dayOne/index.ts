export function readfile(pathTofile: string): string {
  return Deno.readTextFileSync(pathTofile);
}

export function parseListsToSorted(text: string): [number[], number[]] {
  const matchDigits = /\d+/g;

  const listOne: number[] = [];
  const listTwo: number[] = [];

  let count = 0;
  let array1: RegExpExecArray | null;
  while ((array1 = matchDigits.exec(text)) !== null) {
    const locationID = parseInt(array1[0]);
    const list = count % 2 === 0 ? listOne : listTwo;
    const index = list.findIndex((ele) => ele >= locationID);
    list.splice(index !== -1 ? index : list.length, 0, locationID);
    count++;
  }

  return [listOne, listTwo];
}

export function reduceByDifference(
  listOne: number[],
  listTwo: number[],
): number {
  let sum = 0;
  let count = 0;
  while (count < listOne.length && count < listOne.length) {
    sum += Math.abs((listOne[count]) - (listTwo[count]));
    count++;
  }
  return sum;
}

export function parseListsAndMapSimilarity(
  text: string,
): Map<number, [number, number]> {
  const matchDigits = /\d+/g;
  const appearances = new Map<number, [number, number]>();

  let i = 0;
  let array1: RegExpExecArray | null;
  while ((array1 = matchDigits.exec(text)) !== null) {
    const locationID = parseInt(array1[0]);
    const currentCount = appearances.get(locationID) ?? [0, 0];
    const currIndex = i % 2;
    currentCount[currIndex] = currentCount[currIndex] + 1;
    appearances.set(locationID, currentCount);
    ++i;
  }
  return appearances;
}

function reduceSimilarity(appearances: Map<number, [number, number]>): number {
  let sum = 0;
  for (const [key, val] of appearances.entries()) {
    sum += (key * val[0]) * val[1];
  }
  return sum;
}

export function getSimilarity(pathTofile: string): number {
  return reduceSimilarity(parseListsAndMapSimilarity(readfile(pathTofile)));
}

export function distanceBetweenLists(pathTofile: string): number {
  const [listOne, listTwo] = parseListsToSorted(readfile(pathTofile));
  return reduceByDifference(listOne, listTwo);
}
