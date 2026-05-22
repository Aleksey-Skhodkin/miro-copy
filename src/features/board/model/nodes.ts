import { useState } from "react";

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

type Node = StickerNode;

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", type: "sticker", text: "Hello 1", x: 100, y: 100 },
    { id: "2", type: "sticker", text: "Hello 2", x: 200, y: 200 },
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

  const updateStickerText = (id: string, text: string) => {
    setNodes((prev) => {
      return prev.map((node) => (node.id === id ? { ...node, text } : node));
    });
  };

  const deleteNodes = (ids: Set<string>) => {
    setNodes((lastNodes) => {
      return lastNodes.filter((node) => !ids.has(node.id));
    });
  };

  const updateNodesPosition = (
    positions: {
      id: string;
      x: number;
      y: number;
    }[],
  ) => {
    const record = Object.fromEntries(positions.map((pos) => [pos.id, pos]));
    setNodes((prev) =>
      prev.map((node) => {
        const newPos = record[node.id];
        return newPos ? { ...node, x: newPos.x, y: newPos.y } : node;
      }),
    );
  };

  return {
    nodes,
    addSticker,
    deleteNodes,
    updateStickerText,
    updateNodesPosition,
  };
}

export type NodesModel = ReturnType<typeof useNodes>;
