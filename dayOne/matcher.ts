function readTextMatches(
  text: string,
  regex: RegExp,
  callback: (v: string, i: number) => void,
): void {
  let array1: RegExpExecArray | null;
  let count = 0;
  while ((array1 = regex.exec(text)) !== null) {
    callback(array1[0], count++);
  }
}

export default readTextMatches;
