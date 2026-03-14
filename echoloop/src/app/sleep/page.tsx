import SleepTracker from "@/components/SleepTracker";
import SoundPlayer from "@/components/SoundPlayer";

export default function SleepPage() {
  return (
    <section className="page-shell">
      <div className="page-hero compact-hero">
        <p className="page-kicker">Night routine</p>
        <h1 className="page-title">A softer landing for the end of the day.</h1>
        <p className="page-copy">
          Preview a gentle sleep dashboard with quick sleep notes and a calm
          sound section prepared for future audio assets.
        </p>
      </div>

      <div className="page-grid-2">
        <SleepTracker />
        <SoundPlayer />
      </div>
    </section>
  );
}
