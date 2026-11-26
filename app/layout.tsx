import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./house.css";
import "./studio.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { Anim } from "@/components/Anim";
import { CookieConsent } from "@/components/CookieConsent";
import { site } from "@/lib/site";

// Inter for everything people read, Inter Tight at 600 for headlines. Self-
// hosted from the Fontsource packages: next/font/google can't parse the font
// URLs Google now serves, so builds on a clean machine failed.
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const interTight = localFont({
  src: "../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  variable: "--font-serif",
  display: "swap",
  weight: "100 900",
});
const jetbrainsMono = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koinophobe.com"),
  title: {
    default: "Koinophobe · Digital growth agency for local trades",
    template: `%s · ${site.name}`,
  },
  description:
    "Digital growth agency for roofers, remodelers and local service businesses: Google Business Profile, local link building, Local Services Ads, AI search and tracking. Prices on the site.",
  keywords: [
    "digital growth agency",
    "local SEO agency",
    "link building",
    "AI search optimization",
    "technical SEO",
    "conversion tracking",
    "GA4",
    "Google Tag Manager",
    "local SEO",
    "search console",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Koinophobe · Digital growth agency for local trades",
    description:
      "Found on Google, named by AI, booked by phone. Digital growth for local trades, with the Search Console data to back it up and the prices on the site.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koinophobe · Digital growth agency for local trades",
    description:
      "Digital growth for local trades. Every figure from a live export.",
  },
  robots: { index: true, follow: true },
};

/*
 * Entity graph. Two nodes joined by @id so Google reads one organization and
 * one site rather than two unrelated blobs.
 *
 * Deliberately Organization, not ProfessionalService. ProfessionalService is a
 * LocalBusiness, which asserts a place customers visit. There isn't one, and
 * claiming otherwise would contradict the advice on this very site about who
 * is eligible for a local listing. serviceType lives on Service, so the
 * services hang off an OfferCatalog where the vocabulary actually allows them.
 */
const ORG_ID = "https://koinophobe.com/#organization";
const SITE_ID = "https://koinophobe.com/#website";

const SERVICES = [
  "Digital growth for local businesses",
  "Local SEO",
  "Local link building",
  "AI search optimization",
  "Google Business Profile management",
  "Local Services Ads management",
  "Go-to-market strategy for B2B startups",
  "Technical SEO",
  "Conversion tracking and analytics implementation",
  "Website migration",
  "Core Web Vitals optimization",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Koinophobe",
      alternateName: ["Koinophobe Digital Growth", "koinophobe.com"],
      url: "https://koinophobe.com",
      logo: {
        "@type": "ImageObject",
        url: "https://koinophobe.com/icon.png",
      },
      image: "https://koinophobe.com/opengraph-image",
      email: site.email,
      description:
        "Digital growth agency for service and local businesses: Google Business Profile, local link building, Local Services Ads, AI search and tracking, proven with the client's own Search Console and analytics data.",
      slogan: "Found on Google, named by AI, booked by phone",
      sameAs: [site.linkedin, site.x, site.substack, site.instagram, site.youtube].filter(Boolean),
      areaServed: site.areaServed,
      knowsAbout: [
        "Digital marketing",
        "Link building",
        "Go-to-market strategy",
        "Technical SEO",
        "On-page SEO",
        "Local SEO",
        "Conversion tracking",
        "Google Analytics 4",
        "Google Tag Manager",
        "Google Search Console",
        "Core Web Vitals",
        "AI search optimization",
        "Generative engine optimization",
        "ChatGPT search",
        "Perplexity",
        "Google Gemini",
        "Claude",
        "Manus",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital growth services",
        itemListElement: SERVICES.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            serviceType: name,
            provider: { "@id": ORG_ID },
            areaServed: site.areaServed,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: site.name,
      alternateName: ["Koinophobe Digital Growth", "koinophobe.com"],
      url: "https://koinophobe.com",
      inLanguage: "en-US",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
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
        <a href="#main" className="skip">Skip to content</a>
        <ThemeProvider>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
        <Anim />
        <CookieConsent />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
