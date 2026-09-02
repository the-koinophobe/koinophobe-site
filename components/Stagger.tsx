import type { ReactNode } from "react";

/** Children rise in sequence. Delays come from :nth-child in CSS, no JS. */
export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-anim="stagger" className={className}>
      {children}
    </div>
  );
}
