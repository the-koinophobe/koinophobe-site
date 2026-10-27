---
title: "WordPress SEO for contractor websites: the settings that matter"
slug: wordpress-seo-contractors
date: 2027-03-24
draft: false
topic: technical
seo_title: "WordPress SEO settings for contractor websites"
excerpt: "Most contractor sites run on WordPress, and most have the same handful of settings wrong. What to check in WordPress and your SEO plugin, and what to leave alone."
faq:
  - q: "What is the best SEO plugin for a contractor's WordPress site?"
    a: "The well-known SEO plugins all handle the basics. What matters more is that one plugin is set up properly, not which one you choose. Don't run two SEO plugins at once."
  - q: "Can WordPress plugins hurt SEO?"
    a: "Yes. Too many plugins can slow the site, and some speed or security plugins can break forms or block Google. Install only what you need and test forms after updates."
  - q: "Should contractors use a page builder?"
    a: "They're fine if pages stay fast and the text is real text on the page. Check speed on a phone and make sure headings and content aren't buried in images."
---

We work on a lot of contractor sites built with WordPress, often with Elementor and an SEO plugin such as AIOSEO or Yoast. They usually have the same handful of problems. Here's what to check, roughly in order of how much it costs you when it's wrong.

## 1. Search engine visibility

In **Settings > Reading**, make sure "Discourage search engines from indexing this site" is **unchecked**. It's often left on after a redesign, and it tells Google not to index the site. It sounds obvious, and it's one of the first things we check because it does happen.

## 2. One SEO plugin, set up properly

Use one SEO plugin, not two. Then check:

- **Titles and meta descriptions** written for each service and town page, not left on the template default. See [zero-click rankings](/notes/zero-click-rankings-title-tags) for why titles matter so much.
- **Sitemap enabled** and submitted in Search Console. See [submitting a sitemap](/notes/submit-sitemap-google-search-console).
- **Noindex** on thin pages that shouldn't rank: tag and author archives, thank-you pages.
- **Schema settings** describing your business correctly. For roofers, our [roofing schema guide](/notes/roofing-contractor-schema) has the markup to add.

## 3. Permalinks

In **Settings > Permalinks**, use readable URLs such as `/roof-repair-palm-bay/`, not `/?p=123`. If you change permalinks on an existing site, set up redirects first, or you'll lose the rankings the old URLs had. Our [migration guide](/notes/website-migration-without-losing-rankings) covers redirects.

## 4. Speed

WordPress sites get slow through heavy themes, large images and too many plugins.

- Compress and resize images before uploading. See [image optimization](/notes/image-optimization-contractor-websites).
- Remove plugins you don't use.
- Use one caching or speed plugin, configured carefully, and test forms afterwards. We've seen a [speed plugin break a contact form](/notes/speed-plugin-broke-contact-form) silently.
- If the server itself is slow, the host may be the problem. See [contractor website hosting](/notes/contractor-website-hosting).

## 5. Forms that actually deliver

Contact forms on WordPress often send email from the server, which spam filters reject. Use an SMTP plugin with a real email account, and test the form monthly. Track submissions in GA4 so you notice when they stop. See [form tracking](/notes/ga4-form-tracking-contractors).

## 6. Page builders and real text

Page builders are fine if the page is fast and the content is real text. Avoid headings saved as images, text inside sliders, and important content that only appears after clicking tabs. Google and AI assistants read text, so make sure your service details are in it.

## 7. Updates and backups

Keep WordPress, the theme and plugins updated, with automatic backups you can restore. Most hacked contractor sites we've seen were running old plugins.

## Next step

Check setting 1 right now; it takes ten seconds. Then open your SEO plugin and look at the title of your main service page. If it's the default, rewriting it is the quickest win on this list. For a full check, our [DIY SEO audit checklist](/notes/diy-seo-audit-checklist) goes further.
