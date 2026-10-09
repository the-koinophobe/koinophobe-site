---
title: "Perplexity SEO: how to get your site cited by Perplexity"
slug: perplexity-seo
date: 2026-09-20
draft: false
topic: ai
seo_title: "Perplexity SEO: how to get cited by Perplexity"
seo_description: "How Perplexity picks sources, measured: four per answer and a strong lean toward companies Google ranks. Steps to make your pages eligible to be cited."
excerpt: "Perplexity shows its sources more prominently than any other assistant, and it cites fewer of them per answer. What I measured about how it picks sources, and the steps that make your pages eligible."
cover: /notes/photos/perplexity-seo-cover.webp
cover_alt: "A small team working together around laptops"
cover_credit: "Photo: Annie Spratt on Unsplash"
faq:
  - q: "How does Perplexity choose its sources?"
    a: "Perplexity doesn't publish a ranking formula. Its documentation says PerplexityBot surfaces and links websites in search results and isn't used to train AI models. In my September 2026 study Perplexity cited a median of four sources per answer, and 54.3% of the companies it cited also ranked in Google's top ten for the same question."
  - q: "Should I block PerplexityBot?"
    a: "Only if you don't want to appear in Perplexity's answers. Perplexity says PerplexityBot isn't used to crawl content for AI foundation models, so blocking it mainly removes you from its search results."
  - q: "Does Perplexity respect robots.txt?"
    a: "Perplexity documents PerplexityBot as the crawler to allow in robots.txt if you want to appear in its search results. Its user-triggered fetcher, Perplexity-User, generally ignores robots.txt because a person asked for the page."
---

![Rows of seats showing median sources per answer: Claude 9, AI Overviews 7, ChatGPT 6, Perplexity 4](/notes/illustrations/perplexity-seo.webp)

Perplexity is the assistant that looks most like a search engine. Every answer comes with a numbered rail of sources, and people click them. For a business, that makes a Perplexity citation worth more than a mention buried in a chat reply.

It's also picky. Here's what I measured about how it chooses, and what you can control.

## How Perplexity behaves, measured

From [my September 2026 citation study](/notes/ai-cited-vs-ranked-page), across the same 12 buyer questions on four assistants:

| | Perplexity | ChatGPT | Claude | Google AI Overviews |
| --- | --- | --- | --- | --- |
| Median sources per answer | 4 | 6 | 9 | 7 |
| Distinct companies cited | 24 | 25 | 36 | 42 |
| Same company also in Google's top ten | 54.3% | 40.5% | 34.2% | 50.8% |
| Same page also in Google's top ten | 2.0% | 5.3% | 11.6% | 2.2% |
| Sources kept across three runs | 33.5% | 4.5% | 18.8% | 62.7% |

Three things stand out:

**Fewest sources.** Four per answer means fewer seats. Being one of them is harder, and worth more.

**Strongest company overlap with Google.** More than half the companies Perplexity cited also ranked in Google's top ten. Of the four assistants, it leaned hardest on companies Google already ranks.

**Almost no page overlap.** Only 2.0% of the pages it cited were in that top ten. It picks the company Google trusts and then a different page from that company, or about it.

![Close-up of an AI chat answer on a computer screen](/notes/photos/perplexity-seo-1.webp "Photo: Jonathan Kemper on Unsplash")

## What you control

### Let PerplexityBot in

Perplexity's documentation says PerplexityBot surfaces and links websites in search results and isn't used to train AI foundation models. That makes it an easy decision for most businesses: allow it. Check your robots.txt and your CDN or firewall bot rules. The [free crawler check](/saas-seo#check) reads your robots.txt for PerplexityBot and nine other crawlers.

Its other fetcher, Perplexity-User, opens a page when a person asks about it, and Perplexity says it generally ignores robots.txt for that reason.

### Rank on Google for the company, write for the page

The table says it plainly: Perplexity picks companies Google ranks, then a page that answers the specific question. So you need both:

- **Google visibility for your company** on the questions buyers ask. Ordinary SEO.
- **A page shaped like an answer** to each of those questions. Direct answer first, facts, dates, an author. Across all four assistants, 41.6% of cited pages carried Article markup against none of the pages that ranked and weren't cited.

### Be specific

With four seats per answer, the page that wins is usually the one that answers the exact question. "Cheapest scraping API with proxy rotation" drew citations from 13 companies across four assistants in my study. "Zyte vs Apify pricing comparison" drew from five. Specific questions narrow the field, and a page that matches one exactly has a better shot. That's why I start clients with [comparison and alternatives pages](/notes/saas-comparison-pages).

### Keep facts fresh

Perplexity shows its sources next to the answer, so readers see what's cited. A page with last year's prices gets the click and loses the customer. Date your facts and keep them current.

## How to check your Perplexity visibility

Ask Perplexity your 10 most important buyer questions. Note who's in the source rail. Repeat each question twice more in new threads; in my study Perplexity kept about a third of its sources between runs, so you need more than one look. Track it monthly with the [method I use](/notes/track-ai-search-visibility).

Then compare with ChatGPT and Google's AI Overviews. In my data, Perplexity agreed with Claude more than with any other assistant (37.1% company overlap) and with Google AI Overviews least (17.0%). Doing well in one doesn't mean doing well in all.

## Next steps

Allow PerplexityBot, then pick the three questions where a competitor is in Perplexity's source rail and you aren't. Build the page that answers each one better. [Content that AI cites](/notes/content-ai-cites) has the structure.

My [AI search optimization](/ai-search-optimization) service tracks Perplexity alongside ChatGPT, Claude and Google every month and writes the pages. $1,000 a month, no contract.
