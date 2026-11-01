import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileSearch,
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
import { free, plan, startup } from "@/lib/pricing";
import { publishedNotes } from "@/lib/notes";
import { site } from "@/lib/site";
import { Faq, type FaqItem } from "@/components/Faq";

export const revalidate = 3600;

export const metadata = {
  title: { absolute: "Koinophobe · SEO for service businesses, measured in calls" },
  description:
    "SEO for roofers, remodelers and other service businesses: more calls from Google, and every call counted. $500 a month, free audit.",
  alternates: { canonical: "/" },
};

/*
 * Copy on this page is written for a busy owner, not another marketer: short
 * sentences, everyday words, and an outcome in place of every SEO term
 * (no "schema", "indexing", "GA4" or "impressions" above the fold). First
 * person throughout: one person does the work, so the page says "I".
 */

const HOME_FAQ: FaqItem[] = [
  {
    q: "What does Koinophobe do?",
    a: "I help service businesses get more calls from Google. I fix what keeps your site from showing up. I build a page for each service and each town you work in. And I count every call and form, so you can see what's working.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Local service businesses people find on Google: roofers, remodelers, pool and lawn care, plumbing and HVAC, auto detailing and window tint, clinics and more.",
  },
  {
    q: "How much does it cost?",
    a: `One plan, ${plan.price} a month. The audit is free. Not happy within 30 days of your first payment? You get all of it back. Want to show up in ChatGPT too? That's $${startup.amount} more a month.`,
  },
  {
    q: "How long does SEO take to work?",
    a: "Call tracking works the day I set it up. New pages take a few weeks to a few months to climb on Google. SEO is a slog, not a quick fix. That's why the plan starts with three months.",
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
    title: "Fix what's holding your site back",
    body: "Some sites are slow. Some have pages Google can't find. Some have a contact form that quietly stopped working. I find these problems and fix them. Most agencies skip this part; I don't.",
    points: ["Pages that load fast on a phone", "Every page Google can find", "Contact forms that work"],
    link: { href: "/notes/core-web-vitals-contractor-websites", label: "How I speed up sites" },
  },
  {
    icon: <MapPin size={20} aria-hidden />,
    art: <TownsArt />,
    title: "Get found in every town you serve",
    body: "You get a real page for each service and each town you want work in. I set up your Google Business Profile, the listing people see on the map. And I help you get more reviews, the way Google allows.",
    points: ["A page for each service and town", "Your listing on Google Maps", "Search results people click"],
    link: { href: "/notes/roofing-service-area-pages", label: "How town pages work" },
  },
  {
    icon: <PhoneCall size={20} aria-hidden />,
    art: <CallsArt />,
    title: "Count every call and form",
    body: "I count every call, form and booking your site brings in. I test your forms every month, because finding a broken form three months late is a tad expensive. You get one short report you can read in five minutes.",
    points: ["Every call and form counted", "Forms tested every month", "A one-page monthly report"],
    link: { href: "/notes/call-tracking-for-contractors", label: "How call tracking works" },
  },
];

const STEPS = [
  { n: "01", title: "A free call and audit", body: "I look at your website and Google listing before we talk. Then I tell you the two or three things I'd fix first." },
  { n: "02", title: "One fixed price", body: `${plan.price} a month. The first three months are the minimum. After that, it's month to month.` },
  { n: "03", title: "The work, in your accounts", body: "I fix the site, build pages, update your listing and set up call tracking. You own every account. If you leave, you keep it all." },
  { n: "04", title: "A report you can read", body: "Once a month: your calls, forms and visits, and what I'll do next. All on one page." },
];

/* Service businesses first; the game shop, a retailer, goes last. */
const CASE_IMG: Record<string, string> = {
  "roofing-contractor": "/notes/photos/roofing-keywords-cover-sm.webp",
  "myofascial-clinic": "/notes/photos/clinic-158-to-501-cover-sm.webp",
  "tint-lordz": "/notes/photos/lawrence-ma-window-tint-seo-cover-sm.webp",
  "over-the-table-top": "/notes/photos/charles-county-md-game-shop-seo-cover-sm.webp",
};
const CASE_ORDER = Object.keys(CASE_IMG);

/* Notes that aren't about a service business (a retail shop, the name of the agency). */
const OFF_TOPIC = new Set([
  "charles-county-md-game-shop-seo",
  "charles-county-md-small-business-seo",
  "what-is-a-koinophobe",
]);

export default function HomePage() {
  const latest = publishedNotes()
    .filter((n) => !OFF_TOPIC.has(n.slug))
    .slice(0, 3);
  const plans = [free.find((p) => p.key === "audit")!, plan];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-bg relative -mt-[var(--hx-h)] overflow-hidden pt-[var(--hx-h)]">
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <HeroScatter />
        <div className="container-pad relative pb-16 pt-12 text-center sm:pb-20 sm:pt-16 xl:flex xl:min-h-[calc(100svh-var(--hx-h))] xl:flex-col xl:justify-center xl:pb-36 xl:pt-6">
          <div className="hero-in mx-auto max-w-[780px] xl:max-w-[760px]">
            <p className="eyebrow">SEO agency for service businesses</p>
            <h1 className="t-hero mx-auto mt-6 max-w-[19ch]">
              SEO that gets service businesses <span className="hero-mark">more calls</span> from Google.
            </h1>
            <p className="t-lead mx-auto mt-6 max-w-[58ch]">
              I help local service businesses, from roofers to clinics to auto shops, show up on Google in
              the towns they serve. Then I count every call, so you can see what Google sends you.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <BookCta from="hero" label="Book a free 20-minute call" />
              <PageCta href="/pricing" label="See pricing" from="hero" />
            </div>
            <BookNote className="mt-4" />
            <ul className="mt-8 flex flex-wrap justify-center gap-2 text-[14px]">
              {[`${plan.price} a month, audit free`, "100% money-back guarantee", "30+ websites built and ranked"].map((t) => (
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
              { v: aggregate.clicks, l: "visits from Google", n: "fake traffic taken out" },
              { v: aggregate.pageOne, l: "searches on page one", n: "in the top 10 results" },
              { v: aggregate.topThree, l: "searches in the top 3", n: "across five sites" },
              { v: aggregate.impressions, l: "times shown on Google", n: aggregate.window },
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
            From five client sites that let me share their Google numbers, {aggregate.window}. Every number is on the{" "}
            <Link href="/work" className="text-white underline underline-offset-4 dark:text-ink">work page</Link>.
          </p>
        </div>
      </section>

      {/* ── Who it is for ───────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">Who it&rsquo;s for</p>
            <h2 className="t-h2 mt-5">Local SEO for roofers, remodelers and other service businesses</h2>
            <p className="t-lead mt-5 max-w-[60ch]">
              Most customers search &ldquo;near me,&rdquo; look at the map, and call the first company that looks
              right. Your website and Google listing do the selling before you ever pick up the phone. I make sure
              they do it well.
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
            <p className="eyebrow">What I do</p>
            <h2 className="t-h2 mt-5">Three SEO services, done properly, in your accounts</h2>
            <p className="t-lead mt-5 max-w-[60ch]">
              Most SEO is hard to see. Mine isn&rsquo;t: pages you can open, rankings you can check, and calls you
              can count.
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
            <h2 className="t-h2 mt-5">SEO results, straight from my clients&rsquo; Google data</h2>
            <p className="t-lead mt-5 max-w-[58ch]">
              I&rsquo;ve worked on over 30 websites in two years. These are the ones whose numbers I&rsquo;m
              allowed to show you, plus what&rsquo;s still left to win.
            </p>
            <div className="mt-8 flex justify-center">
              <PageCta href="/work" label="All case studies" from="home_results" size="md" />
            </div>
          </Reveal>
          <div data-anim="cards" className="mt-14 grid gap-5 md:grid-cols-2">
            {cases
              .filter((c) => CASE_IMG[c.slug])
              .sort((a, b) => CASE_ORDER.indexOf(a.slug) - CASE_ORDER.indexOf(b.slug))
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
                <PageCta href="/about" label="How I work" from="home_steps" />
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
            <PageCta href="/about" label="How I work" from="home_steps" />
          </div>
        </div>
      </section>

      {/* ── Pricing preview ─────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="stage-head">
            <p className="eyebrow">Pricing</p>
            <h2 className="t-h2 mt-5">SEO pricing: one plan, {plan.price} a month</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              The audit is free, so you see what&rsquo;s wrong before you pay anything. After that, one plan covers
              all of it. No long contracts, and you own everything I build.
            </p>
            <div className="mt-8 flex justify-center">
              <PageCta href="/pricing" label="See full pricing" from="home_pricing" size="md" />
            </div>
          </Reveal>
          <div data-anim="cards" className="mx-auto mt-14 grid max-w-[880px] items-stretch gap-5 md:grid-cols-2">
            {plans.map((p) => (
              <div key={p.key} className={`relative flex flex-col p-7 sm:p-8 ${p.pick ? "card-dark shadow-float lg:-my-4 lg:py-12" : "card"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[14px] font-medium ${p.pick ? "muted" : "text-muted"}`}>{p.kicker}</span>
                </div>
                <h3 className="t-h3 mt-4 !text-[1.5rem]">{p.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-[2.8rem] font-extrabold leading-none tracking-tight">{p.price}</span>
                  <span className={`text-[14.5px] ${p.pick ? "muted" : "text-muted"}`}>{p.unit}</span>
                </p>
                <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-6 ${p.pick ? "border-white/10" : "border-line"}`}>
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                      <Check size={17} aria-hidden className={`mt-0.5 flex-none ${p.pick ? "text-mint" : "text-brand"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href={`/pricing#${p.monthly ? "monthly" : p.key}`} className={`btn btn-md mt-8 w-full ${p.pick ? "btn-light" : "btn-secondary"}`}>
                  {p.monthly ? <TrendingUp size={17} aria-hidden /> : <FileSearch size={17} aria-hidden />}
                  See what&rsquo;s included
                </Link>
              </div>
            ))}
          </div>
          <div className="card mt-8 grid items-center gap-7 p-6 sm:p-8 md:grid-cols-[1fr_1.15fr] md:gap-10">
            <div>
              <p className="text-[17px] leading-relaxed">
                <span className="font-display text-[1.25rem] font-extrabold tracking-tight">Want ChatGPT to recommend you too?</span>{" "}
                <span className="text-muted">Add AI search to your plan for ${startup.amount} more a month.</span>
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
              <h2 className="t-h2 mt-5">Free SEO guides, from the work I do every day</h2>
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
