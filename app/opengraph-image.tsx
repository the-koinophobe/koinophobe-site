import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

// Edge runtime: avoids @vercel/og's Windows path bug at build time (the image
// is rendered on request instead of prerendered) and is the runtime this
// library was built for. The fonts are inlined as base64 in lib/og-fonts.ts
// for the same reason: nothing here resolves a file path.
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
          fontFamily: "Fraunces",
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
              fontSize: 32,
            }}
          >
            K
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#032b14" }}>Koinophobe</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            lineHeight: 1.04,
            color: "#032b14",
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>Numbers don&rsquo;t lie.</div>
          {/* Satori strips leading and trailing whitespace inside text nodes,
              so the spaces around the coloured word come from flex gap. */}
          <div style={{ display: "flex", gap: 22 }}>
            <span>I make</span>
            <span style={{ color: "#12603D" }}>yours</span>
            <span>go up.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 21,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "#4A5C50",
          }}
        >
          Technical SEO &middot; Local businesses &middot; 30+ sites &middot; koinophobe.com
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts }
  );
}
