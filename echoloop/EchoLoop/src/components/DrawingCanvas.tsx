import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineWidth = 5;
                setContext(ctx);
            }
        }
    }, []);

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (context) {
            context.beginPath();
            context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
            setIsDrawing(true);
        }
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !context) return;
        context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        if (context) {
            context.closePath();
            setIsDrawing(false);
        }
    };

    const clearCanvas = () => {
        if (context) {
            context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border border-gray-300"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <button onClick={clearCanvas} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Clear Canvas
            </button>
        </div>
    );
};

export default DrawingCanvas;