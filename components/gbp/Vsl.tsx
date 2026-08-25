"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { track } from "@/lib/analytics";
import { VIDEO_EMBED_URL, VIDEO_LENGTH, VIDEO_POSTER } from "@/lib/gbp";

// Click-to-play so no third-party player loads until someone actually wants it.
// With no VIDEO_EMBED_URL set, the frame renders as a placeholder instead of
// breaking the section.
export function Vsl() {
  const [playing, setPlaying] = useState(false);

  const frame =
    "relative aspect-video w-full overflow-hidden rounded-[26px] border-[3px] border-[rgb(var(--edge))] bg-brand-soft shadow-[10px_10px_0_0_rgb(var(--edge))]";

  if (!VIDEO_EMBED_URL) {
    return (
      <div className={frame}>
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-[3px] border-[rgb(var(--edge))] bg-brand text-[rgb(var(--edge))]">
              <Play size={24} strokeWidth={3} className="ml-1" aria-hidden />
            </span>
            <p className="mt-5 font-display text-lg font-bold tracking-tight text-ink">
              Video going up shortly
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              Set VIDEO_EMBED_URL in lib/gbp.ts
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (playing) {
    return (
      <div className={frame}>
        <iframe
          src={`${VIDEO_EMBED_URL}${VIDEO_EMBED_URL.includes("?") ? "&" : "?"}autoplay=1`}
          title="How to get your business on Google Maps"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        track("gbp_vsl_play", { location: "vsl_section" });
        setPlaying(true);
      }}
      aria-label="Play the video"
      className={`${frame} group block transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_0_rgb(var(--edge))]`}
    >
      {VIDEO_POSTER && (
        <Image
          src={VIDEO_POSTER}
          alt=""
          fill
          sizes="(min-width: 1024px) 40rem, 100vw"
          className="object-cover"
        />
      )}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border-[3px] border-[rgb(var(--edge))] bg-brand text-[rgb(var(--edge))] shadow-[4px_4px_0_0_rgb(var(--edge))] transition-transform group-hover:scale-105">
          <Play size={30} strokeWidth={3} className="ml-1.5" aria-hidden />
        </span>
      </span>
      <span className="absolute bottom-4 left-4 rounded-full border-2 border-[rgb(var(--edge))] bg-bg px-3 py-1 font-mono text-xs font-bold text-ink">
        {VIDEO_LENGTH}
      </span>
    </button>
  );
}
