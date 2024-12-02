function parseNumberArray(
  pathToFile: string,
): number[][] {
  const text = Deno.readTextFileSync(pathToFile);
  return text.split(/\n/).map((v) =>
    (v.match(/\d+/g) ?? []).map((v) => parseInt(v))
  );
}

export { parseNumberArray };
