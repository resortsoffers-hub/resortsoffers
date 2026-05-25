
# Delivery Plan — Bilingual + Hotel CMS + GCC SEO

You picked the heaviest option in all three phases. Honest scoping: this is **3 work sessions**, not one. Shipping it in a single pass would mean shallow translations, leaky photo isolation, and broken SEO. Here's the sequence I'll execute, smallest blast radius first.

---

## Session 1 — Bilingual foundation (this session, if you approve)

**Goal:** `/en/*` and `/ar/*` both live, RTL works, language switcher in header, hreflang in head, nav + footer + homepage fully translated. Inner pages get English fallback until Session 2 translates them.

**Technical work:**
- Install `react-i18next` + `i18next-browser-languagedetector`
- New `src/i18n/` with `en.json` + `ar.json` translation files (nav, footer, common CTAs, homepage strings)
- Restructure `App.tsx` routes so every existing route gets mounted under both `/en/*` and `/ar/*`; bare `/` redirects to `/en/` (or `/ar/` if browser is Arabic)
- New `<LocaleLayout>` wrapper that reads `:lang` param, sets `i18n.language`, sets `dir="rtl"` + `lang="ar"` on `<html>` for Arabic
- `<LanguageSwitcher>` in `Navbar` (EN / عربي toggle that preserves current path)
- Tailwind RTL audit: replace directional `ml-*` / `mr-*` / `pl-*` / `pr-*` / `text-left` / `text-right` with logical equivalents (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`) in shared components (Navbar, Footer, Hero, hotel cards)
- Per-route `<Helmet>` adds `<link rel="alternate" hreflang="en" href=".../en/...">` + `hreflang="ar"` + `hreflang="x-default"`
- `sitemap.xml` regenerated with both locale variants
- Memory rewrite: overwrite the English-only Core rule with a new bilingual rule + update `mem://localization/language-policy-v3`

**Out of scope this session:** translating every inner page body copy (Packages, Reviews, FAQ, Terms, Policy, Consultation). They render in English under `/ar/` until Session 2.

---

## Session 2 — Hotel CMS core (next session)

**Goal:** Admin can create a hotel, upload images that belong only to that hotel, publish a dedicated public page with isolated gallery and inquiry form.

**Database (new tables):**
- `hotels` — slug, name_en, name_ar, destination, short_desc_en/ar, long_desc_en/ar, hero_image_url, is_published, display_order
- `hotel_images` — hotel_id FK (CASCADE), image_url, caption_en/ar, display_order. **RLS + FK guarantee an image can never appear under another hotel.**
- `hotel_inquiries` — hotel_id FK, name, email, phone, check_in, check_out, guests, message, status
- Storage bucket `hotel-images` (public read, admin write) with path convention `{hotel_id}/{filename}` enforced by RLS

**Admin UI:** `/admin/hotels` list + create/edit form with drag-drop image upload scoped to that hotel only. Existing `AdminOffers` gets a hotel selector so an offer is linked to one hotel.

**Public:** `/en/hotels/:slug` and `/ar/hotels/:slug` — hero, gallery lightbox, description, inquiry form (writes to `hotel_inquiries`, also opens prefilled WhatsApp). Hotels index at `/en/hotels` / `/ar/hotels`.

**Translation:** Arabic translations for the public hotel page chrome; per-hotel content uses the `_ar` columns the admin fills in.

**Deferred to Session 3:** room types, meal plans, pricing tiers, inclusions/exclusions, travel-date windows. (You explicitly chose to defer these.)

---

## Session 3 — GCC landing pages + SEO (final session)

**Goal:** 4 dedicated market landing pages ranking for your target keywords.

**New routes (En + Ar):**
- `/en/maldives-from-dubai` — "Maldives packages from Dubai", "Luxury Maldives resorts UAE"
- `/en/maldives-from-saudi-arabia` — "Saudi Maldives packages"
- `/en/maldives-from-qatar` — "Qatar luxury holidays"
- `/en/maldives-from-kuwait` — "Kuwait resort deals"
- Plus `/en/honeymoon-packages-gcc` for "GCC honeymoon packages"
- Mirror under `/ar/` with Arabic copy

**Per page:** market-specific hero, flight-route mention, currency context (AED/SAR/QAR/KWD), 3–6 featured hotels (queried from new `hotels` table), JSON-LD `TravelAgency` + `TouristTrip`, geo meta tags, hreflang pairs.

**Cross-cutting:**
- Sitemap split: `sitemap-en.xml` + `sitemap-ar.xml` + index
- Homepage gets a "Travelling from" market picker linking to the 4 landing pages

---

## Technical notes

```text
Routing shape after Session 1:
  /                       → redirect to /en or /ar (lang detect)
  /en/*                   → existing routes, English
  /ar/*                   → existing routes, RTL + Arabic chrome
  /admin/*                → unchanged, English-only (internal)
```

```text
Photo isolation guarantee (Session 2):
  Storage path:   hotel-images/{hotel_id}/{file}
  RLS on insert:  admin role only
  RLS on select:  public (bucket is public)
  FK on hotel_images.hotel_id → hotels.id ON DELETE CASCADE
  Public query:   .eq('hotel_id', hotel.id) — physically impossible
                  to surface another hotel's images
```

```text
hreflang block injected per route:
  <link rel="alternate" hreflang="en" href="https://resortsoffers.com/en/...">
  <link rel="alternate" hreflang="ar" href="https://resortsoffers.com/ar/...">
  <link rel="alternate" hreflang="x-default" href="https://resortsoffers.com/en/...">
```

---

## What I need from you

**Approve this plan** and I start Session 1 immediately. Sessions 2 and 3 happen in follow-up prompts so each ships clean and testable.

If you'd rather compress (e.g. skip Session 3 landing pages, or do English-only Hotel CMS first), tell me now and I'll re-plan.
