import type { KeyboardEvent } from "react";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";

export function useDeleteSelected({
  nodesModel,
  setViewState,
}: ViewModelParams) {
  const deleteSelected = (viewState: IdleViewState) => {
    if (viewState.selectedIds.size > 0) {
      nodesModel.deleteNodes(viewState.selectedIds);
      setViewState({
        ...viewState,
        selectedIds: new Set(),
      });
    }
  };

  const handleKeyDown = (viewState: IdleViewState, e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      deleteSelected(viewState);
    }
  };

  return { handleKeyDown };
}
