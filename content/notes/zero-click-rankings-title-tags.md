---
title: "Ranking but no clicks? Fix the title tag, then the page"
slug: zero-click-rankings-title-tags
date: 2026-09-03
draft: false
seo_title: "Ranking but no clicks: fix the snippet first"
excerpt: "Ranking but no clicks? 307 search terms in Google's top ten got zero clicks across three sites. How to find yours in Search Console and fix title and page."
cover: /notes/photos/zero-click-rankings-title-tags-cover.webp
cover_alt: "Hands typing on a laptop showing the Google search page, with a phone beside it"
cover_credit: "Photo: Benjamin Dada on Unsplash"
faq:
  - q: "Why am I ranking on Google but getting no clicks?"
    a: "Usually the snippet doesn't match what the searcher wants, or the page can't do what they came to do. Check the title tag and meta description first, then the page itself."
  - q: "How do I find zero-click keywords in Search Console?"
    a: "Open the Performance report, show average position, filter the table to positions under 10, sort by impressions and look for rows with 0 clicks."
  - q: "Does Google always use my meta description?"
    a: "No. Google often writes its own snippet from text on the page. A description that matches the search closely has a better chance of being shown."
---

![307 search terms ranking in Google's top ten with no clicks, 139 of them in the top five](/notes/illustrations/zero-click-rankings-title-tags.webp)

In the 28 days to August 16, 2026, I pulled Search Console data for three Florida sites I work on. 307 search terms ranked in Google's top ten and got zero clicks. Between them they had 19,883 impressions.

Then I narrowed it to the top five.

| Position | Search terms | Impressions | Clicks |
|---|---|---|---|
| Top ten | 307 | 19,883 | 0 |
| Top five | 139 | 9,261 | 0 |

Rankings improved on all three sites in that window. Clicks didn't follow. If you've been told your rankings are up and the phone hasn't changed, this is one place to look.

## Why a top five ranking can get no clicks

Two things decide whether someone clicks. The first is the snippet, meaning the title tag and meta description Google shows under your link. The second is whether the page does what the searcher came to do. Searchers often judge the second from the first.

A page can rank for a search it was never written for. The title still says whatever it said when the page went up, so it reads like an answer to a different question. The searcher scrolls past to a result that matches their words.

## The booking example

On a roofing site I work on, a search about booking an inspection ranked at position 2.6. It showed 143 times in four weeks and got zero clicks.

The page had no way to book online. Someone searching that wants to pick a time. A sharper title might have earned a few clicks, and those visitors would have found nothing to book. The fix there starts on the page: add a booking path, then rewrite the snippet so it says you can book.

## How to find yours in Search Console

1. Open Search Console and go to **Performance**, then **Search results**.
2. Set the date range to the last 28 days.
3. Click the **Average position** card so the column shows in the table.
4. Stay on the **Queries** tab. Use the filter icon above the table to keep rows where Position is smaller than 10.
5. Sort by **Impressions**, highest first.
6. Read down the **Clicks** column. Each 0 near the top is a search where people saw you and didn't click.
7. Click one of those queries, then the **Pages** tab, to see which page is ranking.

Write down the query, the page, the position and the impressions. That's your working list.

## Rewriting the title and meta description

Take each query and ask what the person wanted to do. Book, get a price, find someone in their town, or learn something before they call.

Then rewrite the title so it answers that. A few rules I follow:

- Put the searcher's words near the start.
- Name the town if the search names a town.
- Say what they can do on the page, like book, get a quote or call.
- Keep it short enough that Google doesn't cut it off, roughly 60 characters.

Here's the pattern, using a made-up company. A home page title like `Home | ABC Roofing` would become `Book a Roof Inspection in Melbourne, FL | ABC Roofing` on a page that can take a booking.

The meta description gets the same treatment. One or two sentences that say what's on the page and what to do next. Google may rewrite it anyway, but a description that matches the search gives it less reason to.

## Fix the page, then the snippet

A better snippet sends people to the page. The page still has to deliver. If the search is about booking, add online booking or a short form that asks for a time. If it's about cost, explain what drives the price. If it names a town, the page should show you work there.

Structured data can help Google read the page correctly too. My note on [roofing contractor schema](/notes/roofing-contractor-schema) covers what to add.

## Check whether it worked

Give each change four weeks, then use the **Compare** option in the Performance date picker to put the 28 days before against the 28 days after. Look at clicks and CTR for the same query.

Clicks are only half of it. If the page gets visits and still no calls, you need [call and form tracking](/notes/three-events-local-business) to see where people drop off, which is the whole point of [tracking before you judge rankings](/notes/rankings-without-tracking).

If you'd like me to pull this list for your site, the Site Audit on [my pricing page](/pricing) is where I'd start. Or [send me your URL](/contact) and I'll tell you what I'd check first.
