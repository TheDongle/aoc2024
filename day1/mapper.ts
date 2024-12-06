import readMatches from "./matcher.ts";

type HashMap = { [index: string]: [number, number] };

function mapDistance(text: string): HashMap {
  const listOne: number[] = [];
  const listTwo: number[] = [];

  // Sorting the lists ascending as we read the string
  readMatches(text, /\d+/g, (v, i) => {
    const locationID = parseInt(v);
    const list = i % 2 === 0 ? listOne : listTwo;
    const index = list.findIndex((ele) => ele >= locationID);
    list.splice(index !== -1 ? index : list.length, 0, locationID);
  });

  // Hashmap ouput is purely for the sake of parity with Part Two
  return Object.fromEntries(listOne.map((v, i) => [i, [v, listTwo[i]]]));
}

function mapSimilarity(text: string): HashMap {
  const appearances: HashMap = {};

  // Count appearance of each locationId with hashmap
  readMatches(text, /\d+/g, (v, i) => {
    const locationID = parseInt(v);
    const count = appearances[locationID] ?? [0, 0];
    count[i % 2]++;
    appearances[locationID] = count;
  });
  // [object,object]
  return appearances;
}

type Options = "distance" | "similarity";

const hashFns = {
  distance: mapDistance,
  similarity: mapSimilarity,
} as const satisfies Record<Options, typeof mapDistance>;

export { mapDistance, mapSimilarity };
export default hashFns;
export type { HashMap, Options };
