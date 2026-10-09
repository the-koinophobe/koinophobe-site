---
title: "Changing your startup's domain without losing Google traffic"
slug: change-domain-name-seo
date: 2026-10-26
draft: false
topic: startups
seo_title: "Changing your startup's domain name without losing SEO"
seo_description: "A domain change or rebrand checklist for startups: redirect mapping, Google's Change of Address tool, the brand query, partner links and what to monitor."
excerpt: "Rebrands happen, and a domain change doesn't have to cost you your search traffic. The checklist I use: the URL map, redirects, Google's Change of Address tool, the parts startups forget (app subdomains, docs, partner listings, the old brand name), and what to watch for the first three months."
cover: /notes/photos/change-domain-name-seo-cover.webp
cover_alt: "A room stacked with moving boxes beside a window"
cover_credit: "Photo: Alicia Christin Gerald on Unsplash"
faq:
  - q: "Will changing my domain hurt my SEO?"
    a: "Expect some temporary fluctuation while Google recrawls. Google says permanent redirects don't cause a loss in PageRank, and with every old URL redirected to its matching new one, most sites settle within weeks. When a move goes badly, missing redirects are usually why."
  - q: "How long should I keep redirects after changing domains?"
    a: "Google recommends keeping them as long as possible, and at least a year. I'd keep the old domain registered and redirecting for as long as the company exists, because old links, emails and integrations keep pointing at it."
  - q: "How do I use Google's Change of Address tool?"
    a: "Verify both the old and new domains in Google Search Console, set up the redirects, then open the old property's Settings and choose Change of address. Google says to submit it for every verified variant of the old domain."
---

![An old domain with every page redirected one-to-one to the new domain, and the brand name carried across](/notes/illustrations/change-domain-name-seo.webp)

Startups change names more often than most companies. A trademark problem, a pivot, a better domain finally coming up for sale. The search side of a domain change is well understood, and done carefully it costs a few weeks of wobble.

Google says to "expect temporary fluctuation in site ranking during the move" and that permanent redirects "don't cause a loss in PageRank." When a domain change goes badly, it's usually because of missing redirects and forgotten details. Here's the checklist.

## Before the move

**Map every URL.** Export every URL that gets traffic or has links: from your sitemap, Search Console's Pages report, your analytics, and a backlink tool if you have one. Next to each, write the matching new URL. Same path is easiest; if paths change too, map each one to its closest equivalent, never everything to the new homepage.

**Verify the new domain in Search Console** before launch, and keep the old property.

**Pick the timing.** Avoid launch week, your busiest season and the days before a funding announcement. You want to be able to watch the move closely for a couple of weeks.

## Move day

1. **Turn on permanent redirects** (301 or 308) from every old URL to its new match, at the server or edge. Google recommends server-side permanent redirects whenever possible.
2. **Update canonicals, internal links and the sitemap** to the new domain. Signals that point back to the old domain slow things down. [Google chose a different canonical](/notes/google-chose-different-canonical) explains why.
3. **Submit Change of Address** in the old Search Console property, under Settings. Google says to submit it for all verified variants of the old domain, even unused ones.
4. **Submit the new sitemap** in Google Search Console and Bing Webmaster Tools. [How to submit a sitemap](/notes/submit-sitemap-google-search-console) has the steps.

![People working at desks in an open office](/notes/photos/change-domain-name-seo-1.webp "Photo: Arlington Research on Unsplash")

## What startups forget

**App and auth URLs.** `app.olddomain.com`, OAuth callback URLs, magic login links in old emails, webhook endpoints. Redirect what you can and update the rest with your engineering team before the switch.

**Docs and help center.** Docs often live on a separate subdomain or platform and get missed in the URL map. They usually carry a lot of your links.

**Partner and marketplace listings.** Integration directories, app stores, software review sites and your investors' portfolio pages. Update each listing's URL, and check that your own [integration pages](/notes/saas-feature-pages) link to the new partner URLs too. These are some of your most valuable links, and [startup backlinks](/notes/startup-backlinks) covers why.

**Your top linking sites.** Email the people behind your 20 most valuable links and ask them to update the URL. A redirect passes the value, but a direct link is cleaner and won't break if a redirect is ever removed.

**The old brand name.** People will keep searching for it for months. Mention it on the new site ("formerly OldName") on the homepage and about page, and add it as `alternateName` in your Organization structured data. Update your social profiles and add the new domain to them.

## The first three months

- **Watch both Search Console properties.** Clicks on the old one should fall as the new one rises. Google says most pages on small and medium sites can take a few weeks to move.
- **Check the Page indexing report on the new property** weekly for redirect errors and 404s.
- **Test a sample of old URLs** every couple of weeks to confirm they still redirect in one hop.
- **Compare sign-ups by landing page** against the month before the move.

If clicks drop and don't recover after a few weeks, [my traffic drop diagnosis](/notes/website-traffic-dropped) walks through what to check, and the redirect map is the first place to look.

## Keep the old domain

Google recommends keeping redirects for at least a year. Keep the old domain registered and redirecting for as long as the company exists. Old blog links, printed materials, email signatures and integrations will keep pointing at it for years, and someone else buying it would be a much bigger problem than the renewal fee.

## Where to start

Start the URL map now, even if the move is months away. It's the slowest part of the job. If you're also redesigning, [my redesign checklist](/notes/website-migration-without-losing-rankings) covers the overlap. If you'd like the redirect map and launch checks done for you, that's work my [SaaS SEO plan](/saas-seo) covers, with every change sent as a pull request.
