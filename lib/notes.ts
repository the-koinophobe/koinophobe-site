export type Note = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  body: string[]; // paragraphs
};

export const notes: Note[] = [
  {
    slug: "rankings-without-tracking",
    title: "Rankings without tracking are a vanity metric",
    date: "2026-06-01",
    excerpt:
      "A page-one ranking feels great. But if you cannot tie it to a call or a form, you are guessing. Here is how I close that gap.",
    body: [
      "Most SEO reports stop at rankings and traffic. Those are inputs, not outcomes. A business does not pay its bills with impressions.",
      "The fix is not complicated, it is just often skipped. Before I chase a single keyword, I make sure the site can measure what matters: form submissions, phone calls, and quote requests. That means GA4 and Google Tag Manager set up properly, with events on the actions that represent money.",
      "Once that is in place, every ranking gain has a number attached to it. You can see that the new service page did not just get traffic, it got seven calls last month. That is the difference between SEO as a cost and SEO as an investment.",
      "If you only do one thing this quarter, wire up conversion tracking. Everything else gets easier to justify once you can see the leads.",
    ],
  },
  {
    slug: "three-events-local-business",
    title: "The three conversion events every local business should track",
    date: "2026-05-15",
    excerpt:
      "You do not need a complicated analytics setup. You need three events wired up correctly. These are the ones that count.",
    body: [
      "Local businesses live and die on a handful of actions. Track these three and you will know exactly what your website is doing for you.",
      "First, phone calls. Click-to-call taps from mobile are often the biggest source of leads for service businesses, and they are invisible unless you track them. A simple tag on your tel: links captures them.",
      "Second, form submissions. Every contact or quote form should fire an event on a successful submit, not just a page visit. Otherwise spam and bounces pollute your numbers.",
      "Third, quote or booking requests, if you have them. These are your highest-intent actions and deserve their own event so you can measure cost per genuine lead.",
      "Get these three right and your monthly report stops being about traffic and starts being about leads.",
    ],
  },
  {
    slug: "clinic-158-to-501",
    title: "How a clinic went from 158 to 501 clicks in six months",
    date: "2026-04-20",
    excerpt:
      "A short walk through a real result: what was broken, what I changed, and how the numbers moved.",
    body: [
      "A local therapy clinic came to me almost invisible in search. Plenty of expertise, almost no organic visibility, and no way to tell what was working.",
      "I started with the foundations: indexing and on-page structure, then built service pages around the terms real patients search, not vanity keywords. In parallel I set up Search Console and conversion tracking so nothing was a guess.",
      "Over six months, organic clicks went from 158 to 501 and impressions from 2.2K to 8.7K. Click-through rate peaked at 6.1%. The average CTR dipped slightly because reach grew faster than clicks, which is exactly what you want early in a growth curve.",
      "The full breakdown is on the case study page. The short version: rank for buyers, track everything, and let the data tell you where to push next.",
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
