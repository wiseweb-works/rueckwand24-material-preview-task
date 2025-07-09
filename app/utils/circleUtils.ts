import { Circle } from "../components/canvas/ImageWithCircles";

type Point = { x: number; y: number };

export function circlesCollide(a: Point, b: Point, radius: number) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy) < radius * 2;
}

export function clampCirclePosition(
  x: number,
  y: number,
  imageWidth: number,
  imageHeight: number,
  circleRadius: number,
  magnifierScale: number
) {
  const minX = circleRadius / magnifierScale;
  const maxX = imageWidth - circleRadius / magnifierScale;
  const minY = circleRadius / magnifierScale;
  const maxY = imageHeight - circleRadius / magnifierScale;
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y)),
  };
}

export function findNonCollidingPosition(
  circles: Circle[],
  imageWidth: number,
  imageHeight: number,
  circleRadius: number,
  magnifierScale: number
): { x: number; y: number } | null {
  const radius = circleRadius;
  const scale = magnifierScale;
  const minX = radius / scale;
  const maxX = imageWidth - radius / scale;
  const minY = radius / scale;
  const maxY = imageHeight - radius / scale;

  for (let y = minY + 20; y <= maxY - 20; y += radius * 2 + 8) {
    for (let x = minX + 20; x <= maxX - 20; x += radius * 2 + 8) {
      const collides = circles.some((c) =>
        circlesCollide({ x, y }, { x: c.x, y: c.y }, radius)
      );
      if (!collides) {
        return { x, y };
      }
    }
  }
  return null;
}
