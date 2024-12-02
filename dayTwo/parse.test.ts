import { parseNumberArray } from "./parse.ts";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("parseNumberArray", () => {
  const result = parseNumberArray("./dayTwo/puzzle1.txt");
  it(`returns array with correct length`, () => {
    expect(result.length).toBe(1000);
  });
  it(`has correct length in first subarray`, () => {
    expect(result[0].length).toBe(6);
  });
  it(`has correct length in last subarray`, () => {
    expect(result[999].length).toBe(8);
  });
});
