import React from 'react';
import SoundPlayer from '../../components/SoundPlayer';

const SoundsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Calm Sounds</h1>
            <p className="mb-4 text-lg text-center">
                Explore our collection of ambient sounds to help you relax and focus.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <SoundPlayer soundName="Rain" soundFile="/rain.mp3" />
                <SoundPlayer soundName="Ocean" soundFile="/ocean.mp3" />
                <SoundPlayer soundName="Forest" soundFile="/forest.mp3" />
                <SoundPlayer soundName="Wind" soundFile="/wind.mp3" />
                <SoundPlayer soundName="Night" soundFile="/night.mp3" />
            </div>
        </div>
    );
};

export default SoundsPage;