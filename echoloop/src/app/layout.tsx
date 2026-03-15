import type { ReactNode } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import { motion, Variants } from "framer-motion";
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">
        <div className="app-shell">
          <Header />
          <div className="app-frame">
            <Navigation />
            <main className="app-main">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
