# Koinophobe

Personal site for Michael Edward (brand: Koinophobe). Next.js + TypeScript + Tailwind + GSAP, with warm light/dark themes.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx        Root layout: fonts, theme, header, footer
  page.tsx          Home (hero, capabilities, audience split, reviews, FAQ, CTA)
  work/page.tsx     Anonymised case studies
  about/page.tsx    Personal story
  globals.css       Theme tokens (light/dark) + hero wash + GSAP reveal base
components/
  Header / Footer / ThemeToggle / ThemeProvider
  BookCall          mailto CTA button (swap to Calendly later if wanted)
  Reveal            GSAP scroll reveal (reduced-motion safe)
  SectionHeading / Reviews / FAQ
lib/
  site.ts           Name, email, nav, stats
  content.ts        Services, capabilities, reviews, FAQ, case studies
```

## Edit the content (no design needed)

- **Reviews:** `lib/content.ts` → `reviews` (6 slots, replace placeholder text/names).
- **FAQ:** `lib/content.ts` → `faqs`.
- **Services / capabilities / case studies:** `lib/content.ts`.
- **Email + domain + stats:** `lib/site.ts`.

## Fonts

- **Clash Grotesk** (display/headings) loads from Fontshare via a `<link>` in `app/layout.tsx`.
- **Inter** (body), **Fraunces** (italic accent), **JetBrains Mono** (numbers/metrics) load via `next/font`.

## SEO built in

- Per-page metadata + Open Graph/Twitter (`app/layout.tsx`, page `metadata` exports).
- JSON-LD `ProfessionalService` structured data in the root layout.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- One `<h1>` per page, semantic sections, image alt text.

## Environment variables (optional)

Create `.env.local` in the project root:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key   # contact form (get free at web3forms.com)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                          # your own GA4, to track the site
```

Without the web3forms key, the contact form gracefully falls back to opening the visitor's email client. Without the GA id, no analytics script loads.

## Pages

Home, Work (+ /work/wellness-clinic case study), Notes (+ /notes/[slug]), About, Contact. Plus generated sitemap.xml, robots.txt, OG image, favicon, and a custom 404.

## To do before launch

- Replace the 6 placeholder reviews with the real ones.
- Set the real brand email/domain in `lib/site.ts` (currently `hi@koinophobe.com`).
- Drop website screenshots in `public/work/` (see that folder's README).
- Add a real photo of Michael on the About page.
- Update the production domain in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` if not koinophobe.com.
- Optional: swap the Book a Call mailto for a Calendly/Cal.com link in `components/BookCall.tsx`.

## Theme

Colours are CSS variables in `app/globals.css` (`:root` = light, `.dark` = dark). Change the brand colour in one place and both themes follow.
