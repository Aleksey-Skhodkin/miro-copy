import type { CanvasRect } from "../hooks/use-canvas-rect";
import type { NodesModel } from "../model/nodes";
import type { ViewStateModel } from "../model/view-state";

export type ViewModelParams = {
  viewStateModel: ViewStateModel;
  nodesModel: NodesModel;
  canvasRect: CanvasRect | undefined;
};
