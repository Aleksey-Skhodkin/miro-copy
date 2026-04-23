import type { Rect } from "../domain/rect";

export function SelectionWindow({ x, y, width, height }: Rect) {
  return (
    <div
      className="absolute inset-0 bg-blue-500/30 border-2 border-blue-500"
      style={{ transform: `translate(${x}px, ${y}px)`, width, height }}
    />
  );
}
