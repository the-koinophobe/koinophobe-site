---
title: "JavaScript SEO for React sites: what Google sees, and what AI crawlers miss"
slug: javascript-seo-react
date: 2026-10-17
draft: false
topic: startups
seo_title: "JavaScript SEO for React: what Google and AI crawlers see"
seo_description: "Google renders JavaScript later, and most AI crawlers don't render it at all. How to test what a React site shows crawlers, and the fixes that matter."
excerpt: "Google can index a React single-page app, eventually. ChatGPT's and Claude's crawlers can't read one at all. How Google handles JavaScript, what Vercel found about AI crawlers, a two-minute test for your own site, and the fixes in order of effort."
cover: /notes/photos/javascript-seo-react-cover.webp
cover_alt: "A code editor showing React source code"
cover_credit: "Photo: Juanjo Jaramillo on Unsplash"
faq:
  - q: "Can Google index a React single-page app?"
    a: "Yes. Google crawls the page, queues it for rendering, runs the JavaScript in a headless browser and indexes the rendered HTML. Google says rendering may take a few seconds or longer, and it still recommends server-side rendering or pre-rendering because not all bots can run JavaScript."
  - q: "Do AI crawlers like GPTBot and ClaudeBot render JavaScript?"
    a: "Vercel analyzed AI crawler traffic on its network in December 2024 and found that none of the major AI crawlers rendered JavaScript, including those from OpenAI, Anthropic, Meta, ByteDance and Perplexity. Google's Gemini uses Googlebot's infrastructure and does render it."
  - q: "How do I check what crawlers see on my React site?"
    a: "Fetch the raw HTML with curl or View Source and search for your headline and key copy. Then use the URL Inspection tool in Google Search Console to see Google's rendered version. If the copy is missing from the raw HTML, crawlers that don't run JavaScript can't see it."
---

![The same React page as a browser sees it, full of content, and as a crawler that doesn't run JavaScript sees it, nearly empty](/notes/illustrations/javascript-seo-react.webp)

A lot of startups launch their marketing site as part of the React app. It looks perfect in the browser. Then months later someone asks why the pricing page doesn't rank, or why ChatGPT describes the product wrong.

Usually the answer is that the page's content only exists after JavaScript runs, and not every crawler runs it.

## How Google handles JavaScript

Google processes JavaScript pages in three phases: crawl, render, index. Googlebot fetches the HTML first. If the page needs JavaScript, it goes into a rendering queue, where a headless browser runs the scripts. Google indexes what comes out.

Google says a page "may stay on this queue for a few seconds, but it can take longer than that." For a site that publishes a few pages, that delay rarely matters. The bigger risks are the details:

- **Links need to be real links.** Google "can only discover your links if they are `<a>` HTML elements with an `href` attribute." A `div` with an `onClick` handler is invisible to it.
- **Routes need real URLs.** Use the History API for routing. Google ignores `#/pricing` style fragments when it looks for pages.
- **Missing pages need a 404.** In a single-page app, a "page not found" view usually returns a 200, which Google reports as a soft 404.
- **Don't fix `noindex` with JavaScript.** When Google sees `noindex` in the original HTML it may skip rendering, so a script that removes it later may never run.

Google still recommends server-side rendering or pre-rendering, because it's faster for users and because "not all bots can run JavaScript."

## AI crawlers mostly don't run it at all

In December 2024, Vercel published an analysis of crawler traffic across its network. Its finding: "none of the major AI crawlers currently render JavaScript." That covered OpenAI, Anthropic, Meta, ByteDance and Perplexity. Google's Gemini, which uses Googlebot's infrastructure, does render it, and so does AppleBot.

The volumes aren't small. In the month Vercel measured, GPTBot made about 569 million fetches on its network and Anthropic's crawler about 370 million, against about 4.5 billion for Googlebot.

So if your product description, pricing or comparison tables load with JavaScript, ChatGPT and Claude are working from whatever's left in the raw HTML. Often that's a title tag and an empty `div`. Blocked crawlers are the other common problem; [can ChatGPT read your site?](/notes/ai-crawlers-robots-txt) covers robots.txt and CDN settings.

![A laptop with code on the screen on a desk](/notes/photos/javascript-seo-react-1.webp "Photo: James Harrison on Unsplash")

## A two-minute test

1. Run `curl -s https://yoursite.com/pricing` or open View Source in your browser (not Inspect, which shows the rendered page).
2. Search the output for your headline, a price and a sentence from the middle of the page.
3. In Google Search Console, run the URL Inspection tool on the same page and open the tested page's HTML and screenshot.

If the text is in step 3 but missing in step 2, Google can see the page and most AI crawlers can't. The free [AI crawler check](/ai-search-optimization#check) runs a version of step 2 for your homepage and tells you how much text a non-rendering crawler gets.

## The fixes, in order of effort

**Move the marketing site to a framework that renders on the server.** Next.js, Remix, Astro and similar frameworks send finished HTML. For most startups this is the right long-term answer. My [Next.js SEO checklist](/notes/nextjs-seo-checklist) covers what to check after the move.

**Split the marketing site from the app.** Keep `yoursite.com` as a server-rendered or static site and put the product at `app.yoursite.com`. The app can stay a single-page app; it's behind a login anyway.

**Pre-render the public pages.** If a rebuild isn't on the table, pre-rendering generates static HTML for each public route at build time. It covers pages that don't change per visitor, which is most marketing pages.

**At minimum, put the essentials in the HTML.** Title, meta description, canonical, headline and a paragraph describing the product, all in the initial response. It's a stopgap until one of the fixes above is done.

## Where to start

Run the test on your homepage and pricing page today. If the copy is missing from the raw HTML, the fix belongs on the roadmap before more content does, because new pages will have the same problem. [SEO for startups](/notes/seo-for-startups) covers the other early decisions.

If you'd like help with the move, my [SaaS SEO plan](/saas-seo) ships fixes as pull requests your team reviews, at $1,000 a month with no contract.
