# GA4 + GTM Setup — Koinophobe

The mental model first, because this is where the confusion usually lives:

- **GA4** is the database and reports. It receives events and shows you
  numbers. Its ID looks like `G-ABC123XYZ` (Measurement ID).
- **GTM** is a loader that sits on the site and decides which tags fire.
  Its ID looks like `GTM-ABC123X` (Container ID).
- **This site loads only GTM.** GA4 is configured *inside* GTM, not in the
  code. So: the `GTM-…` id goes into Vercel as an env var; the `G-…` id gets
  pasted inside the GTM dashboard. The two IDs never swap places.

```
visitor → koinophobe.com → GTM container (GTM-…) → Google Tag (G-…) → GA4 reports
                                     └→ custom event tags (form, call clicks)
```

Do the steps in this order.

---

## Step 1 — Create the GA4 property

1. Go to analytics.google.com → Admin (gear, bottom left) → **Create → Property**.
2. Name: `Koinophobe`. Set your timezone and currency. Business details: pick
   anything reasonable; it doesn't affect data.
3. It asks you to create a **data stream** → choose **Web** →
   URL `https://koinophobe.com`, name `Koinophobe site`.
   Leave "Enhanced measurement" ON (free scroll/outbound-click/site-search events).
4. The stream page now shows your **Measurement ID: `G-…`**. Copy it somewhere.
5. Two settings while you're here:
   - Admin → Data settings → Data retention → change 2 months to **14 months**.
   - Admin → Property settings → note the numeric **Property ID** (e.g.
     `4981…`). That one is for the footer visits counter later, not for GTM.

**You now have:** `G-…` (for GTM) and a numeric property id (for the counter).

## Step 2 — Create the GTM container

1. Go to tagmanager.google.com → Create Account.
   - Account name: `Koinophobe`
   - Container name: `koinophobe.com`, platform: **Web**
2. It shows install snippets — **ignore them**. The site already contains the
   loader; it just needs the ID.
3. Copy the **Container ID `GTM-…`** (top bar).

## Step 3 — Connect GTM to the site

1. Vercel → project → Settings → Environment Variables → add
   `NEXT_PUBLIC_GTM_ID` = `GTM-…` (all environments).
2. Do **not** set `NEXT_PUBLIC_GA_ID`. That variable is the no-GTM fallback;
   with both set, only GTM loads anyway, but keep it clean.
3. Redeploy (Deployments → ⋯ → Redeploy).

## Step 4 — Put GA4 inside GTM

1. In GTM: **Tags → New**.
2. Tag type: **Google Tag**.
3. Tag ID field: paste your `G-…` Measurement ID.
4. Triggering: **Initialization – All Pages**.
5. Name it `GA4 — Google Tag`, save.

This single tag is what used to be "the GA4 snippet". Every pageview now
flows: site → GTM → GA4.

## Step 5 — Wire up the site's custom events

The site already pushes two events into the dataLayer (no code needed):

| dataLayer event      | fires when                          | params  |
|----------------------|-------------------------------------|---------|
| `book_a_call_click`  | any Book-a-Call button is clicked   | `label` |
| `contact_submit`     | the contact form is submitted       | `type` (Agency/Business/Other) |

You will build six things, in this order: two variables (to read the event
parameters), two triggers (to detect the events), two tags (to forward them
to GA4). Roughly 10 minutes.

### 5a. Two Data Layer Variables

These let GTM read the extra data the site attaches to each event
(`label` on call clicks, `type` on form submits).

1. Left sidebar → **Variables** → scroll to *User-Defined Variables* →
   **New**.
2. Click the pencil / tag configuration area → choose type
   **Data Layer Variable**.
3. Data Layer Variable Name: `label` — exactly that, lowercase. Leave
   "Data Layer Version" on Version 2 and everything else untouched.
4. Name the variable `dlv - label` (top-left field where it says
   "Untitled Variable") → **Save**.
5. Repeat for the second one: type Data Layer Variable, Data Layer Variable
   Name `type`, saved as `dlv - type`.

### 5b. Two Custom Event triggers

1. Left sidebar → **Triggers** → **New**.
2. Click the trigger configuration area → choose type **Custom Event**.
3. Event name: `book_a_call_click` — must match exactly, it is
   case-sensitive. Leave "This trigger fires on: All Custom Events".
4. Name the trigger `CE - book_a_call_click` → **Save**.
5. Repeat: New → Custom Event → event name `contact_submit` → save as
   `CE - contact_submit`.

### 5c. Two GA4 Event tags

First tag:

1. Left sidebar → **Tags** → **New**.
2. Tag configuration → choose type **Google Analytics: GA4 Event**
   (not "Google Tag" — that one already exists from Step 4).
3. Measurement ID: paste your `G-…`.
4. Event Name: `book_a_call_click` (same string again — this is the name
   GA4 will show in its reports).
5. Expand **Event Parameters** → Add parameter:
   - Parameter name: `label`
   - Value: click the lego-brick icon next to the field → pick
     `dlv - label` (it inserts `{{dlv - label}}`)
6. Triggering section (bottom half) → click it → pick
   `CE - book_a_call_click`.
7. Name the tag `GA4 event - book_a_call_click` → **Save**.

Second tag, same recipe with the other names:

1. Tags → New → **Google Analytics: GA4 Event** → Measurement ID `G-…`.
2. Event Name: `contact_submit`.
3. Event Parameters → Add parameter → name `type`, value `{{dlv - type}}`.
4. Triggering → `CE - contact_submit`.
5. Save as `GA4 event - contact_submit`.

### 5d. Sanity check before moving on

Your workspace should now contain:

| Kind | Name | Points at |
|------|------|-----------|
| Variable | `dlv - label` | dataLayer key `label` |
| Variable | `dlv - type` | dataLayer key `type` |
| Trigger | `CE - book_a_call_click` | custom event `book_a_call_click` |
| Trigger | `CE - contact_submit` | custom event `contact_submit` |
| Tag | `GA4 - Google Tag` | all pages (from Step 4) |
| Tag | `GA4 event - book_a_call_click` | fires on `CE - book_a_call_click` |
| Tag | `GA4 event - contact_submit` | fires on `CE - contact_submit` |

If a tag shows "no triggers" or a trigger name has a typo in the event
string, it will silently never fire — the event names are the contract
between the site's code and GTM.

## Step 6 — Test, then publish

1. GTM → **Preview** → enter `https://koinophobe.com` → Connect.
2. **Accept the cookie banner** on the site. GTM is consent-gated and will
   not load until you do — this is the #1 "why is nothing firing" cause.
3. In Tag Assistant you should see the Google Tag fire on page load. Click a
   Book-a-Call button and submit the form (use your own email); watch both
   custom events fire.
4. GA4 → Admin → **DebugView** shows the same events live.
5. Back in GTM: **Submit → Publish**. Until you publish, only preview mode
   sees the container.

## Step 7 — Mark key events in GA4

After the first real `contact_submit` / `book_a_call_click` arrive
(up to 24h to appear in the events list):

GA4 → Admin → Events → toggle **Mark as key event** on both. Now every GA4
report can show conversion counts per page and traffic source — including
your `koinophobe.com/ig` and `/x` bio links.

## Step 8 — Link Search Console

GA4 → Admin → Product links → **Search Console links** → link the
koinophobe.com property (requires Step 7 of DEPLOY.md done first). This puts
query data next to behavior data in GA4's reports.

## Step 9 — Footer visits counter (optional, separate system)

This does NOT use GTM. It reads totals out of GA4 via API, server-side:

1. console.cloud.google.com → new project `koinophobe` (same Google login).
2. APIs & Services → Library → enable **Google Analytics Data API**.
3. IAM & Admin → Service accounts → Create (`koinophobe-site`) →
   after creating: Keys tab → Add key → **JSON** → downloads a file.
4. GA4 → Admin → Property access management → **+** → paste the service
   account's email (from the JSON, `client_email`) → role **Viewer**.
5. Vercel env vars:
   - `GA4_PROPERTY_ID` = the numeric id from Step 1.5
   - `GA_SA_CLIENT_EMAIL` = `client_email` from the JSON
   - `GA_SA_PRIVATE_KEY` = `private_key` from the JSON (paste the whole
     value including `-----BEGIN PRIVATE KEY-----…`, escaped `\n` and all)
6. Redeploy. The counter appears under the footer wordmark once GA4 has
   recorded traffic. It updates hourly. If anything is missing or wrong it
   renders nothing — the site never breaks because of it.

Keep the JSON file out of the repo (it's a credential; `.env*` is already
gitignored — don't commit the file itself anywhere).

## Troubleshooting

- **Nothing fires in preview** → you didn't accept the cookie banner, or the
  env var isn't deployed (view page source, search for `googletagmanager`).
- **Events in Tag Assistant but not GA4** → wrong `G-…` in the Google Tag,
  or you forgot to publish the container.
- **`(not set)` sources in reports** → someone shared a bare link; your bio
  links `/ig` and `/x` carry UTMs automatically, keep using them.
- **Footer counter never appears** → check all three env vars, confirm the
  service account has Viewer on the *property* (not the account), and that
  the Data API is enabled in the same Cloud project the key belongs to.
