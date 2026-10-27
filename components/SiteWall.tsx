"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/content";

/**
 * The wall. Every site shows its real screenshot and its real video.
 *
 * Each site is a polaroid, like the cards around the home hero, tilted a
 * little either way and straightened under the pointer.
 *
 * What `named: false` withholds is the attribution, not the picture: no client
 * name and no outbound link. The work is visible, the client list
 * stays the agency's. Flip a project to `named: true` in lib/content.ts to give
 * it its name, its host and a link out.
 *
 * Two rows drift in opposite directions and stop on hover. Reduced motion turns
 * them into plain scrollable strips.
 */

function Tile({ p, video }: { p: Project; video: boolean }) {
  const vid = useRef<HTMLVideoElement | null>(null);

  const enter = () => {
    vid.current?.play().catch(() => {});
  };
  const leave = () => {
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
      className="wall-tile polaroid group flex h-full w-[260px] flex-none flex-col sm:w-[320px]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-surface">
        {p.video && video ? (
          <video
            ref={vid}
            poster={p.image}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${p.sector} website preview`}
            className="h-full w-full object-cover object-top"
          >
            <source src={p.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={p.image}
            alt={`${p.sector} website`}
            fill
            sizes="(min-width: 640px) 320px, 260px"
            className="object-cover object-top"
          />
        )}
      </div>

      <div className="flex items-start justify-between gap-3 px-1 pb-0.5 pt-3">
        <span className="min-w-0">
          <span className="block truncate text-[13.5px] font-semibold tracking-tight">
            {p.named ? p.name : p.sector}
          </span>
          <span className="mt-0.5 block truncate text-[12.5px] text-muted">{p.named ? p.sector : p.market}</span>
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
  // A tile's video only ever plays on hover, so a touch device is handed the
  // poster and nothing else. That is 28 media elements the phone never builds.
  // `ready` also gates the marquee's duplicate copy. The server sends one set
  // of tiles; the clone that makes the loop seamless is added after paint, so
  // the HTML the browser has to download is half the size.
  const [video, setVideo] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setVideo(window.matchMedia("(pointer: fine)").matches);
    setReady(true);
  }, []);

  const named = projects.filter((p) => p.named).length;
  const unnamed = projects.length - named;

  // alternate so the two rows carry a mix rather than clustering by sector
  const rowA = projects.filter((_, i) => i % 2 === 0);
  const rowB = projects.filter((_, i) => i % 2 === 1);

  return (
    <div>
      <div className="stage-head">
        <p className="eyebrow">The wall</p>
        <h2 className="t-h2 mx-auto mt-5 max-w-[22ch]">Thirty-plus local business sites we&rsquo;ve done SEO on.</h2>
        <p className="t-lead mt-5 max-w-[58ch]">
          {unnamed} of the {projects.length} below show without a name, most because they went out
          under an agency&rsquo;s brand. You can see the work, not the client.
        </p>
      </div>

      {/* Vertical padding leaves room for the tilt and the hover lift. */}
      <div className="mt-12 space-y-2">
        {[rowA, rowB].map((row, i) => (
          <div key={i} className="marquee-mask overflow-hidden py-4">
            <div
              className={`flex w-max gap-5 ${
                i === 0 ? "wall-drift" : "wall-drift wall-drift-rev"
              }`}
            >
              {(ready ? [...row, ...row] : row).map((p, j) => (
                <Tile key={`${p.name}-${j}`} p={p} video={video} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-[13.5px] text-muted">
        {projects.length} sites &middot; {named} we can put a name to &middot; hover to wake them
      </p>
    </div>
  );
}
