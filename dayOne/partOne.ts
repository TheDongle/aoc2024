import readMatches from "./readMatches.ts";

type OrderedLists = [number[], number[]];

function getsortedLists(pathToFile: string): OrderedLists {
  const listOne: number[] = [];
  const listTwo: number[] = [];

  readMatches(pathToFile, /\d+/g, (v, i) => {
    const locationID = parseInt(v);
    const list = i % 2 === 0 ? listOne : listTwo;
    const index = list.findIndex((ele) => ele >= locationID);
    list.splice(index !== -1 ? index : list.length, 0, locationID);
  });

  return [listOne, listTwo];
}

function calcDifference(lists: OrderedLists): number {
  const [one, two] = lists;
  return one.reduce((a, b, i) => a + (Math.abs(b - two[i])), 0);
}

export { calcDifference, getsortedLists };
