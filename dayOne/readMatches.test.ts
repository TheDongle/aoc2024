import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { readfile } from "./readMatches.ts";
import { samples } from "./partOne.test.ts";

describe("Read file", () => {
  const read = readfile(samples[0].input);
  it("outputs string type", () => {
    expect(typeof read).toBe("string");
  });
  it("outputs string of length greater than 0", () => {
    expect(read.length).toBeGreaterThan(0);
  });
});
