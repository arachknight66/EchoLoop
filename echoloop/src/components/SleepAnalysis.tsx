"use client";

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
      "Uninterrupted sleep",
      "High energy levels",
      "Consistent schedule",
    ],
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "the-restless-dreamer",
    name: "The Restless Dreamer",
    description:
      "Your sleep is marked by frequent waking and vivid dreams. You often wake during the night but find it easy to fall back asleep.",
    icon: "😴✨",
    characteristics: [
      "Frequent awakenings",
      "Vivid dreaming",
      "Light sleep",
      "Easy to return to sleep",
    ],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "the-early-bird",
    name: "The Early Bird",
    description:
      "You naturally wake up early and are most productive in the morning. You prefer an earlier bedtime and consistent wake time.",
    icon: "🐦",
    characteristics: [
      "Early waker",
      "Morning alertness",
      "Consistent routine",
      "Early productivity",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "the-light-sleeper",
    name: "The Light Sleeper",
    description:
      "You're sensitive to your sleep environment and need calm conditions to rest well. You wake easily from noises or disturbances.",
    icon: "🌟",
    characteristics: [
      "Sensitive sleeper",
      "Environment aware",
      "Needs quiet spaces",
      "Early waker",
    ],
    color: "from-cyan-500 to-blue-600",
  },
];

type SleepTrackerAnalysis = {
  averageSleep: number;
  consistency: number;
  interruptions: number;
  sleepTiming: "early" | "normal" | "late";
};

interface SleepAnalysisProps {
  analysis?: SleepTrackerAnalysis;
}

const determinePersona = (
  analysis?: SleepTrackerAnalysis
): SleepPersona => {
  if (!analysis) {
    return personas[0]; // Default to first persona
  }

  const { averageSleep, consistency, interruptions, sleepTiming } = analysis;

  // Simple logic to determine persona
  if (averageSleep >= 8 && interruptions < 2) {
    return personas[2]; // The Deep Sleeper
  }

  if (sleepTiming === "late") {
    return personas[1]; // The Night Owl
  }

  if (sleepTiming === "early") {
    return personas[4]; // The Early Bird
  }

  if (interruptions > 3) {
    if (consistency < 0.7) {
      return personas[3]; // The Restless Dreamer
    } else {
      return personas[5]; // The Light Sleeper
    }
  }

  return personas[0]; // The Drifter (default)
};

export default function SleepAnalysis({
  analysis,
}: SleepAnalysisProps) {
  const currentPersona = determinePersona(analysis);

  return (
    <div className="sleep-analysis-container">
      {/* Current Persona Card */}
      {currentPersona && (
        <motion.div
          className="current-persona-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="persona-badge">{currentPersona.icon}</div>

          <p className="persona-display-title">Your Sleep Persona</p>
          <h2 className="persona-name">{currentPersona.name}</h2>
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
    </div>
  );
}
