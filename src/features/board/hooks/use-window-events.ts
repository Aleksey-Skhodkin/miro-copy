import { useRef, useLayoutEffect, useEffect } from "react";
import type { ViewModel } from "../view-model/view-model-type";

export function useWindowEvents(viewModel: ViewModel) {
  // ref создаем для того чтобы в useeffect не надо было ничего писать в зависимости
  const viewModelRef = useRef(viewModel);

  useLayoutEffect(() => {
    viewModelRef.current = viewModel;
  }, [viewModel]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      viewModelRef.current.window?.onMouseMove?.(e);
    };
    const onMouseUp = (e: MouseEvent) => {
      viewModelRef.current.window?.onMouseUp?.(e);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
}
