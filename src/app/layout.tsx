import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://shreyan.dev"),
  title: {
    default: seo.title,
    template: `%s | ${seo.title}`,
  },
  description: seo.description,
  openGraph: {
    title: seo.og.title,
    description: seo.description,
    url: seo.og.url,
    siteName: seo.title,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-obsidian text-text-primary antialiased selection:bg-accent-amber selection:text-obsidian">
        <Navbar />
        <div className="relative z-10 flex min-h-screen flex-col pt-24">
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border-subtle bg-surface/40 py-8 text-center text-text-secondary text-base">
            <p>&copy; 2026 Shreyan Nalwad &mdash; built with love, caffeine, and AI.</p>
            <p className="mt-1 text-xs text-text-secondary/40">no sandwich was harmed in the making of this portfolio</p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
