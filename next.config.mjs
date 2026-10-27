/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only the icons actually imported get bundled.
  experimental: { optimizePackageImports: ["lucide-react"] },
  poweredByHeader: false,
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
      // Oct 2026: the site sells to home service businesses only. Pages and
      // notes written for startups, SaaS, agencies and other trades send their
      // visitors (and any ranking they earned) to the closest page that's left.
      { source: "/saas-seo", destination: "/ai-search-optimization", permanent: true },
      { source: "/google-business-profile", destination: "/notes/service-area-business-google-business-profile", permanent: true },
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
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
