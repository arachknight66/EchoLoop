import SoundPlayer from "@/components/SoundPlayer";

export default function SoundsPage() {
  return (
    <section className="page-shell">
      <div className="page-hero compact-hero">
        <p className="page-kicker">Ambient preview</p>
        <h1 className="page-title">Set the room before the sounds arrive.</h1>
        <p className="page-copy">
          The audio files are still missing, so this page acts as a styled
          preview of the listening experience and the sound categories.
        </p>
      </div>
      <div className="panel-card">
        <SoundPlayer />
      </div>
    </section>
  );
}
