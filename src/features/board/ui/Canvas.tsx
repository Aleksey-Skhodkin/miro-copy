import type { ReactNode, Ref } from "react";
import type { WindowPosition } from "../model/window-position";

export function Canvas({
  children,
  ref,
  windowPosition,
  overlay,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
  windowPosition: WindowPosition;
  overlay?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      {...props}
      className="absolute inset-0 select-none overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      {overlay}
      <div
        style={{
          transformOrigin: "left top",
          // scale делаем перед translate!
          transform: `scale(${windowPosition.zoom}) translate(${-windowPosition.x}px, ${-windowPosition.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
