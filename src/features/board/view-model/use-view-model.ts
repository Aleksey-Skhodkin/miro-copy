import { useState } from "react";
import { useCommonActionsDecorator } from "./decorator/common-actions";
import { useZoomDecorator } from "./decorator/zoom";
import {
  useAddArrowViewModel,
  type AddArrowViewState,
} from "./variants/add-arrow";
import {
  useAddStickerViewModel,
  type AddStickerViewState,
} from "./variants/add-sticker";
import {
  useDrawArrowViewModel,
  type DrawArrowViewState,
} from "./variants/draw-arrow";
import {
  useEditStickerViewModel,
  type EditStickerViewState,
} from "./variants/edit-sticker";
import {
  goToIdle,
  useIdleViewModel,
  type IdleViewState,
} from "./variants/idle";
import {
  useNodesDraggingViewModel,
  type NodesDraggingViewState,
} from "./variants/nodes-dragging";
import {
  useSelectionWindowViewModel,
  type SelectionWindowViewState,
} from "./variants/selection-window";
import {
  useWindowDraggingViewModel,
  type WindowDraggingViewState,
} from "./variants/window-dragging";
import type { ViewModelParams } from "./view-model-params";
import type { ViewModel } from "./view-model-type";

export type ViewState =
  | AddStickerViewState
  | AddArrowViewState
  | DrawArrowViewState
  | EditStickerViewState
  | IdleViewState
  | SelectionWindowViewState
  | NodesDraggingViewState
  | WindowDraggingViewState;

export function useViewModel(params: Omit<ViewModelParams, "setViewState">) {
  const [viewState, setViewState] = useState<ViewState>(() => goToIdle());

  const newParams = {
    ...params,
    setViewState,
  };

  const addStickerViewModel = useAddStickerViewModel(newParams);
  const addArrowViewModel = useAddArrowViewModel(newParams);
  const drawArrowViewModel = useDrawArrowViewModel(newParams);
  const editStickerViewModel = useEditStickerViewModel(newParams);
  const idleViewModel = useIdleViewModel(newParams);
  const selectionWindowViewModel = useSelectionWindowViewModel(newParams);
  const nodesDraggingViewModel = useNodesDraggingViewModel(newParams);
  const windowDraggingViewModel = useWindowDraggingViewModel(newParams);

  const zoomDecorator = useZoomDecorator(newParams);
  const commonActionsDecorator = useCommonActionsDecorator(newParams);

  let viewModel: ViewModel;
  switch (viewState.type) {
    case "add-sticker":
      viewModel = commonActionsDecorator(addStickerViewModel());
      break;
    case "add-arrow":
      viewModel = commonActionsDecorator(addArrowViewModel());
      break;
    case "draw-arrow":
      viewModel = drawArrowViewModel(viewState);
      break;
    case "edit-sticker":
      viewModel = editStickerViewModel(viewState);
      break;
    case "idle": {
      viewModel = commonActionsDecorator(idleViewModel(viewState));
      break;
    }
    case "selection-window":
      viewModel = selectionWindowViewModel(viewState);
      break;
    case "nodes-dragging":
      viewModel = nodesDraggingViewModel(viewState);
      break;
    case "window-dragging":
      viewModel = windowDraggingViewModel(viewState);
      break;
    default:
      throw new Error("Invalid view state");
  }

  return zoomDecorator(viewModel);
}
