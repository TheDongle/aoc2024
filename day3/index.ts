const mul = (a: number, b: number): number => a * b;

const patterns: [mulFn: RegExp, filter: RegExp] = [
  /(?<=mul\()\d{1,3}(?=,\d{1,3}\))|(?<=mul\(\d{1,3},)\d{1,3}(?=\))/g,
  /(do\(\)|^).*?(don't\(\)|$)/gs,
];

function mulOver(path: string, filter: boolean): number {
  const stack = filter ? patterns.slice() : patterns.slice(0, 1);

  function mulInner(text: string, stack: RegExp[]): string[] {
    const matches: string[] = text.match(stack.pop()!) ?? [""];
    if (stack.length === 0) {
      return matches;
    }
    return mulInner(matches.reduce((a, b) => a + b), stack.slice());
  }

  const mulArgs = mulInner(Deno.readTextFileSync(path), stack);
  let sum = 0;

  for (let i = 0; i < mulArgs.length; i += 2) {
    sum += mul(parseInt(mulArgs[i]), parseInt(mulArgs[i + 1]));
  }

  return sum;
}

export { patterns };
export default mulOver;
