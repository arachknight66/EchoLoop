import InsightsPanel from "@/components/InsightsPanel";
import { motion, Variants } from "framer-motion";
export default function InsightsPage() {
  return (
    <section className="page-shell">
      <div className="page-hero compact-hero">
        <p className="page-kicker">Gentle patterns</p>
        <h1 className="page-title">See the story your rituals are telling.</h1>
        <p className="page-copy">
          Until live journal syncing is enabled, this section shows a polished
          preview of the kinds of reflection prompts EchoLoop can surface.
        </p>
      </div>
      <InsightsPanel />
    </section>
  );
}
