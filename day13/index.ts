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
    return {
      location: claw(score.location).moveWith(button),
      cost: score.cost + button.cost,
    };
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
    diamond[i] = Array(i + 1);
    let j = 0;
    const half = Math.floor(i / 2);
    while (j <= half) {
      diamond[i][j] = {
        location: claw(diamond[i - 1][j].location).moveWith(a),
        cost: diamond[i - 1][j].cost + a.cost,
      };
      result = updateResult(diamond[i][j], result);
      j++;
    }
    while (j <= i) {
      diamond[i][j] = {
        location: claw(diamond[i - 1][j - 1].location).moveWith(b),
        cost: diamond[i - 1][j - 1].cost + b.cost,
      };
      result = updateResult(diamond[i][j], result);
      j++;
    }
    i++;
  }
  let k = n;
  // Diamond middle
  while (k > 0) {
    let j = k - 1;
    diamond[i] = Array(j);
    const half = Math.floor(k / 2);
    while (j > half) {
      diamond[i][j] = {
        location: claw(diamond[i - 1][j + 1].location).moveWith(a),
        cost: diamond[i - 1][j + 1].cost + a.cost,
      };
      result = updateResult(diamond[i][j], result);
      j--;
    }
    while (j >= 0) {
      diamond[i][j] = {
        location: claw(diamond[i - 1][j].location).moveWith(b),
        cost: diamond[i - 1][j].cost + b.cost,
      };
      result = updateResult(diamond[i][j], result);
      j--;
    }
    i++;
    k--;
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
