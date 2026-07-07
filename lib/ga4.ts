import crypto from "crypto";
import { unstable_cache } from "next/cache";

// Server-side GA4 Data API client, zero dependencies: signs the service
// account JWT with node's crypto, trades it for an OAuth token, and runs a
// report. Used by <SiteVisits /> to show the site's own traffic.
//
// Env vars (server-only):
//   GA4_PROPERTY_ID      numeric property id (GA4 Admin -> Property settings)
//   GA_SA_CLIENT_EMAIL   service account email (...@...iam.gserviceaccount.com)
//   GA_SA_PRIVATE_KEY    the private key from the service account JSON
//                        (keep the \n escapes; they are unescaped here)
//
// The service account must be added in GA4 Admin -> Property access
// management as Viewer.

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64url");

async function getAccessToken(email: string, key: string): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const unsigned = `${header}.${claims}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(key.replace(/\\n/g, "\n"));
  const jwt = `${unsigned}.${b64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

async function fetchVisits(): Promise<number | null> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const email = process.env.GA_SA_CLIENT_EMAIL;
  const key = process.env.GA_SA_PRIVATE_KEY;
  if (!propertyId || !email || !key) return null;

  try {
    const token = await getAccessToken(email, key);
    if (!token) return null;

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "2026-01-01", endDate: "today" }],
          metrics: [{ name: "screenPageViews" }],
        }),
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      rows?: { metricValues?: { value?: string }[] }[];
    };
    const value = json.rows?.[0]?.metricValues?.[0]?.value;
    const n = value ? parseInt(value, 10) : NaN;
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

// Cached for an hour so the API is hit at most ~24 times a day.
export const getSiteVisits = unstable_cache(fetchVisits, ["ga4-site-visits"], {
  revalidate: 3600,
});
