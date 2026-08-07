import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <div className="app-frame">
        <Navigation />
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
