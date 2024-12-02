import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { mapDistance } from "./mapper.ts";
import { partOneSamples as samples } from "./index.test.ts";



describe("Day one - part One", () => {
  describe("Get Sorted Arrays", () => {
    samples.forEach((sample) => {
      const listOne = Object.values(mapDistance(sample.input)).map((v) =>
        v[0]
      );
      const listTwo = Object.values(mapDistance(sample.input)).map((v) =>
        v[1]
      );
      it(`outputs arrays of length ${sample.length}`, () => {
        expect(listOne.length).toBe(sample.length);
        expect(listTwo.length).toBe(sample.length);
      });
      it("Outputs sorted arrays", () => {
        expect({ ...listOne }).toMatchObject({
          ...listOne.toSorted((a, b) => a - b),
        });
        expect({ ...listTwo }).toMatchObject({
          ...listTwo.toSorted((a, b) => a - b),
        });
      });
    });
  });
});
