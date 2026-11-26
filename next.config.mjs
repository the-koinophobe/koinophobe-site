/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only the icons actually imported get bundled.
  experimental: { optimizePackageImports: ["lucide-react"] },
  poweredByHeader: false,
  // AVIF first: about a fifth smaller than WebP for the same photo.
  images: { formats: ["image/avif", "image/webp"] },
  // public/admin/index.html is only served at its literal path, so point the
  // clean URL at it. Sveltia routes internally on the hash, so one entry is all
  // it needs.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  // Short branded links for social bios; UTM tags are applied on arrival so
  // GA4 attributes the visit. Add more here per campaign as needed.
  async redirects() {
    return [
      { source: "/approach", destination: "/about", permanent: true },
      // The clinic case study moved into the notes; Search Console still shows
      // impressions on the old URL.
      { source: "/work/wellness-clinic", destination: "/notes/clinic-4-to-104-clicks", permanent: true },
      // Nov 2026: the old slug claimed 158 to 501 clicks, which the export does not support.
      { source: "/notes/clinic-158-to-501", destination: "/notes/clinic-4-to-104-clicks", permanent: true },
      // Oct 2026: the site sells to home service businesses only. Pages and
      // notes written for startups, SaaS, agencies and other trades send their
      // visitors (and any ranking they earned) to the closest page that's left.
      { source: "/saas-seo", destination: "/ai-search-optimization", permanent: true },
      { source: "/google-business-profile", destination: "/google-business-profile-optimization", permanent: true },
      { source: "/notes/topic/startups", destination: "/notes", permanent: true },
      { source: "/notes/seo-for-startups", destination: "/notes", permanent: true },
      { source: "/notes/nextjs-seo-checklist", destination: "/notes/what-is-technical-seo", permanent: true },
      { source: "/notes/javascript-seo-react", destination: "/notes/what-is-technical-seo", permanent: true },
      { source: "/notes/startup-backlinks", destination: "/notes/nap-citations-contractors", permanent: true },
      { source: "/notes/saas-feature-pages", destination: "/notes/roof-replacement-service-page", permanent: true },
      { source: "/notes/change-domain-name-seo", destination: "/notes/website-migration-without-losing-rankings", permanent: true },
      { source: "/notes/saas-comparison-pages", destination: "/notes/content-ai-cites", permanent: true },
      { source: "/notes/chatgpt-shopping-products", destination: "/notes/get-business-recommended-by-chatgpt", permanent: true },
      { source: "/notes/ai-search-professional-services", destination: "/notes/ai-search-local-business", permanent: true },
      { source: "/notes/auto-repair-shop-seo", destination: "/notes/topic/trades", permanent: true },
      { source: "/notes/mobile-detailing-seo", destination: "/notes/topic/trades", permanent: true },
      { source: "/notes/white-label-technical-seo-for-agencies", destination: "/pricing", permanent: true },
      {
        source: "/ig",
        destination: "/?utm_source=instagram&utm_medium=social&utm_campaign=bio",
        permanent: false,
      },
      {
        source: "/x",
        destination: "/?utm_source=twitter&utm_medium=social&utm_campaign=bio",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      // Post images for X, LinkedIn and Substack. CORS lets the browser-side
      // posting flow fetch them from another origin and attach them as files.
      {
        source: "/social/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
          // Script sources are left open (GTM, GA4, Vercel and Cal load from
          // several hosts), so this CSP closes the cheap holes only: no
          // plugins, no <base> hijack, no framing by other sites, no mixed content.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          {
            key: "Content-Security-Policy",
            value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
          },
        ],
      },
      // Videos, posters, icons and photos in /public have stable names, so a
      // week in the browser cache and a month of stale-while-revalidate.
      ...["/work/:path*", "/icons/:path*", "/site/:path*", "/gtm/:path*", "/notes/photos/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      })),
      // The CMS sign-in page: keep it out of search results.
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/admin",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
