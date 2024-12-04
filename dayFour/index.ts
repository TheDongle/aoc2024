import TextParser from "../dayTwo/parse.ts";

function reverseString(str: string): string {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str.charAt(i);
  }
  return reversed;
}

function solveWordSearch(path: string, words = ["XMAS"]): number {
  const wordSearch = new TextParser(path).stringArrays(
    /\w/g,
  );
  const reversedWords = words.map((v) => reverseString(v));
  const targets = [...words, ...reversedWords];
  let resultCount = 0;
  for (let row = 0; row < wordSearch.length; row++) {
    for (let col = 0; col < wordSearch[0].length; col++) {
      for (const t of targets) {
        resultCount += countFourWays([row, col], t, wordSearch);
      }
    }
  }
  return resultCount;
}

function countFourWays(
  startPosition: [number, number],
  targetWord: string,
  wordSearch: string[][],
): number {
  const travelOneWay = (
    startPosition: [number, number],
    targetWord: string,
    modifier: [number, number],
  ): number => {
    let [rowInner, colInner] = startPosition;
    const [rowMod, colMod] = modifier;
    let found = "";
    let count = 0;
    while (count < targetWord.length) {
      found += wordSearch[rowInner][colInner];
      rowInner += rowMod;
      colInner += colMod;
      if (found[count] !== targetWord[count++]) {
        return 0;
      }
    }
    return 1;
  };

  const [row, col] = startPosition;
  let count = 0;
  if (col <= wordSearch[row].length - targetWord.length) {
    count += travelOneWay([row, col], targetWord, [0, 1]);
    if (row <= wordSearch.length - targetWord.length) {
      count += travelOneWay([row, col], targetWord, [1, 1]);
    }
  }
  if (row <= wordSearch.length - targetWord.length) {
    count += travelOneWay([row, col], targetWord, [1, 0]);
    if (targetWord.length - 1 <= col) {
      count += travelOneWay([row, col], targetWord, [1, -1]);
    }
  }
  return count;
}

export default solveWordSearch;
