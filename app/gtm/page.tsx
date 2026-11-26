import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hub } from "@/components/Hub";
import { AccGroup } from "@/components/AccGroup";
import { faqJsonLd } from "@/components/Faq";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

/*
 * GTM strategy for B2B startups: a newer line of work, said so in a banner at
 * the top. The page leads with how Michael thinks about go-to-market (buyer,
 * motion, warm paths, giving away the easy part, measuring), not with his own
 * outbound numbers. Copy run through the humanize pass in his voice profile.
 */

export const metadata = pageMeta({
  title: { absolute: "Koinophobe · Go-to-market strategy for early B2B startups" },
  description:
    "Who to sell to, which motion fits your deal size, and the system that runs it. GTM strategy for B2B founders who still close every deal themselves.",
  path: "/gtm",
});

const MAIL = `mailto:${site.email}?subject=${encodeURIComponent("GTM strategy")}`;

const STEPS = [
  { t: "Name the buyer from evidence", b: "Who buys, why now, and how they'd describe the problem. I start from your closed deals and public data; registries, filings, job posts. Not a persona workshop." },
  { t: "Pick the motion by deal size", b: "You can't sell a $500 tool the way you sell a $50,000 contract. Deal size picks between product-led, content, outbound, account-based and partners. Run one, maybe two." },
  { t: "Warm before cold", b: "Your first 100 accounts are usually a person or two away; you, your team, your investors. I match each account to someone you know and write the intro. You hit send." },
  { t: "Give away the easy part", b: "Lead with something useful. The target list, an audit, one finding they didn't have. The buyer sees what they'd pay for: the work around it, every week." },
  { t: "Measure, then cut", b: "Reply rate, meetings booked, pipeline by stage, cost to win a customer. Every test gets a number and a stop date. If it misses, it goes." },
];

const MOTIONS = [
  { t: "Product-led", b: "Free trial or freemium; the product does the selling.", fit: "Self-serve software under about $1k a year" },
  { t: "Inbound and content", b: "Search, a newsletter, social and webinars. Slow for six months, then it compounds.", fit: "Mid-price deals" },
  { t: "Outbound", b: "Email, LinkedIn and calls to a defined list.", fit: "$5k to $100k deals with a clear buyer" },
  { t: "Account-based", b: "Hand-picked accounts, several people at each, written one by one.", fit: "Enterprise, $50k and up" },
  { t: "Partners", b: "Agencies, resellers and integrations sell for you.", fit: "When someone else already owns your buyer" },
  { t: "Community", b: "Slack, Discord or events; trust first, sale later.", fit: "Developer tools and niche professions" },
];

const WEEKS = [
  { t: "Week 1", b: "Your last 20 wins and losses, read for patterns. Who bought, why, and how long it took." },
  { t: "Week 2", b: "The buyer and the message, on one page. A target list with a source for every row." },
  { t: "Week 3", b: "One motion running end to end: list, CRM stages, tracking, the first sends or intros." },
  { t: "Week 4", b: "The numbers. What stays, what goes, and the next 60 days." },
];

const FAQ = [
  { q: "Is this a project or a job?", a: "Either. I take a few startups as projects, and I'm open to a growth or GTM engineering role, remote on US hours." },
  { q: "Who pays for tools?", a: "You, on your own card, with me added as a user. You own the data, and tool costs never hide inside my fee." },
  { q: "What size of company?", a: "Pre-seed to Series A, B2B, with the founder still doing most of the selling." },
  { q: "What does it cost?", a: "Depends on the scope. We set it on a 20-minute call." },
];

/** The hero illustration: evidence in, one motion, a loop back from the numbers. */
function Flow() {
  const box = (x: number, y: number, w: number, label: string, sub: string, strong = false) => (
    <g>
      <rect x={x} y={y} width={w} height={64} rx={2} fill={strong ? "rgb(var(--ink))" : "rgb(var(--bg))"} stroke="rgb(var(--line))" />
      <text x={x + 16} y={y + 27} fontSize="15" fontWeight="600" fill={strong ? "rgb(var(--bg))" : "rgb(var(--ink))"}>{label}</text>
      <text x={x + 16} y={y + 47} fontSize="12" fill={strong ? "rgb(var(--bg) / 0.7)" : "rgb(var(--ink) / 0.6)"}>{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 440" className="gtm-illo" role="img" aria-labelledby="flow-t">
      <title id="flow-t">How the work flows: closed deals and public data name the buyer, deal size picks one motion, warm intros and a useful first touch fill the pipeline, and the numbers decide what stays.</title>
      <rect x="0" y="0" width="520" height="440" fill="rgb(var(--surface))" />
      <g fill="none" stroke="rgb(var(--ink) / 0.35)" strokeWidth="1.5">
        <path d="M150 96 V128" /><path d="M370 96 V128" />
        <path d="M150 128 H370" /><path d="M260 128 V156" />
        <path d="M260 220 V252" /><path d="M150 252 H370" /><path d="M150 252 V276" /><path d="M370 252 V276" />
        <path d="M150 340 V364" /><path d="M370 340 V364" /><path d="M150 364 H370" /><path d="M260 364 V376" />
        <path d="M410 408 H496 V188 H400" strokeDasharray="4 5" />
      </g>
      <g fill="rgb(var(--pop))">
        <circle r="4"><animateMotion dur="5s" repeatCount="indefinite" path="M260 128 V156 M260 220 V252 H150 V276" /></circle>
        <circle r="4"><animateMotion dur="7s" repeatCount="indefinite" path="M410 408 H496 V188 H400" /></circle>
      </g>
      {box(40, 32, 220, "Closed deals", "wins, losses, cycle length")}
      {box(280, 32, 200, "Public data", "filings, registries, jobs")}
      {box(140, 156, 260, "One buyer, one motion", "picked by deal size", true)}
      {box(40, 276, 220, "Warm paths", "an intro for every account")}
      {box(280, 276, 200, "Easy part, free", "the list, an audit, a finding")}
      {box(110, 376, 300, "The numbers", "replies, meetings, pipeline, cost")}
      <text x="503" y="300" fontSize="11" fill="rgb(var(--ink) / 0.55)" transform="rotate(90 503 300)">keep or cut</text>
    </svg>
  );
}

export default function GtmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="container-pad pb-16 pt-8 sm:pt-10">
        <p className="newband">
          <span className="new">NEW</span>
          <span>GTM strategy is a newer field for me. I&rsquo;m taking on a few B2B startups while I build it out; I&rsquo;ll be straight about what I&rsquo;ve done and what I haven&rsquo;t.</span>
        </p>
        <div className="hero6 !pt-12 lg:!grid-cols-[minmax(0,1fr)_480px]">
          <div>
            <p className="kicker">GTM for B2B startups</p>
            <h1 className="t-hero mt-5 max-w-[14ch]">Go-to-market strategy for early B2B startups</h1>
            <p className="t-lead mt-6 max-w-[48ch]">
              Who to sell to, which motion fits your deal size, and the system that runs it. For founders still closing every deal
              themselves who want sales to stop depending on them.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href={site.booking} target="_blank" rel="noopener" data-track="cta_book" data-from="gtm_hero" className="btn btn-lg btn-primary">Book a call</a>
              <Link href="#approach" className="btn btn-lg btn-secondary">See the approach</Link>
            </div>
            <div className="gtm-me mt-10">
              <Image src="/site/michael-edward.jpg" alt="" width={56} height={56} />
              <p className="text-[14.5px] leading-snug text-muted"><span className="font-semibold text-ink">Michael Edward</span><br />Growth for local trades, now GTM for startups</p>
            </div>
          </div>
          <Flow />
        </div>
      </section>

      {/* ── Approach ───────────────────────────────────────────── */}
      <section id="approach" className="section !pt-8 scroll-mt-20">
        <div className="container-pad">
          <div className="head-c">
            <p className="kicker">How I approach GTM</p>
            <h2 className="t-h2 mt-4">One motion, one list you can defend</h2>
            <p className="t-lead mt-5">Most startups don&rsquo;t need more channels. They need one motion that fits the deal size, pointed at a list they can defend.</p>
          </div>
          <AccGroup className="acc mt-14">
            {STEPS.map((s, i) => (
              <details key={s.t} open={i === 0}>
                <summary>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t">{s.t}</span>
                  <span className="pm" aria-hidden />
                </summary>
                <div className="acc-body pb-8 md:pl-[136px]">
                  <p className="max-w-[62ch] text-[17px] font-medium leading-relaxed">{s.b}</p>
                </div>
              </details>
            ))}
          </AccGroup>
        </div>
      </section>

      {/* ── Motions ────────────────────────────────────────────── */}
      <section id="motions" className="section !pt-0 scroll-mt-20">
        <div className="container-pad">
          <div className="max-w-[46rem]">
            <p className="kicker">Which motion fits</p>
            <h2 className="t-h2 mt-4">Deal size picks the motion</h2>
          </div>
          <div className="motions mt-12">
            {MOTIONS.map((m) => (
              <div key={m.t}>
                <b>{m.t}</b>
                <p>{m.b}</p>
                <span>{m.fit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Worked example ─────────────────────────────────────── */}
      <section className="section !pt-0">
        <div className="container-pad">
          <div className="pair6">
            <div className="!items-start !text-left">
              <p className="kicker">An example of the thinking</p>
              <h2 className="t-h2 mt-4 !text-[clamp(1.8rem,2.6vw,2.3rem)]">Four customers, 100 accounts, five intros that close</h2>
              <p className="t-lead mt-5 max-w-[52ch]">
                Say a seed-stage company sells to investment firms. Four customers, about $25k a year each. Public filings list every firm that size.
              </p>
              <p className="t-lead mt-4 max-w-[52ch]">
                I&rsquo;d cut that to the 100 that look most like the best customers, match each to someone the founders or investors already know,
                and write every intro. Five closes is $125k a year. All through people who already trust them.
              </p>
            </div>
            <div className="!items-start !text-left">
              <p className="kicker">Where the hours go</p>
              <p className="mt-4 text-[clamp(1.4rem,2vw,1.75rem)] font-semibold leading-snug tracking-[-0.015em]">
                Building the list takes an afternoon. Matching, writing, following up and keeping it current takes every week; most founders never get to it.
              </p>
              <dl className="mt-auto grid w-full grid-cols-3 gap-4 pt-10 text-left">
                <div><dt className="text-[13px] text-muted">Accounts</dt><dd className="font-display text-[2rem]">100</dd></div>
                <div><dt className="text-[13px] text-muted">Closes</dt><dd className="font-display text-[2rem]">5</dd></div>
                <div><dt className="text-[13px] text-muted">A year</dt><dd className="font-display text-[2rem]">$125k</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── First 30 days ──────────────────────────────────────── */}
      <section className="section !pt-0">
        <div className="container-pad">
          <div className="head-c">
            <p className="kicker">The first 30 days</p>
            <h2 className="t-h2 mt-4">A month to a motion that runs</h2>
          </div>
          <div className="stats6 mt-12 md:!grid-cols-4">
            {WEEKS.map((w) => (
              <div key={w.t}>
                <p className="kicker">{w.t}</p>
                <p className="mt-3 text-[15.5px] leading-relaxed">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why me ─────────────────────────────────────────────── */}
      <section className="section !pt-0">
        <div className="container-pad grid gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="kicker">Why me</p>
            <h2 className="t-h2 mt-4">The same three questions, a different buyer</h2>
            <p className="t-lead mt-5">
              I run growth for local service businesses: search, AI visibility, tracking, offers and outreach, all measured in the
              client&rsquo;s own accounts. A startup&rsquo;s GTM turns on the same three questions. Who buys, where they look, what makes them reply.
            </p>
            <p className="t-lead mt-4">
              I build the machinery myself in Python, Next.js and Google Sheets, with Claude doing the heavy lifting. B.Sc. in Computer Science.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/work" className="link-u inline-flex items-center gap-1.5">Case studies <ArrowRight size={15} aria-hidden /></Link>
              <a href={site.linkedin} target="_blank" rel="noopener" className="link-u inline-flex items-center gap-1.5">LinkedIn <ArrowRight size={15} aria-hidden /></a>
              <a href={site.github} target="_blank" rel="noopener" className="link-u inline-flex items-center gap-1.5">GitHub <ArrowRight size={15} aria-hidden /></a>
            </div>
          </div>
          <div>
            <Hub
              alt="The GTM system at the centre, built with Python, Next.js, Google Sheets, Google Analytics, Tag Manager and Claude."
              center={{ label: "GTM system", icon: "/icons/google-sheets.svg" }}
              nodes={[
                { label: "Python", icon: "/icons/python.svg" },
                { label: "Next.js", icon: "/icons/nextjs.svg" },
                { label: "Claude", icon: "/icons/claude.svg" },
                { label: "Google Analytics", icon: "/icons/google-analytics.svg" },
                { label: "Tag Manager", icon: "/icons/google-tag-manager.svg" },
                { label: "ChatGPT", icon: "/icons/openai.svg" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="questions" className="section !pt-0 scroll-mt-20">
        <div className="container-pad faq6">
          <div>
            <p className="kicker">Questions</p>
            <h2 className="t-h2 mt-4">What founders ask first</h2>
            <div className="ask mt-8">
              <p className="text-[22px] font-semibold tracking-[-0.01em]">Rather write it down?</p>
              <p className="mt-2 text-muted">Send the stage, the deal size and who you sell to. Replies come the same business day.</p>
              <a href={MAIL} data-track="cta_email" data-from="gtm_faq" className="btn btn-lg btn-primary mt-6">Email Michael</a>
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
    </>
  );
}
