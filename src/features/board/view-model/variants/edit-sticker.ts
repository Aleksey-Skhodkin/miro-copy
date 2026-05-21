import type { ViewModelParams } from "../view-model-params";
import type { ViewModelNode, ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type EditStickerViewState = {
  stickerId: string;
  type: "edit-sticker";
  newText?: string;
};

export function useEditStickerViewModel({
  nodesModel,
  setViewState,
}: ViewModelParams) {
  return (viewState: EditStickerViewState): ViewModel => ({
    nodes: nodesModel.nodes.map<ViewModelNode>((node) => {
      return node.id === viewState.stickerId
        ? {
            ...node,
            isSelected: true,
            isEditing: true,
            text: viewState.newText ?? node.text,
            onTextChange: (text) => {
              setViewState({ ...viewState, newText: text });
            },
          }
        : node;
    }),
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          if (viewState.newText) {
            nodesModel.updateStickerText(
              viewState.stickerId,
              viewState.newText,
            );
          }
          setViewState(goToIdle());
        }
      },
    },
    overlay: {
      onClick: () => {
        if (viewState.newText) {
          nodesModel.updateStickerText(viewState.stickerId, viewState.newText);
        }
        setViewState(goToIdle());
      },
    },
  });
}

export function goToEditSticker(stickerId: string): EditStickerViewState {
  return {
    stickerId,
    type: "edit-sticker",
  };
}
