"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/content";

/**
 * The wall. Every site shows its real screenshot and its real video.
 *
 * What `named: false` withholds is the attribution, not the picture: no client
 * name, no address bar, no outbound link. The work is visible, the client list
 * stays the agency's. Flip a project to `named: true` in lib/content.ts to give
 * it its name, its host and a link out.
 *
 * Two rows drift in opposite directions and stop on hover. Reduced motion turns
 * them into plain scrollable strips.
 */

function Tile({ p }: { p: Project }) {
  const vid = useRef<HTMLVideoElement | null>(null);
  const [live, setLive] = useState(false);

  const host = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const enter = () => {
    setLive(true);
    vid.current?.play().catch(() => {});
  };
  const leave = () => {
    setLive(false);
    const v = vid.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const inner = (
    <div
      onPointerEnter={enter}
      onPointerLeave={leave}
      className="group flex h-full w-[260px] flex-none flex-col overflow-hidden rounded-md border border-line bg-bg sm:w-[340px]"
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-muted/50" />
          <span className="h-2 w-2 rounded-full bg-muted/35" />
          <span className="h-2 w-2 rounded-full bg-muted/25" />
        </span>
        <span className="ml-1 truncate font-mono text-[10.5px] text-muted">
          {p.named ? host : "·".repeat(22)}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        {p.video ? (
          <video
            ref={vid}
            poster={p.image}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${p.sector} website preview`}
            className={`h-full w-full object-cover object-top transition-[filter] duration-500 ${
              live ? "grayscale-0" : "grayscale"
            }`}
          >
            <source src={p.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={p.image}
            alt={`${p.sector} website`}
            fill
            sizes="(min-width: 640px) 340px, 260px"
            className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
        )}
      </div>

      <div className="flex items-start justify-between gap-3 px-3.5 py-3">
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-medium">
            {p.named ? p.name : p.sector}
          </span>
          <span className="mt-0.5 block truncate font-mono text-[10.5px] text-muted">
            {p.named ? p.sector : p.market}
          </span>
        </span>
        {p.named && (
          <ArrowUpRight
            size={16}
            aria-hidden
            className="mt-0.5 flex-none text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transform-none"
          />
        )}
      </div>
    </div>
  );

  if (!p.named) return inner;
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  );
}

export function SiteWall() {
  const named = projects.filter((p) => p.named).length;
  const unnamed = projects.length - named;

  // alternate so the two rows carry a mix rather than clustering by sector
  const rowA = projects.filter((_, i) => i % 2 === 0);
  const rowB = projects.filter((_, i) => i % 2 === 1);

  return (
    <div>
      <p className="eyebrow">The wall</p>
      <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance">
        Thirty-plus sites. These are the ones I kept the screenshots of.
      </h2>
      <p className="mt-5 max-w-[58ch] text-muted">
        {unnamed} of the {projects.length} below went out under an agency&rsquo;s name, so they run
        here without one: you can see the work, you just don&rsquo;t get the client. That is the
        deal when you work white-label, and it is the same deal I&rsquo;d give you.
      </p>

      <div className="mt-12 space-y-4">
        {[rowA, rowB].map((row, i) => (
          <div key={i} className="marquee-mask overflow-hidden">
            <div
              className={`flex w-max gap-4 ${
                i === 0 ? "wall-drift" : "wall-drift wall-drift-rev"
              }`}
            >
              {[...row, ...row].map((p, j) => (
                <Tile key={`${p.name}-${j}`} p={p} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.11em] text-muted">
        {projects.length} sites &middot; {named} I can put a name to &middot; hover to wake them
      </p>
    </div>
  );
}
