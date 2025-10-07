import type { IdleViewState } from "../../model/view-state";
import type { ViewModelParams } from "../view-model-params";
import type { ViewModel } from "../view-model-type";

export function useIdleViewModel({
  nodesModel,
  viewStateModel,
}: ViewModelParams) {
  return (idleState: IdleViewState): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      isSelected: idleState.selectedIds.has(node.id),
      onClick: (e) => {
        if (e.ctrlKey || e.shiftKey) {
          viewStateModel.selection([node.id], "toggle");
        } else {
          viewStateModel.selection([node.id], "replace");
        }
      },
    })),
    layout: {
      onKeyDown: (e) => {
        if (e.key === "s") {
          viewStateModel.goToAddSticker();
        }
      },
    },
    overlay: {
      onClick: () => {
        viewStateModel.selection([], "replace");
      },
    },
    actions: {
      addSticker: {
        isActive: false,
        onClick: () => viewStateModel.goToAddSticker(),
      },
    },
  });
}
