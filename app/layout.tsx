import type { Metadata } from "next";
import { Instrument_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { ChromeGate } from "@/components/ChromeGate";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
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
  style: ["italic", "normal"],
  weight: ["300", "400", "500"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koinophobe.com"),
  title: {
    default: "Koinophobe · Technical SEO that shows up in the numbers",
    template: `%s · ${site.name}`,
  },
  description:
    "Technical SEO and measurement for local businesses. Eighteen months of live Search Console data across five properties, good rows and bad rows.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Koinophobe",
  description:
    "Freelance SEO and conversion tracking. Grows organic traffic and proves it converts with analytics that tie rankings to leads.",
  url: "https://koinophobe.com",
  founder: { "@type": "Person", name: "Michael Edward" },
  sameAs: [site.linkedin, site.x],
  areaServed: "United States (remote, US Eastern hours)",
  knowsAbout: [
    "Technical SEO",
    "On-page SEO",
    "Local SEO",
    "Conversion tracking",
    "Google Analytics 4",
    "Google Tag Manager",
    "Core Web Vitals",
  ],
  serviceType: "Search Engine Optimization",
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: "https://koinophobe.com",
  inLanguage: "en",
  author: { "@type": "Person", name: site.owner, sameAs: [site.linkedin, site.x] },
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, siteLd]) }}
        />
      </head>
      <body className="js-anim min-h-screen">
        <ThemeProvider>
          <SmoothScroll />
          <Cursor />
          <ChromeGate>
            <Header />
          </ChromeGate>
          <main>{children}</main>
          <ChromeGate>
            <Footer />
          </ChromeGate>
        </ThemeProvider>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
