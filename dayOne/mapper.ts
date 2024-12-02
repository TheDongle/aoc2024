import readMatches from "./matcher.ts";

function mapAscending(pathToFile: string): { [k: string]: [number, number] } {
  const listOne: number[] = [];
  const listTwo: number[] = [];

  readMatches(pathToFile, /\d+/g, (v, i) => {
    const locationID = parseInt(v);
    const list = i % 2 === 0 ? listOne : listTwo;
    const index = list.findIndex((ele) => ele >= locationID);
    list.splice(index !== -1 ? index : list.length, 0, locationID);
  });

  return Object.fromEntries(listOne.map((v, i) => [i, [v, listTwo[i]]]));
}

function mapSimilarity(
  pathToFile: string,
): { [index: number]: [number, number] } {
  const appearances: { [index: number]: [number, number] } = {};

  readMatches(pathToFile, /\d+/g, (v, i) => {
    const locationID = parseInt(v);
    const count = appearances[locationID] ?? [0, 0];
    count[i % 2]++;
    appearances[locationID] = count;
  });
  return appearances;
}

export { mapAscending, mapSimilarity };
