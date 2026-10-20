import { NextResponse, type NextRequest } from "next/server";

/**
 * Country allow-list. Visitors from anywhere else get a plain 403 page with no
 * analytics on it, so they never reach GA4 or Vercel Analytics.
 *
 * The country comes from Vercel's edge (x-vercel-ip-country), which Vercel sets
 * itself and a visitor can't override. A VPN changes the IP, so it changes the
 * country too: this filters ordinary traffic, not someone determined to get in.
 */
const ALLOWED = new Set([
  // core markets
  "US", "CA", "GB", "IE", "AU", "NZ",
  // Western Europe
  "DE", "FR", "NL", "BE", "LU", "AT", "CH", "DK", "SE", "NO", "FI", "IS", "ES", "PT", "IT",
  // home base
  "NG",
]);

/**
 * Search, AI and link-preview crawlers. Most crawl from the US, but Google also
 * crawls from other countries for locale checks, and a blocked crawl drops
 * pages from the index. A user agent can be faked, but a person faking
 * Googlebot to read an SEO blog isn't the traffic this is here to stop.
 */
const CRAWLERS =
  /googlebot|google-inspectiontool|googleother|storebot-google|adsbot-google|mediapartners-google|google-extended|bingbot|msnbot|bingpreview|duckduckbot|applebot|yandex|baiduspider|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-user|claude-searchbot|anthropic-ai|perplexitybot|perplexity-user|ccbot|amazonbot|meta-externalagent|facebookexternalhit|facebookcatalog|whatsapp|linkedinbot|twitterbot|slackbot|discordbot|telegrambot|pinterest|ahrefsbot|semrushbot/i;

const BLOCKED_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Not available in your region</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:16px/1.5 system-ui,sans-serif;background:#0b0f0c;color:#e8ece9;padding:24px;text-align:center}p{color:#9aa39d;max-width:40ch}</style>
</head><body><main><h1>Koinophobe isn&rsquo;t available in your region.</h1><p>We only take on clients in a few countries right now.</p></main></body></html>`;

export function middleware(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country");
  // No header means local dev or a non-Vercel host: let it through.
  if (!country || ALLOWED.has(country)) return NextResponse.next();
  if (CRAWLERS.test(req.headers.get("user-agent") ?? "")) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not available in your region" }, { status: 403 });
  }
  return new NextResponse(BLOCKED_HTML, {
    status: 403,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

export const config = {
  // Skip build assets and the files crawlers fetch (robots, sitemap, IndexNow key).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.txt$).*)"],
};
