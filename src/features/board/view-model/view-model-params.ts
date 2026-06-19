import type { CanvasRect } from "../hooks/use-canvas-rect";
import type { NodesDimensionsMap } from "../hooks/use-nodes-dimensions";
import type { NodesModel } from "../model/nodes";
import type { WindowPositionModel } from "../model/window-position";
import type { ViewState } from "./use-view-model";

export type ViewModelParams = {
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  nodesModel: NodesModel;
  canvasRect: CanvasRect | undefined;
  nodesDimensions: NodesDimensionsMap;
  windowPositionModel: WindowPositionModel;
};
