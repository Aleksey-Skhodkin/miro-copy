import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { useLayoutFocus } from "./hooks/use-layout-focus";
import { useWindowEvents } from "./hooks/use-window-events";
import { useNodes } from "./model/nodes";
import { ActionButton } from "./ui/ActionButton";
import { Actions } from "./ui/Actions";
import { Canvas } from "./ui/Canvas";
import { Dots } from "./ui/Dots";
import { Layout } from "./ui/Layout";
import { Overlay } from "./ui/Overlay";
import { SelectionWindow } from "./ui/SelectionWindow";
import { Sticker } from "./ui/Sticker";
import { useViewModel } from "./view-model/use-view-model";

function BoardPage() {
  const nodesModel = useNodes();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();
  const viewModel = useViewModel({
    nodesModel,
    canvasRect,
  });
  useWindowEvents(viewModel);

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Dots />
      <Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
        <Overlay
          onClick={viewModel.overlay?.onClick}
          onMouseDown={viewModel.overlay?.onMouseDown}
          onMouseUp={viewModel.overlay?.onMouseUp}
        />
        {viewModel.nodes.map(({ id, text, x, y, isSelected, onClick }) => (
          <Sticker
            key={id}
            text={text}
            x={x}
            y={y}
            selected={isSelected}
            onClick={onClick}
          />
        ))}
      </Canvas>
      {viewModel.selectionWindow && (
        <SelectionWindow {...viewModel.selectionWindow} />
      )}
      <Actions>
        <ActionButton
          isActive={viewModel.actions?.addSticker?.isActive}
          onClick={viewModel.actions?.addSticker?.onClick}
        >
          <StickerIcon />
        </ActionButton>
        <ActionButton isActive={false} onClick={() => {}}>
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

export const Component = BoardPage;
