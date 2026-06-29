// Decorative inline SVGs. They inherit colour via `currentColor`, so set a
// text-* class and opacity on the element. No <defs>/ids, so safe to reuse.

type P = { className?: string };

// Background decor removed — kept as no-ops so existing usages stay valid.
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
