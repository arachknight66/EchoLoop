"use client";

import { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";

type SoundControl = {
  id: string;
  label: string;
  fileName: string; // Added to map exactly to the .mp3 file names
  volume: number;
  isPlaying: boolean;
};

const sounds: SoundControl[] = [
  { id: "rain", label: "Rain", fileName: "rain", volume: 0, isPlaying: false },
  { id: "ocean", label: "Ocean Waves", fileName: "ocean_waves", volume: 0, isPlaying: false },
  { id: "forest", label: "Forest", fileName: "forest", volume: 0, isPlaying: false },
  { id: "wind", label: "Wind", fileName: "wind", volume: 0, isPlaying: false },
  { id: "fireplace", label: "Fireplace", fileName: "fireplace", volume: 0, isPlaying: false },
  { id: "night", label: "Night Ambience", fileName: "night_ambience", volume: 0, isPlaying: false },
];

export default function SoundMixer() {
  const [controls, setControls] = useState<Record<string, number>>(
    sounds.reduce((acc, sound) => ({ ...acc, [sound.id]: 0 }), {})
  );
  const [playing, setPlaying] = useState<Set<string>>(new Set());
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    // Update audio volumes
    Object.entries(controls).forEach(([soundId, volume]) => {
      const audio = audioRefs.current[soundId];
      if (audio) {
        audio.volume = volume / 100;
      }
    });
  }, [controls]);

  const handleVolumeChange = (soundId: string, value: number) => {
    // 1. Update React state for the UI
    setControls((prev) => ({
      ...prev,
      [soundId]: value,
    }));

    // 2. Instantly update volume on the ref to prevent initial audio spikes 
    const audio = audioRefs.current[soundId];
    if (audio) {
      audio.volume = value / 100;
    }

    // 3. Auto-play if slider is moved above 0
    if (value > 0 && !playing.has(soundId)) {
      toggleSound(soundId, true);
    } else if (value === 0 && playing.has(soundId)) {
      toggleSound(soundId, false);
    }
  };

  const toggleSound = (soundId: string, shouldPlay: boolean) => {
    const audio = audioRefs.current[soundId];
    if (!audio) return;

    // The buggy `&& controls[soundId] > 0` check was removed here
    // because React state updates are asynchronous and would block playback
    if (shouldPlay) {
      audio.play().catch((err) => {
        console.error(`Playback failed for ${soundId}:`, err);
      });
      setPlaying((prev) => {
        const newSet = new Set(prev);
        newSet.add(soundId);
        return newSet;
      });
    } else {
      audio.pause();
      // Removed audio.currentTime = 0 to allow seamless resuming of ambient loops
      setPlaying((prev) => {
        const newSet = new Set(prev);
        newSet.delete(soundId);
        return newSet;
      });
    }
  };

  const stopAllSounds = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
      }
    });
    setPlaying(new Set());
    setControls(
      sounds.reduce((acc, sound) => ({ ...acc, [sound.id]: 0 }), {})
    );
  };

  return (
    <div className="sound-mixer-container">
      <motion.div
        className="mixer-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mixer-header">
          <div>
            <h2 className="mixer-section-title">Custom Sound Mixer</h2>
            <p className="mixer-section-subtitle">
              Adjust individual sound volumes to create your perfect ambient mix
            </p>
          </div>
          <motion.button
            className="stop-all-btn"
            onClick={stopAllSounds}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Stop All
          </motion.button>
        </div>

        <div className="mixer-controls">
          {sounds.map((sound) => (
            <motion.div
              key={sound.id}
              className="mixer-control-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="control-header">
                <label className="sound-label">{sound.label}</label>
                <span className="volume-display">{controls[sound.id]}%</span>
              </div>

              <div className="slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={controls[sound.id]}
                  onChange={(e) =>
                    handleVolumeChange(sound.id, Number(e.target.value))
                  }
                  className="mixer-slider"
                />
                <div className="slider-background" />
              </div>

              {/* Pointing to the public/sounds/ folder */}
              <audio
                ref={(el) => {
                  if (el) audioRefs.current[sound.id] = el;
                }}
                src={`/sounds/${sound.fileName}.mp3`}
                loop
              />
            </motion.div>
          ))}
        </div>

        <p className="mixer-note">
          Move sliders to adjust volume. Sounds with volume above 0% will play
          automatically.
        </p>
      </motion.div>
    </div>
  );
}