---
title: "A local SEO checklist for home service businesses"
slug: local-seo-checklist-home-services
date: 2026-11-18
draft: false
seo_title: "Local SEO checklist for home service businesses"
excerpt: "A local SEO checklist for home service businesses: Business Profile, service and town pages, reviews, citations, tracking, speed and the monthly upkeep."
cover: /notes/photos/local-seo-checklist-home-services-cover.webp
cover_alt: "A hand holding a pen over a blue clipboard, ready to fill in a list"
cover_credit: "Photo: Phil Hearing on Unsplash"
faq:
  - q: "What should a local SEO checklist include?"
    a: "Your Google Business Profile settings, a page for each service and each town you want work in, reviews, consistent name and phone listings, call and form tracking, page speed and a short list of monthly checks."
  - q: "How often should I go through a local SEO checklist?"
    a: "Run the full list once when you start, then do the monthly upkeep items every month. Test your forms and your tap-to-call number every month, because they can break without anyone noticing."
  - q: "Do I need a separate page for every town I serve?"
    a: "Only for towns where you want more work, and only if you can write something true about each one. Near-identical pages with the town name swapped count as doorway spam under Google's policies."
---

This is the list I work through when I start on a home service site, in the order I check things. Most of the sites I work on are roofing, pool deck, lawn and shutter companies, and the list barely changes between them.

## Google Business Profile

- **Real business name, nothing added.** Keywords stuffed into the name break Google's rules and can get the profile suspended.
- **Correct primary category.** It tells Google which searches the profile fits. Add secondary categories only for work you do.
- **Street address removed if customers don't visit you.** Service-area businesses are supposed to hide it.
- **Service areas set by city or ZIP.** You get up to 20, within about 2 hours' drive of your base.
- **Hours that match when someone answers.** A caller who reaches voicemail calls the next listing.
- **Your own job photos, added as jobs finish.** They show in the map results and in Google Maps.

Each setting is covered in [Business Profile setup for roofers](/notes/google-business-profile-for-roofers), and it applies to most trades.

## Website basics

- **Tap-to-call number in the header of every page.** On a pain clinic site I work on, 678 of 854 search clicks in a year came from phones.
- **Name, phone and towns served in the footer.** It should match your profile.
- **Indexing switched on.** In WordPress, go to Settings > Reading and make sure "Discourage search engines from indexing this site" is unticked.
- **Sitemap submitted in Search Console.** Then the Pages report shows which pages Google indexed and which it left out.
- **Schema on the homepage.** Use your trade's schema.org type (RoofingContractor, Plumber, Electrician) with the same details as the Business Profile.

![Two construction workers reviewing plans together at a job site](/notes/photos/local-seo-checklist-home-services-1.webp "Photo: RONNAKORN TRIRAGANON on Unsplash")

## Service pages

- **One page per job you want more of.** `roof repair` and `roof replacement` are different searches from different homeowners.
- **A title tag with the job and your main town.** Across three Florida sites I work on, 307 searches ranked in the top ten in one 28-day window and got zero clicks. The snippet was a big part of why.
- **A way to do what the searcher came for.** On a roofing site, a search about booking an inspection ranked at 2.6, showed 143 times in four weeks and got no clicks. The page had no way to book online.
- **Your own job photos, renamed and compressed.** File names and alt text give Google words to match.
- **The questions customers ask you on the phone.** Answer them on the page, with Service markup if you can.

## Town pages

- **A real page for each town you want work in.** On a Florida roofing site I work on, replacing one county page with a page per town was one of four changes made while average position went from 47.9 to 14.9.
- **Something true about each town.** Google's doorway abuse policy treats near-identical pages with the town name swapped as spam. Jobs you've done there and local housing details set each page apart.

[One real page per town](/notes/roofing-service-area-pages) goes further into what each page needs.

## Reviews

- **Ask every customer the same way, soon after the job.** Google prohibits review gating (asking only the customers you think are happy).
- **No incentives.** Google bans them, and the FTC's fake reviews rule, in effect since October 21, 2024, allows civil penalties up to $51,744 per violation.
- **Reply to reviews, good and bad.** Readers see the replies too.

The rules and the asking routine are in [getting more Google reviews](/notes/google-reviews-for-roofers).

## Citations and NAP

- **One exact name, phone and address format, copied from your website.** Your site is the reference copy for every listing.
- **Search each old phone number in quotes.** An old number on a live listing sends calls to a line nobody answers.
- **Every login in the business's name.** If a former marketing company owns the listings, get them moved.

The audit steps are in [NAP and citations for contractors](/notes/nap-citations-contractors).

## Tracking

- **Phone taps as a GA4 key event.** In Google Tag Manager, a Click - Just Links trigger where Click URL starts with `tel:` fires a GA4 Event tag.
- **Form submissions as a key event.** Fire it on the submission itself, because thank-you page visits also count bots and refreshes.
- **Business Profile calls counted separately.** They show in the profile's performance view.

[Call tracking for contractors](/notes/call-tracking-for-contractors) explains how to keep each source separate.

## Speed

| Core Web Vital | Good | What it measures |
|---|---|---|
| Largest Contentful Paint | 2.5 seconds or less | How fast the main content shows |
| Interaction to Next Paint | 200 milliseconds or less | How fast the page responds to a tap |
| Cumulative Layout Shift | 0.1 or less | How much the layout jumps while loading |

Big photos are a common cause of slow pages. On my own site, photos went from about 3 MB JPEGs to WebP files of 93 to 200 KB at 1200 pixels.

## Monthly upkeep

1. Submit every form and confirm the email arrives. In July 2026 I found a client's form submissions had been dropping since March because of an email setting, and nobody noticed for four months, me included.
2. Tap the phone number on your own phone.
3. In the Search Console Performance report, compare the last 28 days with the 28 before. Look for queries in the top ten with no clicks.
4. Add new job photos and a post to the Business Profile.
5. Reply to new reviews.
6. Publish or refresh one page a few months ahead of your next busy season.

## Next step

Fix the section with the fewest ticks first. If you'd like me to run the whole list on your site, the Site Audit on my [pricing page](/pricing) covers it, and the fee is credited in full if a monthly plan starts within 30 days.
