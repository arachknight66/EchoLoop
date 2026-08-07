import type { ReactNode } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-frame">
        <Navigation />
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
