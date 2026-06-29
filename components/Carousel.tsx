"use client";

import { useRef } from "react";
import { BrowserFrame } from "./BrowserFrame";
import type { Project } from "@/lib/content";

export function Carousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="marquee-mask -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <div
            key={p.name}
            data-card
            className="h-[300px] w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
          >
            <BrowserFrame project={p} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-brand"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-brand"
        >
          →
        </button>
      </div>
    </div>
  );
}
