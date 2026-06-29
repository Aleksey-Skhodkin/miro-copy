import clsx from "clsx";
import { useLayoutEffect, useRef, useState, type Ref } from "react";

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
  onMouseDown,
  onMouseUp,
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
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      data-id={id}
      ref={ref}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md text-left",
        isSelected && "outline outline-2 outline-blue-500",
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <TextareaAutoSize
        isEditing={isEditing ?? false}
        value={text}
        onChange={(value) => onTextChange?.(value)}
      />
    </button>
  );
}

function TextareaAutoSize({
  value,
  onChange,
  isEditing,
}: {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const { scrollHeight, scrollWidth } = ref.current;
    setHeight(scrollHeight);
    setWidth(scrollWidth);
  }, [value]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={clsx("whitespace-pre-wrap", isEditing && "opacity-0")}
      >
        {value}
      </div>
      {isEditing && (
        <textarea
          autoFocus
          className="absolute left-0 top-0 resize-none overflow-hidden"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{ width: width + 2, height: height + 2 }}
        />
      )}
    </div>
  );
}
