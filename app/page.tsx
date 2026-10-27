import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
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
import { GuaranteeLine } from "@/components/Guarantee";
import { NoteCard } from "@/components/NoteCard";
import { HeroFan, HeroScatter } from "@/components/HeroScatter";
import { CallsArt, FixArt, TownsArt } from "@/components/PillarArt";
import { Compare } from "@/components/Compare";
import { Journey } from "@/components/Journey";
import { AiChat } from "@/components/AiChat";
import { CaseSpark } from "@/components/CaseSpark";
import { aggregate, cases } from "@/lib/gsc";
import { monthly, oneTime } from "@/lib/pricing";
import { publishedNotes } from "@/lib/notes";
import { site } from "@/lib/site";
import { Faq, type FaqItem } from "@/components/Faq";

export const revalidate = 3600;

export const metadata = {
  title: { absolute: "Koinophobe · SEO for home services, measured in calls" },
  description:
    "SEO agency for home service businesses: technical SEO, call tracking and AI search. 30+ sites built and ranked, prices on the site, a free 20-minute call.",
  alternates: { canonical: "/" },
};

const HOME_FAQ: FaqItem[] = [
  {
    q: "What does Koinophobe do?",
    a: "Koinophobe is an SEO agency for home service businesses. We fix what stops a site from ranking, set up tracking so you can see the calls and forms Google sends, and build the town and service pages that bring in local searches.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Mostly home service companies: roofers, pool deck, lawn and hurricane shutter businesses.",
  },
  {
    q: "How much does it cost?",
    a: "Every price is on the pricing page, and your first payment on any plan is covered by a 100% money-back guarantee for 30 days. The Site Audit is $750, the Setup Sprint is a one-time $1,800, and monthly plans start at $600.",
  },
  {
    q: "How long does SEO take to work?",
    a: "Tracking starts counting calls and forms as soon as it's set up. New pages usually take weeks to months to rank, which is why monthly plans have a three-month minimum.",
  },
];

const SECTORS = [
  { title: "Roofing companies", href: "/roofing-seo", img: "/site/home-roofing.webp", alt: "A roofer standing on a roof during a tear-off on a brick house" },
  { title: "Home remodelers", href: "/home-remodeling-seo", img: "/site/home-remodeling.webp", alt: "A remodeling contractor cutting tile with an angle grinder" },
  { title: "Pool and deck", href: "/notes/pool-deck-repair-seo", img: "/site/home-pool.webp", alt: "A backyard pool with a clean deck" },
  { title: "Lawn and landscaping", href: "/notes/lawn-care-seo", img: "/site/home-lawn.webp", alt: "A lawn care worker mowing a lawn" },
  { title: "Plumbing, HVAC and more", href: "/notes/topic/trades", img: "/site/home-plumbing.webp", alt: "A plumber fixing pipes under a sink" },
];

const PILLARS = [
  {
    icon: <Wrench size={20} aria-hidden />,
    art: <FixArt />,
    title: "Fix what's holding the site back",
    body: "Indexing problems, slow pages, broken forms, missing schema, messy redirects. The technical work most agencies skip.",
    points: ["Speed and Core Web Vitals", "Schema for your trade", "Indexing and site structure"],
    link: { href: "/notes/core-web-vitals-contractor-websites", label: "How we approach speed" },
  },
  {
    icon: <MapPin size={20} aria-hidden />,
    art: <TownsArt />,
    title: "Get found in every town you serve",
    body: "A real page for each service and each town you want work in, a Google Business Profile that's set up right, and reviews within the rules.",
    points: ["Service and town pages", "Google Business Profile", "Titles that earn the click"],
    link: { href: "/notes/roofing-service-area-pages", label: "How town pages work" },
  },
  {
    icon: <PhoneCall size={20} aria-hidden />,
    art: <CallsArt />,
    title: "Count every call and form",
    body: "Calls, forms and bookings tracked in GA4 and Tag Manager, form delivery tested every month, and one plain report you can read in five minutes.",
    points: ["Call and form tracking", "Monthly form checks", "A one-page monthly report"],
    link: { href: "/notes/call-tracking-for-contractors", label: "How call tracking works" },
  },
];

const STEPS = [
  { n: "01", title: "Free 20-minute call", body: "We look at your site and Business Profile first, then tell you the two or three things we'd fix." },
  { n: "02", title: "A fixed price", body: "Straight from the pricing page. Three-month minimum on monthly plans, then month to month." },
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

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-bg relative -mt-[var(--hx-h)] overflow-hidden pt-[var(--hx-h)]">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <HeroScatter />
        <div className="container-pad relative pb-16 pt-12 text-center sm:pb-20 sm:pt-16 xl:flex xl:min-h-[calc(100svh-var(--hx-h))] xl:flex-col xl:justify-center xl:pb-36 xl:pt-6">
          <div className="hero-in mx-auto max-w-[780px] xl:max-w-[760px]">
            <p className="eyebrow">SEO agency for home service businesses</p>
            <h1 className="t-hero mx-auto mt-6 max-w-[19ch]">
              SEO that gets home service businesses <span className="hero-mark">more calls</span> from Google.
            </h1>
            <p className="t-lead mx-auto mt-6 max-w-[58ch]">
              Koinophobe is an SEO agency for roofers, pool, lawn and other home service companies. We fix what&rsquo;s holding your site back, build the pages that rank in
              the towns you serve, and track every call so you can see exactly what Google sends you.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <BookCta from="hero" label="Book a free 20-minute call" />
              <PageCta href="/pricing" label="See pricing" from="hero" />
            </div>
            <BookNote className="mt-4" />
            <ul className="mt-8 flex flex-wrap justify-center gap-2 text-[14px]">
              {["Prices on the site, from $600 a month", "100% money-back guarantee", "30+ sites built and ranked"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 font-medium shadow-[var(--shadow-sm)]">
                  <Check size={15} aria-hidden className="flex-none text-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <HeroFan />
        </div>
      </section>

      {/* ── Proof numbers ───────────────────────────────────────── */}
      <section className="container-pad">
        <div data-anim="rise" className="card-dark px-6 py-10 sm:px-10 sm:py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
            {[
              { v: aggregate.clicks, l: "clicks from Google", n: "spam traffic stripped out" },
              { v: aggregate.pageOne, l: "keywords on page one", n: "position 10 or better" },
              { v: aggregate.topThree, l: "keywords in the top 3", n: "across five sites" },
              { v: aggregate.impressions, l: "search impressions", n: aggregate.window },
            ].map((s, i) => (
              <div key={s.l} className={i > 0 ? "md:border-l md:border-white/10 md:pl-6" : ""}>
                <p className="font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-extrabold leading-none tracking-tight text-mint">
                  <CountUp value={s.v} display={s.v.toLocaleString("en-US")} />
                </p>
                <p className="mt-3 text-[15px] font-medium">{s.l}</p>
                <p className="muted text-[13.5px]">{s.n}</p>
              </div>
            ))}
          </div>
          <p className="muted mt-10 border-t border-white/10 pt-6 text-[13.5px]">
            Five client sites with their Search Console data open, {aggregate.window}. Every number is on the{" "}
            <Link href="/work" className="text-white underline underline-offset-4 dark:text-ink">work page</Link>.
          </p>
        </div>
      </section>

      {/* ── Who it is for ───────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">Who it&rsquo;s for</p>
            <h2 className="t-h2 mt-5">Local SEO for roofers, remodelers and other trades</h2>
            <p className="t-lead mt-5 max-w-[60ch]">
              If your customers search &ldquo;near me&rdquo;, look at the map and call the first company that
              looks right, your website and Business Profile are doing the selling. We make sure they do it well.
            </p>
          </Reveal>
          {/* Phones swipe through the trades; wider screens see all five at once. */}
          <div
            data-anim="cards"
            className="-mx-5 mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {SECTORS.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="press group relative block aspect-[4/5] w-[68vw] max-w-[300px] flex-none snap-center overflow-hidden rounded-3xl bg-surface photo-shade lg:w-auto lg:max-w-none"
              >
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 240px, 68vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transform-none"
                />
                <span className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3 text-white sm:inset-x-5 sm:bottom-5">
                  <span className="font-display text-[1.25rem] font-extrabold leading-tight tracking-tight sm:text-[1.35rem]">{s.title}</span>
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-pop group-hover:text-on-pop">
                    <ArrowRight size={17} aria-hidden />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do ───────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">What we do</p>
            <h2 className="t-h2 mt-5">Three SEO services, done properly, in your accounts</h2>
            <p className="t-lead mt-5 max-w-[60ch]">
              Most SEO is hard to see. Ours shows up as pages you can open, rankings you can check and calls
              you can count.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p.title} className={`card flex flex-col p-3 ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                {p.art}
                <div className="flex flex-1 flex-col px-4 pb-5 pt-6 sm:px-5">
                  <span className="icon-tile">{p.icon}</span>
                  <h3 className="t-h3 mt-5">{p.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-[15px]">
                        <Check size={17} aria-hidden className="flex-none text-brand" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <TextCta href={p.link.href} label={p.link.label} from="home_pillar" className="mt-auto pt-7" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">Results</p>
            <h2 className="t-h2 mt-5">SEO results from real Search Console accounts</h2>
            <p className="t-lead mt-5 max-w-[58ch]">
              Thirty-plus sites over two years. These are the ones whose data we can show you, with what&rsquo;s
              still left to win.
            </p>
            <div className="mt-8 flex justify-center">
              <PageCta href="/work" label="All case studies" from="home_results" size="md" />
            </div>
          </Reveal>
          <div data-anim="cards" className="mt-14 grid gap-5 md:grid-cols-2">
            {cases
              .filter((c) => CASE_IMG[c.slug])
              .map((c) => (
                <Link key={c.slug} href={`/work#${c.slug}`} className="card card-hover press group flex flex-col overflow-hidden p-2.5 sm:flex-row">
                  <div className="relative aspect-[16/9] flex-none overflow-hidden rounded-2xl bg-surface sm:aspect-auto sm:w-[190px]">
                    <Image src={CASE_IMG[c.slug]} alt="" fill sizes="(min-width: 640px) 190px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transform-none" />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[13.5px] text-muted">
                      {c.client} &middot; {c.place}
                    </p>
                    <p className="mt-2 font-display text-[1.2rem] leading-snug tracking-tight">{c.title}</p>
                    <p className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-5">
                      <span className="font-display text-[2rem] font-extrabold leading-none tracking-tight text-brand">{c.headline.value}</span>
                      <span className="text-[13.5px] text-muted">{c.headline.label}</span>
                    </p>
                    <CaseSpark c={c} className="mt-3" />
                  </div>
                </Link>
              ))}
          </div>
          <figure data-anim="rise" className="card-dark relative mt-8 overflow-hidden p-8 sm:p-12">
            <blockquote className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-[1.25] tracking-tight sm:max-w-[30ch]">
              &ldquo;He&rsquo;s been on top of things, not only what I asked, but also outside the scope.&rdquo;
            </blockquote>
            <figcaption className="muted mt-6 text-[14.5px]">
              <span className="font-medium text-white dark:text-ink">Daniel Folks</span>, owner, Over The Table Top &middot; Charles County, MD
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── How it works: one step per screen, stacking as you scroll ── */}
      <section className="journey-scope section section-tint">
        <div className="container-pad grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <Reveal className="text-center lg:text-left">
              <p className="eyebrow">How it works</p>
              <h2 className="t-h2 mt-5">How it works, from a free SEO call to a monthly report</h2>
              <div className="mt-9 hidden flex-wrap items-center gap-3 lg:flex">
                <BookCta from="home_steps" />
                <PageCta href="/about" label="How we work" from="home_steps" />
              </div>
            </Reveal>
            <Journey className="mx-auto mt-10 lg:mx-0 lg:mt-12" />
          </div>
          <ol className="stack">
            {STEPS.map((s, i) => (
              <li key={s.n} className="stack-card" style={{ ["--i" as string]: i }}>
                <div className={`stack-face ${i % 2 ? "card" : "card-dark"} p-7 sm:p-10`}>
                  <span className={`font-display text-[clamp(3.5rem,9vw,5.5rem)] font-extrabold leading-none tracking-tight ${i % 2 ? "text-brand" : "text-mint"}`}>
                    {s.n}
                  </span>
                  <h3 className="t-h3 mt-6 !text-[clamp(1.4rem,2.6vw,1.9rem)]">{s.title}</h3>
                  <p className={`mt-3 max-w-[40ch] text-[16px] leading-relaxed ${i % 2 ? "text-muted" : "muted"}`}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:hidden">
            <BookCta from="home_steps" />
            <PageCta href="/about" label="How we work" from="home_steps" />
          </div>
        </div>
      </section>

      {/* ── Pricing preview ─────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">Pricing</p>
            <h2 className="t-h2 mt-5">SEO pricing: every price is on the site</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              No long contracts, and you own everything we build. Start with an audit, fix it
              once, or hand it over every month.
            </p>
            <div className="mt-8 flex justify-center">
              <PageCta href="/pricing" label="Compare all plans" from="home_pricing" size="md" />
            </div>
          </Reveal>
          <div data-anim="cards" className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.key} className={`relative flex flex-col p-7 sm:p-8 ${p.pick ? "card-dark shadow-float lg:-my-4 lg:py-12" : "card"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[14px] font-medium ${p.pick ? "muted" : "text-muted"}`}>{p.kicker}</span>
                  {p.pick ? <span className="sticker rotate-[4deg]">Most clients</span> : null}
                </div>
                <h3 className="t-h3 mt-4 !text-[1.5rem]">{p.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-[2.8rem] font-extrabold leading-none tracking-tight">{p.price}</span>
                  <span className={`text-[14.5px] ${p.pick ? "muted" : "text-muted"}`}>{p.unit}</span>
                </p>
                <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-6 ${p.pick ? "border-white/10" : "border-line"}`}>
                  {p.items.slice(0, 4).map((it) => (
                    <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                      <Check size={17} aria-hidden className={`mt-0.5 flex-none ${p.pick ? "text-mint" : "text-brand"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href={`/pricing#${p.key === "growth" ? "monthly" : p.key}`} className={`btn btn-md mt-8 w-full ${p.pick ? "btn-light" : "btn-secondary"}`}>
                  {p.key === "audit" ? <FileSearch size={17} aria-hidden /> : p.key === "sprint" ? <Gauge size={17} aria-hidden /> : <TrendingUp size={17} aria-hidden />}
                  See what&rsquo;s included
                </Link>
              </div>
            ))}
          </div>
          <div className="card mt-8 grid items-center gap-7 p-6 sm:p-8 md:grid-cols-[1fr_1.15fr] md:gap-10">
            <div>
              <p className="text-[17px] leading-relaxed">
                <span className="font-display text-[1.25rem] font-extrabold tracking-tight">Want to show up when customers ask ChatGPT?</span>{" "}
                <span className="text-muted">There&rsquo;s a plan for Google and AI search, $1,000 a month.</span>
              </p>
              <TextCta href="/ai-search-optimization" label="AI search optimization" from="home_ai" className="mt-5" />
            </div>
            <AiChat />
          </div>
          <GuaranteeLine className="mt-6" />
        </div>
      </section>

      {/* ── Compare ─────────────────────────────────────────────── */}
      <div className="section-tint">
        <Compare />
      </div>

      {/* ── Reviews ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reviews exclude={["Daniel Folks"]} />
        </div>
      </section>

      {/* ── Latest notes ────────────────────────────────────────── */}
      {latest.length ? (
        <section className="section section-tint">
          <div className="container-pad">
            <Reveal className="stage-head">
              <p className="eyebrow">Notes</p>
              <h2 className="t-h2 mt-5">Free SEO guides, from the work we do every day</h2>
              <div className="mt-8 flex justify-center">
                <PageCta href="/notes" label="All notes" from="home_notes" size="md" />
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {latest.map((n) => (
                <NoteCard key={n.slug} note={n} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Faq items={HOME_FAQ} title="SEO questions owners ask first" className="section" />

      <Availability />
      <MobileCta />
    </>
  );
}
