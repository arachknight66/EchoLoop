"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CANVAS_BACKGROUND = "rgba(50, 50, 50, 0.8)";
const CANVAS_STROKE_COLOR = "#DCDBCE";
const CANVAS_STROKE_WIDTH = 4;

const configureDrawingContext = (context: CanvasRenderingContext2D) => {
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = CANVAS_STROKE_WIDTH;
  context.strokeStyle = CANVAS_STROKE_COLOR;
};

const fillCanvasBackground = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
) => {
  context.fillStyle = CANVAS_BACKGROUND;
  context.fillRect(0, 0, canvas.width, canvas.height);
};

type JournalDrawingCanvasProps = {
  onCanvasDataChange?: (data: string | null) => void;
};

export default function JournalDrawingCanvas({
  onCanvasDataChange,
}: JournalDrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const onCanvasDataChangeRef = useRef(onCanvasDataChange);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  useEffect(() => {
    onCanvasDataChangeRef.current = onCanvasDataChange;
  }, [onCanvasDataChange]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!canvas || !context) {
      return;
    }

    // Completely clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Fill with background
    fillCanvasBackground(canvas, context);
    setHasDrawing(false);
    onCanvasDataChangeRef.current?.(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const syncCanvasSize = () => {
      const width = Math.max(1, Math.round(canvas.clientWidth));
      const height = Math.max(1, Math.round(canvas.clientHeight));

      if (canvas.width === width && canvas.height === height) {
        return;
      }

      canvas.width = width;
      canvas.height = height;
      configureDrawingContext(context);
      fillCanvasBackground(canvas, context);
      onCanvasDataChangeRef.current?.(null);
    };

    contextRef.current = context;
    syncCanvasSize();

    window.addEventListener("resize", syncCanvasSize);
    return () => window.removeEventListener("resize", syncCanvasSize);
  }, []);

  const getPointerPosition = (
    event: React.PointerEvent<HTMLCanvasElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;

    if (!context) {
      return;
    }

    event.preventDefault();
    const { x, y } = getPointerPosition(event);

    context.beginPath();
    context.moveTo(x, y);
    setIsPointerDown(true);
    setHasDrawing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;

    if (!isPointerDown || !context) {
      return;
    }

    event.preventDefault();
    const { x, y } = getPointerPosition(event);
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = (event?: React.PointerEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;

    if (!context || !isPointerDown) {
      return;
    }

    if (event && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    context.closePath();
    setIsPointerDown(false);

    const canvas = canvasRef.current;
    if (canvas) {
      onCanvasDataChangeRef.current?.(canvas.toDataURL());
    }
  };

  return (
    <motion.div
      className="journal-canvas-wrapper"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Journal sketch canvas"
        className="journal-sketch-surface"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
        onPointerCancel={stopDrawing}
      />
      <motion.button
        onClick={clearCanvas}
        className="canvas-clear-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!hasDrawing}
      >
        Clear
      </motion.button>
    </motion.div>
  );
}
