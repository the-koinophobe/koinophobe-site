export const site = {
  name: "Koinophobe",
  owner: "Michael Edward",
  // Domain inbox goes live with the koinophobe.com purchase (next week as of
  // 2026-07-04). Until then fallbackEmail is the monitored address.
  email: "michael@koinophobe.com",
  fallbackEmail: "thekoinophobe@gmail.com",
  linkedin: "https://www.linkedin.com/in/airdward/",
  linkedinHandle: "linkedin.com/in/airdward",
  tagline: "Numbers don't lie.",
  valueProp:
    "Technical SEO and measurement for local businesses, with the Search Console data to back every claim.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Approach", href: "/about" },
    { label: "Notes", href: "/notes" },
    { label: "Contact", href: "/contact" },
  ],
};

// Superseded by lib/gsc.ts, which carries the verified export figures.
// Kept because older pages still import it.
export const stats = [
  { value: "1.03M", label: "Search impressions across five client properties" },
  { value: "3,077", label: "Clicks, after subtracting a spam event I found" },
  { value: "4,981", label: "Queries ranked, 624 of them inside the top 3" },
  { value: "2 yr", label: "Of freelance SEO work for local businesses" },
];
