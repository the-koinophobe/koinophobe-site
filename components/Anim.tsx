"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * The whole animation system, in one observer.
 *
 * Elements opt in with `data-anim`. When one scrolls into view this marks it
 * `data-in` and CSS does the rest, so no animation code ships per component.
 * The `anim` class that arms the CSS is set by an inline script in the head,
 * which means a reader with no JS sees plain, fully visible content instead of
 * a page of invisible boxes.
 *
 * The scan re-runs on every route change. App Router keeps this layout mounted
 * across navigations, so without that the next page's elements are never
 * observed and stay at opacity 0 until a reload.
 */
export function Anim() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains("anim")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    // A frame's grace so the new route's markup is in the document first.
    const id = requestAnimationFrame(() => {
      document.querySelectorAll("[data-anim]:not([data-in])").forEach((el) => io.observe(el));
    });

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [pathname]);

  // One delegated listener for every call to action on the page, so buttons
  // stay server components instead of each shipping its own handler.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      if (!el) return;
      track(el.getAttribute("data-track") ?? "cta", {
        from: el.getAttribute("data-from") ?? "unknown",
        href: el.getAttribute("href") ?? undefined,
      });
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
