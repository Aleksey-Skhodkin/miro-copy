import { useState } from "react";

type AddStickerViewState = {
  type: "add-sticker";
};

type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
};

type ViewState = IdleViewState | AddStickerViewState;

export function useViewModel() {
  const [viewState, setViewState] = useState<ViewState>({
    type: "idle",
    selectedIds: new Set(),
  });

  const goToIdle = () => {
    setViewState({ type: "idle", selectedIds: new Set() });
  };

  const goToAddSticker = () => {
    setViewState({ type: "add-sticker" });
  };

  const selection = (ids: string[], modif: "replace" | "add" | "toggle") => {
    setViewState((state) => {
      if (state.type === "idle") {
        return selectItems(state, ids, modif);
      }
      return state;
    });
  };

  return {
    viewState,
    goToIdle,
    goToAddSticker,
    selection,
  };
}

function selectItems(
  viewState: IdleViewState,
  ids: string[],
  modif: "replace" | "add" | "toggle"
) {
  switch (modif) {
    case "replace":
      return {
        ...viewState,
        selectedIds: new Set(ids),
      };
    case "add":
      return {
        ...viewState,
        selectedIds: new Set([...viewState.selectedIds, ...ids]),
      };
    case "toggle": {
      const currentIds = new Set(viewState.selectedIds);
      const newIds = new Set(ids);

      const base = Array.from(viewState.selectedIds).filter(
        (id) => !newIds.has(id)
      );
      const added = ids.filter((id) => !currentIds.has(id));
      return {
        ...viewState,
        selectItems: new Set([...base, ...added]),
      };
    }
  }
}
