"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

type AmbientMix = {
  id: string;
  name: string;
  description: string;
  icon: string;
  sounds: string[];
  color: string;
};

type MixControls = {
  volume: number;
  intensity: number;
};

const ambientMixes: AmbientMix[] = [
  {
    id: "forest-night",
    name: "Forest Night",
    description: "Soft forest sounds with gentle night ambience",
    icon: "🌲",
    sounds: ["Forest", "Night"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    description: "Calming ocean sounds for peaceful sleep",
    icon: "🌊",
    sounds: ["Ocean"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "rainy-evening",
    name: "Rainy Evening",
    description: "Gentle rain with soft background hum",
    icon: "🌧️",
    sounds: ["Rain", "Night"],
    color: "from-slate-500 to-blue-600",
  },
  {
    id: "wind-whispers",
    name: "Wind Whispers",
    description: "Soft wind with distant forest sounds",
    icon: "💨",
    sounds: ["Wind", "Forest"],
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "meditation-zen",
    name: "Meditation Zen",
    description: "Balanced mix of all elements for deep relaxation",
    icon: "🧘",
    sounds: ["Forest", "Ocean", "Rain"],
    color: "from-violet-500 to-pink-600",
  },
  {
    id: "night-sanctuary",
    name: "Night Sanctuary",
    description: "Complete night environment for restful sleep",
    icon: "🌙",
    sounds: ["Night", "Forest", "Wind"],
    color: "from-indigo-700 to-slate-800",
  },
];

export default function SoundPlayer() {
  const [selectedMix, setSelectedMix] = useState<string | null>(null);
  const [mixControls, setMixControls] = useState<Record<string, MixControls>>({
    "forest-night": { volume: 60, intensity: 50 },
    "ocean-waves": { volume: 70, intensity: 60 },
    "rainy-evening": { volume: 50, intensity: 55 },
    "wind-whispers": { volume: 45, intensity: 50 },
    "meditation-zen": { volume: 55, intensity: 60 },
    "night-sanctuary": { volume: 65, intensity: 65 },
  });

  const handleVolumeChange = (mixId: string, value: number) => {
    setMixControls((prev) => ({
      ...prev,
      [mixId]: { ...prev[mixId], volume: value },
    }));
  };

  const handleIntensityChange = (mixId: string, value: number) => {
    setMixControls((prev) => ({
      ...prev,
      [mixId]: { ...prev[mixId], intensity: value },
    }));
  };

  const handleResetMix = (mixId: string) => {
    setMixControls((prev) => ({
      ...prev,
      [mixId]: { volume: 50, intensity: 50 },
    }));
  };

  const selectedMixData = ambientMixes.find((m) => m.id === selectedMix);
  const selectedControls = selectedMix ? mixControls[selectedMix] : null;

  return (
    <div className="sound-panel">
      <div className="sound-panel__header">
        <h2 className="text-lg font-bold">Ambient Sound Mixes</h2>
        <p className="mb-4 text-sm text-gray-500">
          {selectedMix
            ? "Customize the mix with volume and intensity controls"
            : "Choose a prebuilt ambient mix to customize"}
        </p>
      </div>

      <div className="ambient-mixes-grid">
        {ambientMixes.map((mix) => (
          <motion.button
            key={mix.id}
            className={`ambient-mix-card ${selectedMix === mix.id ? "active" : ""}`}
            onClick={() => setSelectedMix(selectedMix === mix.id ? null : mix.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mix-icon">{mix.icon}</div>
            <h3 className="mix-name">{mix.name}</h3>
            <p className="mix-description">{mix.description}</p>
            <div className="mix-sounds">
              {mix.sounds.map((sound) => (
                <span key={sound} className="sound-tag">
                  {sound}
                </span>
              ))}
            </div>
            {selectedMix === mix.id && (
              <motion.div
                className="mix-selected-indicator"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {selectedMixData && selectedControls && (
        <motion.div
          className="mix-controls-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="controls-header">
            <h3 className="controls-title">
              {selectedMixData.icon} {selectedMixData.name} Controls
            </h3>
            <motion.button
              className="reset-mix-btn"
              onClick={() => {
                if (selectedMix) {
                  handleResetMix(selectedMix);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Reset to defaults"
            >
              ↻ Reset
            </motion.button>
          </div>

          <div className="slider-control-group">
            <div className="slider-section">
              <div className="slider-header">
                <label htmlFor={`volume-${selectedMix}`} className="slider-label">
                  Volume
                </label>
                <span className="slider-value">{selectedControls.volume}%</span>
              </div>
              <input
                id={`volume-${selectedMix}`}
                type="range"
                min="0"
                max="100"
                value={selectedControls.volume}
                onChange={(e) => {
                  if (selectedMix) {
                    handleVolumeChange(selectedMix, Number(e.target.value));
                  }
                }}
                className="mix-slider"
              />
            </div>

            <div className="slider-section">
              <div className="slider-header">
                <label htmlFor={`intensity-${selectedMix}`} className="slider-label">
                  Intensity
                </label>
                <span className="slider-value">{selectedControls.intensity}%</span>
              </div>
              <input
                id={`intensity-${selectedMix}`}
                type="range"
                min="0"
                max="100"
                value={selectedControls.intensity}
                onChange={(e) => {
                  if (selectedMix) {
                    handleIntensityChange(selectedMix, Number(e.target.value));
                  }
                }}
                className="mix-slider"
              />
            </div>
          </div>

          <p className="controls-note">
            Audio playback coming soon - your preferences will be saved
          </p>
        </motion.div>
      )}
    </div>
  );
}
