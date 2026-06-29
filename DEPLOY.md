# Deploying Koinophobe

A start-to-finish guide to get the site live on Vercel (free) with your domain, contact form, and analytics.

## 0. One-time accounts
- A GitHub account (github.com)
- A Vercel account (vercel.com) — sign in with GitHub

## 1. Push the project to GitHub
From the `koinophobe` folder:

```bash
git init
git add .
git commit -m "Koinophobe site"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<you>/koinophobe.git
git branch -M main
git push -u origin main
```

(Your `.gitignore` already excludes `node_modules` and `.next`.)

## 2. Deploy on Vercel
1. vercel.com → "Add New… → Project" → import your `koinophobe` repo.
2. Vercel auto-detects Next.js. Leave the defaults.
3. Click Deploy. In ~1 minute you get a live `*.vercel.app` URL.

Every future `git push` to `main` redeploys automatically.

## 3. Environment variables (optional but recommended)
In Vercel → your project → Settings → Environment Variables, add:

| Name | Value | What it does |
|------|-------|--------------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | your web3forms access key | makes the contact form send to your inbox |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | turns on your own GA4 tracking |

Redeploy after adding them (Deployments → … → Redeploy).

- **web3forms key:** go to web3forms.com, enter your email, copy the access key. Free. Until this is set, the form falls back to opening the visitor's email app.
- **GA4 ID:** analytics.google.com → Admin → Data Streams → your web stream → "Measurement ID" (starts with `G-`).

## 4. Connect your domain
1. Vercel → project → Settings → Domains → add `koinophobe.com` (and `www`).
2. Vercel shows the DNS records to add. At your domain registrar, add them (usually an `A` record to Vercel's IP and a `CNAME` for `www`). SSL is automatic.
3. **If your domain is NOT koinophobe.com**, update these three spots to your real domain:
   - `app/layout.tsx` → `metadataBase` and the Open Graph `url`
   - `app/sitemap.ts` → `base`
   - `app/robots.ts` → `sitemap`
   - `lib/site.ts` → `email` (e.g. `hi@yourdomain.com`)

## 5. After it's live
- **Google Search Console:** add the property, verify, and submit `https://yourdomain.com/sitemap.xml`.
- **Test the contact form** end to end (check it lands in your inbox).
- **Preview the social card:** paste the URL into opengraph.xyz or the LinkedIn Post Inspector.
- **Lighthouse:** Chrome DevTools → Lighthouse → run mobile. You're selling performance, so this should score well.
- **Phone check:** confirm the work-grid videos play on tap/scroll and the layout holds on a real phone.

## Still to add (content you supply)
- A real photo of you on the About page (`app/about/page.tsx`).
- The three process-card images in `public/process/` (rank / track / prove) — your GA4, SERP, or Search Console screenshots work well.
- Real prices in `lib/content.ts` (`packages`) if you want figures instead of One-off / Monthly / Custom.
