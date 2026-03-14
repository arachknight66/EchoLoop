import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to EchoLoop</h1>
            <p className="text-lg text-center mb-8">
                Your journey to mental wellness starts here. Explore journaling, drawing, sleep awareness, ambient sounds, and reflection insights.
            </p>
            <div className="flex space-x-4">
                <a href="/journal" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Start Journaling
                </a>
                <a href="/drawing" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Start Drawing
                </a>
                <a href="/sleep" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                    Sleep Awareness
                </a>
                <a href="/sounds" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Ambient Sounds
                </a>
                <a href="/insights" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Reflection Insights
                </a>
            </div>
        </div>
    );
};

export default HomePage;