"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import JournalDrawingCanvas from "@/components/JournalDrawingCanvas";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const JournalPage = () => {
  const [entry, setEntry] = useState("");
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const [canvasResetToken, setCanvasResetToken] = useState(0);
  const [savedPreview, setSavedPreview] = useState<{
    text: string;
    hasSketch: boolean;
  } | null>(null);

  const handleCanvasDataChange = (data: string | null) => {
    setCanvasData(data);
  };

  const handleSaveEntry = async () => {
    // Prevent saving if both text and sketch are empty
    if (entry.trim() === "" && !canvasData) {
      return;
    }

    try {
      // 1. Save directly to Firestore
      await addDoc(collection(db, "journalEntries"), {
        text: entry,
        sketch: canvasData || null, // Safely handle empty sketches
        mood: "neutral", // Added to satisfy your JournalEntryType requirements
        timestamp: new Date().toISOString(), // Standardized time format
      });

      // 2. Update the local UI preview
      setSavedPreview({
        text: entry,
        hasSketch: !!canvasData,
      });

      // 3. Reset the form
      setEntry("");
      setCanvasData(null);
      setCanvasResetToken((prev) => prev + 1);
      
    } catch (error) {
      console.error("Error saving journal reflection to Firebase:", error);
      // If you have a toast notification system, you could trigger an error message here!
    }
  };

  return (
    <section className="page-shell">
      <motion.div
        className="page-hero compact-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">How are you feeling today</h1>
        <p className="page-copy">
          Combine words and sketches to capture your thoughts. Save both
          together as a complete reflection.
        </p>
      </motion.div>

      <motion.div
        className="journal-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="journal-card panel-card">
          <div className="journal-composer">
            <div className="journal-form">
              <textarea
                className="journal-textarea"
                placeholder="Express what's on your mind..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
              <JournalDrawingCanvas
                key={canvasResetToken}
                onCanvasDataChange={handleCanvasDataChange}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="journal-save-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.button
          className="journal-save-btn"
          onClick={handleSaveEntry}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          disabled={entry.trim() === "" && !canvasData}
        >
          Save Reflection
        </motion.button>
        <p className="journal-save-note">
          {entry.trim() !== "" && canvasData
            ? "Text & sketch ready"
            : entry.trim() !== ""
              ? "Text saved"
              : canvasData
                ? "Sketch saved"
                : "Add text or sketch"}
        </p>
      </motion.div>

      {savedPreview ? (
        <motion.div
          className="preview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="preview-title">Latest reflection</p>
          {savedPreview.text && (
            <p className="preview-text">{savedPreview.text}</p>
          )}
          {savedPreview.hasSketch && (
            <p className="preview-sketch">✓ Sketch included</p>
          )}
        </motion.div>
      ) : null}
    </section>
  );
};

export default JournalPage;