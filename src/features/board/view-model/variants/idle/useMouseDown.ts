import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import type { MouseEvent } from "react";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";

export function useMouseDown(params: ViewModelParams) {
  const { setViewState, canvasRect } = params;

  const handleOverlayMouseDown = (idleState: IdleViewState, e: MouseEvent) => {
    setViewState({
      ...idleState,
      mouseDown: pointOnScreenToCanvas(
        { x: e.clientX, y: e.clientY },
        canvasRect,
      ),
    });
  };

  const handeWindowMouseUp = (idleState: IdleViewState) => {
    if (idleState.mouseDown) {
      setViewState({
        ...idleState,
        mouseDown: undefined,
      });
    }
  };

  return { handleOverlayMouseDown, handeWindowMouseUp };
}
