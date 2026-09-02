---
title: "The three conversion events every local business should track"
date: "2026-05-15"
excerpt: "You do not need a complicated analytics setup. You need three events wired up correctly. These are the ones that count."
draft: false
---
Local service businesses live and die on a handful of actions: someone calls, someone fills a form, someone asks for a quote. Track those three correctly and your website stops being a brochure and becomes a measurable sales channel. Miss them and you are flying blind, no matter how much traffic Google sends you.

The good news is that this does not require an enterprise analytics stack. Google Analytics 4 and Google Tag Manager are free, and the whole setup fits into an afternoon. Here is exactly what I wire up, in priority order, for every plumber, roofer, clinic, and detailer I work with.

## 1. Phone calls, especially click-to-call

For most local businesses, the phone is where money enters the building. On mobile, where the majority of local searches happen, a tap on your phone number is the single highest-intent action on the site, and it is invisible unless you track it.

The fix is a GTM click trigger on every tel: link that fires a phone_call event into GA4. Mark it as a key event and you can suddenly see which pages, which keywords, and which times of day produce calls. Pair it with call data from your Google Business Profile and you have a nearly complete picture of inbound phone demand. If you run call-heavy campaigns, dynamic number insertion adds source-level precision, but the tel: click event alone covers most local businesses.

## 2. Form submissions, measured on success

Almost every site tracks forms wrong. Counting visits to a thank-you page inflates the numbers with bots, refreshes, and accidental hits, while some form plugins never redirect at all, so submissions go completely uncounted.

The right way is to fire an event on the form's actual success state: the AJAX success callback, the confirmation element appearing, or the form plugin's built-in dataLayer push. That gives you a form_submit event that matches reality one to one. From there, GA4 can tell you the conversion rate of every landing page, which is the number that should drive your content priorities.

## 3. Quote and booking requests

If your business takes bookings or quote requests, those deserve their own event, separate from general contact forms. A message asking 'what are your hours' and a request for a roof replacement estimate are not the same lead, and mixing them poisons your data.

Split them, mark the high-value event as a key event, and you can calculate what a visitor from each channel is actually worth. That is the number that tells you whether SEO is beating your ad spend, and it is the number I anchor every monthly report around.

## Wiring it up in Google Tag Manager

The implementation pattern is the same for all three: a trigger that detects the action, a GA4 event tag that records it, and a naming convention you keep forever. Test everything in GTM preview mode before publishing, click the real buttons on a real phone, and confirm the events land in GA4's realtime view. Then connect Search Console so query data sits next to conversion data.

## Reading the numbers each month

With these three events running, your monthly review takes fifteen minutes: which pages produced calls, which produced forms, which produced quotes, and what changed from last month. Traffic becomes a supporting metric instead of the headline. When a page draws visitors but no events, you have found your next optimization target. When a page quietly produces a third of your calls, you have found what to build more of. That is the whole game: three events, wired once, read monthly.
