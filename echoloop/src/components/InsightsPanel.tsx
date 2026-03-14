"use client";

// import { useInsights } from "@/hooks/useInsights";

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
          <li key={insight.title} className="insight-card">
            <p className="font-medium text-gray-900">{insight.title}</p>
            <p className="mt-1 text-sm text-gray-700">{insight.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
