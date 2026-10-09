---
title: "Does llms.txt help SEO or AI search? What the evidence says"
slug: llms-txt
date: 2026-09-21
draft: false
topic: ai
seo_title: "Does llms.txt help SEO or AI search?"
seo_description: "Google says no AI system currently uses llms.txt. What the file is, when it's worth adding anyway, and what to do instead if you want AI to cite you."
excerpt: "llms.txt is a proposed file that lists your important pages for AI models. Google has said no AI system currently uses it. When it's worth adding anyway, and what to do instead if you want to be cited."
cover: /notes/photos/llms-txt-cover.webp
cover_alt: "A computer screen full of text from an AI assistant"
cover_credit: "Photo: Emiliano Vittoriosi on Unsplash"
faq:
  - q: "What is llms.txt?"
    a: "llms.txt is a proposed standard: a Markdown file at the root of a website, such as yoursite.com/llms.txt, that lists and summarizes the site's most useful pages for large language models. It was proposed in 2024 and is not part of any search engine's official requirements."
  - q: "Does Google use llms.txt?"
    a: "Google's John Mueller said on June 17, 2025 that no AI system currently uses llms.txt. Google's documentation for AI Overviews and AI Mode also says you don't need new machine-readable files or AI text files to appear in those features."
  - q: "Should I add an llms.txt file to my site?"
    a: "It won't hurt, and it takes minutes, but don't expect it to get you cited. Spend the effort on letting AI crawlers in through robots.txt, keeping your text readable without JavaScript, and publishing pages that answer real questions."
---

![A small text file on the left with dashed lines toward a row of crawlers, none of the lines reaching them](/notes/illustrations/llms-txt.webp)

Every few weeks a business owner forwards me an agency proposal with "llms.txt implementation" as a line item. It's usually priced like it matters. Here's what it is and what the evidence says.

## What llms.txt is

llms.txt is a proposed file, first suggested in 2024, that sits at the root of your website (yoursite.com/llms.txt). It's written in Markdown and lists your most useful pages with short descriptions, so a large language model can find the good parts of your site without crawling all of it. Think of it as a hand-written sitemap for AI.

The idea is reasonable. The question is whether anything reads it.

![A laptop with charts open on a desk](/notes/photos/llms-txt-1.webp "Photo: Lukas Blazek on Unsplash")

## What the companies say

**Google.** John Mueller, a search advocate at Google, said on Bluesky on June 17, 2025: "FWIW no AI system currently uses llms.txt." He added that the consumer chatbots fetch pages but not that file. Google's own guidance for AI Overviews and AI Mode says you don't need to create new machine-readable files, AI text files or markup to appear in them.

**OpenAI.** Its publisher documentation talks about one thing for ChatGPT search: don't block OAI-SearchBot in robots.txt. It doesn't mention llms.txt.

**Anthropic and Perplexity.** Their crawler documentation describes their bots and how robots.txt controls them. Neither tells site owners to add llms.txt for search visibility.

If something changes, the companies will say so in their documentation, the same way they documented their crawlers. Until then, llms.txt is a proposal with no confirmed reader among the big assistants.

## What does control AI access

**robots.txt.** This is the file every major AI company documents. It decides whether OAI-SearchBot, Claude-SearchBot, PerplexityBot and Googlebot can fetch your pages. A wrong line here can make you invisible to ChatGPT while you rank fine on Google. [How to read yours](/notes/ai-crawlers-robots-txt).

**Your firewall or CDN.** Since July 2025, Cloudflare blocks AI crawlers by default unless the owner allows them. That setting lives in the dashboard, not in any file on your site.

**Readable pages.** Many AI crawlers fetch raw HTML and don't run JavaScript. If your text only appears after scripts run, a crawler sees an empty page, file or no file.

## When adding llms.txt makes sense

- **Developer documentation.** Some coding tools and AI agents fetch llms.txt files from documentation sites when a developer points them at one. If you sell software with public docs, a clean llms.txt helps those users. That's a product decision, not an SEO one.
- **It's nearly free.** If your developer can generate one in ten minutes from your sitemap, fine. Just don't count it as AI visibility work.

## When it's a red flag

When it's sold as the main deliverable, or priced as if it moves rankings. If an agency leads with llms.txt and doesn't mention robots.txt, crawler access, or how they'll measure your presence in AI answers, they're selling the trend. I listed better questions to ask in [how to hire an AI SEO agency](/notes/hire-ai-seo-agency).

## What to do instead

1. Run the [free AI crawler check](/saas-seo#check) to confirm OAI-SearchBot, Claude-SearchBot and PerplexityBot can get in.
2. Make sure your important text is in the page's raw HTML.
3. Publish pages that answer the questions your customers ask, in the shape assistants cite. In [my September 2026 study](/notes/ai-cited-vs-ranked-page), 41.6% of cited pages carried Article markup, against none of the pages that ranked on Google and were never cited.
4. Measure whether it's working with [repeated runs](/notes/track-ai-search-visibility), not screenshots.

## Next steps

If you already have an llms.txt, leave it. If you don't, don't rush. Read [how to rank in ChatGPT](/notes/how-to-rank-in-chatgpt) for the steps that have evidence behind them.

My [AI search optimization](/ai-search-optimization) service starts with the access fixes that work by definition and measures everything after. $1,000 a month, no contract.
