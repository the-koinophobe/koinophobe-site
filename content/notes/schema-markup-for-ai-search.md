---
title: "Schema markup for AI search: what my data shows and what Google says"
slug: schema-markup-for-ai-search
date: 2026-09-22
draft: false
topic: ai
seo_title: "Schema markup for AI search: what matters"
seo_description: "Does schema help you get cited by ChatGPT or AI Overviews? Having it made no difference in my study; one type did. Which markup to add and why."
excerpt: "Does structured data help you get cited by ChatGPT or AI Overviews? Having schema at all made no measurable difference in my study. One type did line up with citations. Which schema I'd add, and why."
cover: /notes/photos/schema-markup-for-ai-search-cover.webp
cover_alt: "A computer screen filled with structured data"
cover_credit: "Photo: 1981 Digital on Unsplash"
faq:
  - q: "Does schema markup help with AI search?"
    a: "Not in a simple way. In my September 2026 study, having any structured data didn't separate pages AI assistants cited from pages that ranked and weren't cited. Article or BlogPosting markup did: 41.6% of cited pages had it, against none of the comparison group. Google says no special schema is needed for its AI features."
  - q: "What schema should a small business use?"
    a: "Organization or a specific LocalBusiness type on the homepage, Article or BlogPosting on articles, Product on product pages, FAQPage only where the questions and answers are visible on the page, and BreadcrumbList for navigation. Keep every value matching the visible text."
  - q: "Is there special schema for ChatGPT or AI Overviews?"
    a: "No. Google says there is no special schema.org structured data you need to add for AI Overviews or AI Mode. OpenAI's publisher documentation doesn't name any either."
---

![Six measured bars for page properties, five overlapping between groups and one, Article markup, separated clearly](/notes/illustrations/schema-markup-for-ai-search.webp)

"Add schema for AI" is in nearly every AI SEO checklist I've read. It sounds technical enough to be true. I measured it, and the answer is more interesting than yes or no.

## What I measured

In [my September 2026 citation study](/notes/ai-cited-vs-ranked-page), I compared 214 pages that AI assistants cited against 30 pages that ranked in Google's top ten for the same questions and were never cited. Two schema measures:

| Measure | Cited pages | Ranked, never cited | Verdict |
| --- | --- | --- | --- |
| Any structured data (JSON-LD) | 74.3% | 83.3% | Inside the noise |
| Article or BlogPosting markup | 41.6% | 0.0% | Separates the groups |

Having schema at all didn't help. If anything it pointed the wrong way, though the gap was inside the noise. Article markup was the only property of six that separated the groups, and it held when I compared vendor pages only: 45.1% of cited vendor pages had it, and 0 of 18 vendor pages that ranked without being cited.

## What that result means

It doesn't mean Article markup is a switch. Within a company's own site, the pages that got cited were blog posts and guides. The pages that ranked without being cited were product and pricing pages. Article markup lives on articles, so it's a trace of which kind of page gets cited.

The honest reading: assistants cite article-shaped pages, and Article markup is the machine-readable mark of an article. Whether adding it to a product page would change anything, nobody has tested, including me.

![Close-up of code and data on a monitor](/notes/photos/schema-markup-for-ai-search-1.webp "Photo: 1981 Digital on Unsplash")

## What Google says

Google's guidance for AI Overviews and AI Mode is direct: there's "no special schema.org structured data that you need to add." It also asks that structured data match the visible text on the page. OpenAI's documentation for ChatGPT search doesn't mention schema at all.

## The schema I'd add anyway

Schema is still worth doing right, because it helps search engines understand your pages and qualifies you for rich results. For a typical business:

- **Homepage:** Organization, or the specific LocalBusiness type that fits (Dentist, Plumber, RoofingContractor, Restaurant). Name, logo, phone, address or service area, opening hours, links to your profiles. It should match your Google Business Profile word for word. [Example for roofers](/notes/roofing-contractor-schema).
- **Articles and guides:** Article or BlogPosting with headline, author (a real person with a bio page), datePublished and dateModified.
- **Product pages:** Product with price, availability and reviews where you have them. Ecommerce stores should keep this consistent with their product feed, which matters for [ChatGPT shopping](/notes/chatgpt-shopping-products) too.
- **FAQ:** FAQPage only for questions that are visible on the page. Hidden FAQ schema is against Google's guidelines.
- **Navigation:** BreadcrumbList.

Every value should match what a person sees on the page. Markup that disagrees with the visible text is worse than none.

## What I wouldn't do

- **Pay for an "AI schema package."** There's no AI-specific schema type.
- **Stuff schema with keywords.** Search engines treat markup that doesn't match the page as spam.
- **Expect schema to fix a page nobody would quote.** If a page doesn't answer a question clearly, markup won't get it cited. [Content that AI cites](/notes/content-ai-cites) is where the effort pays off.

## How to check yours

Paste a URL into Google's Rich Results Test or the Schema Markup Validator. Check that your Organization or LocalBusiness block exists, your articles carry Article or BlogPosting with an author and dates, and nothing contradicts the visible page.

## Next steps

Fix the homepage block and the article markup first; they're the two that matter most for how machines understand who you are and what you've written. Then run the [free AI crawler check](/saas-seo#check), because markup on a page no crawler can reach does nothing.

My [AI search optimization](/ai-search-optimization) service includes schema fixes in the 50+ page fixes each month, shipped as code you can review. $1,000 a month, no contract.
