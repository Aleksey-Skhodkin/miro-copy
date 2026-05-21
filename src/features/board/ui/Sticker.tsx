import clsx from "clsx";
import type { Ref } from "react";

export function Sticker({
  ref,
  id,
  text,
  x,
  y,
  onClick,
  isSelected,
  isEditing,
  onTextChange,
}: {
  ref: Ref<HTMLButtonElement>;
  id: string;
  text: string;
  x: number;
  y: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected?: boolean;
  isEditing?: boolean;
  onTextChange?: (text: string) => void;
}) {
  return (
    <button
      data-id={id}
      ref={ref}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        isSelected && "outline outline-2 outline-blue-500",
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {isEditing ? (
        <input
          autoFocus
          className="w-full h-full"
          value={text}
          onChange={(e) => onTextChange?.(e.target.value)}
        />
      ) : (
        text
      )}
    </button>
  );
}
