"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { reviews } from "@/lib/content";

/*
 * The real client reviews from lib/content.ts as tall cards in a row the
 * visitor scrolls with two arrow buttons (or a swipe). Nothing moves on its own.
 */
export function Testimonials({ heading }: { heading: string }) {
  const row = useRef<HTMLDivElement | null>(null);
  const go = (dir: number) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".tcard");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: "smooth" });
  };
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker">Reviews</p>
          <h2 className="t-h2 mt-4 max-w-[17ch]">{heading}</h2>
        </div>
        <div className="arrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous reviews"><ArrowLeft size={18} aria-hidden /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next reviews"><ArrowRight size={18} aria-hidden /></button>
        </div>
      </div>
      <div ref={row} className="tcards mt-12" tabIndex={0} aria-label="Client reviews">
        {reviews.map((r) => (
          <figure key={r.name} className="tcard">
            <p className="src">
              <span>{r.source === "Upwork" ? "Review on Upwork" : "Direct client"}</span>
            </p>
            <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="who">
              {r.name}
              <span>{r.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
