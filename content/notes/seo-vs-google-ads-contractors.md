---
title: "SEO vs Google Ads for contractors: how each one gets you calls"
slug: seo-vs-google-ads-contractors
date: 2026-11-12
draft: false
seo_title: "SEO vs Google Ads for contractors"
excerpt: "SEO vs Google Ads for contractors: how the ad auction charges you, why SEO builds over time, where Local Services Ads fit, and how to track both side by side."
cover: /notes/photos/seo-vs-google-ads-contractors-cover.webp
cover_alt: "A calculator on printed charts beside a laptop on an office desk"
cover_credit: "Photo: Jakub Żerdzicki on Unsplash"
faq:
  - q: "Is SEO or Google Ads better for a contractor?"
    a: "They do different jobs. Google Ads can put you in front of searchers as soon as a campaign is approved, and stops when you stop paying. SEO takes months to build and keeps working on pages you own. You can run both and compare cost per booked job."
  - q: "How does Google Ads charge contractors?"
    a: "On a standard Search campaign you set a maximum cost per click, an auction decides where your ad shows, and you're charged when someone clicks. What you pay per click is often less than your maximum."
  - q: "How do I know which one brings more jobs?"
    a: "Track them separately. Give ads their own call tracking, mark phone taps and form submissions as key events in GA4, and each month compare leads, booked jobs and cost per booked job for each channel."
---

A contractor who wants more calls from Google has three main ways to pay for them: Google Ads, Local Services Ads, and SEO. They show up in different places on the results page and charge you in different ways. My work is SEO and call tracking, so I look at ads mostly from the tracking side, which is the side that tells you whether either one is worth it.

## How Google Ads works

On a standard Search campaign, you pick the searches you want to show for and set the most you're willing to pay for a click. Google runs an auction each time someone searches. Its help pages say the auction looks at your bid, the quality of your ad and the page it links to, your ad assets (extra lines like call buttons and sitelinks), and the context of the search, such as the person's location, device and time of day.

You're charged when someone clicks. Google says what you pay is often less than your maximum bid.

A few things about budgets that catch owners out. You set an average daily budget, and Google says a campaign might spend up to twice that on a given day when traffic is high. Over a month it won't spend more than 30.4 times the daily average. And when the budget stops, the ads stop. Pause the campaign and the ads stop showing.

I won't quote a cost per click for your trade. It changes by market, season and how many competitors are bidding, and the only number worth trusting is the one in your own account.

## How SEO works

SEO is the work that gets your website and Business Profile into the unpaid results: the map pack and the regular listings below it. Nobody pays per click there. The cost is the work itself, whether you pay someone or do it yourself.

It's slow to start. On a Florida roofing site I work on, average position went from 47.9 to 14.9 when I compared October 2025 to August 2026 with the eleven months before. Impressions went from 5,410 to 139,639. 893 of the 1,099 searches it now shows for didn't show it at all the year before. That took most of a year, which is why I wrote a whole note on [how long SEO takes](/notes/how-long-does-seo-take).

The difference is what's left when spending pauses. The pages that roofing site gained are still there, still showing for those searches. That's what people mean when they say SEO compounds.

## Local Services Ads are a third option

Local Services Ads sit at the very top of some local searches. You pay per lead instead of per click, and you go through Google's screening (license, insurance and background checks, depending on the category) to get a badge. For roofers in particular I compared them with SEO in [Local Services Ads vs SEO for roofers](/notes/local-services-ads-vs-seo-roofers). Like regular ads, the leads stop when the budget does.

## When each one makes sense

**Ads fit when you need calls soon.** A new business with no rankings yet, a new service, or a new town you're moving into. Ads can also test demand: the search terms report in Google Ads shows the exact searches people typed before they clicked, which tells you which pages are worth building for SEO.

**SEO fits when you plan to be around.** If you're in the same towns doing the same work in two years, the pages you build now keep working. It also covers searches you'd never think to bid on. The roofing site above shows for hundreds of searches it didn't show for a year earlier.

**Both fit most established contractors.** Ads cover the gaps while SEO builds, and you can turn ad spend up or down with the season. I compared paying for leads with owning your site in [shared leads vs your own website](/notes/shared-leads-vs-your-own-website), and the same thinking applies here.

## Track both, or you're guessing

This is the part that gets skipped. Calls from ads, calls from the map and calls from the website all ring the same phone, and without tracking they all look the same.

What I set up:

- A separate tracking number for ads, so ad calls are counted on their own.
- Phone taps on the website as a GA4 key event, using a tag that fires on `tel:` links.
- Business Profile calls counted separately, with the profile's website link tagged so visits from the map show as their own source in GA4.
- Form submissions as a key event, with the form tested every month.

[Call tracking for contractors](/notes/call-tracking-for-contractors) has the full setup. Then each month, put three numbers side by side for each channel: leads, booked jobs and cost per booked job. For ads, the cost is the ad spend plus any management fee. For SEO, it's the monthly fee.

After three or four months you'll have an answer for your own market.

## Where to start

If you're running ads now, open the search terms report and export the last 90 days. If website calls aren't tracked yet, fix that before you change any budget. When you want to see what the SEO side costs, every plan is listed on my [pricing page](/pricing).
