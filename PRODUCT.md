# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: owners of local service businesses.** Roofers, remodelers, pool and deck, lawn and landscaping, plumbing and HVAC, auto detailing and tint, clinics. Busy, not marketers, often reading on a phone between jobs. Their job: get more calls from Google and AI search, and see proof of where the calls came from. They arrive from a cold email that already handed them three findings about their business, from a note found in search, or from the newsletter.

**Secondary: B2B startup founders (and hiring managers) looking at GTM strategy.** Served by `/gtm`, which is in the main nav since 26 Nov 2026, indexed, and carries a NEW banner saying GTM is a newer field for Michael. The page leads with his strategy (buyer from evidence, motion by deal size, warm before cold, give away the easy part, measure then cut), not his outbound numbers. Pricing links to it. This audience must not change the homepage or service-page copy.

## Product Purpose

Koinophobe is a one-person digital growth agency (pivoted from "SEO agency" on 26 Nov 2026) that gets service businesses found on Google and cited by AI answer engines (ChatGPT, Perplexity, Gemini, Claude), and counts every call and form so the owner can see what it earned. Success is a booked intro call or a bought fix, and later a client who stays on monthly.

## Positioning

- One person does the work and the site says "I". No account managers, no sales team, which is why the price is low.
- Outcomes measured in calls, not rankings. Tracking is set up first, in the client's own accounts, so the work can be checked any time.
- Value up front: the audit and outreach give away real findings with the exact fix before any money changes hands.
- Honest numbers, including the bad ones. Every case shows a weak figure, stated before the client found it.

## Operating Context

- Outreach is value-first cold email to named owners, carrying three hand-checked findings and one price line. The site has to back up that email when the owner clicks through.
- Booking is Cal.com (`koinophobe/intro`); only `/contact` loads the embed, every other CTA links out. The "same-day replies" promise sits next to every booking button.
- Contact form posts to the site's own `/api/contact` (Gmail SMTP), falling back to mailto.
- Content: ~150 notes in `content/notes` (markdown, gray-matter), sector pages (`/roofing-seo`, `/home-remodeling-seo`, `/ai-search-optimization`), a missed-call calculator, and the newsletter "Calls, Not Clicks" on Substack.
- Clients are in the US; schema `areaServed` is United States. Current outreach focus is Florida roofers outside Brevard County.

## Capabilities and Constraints

**Offer (revised 26 Nov 2026, Michael's prices):**
- **The Google fix: $2,500, a four-week sprint**, $1,250 to start and $1,250 on handover. Week 1: starting numbers, competitor teardown, Google Business Profile rebuilt. Week 2: listings AI tools read, Local Services Ads, tracking. Week 3: homepage and three service pages with schema, a review engine, and a **local link-building campaign (at least 10 local links)**. Week 4: handover with a before and after report and a 90-day plan. Michael confirmed this scope on 26 Nov.
- **Monthly growth: $1,000/month**, month to month with 30 days' notice: four new local links, weekly profile posts and review replies, one new page, an AI search check, map position tracking, forms and calls tested, a report and a short call.
- **Retired:** the $750 fix and $300 upkeep (26 Nov), the $500/month SEO plan, the $300 AI search add-on, the delivery guarantee.
- **Homepage carries no prices** (Michael, 26 Nov). Prices live on `/pricing`, laid out like a studio pricing page: plan list left, plans in full right, proof, reviews, six "before you sign" cards, FAQ.
- **Look (26 Nov):** v6 studio grid (`app/studio.css` over `house.css`), navy ink, orange only for the action, Inter and Inter Tight. The logo is the lowercase wordmark "koinophobe" with no mark beside it. Dark theme tokens are restated at the end of `studio.css`.
- The free audit and intro call stay.
- Outreach templates outside this repo (e.g. `Work/contractor-leads/offer-v2-value-first.md`) may still quote $750.

**Standing rules:** the client owns every account and keeps everything on exit. No ranking guarantees. Ad spend and ad management are not included (LSA setup is part of the fix; ongoing ad management is not). Payment by ACH at the start of each month.

**Terminology:** "calls" not "leads" or "conversions" in owner-facing copy. No SEO jargon above the fold ("schema", "indexing", "GA4", "impressions"). "Service businesses" for the audience.

**Stack:** Next.js 14 (app router), TypeScript, Tailwind, GSAP, next-themes (light and dark), Vercel with Vercel Analytics. Content edited in `lib/site.ts`, `lib/content.ts`, `lib/pricing.ts`, `content/notes`.

## Brand Commitments

- Name: **Koinophobe** (the meaning is explained in a note). Founder Michael Edward is named on the About page.
- Voice: plain, short sentences, everyday words, first person singular. Direct, a little dry ("a tad expensive"). No em dashes. No hype.
- One fixed line about the agency, repeated on every note and in the Organization schema: `site.aiPitch` in `lib/site.ts`.
- Light and dark themes both ship. Logo wordmarks in `public/logo-wm-*.png`.

## Evidence on Hand

- **Reviews:** six real reviews in `lib/content.ts` (four Upwork, verifiable; two direct: Brian Reid of Palm Bay Marketing SEO, Daniel Folks of Over The Table Top).
- **Search Console data** for five measured properties (`lib/gsc.ts`): 1,031,312 impressions, 3,077 clicks, 4,981 queries. These figures are scoped to those five only and must never stand in for the full portfolio.
- **Portfolio:** 30+ sites worked on. Named clients with permission: Over The Table Top, Tint Lordz Auto Spa, Palm Bay Marketing SEO. Agency-sourced work (HH Roofing, Lumagrid Solar, clinics, pool deck) shows screenshots and sector/market only: no name, host or link, ever.
- **Case studies:** roofing contractor, myofascial clinic (158 to 501), Tint Lordz, Over The Table Top. Posters and hover videos in `public/work/`.
- **Absent, do not fabricate:** results from the one-off fix offer (it is new and has no completed client yet), roofing client counts, revenue figures, logos of clients who aren't named, and any testimonial not in `lib/content.ts`.

## Product Principles

1. **Write for the owner, not the marketer.** Every claim becomes an outcome a roofer would say out loud.
2. **Give value before asking.** The page should hold real advice an owner can act on without hiring anyone.
3. **If it can't be measured, don't claim it.** Numbers carry their scope; bad numbers stay in.
4. **One person, visibly.** Proof of the human doing the work beats agency polish.
5. **Two audiences, kept apart.** The GTM page borrows the agency as evidence; it never bends the owner-facing site.

## Accessibility & Inclusion

WCAG 2.2 AA is the floor. Owners often read on a phone outdoors, so contrast, tap-target size and legible type at small sizes matter in both themes. Motion respects `prefers-reduced-motion` (already built into the GSAP reveals).
