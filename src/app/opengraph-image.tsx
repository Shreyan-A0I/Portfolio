import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Shreyan Nalwad — MS Computational Biology, CMU";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Faint grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* Bio tag */}
        <div style={{ color: "#00E5FF", fontSize: 13, letterSpacing: "0.3em", marginBottom: 28, opacity: 0.45, display: "flex" }}>
          [CMU_CompBio] :: Zhao Biophotonics Lab
        </div>

        {/* Name */}
        <div style={{ color: "#e8e4df", fontSize: 72, fontWeight: 700, marginBottom: 16, lineHeight: 1.05, display: "flex" }}>
          Shreyan Nalwad
        </div>

        {/* Sub */}
        <div style={{ color: "#8a8680", fontSize: 20, marginBottom: 44, display: "flex" }}>
          MS Computational Biology · Carnegie Mellon University
        </div>

        {/* Domain pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Clinical AI", "Generative Models", "Graph ML", "Spatial Biology"].map((t) => (
            <div
              key={t}
              style={{
                border: "1px solid #2a2a2e",
                borderRadius: 100,
                padding: "6px 18px",
                color: "#787880",
                fontSize: 14,
                display: "flex",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
