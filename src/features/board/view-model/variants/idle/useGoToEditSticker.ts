import type { MouseEvent, KeyboardEvent } from "react";
import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";
import { goToEditSticker } from "../edit-sticker";

export function useGoToEditSticker(params: ViewModelParams) {
  const { setViewState } = params;
  const handleNodeClick = (
    idleState: IdleViewState,
    nodeId: string,
    e: MouseEvent,
  ) => {
    if (
      idleState.selectedIds.size === 1 &&
      idleState.selectedIds.has(nodeId) &&
      !e.ctrlKey &&
      !e.shiftKey
    ) {
      setViewState(goToEditSticker(nodeId));
      return { preventNext: true };
    }
    return { preventNext: false };
  };

  const handleKeyDown = (idleState: IdleViewState, e: KeyboardEvent) => {
    if (
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.metaKey &&
      !e.altKey &&
      idleState.selectedIds.size === 1
    ) {
      const [id] = idleState.selectedIds.values();
      setViewState(goToEditSticker(id));
      return { preventNext: true };
    }
    return { preventNext: false };
  };

  return { handleNodeClick, handleKeyDown };
}
