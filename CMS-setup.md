# Publishing notes from your phone

Written 2 Sep 2026. Ten minutes of setup, once. After that it is: open a link, write, publish.

---

## What was built

Your notes were a hardcoded array in `lib/notes.ts`. They are now markdown files in `content/notes/`, and there is an editor at **koinophobe.com/admin** that writes to them.

The loop: you write on your phone → the editor commits the markdown to GitHub → Vercel sees the push and rebuilds → the note is live. Usually under two minutes end to end.

Nothing about the public site changed. No database, no monthly cost, no JavaScript added to any page a visitor sees. The editor only loads on `/admin`, which is blocked in `robots.txt` and carries a `noindex` tag.

---

## Setup, once

### 1. Push the changes

```bash
cd path/to/koinophobe
npm install
git add -A
git commit -m "Add Sveltia CMS and move notes to markdown"
git push
```

Wait for Vercel to finish deploying.

### 2. Create a GitHub token

On your phone or laptop, go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.

- **Token name:** `koinophobe-cms`
- **Expiration:** 1 year (put a reminder in your calendar for the renewal)
- **Repository access:** Only select repositories → `the-koinophobe/koinophobe-site`
- **Permissions → Repository permissions:**
  - **Contents: Read and write** (this is the one that matters)
  - **Metadata: Read-only** (gets added automatically)

Generate it and copy the token. You only see it once.

### 3. Sign in

Go to **koinophobe.com/admin**, choose **Sign In with Token**, paste it. The token is stored in your browser, so you do this once per device.

Add the page to your home screen while you are there. On iOS: Share → Add to Home Screen. On Android: menu → Add to Home screen. It then opens like an app.

---

## Writing a note

Tap **New Note**. Six fields:

| Field | What it does |
|---|---|
| **Title** | The `<h1>`, the browser tab, the link preview. Write it for a person. |
| **URL slug** | Becomes `koinophobe.com/notes/your-slug`. Lowercase, hyphens. **Do not change it after publishing** or you break the URL and lose whatever it had earned. |
| **Publish date** | A date in the future holds the note back until that day. |
| **Draft** | On by default. Nobody but you can see it. |
| **Excerpt** | One or two sentences. Used on the notes index, as the meta description, and in link previews. This is doing SEO work, so write it properly. |
| **Body** | Markdown. `##` for section headings, `**bold**`, `[text](url)` for links, `-` for bullets. |

**To publish:** turn Draft off and save. **To save without publishing:** leave Draft on and save as often as you like.

### Scheduling

Set the publish date to a future day and turn Draft off. The note sits in the repo and appears on that date on its own. The notes pages revalidate hourly, so it goes live within an hour of the date arriving, without you touching anything.

---

## Things worth knowing

**The slug is permanent.** Changing it after a note has been indexed is the single most expensive mistake available here. If you must, tell me and I will add a redirect.

**Drafts never reach the build.** A draft is not a hidden URL. It genuinely does not exist on the site, so there is nothing to leak.

**Every save is a git commit.** Full history, and any note can be recovered. Commit messages read `note: add your-slug`.

**Images.** Not wired up yet, deliberately. Dropping phone photos into posts is the fastest way to undo the performance work. When you want them, say so and I will do it properly with `next/image` and a size budget.

**If the token stops working**, it expired. Generate a new one the same way and sign in again.

---

## If you outgrow token sign-in

Token auth means anyone holding the token can write to the repo, and it expires yearly. If that ever becomes annoying, the upgrade is a GitHub OAuth app plus a small auth worker on Cloudflare, which gets you a normal "Sign in with GitHub" button and no token to manage. It is a 20-minute job and nothing else has to change.
