import SleepTracker from "@/components/SleepTracker";
import SleepAnalysis from "@/components/SleepAnalysis";
import SleepPersonas from "@/components/SleepPersonas";
import { motion, Variants } from "framer-motion";

export default function SleepPage() {
  return (
    <section className="page-shell">
      <div className="page-hero compact-hero">
        <p className="page-kicker">Night routine</p>
        <h1 className="page-title">A softer landing for the end of the day.</h1>
        <p className="page-copy">
          Discover your sleep pattern analysis, track your sleep habits, and choose
          from curated ambient mixes designed for restful nights.
        </p>
      </div>

      <div className="sleep-page-grid">
        <SleepTracker />
        <SleepAnalysis />
      </div>

      <div className="panel-card">
        <SleepPersonas />
      </div>
    </section>
  );
}
