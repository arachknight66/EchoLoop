"use client";

import { useEffect, useRef, useState } from "react";

type DrawingCanvasProps = {
  isDrawing: boolean;
};

export default function DrawingCanvas({ isDrawing }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.lineCap = "round";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const context = contextRef.current;

    if (!context) {
      return;
    }

    context.beginPath();
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsPointerDown(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;

    if (!isDrawing || !isPointerDown || !context) {
      return;
    }

    context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = contextRef.current;

    if (!context) {
      return;
    }

    context.closePath();
    setIsPointerDown(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="panel-card canvas-panel">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className={`sketch-surface ${
          isDrawing ? "cursor-crosshair" : "cursor-not-allowed opacity-60"
        }`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <p className="panel-note">
        {isDrawing
          ? "Drawing mode is active."
          : "Writing mode is selected. Switch back to drawing to sketch on the canvas."}
      </p>
      <button
        onClick={clearCanvas}
        className="panel-button"
      >
        Clear Canvas
      </button>
    </div>
  );
}
