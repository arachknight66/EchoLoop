import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata = {
  title: "EchoLoop",
  description: "A calm, visual space for journaling, sketching, rest cues, and quiet reflection.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">
        {children}
      </body>
    </html>
  );
}
