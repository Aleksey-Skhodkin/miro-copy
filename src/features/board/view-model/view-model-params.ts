import type { CanvasRect } from "../hooks/use-canvas-rect";
import type { NodesModel } from "../model/nodes";
import type { ViewState } from "./use-view-model";

export type ViewModelParams = {
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  nodesModel: NodesModel;
  canvasRect: CanvasRect | undefined;
};
