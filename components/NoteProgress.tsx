"use client";

import { useEffect, useState } from "react";

/*
 * A thin bar under the header that fills as the note is read, and the
 * "On this page" link for the section on screen marked as current. Works on
 * the sticky contents list (desktop) and the folded one (phones).
 */
export function NoteProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".prose");
    if (!article) return;

    const onScroll = () => {
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const heads = Array.from(article.querySelectorAll<HTMLElement>("h2[id]"));
    const mark = (id: string) =>
      document.querySelectorAll<HTMLAnchorElement>(".toc a").forEach((a) => {
        if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) mark(seen[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    heads.forEach((h) => io.observe(h));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className="note-progress" aria-hidden>
      <span style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
