"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Chapter = { title: string; body: string; img: string; alt: string; w: number; h: number };

/*
 * Pinned chapters: the section is two screens tall; its content holds while
 * the steps open one at a time on the left and the frame on the right swaps to
 * each step's picture. The only scroll-led moment on the page it sits on.
 * Under 1024px and under reduced motion it is a plain list, each picture
 * under its words.
 */
export function Chapters({ id, heading, chapters, inverse = false }: { id: string; heading: string; chapters: Chapter[]; inverse?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const set = () => setPinned(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const run = r.height - window.innerHeight;
        const p = Math.min(0.999, Math.max(0, -r.top / Math.max(1, run)));
        setActive(Math.floor(p * chapters.length));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, chapters.length]);

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-h`} className={`${inverse ? "inverse" : ""} ${pinned ? "h-[200vh]" : ""}`}>
      <div className={pinned ? "sticky top-[72px] flex h-[calc(100vh-72px)] items-center" : "section"}>
        <div className="container-pad grid w-full gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id={`${id}-h`} className="t-h2 max-w-[18ch]">{heading}</h2>
            <ol className="mt-10 space-y-2">
              {chapters.map((c, i) => {
                const on = !pinned || i === active;
                return (
                  <li key={c.title} className="border-l-2 pl-5 transition-colors duration-300" style={{ borderColor: on ? "currentColor" : "rgb(var(--line))" }}>
                    <h3 className={`text-[18px] font-medium transition-opacity duration-300 ${on ? "opacity-100" : "opacity-55"}`}>{c.title}</h3>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <p className="overflow-hidden pt-2 text-[16px] leading-relaxed opacity-85">{c.body}</p>
                    </div>
                    {!pinned ? (
                      <div className="frame relative mt-5 aspect-[4/3]">
                        <Image src={c.img} alt={c.alt} fill sizes="100vw" className="object-cover object-top" />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
          {pinned ? (
            <div className="frame relative aspect-[4/3] self-center">
              {chapters.map((c, i) => (
                <Image
                  key={c.img}
                  src={c.img}
                  alt={i === active ? c.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className={`object-cover object-top transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
