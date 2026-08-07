"use client";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type DrawingCanvasProps = {
  isDrawing: boolean;
  onSaveDrawing?: (data: string) => void;
};

export default function DrawingCanvas({ isDrawing, onSaveDrawing }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [hasUnsavedDrawing, setHasUnsavedDrawing] = useState(false);

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
    context.strokeStyle = "#DCDBCE";
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
    setHasUnsavedDrawing(true);
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

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas && onSaveDrawing) {
      onSaveDrawing(canvas.toDataURL());
      setHasUnsavedDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasUnsavedDrawing(false);
  };

  return (
    <motion.div
      className="panel-card canvas-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      <div className="canvas-button-group">
        <motion.button
          onClick={saveDrawing}
          className="canvas-save-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!hasUnsavedDrawing}
        >
          Save Sketch
        </motion.button>
        <motion.button
          onClick={clearCanvas}
          className="canvas-clear-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Clear Canvas
        </motion.button>
      </div>
      {hasUnsavedDrawing && (
        <p className="canvas-unsaved-note">Unsaved changes</p>
      )}
    </motion.div>
  );
}
