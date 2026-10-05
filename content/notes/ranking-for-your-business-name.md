---
title: "Business not showing up on Google when searched by name? How to fix it"
slug: ranking-for-your-business-name
date: 2026-10-28
draft: false
seo_title: "Business not showing up on Google by name?"
excerpt: "Business not showing up on Google when searched by name? The common causes, the name signals to fix, and what I changed when it happened to my own brand."
cover: /notes/photos/ranking-for-your-business-name-cover.webp
cover_alt: "A red pickup truck parked in front of a small antiques shop with a painted sign"
cover_credit: "Photo: Wally Holden on Unsplash"
faq:
  - q: "Why doesn't my business show up when I Google its name?"
    a: "Common causes are a site blocked from indexing, a name Google reads as another word or another business, and a name written differently across your site, Business Profile and directories."
  - q: "What is alternateName in schema markup?"
    a: "It's a schema.org property for other names your business goes by, like a short form or a common misspelling. It sits in your Organization or LocalBusiness markup next to name and sameAs."
  - q: "How long does it take to rank for my own business name?"
    a: "It depends on how fast Google recrawls your site and profiles. I can't promise a date, but you can watch your name's position in the Search Console Performance report."
---

![A results page where the business name finally sits in the first row](/notes/illustrations/ranking-for-your-business-name.webp)

In late September 2026, my own brand wasn't on page one of Google for its own name. Google read "koinophobe" as the word koinophobia, so a person typing my brand name got results for a different word.

So I've been on the wrong side of this one. Here's how I'd work through it for any business.

## Check that Google can index the site at all

Rule out the simple causes first. In WordPress, go to Settings > Reading and make sure "Discourage search engines from indexing this site" is unchecked. A developer may have ticked it while building the site and never unticked it. Then run your home page through URL Inspection in Google Search Console and check the Pages report for excluded pages.

If the site isn't indexed, nothing below matters yet. The full checklist is in [why a contractor website isn't showing on Google](/notes/contractor-website-not-showing-on-google).

## Why Google misreads a business name

When a search could mean several things, Google shows what it thinks most people want. A name that looks like a common word, a misspelling of one, or the name of a bigger company elsewhere has to fight for its own results. A name written three different ways across the web makes that fight harder.

![A sign in a shop window that says come in, we are open](/notes/photos/ranking-for-your-business-name-1.webp "Photo: Tim Mossholder on Unsplash")

That was my problem. I wrote [what is a koinophobe](/notes/what-is-a-koinophobe) to explain the name on my own site, and went through my site's name signals. The list below is the checklist I'd use on any site with the same problem.

## What it looks like when it's working

Tint Lordz Auto Spa, a window tint shop in Lawrence, MA, is the clean example from my work. Every version of its name ranks at position 2 or better, with an average of 1.98. `tint lordz auto spa lawrence` sits at 1.9 with an 11.2% click-through rate. People searching a business by name already want that business, so a top spot on those searches is worth protecting. I wrote up the rest in [the Tint Lordz case](/notes/lawrence-ma-window-tint-seo).

## The fixes

### Use one name everywhere

Pick the exact form of the name and use it in the home page title tag, the WordPress Site Title, the logo alt text, the footer and the About page. If people also call you by a short form, mention it in the text once.

### Add Organization schema with alternateName and sameAs

Put the official name in `name`, the other versions people search in `alternateName`, and your profile URLs in `sameAs`. A local business can use LocalBusiness or a subtype like RoofingContractor, which carries the same properties.

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Example Roofing Co.",
  "alternateName": ["Example Roofing", "Example Roofers"],
  "url": "https://www.exampleroofing.com/",
  "sameAs": [
    "https://www.facebook.com/exampleroofing",
    "https://www.linkedin.com/company/exampleroofing"
  ]
}
```

More on markup for trades is in [roofing contractor schema](/notes/roofing-contractor-schema).

### Fix the Business Profile name

Your Google Business Profile should carry your real business name and nothing else. Adding keywords or a city to the name breaks Google's guidelines, and it also gives Google one more version of your name to reconcile.

### Make citations match

Directories, Yelp, the BBB, your supplier's dealer locator and any chamber listing should spell the name, address and phone number the same way. I cover the cleanup in [NAP citations for contractors](/notes/nap-citations-contractors).

### Write an About page

An About page that states the business name, who owns it, what you do and where you work gives Google one page that ties the name to the business. Link it from the main menu.

### Link your profiles back to the site

Every profile you control (Facebook, LinkedIn, Instagram, Yelp, Business Profile) should link to your website. Those are the same URLs you list in `sameAs`, so the two point at each other.

## How to tell if it's working

In Search Console, open the Performance report, filter queries containing your name, and compare the last three months with the three before. Watch average position and clicks. I can't promise how long Google takes to change how it reads a name, so check it monthly and leave the changes in place.

If you want someone to check all of this on your site, start with the Site Audit on my [pricing page](/pricing). The $750 is credited in full if a monthly plan starts within 30 days.
