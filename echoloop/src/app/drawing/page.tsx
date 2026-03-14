"use client";

import { motion } from "framer-motion";
import ReflectionChatbot from "@/components/ReflectionChatbot";

const SleepPersona = () => (
  <motion.div
    className="sidebar-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    <h3 className="sidebar-card__title">Sleep Persona</h3>
    <div className="persona-circle">
      <motion.div
        className="persona-dot"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
    <p className="sidebar-card__subtitle">The Drifter</p>
    <p className="sidebar-card__copy">Fluid sleep rhythm</p>
    <div className="soundscape-viz">
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Soundscape ▁▂▃▄▅▄▃▂▁
      </motion.span>
    </div>
  </motion.div>
);

const ReflectionCompanion = () => (
  <motion.div
    className="sidebar-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <h3 className="sidebar-card__title">Reflection Companion</h3>
    <motion.div
      className="insights-list"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {[
        "You've mentioned feeling quieter this week.",
        "Your drawings have been using softer strokes lately.",
      ].map((insight, idx) => (
        <motion.div
          key={idx}
          className="insight-item"
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {insight}
        </motion.div>
      ))}
    </motion.div>
    <p className="sidebar-card__action">Continue reflecting...</p>
  </motion.div>
);

const WeeklyInsights = () => (
  <motion.div
    className="sidebar-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
  >
    <h3 className="sidebar-card__title">Weekly Pattern Insight</h3>
    <motion.div
      className="insights-list"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {[
        "Sleep shifted later",
        "Expression shortened",
        "Drawing intensity increased",
      ].map((pattern, idx) => (
        <motion.div
          key={idx}
          className="pattern-item"
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          ● {pattern}
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default function DrawingPage() {
  return (
    <main className="reflection-page-container">
      <motion.section
        className="reflection-page-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="page-hero compact-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="page-kicker">Silent Reflection</p>
          <h1 className="page-title">Share your inner thoughts.</h1>
          <p className="page-copy">
            A quiet space to explore your feelings and insights through
            conversation. Let your reflections guide you.
          </p>
        </motion.div>

        <ReflectionChatbot />
      </motion.section>
    </main>
  );
}
