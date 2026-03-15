"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { JournalEntryType } from "@/lib/types";

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "journalEntries"));
      const fetchedEntries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<JournalEntryType, "id">),
      }));

      setEntries(fetchedEntries);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async (entry: JournalEntryType) => {
    // 1. Start with the base entry provided by the frontend (which currently says "neutral")
    let finalEntryToSave = { ...entry };

    // 2. Try to get AI analysis before saving
    try {
      console.log("Analyzing emotions...");
      const aiResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: entry.text }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        
        // --- THE FIX: Extract the primary emotion ---
        // Grab the first emotion in the top_emotions array (which is sorted highest to lowest).
        // If the AI somehow fails to return an array, fallback to the original entry.mood.
        const primaryMood = aiData.top_emotions && aiData.top_emotions.length > 0 
          ? aiData.top_emotions[0] 
          : entry.mood;

        // 3. Attach the AI data AND overwrite the default mood
        finalEntryToSave = {
          ...finalEntryToSave,
          mood: primaryMood, // Overwrites "neutral" with "sad", "happy", etc.
          summary: aiData.summary,
          allEmotions: aiData.all_emotions,
          topEmotions: aiData.top_emotions,
        };
        console.log("AI analysis attached successfully!");
      } else {
        console.warn("AI analysis returned an error. Saving entry without AI data.");
      }
    } catch (error) {
      console.error("Could not connect to AI service. Saving entry without AI data:", error);
    }

    // 4. Save the complete entry to Firebase
    await addDoc(collection(db, "journalEntries"), finalEntryToSave);
    
    // 5. Refresh the UI
    await fetchEntries();
  };

  useEffect(() => {
    let cancelled = false;

    const loadEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "journalEntries"));
        const fetchedEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<JournalEntryType, "id">),
        }));

        if (!cancelled) {
          setEntries(fetchedEntries);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadEntries();

    return () => {
      cancelled = true;
    };
  }, []);

  return { entries, saveEntry, loading, fetchEntries };
};

export default useJournal;