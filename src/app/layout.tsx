import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Shreyan Nalwad | Computational Biology & AI Engineer",
  description:
    "Portfolio of Shreyan Balaji Nalwad - CMU MS Computational Biology student specializing in Edge AI, Computer Vision, and Biomedical Machine Learning.",
  keywords: [
    "Computational Biology",
    "Machine Learning",
    "Computer Vision",
    "Edge AI",
    "Carnegie Mellon",
    "Bioinformatics",
    "Deep Learning",
  ],
  authors: [{ name: "Shreyan Balaji Nalwad" }],
  openGraph: {
    title: "Shreyan Nalwad | Computational Biology & AI Engineer",
    description:
      "Bridging the gap between biological complexity and computational precision",
    type: "website",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background`}
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-background"
          aria-hidden="true"
        >
          <source src="/Background.mp4" type="video/mp4" />
        </video>

        {/* Noise overlay for texture */}
        <div className="fixed inset-0 noise-overlay pointer-events-none z-0" />

        {/* Grid background */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-50" />

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
