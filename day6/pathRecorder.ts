import { Position } from "./movement.ts";

export class PathRecorder {
  private value: Map<string, Set<number>>;
  constructor() {
    this.value = new Map();
  }
  get size(): number {
    return this.value.size;
  }
  has(position: Position, heading: number): boolean {
    const prevHeadings = this.value.get(JSON.stringify(position));
    return prevHeadings !== undefined && prevHeadings.has(heading);
  }
  add(position: Position, heading: number): Map<string, Set<number>> {
    const stringPosition = JSON.stringify(position);
    const prevHeadings = this.value.get(stringPosition) ?? new Set<number>();
    return this.value.set(stringPosition, prevHeadings.add(heading));
  }
}
