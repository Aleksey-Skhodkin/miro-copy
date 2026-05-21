import {
  useState,
  type RefCallback,
  useCallback,
  useRef,
  useEffect,
} from "react";

export type NodeDimensions = {
  width: number;
  height: number;
};

export type NodesDimensionsMap = Record<string, NodeDimensions>;

export const useNodesDimensions = () => {
  const [nodesDimensions, setNodesDimensions] = useState<NodesDimensionsMap>(
    {},
  );
  const resizeObserverRef = useRef<ResizeObserver | undefined>(undefined);

  const nodeRef: RefCallback<Element> = useCallback((el) => {
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        const nodesToUpdate = Object.fromEntries(
          entries
            .map((entry) => [
              (entry.target as HTMLElement).dataset.id,
              {
                width: entry.borderBoxSize[0].inlineSize,
                height: entry.borderBoxSize[0].blockSize,
              },
            ])
            .filter((entry) => !!entry[0]),
        );

        setNodesDimensions((prev) => ({ ...prev, ...nodesToUpdate }));
      });
    }

    const observer = resizeObserverRef.current;

    if (el) {
      observer.observe(el);
      return () => {
        setNodesDimensions((prev) => {
          const newNodesRects = { ...prev };
          delete newNodesRects[(el as HTMLElement).dataset.id ?? ""];
          return newNodesRects;
        });
        observer.unobserve(el);
      };
    }
  }, []);

  useEffect(() => {
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  return {
    nodesDimensions,
    nodeRef,
  };
};
