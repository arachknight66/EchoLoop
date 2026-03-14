import Link from "next/link";

const features = [
  {
    href: "/journal",
    className: "feature-journal",
    eyebrow: "Write it out",
    title: "Journal",
    copy: "Capture thoughts, moods, and quick inner check-ins in one soft space.",
  },
  {
    href: "/drawing",
    className: "feature-drawing",
    eyebrow: "Sketch freely",
    title: "Drawing",
    copy: "Switch between reflection and freehand drawing when words are not enough.",
  },
  {
    href: "/sleep",
    className: "feature-sleep",
    eyebrow: "Rest gently",
    title: "Sleep",
    copy: "Keep a lightweight sleep snapshot and browse a calm bedtime-friendly panel.",
  },
  {
    href: "/sounds",
    className: "feature-sounds",
    eyebrow: "Set the mood",
    title: "Sounds",
    copy: "Preview your future ambient sound library and build a ritual around focus.",
  },
  {
    href: "/insights",
    className: "feature-insights",
    eyebrow: "Notice patterns",
    title: "Insights",
    copy: "See simple reflection prompts and gentle patterns drawn from your routines.",
  },
];

export default function HomePage() {
  return (
    <section className="page-shell home-shell">
      <div className="page-hero home-hero">
        <p className="page-kicker">Mindful toolkit</p>
        <h1 className="page-title">
          EchoLoop turns quiet daily rituals into a visual rhythm.
        </h1>
        <p className="page-copy">
          Move between journaling, sketching, sleep cues, ambient calm, and
          reflection without leaving the same warm space.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className={`feature-tile ${feature.className}`}
          >
            <p className="feature-tile__eyebrow">{feature.eyebrow}</p>
            <h2 className="feature-tile__title">{feature.title}</h2>
            <p className="feature-tile__copy">{feature.copy}</p>
            <span className="feature-tile__cta">Open section</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
