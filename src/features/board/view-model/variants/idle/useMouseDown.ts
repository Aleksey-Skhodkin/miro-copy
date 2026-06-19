import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import type { MouseEvent } from "react";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";

export function useMouseDown(params: ViewModelParams) {
  const { setViewState, canvasRect, windowPositionModel } = params;

  const handleOverlayMouseDown = (idleState: IdleViewState, e: MouseEvent) => {
    const point = pointOnScreenToCanvas(
      { x: e.clientX, y: e.clientY },
      windowPositionModel.position,
      canvasRect,
    );
    setViewState({
      ...idleState,
      mouseDown: {
        type: "overlay",
        x: point.x,
        y: point.y,
        isRightClick: e.button === 2,
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
      windowPositionModel.position,
      canvasRect,
    );
    setViewState({
      ...idleState,
      mouseDown: {
        type: "node",
        x: point.x,
        y: point.y,
        nodeId,
        isRightClick: e.button === 2,
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
