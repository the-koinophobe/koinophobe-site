---
title: "A contractor website homepage that converts: a checklist, top to bottom"
slug: contractor-homepage-that-converts
date: 2026-11-15
draft: false
seo_title: "Contractor website homepage that converts"
excerpt: "A contractor website homepage checklist: what the first screen must say, the proof that earns a call, services, towns, the estimate form, speed and tracking."
cover: /notes/photos/contractor-homepage-that-converts-cover.webp
cover_alt: "A person holding a phone in front of a laptop, the same website on both"
cover_credit: "Photo: Walls.io on Unsplash"
faq:
  - q: "What should be at the top of a contractor's homepage?"
    a: "What you do, where you do it, a phone number people can tap to call, and one main button such as Get a free estimate. Someone on a phone should see all of that without scrolling."
  - q: "How fast should a contractor website load?"
    a: "Google's Core Web Vitals call a page good when Largest Contentful Paint is 2.5 seconds or less, Interaction to Next Paint is 200 milliseconds or less, and Cumulative Layout Shift is 0.1 or less. Check your homepage in PageSpeed Insights on mobile."
  - q: "How do I know if my homepage is getting calls?"
    a: "Track phone taps and form submissions as key events in GA4. Then the Landing page report shows how many calls and forms started on the homepage."
---

Your homepage gets traffic from people who already know your name, people who clicked your Business Profile, and people who landed on a service page and wanted to see who you are. All of them want the same few answers fast. This is the checklist I work through on a contractor homepage, in the order a visitor reads it.

## The first screen

Pull the homepage up on your phone and don't scroll. That screen has to answer four things.

**What you do.** "Roof replacement and repair" is clearer than "Quality you can trust." Use the words a customer would search.

**Where you do it.** Name your main town or county in the headline or the line under it. Someone in the next county over needs to know in two seconds whether you'll come out.

**A phone number they can tap.** It should be a real `tel:` link, so tapping it starts a call. A number inside an image can't be tapped.

**One main action.** Pick one, such as Get a free estimate or Book an inspection, and make it the biggest button on the screen.

The search side matters here too. One roofing site I work on ranked at position 2.6 for a search about booking an inspection. It showed 143 times in four weeks and got no clicks. The page had no way to book online. If people search for an action, put that action on the page.

## Proof, right under the fold

Once they know what you do, they want to know you're real.

![An older couple at home smiling as they browse the web on a laptop together](/notes/photos/contractor-homepage-that-converts-1.webp "Photo: Vitaly Gariev on Unsplash")

- **Reviews.** Pull a few real Google reviews onto the page with the customer's first name and town, and link to your profile so they can read the rest. Google doesn't show review stars in search for reviews a business publishes about itself, so put them there for people. [Getting more Google reviews](/notes/google-reviews-for-roofers) covers asking for them within the rules.
- **Real job photos.** Your crew, your trucks, your finished work. Stock photos of smiling families in front of houses you never touched don't build trust. Before and after pairs work well when each one says what the job was and where.
- **Licenses and insurance.** Show your license number if your state issues one for your trade, and say you're insured.
- **Years in business and the brands you install,** if you're certified by a manufacturer.

## Services, with a link to each

List your main services with a sentence each and a link to that service's own page. The homepage can't rank for every service, and it shouldn't try. Its job is to send people to the page that answers their question, where the detail lives.

## The towns you work in

Add a short section listing your towns, each linked to a real page about your work there. Keep it to the towns you serve and want more jobs in. Thin copies of the same page with the town name swapped count as doorway pages under Google's spam policy, so each one needs its own substance. [Roofing service area pages](/notes/roofing-service-area-pages) explains how I build them.

## The estimate form

If the homepage has a form, keep it short. Name, phone, email, town, what you need, and an optional photo upload is plenty. Say when they'll hear back. Then test it. In July 2026 I found a client's form submissions had been dropping since March because of an email setting after an email address change, and nobody noticed for four months. On another site, a speed plugin's combine and minify setting stopped the form from submitting at all. Everything a free estimate page needs is in [what a free estimate page needs](/notes/lawrence-ma-free-estimate-page).

## Speed

Check speed on mobile first. Google's Core Web Vitals call a page good when Largest Contentful Paint is 2.5 seconds or less, Interaction to Next Paint is 200 milliseconds or less, and Cumulative Layout Shift is 0.1 or less.

The usual culprits on a contractor homepage are huge photos, sliders and animation scripts. On my own site, photos went from about 3 MB JPEGs to 93 to 200 KB WebP files at 1200 pixels wide, and mobile PageSpeed went from 52 to between 96 and 99 once I removed heavy animation libraries and unused scripts. [Core Web Vitals for contractor websites](/notes/core-web-vitals-contractor-websites) goes through where to check yours.

## Mobile, checked by hand

Open the homepage on your own phone and go through it like a customer would:

- Can you read the text without zooming?
- Does the phone number start a call when you tap it?
- Does a chat bubble or cookie banner cover the call button?
- Does the form work, and does the submission reach your inbox?

## Tracking

A homepage that gets calls is only useful if you can see the calls. Phone taps should fire a GA4 event, marked as a key event, and so should form submissions. With Google Tag Manager that's a Click - Just Links trigger on links where the Click URL starts with `tel:`, sending a GA4 Event tag. I wrote the steps in [tracking phone clicks with GTM](/notes/gtm-phone-click-tracking). After that, GA4's Landing page report shows how many calls and forms started on the homepage.

## The checklist

1. First screen: what you do, where, tap-to-call number, one main button.
2. Real reviews, real photos, license and insurance.
3. Services, each linked to its own page.
4. Towns, each linked to a real page.
5. A short estimate form, tested monthly.
6. Good Core Web Vitals on mobile.
7. Calls and forms tracked as key events.

Go through it on your own phone today. If you'd rather have me check the homepage and the tracking behind it, [book a call](/contact).
