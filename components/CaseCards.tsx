"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export type CaseCard = {
  slug: string;
  name: string;
  tags: string[];
  headline: string;
  body: string;
  video: string;
  poster: string;
  quote?: { text: string; who: string; role: string };
};

/*
 * Full-width case cards: the client's site playing on one side, what it is and
 * what it did on the other, a real quote where one exists. A video plays only
 * while its card is on screen, and never under reduced motion.
 */
function CardVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted playsInline loop preload="none" aria-hidden />;
}

export function CaseCards({ cards }: { cards: CaseCard[] }) {
  return (
    <div className="space-y-6">
      {cards.map((c) => (
        <article key={c.slug} className="case">
          <Link href={`/work#${c.slug}`} className="case-media" aria-label={`${c.name}: see the case study`}>
            <CardVideo src={c.video} poster={c.poster} />
          </Link>
          <div className="case-body">
            <p className="case-tags">
              <span className="font-medium">{c.name}</span>
              {c.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </p>
            <h3 className="case-h">{c.headline}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{c.body}</p>
            <Link href={`/work#${c.slug}`} className="link-arrow mt-5 inline-flex items-center gap-1.5">
              Read the case study <ArrowRight size={15} aria-hidden />
            </Link>
            {c.quote ? (
              <figure className="case-quote">
                <blockquote>&ldquo;{c.quote.text}&rdquo;</blockquote>
                <figcaption>
                  <span className="font-medium">{c.quote.who}</span> &middot; {c.quote.role}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
