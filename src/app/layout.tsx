import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteProfile } from "@/lib/site";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const reading = Space_Grotesk({
  variable: "--font-reading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteProfile.name} | Syntactic Brutalism`,
  description:
    "Portfolio and project management app for Shreyan Balaji Nalwad, focused on computational biology, AI systems, and interdisciplinary tooling.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${reading.variable}`}>
        <div className="noise-overlay" aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative z-10 min-h-screen bg-[var(--terminal-void)] text-[var(--hard-white)]">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
