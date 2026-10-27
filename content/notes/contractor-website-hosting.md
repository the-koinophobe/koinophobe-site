---
title: "Cheap hosting and contractor SEO: when your host is the problem"
slug: contractor-website-hosting
date: 2027-02-10
draft: false
topic: technical
seo_title: "Contractor website hosting: does it affect SEO?"
excerpt: "A slow, overcrowded host can make a contractor's site lose rankings and calls. How to tell whether your hosting is the problem, and what good hosting for a small business site looks like."
faq:
  - q: "Does web hosting affect SEO?"
    a: "It can. A slow or unreliable host makes pages load slowly and sometimes not at all, which hurts both rankings and the number of visitors who call. Fast, reliable hosting won't make you rank on its own, but bad hosting can hold you back."
  - q: "How do I know if my host is slowing my site down?"
    a: "Check your server response time in a speed test such as PageSpeed Insights. If the server takes a long time to respond even on a simple page, the host is a likely cause."
  - q: "Should contractors use cheap shared hosting?"
    a: "It can work for a very small site, but many cheap shared plans put too many sites on one server. If your site is slow at busy times or goes down, moving to better hosting is often one of the cheapest fixes available."
---

When a contractor's site is slow, everyone blames the images or the theme. Sometimes they're right. But on a lot of small business sites we look at, the slow part happens before the page even starts loading: the server takes too long to answer.

## How hosting affects your site

Your host is the computer your website lives on. On cheap shared plans, many websites share one server. When it's busy, every site on it slows down, including yours, and sometimes it goes offline.

That affects two things:

- **Visitors.** A homeowner on a phone waiting for a page to load often goes back and taps the next result.
- **Google.** If Google's crawler finds your site slow or unreachable, it may crawl less, and slow pages can hold back rankings. Our [Core Web Vitals guide](/notes/core-web-vitals-contractor-websites) explains how speed is measured.

## How to tell if hosting is the problem

1. **Run PageSpeed Insights** on your homepage and a service page. Look for "Reduce initial server response time" or a slow Time to First Byte.
2. **Test at different times.** If the site is fine at night and slow at midday, the server is probably overloaded.
3. **Check for downtime.** Free uptime monitors will email you when your site goes down. If it happens more than rarely, it's the host.
4. **Look at Search Console's crawl stats** (Settings > Crawl stats). A rising average response time is a warning sign.

If the server responds quickly and the page is still slow, the problem is on the page: images, plugins or the theme. See [image optimization for contractor sites](/notes/image-optimization-contractor-websites).

## What good hosting looks like for a small business

You don't need anything exotic. Look for:

- **A plan where your site isn't crowded** by hundreds of others, or managed WordPress hosting if you use WordPress
- **Servers near your customers**, or a CDN that serves your pages from nearby
- **Automatic backups** you can restore yourself
- **HTTPS included**
- **Support that answers**, ideally with a real person

Better hosting often costs a little more per month than the cheapest plans. For a business that gets calls from its website, it usually pays for itself.

## Moving hosts without losing rankings

A host move keeps the same domain and URLs, so it's simpler than a redesign, but it still needs care: back up first, move during a quiet time, check every page and form after, and keep the old hosting until you've confirmed everything works. Forms are the most common thing to break; we've seen a [speed plugin break a contact form](/notes/speed-plugin-broke-contact-form) silently. If URLs change too, follow our [migration guide](/notes/website-migration-without-losing-rankings).

## Next step

Run PageSpeed Insights on your main service page now. If server response time is flagged, ask your host about it, or plan a move. If you'd rather have someone check the whole site, the [Site Audit on our pricing page](/pricing) covers hosting, speed and the rest.
