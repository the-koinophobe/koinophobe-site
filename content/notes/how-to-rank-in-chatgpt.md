---
title: "How to rank in ChatGPT: what I measured, and what I'd do for your business"
slug: how-to-rank-in-chatgpt
date: 2026-10-08
draft: false
topic: ai
seo_title: "How to rank in ChatGPT (from a 96-run study)"
seo_description: "There's no fixed ranking in ChatGPT, but there is a pool it cites from. How to get your business into it, based on a 96-run study of AI citations."
excerpt: "There is no ranking in ChatGPT the way there is on Google. There is a pool of pages it can cite and a habit of naming the companies Google already trusts. How to get into both, from my own measurements."
cover: /notes/photos/how-to-rank-in-chatgpt-cover.webp
cover_alt: "A laptop on a desk showing ChatGPT's \"What can I help with?\" screen"
cover_credit: "Photo: Aerps.com on Unsplash"
faq:
  - q: "Can you rank in ChatGPT like you rank on Google?"
    a: "Not in the same way. ChatGPT doesn't keep a fixed list of results. Each answer cites a handful of pages, and in my September 2026 study only 4.5% of ChatGPT's cited pages came back in all three runs of the same question. You can get into the pool it draws from, but no single position holds still."
  - q: "How do I get my business mentioned by ChatGPT?"
    a: "Make sure OpenAI's search crawler, OAI-SearchBot, can reach your site, rank on Google for the questions your customers ask, and publish pages worth quoting: guides, comparisons and plain answers. In my study, 40.5% of the companies ChatGPT cited also ranked in Google's top ten for the same question."
  - q: "Does ChatGPT use Google or Bing results?"
    a: "OpenAI doesn't publish which index it uses for every answer. What it does say is that any public website can appear in ChatGPT search as long as OAI-SearchBot isn't blocked. My own data shows ChatGPT and Google agree on companies far more than on pages, so ranking on Google helps without guaranteeing anything."
---

![Three groups of dots: 278 pages found, 244 read and 214 cited by four AI assistants](/notes/illustrations/how-to-rank-in-chatgpt.webp)

Business owners ask me some version of this every week now: "How do I get ChatGPT to recommend us?" The honest answer starts with a correction. ChatGPT doesn't rank anything the way Google does. There is no position three to climb to.

What there is: a pool of pages ChatGPT can cite, and a strong habit of naming companies that Google already trusts. I measured both on September 11, 2026, in [a 96-run citation study](/notes/ai-cited-vs-ranked-page). This note turns that study into a plan you can follow, whatever you sell.

## What "ranking" means inside ChatGPT

When ChatGPT searches the web for an answer, it pulls a handful of pages, writes a reply, and links some of them. In my study it cited a median of six sources per answer.

Then I asked the same question again, in a fresh chat, twice more. Only 4.5% of the pages ChatGPT cited appeared in all three answers. On three of the four questions I repeated, the second and third answers shared no pages at all with the first.

So "ranking in ChatGPT" means getting into the pool it keeps drawing from, often enough that you show up in a good share of answers. A screenshot of one answer, good or bad, tells you very little.

![A person typing on a laptop at a table](/notes/photos/how-to-rank-in-chatgpt-1.webp "Photo: Berke Citak on Unsplash")

## The three things that decide whether you're in the pool

### 1. ChatGPT can read your site

OpenAI's help center says any public website can appear in ChatGPT search, and the one condition it names is not blocking OAI-SearchBot. That crawler is separate from GPTBot, which collects training data. Plenty of sites block GPTBot on purpose and that's fine. The ones in trouble block OAI-SearchBot by accident, through an old robots.txt list or a CDN bot setting.

Two more ways to be invisible: a page that shows no text until JavaScript runs, and a firewall that answers crawlers with a challenge page. I cover all three in [AI crawlers and robots.txt](/notes/ai-crawlers-robots-txt). The [free crawler check](/saas-seo#check) tests your site in ten seconds.

### 2. You rank on Google for the same questions

This surprised people when I published it. ChatGPT and Google rarely cite the same pages: only 5.3% of the pages ChatGPT cited were in Google's top ten for the same question. But they agree on companies: 40.5% of the companies ChatGPT cited also ranked there.

Read those two numbers together and the advice is plain. Ranking on Google gets your company into the conversation. Which of your pages gets quoted is a separate question.

### 3. You have a page worth quoting

Across all four assistants I measured, the pages that got cited were article-shaped: guides, comparisons, roundups. 41.6% of cited pages carried Article markup, against none of the pages that ranked on Google and were never cited. Product and pricing pages ranked and got passed over.

If your site is a homepage, a services page and a contact form, an assistant has nothing to quote except your name. Give it something. I wrote about [content that AI assistants cite](/notes/content-ai-cites) separately.

## What I'd do this month, in order

**Week one, access.** Read your robots.txt. Check your CDN or firewall bot settings. View the source of your homepage and confirm your text is there before JavaScript runs. Fix whatever's broken. Nothing else matters until this is done.

**Week two, the questions.** Write down the 10 to 20 questions a customer would ask before buying from you. "Best accountant for a small restaurant in Austin." "Shopify app that handles subscriptions." "Is a metal roof worth it in Florida." Ask them in ChatGPT, Claude, Perplexity and Google, and note who gets named. That's your baseline. My [AI visibility tracking method](/notes/track-ai-search-visibility) shows how to run it so the numbers mean something.

**Week three, the pages.** For the questions where competitors get named and you don't, write the page that answers the question better than what's cited now. Direct answer first, facts with dates, a named author, Article or BlogPosting markup.

**Week four, the mentions.** Assistants name companies that other sites talk about. Get listed where your customers compare options: directories, review sites, industry roundups, local press. More on that in [brand mentions and AI search](/notes/brand-mentions-ai-search).

Then measure again with the same questions, and keep going.

## What doesn't work, or isn't proven

- **An llms.txt file.** Google's John Mueller said in June 2025 that no AI system currently uses it. Details in [does llms.txt help](/notes/llms-txt).
- **Special "AI schema."** Google says there's no special structured data needed for its AI features. Article markup lined up with citation in my study, but as a trace of article-shaped pages; adding it to a page on its own has no proven effect. See [schema markup for AI search](/notes/schema-markup-for-ai-search).
- **Anyone who guarantees ChatGPT placement.** With 4.5% of citations surviving a rerun, nobody can promise you a spot. If someone does, ask how they'll measure it next week.

## Where this fits with Google

Every step above also helps on Google. That's the useful part. You aren't choosing between SEO and "AI SEO"; the second depends on the first. I wrote a longer take on that in [is SEO dead](/notes/is-seo-dead).

## Next steps

Run the [free AI crawler check](/saas-seo#check) on your domain. If it comes back clean, start the question list from week two today.

If you'd rather hand the loop off, that's what my [AI search optimization](/ai-search-optimization) service does: the access fixes, the tracking with repeated runs, and the pages, every month, for $1,000 with no contract.
