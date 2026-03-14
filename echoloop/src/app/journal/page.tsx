"use client";

import { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

const JournalPage = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("");
  const [savedPreview, setSavedPreview] = useState<{
    text: string;
    mood: string;
  } | null>(null);

  const handleSaveEntry = async () => {
    if (entry.trim() === "") return;

    // Firestore save is disabled until the Firebase project is configured.
    // await addDoc(collection(db, "journalEntries"), {
    //   text: entry,
    //   mood,
    //   timestamp: new Date(),
    // });

    setSavedPreview({
      text: entry,
      mood: mood || "Not selected",
    });
    setEntry("");
    setMood("");
  };

  return (
    <section className="page-shell">
      <div className="page-hero compact-hero">
        <p className="page-kicker">Daily journal</p>
        <h1 className="page-title">Write what this moment feels like.</h1>
        <p className="page-copy">
          The live backend is paused for now, but the interface is ready for
          fast thought-dumps, mood tagging, and previewing what you wrote.
        </p>
      </div>

      <div className="panel-card journal-card">
        <h2 className="mb-4 text-xl font-bold">Journal Entry</h2>
        <div className="journal-form">
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            placeholder="Write your thoughts..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <div className="mt-4">
            <label className="form-label">Mood</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Select mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="anxious">Anxious</option>
              <option value="calm">Calm</option>
            </select>
          </div>
          <button className="panel-button" onClick={handleSaveEntry}>
            Save Preview
          </button>
          <p className="mt-3 text-sm text-gray-500">
            Live saving is commented out until Firebase env vars are added.
          </p>
          {savedPreview ? (
            <div className="preview-card">
              <p className="text-sm font-semibold text-gray-700">
                Latest preview entry
              </p>
              <p className="mt-2 text-sm text-gray-900">{savedPreview.text}</p>
              <p className="mt-1 text-xs text-gray-600">
                Mood: {savedPreview.mood}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default JournalPage;
