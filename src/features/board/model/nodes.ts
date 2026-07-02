import { useState } from "react";
import type { Point } from "../domain/point";

type NodeBase = {
  id: string;
  type: string;
};

type StickerNode = NodeBase & {
  type: "sticker";
  text: string;
  x: number;
  y: number;
};

type ArrowNode = NodeBase & {
  type: "arrow";
  start: Point;
  end: Point;
};

export type Node = StickerNode | ArrowNode;

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", type: "sticker", text: "Hello 1", x: 100, y: 100 },
    { id: "2", type: "sticker", text: "Hello 2", x: 200, y: 200 },
    {
      id: "3",
      type: "arrow",
      start: { x: 10, y: 10, relativeTo: "1" },
      end: { x: 20, y: 20, relativeTo: "2" },
    },
  ]);

  const addSticker = (data: { text: string; x: number; y: number }) => {
    setNodes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "sticker",
        ...data,
      },
    ]);
  };

  const addArrow = (data: { start: Point; end: Point }) => {
    setNodes((prev) => [
      ...prev,
      {
        ...data,
        id: crypto.randomUUID(),
        type: "arrow",
      },
    ]);
  };

  const updateStickerText = (id: string, text: string) => {
    setNodes((prev) => {
      return prev.map((node) => (node.id === id ? { ...node, text } : node));
    });
  };

  const deleteNodes = (ids: Set<string>) => {
    setNodes((lastNodes) => {
      const arrowRelativeIds = new Set(
        lastNodes
          .filter(
            (node) =>
              (node.type === "arrow" &&
                node.start.relativeTo &&
                ids.has(node.start.relativeTo)) ||
              (node.type === "arrow" &&
                node.end.relativeTo &&
                ids.has(node.end.relativeTo)),
          )
          .map((node) => node.id),
      );

      return lastNodes.filter(
        (node) => !ids.has(node.id) && !arrowRelativeIds.has(node.id),
      );
    });
  };

  const updateNodesPosition = (
    positions: {
      id: string;
      point: Point;
      type?: "start" | "end";
    }[],
  ) => {
    const record = Object.fromEntries(
      positions.map((pos) => [`${pos.id}${pos.type ?? ""}`, pos]),
    );
    setNodes((prev) =>
      prev.map((node) => {
        if (node.type === "arrow") {
          const newPosition = record[`${node.id}start`];
          const newEndPosition = record[`${node.id}end`];
          return {
            ...node,
            start: newPosition?.point ?? node.start,
            end: newEndPosition?.point ?? node.end,
          };
        }
        if (node.type === "sticker") {
          const newPos = record[node.id];
          return newPos ? { ...node, ...newPos.point } : node;
        }

        return node;
      }),
    );
  };

  return {
    nodes,
    addSticker,
    addArrow,
    deleteNodes,
    updateStickerText,
    updateNodesPosition,
  };
}

export type NodesModel = ReturnType<typeof useNodes>;
