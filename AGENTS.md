# Vidhan Associates — Developer-Ready Specification
**Status:** Draft v1 — placeholders marked `[TBD]` to be filled once real firm details are available.
**Build tool:** Google Antigravity (AI dev agent) — this doc is the source of truth to prompt it from.

---

## 1. Project Overview

| Field | Value |
|---|---|
| Client | Vidhan Associates (Advocates) |
| Reference build | ronesanddas.com (same model, no Firebase) |
| Goal | Bilingual (Malayalam + English), premium/professional advocate website with WhatsApp-based contact & appointment booking |
| Primary user actions | Learn about the firm → view practice areas / case experience → contact or book consultation via WhatsApp |
| Non-goals (v1) | No client portal, no case status tracking, no payment gateway |

---

## 2. Tech Stack (Firebase-free)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SEO for a law firm site, same base as last project |
| Content/CMS | **Sanity.io** | Free tier, visual editor for blog/case-experience/careers, no custom admin panel needed |
| i18n | **next-intl** | Clean App Router-native EN/ML routing (`/en`, `/ml`) |
| Styling | **Tailwind CSS** | Fast to theme, easy to enforce the design token system below |
| Forms → Email backup | **Resend** or **Web3Forms** | Zero backend maintenance |
| WhatsApp | **wa.me deep link** (v1), upgrade path to **WhatsApp Business Cloud API** (v2) | No Meta approval needed for v1 |
| Hosting | **Vercel** | Native Next.js support, free tier |
| Fonts | Self-hosted via `next/font` | No external font-loading dependency |

No Firebase anywhere in this stack — Sanity replaces Firestore, Vercel replaces Firebase Hosting, Resend replaces Firebase Functions for email, `wa.me`/Cloud API replaces any custom messaging backend.

---

## 3. Information Architecture / Sitemap

```
/                     → Home
/about                → About the Firm / Advocates
/practice-areas       → Overview + per-area detail (dynamic from Sanity)
/practice-areas/[slug]
/case-experience      → Notable matters / experience (dynamic)
/blog                 → Articles (dynamic from Sanity)
/blog/[slug]
/careers              → Openings (dynamic)
/contact              → Contact form + map + WhatsApp booking
```

Every route exists under both `/en/...` and `/ml/...` via next-intl middleware.

---

## 4. Design System — "Ledger & Gold"

### 4.1 Design rationale
Avoid the generic AI-default look (cream + terracotta, or black + neon accent). Instead: **ink-navy + parchment ivory as the base**, **antique gold as a restrained accent**, and **deep maroon/seal-red as a secondary accent** — evoking a judicial seal / bound-ledger feel rather than generic "luxury." Signature element: a thin gold hairline rule with a small wax-seal-style emblem mark used at section breaks (not repeated as decoration everywhere — used with restraint).

### 4.2 Color tokens

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#12141A` | Primary dark background / footer |
| `--color-parchment` | `#F6F1E4` | Primary light background |
| `--color-gold` | `#A9812D` | Accent — CTAs, dividers, icons |
| `--color-gold-soft` | `#D8C48A` | Hover states, subtle highlights |
| `--color-seal` | `#6B0F1A` | Secondary accent — badges, emphasis, "book consultation" CTA |
| `--color-slate` | `#3B3F4A` | Body text on light bg |
| `--color-mist` | `#8A8577` | Secondary/muted text |

### 4.3 Typography

| Role | Typeface | Notes |
|---|---|---|
| Display (EN headings) | **Fraunces** (serif, high-contrast) | Gravitas, not the generic Playfair default |
| Display (ML headings) | **Noto Serif Malayalam** | Matches Fraunces' weight/gravitas in Malayalam |
| Body (EN) | **IBM Plex Sans** | Clean, legible, slightly technical/legal feel |
| Body (ML) | **Noto Sans Malayalam** | Pairs cleanly with Plex Sans |
| Utility/labels | **IBM Plex Mono** (small caps use) | Case numbers, dates, eyebrows |

### 4.4 Layout principles
- Generous whitespace; content reads like a well-set legal document, not a dense dashboard.
- Section dividers: 1px gold hairline rule, centered small emblem mark — used only at major section breaks.
- Numbered markers (01/02/03) only where a real sequence exists (e.g., "How a consultation works"), not decoratively on practice-area cards.
- Motion: minimal — a single orchestrated hero reveal on load, subtle hover states on cards/buttons. No scroll-jacking, no excess parallax.
- Fully responsive down to mobile; visible keyboard focus states; respects `prefers-reduced-motion`.

---

## 5. Bilingual (EN/ML) Strategy

- Route-based locales: `/en/*` and `/ml/*` via `next-intl` middleware, with a persistent language toggle in the header (same UX pattern as ronesanddas.com's "MAL" toggle).
- All static UI strings in `messages/en.json` / `messages/ml.json`.
- All dynamic content (blog, practice areas, case experience, careers) stored in Sanity with **localized fields** (Sanity's built-in field-level localization: `title.en`, `title.ml`, etc.) so one entry serves both languages.
- Default locale: `[TBD — likely English, confirm with client]`.
- Fonts loaded conditionally per active locale to avoid shipping unused font weights.

---

## 6. Sanity CMS Schema (draft)

```
practiceArea
 - title (localized string)
 - slug
 - summary (localized text)
 - body (localized portable text)
 - icon (image)
 - order (number)

caseExperience
 - title (localized string)
 - category (reference → practiceArea)
 - summary (localized text)
 - year

blogPost
 - title (localized string)
 - slug
 - excerpt (localized text)
 - body (localized portable text)
 - coverImage
 - publishedAt
 - author

careerListing
 - title (localized string)
 - description (localized portable text)
 - location
 - type (full-time / internship / etc.)
 - isOpen (boolean)

siteSettings (singleton)
 - firmName
 - address (localized)
 - phone
 - whatsappNumber
 - email
 - officeHours (localized)
 - socialLinks
```

---

## 7. WhatsApp Integration Spec

### v1 — Launch scope
1. **Floating WhatsApp button** (all pages): `https://wa.me/<firm-number>?text=<url-encoded default message>`
2. **"Book a Consultation" form** (`/contact`): fields → Name, Phone, Practice Area (dropdown, sourced from Sanity), Preferred Date, Message.
   - On submit: build a formatted message string from the fields, URL-encode it, open `https://wa.me/<firm-number>?text=...` in a new tab so the user just taps Send on their end.
   - In parallel, POST the same data to Resend/Web3Forms as an email backup, so nothing is lost if the user abandons the WhatsApp step.
3. No backend/database required for this flow.

### v2 — Future upgrade path
- WhatsApp Business Cloud API (Meta) for fully automated delivery into the firm's WhatsApp Business account without user action.
- Requires: Meta Business verification, approved message templates, a Next.js API route (or serverless function) to call the Cloud API.
- Not required for launch; architecture below should not block this later addition.

---

## 8. Environment Variables (draft)

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=        # e.g. 91XXXXXXXXXX
SANITY_PROJECT_ID=
SANITY_DATASET=
SANITY_API_TOKEN=
RESEND_API_KEY=                     # or WEB3FORMS_ACCESS_KEY
```

---

## 9. Open Items — Fill In Before/During Build

- [ ] Firm official WhatsApp Business number
- [ ] Firm address, phone, email
- [ ] Advocate names/bios for About page
- [ ] Practice area list (final names + descriptions)
- [ ] Logo / brand assets (or design fresh under gold theme above)
- [ ] Default site language (EN or ML)
- [ ] Real case experience entries (anonymized as required by bar rules)
- [ ] Career listings, if any currently open
- [ ] Domain name for deployment

---

## 10. Build Phases (for sequencing Antigravity prompts)

1. Project scaffold: Next.js + Tailwind + next-intl routing skeleton
2. Design tokens + base layout (header, footer, language toggle)
3. Home page (static, placeholder copy)
4. Sanity project setup + schemas + Studio
5. Practice Areas + Case Experience + Blog + Careers (dynamic, wired to Sanity)
6. Contact page + WhatsApp booking form + email backup
7. Bilingual content pass (once real EN/ML copy is available)
8. Polish pass: animations, responsiveness, accessibility, SEO metadata
9. Deploy to Vercel

---