"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/*
 * Site header with one morphing dropdown.
 *
 * Three menus share a single container. Moving between triggers doesn't close
 * and reopen it: the container slides and resizes to fit the next panel while
 * the content crossfades in the direction of travel. All of that is class and
 * custom-property changes driven from one effect, so React never re-renders
 * on hover.
 *
 * Five items: Work, Services, Pricing, Notes, About. Work and Notes are real
 * links to their pages and open their panel on hover, with a separate chevron
 * button for touch and keyboard. Services has no page of its own, so its label
 * is the button. On phones the sheet shows the same five rows, with the three
 * menus as collapsible submenus.
 */

const WORK = [
  {
    href: "/work#myofascial-clinic",
    title: "Pain clinic",
    desc: "From 4 clicks a month to over 100, in its own Search Console.",
    img: "/notes/photos/clinic-158-to-501-cover-sm.webp",
    tag: "Wellness",
  },
  {
    href: "/work#roofing-contractor",
    title: "Roofing contractor",
    desc: "Average position 47.9 to 14.9, impressions up 25.8 times.",
    img: "/notes/photos/roofing-keywords-cover-sm.webp",
    tag: "Roofing",
  },
  {
    href: "/work#tint-lordz",
    title: "Tint Lordz Auto Spa",
    desc: "Every version of its name at position 2 or better.",
    img: "/notes/photos/lawrence-ma-window-tint-seo-cover-sm.webp",
    tag: "Automotive",
  },
  {
    href: "/work#over-the-table-top",
    title: "Over The Table Top",
    desc: "614 keywords on page one for a Charles County game shop.",
    img: "/notes/photos/charles-county-md-game-shop-seo-cover-sm.webp",
    tag: "Retail",
  },
];

const SERVICES = [
  { href: "/roofing-seo", title: "Roofing SEO", desc: "Town pages, storm pages and call tracking for roofers." },
  { href: "/pricing#audit", title: "Site Audit, $750", desc: "A ranked list of what's costing you calls." },
  { href: "/pricing#sprint", title: "Setup Sprint, $1,800", desc: "Tracking, speed, schema and fixes, done once." },
  { href: "/pricing#monthly", title: "Monthly SEO, from $600", desc: "New pages, Business Profile and a monthly report." },
  { href: "/pricing#agencies", title: "White-label for agencies", desc: "Technical SEO under your brand, from $850 a site." },
  { href: "/ai-search-optimization", title: "AI search optimization", desc: "Get named by ChatGPT, Claude and Google's AI. $1,000 a month." },
  { href: "/saas-seo", title: "SEO + AI search for startups", desc: "Found on Google, cited by ChatGPT. $1,000 a month." },
];

const NOTES = [
  { href: "/notes/topic/roofing", title: "Roofing", desc: "Town pages, storm pages, keywords" },
  { href: "/notes/topic/local", title: "Local SEO", desc: "Business Profile, map pack, near me" },
  { href: "/notes/topic/tracking", title: "Call tracking", desc: "GA4, Tag Manager, Search Console" },
  { href: "/notes/topic/trades", title: "By trade", desc: "Plumbing, HVAC, lawn, pest and more" },
  { href: "/notes/topic/ai", title: "AI search", desc: "ChatGPT, Claude, AI Overviews" },
];

const MENUS = ["work", "services", "notes"] as const;
type MenuId = (typeof MENUS)[number];

/** 8px panel padding + 12px row padding, so panel text lines up with its trigger. */
const PAD = 20;

function Chevron() {
  return (
    <svg className="hx-chev" width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden>
      <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** One row of the phone menu with a collapsible submenu under it. */
function SheetGroup({
  id,
  label,
  href,
  items,
  open,
  onToggle,
}: {
  id: MenuId;
  label: string;
  href?: string;
  items: { href: string; title: string }[];
  open: boolean;
  onToggle: (id: MenuId | null) => void;
}) {
  const panelId = `hx-sub-${id}`;
  const toggle = () => onToggle(open ? null : id);
  return (
    <div className="hx-sgroup">
      {href ? (
        <div className="hx-shead">
          <Link className="hx-srow" href={href}>
            {label}
          </Link>
          <button
            type="button"
            className="hx-stoggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? "Hide" : "Show"} ${label.toLowerCase()} links`}
            onClick={toggle}
          >
            <Chevron />
          </button>
        </div>
      ) : (
        <button type="button" className="hx-srow hx-srow-btn" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
          {label}
          <span className="hx-stoggle" aria-hidden>
            <Chevron />
          </span>
        </button>
      )}
      <div id={panelId} className={`hx-ssub${open ? " open" : ""}`} aria-hidden={!open}>
        <div>
          {items.map((it) => (
            <Link key={it.href} href={it.href} tabIndex={open ? 0 : -1}>
              {it.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const headerRef = useRef<HTMLElement | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sub, setSub] = useState<MenuId | null>(null);

  useEffect(() => setSheetOpen(false), [pathname]);
  useEffect(() => {
    if (!sheetOpen) setSub(null);
  }, [sheetOpen]);

  // The dropdown. Plain DOM work inside one effect, mirroring the spec it was
  // built from, so pointer movement never triggers a React render.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const nav = header.querySelector<HTMLElement>("#hx-nav");
    const dd = header.querySelector<HTMLElement>("#hx-dd");
    if (!nav || !dd) return;
    const triggers = Array.from(nav.querySelectorAll<HTMLElement>(".hx-trigger"));
    const carets = Array.from(nav.querySelectorAll<HTMLButtonElement>(".hx-caret"));
    const expand = (id: MenuId | null) =>
      [...triggers, ...carets].forEach((t) => t.setAttribute("aria-expanded", String(t.dataset.menu === id)));
    const panels = Object.fromEntries(
      MENUS.map((id) => [id, dd.querySelector<HTMLElement>(`[data-panel="${id}"]`)!])
    ) as Record<MenuId, HTMLElement>;
    const triggerFor = (id: MenuId) => triggers.find((t) => t.dataset.menu === id)!;

    let current: MenuId | null = null;
    let closeTimer: number | undefined;
    let loaded = false;

    // Preview images load on first open, not with the page.
    const loadImages = () => {
      if (loaded) return;
      loaded = true;
      dd.querySelectorAll<HTMLImageElement>("img[data-src]").forEach((img) => {
        img.src = img.dataset.src!;
      });
    };

    const place = (id: MenuId) => {
      const panel = panels[id];
      const w = panel.offsetWidth;
      const h = panel.offsetHeight;
      const tr = triggerFor(id).getBoundingClientRect();
      const hr = header.getBoundingClientRect();
      let x = tr.left - PAD;
      x = Math.max(hr.left + 12, Math.min(x, hr.right - w - 12));
      x -= ((dd.offsetParent as HTMLElement | null) ?? header).getBoundingClientRect().left;
      dd.style.setProperty("--x", `${x}px`);
      dd.style.setProperty("--w", `${w}px`);
      dd.style.setProperty("--h", `${h}px`);
    };

    const open = (id: MenuId) => {
      window.clearTimeout(closeTimer);
      if (current === id) return;
      loadImages();
      const next = panels[id];
      if (!current) {
        dd.classList.add("instant", "snap");
        MENUS.forEach((m) => {
          panels[m].classList.add("snap");
          panels[m].removeAttribute("data-state");
        });
        place(id);
        void dd.offsetWidth;
        dd.classList.remove("snap");
        MENUS.forEach((m) => panels[m].classList.remove("snap"));
        dd.classList.add("open");
        requestAnimationFrame(() => dd.classList.remove("instant"));
      } else {
        const dir = MENUS.indexOf(id) > MENUS.indexOf(current) ? 1 : -1;
        panels[current].setAttribute("data-state", dir > 0 ? "exit-left" : "exit-right");
        next.classList.add("snap");
        next.setAttribute("data-state", dir > 0 ? "exit-right" : "exit-left");
        void next.offsetWidth;
        next.classList.remove("snap");
        place(id);
      }
      next.setAttribute("data-state", "active");
      expand(id);
      current = id;
    };

    const close = () => {
      dd.classList.remove("open");
      if (current) panels[current].removeAttribute("data-state");
      expand(null);
      current = null;
    };

    const scheduleClose = (ms = 140) => {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(close, ms);
    };

    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | Document | Window,
      type: K | string,
      fn: (e: any) => void
    ) => {
      el.addEventListener(type, fn);
      cleanups.push(() => el.removeEventListener(type, fn));
    };

    triggers.forEach((t) => {
      const id = t.dataset.menu as MenuId;
      on(t, "pointerenter", (e: PointerEvent) => {
        if (e.pointerType === "mouse") open(id);
      });
      // A link trigger navigates; only the button trigger toggles.
      on(t, "click", () => {
        if (t.tagName === "BUTTON") current === id ? close() : open(id);
        else close();
      });
    });
    carets.forEach((c) => {
      const id = c.dataset.menu as MenuId;
      on(c, "pointerenter", (e: PointerEvent) => {
        if (e.pointerType === "mouse") open(id);
      });
      on(c, "click", () => (current === id ? close() : open(id)));
    });

    nav.querySelectorAll<HTMLElement>(".hx-plain").forEach((a) =>
      on(a, "pointerenter", (e: PointerEvent) => {
        if (e.pointerType === "mouse") scheduleClose(60);
      })
    );
    on(nav, "pointerenter", () => window.clearTimeout(closeTimer));
    on(nav, "pointerleave", (e: PointerEvent) => {
      if (e.pointerType === "mouse") scheduleClose();
    });
    on(nav, "focusout", (e: FocusEvent) => {
      if (!nav.contains(e.relatedTarget as Node | null)) scheduleClose(0);
    });
    on(document, "keydown", (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (current) {
        const t = triggerFor(current);
        close();
        t.focus();
      }
      setSheetOpen(false);
    });
    on(document, "pointerdown", (e: PointerEvent) => {
      if (current && !nav.contains(e.target as Node)) close();
    });
    on(window, "resize", () => {
      if (current) place(current);
    });

    // Discover-style rows: hovering or focusing a row swaps the preview.
    const items = Array.from(dd.querySelectorAll<HTMLElement>(".hx-p-work .hx-item"));
    const imgs = Array.from(dd.querySelectorAll<HTMLElement>(".hx-media img"));
    items.forEach((item) => {
      const activate = () => {
        items.forEach((i) => i.classList.toggle("is-active", i === item));
        imgs.forEach((img, n) => img.classList.toggle("is-active", String(n) === item.dataset.img));
      };
      on(item, "pointerenter", activate);
      on(item, "focus", activate);
    });

    // Following any link closes everything.
    dd.querySelectorAll("a").forEach((a) => on(a as HTMLElement, "click", () => close()));

    return () => {
      window.clearTimeout(closeTimer);
      cleanups.forEach((fn) => fn());
      close();
    };
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className="hx"
    >
      <div className="hx-bar">
        <Link href="/" className="hx-logo" aria-label="Koinophobe home">
          <span className="hx-dot" aria-hidden />
          <span className="font-display text-[19px] tracking-tight">{site.name}</span>
          <span className="hx-by">by {site.owner}</span>
        </Link>

        <nav className="hx-nav" id="hx-nav" aria-label="Main">
          <ul className="hx-links">
            <li className="hx-split">
              <Link className="hx-trigger" data-menu="work" href="/work" aria-current={pathname === "/work" ? "page" : undefined}>
                Work
              </Link>
              <button type="button" className="hx-caret" data-menu="work" aria-expanded="false" aria-label="Show case studies">
                <Chevron />
              </button>
            </li>
            <li>
              <button type="button" className="hx-trigger" data-menu="services" aria-expanded="false">
                Services <Chevron />
              </button>
            </li>
            <li>
              <Link className="hx-plain" href="/pricing" aria-current={pathname === "/pricing" ? "page" : undefined}>
                Pricing
              </Link>
            </li>
            <li className="hx-split">
              <Link className="hx-trigger" data-menu="notes" href="/notes" aria-current={pathname.startsWith("/notes") ? "page" : undefined}>
                Notes
              </Link>
              <button type="button" className="hx-caret" data-menu="notes" aria-expanded="false" aria-label="Show note topics">
                <Chevron />
              </button>
            </li>
            <li>
              <Link className="hx-plain" href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
                About
              </Link>
            </li>
          </ul>

          <div className="dd" id="hx-dd">
            <div className="hx-panel hx-p-work" data-panel="work">
              <div className="hx-list">
                {WORK.map((w, i) => (
                  <Link key={w.href} href={w.href} className={`hx-item${i === 0 ? " is-active" : ""}`} data-img={i}>
                    <strong>{w.title}</strong>
                    <span>{w.desc}</span>
                  </Link>
                ))}
              </div>
              <div className="hx-media" aria-hidden>
                {WORK.map((w, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={w.img} data-src={w.img} alt="" className={i === 0 ? "is-active" : ""} />
                ))}
              </div>
            </div>

            <div className="hx-panel hx-p-services" data-panel="services">
              {SERVICES.map((s) => (
                <Link key={s.href} href={s.href} className="hx-item">
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </Link>
              ))}
            </div>

            <div className="hx-panel hx-p-notes" data-panel="notes">
              {NOTES.map((n) => (
                <Link key={n.href} href={n.href} className="hx-item">
                  <strong>{n.title}</strong>
                  <span>{n.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="hx-actions">
          <ThemeToggle />
          <a
            className="btn btn-sm btn-primary"
            href={site.booking}
            target="_blank"
            rel="noopener"
            data-track="cta_book"
            data-from="header"
          >
            Book a free call
          </a>
          <button
            type="button"
            className="hx-menu-btn"
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            aria-expanded={sheetOpen}
            aria-controls="hx-sheet"
            onClick={() => setSheetOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 5.5h12M2 10.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`hx-sheet${sheetOpen ? " open" : ""}`}
        id="hx-sheet"
        onClick={(e) => {
          if ((e.target as Element).closest("a")) setSheetOpen(false);
        }}
      >
        <nav aria-label="Menu">
          <SheetGroup id="work" label="Work" href="/work" open={sub === "work"} onToggle={setSub}
            items={WORK.map((w) => ({ href: w.href, title: w.title }))} />
          <SheetGroup id="services" label="Services" open={sub === "services"} onToggle={setSub}
            items={SERVICES.map((x) => ({ href: x.href, title: x.title }))} />
          <Link className="hx-srow" href="/pricing">Pricing</Link>
          <SheetGroup id="notes" label="Notes" href="/notes" open={sub === "notes"} onToggle={setSub}
            items={NOTES.map((n) => ({ href: n.href, title: n.title }))} />
          <Link className="hx-srow" href="/about">About</Link>
        </nav>
        <div className="hx-sheet-foot">
          <a
            className="btn btn-md btn-primary"
            href={site.booking}
            target="_blank"
            rel="noopener"
            data-track="cta_book"
            data-from="header_mobile"
          >
            Book a free call
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
