import Link from "next/link";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "./CookieSettingsButton";

/*
 * Every page ends the same way: a dark closing band with the one action, then
 * the dark footer: a statement and two direct links on the left, link columns
 * on the right, the legal row at the foot.
 */

const COLS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Services",
    links: [
      { href: "/google-business-profile-optimization", label: "Google Business Profile" },
      { href: "/ai-search-optimization", label: "AI search" },
      { href: "/pricing#fix", label: "The Google fix" },
      { href: "/pricing#monthly", label: "Monthly growth" },
      { href: "/pricing#free", label: "Free site audit" },
      { href: "/missed-call-calculator", label: "Missed call calculator" },
    ],
  },
  {
    title: "Trades",
    links: [
      { href: "/roofing-seo", label: "Roofing" },
      { href: "/home-remodeling-seo", label: "Home remodeling" },
      { href: "/notes/topic/trades", label: "Plumbing, HVAC and more" },
      { href: "/notes/lawn-care-seo", label: "Lawn and landscaping" },
      { href: "/notes/pool-deck-repair-seo", label: "Pool and deck" },
    ],
  },
  {
    title: "Koinophobe",
    links: [
      { href: "/work", label: "Case studies" },
      { href: "/about", label: "About" },
      { href: "/notes", label: "Notes" },
      { href: "/gtm", label: "GTM for startups" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const elsewhere = [
    { href: site.linkedin, label: "LinkedIn" },
    { href: site.x, label: "X (Twitter)" },
    { href: site.substack, label: "Newsletter" },
    ...(site.youtube ? [{ href: site.youtube, label: "YouTube" }] : []),
    { href: site.instagram, label: "Instagram" },
  ];

  return (
    <>
      <section className="close6" aria-labelledby="close-h">
        <div className="close-glow" aria-hidden />
        <div className="container-pad relative py-28 sm:py-36" data-anim="stagger">
          <p className="kicker">Still reading? Good sign</p>
          <h2 id="close-h" className="mx-auto mt-5 max-w-[14ch]">Tell me about your business.</h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-[18px] font-medium leading-relaxed">
            I&rsquo;ll look at your Google profile before we talk, then tell you the two or three things I&rsquo;d fix first.
          </p>
          <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="close" className="btn btn-lg btn-primary close-btn mt-9">
            Book a call <span className="close-arrow" aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>

      <footer className="ft">
        <div className="container-pad pb-8 pt-16">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div data-anim="rise">
              <Link href="/" className="wordmark text-[26px]" aria-label={`${site.name}, home`}>
                koinophobe
              </Link>
              <p className="mt-8 max-w-[18ch] font-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.1] tracking-[-0.02em]">
                Digital growth for the trades. Found, named, booked.
              </p>
              <div className="mt-10 grid max-w-[28rem] gap-8 sm:grid-cols-2">
                <div>
                  <p className="kicker">Let&rsquo;s talk</p>
                  <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="footer" className="link-u mt-3 inline-block text-[17px]">Book a free call</a>
                </div>
                <div>
                  <p className="kicker">Send email</p>
                  <a href={`mailto:${site.email}`} className="link-u mt-3 inline-block text-[17px]">{site.email}</a>
                </div>
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4" data-anim="stagger">
              {COLS.map((c) => (
                <nav key={c.title} aria-label={c.title}>
                  <h3>{c.title}</h3>
                  <ul className="mt-4 space-y-2.5 text-[15px]">
                    {c.links.map((l) => (
                      <li key={l.href + l.label}><Link href={l.href} className="ft-link">{l.label}</Link></li>
                    ))}
                  </ul>
                </nav>
              ))}
              <nav aria-label="Elsewhere">
                <h3>Elsewhere</h3>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {elsewhere.map((l) => (
                    <li key={l.href}><a href={l.href} target="_blank" rel="noopener" className="ft-link">{l.label}<span className="ft-ext" aria-hidden>&#8599;</span></a></li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <p className="ft-giant" data-anim="letters" aria-hidden>
            {"koinophobe".split("").map((c, i) => (
              <span key={i} style={{ ["--i" as string]: i }}>{c}</span>
            ))}
          </p>

          <div className="rule mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6 text-[13px] opacity-75">
            <span>&copy; {year} {site.name}. One person, US clients, same-day replies.</span>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookies">Cookies</Link>
              <CookieSettingsButton className="hover:underline" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
