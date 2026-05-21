import clsx from "clsx";
import type { Ref } from "react";

export function Sticker({
  ref,
  id,
  text,
  x,
  y,
  onClick,
  selected,
}: {
  ref: Ref<HTMLButtonElement>;
  id: string;
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
}) {
  return (
    <button
      data-id={id}
      ref={ref}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        selected && "outline outline-2 outline-blue-500",
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
