"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type SleepPersona = {
  id: string;
  name: string;
  description: string;
  icon: string;
  characteristics: string[];
  color: string;
};

const personas: SleepPersona[] = [
  {
    id: "the-drifter",
    name: "The Drifter",
    description:
      "You have a flexible sleep schedule that shifts with your lifestyle. Your sleep duration varies, but you maintain good quality rest.",
    icon: "🌙",
    characteristics: [
      "Variable sleep schedule",
      "Adaptable to changes",
      "Good sleep quality",
      "Flexible bedtime",
    ],
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "the-night-owl",
    name: "The Night Owl",
    description:
      "You tend to sleep later than average and your sleep cycle shifts toward nighttime hours. You're most alert in the evening.",
    icon: "🦉",
    characteristics: [
      "Late sleeper",
      "Evening alertness",
      "Shifted sleep cycle",
      "Night productivity",
    ],
    color: "from-slate-600 to-slate-800",
  },
  {
    id: "the-deep-sleeper",
    name: "The Deep Sleeper",
    description:
      "You consistently get 8+ hours of quality sleep and rarely wake during the night. You're well-rested and energized.",
    icon: "😴",
    characteristics: [
      "Long sleep duration",
      "Deep sleep",
      "Minimal interruptions",
      "Well-rested mornings",
    ],
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "the-restless-dreamer",
    name: "The Restless Dreamer",
    description:
      "You experience frequent interruptions and light sleep. You're a vivid dreamer and often remember your dreams.",
    icon: "✨",
    characteristics: [
      "Light sleep",
      "Frequent interruptions",
      "Vivid dreams",
      "Variable duration",
    ],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "the-early-bird",
    name: "The Early Bird",
    description:
      "You naturally wake up early and are most alert in the morning. You prefer an earlier sleep schedule.",
    icon: "🌅",
    characteristics: [
      "Early riser",
      "Morning alertness",
      "Consistent schedule",
      "Early bedtime",
    ],
    color: "from-orange-500 to-amber-600",
  },
  {
    id: "the-light-sleeper",
    name: "The Light Sleeper",
    description:
      "You're sensitive to noise and disturbances. You need a calm environment to get quality rest.",
    icon: "🔇",
    characteristics: [
      "Noise sensitive",
      "Light sleep",
      "Needs quiet environment",
      "Environment dependent",
    ],
    color: "from-blue-500 to-cyan-600",
  },
];

interface SleepTrackerAnalysis {
  averageSleep: number;
  consistency: number;
  interruptions: number;
  sleepTiming: "early" | "late" | "normal";
}

export default function SleepPersonas({
  analysis,
}: {
  analysis?: SleepTrackerAnalysis;
}) {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  // Determine persona based on analysis
  const determinePersona = (): SleepPersona | null => {
    if (!analysis) return null;

    if (analysis.averageSleep >= 8 && analysis.consistency > 80) {
      return personas.find((p) => p.id === "the-deep-sleeper") || null;
    }
    if (analysis.sleepTiming === "late") {
      return personas.find((p) => p.id === "the-night-owl") || null;
    }
    if (analysis.sleepTiming === "early") {
      return personas.find((p) => p.id === "the-early-bird") || null;
    }
    if (analysis.interruptions > 3) {
      return personas.find((p) => p.id === "the-restless-dreamer") || null;
    }

    return personas.find((p) => p.id === "the-drifter") || null;
  };

  const currentPersona = determinePersona();

  return (
    <div className="sleep-personas-container">
      {/* Current Persona Display */}
      {currentPersona && (
        <motion.div
          className="current-persona-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="persona-badge">{currentPersona.icon}</div>
          <h2 className="persona-display-title">Your Sleep Persona</h2>
          <h3 className="persona-name">{currentPersona.name}</h3>
          <p className="persona-description">{currentPersona.description}</p>

          <div className="characteristics-list">
            <p className="characteristics-label">Your Characteristics:</p>
            <ul className="characteristics-items">
              {currentPersona.characteristics.map((char, idx) => (
                <li key={idx} className="characteristic-item">
                  {char}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* All Personas Grid */}
      <motion.div
        className="all-personas-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="mixer-section-title">Sleep Personas</h2>
        <p className="mixer-section-subtitle">
          Explore different sleep personality types
        </p>

        <div className="personas-grid">
          {personas.map((persona) => (
            <motion.button
              key={persona.id}
              className={`persona-card ${
                currentPersona?.id === persona.id ? "current" : ""
              } ${selectedPersona === persona.id ? "selected" : ""}`}
              onClick={() =>
                setSelectedPersona(
                  selectedPersona === persona.id ? null : persona.id
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="persona-icon">{persona.icon}</div>
              <h3 className="persona-card-name">{persona.name}</h3>
              <p className="persona-card-description">{persona.description}</p>

              {currentPersona?.id === persona.id && (
                <motion.div
                  className="current-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Your Persona
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {selectedPersona && selectedPersona !== currentPersona?.id && (
        <motion.div
          className="selected-persona-detail"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
        >
          {(() => {
            const selected = personas.find((p) => p.id === selectedPersona);
            return selected ? (
              <div className="detail-content">
                <h3 className="detail-title">{selected.name}</h3>
                <p className="detail-description">{selected.description}</p>
                <div className="detail-characteristics">
                  {selected.characteristics.map((char, idx) => (
                    <span key={idx} className="detail-characteristic">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            ) : null;
          })()}
        </motion.div>
      )}
    </div>
  );
}
