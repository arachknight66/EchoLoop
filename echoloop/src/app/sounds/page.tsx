import SoundMixer from "@/components/SoundMixer";
import MeditationTimer from "@/components/MeditationTimer";
import { motion, Variants } from "framer-motion";

export default function SoundsPage() {
  return (
    <section className="page-shell">
      <div className="page-hero compact-hero">
        <p className="page-kicker">Ambient Soundscapes & Meditation</p>
        <h1 className="page-title">Create your perfect calm environment.</h1>
        <p className="page-copy">
          Mix individual sounds to create custom ambient soundscapes, or use the
          meditation timer to guide your practice with gentle ambient music.
        </p>
      </div>

      <div className="sounds-page-container">
        <MeditationTimer />
        <SoundMixer />
      </div>
    </section>
  );
}
