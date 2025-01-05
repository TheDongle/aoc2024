import TextParser from "../day2/parse.ts";
import { Position } from "./movement.ts";

type CharacterNames = "guard" | "obstacle" | "space" | "wall";

export class StringMap {
  private map: string[];
  static mapDescriptors: { [index: string]: string } = {
    "^": "guard",
    ".": "space",
    "#": "obstacle",
    "!": "wall",
  };
  static mapMarkers = Object.fromEntries(
    Object.entries(StringMap.mapDescriptors).map(([key, val]) => [val, key]),
  );
  constructor(path: string) {
    this.map = new TextParser(path).newLineArray();
  }
  get rowLength(): number {
    return this.map.length;
  }
  get colLength(): number {
    return this.map[0].length;
  }
  characterAt(position: Position): CharacterNames {
    const marker = this.map[position[0]]?.[position[1]] ?? "!";
    return StringMap.mapDescriptors[marker] as CharacterNames;
  }
  findCharacter(
    descriptor: CharacterNames,
  ): Position {
    const marker = StringMap.mapMarkers[descriptor];
    for (let i = 0; i < this.rowLength; i++) {
      for (let j = 0; j < this.colLength; j++) {
        if (this.map[i][j] === marker) {
          return [i, j];
        }
      }
    }
    throw new Error(`${descriptor} not found on map`);
  }
}
