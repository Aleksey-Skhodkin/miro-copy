import type { Point } from "../../domain/point";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import type { ViewModelParams } from "../view-model-params";
import type { ViewModel, ViewModelNode } from "../view-model-type";
import { goToIdle } from "./idle";

export type DrawArrowViewState = {
  type: "draw-arrow";
  startPoint: Point;
  endPoint: Point;
};

export function useDrawArrowViewModel({
  nodesModel,
  setViewState,
  windowPositionModel,
  canvasRect,
}: ViewModelParams) {
  return (state: DrawArrowViewState): ViewModel => {
    const newArrow: ViewModelNode = {
      id: "drawing-arrow",
      type: "arrow",
      start: state.startPoint,
      end: state.endPoint,
    };

    return {
      nodes: [...nodesModel.nodes, newArrow],
      layout: {
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            setViewState(goToIdle());
          }
        },
      },
      window: {
        onMouseMove: (e) => {
          const currentPoint = pointOnScreenToCanvas(
            { x: e.clientX, y: e.clientY },
            windowPositionModel.position,
            canvasRect,
          );
          setViewState({ ...state, endPoint: currentPoint });
        },
        onMouseUp: () => {
          setViewState(goToIdle());
          nodesModel.addArrow(newArrow);
        },
      },
      actions: {
        addArrow: {
          isActive: true,
        },
      },
    };
  };
}

export function goToDrawArrow(startPoint: Point): DrawArrowViewState {
  return {
    type: "draw-arrow",
    startPoint,
    endPoint: startPoint,
  };
}
