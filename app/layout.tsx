import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieConsent } from "@/components/CookieConsent";
import { site } from "@/lib/site";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["italic", "normal"],
  weight: ["400", "500"],
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
    default: "Koinophobe — SEO you can measure",
    template: `%s — ${site.name}`,
  },
  description:
    "Freelance SEO and conversion tracking. I grow your organic traffic and prove it converts, with GA4, GTM and reporting that ties rankings to real leads.",
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
    title: "Koinophobe — SEO you can measure",
    description:
      "I grow organic traffic and prove it converts, with tracking that ties rankings to real leads.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koinophobe — SEO you can measure",
    description:
      "Freelance SEO and conversion tracking that ties rankings to real leads.",
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
  sameAs: [site.github],
  areaServed: "Worldwide (remote, US hours)",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="https://cdn.fontshare.com/wf/MKEEQN57GWBZOSYWCRODNJOOZNPLMAKN/5SPTSZGHEACWWLF34DQ4WAA4OGU6PQIF/KN7DX4F6PXB74R6L2K2Y4NH3CB7FC53Q.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="https://cdn.fontshare.com/wf/P6VJ47S3OYMUC7HYSJLTK7PEIK5O2NPQ/TK62VLUWA76PMTK2XWBNDZB7QVXJGYE3/I5W5NEJGYVFUC5I4XOXVET63OE5PSVHJ.woff2"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="js-anim min-h-screen">
        <ThemeProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
