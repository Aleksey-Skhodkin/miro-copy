import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { useLayoutFocus } from "./hooks/use-layout-focus";
import { useNodesDimensions } from "./hooks/use-nodes-dimensions";
import { useWindowEvents } from "./hooks/use-window-events";
import { useNodes } from "./model/nodes";
import { useWindowPositionModel } from "./model/window-position";
import { ActionButton } from "./ui/ActionButton";
import { Actions } from "./ui/Actions";
import { Canvas } from "./ui/Canvas";
import { Dots } from "./ui/Dots";
import { Layout } from "./ui/Layout";
import { Overlay } from "./ui/Overlay";
import { SelectionWindow } from "./ui/SelectionWindow";
import { Sticker } from "./ui/nodes/Sticker";
import { useViewModel } from "./view-model/use-view-model";
import { Arrow } from "./ui/nodes/Arrow";

function BoardPage() {
  const nodesModel = useNodes();
  const windowPositionModel = useWindowPositionModel();
  const { canvasRef, canvasRect } = useCanvasRect();
  const { nodeRef, nodesDimensions } = useNodesDimensions();
  const focusLayoutRef = useLayoutFocus();
  const viewModel = useViewModel({
    nodesModel,
    canvasRect,
    nodesDimensions,
    windowPositionModel,
  });
  useWindowEvents(viewModel);

  const windowPosition =
    viewModel.windowPosition ?? windowPositionModel.position;

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Dots windowPosition={windowPosition} />
      <Canvas
        ref={canvasRef}
        onClick={viewModel.canvas?.onClick}
        windowPosition={windowPosition}
        overlay={
          <Overlay
            onClick={viewModel.overlay?.onClick}
            onMouseDown={viewModel.overlay?.onMouseDown}
            onMouseUp={viewModel.overlay?.onMouseUp}
          />
        }
      >
        {viewModel.nodes.map((node) => {
          if (node.type === "sticker") {
            return <Sticker key={node.id} {...node} ref={nodeRef} />;
          }
          if (node.type === "arrow") {
            return <Arrow key={node.id} {...node} ref={nodeRef} />;
          }
        })}
        {viewModel.selectionWindow && (
          <SelectionWindow {...viewModel.selectionWindow} />
        )}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewModel.actions?.addSticker?.isActive}
          onClick={viewModel.actions?.addSticker?.onClick}
        >
          <StickerIcon />
        </ActionButton>
        <ActionButton
          isActive={viewModel.actions?.addArrow?.isActive}
          onClick={viewModel.actions?.addArrow?.onClick}
        >
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

export const Component = BoardPage;
