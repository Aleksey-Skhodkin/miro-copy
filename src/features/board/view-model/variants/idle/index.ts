import { type Selection } from "../../../domain/selection";
import type { ViewModelParams } from "../../view-model-params";
import type { ViewModel } from "../../view-model-type";
import { useDeleteSelected } from "./use-delete-selected";
import { useSelection } from "./use-selection";
import { useGoToEditSticker } from "./useGoToEditSticker";
import { useGoToNodesDragging } from "./useGoToNodesDragging";
import { useGoToSelectionWindow } from "./useGoToSelectionWindow";
import { useGoToWindowDragging } from "./useGoToWindowDragging";
import { useMouseDown } from "./useMouseDown";

export type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
  mouseDown?:
    | {
        type: "overlay";
        x: number;
        y: number;
        isRightClick: boolean;
      }
    | {
        type: "node";
        x: number;
        y: number;
        nodeId: string;
        isRightClick: boolean;
      };
};

export function useIdleViewModel(params: ViewModelParams) {
  const { nodesModel } = params;

  const selection = useSelection(params);
  const deleteSelected = useDeleteSelected(params);
  const goToEditSticker = useGoToEditSticker(params);
  const mouseDown = useMouseDown(params);
  const goToSelectionWindow = useGoToSelectionWindow(params);
  const goToNodesDragging = useGoToNodesDragging(params);
  const goToWindowDragging = useGoToWindowDragging(params);

  return (idleState: IdleViewState): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      // isSelected: idleState.selectedIds.has(node.id),
      isSelected: selection.isSelected(idleState, node.id),
      onMouseDown: (e: React.MouseEvent) =>
        mouseDown.handleNodeMouseDown(idleState, node.id, e),
      onMouseUp: (e: React.MouseEvent) => {
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
        goToWindowDragging.handleWindowMouseMove(idleState, e);
      },
      onMouseUp: () => mouseDown.handeWindowMouseUp(idleState),
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
