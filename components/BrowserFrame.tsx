"use client";

import { useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Project } from "@/lib/content";

export function BrowserFrame({ project }: { project: Project }) {
  const host = project.url
    ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "coming-soon";

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onEnter = () => {
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const media = project.video ? (
    <video
      ref={videoRef}
      poster={project.image || undefined}
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full object-cover object-top"
    >
      <source src={project.video} type="video/mp4" />
    </video>
  ) : project.image ? (
    <Image
      src={project.image}
      alt={`${project.name} website`}
      fill
      sizes="(min-width: 1024px) 33vw, 100vw"
      className="object-cover object-top"
    />
  ) : (
    <div className="hero-wash grain flex h-full w-full items-center justify-center">
      <span className="font-display text-lg font-semibold text-ink/40">
        Screenshot coming soon
      </span>
    </div>
  );

  const Inner = (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="lift flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg"
    >
      {/* Top chrome bar */}
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        </span>
        <span className="ml-2 truncate rounded-md bg-bg px-3 py-1 text-xs text-muted">
          {host}
        </span>
      </div>

      {/* Screenshot / preview */}
      <div className="relative w-full flex-1 overflow-hidden bg-surface">
        {media}
        {project.video && (
          <span className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1 text-[10px] font-medium text-bg backdrop-blur">
            <Play size={9} className="fill-bg" strokeWidth={0} /> hover
          </span>
        )}
      </div>

      {/* Caption */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span>
          <span className="block font-display text-sm font-semibold text-ink">
            {project.name}
          </span>
          <span className="block text-xs text-muted">{project.category}</span>
        </span>
        {project.url && <span className="shrink-0 text-xs text-brand">Visit →</span>}
      </div>
    </div>
  );

  if (!project.url) return Inner;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {Inner}
    </a>
  );
}
