import { TradePage, type Trade } from "@/components/TradePage";
import { pageMeta } from "@/lib/meta";

export const revalidate = 3600;

export const metadata = pageMeta({
  title: { absolute: "Plumbing and HVAC marketing: Google, the map and AI" },
  description:
    "Digital marketing for plumbers and HVAC companies: Google Business Profile, Local Services Ads, local links and AI search, so emergency calls find you first.",
  path: "/plumbing-hvac-marketing",
});

const trade: Trade = {
  path: "/plumbing-hvac-marketing",
  crumb: "Plumbing and HVAC",
  kicker: "Plumbing and HVAC",
  h1: "Plumbing and HVAC marketing that rings the phone",
  lead: "When a pipe bursts or the AC dies, nobody scrolls. They call one of the three businesses in the map. This plan is about being one of them, in every town you drive to.",
  searches: ["emergency plumber near me", "AC repair [town]", "water heater replacement", "furnace not working", "HVAC company near me"],
  fixes: [
    { t: "The map, town by town", b: "Categories, services and service areas set so you show for the towns you actually cover, not just the one on your address." },
    { t: "Local Services Ads", b: "Google Screened, pay per lead, at the top of emergency searches. Set up with your license and insurance." },
    { t: "Seasonal pages, live early", b: "AC pages live before the heat, furnace pages before the cold. Google needs weeks to find them, so timing matters." },
    { t: "After-hours calls counted", b: "Call tracking that shows which calls came at 2am from the map, so you know what the emergency work is worth." },
    { t: "Reviews that mention the job", b: "A text after each job asking for a review that names the work. Those words help you show for the same search next time." },
    { t: "Named by AI", b: "Clean listings and clear service pages, so ChatGPT and Google's AI answers name you when someone asks who to call." },
  ],
  faq: [
    { q: "Do you work with HVAC and plumbing companies?", a: "Yes. The plan is the same one I run for roofers and remodelers: Google profile, Local Services Ads, local links, pages and tracking. My published case studies aren't in plumbing or HVAC yet, and I'll say so up front." },
    { q: "Are Local Services Ads worth it for plumbers?", a: "Usually, for emergency work. You pay per lead, not per click, and the Google Screened badge sits above the regular ads. I set them up as part of the fix; ad spend is yours." },
    { q: "How much does it cost?", a: "The Google fix is $2,500 for four weeks, then $1,000 a month if you want it kept growing. The audit and intro call are free." },
    { q: "Can you cover several towns?", a: "Yes. Your service areas, a page for each main town where it helps, and links from local sites in those towns." },
  ],
  notes: ["hvac-seo", "plumbing-seo", "missed-calls-contractors", "seasonal-content-calendar-home-services"],
};

export default function Page() {
  return <TradePage trade={trade} />;
}
