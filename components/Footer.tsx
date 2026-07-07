import Link from "next/link";
import { site } from "@/lib/site";
import { BookCall } from "./BookCall";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { SiteVisits } from "./SiteVisits";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-surface/50">
      <div className="container-pad py-14">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1.4fr]">
          <div className="pattern-on-brand relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-brand p-7 text-bg">
            <span className="font-display text-2xl font-bold tracking-tight">
              {site.name}
            </span>
            <p className="max-w-xs text-lg font-semibold leading-snug">
              Technical SEO and web,
              <span className="opacity-70"> built to never be ordinary.</span>
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-line bg-bg p-7">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Links
                </p>
                <ul className="space-y-2">
                  {site.nav.map((n) => (
                    <li key={n.href}>
                      <Link href={n.href} className="font-medium text-ink hover:text-brand">
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Elsewhere
                </p>
                <ul className="space-y-2">
                  <li>
                    <a href={site.github} className="font-medium text-ink hover:text-brand">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="font-medium text-ink hover:text-brand">
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span>&copy; {year} {site.name}.</span>
                <Link href="/privacy" className="hover:text-brand">Privacy</Link>
                <Link href="/cookies" className="hover:text-brand">Cookies</Link>
                <CookieSettingsButton className="hover:text-brand" />
              </div>
              <BookCall subtle label="Book a call" />
            </div>
          </div>
        </div>

        <div className="mt-14 w-full overflow-hidden">
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            className="text-outline block select-none whitespace-nowrap text-center font-display text-[clamp(2.5rem,12.5vw,11rem)] font-bold uppercase leading-none tracking-tight transition-colors duration-300 hover:text-brand"
          >
            {site.name}
          </a>
          <p className="mt-4 text-center font-mono text-sm text-muted">{site.email}</p>
          <SiteVisits />
        </div>
      </div>
    </footer>
  );
}
