export type Note = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  body: string[]; // paragraphs; strings starting with "## " render as H2
};

export const notes: Note[] = [
  {
    slug: "rankings-without-tracking",
    title: "Rankings without tracking are a vanity metric",
    date: "2026-06-01",
    excerpt:
      "A page-one ranking feels great. But if you cannot tie it to a call or a form, you are guessing. Here is how I close that gap.",
    body: [
      "Most SEO reports stop at rankings and traffic. Those are inputs, not outcomes. A business does not pay its bills with impressions, and a keyword sitting at position three means nothing if nobody who lands on that page ever calls, books, or buys. Yet the majority of small businesses I audit are paying for SEO with no way to tell whether it produces a single lead.",
      "This is not a small oversight. It changes every decision downstream. Without conversion tracking you cannot tell which pages earn revenue, which keywords attract buyers rather than browsers, or whether last quarter's content push did anything at all. You end up steering a business on the marketing equivalent of a dashboard with no speedometer.",
      "## Why rankings alone mislead you",
      "Rankings are volatile, personalized, and increasingly detached from clicks. Google rewrites titles, injects AI overviews, and localizes results, so the position you see in a rank tracker is not the position most searchers see. Two sites can hold the same average position while one gets triple the clicks because of better titles, review stars, or sitelinks.",
      "Worse, rankings say nothing about intent. I have watched sites celebrate page-one placement for informational keywords that never produce a phone call, while a lower-volume 'near me' term three positions down quietly drives most of the month's revenue. If your SEO report leads with rankings, ask a harder question: how many leads did search produce this month, and from which pages?",
      "## What conversion tracking actually means",
      "Conversion tracking means every action that represents money gets recorded as an event: phone calls tapped from a mobile search, contact and quote forms submitted, bookings completed, direction requests from your Google Business Profile. Each event carries its source, so you can trace a June invoice back to an organic landing page.",
      "The stack I use for this is boring and proven: Google Analytics 4 for measurement, Google Tag Manager for deploying tags without touching site code, and Google Search Console for query-level search data. Together they answer the only question that matters: which search terms and pages turn into paying customers?",
      "## The GA4 and GTM setup I run on every site",
      "First, GA4 gets installed through GTM, not pasted into the theme, so tags survive redesigns and stay auditable. Second, every tel: link fires a click-to-call event. Third, forms fire an event on successful submission, not on page load of a thank-you URL that spam bots also hit. Fourth, the events that represent revenue get marked as key events in GA4 so they surface in every report and can feed Google Ads if you ever run it.",
      "Finally, I connect Search Console to GA4. That single link joins the query data (what people searched) with behavior data (what they did on the site), which is where the real insight lives.",
      "## From data to decisions",
      "Once tracking runs for a few weeks, the site starts telling you what to do next. A service page with high impressions and a weak click-through rate needs a better title and meta description. A page with strong traffic and no conversions has a content or trust problem, so add reviews, pricing signals, and a clearer call to action. A keyword that converts at twice the site average deserves its own dedicated page and internal links.",
      "This is the compounding loop that makes SEO an investment instead of a cost: measure, find the leak, fix it, measure again. None of it is possible when the only number in the report is a ranking.",
      "## Where to start this quarter",
      "If you only do one thing this quarter, wire up conversion tracking before spending another dollar on content or links. It takes a few hours for a typical local business site, and it converts every future SEO decision from a guess into a calculation. If you want it done for you, that is exactly the foundation I set up for every client before I chase a single keyword.",
    ],
  },
  {
    slug: "three-events-local-business",
    title: "The three conversion events every local business should track",
    date: "2026-05-15",
    excerpt:
      "You do not need a complicated analytics setup. You need three events wired up correctly. These are the ones that count.",
    body: [
      "Local service businesses live and die on a handful of actions: someone calls, someone fills a form, someone asks for a quote. Track those three correctly and your website stops being a brochure and becomes a measurable sales channel. Miss them and you are flying blind, no matter how much traffic Google sends you.",
      "The good news is that this does not require an enterprise analytics stack. Google Analytics 4 and Google Tag Manager are free, and the whole setup fits into an afternoon. Here is exactly what I wire up, in priority order, for every plumber, roofer, clinic, and detailer I work with.",
      "## 1. Phone calls, especially click-to-call",
      "For most local businesses, the phone is where money enters the building. On mobile, where the majority of local searches happen, a tap on your phone number is the single highest-intent action on the site, and it is invisible unless you track it.",
      "The fix is a GTM click trigger on every tel: link that fires a phone_call event into GA4. Mark it as a key event and you can suddenly see which pages, which keywords, and which times of day produce calls. Pair it with call data from your Google Business Profile and you have a nearly complete picture of inbound phone demand. If you run call-heavy campaigns, dynamic number insertion adds source-level precision, but the tel: click event alone covers most local businesses.",
      "## 2. Form submissions, measured on success",
      "Almost every site tracks forms wrong. Counting visits to a thank-you page inflates the numbers with bots, refreshes, and accidental hits, while some form plugins never redirect at all, so submissions go completely uncounted.",
      "The right way is to fire an event on the form's actual success state: the AJAX success callback, the confirmation element appearing, or the form plugin's built-in dataLayer push. That gives you a form_submit event that matches reality one to one. From there, GA4 can tell you the conversion rate of every landing page, which is the number that should drive your content priorities.",
      "## 3. Quote and booking requests",
      "If your business takes bookings or quote requests, those deserve their own event, separate from general contact forms. A message asking 'what are your hours' and a request for a roof replacement estimate are not the same lead, and mixing them poisons your data.",
      "Split them, mark the high-value event as a key event, and you can calculate what a visitor from each channel is actually worth. That is the number that tells you whether SEO is beating your ad spend, and it is the number I anchor every monthly report around.",
      "## Wiring it up in Google Tag Manager",
      "The implementation pattern is the same for all three: a trigger that detects the action, a GA4 event tag that records it, and a naming convention you keep forever. Test everything in GTM preview mode before publishing, click the real buttons on a real phone, and confirm the events land in GA4's realtime view. Then connect Search Console so query data sits next to conversion data.",
      "## Reading the numbers each month",
      "With these three events running, your monthly review takes fifteen minutes: which pages produced calls, which produced forms, which produced quotes, and what changed from last month. Traffic becomes a supporting metric instead of the headline. When a page draws visitors but no events, you have found your next optimization target. When a page quietly produces a third of your calls, you have found what to build more of. That is the whole game: three events, wired once, read monthly.",
    ],
  },
  {
    slug: "clinic-158-to-501",
    title: "How a clinic went from 158 to 501 clicks in six months",
    date: "2026-04-20",
    excerpt:
      "A short walk through a real result: what was broken, what I changed, and how the numbers moved.",
    body: [
      "A local myofascial release clinic came to me almost invisible in search: 158 organic clicks over six months, barely any impressions outside its own brand name, and no way to tell whether the website had ever produced a patient. Six months later the same site had 501 clicks, impressions had grown from 2.2K to 8.7K, and click-through rate peaked at 6.1 percent. Here is the actual work behind those numbers.",
      "## Where the site started",
      "The diagnosis was familiar. The site had a handful of thin pages, one generic 'services' page trying to rank for everything, no locally targeted content, and indexing problems that kept some pages out of Google entirely. Search Console was not verified, analytics was an old Universal Analytics tag that had stopped collecting data, and there was no conversion tracking of any kind.",
      "That last part mattered most. Before touching keywords, I set up GA4 through Google Tag Manager, wired click-to-call and form submission events, and verified Search Console. Whatever happened next, we would be able to prove it.",
      "## Fixing the foundations",
      "Technical work came first because nothing else compounds until Google can crawl and understand the site. I cleaned up indexing so every page that should rank was in the index and nothing wasteful was, fixed the heading structure so each page had one clear H1, compressed images that were dragging load times, and added LocalBusiness structured data so Google understood exactly what the clinic was, where it operated, and what it treated.",
      "None of this is glamorous. All of it is why the later content work landed as fast as it did.",
      "## Pages built around patient intent",
      "The single biggest change was replacing one generic services page with dedicated pages for each treatment and the conditions it addresses, written in the language patients actually type. People do not search for clinical terminology; they search for their pain, their area, and phrases like 'near me'. Each page answered the questions a prospective patient asks before booking: what the treatment involves, what it helps with, what a first visit looks like, and how to get in touch.",
      "Every page got a title tag written like an ad rather than a label, because rankings only pay when people click. That is a big part of why CTR climbed to a 6.1 percent peak, well above what most local health sites see.",
      "## What the numbers did, and what they mean",
      "Growth was not linear. The first two months looked quiet while pages were indexed and began accruing signals, then clicks compounded: 158 became 501, impressions nearly quadrupled to 8.7K, and average position improved from around 20 to around 15. Average CTR actually dipped slightly over the period, and that is worth understanding: when reach expands quickly, you pick up thousands of new impressions at lower positions before the clicks catch up. Early in a growth curve, that dip is a sign of expansion, not decline.",
      "Because tracking went in before the SEO work, every one of those clicks connects to real events: calls tapped, forms sent, appointments requested. The clinic does not have to take my word that SEO worked; it is in their own analytics.",
      "## What this means for your business",
      "The playbook is not secret: verify and fix the technical base, build pages around buyer intent rather than your internal service menu, write titles that earn the click, and measure everything from day one. What most businesses lack is not knowledge but execution and proof. The full breakdown with the Search Console charts is on the case study page, and if you want to know what the same approach would look like on your site, send me the URL and I will tell you straight.",
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
