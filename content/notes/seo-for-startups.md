---
title: "SEO for startups: when to start, and what to do first"
slug: seo-for-startups
date: 2026-10-11
draft: false
topic: startups
seo_title: "SEO for startups: when to start and what to do first"
seo_description: "When a startup should start SEO, the pages to build first, the technical mistakes that cost months later, and how AI assistants change the order."
excerpt: "Most founders start SEO too late or start it with the wrong pages. When to begin, the five pages to build before a blog, the technical decisions that are expensive to undo, and what my citation study says about AI assistants."
cover: /notes/photos/seo-for-startups-cover.webp
cover_alt: "A small team working around a table with laptops"
cover_credit: "Photo: Annie Spratt on Unsplash"
faq:
  - q: "When should a startup start doing SEO?"
    a: "Set up the technical base and Search Console before launch, since it costs almost nothing and mistakes there are expensive later. Start publishing once you can describe the problem you solve in the words buyers use, which for most teams is around the time of the first paying customers."
  - q: "What pages should a startup build first for SEO?"
    a: "Pages that match how buyers already search: one page per core use case, a comparison page against the tool people switch from, an alternatives page, integration pages for the tools you connect to, and a pricing page Google can read. A general blog comes after those."
  - q: "Is SEO worth it for an early-stage startup?"
    a: "It's slow, so it rarely saves a quarter. It is cheap to start and compounds, and the pages that rank on Google are also the pages AI assistants tend to draw from. The usual mistake is skipping the setup, then rebuilding the site a year later."
---

![A startup's first pages laid out by when to build them, with the blog last](/notes/illustrations/seo-for-startups.webp)

Founders usually ask me about SEO at one of two moments. Either it's before launch and they want to know if it's worth anything yet, or it's 18 months in, paid acquisition is getting expensive, and the marketing site has 40 pages Google has never shown anyone.

The second conversation is harder, so here's what I'd tell you at the first one.

## When to start

Do the setup before launch. It takes a day and it's the part that's expensive to change later: the domain, where the marketing site lives, how it renders, and Search Console from the first week so you have data when you need it.

Start publishing when you can describe the problem you solve in your buyers' words. Before that, you'll write pages for terms you think people use, and the pages will rank for nothing. For most teams this lines up with the first handful of paying customers, because those customers tell you how they searched before they found you. Ask them.

## The decisions that are expensive to undo

**Keep the marketing site on the main domain.** `yourapp.com/compare/x` builds on your domain's history. A separate marketing subdomain or a second domain starts from zero.

**Make sure the marketing pages render on the server.** If your site is a React single-page app, Google can still index it after rendering, but many AI crawlers don't run JavaScript at all. Vercel looked at its own network in December 2024 and found that none of the major AI crawlers rendered JavaScript, OpenAI's and Anthropic's included. Your positioning should be in the HTML.

**Pick the domain you'll keep.** Changing domains later is doable with redirects and Google's Change of Address tool, but you'll spend weeks watching rankings settle. If you're going to rebrand, do it before you publish.

**Keep the app out of the index.** Logged-in pages, staging sites and preview deployments should be behind a login or marked `noindex`, so Google spends its attention on pages buyers can use.

[What is technical SEO](/notes/what-is-technical-seo) explains each of these in plain terms.

![A team on laptops watching a colleague at a whiteboard](/notes/photos/seo-for-startups-1.webp "Photo: Austin Distel on Unsplash")

## The first pages to build

Before a blog, build the pages buyers search for when they're close to choosing:

- **One page per core use case.** "Invoice automation for agencies" beats a features list. Write it for the person with that job.
- **A comparison page against the tool people switch from.** Keep it fair and dated, and say who should stay with the other tool.
- **An alternatives page.** People search "[competitor] alternatives" when they're unhappy and ready to move.
- **Integration pages** for the tools you connect to, one each, with what the integration does and how to set it up.
- **A pricing page Google can read,** with prices in the HTML, what each plan includes, and the questions people ask before buying.

In [my citation study](/notes/ai-cited-vs-ranked-page), head-to-head questions ("X vs Y for Z") drew answers that named 5 to 12 companies, against 13 to 18 for broader questions. Fewer names means each one carries more weight, which is why comparison pages are worth building early. [SaaS comparison pages](/notes/saas-comparison-pages) covers how to write them without sounding like an ad.

## What to measure from day one

Connect Search Console and track sign-ups by landing page in your analytics. In the first months, watch impressions by page more than clicks: it's the earliest sign a page is being considered for queries. Clicks follow later.

Also keep a short list of the questions your buyers ask AI assistants, and check them monthly. In my study, between 34% and 54% of the companies assistants named also ranked in Google's top ten for the same question, depending on the assistant. Ranking still gets you into the conversation. [How to track AI search visibility](/notes/track-ai-search-visibility) has the method.

## What I'd skip early

- **A general blog about your industry.** Posts like "10 productivity tips" attract readers who will never buy. Write for buyers first.
- **Hundreds of templated pages.** Google's scaled content abuse policy covers "many pages generated for the primary purpose of manipulating search rankings and not helping users." A few dozen pages with something real on each beat a thousand with a swapped keyword.

## Where to start

This week: verify Search Console, check that your homepage and pricing page render without JavaScript, and ask five customers what they searched before they found you. The free [AI crawler check](/ai-search-optimization#check) handles the rendering test in ten seconds.

If you'd like the pages built and the fixes shipped as pull requests, that's my [SaaS SEO and AI search plan](/saas-seo): $1,000 a month, five clients at a time, no contract.
