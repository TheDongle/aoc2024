interface Coordinate {
  x: number;
  y: number;
}

export class Prize {
  readonly location: Coordinate;
  constructor({ x, y }: Coordinate) {
    this.location = { x, y };
    Object.freeze(this);
  }
}

interface ButtonConstructor extends Coordinate {
  cost: number;
}

export class Button {
  readonly cost: number;
  readonly strength: Coordinate;
  constructor({ x, y, cost }: ButtonConstructor) {
    this.strength = { x, y };
    this.cost = cost;
    Object.freeze(this);
  }
}

interface ClawHelper {
  moveWith: (arg0: Button) => Coordinate;
  hasPrize: (arg0: Prize) => boolean;
  isBeyondPrize: (arg0: Prize) => boolean;
}

export function claw(location: Coordinate): ClawHelper {
  return {
    moveWith: function (button: Button): Coordinate {
      return {
        x: location.x + button.strength.x,
        y: location.y + button.strength.y,
      };
    },
    hasPrize: function (prize: Prize): boolean {
      return location.x === prize.location.x && location.y === prize.location.y;
    },
    isBeyondPrize: function (prize: Prize): boolean {
      return location.x > prize.location.x || location.y > prize.location.y;
    },
  };
}

interface ClawMachine {
  a: Button;
  b: Button;
  prize: Prize;
}

export function setupClawMachines(
  // path to txt file
  path: string,
  aCost: number,
  bCost: number,
): ClawMachine[] {
  const matches: string[] = Deno.readTextFileSync(path).match(/(\+|-)*\d+/g) ??
    [];
  const output: ClawMachine[] = Array(Math.floor(matches.length / 6));
  for (let i = 0; i < matches.length; i += 6) {
    const a = new Button({
      x: parseInt(matches[i]),
      y: parseInt(matches[i + 1]),
      cost: aCost,
    });
    const b = new Button({
      x: parseInt(matches[i + 2]),
      y: parseInt(matches[i + 3]),
      cost: bCost,
    });
    const prize = new Prize({
      x: parseInt(matches[i + 4]),
      y: parseInt(matches[i + 5]),
    });
    output[Math.floor((i + 1) / 6)] = { a, b, prize };
  }
  return output;
}

type Score = { location: Coordinate; cost: number };

export function drawDiamond(
  a: Button,
  b: Button,
  prize: Prize,
  n = 100,
): number {
  function updateScore(score: Score, button: Button): Score {
    const location = claw(score.location).moveWith(button);
    const cost = score.cost + button.cost;
    return { location, cost };
  }
  function updateResult(prev: Score, result: number): number {
    if (claw(prev.location).hasPrize(prize)) {
      return Math.min(prev.cost, result);
    }
    return result;
  }

  let result = Infinity;
  const diamond: Score[][] = Array(n * 2 + 1);
  // win condition

  // Diamond tip
  diamond[0] = [{ location: { x: 0, y: 0 }, cost: 0 }];
  let i = 1;
  while (i <= n) {
    let l = 0;
    const r = diamond[i - 1].length + 1;
    let m = Math.ceil(r / 2);
    diamond[i] = Array(r);
    while (l < m) {
      diamond[i][l] = updateScore(diamond[i - 1][l], a);
      result = updateResult(diamond[i][l], result);
      l++;
    }
    while (m < r) {
      diamond[i][m] = updateScore(diamond[i - 1][m - 1], b);
      result = updateResult(diamond[i][m], result);
      m++;
    }
    i++;
  }
  // Diamond middle
  n = i - 1;
  while (n > 0) {
    let r = diamond[i - 1].length - 2;
    diamond[i] = Array(r);
    const mid = Math.floor(r / 2);
    while (r > mid) {
      diamond[i][r] = updateScore(diamond[i - 1][r + 1], a);
      result = updateResult(diamond[i][r], result);
      r--;
    }
    while (r >= 0) {
      diamond[i][r] = updateScore(diamond[i - 1][r], b);
      result = updateResult(diamond[i][r], result);
      r--;
    }
    i++;
    n--;
  }
  return result !== Infinity ? result : 0;
}

export function partOne(path: string): number {
  const clawMachines = setupClawMachines(path, 3, 1);
  let sum = 0;
  for (const machine of clawMachines) {
    const { a, b, prize } = machine;
    sum += drawDiamond(a, b, prize, 100);
  }
  return sum;
}
