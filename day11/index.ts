export class Stone {
  engraving: number;
  blinksRemaining: number;
  constructor(engraving: number, blinksRemaining: number) {
    this.engraving = engraving;
    this.blinksRemaining = blinksRemaining;
  }
}

export function getNextEngraving(engraving: number): number[] {
  if (engraving === 0) {
    return [1];
  }
  const stringEngraving = engraving.toString();
  if (stringEngraving.length % 2 === 0) {
    const splitPoint = stringEngraving.length / 2;
    return [
      parseInt(stringEngraving.slice(0, splitPoint)),
      parseInt(stringEngraving.slice(splitPoint)),
    ];
  }
  return [engraving * 2024];
}

// You can get to this result reliably from 0 in 5 blinks
export const baseStoneList = (blinksRemaining: number) => {
  return [
    new Stone(4048, blinksRemaining),
    new Stone(1, blinksRemaining),
    new Stone(4048, blinksRemaining),
    new Stone(8096, blinksRemaining),
  ];
};

export function getNextStone(stone: Stone): Stone[] {
  const { blinksRemaining, engraving } = stone;

  if (engraving === 0 && blinksRemaining >= 5) {
    return baseStoneList(blinksRemaining - 5);
  }
  
  return getNextEngraving(engraving).map((v) =>
    new Stone(v, blinksRemaining - 1)
  );
}

export function blinkAtStones(path: string, blinks: number): number {
  const stoneArray = Deno.readTextFileSync(path).split(" ").map((v) =>
    new Stone(parseInt(v), blinks)
  );

  let totalStones = 0;

  while (stoneArray.length > 0) {
    const currentStone = stoneArray.shift()!;

    if (currentStone.blinksRemaining === 0) {
      totalStones += 1;
    } else {
      stoneArray.unshift(...getNextStone(currentStone));
    }
  }
  return totalStones;
}
