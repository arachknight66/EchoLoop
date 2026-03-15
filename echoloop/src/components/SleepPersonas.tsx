"use client";

import { motion, Variants } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSleep } from "@/hooks/useSleep";
import SoundPlayer from "@/components/SoundPlayer";

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
  const { sleepData } = useSleep();

  // Mock sleep data for testing/demo purposes
  const mockSleepData = [
    { id: "1", date: "3/8/2026", hours: 7.5 },
    { id: "2", date: "3/9/2026", hours: 6.8 },
    { id: "3", date: "3/10/2026", hours: 8.2 },
    { id: "4", date: "3/11/2026", hours: 7.1 },
    { id: "5", date: "3/12/2026", hours: 9.0 },
    { id: "6", date: "3/13/2026", hours: 7.3 },
    { id: "7", date: "3/14/2026", hours: 8.5 },
    { id: "8", date: "3/15/2026", hours: 7.9 },
  ];

  // Use mock data if no real sleep data exists
  const displaySleepData = sleepData.length > 0 ? sleepData : mockSleepData;

  // Sort sleep data chronologically (oldest to newest)
  const chartData = [...displaySleepData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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
          whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)" }}
        >
          <motion.div 
            className="persona-badge"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {currentPersona.icon}
          </motion.div>
          <h2 className="persona-display-title">Your Sleep Persona</h2>
          <h3 className="persona-name">{currentPersona.name}</h3>
          <p className="persona-description">{currentPersona.description}</p>

          <div className="characteristics-list">
            <p className="characteristics-label">Your Characteristics:</p>
            <ul className="characteristics-items">
              {currentPersona.characteristics.map((char, idx) => (
                <motion.li 
                  key={idx} 
                  className="characteristic-item"
                  whileHover={{ x: 4, color: "#3B82F6" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {char}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Sleep Pattern Graph */}
      {displaySleepData.length > 0 && (
        <motion.div
          className="sleep-pattern-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="mixer-section-title">Your Sleep Pattern</h2>
          <p className="mixer-section-subtitle">
            Visualizing your sleep duration over time
          </p>
          
          <div className="sleep-graph-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    value.split("/")[0] + "/" + value.split("/")[1]
                  }
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 1", "dataMax + 1"]}
                  label={{ value: "Hours", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  formatter={(value) => [`${value}h`, "Sleep"]}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#3B82F6", strokeWidth: 0 }}
                  activeDot={{ r: 7, fill: "#1D4ED8" }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {displaySleepData.length > 0 && (
            <motion.div
              className="sleep-stats-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="stat-label">Average Sleep</span>
                <span className="stat-value">
                  {(
                    displaySleepData.reduce((acc, entry) => acc + entry.hours, 0) /
                    displaySleepData.length
                  ).toFixed(1)}
                  h
                </span>
              </motion.div>
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="stat-label">Total Entries</span>
                <span className="stat-value">{displaySleepData.length}</span>
              </motion.div>
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="stat-label">Max Sleep</span>
                <span className="stat-value">
                  {Math.max(...displaySleepData.map((e) => e.hours))}h
                </span>
              </motion.div>
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="stat-label">Min Sleep</span>
                <span className="stat-value">
                  {Math.min(...displaySleepData.map((e) => e.hours))}h
                </span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {displaySleepData.length === 0 && (
        <motion.div
          className="sleep-pattern-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="mixer-section-title">Your Sleep Pattern</h2>
          <p className="mixer-section-subtitle">
            Import smartwatch data to see your sleep visualization
          </p>
          <div className="text-center py-8 text-gray-400">
            <p>No sleep data yet. Start tracking to see your sleep patterns!</p>
          </div>
        </motion.div>
      )}

      {/* Ambient Sound Mixes */}
      <SoundPlayer />
    </div>
  );
}
