import { type Selection } from "../../../domain/selection";
import type { ViewModelParams } from "../../view-model-params";
import type { ViewModel } from "../../view-model-type";
import { useGoToNodesDragging } from "./goToNodesDragging";
import { useDeleteSelected } from "./use-delete-selected";
import { useSelection } from "./use-selection";
import { useGoToAddSticker } from "./useGoToAddSticker";
import { useGoToEditSticker } from "./useGoToEditSticker";
import { useGoToSelectionWindow } from "./useGoToSelectionWindow";
import { useMouseDown } from "./useMouseDown";

export type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
  mouseDown?:
    | {
        type: "overlay";
        x: number;
        y: number;
      }
    | {
        type: "node";
        x: number;
        y: number;
        nodeId: string;
      };
};

export function useIdleViewModel(params: ViewModelParams) {
  const { nodesModel } = params;

  const selection = useSelection(params);
  const deleteSelected = useDeleteSelected(params);
  const goToEditSticker = useGoToEditSticker(params);
  const goToAddSticker = useGoToAddSticker(params);
  const mouseDown = useMouseDown(params);
  const goToSelectionWindow = useGoToSelectionWindow(params);
  const goToNodesDragging = useGoToNodesDragging(params);

  return (idleState: IdleViewState): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      // isSelected: idleState.selectedIds.has(node.id),
      isSelected: selection.isSelected(idleState, node.id),
      onMouseDown: (e) => mouseDown.handleNodeMouseDown(idleState, node.id, e),
      onMouseUp: (e) => {
        if (!mouseDown.getIsStickerMouseDown(idleState, node.id)) return;
        const clickResult = goToEditSticker.handleNodeClick(
          idleState,
          node.id,
          e,
        );
        if (clickResult.preventNext) return;
        selection.handleNodeClick(idleState, node.id, e);
      },
    })),
    layout: {
      onKeyDown: (e) => {
        deleteSelected.handleKeyDown(idleState, e);
        goToAddSticker.handeKeyDown(e);
      },
    },
    overlay: {
      onMouseDown: (e) => mouseDown.handleOverlayMouseDown(idleState, e),
      onMouseUp: () => {
        selection.handleOverlayMouseUp(idleState);
      },
    },
    window: {
      onMouseMove: (e) => {
        goToNodesDragging.handleWindowMouseMove(idleState, e);
        goToSelectionWindow.handleWindowMouseMove(idleState, e);
      },
      onMouseUp: () => mouseDown.handeWindowMouseUp(idleState),
    },
    actions: {
      addSticker: {
        isActive: false,
        onClick: goToAddSticker.handleActionClick,
      },
    },
  });
}

export function goToIdle({
  selectedIds,
}: {
  selectedIds?: Selection;
} = {}): IdleViewState {
  return {
    type: "idle",
    selectedIds: selectedIds ?? new Set(),
  };
}
