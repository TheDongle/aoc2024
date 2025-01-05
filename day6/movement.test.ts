import { describe, it } from "@std/testing/bdd";
import {
  DirectionDescription,
  Position,
  rotate,
  takeStep,
} from "./movement.ts";
import { expect } from "@std/expect/expect";

const headingTests: {
  input: { heading: number; direction: DirectionDescription };
  output: number;
}[] = [
  {
    input: {
      heading: 0,
      direction: "right",
    },
    output: 90,
  },
  {
    input: {
      heading: 90,
      direction: "right",
    },
    output: 180,
  },
  {
    input: {
      heading: 180,
      direction: "right",
    },
    output: 270,
  },
  {
    input: {
      heading: 270,
      direction: "right",
    },
    output: 0,
  },
  {
    input: {
      heading: 0,
      direction: "left",
    },
    output: 270,
  },
  {
    input: {
      heading: 90,
      direction: "left",
    },
    output: 0,
  },
  {
    input: {
      heading: 180,
      direction: "left",
    },
    output: 90,
  },
  {
    input: {
      heading: 270,
      direction: "left",
    },
    output: 180,
  },
  {
    input: {
      heading: 0,
      direction: "back",
    },
    output: 180,
  },
  {
    input: {
      heading: 90,
      direction: "back",
    },
    output: 270,
  },
  {
    input: {
      heading: 180,
      direction: "back",
    },
    output: 0,
  },
  {
    input: {
      heading: 270,
      direction: "back",
    },
    output: 90,
  },
  {
    input: {
      heading: 0,
      direction: "front",
    },
    output: 0,
  },
  {
    input: {
      heading: 90,
      direction: "front",
    },
    output: 90,
  },
  {
    input: {
      heading: 180,
      direction: "front",
    },
    output: 180,
  },
  {
    input: {
      heading: 270,
      direction: "front",
    },
    output: 270,
  },
];

describe("heading change function", () => {
  headingTests.forEach((t) => {
    const { input, output } = t;
    const { heading, direction } = input;
    it(`returns ${output} from heading '${heading}' and direction '${direction}'`, () => {
      expect(rotate(heading, direction)).toBe(output);
    });
  });
});

const positionTests: {
  input: {
    position: Position;
    heading: number;
    direction: DirectionDescription;
  };
  output: Position;
}[] = [
  {
    input: {
      position: [0, 0],
      heading: 0,
      direction: "front",
    },
    output: [-1, 0],
  },
  {
    input: {
      position: [0, 0],
      heading: 90,
      direction: "front",
    },
    output: [0, 1],
  },
  {
    input: {
      position: [0, 0],
      heading: 180,
      direction: "front",
    },
    output: [1, 0],
  },
  {
    input: {
      position: [0, 0],
      heading: 270,
      direction: "front",
    },
    output: [0, -1],
  },
  {
    input: {
      position: [0, 0],
      heading: 0,
      direction: "back",
    },
    output: [1, 0],
  },
  {
    input: {
      position: [0, 0],
      heading: 90,
      direction: "back",
    },
    output: [0, -1],
  },
];

describe("Position change function", () => {
  positionTests.forEach((t) => {
    const { input, output } = t;
    const { position, heading, direction } = input;
    it(`returns ${output} from position '${position}' heading '${heading}' and direction '${direction}'`, () => {
      expect(takeStep(position, heading, direction)).toMatchObject({
        ...output,
      });
    });
  });
});
