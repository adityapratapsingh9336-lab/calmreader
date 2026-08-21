import React, { useRef, useEffect, useState } from 'react';
import StrokeGuidanceOverlay from './StrokeGuidanceOverlay';

export default function TracingCanvas({
  template,
  inkColor = '#38bdf8',
  brushSize = 12,
  isEraser = false,
  isGuidedMode = true,
  isGhostDemoActive = false,
  onStrokeUpdate,
  canvasRef,
  drawnPointsRef,
}) {
  const localCanvasRef = useRef(null);
  const activeCanvas = canvasRef || localCanvasRef;

  const [isDrawing, setIsDrawing] = useState(false);
  const strokeHistoryRef = useRef([]);

  // Clear canvas helper
  const clearCanvas = () => {
    const canvas = activeCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (drawnPointsRef) drawnPointsRef.current = [];
    strokeHistoryRef.current = [];
    if (onStrokeUpdate) onStrokeUpdate([]);
  };

  // Undo helper
  const undoStroke = () => {
    const canvas = activeCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (strokeHistoryRef.current.length > 0) {
      strokeHistoryRef.current.pop();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Redraw remaining stroke history
      strokeHistoryRef.current.forEach((stroke) => {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        stroke.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      });

      const allPoints = strokeHistoryRef.current.flatMap((s) => s.points);
      if (drawnPointsRef) drawnPointsRef.current = allPoints;
      if (onStrokeUpdate) onStrokeUpdate(allPoints);
    }
  };

  // Setup Canvas DPI
  useEffect(() => {
    const canvas = activeCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 300;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [template, activeCanvas]);

  const getCanvasCoordinates = (e) => {
    const canvas = activeCanvas.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getCanvasCoordinates(e);

    const canvas = activeCanvas.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    const currentStroke = {
      color: isEraser ? '#020617' : inkColor,
      size: isEraser ? brushSize * 2 : brushSize,
      points: [pos],
    };
    strokeHistoryRef.current.push(currentStroke);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getCanvasCoordinates(e);

    const canvas = activeCanvas.current;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = isEraser ? '#020617' : inkColor;
    ctx.lineWidth = isEraser ? brushSize * 2 : brushSize;
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    // Record point
    const currentStroke = strokeHistoryRef.current[strokeHistoryRef.current.length - 1];
    if (currentStroke) {
      currentStroke.points.push(pos);
    }

    const allPoints = strokeHistoryRef.current.flatMap((s) => s.points);
    if (drawnPointsRef) drawnPointsRef.current = allPoints;
    if (onStrokeUpdate) onStrokeUpdate(allPoints);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="relative w-[300px] h-[300px] bg-slate-950 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl touch-none mx-auto select-none">
      {/* Background Guidelines & Numbered Waypoints */}
      <StrokeGuidanceOverlay
        template={template}
        isGuidedMode={isGuidedMode}
        isGhostDemoActive={isGhostDemoActive}
        brushSize={brushSize}
      />

      {/* Interactive HTML5 Drawing Canvas */}
      <canvas
        ref={activeCanvas}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="absolute inset-0 w-full h-full cursor-crosshair z-10"
      />
    </div>
  );
}
