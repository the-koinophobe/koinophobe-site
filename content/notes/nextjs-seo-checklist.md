---
title: "Next.js SEO checklist for the App Router: what I check before a launch"
slug: nextjs-seo-checklist
date: 2026-10-14
draft: false
topic: startups
seo_title: "Next.js SEO checklist for the App Router"
seo_description: "The Next.js App Router SEO checklist I run before launch: metadata, canonicals, sitemap.ts, robots.ts, rendering, status codes, redirects and schema."
excerpt: "Next.js gives you most of what SEO needs, but the defaults leave gaps. The checklist I run on App Router sites before launch, my own included: metadata, canonicals, sitemap and robots files, rendering, status codes, redirects and structured data."
cover: /notes/photos/nextjs-seo-checklist-cover.webp
cover_alt: "A laptop screen showing colorful code"
cover_credit: "Photo: Mohammad Rahmani on Unsplash"
faq:
  - q: "Is Next.js good for SEO?"
    a: "Yes. Server components render HTML on the server by default, next/link outputs real anchor links, and the App Router has built-in files for metadata, sitemaps and robots.txt. Most SEO problems on Next.js sites come from pushing content into client components or from missing canonicals and status codes."
  - q: "How do I add a sitemap in the Next.js App Router?"
    a: "Create app/sitemap.ts that exports a default function returning an array of URLs with optional lastModified dates. Next.js serves it at /sitemap.xml. Reference it in app/robots.ts and submit it in Google Search Console."
  - q: "How do I set canonical URLs in Next.js?"
    a: "Set metadataBase in the root layout, then add alternates.canonical in each page's metadata or generateMetadata. Relative paths resolve against metadataBase, so every page ends up with an absolute canonical URL."
---

![A Next.js page passing a row of launch checks, from metadata to schema](/notes/illustrations/nextjs-seo-checklist.webp)

My own site runs on Next.js 14 with the App Router, and so do several of the startup sites people send me. Next.js handles most of the SEO basics well. The problems I find come from gaps in the defaults and from content that quietly moved into client components.

This is the checklist I run before a launch. Each item takes a few minutes to check. If you're still choosing a stack, [SEO for startups](/notes/seo-for-startups) covers the decisions that are expensive to undo.

## Metadata

- **`metadataBase` in the root layout.** Without it, relative URLs in canonicals and Open Graph images don't resolve to your real domain.
- **A title template.** `title: { default: "Brand", template: "%s · Brand" }` in the root layout, then a short `title` on each page.
- **A description on every page.** Write it for the person reading search results. Template sites often repeat one description across 50 pages, and Google tends to rewrite those.
- **`generateMetadata` for dynamic routes.** Blog posts, docs pages and anything from a CMS should build their title, description and canonical from the content.

## Canonicals

Add `alternates: { canonical: "/pricing" }` to each page's metadata. With `metadataBase` set, Next.js outputs the absolute URL. Google calls `rel="canonical"` a strong signal and recommends absolute URLs and a self-referencing canonical on each page.

Watch for pages that exist at two paths, such as `/blog/post` and `/blog/post?ref=x`, or a trailing slash and no trailing slash. Pick one with the `trailingSlash` option and keep internal links consistent.

## Sitemap and robots

- **`app/sitemap.ts`** returns your URLs with `lastModified` dates. Use real dates from your content. Google says it uses `lastmod` only when it's "consistently and verifiably" accurate, and it ignores `priority` and `changefreq`.
- **Split big sitemaps.** A single sitemap is capped at 50,000 URLs or 50MB uncompressed. Next.js has `generateSitemaps` for this.
- **`app/robots.ts`** points to the sitemap. Don't block `/_next/`: Google needs your CSS and JavaScript to render pages.
- **Submit the sitemap** in Google Search Console and Bing Webmaster Tools once the site is live.

![A computer screen showing HTML code](/notes/photos/nextjs-seo-checklist-1.webp "Photo: Mohammad Rahmani on Unsplash")

## Rendering

This is where most Next.js SEO problems come from.

- **Keep page content in server components.** A `"use client"` at the top of a page file sends the content as JavaScript. Google will render it later, but many AI crawlers don't run JavaScript at all. Vercel found in December 2024 that none of the major AI crawlers did, OpenAI's and Anthropic's included. [Can ChatGPT read your site?](/notes/ai-crawlers-robots-txt) covers the other half of AI crawler access.
- **Check the raw HTML.** Run `curl -s https://yoursite.com/pricing | grep "your headline"`. If the text isn't there, crawlers that don't render can't see it.
- **Check where metadata lands.** Recent Next.js versions can stream metadata after the page starts loading, and keep it in the `<head>` for bots that only read HTML. Confirm your title and canonical are in the first response.
- **Use `next/link` for navigation.** It renders a real `<a href>`. Google can only discover links that are `<a>` elements with an `href`; a button that calls `router.push` is invisible to it.

## Status codes and redirects

- **Call `notFound()` for missing content.** It returns a real 404. A "not found" message on a 200 page is a soft 404, and Google reports those separately.
- **Use permanent redirects for moved pages.** `permanentRedirect()` in a server component, or `redirects()` in `next.config.js` with `permanent: true`. Google recommends 301 or 308 for permanent moves.
- **Pick one host.** Redirect `www` to the bare domain or the reverse, in one hop.
- **Keep previews out of Google.** Preview deployments and staging domains should send `noindex` or sit behind a login. Check your host's default rather than assuming.

## Structured data and images

- **Render JSON-LD in a server component** as a `<script type="application/ld+json">` tag. Organization on the homepage, Article or BlogPosting on posts, Product or SoftwareApplication where it fits.
- **Give every `next/image` real `alt` text** and mark the main above-the-fold image with `priority` so it loads first.
- **Add Open Graph images** with `opengraph-image.tsx` so shared links don't show a blank card.

## Where to start

Run the curl test on your homepage and pricing page, then view the source and check the title and canonical. Those two checks catch the problems I find most often on Next.js sites. The free [AI crawler check](/ai-search-optimization#check) does the first one for you. For the non-engineers on your team, [what is technical SEO](/notes/what-is-technical-seo) explains each area in plain terms.

If you'd rather have it fixed, my [SaaS SEO plan](/saas-seo) sends every change as a pull request against your repo, so your team reviews each one before it ships.
