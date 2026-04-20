export type Point = {
  x: number;
  y: number;
};

export function vectorFromPoints(p1: Point, p2: Point) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  };
}

export function distanceFromPoints(p1: Point, p2: Point) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}
