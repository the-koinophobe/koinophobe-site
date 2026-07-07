import { ImageResponse } from "next/og";

// Edge runtime: avoids @vercel/og's Windows path bug at build time (the image
// is rendered on request instead of prerendered) and is the runtime this
// library was built for.
export const runtime = "edge";

export const alt = "Koinophobe — SEO you can measure";
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
          backgroundColor: "#F4F8F7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              backgroundColor: "#22B9AF",
              color: "#F4F8F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#122220" }}>
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
            color: "#122220",
            letterSpacing: -2,
          }}
        >
          <span>SEO that proves it,</span>
          <span>
            in <span style={{ color: "#22B9AF" }}>leads</span>, not rankings.
          </span>
        </div>

        <div style={{ fontSize: 28, color: "#5A6B68" }}>
          Technical SEO + conversion tracking · michael edward
        </div>
      </div>
    ),
    { ...size }
  );
}
