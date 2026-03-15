"use client";

import { motion, Variants } from "framer-motion";

//import { useInsights } from "@/hooks/useInsights";

const previewInsights = [
  {
    title: "Mood pattern",
    description: "Your recent entries lean calm and reflective in the evenings.",
  },
  {
    title: "Creative rhythm",
    description: "Drawing and journaling look like your strongest decompression habits.",
  },
  {
    title: "Sleep reminder",
    description: "A simple wind-down routine would pair well with your nighttime reflections.",
  },
];

export default function InsightsPanel() {
  // Live insights are disabled until Firebase-backed journal data is available.
  // const { insights, loading } = useInsights();

  return (
    <div className="panel-card insights-panel">
      <h2 className="mb-4 text-xl font-semibold">Reflection Insights</h2>
      <p className="mb-4 text-sm text-gray-500">
        Live insight generation is commented out until journal syncing is wired up.
      </p>
      <ul className="insight-list">
        {previewInsights.map((insight) => (
          <motion.li
            key={insight.title}
            className="insight-card"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <p style={{ fontWeight: 900, color: 'white', fontSize: '1.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{insight.title}</p>
            <p className="mt-1 text-sm text-gray-700">{insight.description}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
