const readfile = (path: string): string => Deno.readTextFileSync(path);

function readTextMatches(
  pathToFile: string,
  regex: RegExp,
  callback: (v: string, i: number) => void,
): void {
  const text = readfile(pathToFile);
  let array1: RegExpExecArray | null;
  let count = 0;
  while ((array1 = regex.exec(text)) !== null) {
    callback(array1[0], count++);
  }
}

export { readfile };
export default readTextMatches;
