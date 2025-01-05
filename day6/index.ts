import { Position, rotate, takeStep } from "./movement.ts";
import { StringMap } from "./level.ts";
import { DirectionDescription } from "./movement.ts";

const isEdge = (description: string) =>
  description === "space" || description === "guard";

// const isVertex = (description: string) =>
//   description === "obstacle" || description === "wall";

function traverseEdge(
  map: StringMap,
  position: Position,
  heading: number,
  direction: DirectionDescription,
): { path: Set<string>; destination: Position; restStops: Set<string> } {
  const edges = new Set<string>();
  const visited = new Set<string>();

  const isAdjacentVertex = (position: Position) =>
    map.characterAt(takeStep(position, heading, "left")) === "obstacle";

  while (isEdge(map.characterAt(position))) {
    edges.add(JSON.stringify(position));
    if (isAdjacentVertex(position)) {
      visited.add(JSON.stringify(position));
    }
    position = takeStep(position, heading, direction);
  }

  const destination = takeStep(position, rotate(heading, "back"), "front");
  return { path: edges, destination, restStops: visited };
}

function traverseAllEdges(
  map: StringMap,
  position: Position,
  heading: number,
  direction: "front" | "back",
): { [index: string]: Set<number> } {
  const vertices: { [index: string]: Set<number> } = {};
  const edges: { [index: string]: Set<number> } = {};

  const somewhereToGo = () =>
    map.characterAt(
      takeStep(position, heading, direction === "front" ? "left" : "right"),
    ) !== "wall";

  // Travelling
  while (somewhereToGo()) {
    const journey = traverseEdge(map, position, heading, "front");
    // record journey
    vertices[JSON.stringify(journey.destination)] =
      (vertices[JSON.stringify(journey.destination)] ?? new Set<number>()).add(
        heading,
      );
    for (const key of journey.path.keys()) {
      edges[key] = (edges[key] ?? new Set<number>()).add(heading);
    }
    // update position
    position = journey.destination;
    heading = rotate(heading, direction === "front" ? "right" : "left");
  }

  return edges;
}

export default function (
  path: string,
  boxMode = false,
): number {
  const labMap = new StringMap(path);
  const guardPosition = labMap.findCharacter("guard");
  const guardHeading = 0;
  const edges = traverseAllEdges(
    labMap,
    guardPosition,
    guardHeading,
    "front",
  );
  return Object.keys(edges).length;
}
