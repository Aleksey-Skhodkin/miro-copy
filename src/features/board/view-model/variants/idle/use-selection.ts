import {
  selectItems,
  type SelectionModifier,
} from "@/features/board/domain/selection";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";

export function useSelection({ setViewState }: ViewModelParams) {
  const select = (
    lastState: IdleViewState,
    ids: string[],
    modif: SelectionModifier,
  ) => {
    setViewState({
      ...lastState,
      selectedIds: selectItems(lastState.selectedIds, ids, modif),
    });
  };

  const isSelected = (idleState: IdleViewState, nodeId: string) => {
    return idleState.selectedIds.has(nodeId);
  };

  const handleNodeClick = (
    idleState: IdleViewState,
    nodeId: string,
    e: React.MouseEvent,
  ) => {
    if (e.ctrlKey || e.shiftKey) {
      select(idleState, [nodeId], "toggle");
    } else {
      select(idleState, [nodeId], "replace");
    }
  };

  const handleOverlayMouseUp = (idleState: IdleViewState) => {
    if (idleState.mouseDown) {
      // select(idleState, [], "replace");
      setViewState({
        ...idleState,
        selectedIds: selectItems(idleState.selectedIds, [], "replace"),
      });
    }
  };

  return {
    isSelected,
    handleNodeClick,
    handleOverlayMouseUp,
  };
}
