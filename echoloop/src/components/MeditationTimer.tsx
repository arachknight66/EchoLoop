"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, Variants } from "framer-motion";

type TimerDuration = {
  id: string;
  label: string;
  minutes: number;
  icon: string;
};

const DURATIONS: TimerDuration[] = [
  { id: "5min", label: "5 Min", minutes: 5, icon: "🌱" },
  { id: "10min", label: "10 Min", minutes: 10, icon: "🌿" },
  { id: "15min", label: "15 Min", minutes: 15, icon: "🍃" },
  { id: "20min", label: "20 Min", minutes: 20, icon: "🌾" },
  { id: "30min", label: "30 Min", minutes: 30, icon: "🌳" },
];

export default function MeditationTimer() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playCompletionSound = useCallback(() => {
    // Play a gentle completion sound
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/night.mp3");
    }
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch(() => {});
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsCompleted(true);
          playCompletionSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeRemaining, playCompletionSound]);

  const handleSelectDuration = (minutes: number) => {
    if (isRunning) return;
    setSelectedDuration(minutes);
    setTimeRemaining(minutes * 60);
    setIsCompleted(false);
  };

  const toggleTimer = () => {
    if (selectedDuration === null) return;
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setSelectedDuration(null);
    setIsCompleted(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = selectedDuration
    ? ((selectedDuration * 60 - timeRemaining) / (selectedDuration * 60)) * 100
    : 0;

  return (
    <div className="meditation-timer-container">
      <section className="meditation-section">
        <div className="timer-header">
          <h2 className="timer-title">Select Duration</h2>
        </div>

        <div className="duration-buttons-grid">
          {DURATIONS.map((duration) => (
            <motion.button
              key={duration.id}
              onClick={() => handleSelectDuration(duration.minutes)}
              disabled={isRunning}
              className={`duration-button ${
                selectedDuration === duration.minutes ? "active" : ""
              }`}
              whileHover={{ scale: isRunning ? 1 : 1.05 }}
              whileTap={{ scale: isRunning ? 1 : 0.95 }}
            >
              <span className="duration-icon">{duration.icon}</span>
              <span className="duration-label">{duration.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {selectedDuration && (
        <section className="meditation-section timer-display-section">
          <motion.div
            className="timer-display-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="timer-circle-wrapper">
              <svg className="timer-progress-ring" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  className="progress-ring-bg"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  className="progress-ring-fill"
                  strokeDashoffset={565 - (progress / 100) * 565}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>

              <div className="timer-display">
                {isCompleted ? (
                  <div className="completion-message">
                    <p className="completion-icon">✨</p>
                    <p className="completion-text">Session Complete</p>
                  </div>
                ) : (
                  <>
                    <p className="timer-time">{formatTime(timeRemaining)}</p>
                    {!isRunning && selectedDuration && (
                      <p className="timer-subtitle">Ready to begin</p>
                    )}
                    {isRunning && (
                      <p className="timer-subtitle">Meditating...</p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="timer-controls">
              <motion.button
                onClick={toggleTimer}
                className="control-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? "Pause" : "Start"}
              </motion.button>

              <motion.button
                onClick={resetTimer}
                className="control-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            </div>

            {isRunning && (
              <motion.div
                className="meditation-tips"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="tips-label">Focus Tips:</p>
                <ul className="tips-list">
                  <li>Take slow, deep breaths</li>
                  <li>Let thoughts pass without judgment</li>
                  <li>Return gently to your breath</li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        </section>
      )}
    </div>
  );
}
