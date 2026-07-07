# Koinophobe — Deploy & Measurement Runbook

Everything to take the site from repo to fully-measured production on
koinophobe.com. Work top to bottom; each section says what "done" looks like.

---

## 1. Build & push

```bash
npm install        # lenis + nodemailer since the last deploy
npm run build      # must pass locally before pushing
git push origin main
```

Vercel auto-deploys `main`. Build settings are defaults (Next.js preset), no
overrides needed.

## 2. Domains & DNS (Namecheap)

Nameservers: **Namecheap BasicDNS** (dns1/dns2.registrar-servers.com).
Ignore Vercel's banner recommending its own nameservers — switching would
kill Namecheap email forwarding.

Advanced DNS host records:

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | @    | 216.198.79.1           |
| CNAME | www  | cname.vercel-dns.com   |

Vercel → Project → Settings → Domains: `koinophobe.com` (primary) and
`www.koinophobe.com` (redirects to apex).

**Done when:** both domains show valid in Vercel and https://www.koinophobe.com
308-redirects to the apex.

## 3. Email

- Namecheap → Advanced DNS → Mail Settings: **Email Forwarding** (creates the
  five `eforward*.registrar-servers.com` MX records + SPF TXT).
- Domain tab → Redirect Email: alias `michael` → thekoinophobe@gmail.com.
  (Alias field takes only the part before the @.)
- Gmail → Settings → Accounts → Send mail as: `michael@koinophobe.com`,
  SMTP `smtp.gmail.com`, port 587 TLS, username = the Gmail address,
  password = a Gmail App Password. Tick "Treat as an alias".

**Done when:** a test email to michael@ lands in Gmail and you can reply from
the michael@ identity.

## 4. Environment variables (Vercel → Settings → Environment Variables)

| Name | Value | Purpose |
|------|-------|---------|
| `CONTACT_SMTP_USER` | thekoinophobe@gmail.com | contact form sender account |
| `CONTACT_SMTP_PASS` | Gmail App Password | contact form SMTP auth |
| `CONTACT_TO` | thekoinophobe@gmail.com | where leads land (optional) |
| `NEXT_PUBLIC_GTM_ID` | GTM-XXXXXXX | loads Tag Manager (consent-gated) |
| `GA4_PROPERTY_ID` | numeric id | live visits counter in the footer |
| `GA_SA_CLIENT_EMAIL` | ...@...iam.gserviceaccount.com | GA4 Data API auth |
| `GA_SA_PRIVATE_KEY` | private key from the SA JSON | GA4 Data API auth |

Leave `NEXT_PUBLIC_GA_ID` unset when using GTM (GA4 loads inside the
container; setting both is double-tracking). **Redeploy after adding vars.**

## 5. GA4 (analytics.google.com)

1. Admin → Create property "Koinophobe" (your timezone/currency).
2. Add a **Web** data stream for https://koinophobe.com → note the
   Measurement ID (`G-…`). You will paste it into GTM, not into the code.
3. Admin → Data settings → Data retention → **14 months**.
4. Note the numeric **Property ID** (Admin → Property settings) for
   `GA4_PROPERTY_ID`.

## 6. GTM (tagmanager.google.com)

1. Create account "Koinophobe" → container `koinophobe.com` (Web) → note the
   `GTM-XXXXXXX` id for the env var.
2. Tags → New → **Google Tag** → paste the GA4 Measurement ID → trigger:
   All Pages (Initialization).
3. Custom events the site already pushes to the dataLayer:
   - `book_a_call_click` (param `label`)
   - `contact_submit` (param `type`: Agency / Business / Other)

   For each: Triggers → New → **Custom Event** → event name as above →
   then Tags → New → **GA4 Event** → same event name → attach the trigger.
4. Preview mode: accept the site's cookie banner first — GTM is
   consent-gated and won't load before that.
5. **Submit/Publish** the container.
6. In GA4 → Admin → Events: once the events flow, mark `contact_submit` and
   `book_a_call_click` as **key events**.

**Done when:** Tag Assistant shows the Google Tag plus both custom events
firing, and GA4 Realtime shows your visit.

## 7. Search Console (search.google.com/search-console)

1. Add property → **Domain** → koinophobe.com.
2. Copy the TXT record → Namecheap Advanced DNS → add TXT @ … → verify
   (can take ~15 min).
3. Sitemaps → submit `https://koinophobe.com/sitemap.xml`.
4. GA4 → Admin → Product links → Search Console links → link the property.
5. Optional: Bing Webmaster Tools → import from GSC.

## 8. Social bio links (Instagram / X)

Short branded links (defined in `next.config.mjs` → `redirects()`) that apply
the UTM tags on arrival:

- Instagram bio: `koinophobe.com/ig`
- X/Twitter bio: `koinophobe.com/x`

For individual posts/threads add another redirect entry with its own
`utm_campaign` (e.g. `/clinic` → `?utm_source=twitter&utm_campaign=case-study-clinic`).
Read results in GA4 → Reports → Acquisition → Traffic acquisition
(dimension: session source/medium), or filter `source = instagram`.

## 9. Live visits counter (footer)

The footer shows the site's own GA4 page views ("walk the talk"). Setup:

1. console.cloud.google.com → New project "koinophobe" (same Google login,
   free, no billing needed).
2. APIs & Services → Enable **Google Analytics Data API**.
3. IAM → Service accounts → Create ("koinophobe-site") → Keys → Add key →
   JSON → download.
4. GA4 → Admin → Property access management → add the service account's
   email as **Viewer**.
5. From the JSON, set env vars: `client_email` → `GA_SA_CLIENT_EMAIL`,
   `private_key` → `GA_SA_PRIVATE_KEY` (paste as-is, escaped \n included),
   plus `GA4_PROPERTY_ID`.
6. Redeploy. The counter appears under the footer wordmark once GA4 has
   data; it renders nothing while unconfigured, so nothing breaks meanwhile.
   Numbers refresh hourly.

## 10. Smoke test

- [ ] https://koinophobe.com loads with SSL, www redirects to apex
- [ ] /sitemap.xml and /robots.txt resolve
- [ ] Contact form delivers to Gmail (check spam first time), reply-to is the visitor
- [ ] mailto CTAs open with michael@koinophobe.com
- [ ] Cookie banner → accept → Tag Assistant sees GTM + GA4
- [ ] `book_a_call_click` and `contact_submit` visible in GA4 Realtime
- [ ] Social card looks right: paste URL into opengraph.xyz
- [ ] Lighthouse spot-check on / (mobile)

## 11. Ongoing (monthly, 15 minutes)

GSC: queries growing? pages indexed? GA4: sessions by source (watch the
instagram/twitter rows), key events by landing page. That's the same review
you sell — run it on yourself.
