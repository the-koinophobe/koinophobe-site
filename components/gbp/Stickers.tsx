// Decorative sticker shapes for the landing page. All use currentColor, so
// colour them with a text-* class and outline them with the stroke prop.
// Purely ornamental: every one is aria-hidden.

type P = { className?: string; stroke?: boolean };

function points(cx: number, cy: number, outer: number, inner: number, n: number) {
  const out: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / n) * i - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return out.join(" ");
}

// Spiky seal, the coral badge next to the headline in the reference.
export function Burst({ className = "", stroke = true }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon
        points={points(50, 50, 48, 30, 11)}
        fill="currentColor"
        stroke={stroke ? "rgb(var(--edge))" : "none"}
        strokeWidth={stroke ? 3 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Four-point sparkle with concave sides.
export function Sparkle({ className = "", stroke = true }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M50 2c4 32 12 42 48 48-36 6-44 16-48 48-4-32-12-42-48-48 36-6 44-16 48-48Z"
        fill="currentColor"
        stroke={stroke ? "rgb(var(--edge))" : "none"}
        strokeWidth={stroke ? 3 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Lightning bolt.
export function Bolt({ className = "", stroke = true }: P) {
  return (
    <svg viewBox="0 0 100 140" className={className} aria-hidden>
      <path
        d="M62 4 14 78h28l-8 58 52-80H56l6-52Z"
        fill="currentColor"
        stroke={stroke ? "rgb(var(--edge))" : "none"}
        strokeWidth={stroke ? 4 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Five-point star, used solid behind the hero image.
export function Star({ className = "", stroke = true }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon
        points={points(50, 52, 50, 20, 5)}
        fill="currentColor"
        stroke={stroke ? "rgb(var(--edge))" : "none"}
        strokeWidth={stroke ? 2.5 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Faint oversized star outlines. Hairline strokes, pushed out toward the
// edges: these are texture, not decoration you should notice. Pair with a very
// low opacity (text-edge/[0.05]) and the .ghost-fade mask.
export function GhostStars({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 700"
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <polygon points={points(90, 150, 150, 60, 5)} stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={points(1110, 250, 190, 76, 5)} stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={points(300, 660, 130, 52, 5)} stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={points(940, 640, 110, 44, 5)} stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
