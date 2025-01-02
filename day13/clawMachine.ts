export interface Coordinate {
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

interface ClawMachineConstructor {
  a: ButtonConstructor;
  b: ButtonConstructor;
  prize: Coordinate;
}

export class ClawMachine {
  a: Button;
  b: Button;
  prize: Prize;
  constructor({ a, b, prize }: ClawMachineConstructor) {
    this.a = new Button(a);
    this.b = new Button(b);
    this.prize = new Prize(prize);
    Object.freeze(this);
  }
  claw(location: Coordinate): ClawHelper {
    return claw(location);
  }
}

export function setupClawMachines(
  // path to txt file
  path: string,
  adjustment: number,
): ClawMachine[] {
  const matches: string[] = Deno.readTextFileSync(path).match(/(\+|-)*\d+/g) ??
    [];
  const output: ClawMachine[] = Array(Math.floor(matches.length / 6));
  for (let i = 0; i < matches.length; i += 6) {
    const a = {
      x: adjustment + parseInt(matches[i]),
      y: adjustment + parseInt(matches[i + 1]),
      cost: 3,
    };
    const b = {
      x: adjustment + parseInt(matches[i + 2]),
      y: adjustment + parseInt(matches[i + 3]),
      cost: 1,
    };
    const prize = {
      x: adjustment + parseInt(matches[i + 4]),
      y: adjustment + parseInt(matches[i + 5]),
    };
    output[Math.floor((i + 1) / 6)] = new ClawMachine({ a, b, prize });
  }
  return output;
}
