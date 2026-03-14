"use client";

import { useState } from "react";
import DrawingCanvas from "@/components/DrawingCanvas";

export default function DrawingPage() {
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  return (
    <section className="page-shell">
      <div className="page-hero compact-hero">
        <p className="page-kicker">Visual reflection</p>
        <h1 className="page-title">Sketch your way through the noise.</h1>
        <p className="page-copy">
          Use drawing mode to mark up the canvas, or pause in writing mode when
          you want the page to rest.
        </p>
        <button
          onClick={() => setIsDrawingMode((currentMode) => !currentMode)}
          className="toggle-pill"
        >
          {isDrawingMode ? "Switch to Writing Mode" : "Switch to Drawing Mode"}
        </button>
      </div>
      <DrawingCanvas isDrawing={isDrawingMode} />
    </section>
  );
}
