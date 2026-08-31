import { ImageResponse } from "next/og";

// Edge runtime: avoids @vercel/og's Windows path bug at build time (the image
// is rendered on request instead of prerendered) and is the runtime this
// library was built for.
export const runtime = "edge";

export const alt = "Koinophobe · Technical SEO that shows up in the numbers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#FBF7ED",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              backgroundColor: "#032b14",
              color: "#FBF7ED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#032b14" }}>
            Koinophobe
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#032b14",
            letterSpacing: -2,
          }}
        >
          <span>Numbers don&rsquo;t lie.</span>
          <span>
            I make <span style={{ color: "#12603D" }}>yours</span> go up.
          </span>
        </div>

        <div style={{ fontSize: 28, color: "#4A5C50" }}>
          Technical SEO + conversion tracking for local businesses · Michael Edward
        </div>
      </div>
    ),
    { ...size }
  );
}
