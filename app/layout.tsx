import type { Metadata } from "next";
import { Instrument_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { ChromeGate } from "@/components/ChromeGate";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { Anim } from "@/components/Anim";
import { CookieConsent } from "@/components/CookieConsent";
import { site } from "@/lib/site";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koinophobe.com"),
  title: {
    default: "Koinophobe · Technical SEO that shows up in the numbers",
    template: `%s · ${site.name}`,
  },
  description:
    "Technical SEO and measurement for local businesses. Thirty-plus sites in two years, with live Search Console data opened up on five of them.",
  keywords: [
    "SEO specialist",
    "technical SEO",
    "conversion tracking",
    "GA4",
    "Google Tag Manager",
    "white-label SEO",
    "local SEO",
    "search console",
  ],
  authors: [{ name: site.owner }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://koinophobe.com",
    siteName: site.name,
    title: "Koinophobe · Technical SEO that shows up in the numbers",
    description:
      "Technical SEO and measurement for local businesses, with the Search Console data to back it up.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koinophobe · Technical SEO that shows up in the numbers",
    description:
      "Technical SEO and measurement for local businesses. Every figure from a live export.",
  },
  robots: { index: true, follow: true },
};

/*
 * Entity graph. Three nodes joined by @id so Google reads one organisation,
 * one person and one site rather than three unrelated blobs.
 *
 * Deliberately Organization, not ProfessionalService. ProfessionalService is a
 * LocalBusiness, which asserts a place customers visit. There isn't one, and
 * claiming otherwise would contradict the advice on this very site about who
 * is eligible for a local listing. serviceType lives on Service, so the
 * services hang off an OfferCatalog where the vocabulary actually allows them.
 */
const ORG_ID = "https://koinophobe.com/#organization";
const PERSON_ID = "https://koinophobe.com/#michael";
const SITE_ID = "https://koinophobe.com/#website";

const SERVICES = [
  "Technical SEO",
  "Local SEO",
  "Google Business Profile management",
  "Conversion tracking and analytics implementation",
  "Website migration",
  "Core Web Vitals optimisation",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Koinophobe",
      url: "https://koinophobe.com",
      email: site.email,
      description:
        "Freelance technical SEO and conversion tracking. Grows organic search performance for local businesses and proves it with the client's own Search Console and analytics data.",
      founder: { "@id": PERSON_ID },
      sameAs: [site.linkedin, site.x],
      areaServed: { "@type": "Country", name: "United States" },
      knowsAbout: [
        "Technical SEO",
        "On-page SEO",
        "Local SEO",
        "Conversion tracking",
        "Google Analytics 4",
        "Google Tag Manager",
        "Google Search Console",
        "Core Web Vitals",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Search and analytics services",
        itemListElement: SERVICES.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            serviceType: name,
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "Country", name: "United States" },
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: site.owner,
      url: "https://koinophobe.com/about",
      email: site.email,
      jobTitle: "Technical SEO and analytics consultant",
      worksFor: { "@id": ORG_ID },
      sameAs: [site.linkedin, site.x],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: site.name,
      url: "https://koinophobe.com",
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <ChromeGate>
            <Header />
          </ChromeGate>
          <main>{children}</main>
          <ChromeGate>
            <Footer />
          </ChromeGate>
        </ThemeProvider>
        <Anim />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
