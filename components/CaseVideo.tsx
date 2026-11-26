"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { site } from "@/lib/site";
import { seconds, watchUrl, type Video } from "@/lib/videos";

/*
 * A click-to-load YouTube facade. Until the visitor presses play, the page
 * carries one image and no YouTube script, so Core Web Vitals don't pay for a
 * video most readers won't start. The iframe is the privacy-enhanced
 * youtube-nocookie host. Chapter links jump the player when it's loaded and
 * open YouTube at that second when it isn't.
 *
 * While the video has no id yet, it renders a "coming to YouTube" panel in
 * the same slot, so the page layout doesn't change on the day it goes live.
 */
export function CaseVideo({ v }: { v: Video }) {
  const [start, setStart] = useState<number | null>(null);
  const live = Boolean(v.id);
  const poster = v.id ? `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg` : v.thumbnail;

  return (
    <figure className="not-prose my-10">
      {live ? (
        start === null ? (
          <button type="button" className="yt-facade" onClick={() => setStart(0)} aria-label={`Play video: ${v.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {poster ? <img src={poster} alt="" loading="lazy" decoding="async" /> : null}
            <span className="yt-play">
              <Play size={18} fill="currentColor" aria-hidden />
              Play &middot; {v.length}
            </span>
          </button>
        ) : (
          <div className="yt-facade">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&start=${start}`}
              title={v.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )
      ) : (
        <div className="yt-facade yt-pending halftone-light !aspect-[16/5] !bg-transparent !text-ink">
          <p className="relative max-w-[34ch] bg-paper px-3 py-2 text-[17px] font-bold">
            The video version of this note is coming to YouTube{site.youtubeHandle ? ` at ${site.youtubeHandle}` : ""}.
          </p>
        </div>
      )}
      <figcaption className="mt-3 text-[15px] font-semibold">
        {v.series === "Case Files" ? "Watch the case file" : "Watch the short version"} ({v.length})
      </figcaption>
      {live ? (
        <ol className="chapters mt-3" style={{ ["--rows" as string]: Math.ceil(v.chapters.length / 2) }}>
          {v.chapters.map((c) => (
            <li key={c.at} className="border-t border-ink/25">
              <a
                href={watchUrl(v, c.at)}
                onClick={(e) => {
                  e.preventDefault();
                  setStart(seconds(c.at));
                }}
                className="leader py-1.5 text-[14.5px] hover:underline"
              >
                <span>{c.title}</span>
                <span className="dots" aria-hidden />
                <span className="tnum font-bold">{c.at}</span>
              </a>
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}
