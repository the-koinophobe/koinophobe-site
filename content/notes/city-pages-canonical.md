---
title: "City pages and \"Google chose different canonical\": why your town pages vanish"
slug: city-pages-canonical
date: 2027-01-17
draft: false
topic: technical
seo_title: "Town pages and duplicate canonical errors, fixed"
excerpt: "When a contractor's town pages are near-copies, Google picks one and ignores the rest. How to spot it in Search Console, and how to make each town page different enough to stand on its own."
faq:
  - q: "Why does Search Console say Google chose a different canonical for my city page?"
    a: "Google decided the page is a duplicate of another one and is showing that other page instead. With town pages, it usually means the pages are nearly identical apart from the town name."
  - q: "Will a canonical tag fix duplicate town pages?"
    a: "No. A canonical tag tells Google which page you prefer, but if the pages are near-copies, Google can still choose its own. The fix is making each page genuinely different."
  - q: "How different does each town page need to be?"
    a: "Different enough that someone in that town learns something they wouldn't from the other pages: jobs done there, local photos, local reviews, and anything particular about homes or rules in that town."
---

You built a page for every town you serve. A few months later, half of them aren't showing up. In Search Console, they're listed under **"Duplicate, Google chose different canonical than user."** Here's what that means for town pages, and how to get them back.

## What the status means

Google found your Palm Bay page, compared it with your Melbourne page, and decided they're the same page with a different town name. It picked one as the canonical, usually the older or stronger one, and stopped showing the others in results.

The general version of this problem is in [Google chose a different canonical](/notes/google-chose-different-canonical). With contractors, the cause is almost always the same: template town pages.

## How to confirm it's your town pages

1. In Search Console, open **Pages**, then the **Duplicate, Google chose different canonical than user** row.
2. Look at which URLs are listed. If they're your town pages, inspect one with the **URL Inspection** tool.
3. Under **Page indexing**, compare the "User-declared canonical" with the "Google-selected canonical." If Google picked another town page, you've found it.

## Why it happens

Most town pages are built from one template:

- Same intro with the town name swapped in
- Same list of services
- Same photos
- Same reviews, or none

To Google, those pages say the same thing. Picking one and dropping the rest is reasonable from its side. Near-identical location pages can also be treated as doorway pages, which is worse.

## The fix: make each page worth indexing

Give each town page things the others don't have:

1. **Jobs from that town.** Two or three finished jobs, each with a photo, the neighborhood, and what you did.
2. **A review from someone there.** Quote it on the page, with permission.
3. **Something local and true.** Older homes in one town, new construction in another, a HOA that has rules about roof colors, salt air near the beach.
4. **Your real reach.** How long it takes you to get there, which neighborhoods you cover, whether you do emergency calls there.
5. **Questions people in that town ask.** If permits work differently there, say so and point to the town's official page.

Our [service area pages guide](/notes/roofing-service-area-pages) goes through the full build for roofers; it works for any trade.

## Then ask Google to look again

Once a page is genuinely different:

1. Check each town page has a self-referencing canonical tag.
2. Make sure each one is linked from your site, for example from a "Towns we serve" section, not just the sitemap.
3. Use **URL Inspection > Request indexing** for the pages you've rewritten.
4. Give it a few weeks. Google re-evaluates on its own schedule.

## Fewer, better pages

If you can't make a town page different, you probably shouldn't have it yet. Five strong town pages beat twenty template ones. Merge the thin ones into a "Service area" page with a short list of towns, and redirect their URLs to it.

## Next step

Open the duplicate canonical report in Search Console now. If your town pages are in it, rewrite the one for the town you most want work in first, and request indexing. If pages are missing for other reasons, start with [discovered, currently not indexed](/notes/discovered-currently-not-indexed).
