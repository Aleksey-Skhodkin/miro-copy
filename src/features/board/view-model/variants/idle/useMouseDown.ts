import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import type { MouseEvent } from "react";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";

export function useMouseDown(params: ViewModelParams) {
  const { setViewState, canvasRect } = params;

  const handleOverlayMouseDown = (idleState: IdleViewState, e: MouseEvent) => {
    const point = pointOnScreenToCanvas(
      { x: e.clientX, y: e.clientY },
      canvasRect,
    );
    setViewState({
      ...idleState,
      mouseDown: {
        type: "overlay",
        x: point.x,
        y: point.y,
      },
    });
  };

  const handleNodeMouseDown = (
    idleState: IdleViewState,
    nodeId: string,
    e: MouseEvent,
  ) => {
    const point = pointOnScreenToCanvas(
      { x: e.clientX, y: e.clientY },
      canvasRect,
    );
    setViewState({
      ...idleState,
      mouseDown: {
        type: "node",
        x: point.x,
        y: point.y,
        nodeId,
      },
    });
  };

  const getIsStickerMouseDown = (idleState: IdleViewState, nodeId: string) => {
    return (
      idleState.mouseDown?.type === "node" &&
      idleState.mouseDown.nodeId === nodeId
    );
  };

  const handeWindowMouseUp = (idleState: IdleViewState) => {
    if (idleState.mouseDown) {
      setViewState({
        ...idleState,
        mouseDown: undefined,
      });
    }
  };

  return {
    handleOverlayMouseDown,
    handeWindowMouseUp,
    handleNodeMouseDown,
    getIsStickerMouseDown,
  };
}
