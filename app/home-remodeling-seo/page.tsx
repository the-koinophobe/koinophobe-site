import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Camera,
  Check,
  ChevronRight,
  ClipboardList,
  LayoutGrid,
  MapPin,
  MessageSquareQuote,
  PhoneCall,
} from "lucide-react";
import { Availability } from "@/components/Availability";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { BookCta, BookNote, PageCta, TextCta } from "@/components/Cta";
import { Faq, type FaqItem } from "@/components/Faq";
import { MobileCta } from "@/components/MobileCta";
import { MoreServices } from "@/components/MoreServices";
import { Reveal } from "@/components/Reveal";
import { cases } from "@/lib/gsc";
import { getNote } from "@/lib/notes";
import { monthly, oneTime, startup } from "@/lib/pricing";
import { site } from "@/lib/site";

// Guides appear on their publish date without a deploy.
export const revalidate = 3600;

const PAGE_URL = "https://koinophobe.com/home-remodeling-seo";
const TITLE = "Home remodeling SEO for Google and ChatGPT";
const DESCRIPTION =
  "SEO for kitchen, bath and whole-home remodelers: project pages, cost pages, Google Business Profile, consult tracking, and getting named by ChatGPT.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/home-remodeling-seo" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/site/remodeling-hero.webp", width: 1280, height: 960, alt: "Two contractors cutting trim with a miter saw in a room being remodeled" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/site/remodeling-hero.webp"] },
};

const roofing = cases.find((c) => c.slug === "roofing-contractor")!;
const growth = monthly.find((p) => p.key === "growth")!;
const sprint = oneTime.find((p) => p.key === "sprint")!;
const tracking = oneTime.find((p) => p.key === "tracking")!;

const WHO = [
  "Kitchen and bath remodelers",
  "Design-build firms",
  "Basement finishing",
  "Home additions",
  "Whole-home renovation",
  "General contractors who remodel",
];

const WORK = [
  {
    icon: <LayoutGrid size={20} aria-hidden />,
    t: "A page for each kind of remodel",
    b: "Kitchens, bathrooms, basements, additions and whole-home work are different searches by different homeowners. One \"Services\" page can't rank for all of them.",
  },
  {
    icon: <Camera size={20} aria-hidden />,
    t: "Project pages, not a gallery",
    b: "One page per finished job: the town, the scope, how long it took, a budget range, and before and after photos with captions. That's what ranks and what gets forwarded to a spouse.",
  },
  {
    icon: <ClipboardList size={20} aria-hidden />,
    t: "Cost, timeline and permit pages",
    b: "The questions homeowners ask for weeks before they call. Answer them with your own numbers and you're the remodeler they've already read.",
  },
  {
    icon: <MapPin size={20} aria-hidden />,
    t: "Business Profile and reviews",
    b: "The right primary category, service areas, project photos, and review replies. For \"bathroom remodeler near me\", the map is most of the page.",
  },
  {
    icon: <Bot size={20} aria-hidden />,
    t: "Named by ChatGPT and AI Overviews",
    b: "AI crawlers let in, schema that says what you do and where, and mentions on the sites assistants read before they recommend anyone.",
  },
  {
    icon: <PhoneCall size={20} aria-hidden />,
    t: "Consults counted, not guessed",
    b: "Calls, consult requests and design appointments tracked in GA4, including visits from ChatGPT and Perplexity, so you see which ones came from search.",
  },
];

/** What homeowners type into an assistant, and the page that earns the mention. */
const PROMPTS: [string, string][] = [
  ["How much does a kitchen remodel cost in [your town]?", "A cost page with ranges from your own finished jobs and what moves the price up or down."],
  ["Who are the best bathroom remodelers near me?", "Recent reviews, a complete Business Profile, and mentions on sites the assistant trusts."],
  ["Do I need a permit to finish my basement in [your county]?", "A plain answer for your county, linked from the basement page."],
  ["Design-build or general contractor for a whole-home remodel?", "A comparison page that says who each one suits, including when it isn't you."],
  ["How long does a bathroom remodel take?", "A timeline by phase, from demo to the final walkthrough."],
  ["Can we live in the house during a kitchen remodel?", "A what-to-expect page: the temporary kitchen, dust, noise and inspections."],
];

const DIFFERENT = [
  {
    t: "Bought slowly",
    b: "A remodel gets researched for weeks before the first call. The pages a homeowner reads early decide who gets the consult.",
  },
  {
    t: "Sold with photos",
    b: "Photos close the job, and full-size photos slow the site on a phone. Every image gets resized, compressed to WebP and captioned with the job and the town.",
    link: { href: "/notes/image-optimization-contractor-websites", label: "How we optimize images" },
  },
  {
    t: "Won at the consult",
    b: "The number that matters is booked consults, not traffic. Tracking counts the consult form and the calls, and shows which came from Google or an AI assistant.",
    link: { href: "/notes/track-chatgpt-traffic-ga4", label: "ChatGPT traffic in GA4" },
  },
  {
    t: "Decided by two people",
    b: "Links get forwarded. A project page has to make sense to someone who never saw your ad, on a phone, in the evening.",
  },
];

const GUIDES: { title: string; slugs: string[] }[] = [
  {
    title: "Pages that win the consult",
    slugs: ["before-after-gallery-seo", "lawrence-ma-free-estimate-page", "contractor-homepage-that-converts", "roof-replacement-service-page", "image-optimization-contractor-websites", "core-web-vitals-contractor-websites"],
  },
  {
    title: "Google Maps and reviews",
    slugs: ["service-area-business-google-business-profile", "google-business-profile-categories", "google-map-pack-ranking", "nap-citations-contractors", "near-me-searches-local-seo-data", "local-seo-checklist-home-services"],
  },
  {
    title: "ChatGPT and AI answers",
    slugs: ["get-business-recommended-by-chatgpt", "ai-search-local-business", "how-to-rank-in-chatgpt", "brand-mentions-ai-search", "content-ai-cites", "how-to-appear-in-google-ai-overviews"],
  },
  {
    title: "Tracking and hiring",
    slugs: ["call-tracking-for-contractors", "track-chatgpt-traffic-ga4", "ga4-reports-for-contractors", "shared-leads-vs-your-own-website", "seo-vs-google-ads-contractors", "hiring-an-seo-questions-to-ask"],
  },
];

const FAQ: FaqItem[] = [
  {
    q: "What is home remodeling SEO?",
    a: "It's the work of getting a remodeling company found when homeowners search for a kitchen, bathroom, basement or whole-home remodel in the towns it serves, and named when they ask AI assistants like ChatGPT who to hire. In practice that means a page for each remodel type and town, project pages built from real jobs, a well-run Google Business Profile, and tracking that ties booked consults back to search.",
  },
  {
    q: "How do I get ChatGPT to recommend my remodeling company?",
    a: "Make sure AI crawlers can read your site, rank on Google for the same questions, publish pages that answer cost, timeline and permit questions with your own numbers, and get mentioned on the sites assistants read, such as Google reviews, Houzz, the BBB and local news. In our 96-run citation study, a third to half of the companies AI assistants named also ranked in Google's top ten. Nobody can guarantee a recommendation, so we measure the answers every month with repeated runs.",
  },
  {
    q: "Should a remodeler put prices on the website?",
    a: "Ranges, yes. Homeowners and AI assistants both look for a cost answer, and a page that gives ranges from your own finished jobs, with what moves the number, gets read and quoted. It doesn't have to be a quote.",
  },
  {
    q: "Does a remodeling company need separate kitchen and bathroom pages?",
    a: "Yes. They're different searches with different budgets and different questions. Build one page per remodel type, then town pages where you want work, each with real projects from that town. Near-copies with only the town name swapped can be treated as doorway pages by Google.",
  },
  {
    q: "Which Google Business Profile category should a remodeler use?",
    a: "Pick the most specific category that matches most of your revenue as the primary, such as Kitchen remodeler, Bathroom remodeler or Remodeler, and add the others you genuinely do as additional categories. The primary category carries the most weight for the map pack.",
  },
  {
    q: "How long does SEO take for a remodeling company?",
    a: "Tracking counts calls and consult requests as soon as it's set up. New service and project pages usually take weeks to months to rank. Remodeling also has a long sales cycle, so judge it over a few months, on consults booked rather than traffic.",
  },
  {
    q: "Is SEO better than buying leads from Angi or HomeAdvisor?",
    a: "They do different jobs. Lead sites can fill the calendar quickly, but a shared lead is often sent to several contractors. Your own pages bring homeowners who already picked you, and they keep working when you stop paying. If you run both, track each so you can compare cost per signed job.",
  },
  {
    q: "How much does SEO cost for a remodeler?",
    a: `The Growth plan is ${growth.price} a month and covers two new service, town or project pages a month plus Business Profile work. If the site needs fixing first, the Setup Sprint is a one-time ${sprint.price}. If you only need calls and consult forms counted, the Tracking Fix is ${tracking.price}, paid after you see it working.`,
  },
];

const CALL = [
  "We look at your site, your Business Profile and what ChatGPT says about remodelers in your area before we talk.",
  "You get the first few pages we'd build, in order.",
  "If it isn't a fit, we'll tell you that on the call.",
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Home remodeling SEO",
  alternateName: ["SEO for remodelers", "Remodeling contractor SEO", "Kitchen and bath remodeler SEO", "AI search for remodeling companies"],
  serviceType: "Search engine optimization for home remodeling companies",
  description: DESCRIPTION,
  url: PAGE_URL,
  image: "https://koinophobe.com/site/remodeling-hero.webp",
  provider: { "@id": "https://koinophobe.com/#organization" },
  areaServed: site.areaServed,
  audience: { "@type": "BusinessAudience", audienceType: "Home remodeling contractors, design-build firms, kitchen and bath remodelers" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home remodeling SEO plans",
    itemListElement: [tracking, sprint, growth].map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.items.join(". "),
      price: p.amount,
      priceCurrency: "USD",
      url: `https://koinophobe.com/pricing#${p.key === "growth" ? "monthly" : p.key}`,
      seller: { "@id": "https://koinophobe.com/#organization" },
      ...(p.monthly
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.amount,
              priceCurrency: "USD",
              unitCode: "MON",
            },
          }
        : {}),
    })),
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "en-US",
  isPartOf: { "@id": "https://koinophobe.com/#website" },
  about: { "@id": `${PAGE_URL}#service` },
  primaryImageOfPage: { "@type": "ImageObject", url: "https://koinophobe.com/site/remodeling-hero.webp", width: 1280, height: 960 },
  publisher: { "@id": "https://koinophobe.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://koinophobe.com" },
      { "@type": "ListItem", position: 2, name: "Home remodeling SEO", item: PAGE_URL },
    ],
  },
};

export default function RemodelingPage() {
  const groups = GUIDES.map((g) => ({
    title: g.title,
    notes: g.slugs.map((s) => getNote(s)).filter(Boolean) as NonNullable<ReturnType<typeof getNote>>[],
  })).filter((g) => g.notes.length);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-bg">
        <div className="container-pad grid grid-cols-[minmax(0,1fr)] items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-[14px] text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} aria-hidden />
              <span aria-current="page">Home remodeling SEO</span>
            </nav>
            <p className="eyebrow">SEO and AI search for home remodelers</p>
            <h1 className="t-h1 mt-5 max-w-[18ch]">Home remodeling SEO, for Google and for ChatGPT</h1>
            <p className="t-lead mt-6 max-w-[58ch]">
              A kitchen or bathroom remodel gets researched for weeks before anyone calls. Homeowners search costs,
              look at photos, read reviews, and more of them now ask ChatGPT who to hire. We build the pages they find
              along the way, run your Business Profile, and count the consults so you can see which came from search.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCta from="remodel_hero" />
              <PageCta href="/pricing" label="See pricing" from="remodel_hero" />
            </div>
            <BookNote className="mt-4" />
          </Reveal>
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="hero-photo aspect-[4/3]">
              <Image
                src="/site/remodeling-hero.webp"
                alt="Two contractors cutting trim with a miter saw in a room being remodeled"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="float-card float-in bottom-[-6%] left-0 w-[250px] p-4 sm:left-[-8%]" style={{ animationDelay: "0.4s" }}>
              <p className="font-mono text-[12px] text-muted">Companies AI names that rank on Google</p>
              <p className="mt-2 font-display text-[1.65rem] leading-none tracking-tight">34% to 54%</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-muted">From our 96-run citation study</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── In short ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">In short</p>
            <h2 className="t-h2 mt-5 max-w-[18ch]">What home remodeling SEO is</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17.5px] leading-relaxed">
              Home remodeling SEO gets a remodeling company found when homeowners search for a kitchen, bathroom,
              basement or whole-home remodel in the towns it serves, and named when they ask an AI assistant who to
              hire. It comes down to four things: a page for each kind of remodel and each town you want work in,
              project pages built from real jobs, a Google Business Profile that&rsquo;s set up right, and tracking
              that ties booked consults back to the search that started them.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Who it's for">
              {WHO.map((w) => (
                <li key={w} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[14px]">
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── What we do ───────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What we do for remodelers</p>
            <h2 className="t-h2 mt-5">Six things every remodeling site needs</h2>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((w) => (
              <div key={w.t} className="card p-7">
                <span className="icon-tile">{w.icon}</span>
                <h3 className="t-h3 mt-5">{w.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pages ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">The pages</p>
            <h2 className="t-h2 mt-5 max-w-[20ch]">One page per remodel, per town, per finished job</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              Most remodeling sites have a homepage, a services page and a gallery. Homeowners search for something
              more specific than that, and so do the assistants answering them.
            </p>
            <ul className="mt-8 border-t border-line">
              {[
                ["Service pages", "Kitchen, bathroom, basement, addition and whole-home, each with its own projects, process and questions."],
                ["Town pages", "For the towns you want work in, with jobs you've done there. Not the same page with the name swapped."],
                ["Project pages", "Scope, town, timeline, budget range and captioned before and after photos for each finished job."],
                ["Cost and timeline pages", "Ranges from your own work, and what a homeowner should expect week by week."],
                ["A consult page", "What happens after someone fills in the form, who calls, and when."],
              ].map(([t, b]) => (
                <li key={t} className="grid grid-cols-[18px_1fr] gap-3 border-b border-line py-4">
                  <Check size={16} aria-hidden className="mt-1 text-brand" />
                  <p className="text-[15.5px] leading-relaxed">
                    <span className="font-medium">{t}.</span> <span className="text-muted">{b}</span>
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            <figure className="col-span-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src="/site/remodeling-kitchen.webp"
                  alt="A remodeled kitchen with white shaker cabinets, a dark island with bar stools and stainless steel appliances"
                  fill
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-muted">A kitchen page sells on photos like this, with the town, scope and timeline written beside them.</figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src="/site/remodeling-bathroom.webp"
                  alt="A remodeled bathroom with a glass walk-in shower, wood-look floor and a long vanity"
                  fill
                  sizes="(min-width: 1024px) 270px, 45vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-muted">Bathroom remodel, finished.</figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src="/site/remodeling-in-progress.webp"
                  alt="A kitchen mid-renovation with new white cabinets wrapped in plastic and paper"
                  fill
                  sizes="(min-width: 1024px) 270px, 45vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-muted">Mid-job photos belong on the project page too.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── AI prompts ──────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">
              <MessageSquareQuote size={15} aria-hidden /> Showing up in ChatGPT
            </p>
            <h2 className="t-h2 mt-5">What homeowners ask AI before they hire a remodeler</h2>
            <p className="t-lead mt-4 max-w-[62ch]">
              ChatGPT, Claude, Perplexity and Google&rsquo;s AI Overviews answer these from pages they can read and
              businesses other sites mention. Each question below needs a page on your site that answers it plainly.
            </p>
          </Reveal>
          <div className="card mt-10 overflow-hidden">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Homeowner questions asked to AI assistants, and the page that answers each one</caption>
              <thead className="hidden bg-cream text-[13.5px] text-muted md:table-header-group">
                <tr>
                  <th scope="col" className="px-6 py-3.5 font-medium">The homeowner asks</th>
                  <th scope="col" className="px-6 py-3.5 font-medium">The page that gets you named</th>
                </tr>
              </thead>
              <tbody>
                {PROMPTS.map(([q, a]) => (
                  <tr key={q} className="grid border-t border-line first:border-t-0 md:table-row md:first:border-t">
                    <th scope="row" className="px-6 pb-1 pt-5 align-top font-medium md:w-[45%] md:py-5">
                      &ldquo;{q}&rdquo;
                    </th>
                    <td className="px-6 pb-5 align-top leading-relaxed text-muted md:py-5">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <TextCta href="/ai-search-optimization#check" label="Check if ChatGPT can read your site" from="remodel_ai" />
            <TextCta href="/notes/get-business-recommended-by-chatgpt" label="How to get recommended by ChatGPT" from="remodel_ai" />
          </div>
        </div>
      </section>

      {/* ── Why remodeling is different ─────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Why remodeling is different</p>
            <h2 className="t-h2 mt-5">A remodel isn&rsquo;t an emergency call</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              A plumber wins the 2 a.m. call by being first on the map. A remodeler wins a job that was weeks in the
              planning. The SEO has to fit how it&rsquo;s actually bought.
            </p>
          </Reveal>
          <div data-anim="cards" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENT.map((d) => (
              <div key={d.t} className="card flex flex-col p-7">
                <h3 className="t-h3 !text-[1.2rem]">{d.t}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{d.b}</p>
                {d.link ? (
                  <Link href={d.link.href} className="link-arrow mt-4 inline-flex text-[14.5px]">
                    {d.link.label} &rarr;
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ───────────────────────────────────────────────── */}
      <section id="plans" className="section section-tint scroll-mt-24">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What it costs</p>
            <h2 className="t-h2 mt-5">Prices for remodelers, on the page</h2>
          </Reveal>
          <div data-anim="cards" className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { p: tracking, href: "/pricing#tracking", line: "Calls and consult forms counted in GA4. You pay after you see it working." },
              { p: sprint, href: "/pricing#sprint", line: "Tracking, speed, schema, Business Profile and fixes, done once." },
              { p: growth, href: "/pricing#monthly", line: "Two new service, town or project pages a month, plus Business Profile upkeep." },
            ].map(({ p, href, line }) => (
              <div key={p.key} className={`card flex flex-col p-7 ${p.pick ? "border-ink/60 shadow-float" : ""}`}>
                <p className="text-[14px] font-medium text-muted">{p.kicker}</p>
                <h3 className="t-h3 mt-2 !text-[1.35rem]">{p.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="tnum font-display text-[2.2rem] leading-none tracking-tight">{p.price}</span>
                  <span className="text-[14px] text-muted">{p.unit}</span>
                </p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{line}</p>
                <Link href={href} data-track="cta_link" data-from="remodel_plans" className="btn btn-md btn-secondary mt-6 self-start">
                  What&rsquo;s included <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[70ch] text-[15px] text-muted">
            Want the ChatGPT side measured every month, with citation tracking across four assistants?{" "}
            <Link href="/ai-search-optimization" className="text-ink underline underline-offset-4">
              AI search optimization
            </Link>{" "}
            is {startup.price} a month, no contract. Monthly local plans have a three-month minimum.
          </p>
        </div>
      </section>

      {/* ── Proof ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">The closest proof</p>
            <h2 className="t-h2 mt-5">The same work on a roofing contractor&rsquo;s site</h2>
            <p className="t-lead mt-4 max-w-[62ch]">
              We don&rsquo;t have a remodeler&rsquo;s Search Console to open up for you yet. The nearest match is this
              roofer: a homeowner making a big decision about their house, and the same town pages, Business Profile
              work and tracking. More on the{" "}
              <Link href="/roofing-seo" className="text-ink underline underline-offset-4">roofing SEO page</Link> and the{" "}
              <Link href="/work" className="text-ink underline underline-offset-4">work page</Link>.
            </p>
          </Reveal>
          <div className="card mt-10 px-5 sm:px-8">
            <CaseStudyBlock c={roofing} />
          </div>
        </div>
      </section>

      {/* ── Guides ──────────────────────────────────────────────── */}
      <section className="section section-tint">
        <div className="container-pad">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Free guides</p>
            <h2 className="t-h2 mt-5">Do it yourself with these</h2>
            <p className="t-lead mt-4 max-w-[60ch]">Everything on this page is written up in more detail. Start with whichever problem is costing you consults.</p>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="text-[15px] font-medium text-muted">{g.title}</h3>
                <ul className="mt-4 border-t border-line">
                  {g.notes.map((n) => (
                    <li key={n.slug} className="border-b border-line">
                      <Link href={`/notes/${n.slug}`} className="group flex items-start justify-between gap-4 py-3.5 text-[15.5px] leading-snug">
                        <span className="group-hover:underline group-hover:underline-offset-4">{n.title}</span>
                        <ArrowRight size={16} aria-hidden className="mt-1 flex-none text-muted transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-bg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="t-h3 !text-[1.3rem]">Twenty minutes, and you leave with the first pages to build either way.</p>
            <div className="flex-none">
              <BookCta from="remodel_guides" size="md" />
              <BookNote className="mt-2" />
            </div>
          </div>
        </div>
      </section>

      <Faq items={FAQ} title="Home remodeling SEO questions" className="section" />

      <MoreServices current="/home-remodeling-seo" />

      <Availability call={CALL} />
      <MobileCta />
    </>
  );
}
