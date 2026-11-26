import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reel } from "@/components/Reel";
import { CaseCards } from "@/components/CaseCards";
import { Testimonials } from "@/components/Testimonials";
import { MobileCta } from "@/components/MobileCta";
import { AccGroup } from "@/components/AccGroup";
import { faqJsonLd } from "@/components/Faq";
import { aggregate } from "@/lib/gsc";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const revalidate = 3600;

export const metadata = pageMeta({
  title: { absolute: "Koinophobe · Digital growth agency for local trades" },
  description:
    "Digital growth and local SEO agency for roofers, remodelers and trades: Google Business Profile, local links, Local Services Ads and AI search, in accounts you own.",
  path: "/",
});

/*
 * Copy is written for a busy owner, first person because one person does the
 * work. Every figure comes from lib/gsc.ts, every price from lib/pricing.ts,
 * every quote from lib/content.ts.
 */

const REEL = [
  { slug: "tint-lordz", label: "Tint Lordz Auto Spa", tags: "Website, Google profile, local search", video: "/work/tintlordz.mp4", poster: "/work/tintlordz.webp", alt: "The Tint Lordz Auto Spa website" },
  { slug: "myofascial-clinic", label: "A pain clinic, Florida", tags: "Rebuild, a page per treatment, tracking", video: "/work/myofascial.mp4", poster: "/work/myofascial.webp", alt: "A pain clinic's website, rebuilt with a page for every treatment" },
  { slug: "roofing-contractor", label: "A roofer, Florida", tags: "Search, town pages, storm content", video: "/work/hhroofing.mp4", poster: "/work/hhroofing.webp", alt: "A roofing contractor's website" },
  { slug: "over-the-table-top", label: "Over The Table Top", tags: "Website, local search", video: "/work/overthetabletop.mp4", poster: "/work/overthetabletop.webp", alt: "The Over The Table Top website" },
];

const TRADES = [
  { label: "Roofing", href: "/roofing-seo" },
  { label: "Remodeling", href: "/home-remodeling-seo" },
  { label: "Pool and deck", href: "/notes/pool-deck-repair-seo" },
  { label: "Lawn care", href: "/notes/lawn-care-seo" },
  { label: "Plumbing and HVAC", href: "/notes/topic/trades" },
];

const SERVICES = [
  {
    n: "01",
    t: "Get found on Google",
    big: "Your Google Business Profile rebuilt, your listings made to match, and Local Services Ads set up so you pay per lead. Done as one four-week sprint, and every account stays yours.",
    list: ["Starting numbers and a competitor teardown", "Business Profile and listings", "Local Services Ads", "Call and form tracking you can trust"],
    link: { href: "/google-business-profile-optimization", label: "Google Business Profile optimization" },
    media: { video: "/work/tintlordz.mp4", poster: "/work/tintlordz.webp" },
  },
  {
    n: "02",
    t: "Local link building",
    big: "Google trusts the businesses other local sites vouch for. Suppliers, trade groups, sponsorships and local news, each link listed with the page it sits on.",
    list: ["Links from places your customers know", "No paid link farms or networks", "A list of every link won"],
    link: { href: "/pricing#fix", label: "How the campaign works" },
    media: { video: "/work/hhroofing.mp4", poster: "/work/hhroofing.webp" },
  },
  {
    n: "03",
    t: "Named by AI",
    big: "When customers ask ChatGPT, Gemini, Claude or Perplexity who to call, they answer from your listings, reviews and site. I clean those up, then check what they say every month.",
    list: ["Listings AI tools read, cleaned up", "Free AI crawler check for your site", "A monthly check across four assistants"],
    link: { href: "/ai-search-optimization", label: "How AI search works" },
    media: { video: "/work/myofascial.mp4", poster: "/work/myofascial.webp" },
  },
  {
    n: "04",
    t: "Pages that win the call",
    big: "Your homepage and service pages rewritten to say why you, with a new service or town page every month after. Written for the owner reading on a phone, and for Google.",
    list: ["Homepage and three service pages", "Schema so Google and AI read them right", "A new page each month on the monthly plan"],
    link: { href: "/pricing#monthly", label: "See the monthly plan" },
    media: { video: "/work/overthetabletop.mp4", poster: "/work/overthetabletop.webp" },
  },
  {
    n: "05",
    t: "Free site audit",
    big: "A written list of what's costing you calls, worst first, with a recorded walkthrough. Yours to keep whether you hire me or not.",
    list: ["Done in 5 business days", "Calls and forms checked", "Google Business Profile reviewed"],
    link: { href: "/pricing#free", label: "Ask for the audit" },
    media: { video: "/work/tintlordz.mp4", poster: "/work/tintlordz.webp" },
  },
];

const CASES = [
  { slug: "tint-lordz", name: "Tint Lordz Auto Spa", tags: ["Window tint", "Lawrence, MA"], headline: "Every spelling of the shop's name found at position 1.98 on average", body: "A new site and a cleaned-up Google profile. The brand searches are won; “window tinting near me” is the next job.", video: "/work/tintlordz.mp4", poster: "/work/tintlordz.webp", quote: { text: "Good guy to work with. Attention to detail.", who: "Tint Lordz Auto Spa", role: "review on Upwork" } },
  { slug: "myofascial-clinic", name: "Pain clinic", tags: ["Clinic", "Brevard County, FL"], headline: "From 4 Google clicks a month to 104, and it held there", body: "Moved the old site without losing anything, rebuilt it, gave every treatment its own page, then the basics and tracking.", video: "/work/myofascial.mp4", poster: "/work/myofascial.webp" },
  { slug: "over-the-table-top", name: "Over The Table Top", tags: ["Game shop", "Charles County, MD"], headline: "614 searches that show a one-location shop on Google's first page", body: "A small retailer with one door, found on page one for 614 searches in its own Search Console.", video: "/work/overthetabletop.mp4", poster: "/work/overthetabletop.webp", quote: { text: "He's been on top of things, not only what I asked, but also outside the scope.", who: "Daniel Folks", role: "owner, Over The Table Top" } },
];

const FAQ = [
  { q: "Who is the best fit?", a: "Local service businesses customers find on Google: roofers, remodelers, pool and lawn care, plumbing and HVAC, auto detailing, clinics. Anywhere in the US." },
  { q: "What does a digital growth agency do for a trade business?", a: "Everything that decides whether a nearby customer finds you and calls: your Google profile, the listings and links Google trusts, Local Services Ads, the pages people land on, and what AI assistants say about you. Run as one plan, not five vendors." },
  { q: "Are Google rankings guaranteed?", a: "No, and be careful with anyone who does. Nobody controls Google. I guarantee the work on the list, done on the dates we agree." },
  { q: "Who owns the accounts?", a: "You do. I work inside your Google profile, ad account and site, and nothing is held back if you leave." },
  { q: "What do you need from me?", a: "Access to your Google profile and website, your license and insurance for the ads, and photos of your work." },
  { q: "Where are the prices?", a: "On the pricing page, in full. There are two plans, a one-time sprint and a monthly plan, and the audit and intro call are free." },
];

const TOOLS = ["google-icon", "google-maps", "google-ads", "google-analytics", "openai", "claude"];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="container-pad pb-16">
        <div className="hero6">
          <div>
            <p className="kicker">Digital growth agency for local trades</p>
            <h1 className="t-hero mt-5 max-w-[15ch]">More calls from Google, the map and AI</h1>
            <p className="t-lead mt-6 max-w-[50ch]">
              Your Google profile, local links, Local Services Ads and AI search, run as one growth plan for roofers,
              remodelers and home service businesses. In accounts you own.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="hero" className="btn btn-lg btn-primary">Book a call</a>
              <Link href="#work" className="btn btn-lg btn-secondary">See the work</Link>
            </div>
          </div>
          <div className="reel6">
            <Reel items={REEL} />
          </div>
        </div>
        <p className="proof6 mt-20">
          <span><b>{aggregate.sitesWorked}+</b>sites built</span>
          <span><b>{aggregate.impressions.toLocaleString("en-US")}</b>times shown on Google</span>
          <span><b>6</b>client reviews</span>
        </p>
      </section>
      <div className="container-pad">
        <nav className="cells" aria-label="Trades">
          {TRADES.map((t) => (
            <Link key={t.href} href={t.href}>{t.label}</Link>
          ))}
        </nav>
      </div>

      {/* ── How I help: numbered list, first open ──────────────── */}
      <section id="services" className="section scroll-mt-20">
        <div className="container-pad">
          <div className="head-c">
            <p className="kicker">How I help</p>
            <h2 className="t-h2 mt-4">Found, named, booked</h2>
            <p className="t-lead mt-5">Five pieces of one plan. Each one moves calls, and each one shows up in the numbers you already have.</p>
          </div>
          <AccGroup className="acc mt-16">
            {SERVICES.map((s, i) => (
              <details key={s.n} open={i === 0}>
                <summary>
                  <span className="n">{s.n}</span>
                  <span className="t">{s.t}</span>
                  <span className="pm" aria-hidden />
                </summary>
                <div className="body">
                  <div className="media">
                    <video src={s.media.video} poster={s.media.poster} width={1000} height={498} muted playsInline loop autoPlay={i === 0} preload={i === 0 ? "metadata" : "none"} aria-hidden />
                  </div>
                  <div className="copy flex flex-col lg:pl-4">
                    <p className="big">{s.big}</p>
                    <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>
                    <Link href={s.link.href} className="link-u mt-auto inline-flex items-center gap-1.5 self-start pt-8">
                      {s.link.label} <ArrowRight size={15} aria-hidden />
                    </Link>
                  </div>
                </div>
              </details>
            ))}
          </AccGroup>

          <div className="pair6 mt-16">
            <div>
              <p className="kicker">By trade</p>
              <h3 className="t-h2 mt-4 !text-[clamp(1.8rem,2.6vw,2.3rem)]">Guides for your trade</h3>
              <p className="t-lead mt-4 max-w-[38ch]">Roofing, remodeling, pool, lawn and HVAC: what to fix first, written from real client data.</p>
              <Link href="/notes" className="link-u mt-auto inline-flex items-center gap-1.5 pt-10">Read the notes <ArrowRight size={15} aria-hidden /></Link>
            </div>
            <div>
              <p className="kicker">The tools</p>
              <h3 className="t-h2 mt-4 !text-[clamp(1.8rem,2.6vw,2.3rem)]">Where the work happens</h3>
              <p className="t-lead mt-4 max-w-[38ch]">Your Google profile, Maps, Local Services Ads and Analytics, and the AI tools your customers ask.</p>
              <div className="tiles6" aria-label="Google Business Profile, Google Maps, Google Ads, Google Analytics, ChatGPT and Claude" role="img">
                {TOOLS.map((t) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <span key={t}><img src={`/icons/${t}.svg`} alt="" /></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case studies ───────────────────────────────────────── */}
      <section id="work" className="section scroll-mt-20 !pt-0">
        <div className="container-pad">
          <div className="head-c">
            <p className="kicker">Selected work</p>
            <h2 className="t-h2 mt-4">Case studies</h2>
          </div>
          <div className="mt-14">
            <CaseCards cards={CASES} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/work" className="btn btn-lg btn-secondary">See all case studies</Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────────── */}
      <section className="section !pt-0">
        <div className="container-pad">
          <Testimonials heading="Words from the owners I've worked with" />
        </div>
      </section>

      {/* ── Meet: one person ───────────────────────────────────── */}
      <section className="section !pt-0">
        <div className="container-pad">
          <div className="meet6">
            <div className="meet-photo">
              <Image src="/site/michael-edward.jpg" alt="Michael Edward, who runs Koinophobe" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="kicker">One person, start to finish</p>
              <h2 className="t-h2 mt-4">Meet Michael</h2>
              <p className="t-lead mt-5 max-w-[46ch]">No account managers and no sales team. You talk to me, I make the changes, and every login stays in your name.</p>
              <dl className="meet-stats mt-10">
                <div><dt>{aggregate.sitesWorked}+</dt><dd>websites built and ranked</dd></div>
                <div><dt>{(aggregate.impressions / 1e6).toFixed(1)}M</dt><dd>times client sites were shown on Google</dd></div>
                <div><dt>{aggregate.pageOne.toLocaleString("en-US")}</dt><dd>searches with a client on page one</dd></div>
              </dl>
              <div className="mt-10">
                <Link href="/about" className="btn btn-lg btn-primary">About Michael</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section id="questions" className="section !pt-0 scroll-mt-20">
        <div className="container-pad faq6">
          <div>
            <p className="kicker">Still got questions?</p>
            <h2 className="t-h2 mt-4">Read the questions</h2>
            <div className="ask mt-8">
              <div className="relative h-[72px] w-[72px] overflow-hidden bg-surface">
                <Image src="/site/michael-edward.jpg" alt="" fill sizes="72px" className="object-cover object-top" />
              </div>
              <p className="mt-6 text-[22px] font-semibold tracking-[-0.01em]">Can&rsquo;t find your answer?</p>
              <p className="mt-2 text-muted">Book a call and ask me directly.</p>
              <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="faq" className="btn btn-lg btn-primary mt-6">Book a call</a>
              <p className="mt-5 text-[14.5px] text-muted">Or email <a href={`mailto:${site.email}`} className="link-u text-ink">{site.email}</a></p>
            </div>
          </div>
          <div className="qrows">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary><span className="box" aria-hidden />{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MobileCta />
    </>
  );
}
