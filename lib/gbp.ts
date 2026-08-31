// Content and settings for the /google-business-profile landing page.
// Everything you are likely to change lives in this file.

// ---------------------------------------------------------------------------
// SETTINGS — edit these first
// ---------------------------------------------------------------------------

// !! REQUIRED BEFORE YOU RUN ANY TRAFFIC !!
// WhatsApp number in international format: digits only, no "+", no spaces.
// 0803 123 4567 becomes "2348031234567".
// Every button on the page opens wa.me with this number. Leave it wrong and
// every click lands on WhatsApp's "invalid number" screen.
export const WHATSAPP_NUMBER = "2340000000000";

// Prefilled text in the chat the visitor opens.
export const WHATSAPP_MESSAGE =
  "Hi Michael. I found your Google Maps page. I want to get my business listed.";

// Shown as the starting price. Keep the naira sign in the string.
export const PRICE_FROM = "₦95,000";
export const PRICE_FROM_NUMERIC = "95000";
export const PRICE_MONTHLY = "₦60,000";

export const DELIVERY_DAYS = 7;

// ---------------------------------------------------------------------------
// VIDEO
// ---------------------------------------------------------------------------
// Paste the EMBED url, not the watch url.
//   YouTube  https://www.youtube-nocookie.com/embed/VIDEO_ID
//   Vimeo    https://player.vimeo.com/video/VIDEO_ID
// Leave it empty and the section renders a placeholder frame instead.
export const VIDEO_EMBED_URL: string = "";

// Optional thumbnail. Drop a 1280x720 image in /public and point at it,
// e.g. "/gbp-vsl-poster.jpg". Empty means a plain lime frame.
export const VIDEO_POSTER: string = "";

export const VIDEO_LENGTH = "3 min";

export const vslChapters = [
  { at: "0:00", label: "Why nobody can find you on Maps" },
  { at: "0:40", label: "The verification wall, and why it fails" },
  { at: "1:30", label: "What a profile that actually works looks like" },
  { at: "2:10", label: "What I do in seven days, and what it costs" },
];

// In-page anchors for the sticky bar. No links off the page.
export const anchors = [
  { label: "Watch", href: "#watch" },
  { label: "The problem", href: "#problem" },
  { label: "What you get", href: "#whats-included" },
  { label: "Price", href: "#price" },
  { label: "Questions", href: "#faq" },
];

// The two facts in the floating hero card.
export const heroFacts = [
  { value: `${DELIVERY_DAYS} days`, label: "Start to verified" },
  { value: "30+", label: "Client sites managed" },
];

// ---------------------------------------------------------------------------
// COPY
// ---------------------------------------------------------------------------

export const painPoints = [
  {
    title: "You started the setup and got stuck.",
    body: "Google asked for something you did not have, you closed the tab, and it has sat half-finished since.",
  },
  {
    title: "You never got verified.",
    body: "No badge means no map pack. Nigeria mostly gets video verification now, and it fails for small reasons that are easy to avoid.",
  },
  {
    title: "You cannot find where to edit anything.",
    body: "The dashboard moved into Search itself. Most owners never find it, so hours, phone numbers and photos go stale.",
  },
  {
    title: "You have no reviews.",
    body: "Two competitors with fifteen reviews each will outrank a better business with none. Reviews are a ranking factor, not just social proof.",
  },
];

export const deliverables = [
  {
    title: "Claimed and verified",
    body: "Profile created or claimed in your name, then verified end to end. Video, postcard or phone, whichever Google asks for. I walk you through it.",
  },
  {
    title: "Categories done properly",
    body: "Primary and secondary categories are the single biggest ranking lever in the map pack, and the one almost everyone gets wrong.",
  },
  {
    title: "Built out, not just switched on",
    body: "Hours and holiday hours, service areas, attributes, a description written for search, services and prices where they help.",
  },
  {
    title: "Photos that actually load",
    body: "Ten images sized, compressed and named for search, plus logo and cover. Profiles with photos get materially more direction requests.",
  },
  {
    title: "Calls and WhatsApp wired up",
    body: "Call button, WhatsApp link and website link pointing to the right places, so an enquiry reaches you instead of dying on the profile.",
  },
  {
    title: "Reviews started",
    body: "Your short review link, a request script you can send to past customers, and a reply template for when the first ones land.",
  },
  {
    title: "Numbers you can see",
    body: "Insights connected and explained: calls, direction requests, searches and clicks, so you know whether this is working.",
  },
  {
    title: "Handover, no lock-in",
    body: "You own the profile. I am a manager you can remove at any time. Nothing is held hostage.",
  },
];

export const timeline = [
  {
    day: "Day 1",
    title: "Audit and claim",
    body: "I check whether a listing already exists, whether anyone else claimed it, and what state it is in. Then we claim it in your name.",
  },
  {
    day: "Days 2 to 5",
    title: "Verification",
    body: "The part that stops most people. I prepare the video walkthrough or postcard details with you and handle the resubmissions if Google is difficult.",
  },
  {
    day: "Days 5 to 7",
    title: "Build out and handover",
    body: "Categories, description, photos, services, buttons, review link and insights. Then a short call where I show you what to do with it.",
  },
];

export const proofStats = [
  { value: "30+", label: "Client sites built and managed" },
  { value: "787K", label: "Search impressions tracked in 12 months" },
  { value: "3.2×", label: "Organic clicks in six months, one client" },
  { value: "Top 3", label: "Local map pack for a client in a hard niche" },
];

export const included = [
  "Profile claimed or created in your name",
  "Verification handled end to end",
  "Categories, description, hours, service areas",
  "Ten optimised photos, logo and cover",
  "Call and WhatsApp buttons wired up",
  "Review link, request script and reply template",
  "Insights connected and explained on a call",
];

export const faqs = [
  {
    q: "How long does verification really take?",
    a: "Usually two to seven days. Video verification is now the common route in Nigeria and it fails on small things: filming the wrong order, no visible signage, no proof of equipment. I prepare it with you before you record, which is most of the reason it passes first time.",
  },
  {
    q: "Do you need my Google password?",
    a: "No, and you should not give it to anyone. You add me as a manager on the profile and remove me whenever you want. The profile is created in your name and stays yours.",
  },
  {
    q: "I work from home or move around. Can I still be listed?",
    a: "Yes. Service-area businesses hide the street address and show the areas they cover instead. That is the correct setup for trades, consultants, caterers, photographers and most people who go to the customer.",
  },
  {
    q: "My profile was suspended. Can it be fixed?",
    a: "Sometimes. Suspensions usually come down to the business name, the address or a category mismatch, and most of those are fixable through reinstatement. Send me what happened and I will tell you honestly whether it is worth the attempt before you pay anything.",
  },
  {
    q: "Someone else already created a listing for my business.",
    a: "That happens more than you would think. We request ownership and transfer it to you. If they do not respond within the window, Google hands it over.",
  },
  {
    q: "What happens after the seven days?",
    a: "It is yours, working, with nothing owing. If you want it maintained afterwards, posts, review replies and a monthly report are available, but nothing about the setup depends on you buying it.",
  },
];

export const objections = [
  "You keep ownership of the profile",
  "Fixed price, agreed before I start",
  "Verification handled, not just advice",
];
