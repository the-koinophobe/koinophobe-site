---
title: "SaaS comparison pages: what my citation study says about vs and alternatives pages"
slug: saas-comparison-pages
date: 2026-10-06
draft: false
topic: ai
seo_title: "SaaS comparison and alternatives pages that get cited"
excerpt: "Head-to-head questions pull from the smallest pool of sources of any query type I measured. What that means for your \"vs\" and \"alternatives\" pages, and how I build one."
cover: /notes/illustrations/saas-comparison-pages.webp
cover_alt: "Field survey plate: two columns of tick marks face each other across a center rule, with a narrow funnel of sources between them"
faq:
  - q: "Do AI assistants cite vendor comparison pages?"
    a: "They cite vendor pages a lot. In my September 2026 study, 71.5% of the pages assistants cited were vendor-owned. That was one category, and the share didn't separate cited pages from pages that ranked, but it rules out the idea that assistants only trust third parties."
  - q: "Should a SaaS company build alternatives pages for its competitors?"
    a: "If buyers search for alternatives to a tool you replace, yes. Those pages reach people already leaving, and for a new category they're often the only search demand that exists yet."
  - q: "What makes a comparison page more likely to be cited?"
    a: "Nothing guarantees it. In my study, cited vendor pages were article-shaped: 45.1% carried Article markup, against none of the 18 vendor pages that ranked and weren't cited. Write it as an article with a direct answer, dated facts and a named author."
---

When a buyer asks an assistant "Firecrawl vs Apify", it doesn't survey every tool in the category. It reaches for a handful of pages about those two products. That small pool is the best opening a software company has in AI search, because a smaller pool means each page in it gets a bigger share of the answer.

This is what my [citation study](/notes/ai-cited-vs-ranked-page) says about comparison questions, and how I build "vs" and "alternatives" pages because of it.

## What the study found about head-to-head questions

The study ran twelve buyer questions about web scraping APIs through ChatGPT, Claude, Perplexity and Google AI Overviews. Four of the questions named two vendors. Here's how many distinct companies the four assistants cited between them, by type of question:

| Question type | Example | Companies cited, across four assistants |
| --- | --- | --- |
| Open-ended | "what is the best web scraping API in 2026" | 14 to 18 |
| Constraint-led | "cheapest web scraping API with proxy rotation" | 13 to 18 |
| Head to head | "Zyte vs Apify pricing comparison" | 5 to 12 |

"Zyte vs Apify pricing comparison" drew on five companies in total. "Scraping API that handles Cloudflare protection" drew on eighteen. Naming two products narrows the field hard.

Two more numbers shape how I write these pages:

**Vendor pages get cited.** 71.5% of the pages the assistants cited were vendor-owned. That share didn't separate cited pages from the ones that ranked (60.0%, and the intervals overlap), so it isn't evidence that assistants prefer vendors. It does show they don't shut vendors out. In that category there was little else to cite: Google's own top ten was 71.8% vendor-owned.

**Cited pages were article-shaped.** Among vendor pages only, 45.1% of the ones that got cited carried Article markup. None of the 18 vendor pages that ranked and were never cited did. Within a vendor's own site, assistants reached for blog posts and guides, and the product and pricing pages were the ones that ranked and got passed over.

That second finding is a correlation from one category over one evening. Whether adding Article markup to a product page would change anything, the study can't say. What it does say is that a comparison page built like a product page, with a feature grid and a "Start free trial" button, looks like the control group.

One more caveat, from the same study. I argued there that "optimize this page to get cited" is the wrong frame for now, because answers move too much between runs to pin a change on one page. So read what follows as how to build the kind of page that keeps showing up in the pool, judged over months of repeated runs. One answer won or lost on one day tells you very little either way.

## Two pages, two jobs

**"You vs them"** is for a buyer who already has two names on a list. They want the difference, fast, from someone who has used both. Title it with both names and the deciding factors: "YourApp vs Acme: pricing, limits, setup".

**"Alternatives to them"** is for a buyer leaving an incumbent. They know what's wrong with it and want options. This page is also where a new category finds search demand. If nobody searches for what you call your category yet, people do search for alternatives to the tool you replace.

You need both for each competitor that matters. They catch different moments, and they link to each other.

## How I build one

The order of the page:

1. **A direct answer in the first paragraph.** Who should pick which, and why, in two or three sentences. An assistant summarizing the page can lift it, and a reader who stops there still got what they came for.
2. **A comparison table with dated facts.** Price, limits, free tier, the integrations buyers ask about. Put "Prices checked October 2026" above it. Assistants repeat stale prices, and a date tells both readers and crawlers how fresh the page is.
3. **Where the competitor wins.** Say it plainly. A page that never concedes a point reads as an ad, and buyers skim past ads.
4. **The detail.** Setup, real limits you've hit, migration steps if you're the alternative. This is where the page earns its length. Cited pages in my study had a median of about 2,500 words against about 2,100 for pages that ranked; treat that as description, since no interval was computed on it.
5. **Article or BlogPosting markup** with a named author, `datePublished` and `dateModified`.
6. **Links in.** From your pricing page, your docs, your homepage footer, and between your comparison pages. A comparison page nobody links to is hard for any crawler to find.

And underneath all of it, the page has to be readable before JavaScript runs. If your marketing site is client-rendered, start with [AI crawler access](/notes/ai-crawlers-robots-txt) before you write anything.

## Keeping them true

Comparison pages go stale faster than anything else on a software site. The competitor changes its pricing, ships the feature you said it lacked, and your page is now wrong in a way buyers notice and assistants repeat.

I put every comparison page on a quarterly check: re-verify the table, update `dateModified`, and change the date line. If a claim can't be verified from the competitor's own public pages, it comes out.

## What I'd skip

- **"Top 10" roundups on your own domain where you win every row.** It's still a vendor page, and readers know it.
- **Claims about a competitor you can't link to a source for.** They're a legal problem as well as a credibility one.
- **One template with the names swapped.** Ten near-identical pages read like doorway pages to Google and like nothing at all to a buyer.

## Next steps

Pick the two competitors your buyers mention most on sales calls and build one "vs" page and one "alternatives" page for each. Then [track whether they get cited](/notes/track-ai-search-visibility), using repeated runs, since one answer from ChatGPT tells you very little.

Comparison and alternatives pages are part of every month on the [Search + AI plan](/saas-seo). If you'd like to see where you stand first, the [free crawler check](/saas-seo#check) takes ten seconds.
