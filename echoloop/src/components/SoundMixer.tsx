"use client";

import { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";

type SoundControl = {
  name: string;
  label: string;
  volume: number;
  isPlaying: boolean;
};

const sounds: SoundControl[] = [
  { name: "rain", label: "Rain", volume: 0, isPlaying: false },
  { name: "ocean", label: "Ocean Waves", volume: 0, isPlaying: false },
  { name: "forest", label: "Forest", volume: 0, isPlaying: false },
  { name: "wind", label: "Wind", volume: 0, isPlaying: false },
  { name: "fireplace", label: "Fireplace", volume: 0, isPlaying: false },
  { name: "night", label: "Night Ambience", volume: 0, isPlaying: false },
];

export default function SoundMixer() {
  const [controls, setControls] = useState<Record<string, number>>(
    sounds.reduce((acc, sound) => ({ ...acc, [sound.name]: 0 }), {})
  );
  const [playing, setPlaying] = useState<Set<string>>(new Set());
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    // Update audio volumes
    Object.entries(controls).forEach(([soundName, volume]) => {
      const audio = audioRefs.current[soundName];
      if (audio) {
        audio.volume = volume / 100;
      }
    });
  }, [controls]);

  const handleVolumeChange = (soundName: string, value: number) => {
    setControls((prev) => ({
      ...prev,
      [soundName]: value,
    }));

    // Auto-play if slider is moved above 0
    if (value > 0 && !playing.has(soundName)) {
      toggleSound(soundName, true);
    } else if (value === 0 && playing.has(soundName)) {
      toggleSound(soundName, false);
    }
  };

  const toggleSound = (soundName: string, shouldPlay: boolean) => {
    const audio = audioRefs.current[soundName];
    if (!audio) return;

    if (shouldPlay && controls[soundName] > 0) {
      audio.play().catch(() => {
        // Audio playback failed, silently continue
      });
      setPlaying((prev) => {
        const newSet = new Set(prev);
        newSet.add(soundName);
        return newSet;
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
      setPlaying((prev) => {
        const newSet = new Set(prev);
        newSet.delete(soundName);
        return newSet;
      });
    }
  };

  const stopAllSounds = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setPlaying(new Set());
    setControls(
      sounds.reduce((acc, sound) => ({ ...acc, [sound.name]: 0 }), {})
    );
  };

  return (
    <div className="sound-mixer-container">
      {/* Custom Mixer Section */}
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
              key={sound.name}
              className="mixer-control-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="control-header">
                <label className="sound-label">{sound.label}</label>
                <span className="volume-display">{controls[sound.name]}%</span>
              </div>

              <div className="slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={controls[sound.name]}
                  onChange={(e) =>
                    handleVolumeChange(sound.name, Number(e.target.value))
                  }
                  className="mixer-slider"
                />
                <div className="slider-background" />
              </div>

              <audio
                ref={(el) => {
                  if (el) audioRefs.current[sound.name] = el;
                }}
                src={`/sounds/${sound.name}.mp3`}
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
