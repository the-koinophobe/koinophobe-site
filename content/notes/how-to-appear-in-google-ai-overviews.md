---
title: "How to appear in Google AI Overviews: what Google says and what I measured"
slug: how-to-appear-in-google-ai-overviews
date: 2026-09-18
updated: 2026-11-06
draft: false
topic: ai
seo_title: "How to appear in Google AI Overviews"
seo_description: "How to show up in Google AI Overviews: Google says there are no special requirements, and my data shows it rarely cites the pages ranking under it. What to do."
excerpt: "Google says there are no special requirements to show up in AI Overviews. My data says the sources it picks are rarely the pages ranking underneath it. Both are true; here's the six-step version and what it means for your site."
cover: /notes/photos/how-to-appear-in-google-ai-overviews-cover.webp
cover_alt: "An Android phone showing the Google homepage on a white surface"
cover_credit: "Photo: charlesdeluvio on Unsplash"
faq:
  - q: "How do I get my website into Google AI Overviews?"
    a: "Google says a page has to be indexed and eligible to show with a snippet in Google Search, and that there are no additional requirements or special optimizations. Beyond that, answer the question directly at the top of the page, cover the related sub-questions, keep important facts in text, and get mentioned on other sites."
  - q: "Does ranking first on Google put me in the AI Overview?"
    a: "Not reliably. In my September 2026 study, only 2.2% of the pages cited in AI Overviews were also in Google's organic top ten for the same search, though 50.8% of the companies were. Google says AI Overviews may run several related searches behind the scenes, which helps explain it."
  - q: "Do I need schema or an llms.txt file to appear in AI Overviews?"
    a: "No. Google says there's no special structured data, AI text file or markup needed. Use the normal markup for what your page is, and keep it matching the visible text."
  - q: "Can I stop my site from appearing in AI Overviews?"
    a: "Google offers the same controls it uses for snippets: nosnippet, data-nosnippet, max-snippet and noindex. Blocking Google-Extended doesn't remove you from AI Overviews; Google says that token doesn't affect Search."
---

![A search results column with a summary box on top, a few links from the box landing on pages far down the column](/notes/illustrations/how-to-appear-in-google-ai-overviews.webp)

**The short answer:** there's no special trick. To show up in a Google AI Overview, a page has to be indexed and allowed to show a snippet. After that, six things raise your odds:

1. Answer the question in the first two or three sentences.
2. Cover the sub-questions, one heading each.
3. Keep prices, hours and services in text, not images or PDFs.
4. Keep your Business Profile current.
5. Get mentioned on forums, roundups and local news.
6. Skip "AI schema"; Google says none exists.

The rest of this note is why, with Google's own words and the numbers I measured.

## What Google says

From Google's "AI features and your website" page, in plain terms:

- **No special requirements.** "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."
- **The page must be indexed and snippet-eligible.** If Google can show it with a snippet in normal search, it can be a supporting link.
- **No special files or markup.** Google says you don't need new machine-readable files, AI text files or markup, and there's no special schema.org structured data to add.
- **Query fan-out.** AI Overviews and AI Mode may issue several related searches across subtopics to find supporting pages.
- **Reporting.** Clicks and impressions from AI features are counted in Search Console under the Web search type, mixed in with everything else.

So the official answer to "how do I get in" is: do good SEO, and don't block snippets.

![A black and silver laptop open on a desk](/notes/photos/how-to-appear-in-google-ai-overviews-1.webp "Photo: path digital on Unsplash")

## What I measured

In [my September 2026 study](/notes/ai-cited-vs-ranked-page), Google AI Overviews behaved unlike the chat assistants in three ways that matter for you.

**It rarely cites the pages ranking under it.** Only 2.2% of the pages cited in AI Overviews were also in the organic top ten for the identical search, on the same screen. But 50.8% of the companies were. Fan-out explains part of that; the Overview is drawing on searches you didn't type.

**It's the most stable.** Asked the same question three times, AI Overviews kept 62.7% of its cited pages in every run. ChatGPT kept 4.5%. Get into an AI Overview and you're more likely to stay there.

**It cites forums and roundups more.** 20.1% of its citations came from forums and social sites and 14.6% from independent roundups, more than any chat assistant. Being discussed elsewhere counts for more here. See [Reddit and AI search](/notes/reddit-ai-search).

On one run, Google showed no AI Overview at all for a query that had one the other times. They come and go.

## What fan-out looks like from the inside

My own Search Console shows the other side of this. In the three months to November 2026, one of my notes sat at position 2.1 for a 15-word question about checking whether AI search bots can crawl and parse decision-stage pages. Nobody types that into Google. It reads like a sub-question generated from a bigger one. I can't prove where it came from, since Search Console doesn't separate AI traffic, but the pattern is consistent: long, oddly specific questions where a page that answers that exact thing ranks near the top.

That's the case for writing one clear heading per sub-question.

## What I'd do for your site

**Cover the subtopics as well as the head term.** If fan-out searches related questions, the page that gets cited is often the one that answers a sub-question best. For "is a metal roof worth it in Florida," the sub-questions include cost, hurricane rating, insurance discounts, noise and lifespan. A page that handles each plainly, a heading per question, gives fan-out something to find.

**Put the direct answer first.** Two or three sentences that answer the question before the detail. That's the part that gets lifted.

**Keep your Business Profile and Merchant Center current.** Google lists this in its own recommendations for AI features. For local businesses, the profile is often where the facts come from.

**Make sure your text is text.** Prices in an image, opening hours in a PDF and services in a slider are hard to quote.

**Get mentioned off your site.** Forum threads, local news, industry roundups. AI Overviews leans on them more than the chat assistants do.

**Don't chase special schema.** Google says none is needed. Use correct markup for what your page is, and keep it matching the visible text. [Schema for AI search](/notes/schema-markup-for-ai-search) covers what's worth adding.

## How to see whether it's working

Search Console won't separate AI Overview clicks from regular clicks. Two workarounds:

- **Watch for the pattern.** Impressions up, clicks flat or down on informational questions often means an Overview is answering the question on the results page. I explain how to read that in [AI Overviews and traffic drops](/notes/ai-overviews-traffic-drop).
- **Check the questions by hand**, from an incognito window, for your 10 to 20 most important searches, monthly. Note whether an Overview shows and who it cites. My [tracking method](/notes/track-ai-search-visibility) keeps it consistent.

## What about opting out?

Some publishers want out. Google's controls are the snippet controls: `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex`. Blocking Google-Extended won't do it; Google says that token doesn't affect Search. For most businesses, being cited is worth more than staying out.

## Next steps

Pick your five most valuable searches and check them in incognito today: is there an Overview, and who's cited? Then look at [Google AI Mode](/notes/google-ai-mode-seo), which uses the same fan-out at a bigger scale.

If you'd rather hand it off, my [AI search optimization](/ai-search-optimization) service tracks AI Overviews alongside ChatGPT, Claude and Perplexity every month and builds the pages that get cited. It's a $300-a-month add-on to the SEO plan.
