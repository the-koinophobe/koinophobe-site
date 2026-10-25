import Link from "next/link";
import { Linkedin } from "lucide-react";
import { site } from "@/lib/site";
import { topics } from "@/lib/topics";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { SiteVisits } from "./SiteVisits";
import { XIcon } from "./Availability";

const COLS: { title: string; href?: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Services",
    links: [
      { href: "/roofing-seo", label: "Roofing SEO" },
      { href: "/home-remodeling-seo", label: "Home remodeling SEO" },
      { href: "/pricing#audit", label: "Site Audit" },
      { href: "/pricing#sprint", label: "Setup Sprint" },
      { href: "/pricing#monthly", label: "Monthly SEO plans" },
      { href: "/pricing#agencies", label: "White-label for agencies" },
      { href: "/ai-search-optimization", label: "AI search optimization" },
      { href: "/saas-seo", label: "SaaS SEO and AI search" },
      { href: "/pricing", label: "All pricing" },
    ],
  },
  {
    title: "Work",
    href: "/work",
    links: [
      { href: "/work#myofascial-clinic", label: "Pain clinic" },
      { href: "/work#roofing-contractor", label: "Roofing contractor" },
      { href: "/work#tint-lordz", label: "Tint Lordz Auto Spa" },
      { href: "/work#over-the-table-top", label: "Over The Table Top" },
      { href: "/work#marketing-agency", label: "Marketing agency" },
    ],
  },
  {
    title: "Notes",
    href: "/notes",
    links: topics.map((t) => ({ href: `/notes/topic/${t.key}`, label: t.label })),
  },
  {
    title: "Koinophobe",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/notes/what-is-a-koinophobe", label: "Why the name" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="p-2.5 sm:p-4">
      <div className="band sq overflow-hidden rounded-[var(--r-lg)]">
        <div className="container-pad py-14 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-10">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span className="logo-mark h-[22px] w-[22px]" aria-hidden />
                <span className="font-display text-[20px] font-extrabold tracking-tight">{site.name}</span>
              </Link>
              <p className="muted mt-4 max-w-[34ch] text-[15px] leading-relaxed">
                An SEO agency for home service businesses: technical SEO, local search, call tracking and AI search.
              </p>
              <p className="muted mt-4 text-[14px]">Replies the same business day</p>
              <a href={`mailto:${site.email}`} className="mt-1 inline-block text-[14px] underline-offset-4 hover:underline">
                {site.email}
              </a>
              <div className="mt-5 flex items-center gap-2">
                <a href={site.linkedin} aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-white/40">
                  <Linkedin size={16} aria-hidden />
                </a>
                <a href={site.x} aria-label="X" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-white/40">
                  <XIcon />
                </a>
              </div>
            </div>
            {COLS.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                {c.href ? (
                  <Link href={c.href} className="text-[14px] font-medium underline-offset-4 hover:underline">
                    {c.title}
                  </Link>
                ) : (
                  <p className="text-[14px] font-medium">{c.title}</p>
                )}
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="muted text-[14.5px] transition-colors hover:text-white dark:hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="muted mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-[13.5px]">
            <span>
              &copy; {year} {site.name}
            </span>
            <div className="flex flex-wrap items-center gap-5">
              <SiteVisits />
              <CookieSettingsButton className="hover:text-white" />
            </div>
          </div>
        </div>
        <span className="foot-mark" aria-hidden>
          {site.name}
        </span>
      </div>
    </footer>
  );
}
