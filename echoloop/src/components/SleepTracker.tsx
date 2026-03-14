"use client";

import { useState } from "react";
import type { SleepEntryType } from "@/lib/types";

export default function SleepTracker() {
  const [sleepData, setSleepData] = useState<SleepEntryType[]>([]);

  const importSleepData = () => {
    const today = new Date().toLocaleDateString();

    setSleepData((currentEntries) =>
      currentEntries.length > 0
        ? currentEntries
        : [{ date: today, hours: 8 }]
    );
  };

  return (
    <div className="panel-card tracker-card">
      <h2 className="mb-4 text-xl font-semibold">Sleep Tracker</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Your Sleep Schedule</h3>
        {sleepData.length === 0 ? (
          <p className="text-sm text-gray-600">
            No sleep entries yet. Import data to see a sample record.
          </p>
        ) : (
          <ul className="list-disc pl-5">
            {sleepData.map((entry, index) => (
              <li key={`${entry.date}-${index}`}>
                {entry.date}: {entry.hours} hours
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={importSleepData}
        className="panel-button"
      >
        Import Sleep Data
      </button>
    </div>
  );
}
