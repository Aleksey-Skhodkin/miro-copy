import { useRef, useEffect } from "react";

export function useLayoutFocus() {
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.focus();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        layoutRef.current?.focus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return layoutRef;
}
