import React, { useState } from 'react';
import DrawingCanvas from '../../components/DrawingCanvas';

const DrawingPage = () => {
    const [isDrawing, setIsDrawing] = useState(true);

    const toggleMode = () => {
        setIsDrawing(!isDrawing);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">EchoLoop Drawing Page</h1>
            <button 
                onClick={toggleMode} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                {isDrawing ? 'Switch to Writing Mode' : 'Switch to Drawing Mode'}
            </button>
            <DrawingCanvas isDrawing={isDrawing} />
        </div>
    );
};

export default DrawingPage;