"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crosshair, Activity, BadgeCheck } from "lucide-react";
import { process } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = [Crosshair, Activity, BadgeCheck];

export function ProcessPinned() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    // Only pin + scrub on desktop with motion allowed. Mobile falls back to a
    // normal vertical stack (no JS layout changes needed).
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tl = gsap.timeline();
      tl.to(track, { x: () => -getDistance(), ease: "none", duration: 1 });
      // brief hold so the final card is fully in frame before the section unpins
      tl.to({}, { duration: 0.22 });
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + getDistance() * 1.22,
        pin: true,
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      });
      return () => {
        st.kill();
        tl.kill();
        gsap.set(track, { clearProps: "x" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-pad">
        <span className="mb-3 inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
          How I work
        </span>
        <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Rank for buyers. Track it. Prove it converts.
        </h2>
        {/* progress rail (desktop) */}
        <div className="mt-6 hidden h-1 w-40 overflow-hidden rounded-full bg-line lg:block">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-10 lg:mt-12 lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:flex-nowrap lg:gap-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pr-[12vw]"
        >
          {process.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={p.step}
                className="lift flex shrink-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface/60 lg:h-[48vh] lg:w-[56vw] lg:flex-row"
              >
                {/* Text */}
                <div className="flex flex-col justify-between p-8 lg:w-[42%]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                      <Icon size={26} strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-6xl font-semibold text-brand/15">
                      {p.step}
                    </span>
                  </div>
                  <div className="mt-6 lg:mt-0">
                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-muted">{p.body}</p>
                  </div>
                </div>

                {/* Image / visual */}
                <div className="relative min-h-[220px] flex-1 border-t border-line lg:border-l lg:border-t-0">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.title} example`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover object-left-top"
                    />
                  ) : (
                    <div className="grain hero-wash flex h-full w-full flex-col items-center justify-center gap-2">
                      <Icon size={28} strokeWidth={1.5} className="text-brand/50" />
                      <span className="font-mono text-xs uppercase tracking-wider text-ink/40">
                        {p.hint}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
