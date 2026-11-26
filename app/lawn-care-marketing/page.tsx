import { TradePage, type Trade } from "@/components/TradePage";
import { pageMeta } from "@/lib/meta";

export const revalidate = 3600;

export const metadata = pageMeta({
  title: { absolute: "Lawn care and landscaping marketing: Google, the map and AI" },
  description:
    "Digital marketing for lawn care and landscaping companies: Google Business Profile, local links, Local Services Ads and AI search, ready before spring.",
  path: "/lawn-care-marketing",
});

const trade: Trade = {
  path: "/lawn-care-marketing",
  crumb: "Lawn care and landscaping",
  kicker: "Lawn care and landscaping",
  h1: "Lawn care marketing, ready before spring",
  lead: "Most of a lawn company's year is booked in a few weeks of spring. The businesses already in the map when those searches start get the routes. This plan gets you there first.",
  searches: ["lawn care near me", "lawn mowing service [town]", "landscaping company near me", "yard cleanup", "weekly lawn service cost"],
  fixes: [
    { t: "In the map before the rush", b: "Your Google profile rebuilt in winter, so it has weeks of new photos and reviews by the time spring searches climb." },
    { t: "One page per service", b: "Mowing, cleanups, mulch, landscaping. Each with its own page, so you show for the job someone is searching for." },
    { t: "Towns on your routes", b: "Service areas and town pages for the neighborhoods you want more of, so the work stays close together." },
    { t: "Recurring customers tracked", b: "Calls and forms counted from first contact, so you know which searches bring weekly accounts, not one-off jobs." },
    { t: "Local links", b: "Garden centers, suppliers, HOAs and local sponsorships. Sites your neighbors know, vouching for you." },
    { t: "Named by AI", b: "Listings and pages ChatGPT and Google's AI answers can read, so you get named when someone asks for a lawn service nearby." },
  ],
  faq: [
    { q: "Do you work with lawn care and landscaping companies?", a: "Yes. The plan is the same one I run for roofers and remodelers. My published case studies aren't in lawn care yet, and I'll say so up front." },
    { q: "When should a lawn company start?", a: "Late winter. Google needs a few weeks to trust new pages and profile changes, and spring searches start climbing before the grass does." },
    { q: "How much does it cost?", a: "The Google fix is $2,500 for four weeks, then $1,000 a month if you want it kept growing. The audit and intro call are free." },
    { q: "Do I need a website?", a: "You need somewhere to send people that says what you do, where, and how to book. If the current site can't, I'll tell you on the call." },
  ],
  notes: ["lawn-care-seo", "lawn-mowing-seo", "landscaping-company-seo", "seasonal-content-calendar-home-services"],
};

export default function Page() {
  return <TradePage trade={trade} />;
}
