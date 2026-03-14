import React from 'react';
import SleepTracker from '@/components/SleepTracker';
import SoundPlayer from '@/components/SoundPlayer';

const SleepPage = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Sleep Overview</h1>
            <SleepTracker />
            <SoundPlayer />
        </div>
    );
};

export default SleepPage;