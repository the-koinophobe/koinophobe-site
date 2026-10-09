export const site = {
  name: "Koinophobe",
  owner: "Michael Edward",
  email: "michael@koinophobe.com",
  linkedin: "https://www.linkedin.com/in/airdward/",
  linkedinHandle: "linkedin.com/in/airdward",
  x: "https://x.com/con610t",
  xHandle: "@con610t",
  /**
   * Cal.com. `calLink` is the username/event slug, used by the inline embed on
   * /contact. `booking` is the same page as a plain link for every other CTA,
   * so no page but /contact ever loads Cal's script.
   */
  calLink: "koinophobe/intro",
  booking: "https://cal.com/koinophobe/intro",
  /** Said next to every booking button. Only change it if the promise changes. */
  hours: "same-day replies",
  /** Where Koinophobe takes clients. Used in copy and in every schema areaServed. */
  markets: "the US, Australia and Europe",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Place", name: "Europe" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Notes", href: "/notes" },
  ],
};
