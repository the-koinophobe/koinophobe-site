// Decorative inline SVGs. They inherit colour via `currentColor`, so set a
// text-* class and opacity on the element (use text-ink/[0.04-0.07] for the
// faded, uncoloured house style). No <defs>/ids, so safe to reuse.

type P = { className?: string };

// Kept as no-ops so any legacy usages stay valid.
export function Ripples(_: P) {
  return null;
}

export function Blob(_: P) {
  return null;
}

// Flowing wave lines (a few stacked sine curves).
export function WaveLines({ className = "" }: P) {
  return (
    <svg viewBox="0 0 400 120" fill="none" aria-hidden className={className} preserveAspectRatio="none">
      {[20, 50, 80, 110].map((y) => (
        <path
          key={y}
          d={`M0 ${y} Q 50 ${y - 18} 100 ${y} T 200 ${y} T 300 ${y} T 400 ${y}`}
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}

// Concentric dashed orbits with a centre point.
export function OrbitRings({ className = "" }: P) {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className={className}>
      {[60, 105, 150, 195].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={i % 2 ? "3 8" : undefined}
        />
      ))}
      <circle cx="200" cy="200" r="3" fill="currentColor" />
    </svg>
  );
}

// A quiet grid of dots.
export function DotMatrix({ className = "" }: P) {
  const dots: [number, number][] = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 12; x++) dots.push([x, y]);
  return (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden className={className}>
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={10 + x * 20} cy={10 + y * 20} r="1.6" fill="currentColor" />
      ))}
    </svg>
  );
}

// Topographic contour field: nested organic rings plus stray contour strokes.
export function TopoField({ className = "" }: P) {
  return (
    <svg viewBox="0 0 600 400" fill="none" aria-hidden className={className} preserveAspectRatio="none">
      <path
        d="M120 200c0-60 60-110 140-110s160 40 160 100-70 120-150 120S120 260 120 200Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M160 200c0-45 45-80 100-80s120 30 120 75-52 90-112 90-108-40-108-85Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M200 200c0-30 30-52 64-52s78 20 78 50-34 58-72 58-70-26-70-56Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M40 80c40-30 90-40 140-28M420 340c50 6 100-8 140-40M60 330c20 20 50 32 84 36"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
