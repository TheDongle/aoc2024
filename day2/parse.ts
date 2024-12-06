class TextParser {
  public text: string;
  constructor(filePath: string) {
    this.text = Deno.readTextFileSync(filePath);
  }
  public newLineArray(): string[] {
    return this.text.split(/\n/);
  }
  public stringArrays(splitBy = /\w+/g): string[][] {
    return this.newLineArray().map((v) => (v.match(splitBy) ?? []));
  }
  public numberArrays(splitBy = /\d+/g): number[][] {
    return this.newLineArray().map((v) =>
      (v.match(splitBy) ?? []).map((v) => parseInt(v))
    );
  }
}

const parseNumberArray = (path: string): number[][] =>
  new TextParser(path).numberArrays();

export { parseNumberArray };
export default TextParser;
