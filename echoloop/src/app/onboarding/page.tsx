"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setStep(2);
      }, 8000); // 8 seconds for breathing exercise
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="onboarding-page">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            className="onboarding-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            <h1 className="onboarding-title">Welcome to EchoLoop.</h1>
            <p className="onboarding-subtitle" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }}>A space to pause and reflect.</p>
            <button onClick={handleNext} className="onboarding-button">
              Begin
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            className="onboarding-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <h1 className="onboarding-title" style={{ fontSize: '2rem' }}>Take a deep breath</h1>
            <motion.div
              className="breathing-circle"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            className="onboarding-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="onboarding-title">You are ready.</h1>
            <Link href="/journal" className="onboarding-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Enter App
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
