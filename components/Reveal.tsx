import type { ElementType, ReactNode } from "react";

/**
 * Fade and rise on scroll. Server component: the animation is a CSS transition
 * armed by the shared observer in Anim, so this costs no JavaScript at all.
 */
export function Reveal({
  children,
  as,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      data-anim="rise"
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
