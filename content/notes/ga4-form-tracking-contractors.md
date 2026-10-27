---
title: "Form tracking in GA4 for contractor websites"
slug: ga4-form-tracking-contractors
date: 2027-02-22
draft: false
topic: tracking
seo_title: "GA4 form tracking for contractor websites"
excerpt: "Most contractor sites count form visits, not form submissions. How to track the forms that actually reach you in GA4, test them, and mark them as key events."
faq:
  - q: "Does GA4 track form submissions automatically?"
    a: "GA4's enhanced measurement can record some form interactions, but it often misses or double counts submissions on contractor sites. A thank-you page or a dedicated event set up in Google Tag Manager is more reliable."
  - q: "What's the most reliable way to track form submissions?"
    a: "Send people to a thank-you page after a successful submission and count views of that page as a key event. It only fires when the form actually went through."
  - q: "How do I know my form is still working?"
    a: "Submit a test entry every month and check two things: the email or CRM entry arrived, and the event showed up in GA4."
---

Forms are the second biggest source of leads for most contractor sites, after calls. They're also easy to count wrongly. Many sites count everyone who saw the form, or count submissions that never reached the business.

Here's how to count the ones that matter.

## What to count

Count a **successful submission**: the form was filled in, sent, and confirmed. Not a page view of the contact page, not a click on the submit button.

That one event, marked as a key event in GA4, tells you how many leads came through your forms each month, and from which source.

## Option 1: a thank-you page (most reliable)

1. Set your form to send people to a thank-you page, such as `/thank-you`, after a successful submission.
2. In GA4, create an event for page views of that URL, or create it in Google Tag Manager.
3. Mark the event as a **key event** in GA4 (Admin > Events, or Key events).
4. Keep the thank-you page out of search results with a noindex tag, so nobody lands on it from Google.

Because the page only loads after a successful send, the count is clean.

## Option 2: a form event in Tag Manager

If your form shows a message on the same page instead of redirecting:

1. Check whether your form plugin pushes an event to the data layer on success. Many popular WordPress form plugins do, or can with a small add-on.
2. In Google Tag Manager, create a trigger on that event and a GA4 event tag, for example `form_submit`.
3. Mark it as a key event in GA4.

Avoid triggers based on clicks on the submit button. They fire even when the form has errors.

## Option 3: enhanced measurement, with care

GA4 can record form interactions automatically. On many contractor sites it misses submissions or counts form starts, so use it only as a backup and check it against your inbox.

## Test it every month

Forms break silently: a plugin update, a spam filter, a speed plugin, an expired email password. We've seen a [speed plugin break a contact form](/notes/speed-plugin-broke-contact-form) with nobody noticing for weeks. Once a month:

1. Submit a test with "TEST" in the name.
2. Check it arrived where it should: email, CRM or both.
3. Check the event appeared in GA4's real-time report.

## Put forms next to calls

Forms and calls together are your leads. Report them side by side in your monthly numbers, with the same month last year for comparison. Our [report template](/notes/monthly-seo-report-template) has a row for both, and [the three events every local business should track](/notes/three-events-local-business) covers the full set.

## Next step

Submit a test on your own contact form right now. If you can't find the submission in GA4, set up the thank-you page method this week. If calls aren't tracked either, start with [GTM phone click tracking](/notes/gtm-phone-click-tracking).
