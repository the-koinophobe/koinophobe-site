import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileSearch,
  Gauge,
  MapPin,
  PhoneCall,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Availability } from "@/components/Availability";
import { BookCta, BookNote, PageCta, TextCta } from "@/components/Cta";
import { MobileCta } from "@/components/MobileCta";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { NoteCard } from "@/components/NoteCard";
import { aggregate, cases, monthly as gscMonthly } from "@/lib/gsc";
import { monthly, oneTime } from "@/lib/pricing";
import { publishedNotes } from "@/lib/notes";
import { site } from "@/lib/site";
import { Faq, type FaqItem } from "@/components/Faq";

export const revalidate = 3600;

export const metadata = {
  title: { absolute: "Koinophobe · SEO for home service businesses, measured in calls" },
  description:
    "Technical SEO, local SEO and call tracking for roofers and home service businesses in the US. 30+ sites over two years, prices on the site, and a free 20-minute call.",
  alternates: { canonical: "/" },
};

const HOME_FAQ: FaqItem[] = [
  {
    q: "What does Koinophobe do?",
    a: "Technical SEO and call tracking for home service businesses in the US. I fix what stops a site from ranking, set up tracking so you can see the calls and forms Google sends, and build the town and service pages that bring in local searches.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Mostly home service companies: roofers, pool deck, lawn and hurricane shutter businesses. I also work with clinics, shops and auto businesses, at the same prices.",
  },
  {
    q: "How much does it cost?",
    a: "Every price is on the pricing page, in US dollars. The Site Audit is $750, the Setup Sprint is a one-time $1,800, and monthly plans start at $600.",
  },
  {
    q: "How long does SEO take to work?",
    a: "Tracking starts counting calls and forms as soon as it's set up. New pages usually take weeks to months to rank, which is why monthly plans have a three-month minimum.",
  },
];

const SECTORS = [
  { title: "Roofing companies", href: "/roofing-seo", img: "/site/home-roofing.webp", alt: "A roofer standing on a roof during a tear-off on a brick house" },
  { title: "Pool and deck", href: "/notes/pool-deck-repair-seo", img: "/site/home-pool.webp", alt: "A backyard pool with a clean deck" },
  { title: "Lawn and landscaping", href: "/notes/lawn-care-seo", img: "/site/home-lawn.webp", alt: "A lawn care worker mowing a lawn" },
  { title: "Plumbing, HVAC and more", href: "/notes/topic/trades", img: "/site/home-plumbing.webp", alt: "A plumber fixing pipes under a sink" },
];

const PILLARS = [
  {
    icon: <Wrench size={20} aria-hidden />,
    title: "Fix what's holding the site back",
    body: "Indexing problems, slow pages, broken forms, missing schema, messy redirects. The technical work most agencies skip.",
    points: ["Speed and Core Web Vitals", "Schema for your trade", "Indexing and site structure"],
    link: { href: "/notes/core-web-vitals-contractor-websites", label: "How I approach speed" },
  },
  {
    icon: <MapPin size={20} aria-hidden />,
    title: "Get found in every town you serve",
    body: "A real page for each service and each town you want work in, a Google Business Profile that's set up right, and reviews within the rules.",
    points: ["Service and town pages", "Google Business Profile", "Titles that earn the click"],
    link: { href: "/notes/roofing-service-area-pages", label: "How town pages work" },
  },
  {
    icon: <PhoneCall size={20} aria-hidden />,
    title: "Count every call and form",
    body: "Calls, forms and bookings tracked in GA4 and Tag Manager, form delivery tested every month, and one plain report you can read in five minutes.",
    points: ["Call and form tracking", "Monthly form checks", "A one-page monthly report"],
    link: { href: "/notes/call-tracking-for-contractors", label: "How call tracking works" },
  },
];

const STEPS = [
  { n: "01", title: "Free 20-minute call", body: "I look at your site and Business Profile first, then tell you the two or three things I'd fix." },
  { n: "02", title: "A plan in US dollars", body: "A fixed price from the pricing page. Three-month minimum on monthly plans, then month to month." },
  { n: "03", title: "The work, in your accounts", body: "Fixes, pages, profile and tracking. You own every account and keep everything if you leave." },
  { n: "04", title: "A report you can read", body: "Calls, forms, clicks and what's next, on one page every month." },
];

const CASE_IMG: Record<string, string> = {
  "myofascial-clinic": "/notes/photos/clinic-158-to-501-cover-sm.webp",
  "roofing-contractor": "/notes/photos/roofing-keywords-cover-sm.webp",
  "tint-lordz": "/notes/photos/lawrence-ma-window-tint-seo-cover-sm.webp",
  "over-the-table-top": "/notes/photos/charles-county-md-game-shop-seo-cover-sm.webp",
};

export default function HomePage() {
  const latest = publishedNotes().slice(0, 3);
  const plans = [
    oneTime.find((p) => p.key === "audit")!,
    oneTime.find((p) => p.key === "sprint")!,
    monthly.find((p) => p.key === "growth")!,
  ];
  const clinic = gscMonthly.myofascial;
  const clinicMax = Math.max(...clinic.map(([, v]) => v));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-pad relative grid items-center gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div className="hero-in">
            <p className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Technical SEO for US home service businesses
            </p>
            <h1 className="t-h1 mt-6 max-w-[17ch]">
              SEO that gets home service businesses <span className="text-brand">more calls</span> from Google.
            </h1>
            <p className="t-lead mt-6 max-w-[56ch]">
              I&rsquo;m Michael Edward, and Koinophobe is my SEO practice for roofers, pool, lawn and other
              home service companies. I fix what&rsquo;s holding your site back, build the pages that rank in
              the towns you serve, and track every call so you can see exactly what Google sends you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="hero" label="Book a free 20-minute call" />
              <PageCta href="/pricing" label="See pricing" from="hero" />
            </div>
            <BookNote className="mt-4" />
            <ul className="mt-9 grid gap-3 border-t border-line pt-7 text-[15px] sm:grid-cols-3">
              {["Prices on the site, from $600 a month", "You own every account", "30+ sites over two years"].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check size={18} aria-hidden className="mt-0.5 flex-none text-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="hero-photo aspect-[4/5] sm:aspect-[5/5.4]">
              <Image
                src="/site/home-hero.webp"
                alt="A roofer in a safety harness working on an asphalt shingle roof"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>

            <div className="float-card float-in left-3 top-3 w-[210px] p-4 sm:left-[-10%] sm:top-[8%] sm:w-[250px]" style={{ animationDelay: "0.35s" }}>
              <p className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
                <TrendingUp size={15} aria-hidden className="text-brand" />
                Roofing contractor
              </p>
              <p className="mt-2 font-display text-[1.65rem] leading-none tracking-tight">47.9 &rarr; 14.9</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-muted">Average Google position, year on year</p>
            </div>

            <div className="float-card float-in bottom-3 right-3 w-[230px] p-4 sm:bottom-[7%] sm:right-[-8%] sm:w-[270px]" style={{ animationDelay: "0.55s" }}>
              <p className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
                <BarChart3 size={15} aria-hidden className="text-brand" />
                Pain clinic, clicks per month
              </p>
              <div className="mt-3 flex h-[54px] items-end gap-[3px]" aria-hidden>
                {clinic.map(([m, v], i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-[2px] bg-brand"
                    style={{ height: `${Math.max(4, (v / clinicMax) * 100)}%`, opacity: i === clinic.length - 1 ? 0.35 : 0.35 + (v / clinicMax) * 0.65 }}
                    title={`${m}: ${v}`}
                  />
                ))}
              </div>
              <p className="mt-2 text-[12.5px] text-muted">
                <span className="font-medium text-ink">4 to 104</span> a month, from its own Search Console
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof numbers ───────────────────────────────────────── */}
      <section className="border-y border-line">
        <div className="container-pad grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {[
            { v: aggregate.clicks, l: "clicks from Google", n: "spam traffic stripped out" },
            { v: aggregate.pageOne, l: "keywords on page one", n: "position 10 or better" },
            { v: aggregate.topThree, l: "keywords in the top 3", n: "across five sites" },
            { v: aggregate.impressions, l: "search impressions", n: aggregate.window },
          ].map((s, i) => (
            <div key={s.l} className={`px-1 md:px-6 ${i > 0 ? "md:border-l md:border-line" : ""}`}>
              <p className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-none tracking-tight">
                <CountUp value={s.v} display={s.v.toLocaleString("en-US")} />
              </p>
              <p className="mt-2 text-[15px] font-medium">{s.l}</p>
              <p className="text-[13.5px] text-muted">{s.n}</p>
            </div>
          ))}
        </div>
        <p className="container-pad pb-8 text-[13.5px] text-muted">
          Five client sites with their Search Console data open, {aggregate.window}. Every number is on the{" "}
          <Link href="/work" className="text-ink underline underline-offset-4">work page</Link>.
        </p>
      </section>

      {/* ── Who it's for ────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Who it&rsquo;s for</p>
            <h2 className="t-h2 mt-5">For trades that win work from local search</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              If your customers search &ldquo;near me&rdquo;, look at the map and call the first company that
              looks right, your website and Business Profile are doing the selling. I make sure they do it well.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {SECTORS.map((s) => (
              <Link key={s.title} href={s.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface photo-shade">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
                />
                <span className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3 text-white sm:inset-x-5 sm:bottom-5">
                  <span className="font-display text-[1.05rem] leading-tight tracking-tight sm:text-[1.35rem]">{s.title}</span>
                  <span className="hidden h-9 w-9 flex-none place-items-center rounded-full bg-white/15 sm:grid backdrop-blur transition-colors group-hover:bg-white group-hover:text-[#032b14]">
                    <ArrowRight size={17} aria-hidden />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I do ───────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What I do</p>
            <h2 className="t-h2 mt-5">Three jobs, done properly, in your accounts</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              Most SEO is hard to see. Mine shows up as pages you can open, rankings you can check and calls
              you can count.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="card flex flex-col p-7 sm:p-8">
                <span className="icon-tile">{p.icon}</span>
                <h3 className="t-h3 mt-6">{p.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-[15px]">
                      <Check size={17} aria-hidden className="flex-none text-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <TextCta href={p.link.href} label={p.link.label} from="home_pillar" className="mt-7" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Results</p>
              <h2 className="t-h2 mt-5">Real accounts, real Search Console numbers</h2>
              <p className="t-lead mt-4 max-w-[58ch]">
                Thirty-plus sites over two years. These are the ones whose data I can show you, with what&rsquo;s
                still left to win.
              </p>
            </Reveal>
            <PageCta href="/work" label="All case studies" from="home_results" size="md" />
          </div>
          <div data-anim="cards" className="mt-12 grid gap-5 md:grid-cols-2">
            {cases
              .filter((c) => CASE_IMG[c.slug])
              .map((c) => (
                <Link key={c.slug} href={`/work#${c.slug}`} className="card card-hover group grid overflow-hidden sm:grid-cols-[200px_1fr]">
                  <div className="relative aspect-[16/9] bg-surface sm:aspect-auto">
                    <Image src={CASE_IMG[c.slug]} alt="" fill sizes="(min-width: 640px) 200px, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col p-6">
                    <p className="text-[13.5px] text-muted">
                      {c.client} &middot; {c.place}
                    </p>
                    <p className="mt-2 font-display text-[1.2rem] leading-snug tracking-tight">{c.title}</p>
                    <p className="mt-auto flex items-baseline gap-2 pt-5">
                      <span className="font-display text-[1.9rem] leading-none tracking-tight text-brand">{c.headline.value}</span>
                      <span className="text-[13.5px] text-muted">{c.headline.label}</span>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
          <figure className="card mt-8 bg-cream p-8 sm:p-10">
            <blockquote className="t-h3 max-w-[48ch] !text-[clamp(1.25rem,2vw,1.55rem)] !leading-[1.4]">
              &ldquo;He&rsquo;s been on top of things, not only what I asked, but also outside the scope.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[14.5px] text-muted">
              <span className="font-medium text-ink">Daniel Folks</span>, owner, Over The Table Top &middot; Charles County, MD
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How it works</p>
            <h2 className="t-h2 mt-5">From a free call to a monthly report</h2>
          </Reveal>
          <ol data-anim="cards" className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="card p-7">
                <span className="font-display text-[1.1rem] text-brand">{s.n}</span>
                <h3 className="t-h3 mt-4">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <BookCta from="home_steps" />
            <PageCta href="/about" label="How I work" from="home_steps" />
          </div>
        </div>
      </section>

      {/* ── Pricing preview ─────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Pricing</p>
              <h2 className="t-h2 mt-5">Every price is on the site</h2>
              <p className="t-lead mt-4 max-w-[56ch]">
                US dollars, no long contracts, and you own everything I build. Start with an audit, fix it
                once, or hand it over every month.
              </p>
            </Reveal>
            <PageCta href="/pricing" label="Compare all plans" from="home_pricing" size="md" />
          </div>
          <div data-anim="cards" className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.key} className={`card flex flex-col p-7 sm:p-8 ${p.pick ? "border-ink/60 shadow-float" : ""}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[14px] font-medium text-muted">{p.kicker}</span>
                  {p.pick ? <span className="eyebrow !text-[12px]">Most clients</span> : null}
                </div>
                <h3 className="t-h3 mt-4 !text-[1.5rem]">{p.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-[2.4rem] leading-none tracking-tight">{p.price}</span>
                  <span className="text-[14.5px] text-muted">{p.unit}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                  {p.items.slice(0, 4).map((it) => (
                    <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                      <Check size={17} aria-hidden className="mt-0.5 flex-none text-brand" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href={`/pricing#${p.key === "growth" ? "monthly" : p.key}`} className="btn btn-md btn-secondary mt-8 w-full">
                  {p.key === "audit" ? <FileSearch size={17} aria-hidden /> : p.key === "sprint" ? <Gauge size={17} aria-hidden /> : <TrendingUp size={17} aria-hidden />}
                  See what&rsquo;s included
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15.5px]">
              <span className="font-medium">Building software instead?</span>{" "}
              <span className="text-muted">There&rsquo;s a separate plan for Google and AI search, $1,000 a month.</span>
            </p>
            <TextCta href="/saas-seo" label="SEO + AI search for startups" from="home_startup" />
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reviews exclude={["Daniel Folks"]} />
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl bg-surface lg:mx-0">
            <Image src="/me/michael-edward.webp" alt="Michael Edward" fill sizes="(min-width: 1024px) 460px, 90vw" className="object-cover" />
          </div>
          <Reveal>
            <p className="eyebrow">Who you&rsquo;ll work with</p>
            <h2 className="t-h2 mt-5">Hi, I&rsquo;m Michael. You&rsquo;ll deal with me directly.</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              I&rsquo;ve worked on 30+ sites over two years, much of it for marketing agencies under their brand.
              I work 9 to 5 Eastern and reply the same business day.
            </p>
            <ul className="mt-7 space-y-3 text-[16px]">
              {[
                "No account managers between you and the work",
                "Everything set up in your name, so you keep it all",
                "Plain monthly reports: calls, forms, clicks, next steps",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check size={19} aria-hidden className="mt-0.5 flex-none text-brand" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PageCta href="/about" label="More about me" from="home_about" />
              <TextCta href="/notes/what-is-a-koinophobe" label="Why the name Koinophobe" from="home_about" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Latest notes ────────────────────────────────────────── */}
      {latest.length ? (
        <section className="section section-tint">
          <div className="container-pad">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal className="max-w-3xl">
                <p className="eyebrow">Notes</p>
                <h2 className="t-h2 mt-5">Free advice, from the work I do every day</h2>
              </Reveal>
              <PageCta href="/notes" label="All notes" from="home_notes" size="md" />
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {latest.map((n) => (
                <NoteCard key={n.slug} note={n} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Faq items={HOME_FAQ} title="Questions owners ask first" className="section" />

      <Availability />
      <MobileCta />
    </>
  );
}
