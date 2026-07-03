"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

// Card wrapper that tracks the cursor with a soft brand-coloured glow.
// Pure CSS vars, no re-renders, disabled on touch and reduced motion (see
// .spot rules in globals.css).
export function Spotlight({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`spot ${className}`}>
      {children}
    </div>
  );
}
