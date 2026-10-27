import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

// Edge runtime: avoids @vercel/og's Windows path bug at build time (the image
// is rendered on request instead of prerendered) and is the runtime this
// library was built for.
export const runtime = "edge";

export const alt = "Koinophobe · Technical SEO that shows up in the numbers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The site's palette: off-white page, forest green, one red. */
const PAGE = "#F7F7F3";
const FOREST = "#032B14";
const RED = "#D0312D";
const MUTED = "#46544C";

/**
 * The site's own faces, fetched from Google Fonts when the card renders.
 * Satori takes ttf, otf or woff, which Google serves to a plain fetch. If
 * the fetch fails, the inlined fonts in lib/og-fonts.ts stand in, so the card
 * always renders.
 */
async function googleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`)
    ).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype|woff)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const [display, body] = await Promise.all([
    googleFont("Plus Jakarta Sans", 800),
    googleFont("Instrument Sans", 600),
  ]);
  const head = display ? "Plus Jakarta Sans" : "Viga";
  const small = body ? "Instrument Sans" : "JetBrains Mono";
  const fonts = [
    ...ogFonts,
    ...(display ? [{ name: "Plus Jakarta Sans", data: display, weight: 800 as const, style: "normal" as const }] : []),
    ...(body ? [{ name: "Instrument Sans", data: body, weight: 600 as const, style: "normal" as const }] : []),
  ];

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
          backgroundColor: PAGE,
          fontFamily: head,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: FOREST,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            K
          </div>
          <div style={{ display: "flex", fontSize: 32, color: FOREST, letterSpacing: -1 }}>Koinophobe</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 74,
            lineHeight: 1.04,
            color: FOREST,
            letterSpacing: -3,
          }}
        >
          <div style={{ display: "flex" }}>For home service businesses</div>
          <div style={{ display: "flex" }}>tired of SEO they</div>
          {/* Satori strips leading and trailing whitespace inside text nodes,
              so the spaces around the colored words come from flex gap. */}
          <div style={{ display: "flex", gap: 20 }}>
            <span>can&rsquo;t</span>
            <span style={{ display: "flex", flexDirection: "column", color: RED }}>
              see working.
              {/* The hero's drawn underline. */}
              <svg width="390" height="22" viewBox="0 0 300 20" preserveAspectRatio="none" style={{ marginTop: -4 }}>
                <path d="M3 14C60 5 140 3 297 9" fill="none" stroke={RED} strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: small, fontSize: 24, color: MUTED }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 99, backgroundColor: RED }} />
          SEO agency for home services &middot; 30+ sites &middot; koinophobe.com
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
