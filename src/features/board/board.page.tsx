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
import { Sticker } from "./ui/Sticker";
import { useViewModel } from "./view-model/use-view-model";
import { vectorFromPoints, type Point } from "./domain/point";

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
        {viewModel.nodes.map((node) => (
          <Sticker key={node.id} {...node} ref={nodeRef} />
        ))}
        {viewModel.selectionWindow && (
          <SelectionWindow {...viewModel.selectionWindow} />
        )}
        <Arrow start={{ x: 30, y: 50 }} end={{ x: 90, y: 90 }} />
      </Canvas>
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

function Arrow({ start, end }: { start: Point; end: Point }) {
  const diff = vectorFromPoints(start, end);
  const angle = Math.atan2(diff.y, diff.x);
  const arrowRightAngle = angle + Math.PI * (1 - 1 / 6);
  const arrowLeftAngle = angle - Math.PI * (1 - 1 / 6);
  const arrowRightDiff = [
    Math.cos(arrowRightAngle) * 10,
    Math.sin(arrowRightAngle) * 10,
  ];
  const arrowLeftDiff = [
    Math.cos(arrowLeftAngle) * 10,
    Math.sin(arrowLeftAngle) * 10,
  ];

  return (
    <svg className="absolute left-0 top-0 pointer-events-none">
      <path
        className="pointer-events-auto"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="black"
        d={`
          M ${start.x} ${start.y} L ${end.x} ${end.y} 
          M ${end.x} ${end.y} L ${end.x + arrowRightDiff[0]} ${end.y + arrowRightDiff[1]} 
          L ${end.x + -5 * Math.cos(angle)} ${end.y + -5 * Math.sin(angle)}
          L ${end.x + arrowLeftDiff[0]} ${end.y + arrowLeftDiff[1]}
          L ${end.x} ${end.y}
          `}
      />
    </svg>
  );
}
