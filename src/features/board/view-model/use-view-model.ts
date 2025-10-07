import { useAddStickerViewModel } from "./variants/add-sticker";
import { useIdleViewModel } from "./variants/idle";
import type { ViewModelParams } from "./view-model-params";
import type { ViewModel } from "./view-model-type";

export function useViewModel(params: ViewModelParams) {
  const idleViewModel = useIdleViewModel(params);
  const addStickerViewModel = useAddStickerViewModel(params);

  let viewModel: ViewModel;
  switch (params.viewStateModel.viewState.type) {
    case "add-sticker":
      viewModel = addStickerViewModel();
      break;
    case "idle": {
      viewModel = idleViewModel(params.viewStateModel.viewState);
      break;
    }
    default:
      throw new Error("Invalid view state");
  }

  return viewModel;
}
