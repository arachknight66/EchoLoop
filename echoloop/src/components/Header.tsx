"use client";

import { motion, Variants } from "framer-motion";

export default function Header() {
  return (
    <header className="site-header">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="site-header__eyebrow">Daily reset</p>
        <h1 className="site-header__title">EchoLoop</h1>
        <p className="site-header__tagline">
          A calm, visual space for journaling, sketching, rest cues, and quiet
          reflection.
        </p>
      </motion.div>
    </header>
  );
}
