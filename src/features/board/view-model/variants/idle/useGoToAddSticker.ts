import type { KeyboardEvent } from "react";
import type { ViewModelParams } from "../../view-model-params";
import { goToAddSticker } from "../add-sticker";

export function useGoToAddSticker(params: ViewModelParams) {
  const { setViewState } = params;

  const handeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "s") {
      setViewState(goToAddSticker());
    }
  };

  const handleActionClick = () => {
    setViewState(goToAddSticker());
  };

  return { handeKeyDown, handleActionClick };
}
