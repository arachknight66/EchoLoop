import React, { useState, useEffect } from 'react';

const SoundPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSound, setCurrentSound] = useState(null);
    const [audioElement, setAudioElement] = useState(null);
    const sounds = [
        { name: 'Rain', file: '/rain.mp3' },
        { name: 'Ocean', file: '/ocean.mp3' },
        { name: 'Forest', file: '/forest.mp3' },
        { name: 'Wind', file: '/wind.mp3' },
        { name: 'Night', file: '/night.mp3' },
    ];

    useEffect(() => {
        const audio = new Audio(currentSound);
        setAudioElement(audio);

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [isPlaying, currentSound]);

    const handlePlayPause = (sound) => {
        if (currentSound === sound) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentSound(sound);
            setIsPlaying(true);
        }
    };

    return (
        <div className="sound-player">
            <h2 className="text-lg font-bold">Ambient Sounds</h2>
            <div className="grid grid-cols-2 gap-4">
                {sounds.map((sound) => (
                    <div key={sound.name} className="sound-item">
                        <button
                            onClick={() => handlePlayPause(sound.file)}
                            className={`p-2 rounded ${isPlaying && currentSound === sound.file ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {isPlaying && currentSound === sound.file ? 'Pause' : 'Play'} {sound.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoundPlayer;