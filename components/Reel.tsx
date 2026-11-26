"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";

export type ReelItem = { slug: string; label: string; tags: string; video: string; poster: string; alt: string };

/*
 * The hero reel: real client sites, one at a time, each tagged with what it is
 * and linked to its case study. Five seconds each, a progress bar per site, a
 * pause button (it moves for longer than five seconds). Under reduced motion it
 * holds the first poster and the bars become plain buttons.
 */
const STEP = 5200;

export function Reel({ items }: { items: ReelItem[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [still, setStill] = useState(false);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  useEffect(() => {
    vids.current.forEach((v, k) => {
      if (!v) return;
      if (k === i && playing && !still) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else v.pause();
    });
    if (!playing || still) return;
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), STEP);
    return () => clearTimeout(t);
  }, [i, playing, still, items.length]);

  const cur = items[i];
  return (
    <div className="reel">
      <div className="reel-frame">
        {items.map((it, k) => (
          <video
            key={it.slug}
            ref={(el) => {
              vids.current[k] = el;
            }}
            src={it.video}
            poster={it.poster}
            muted
            playsInline
            loop
            preload={k === 0 ? "metadata" : "none"}
            aria-hidden={k !== i}
            className={k === i ? "on" : ""}
          />
        ))}
        <span className="sr-only" aria-live="polite">{cur.alt}</span>
        {!still ? (
          <button type="button" className="reel-pause" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause the reel" : "Play the reel"}>
            {playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
          </button>
        ) : null}
      </div>
      <div className="reel-meta">
        <div>
          <p className="reel-now"><span>On screen</span> {cur.label}</p>
          <p className="reel-tags">{cur.tags}</p>
        </div>
        <Link href={`/work#${cur.slug}`} className="link-arrow inline-flex items-center gap-1.5 whitespace-nowrap">
          See the case <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
      <div className="reel-bars" role="group" aria-label="Choose a site">
        {items.map((it, k) => (
          <button key={it.slug} type="button" onClick={() => setI(k)} aria-label={`Show ${it.label}`} aria-current={k === i}>
            <span style={k === i && playing && !still ? { animationDuration: `${STEP}ms` } : undefined} className={k === i ? (playing && !still ? "run" : "full") : k < i ? "full" : ""} />
          </button>
        ))}
      </div>
    </div>
  );
}
