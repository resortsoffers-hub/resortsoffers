# Site Restructure Plan — Destination-First, Luxury Advisory

## Goals
1. Destination is the spine. Categories filter *inside* a destination, never across the whole catalog.
2. Zero unverified imagery anywhere public.
3. Homepage reads as a concierge brand, not a listings DB.
4. Mobile-first, calm luxury UX.
5. Architecture ready for Resorts Offers → Yasnora rebrand without rewrites.

---

## 1. Destination-first information architecture

New public route structure:
```
/                       → Home (curated, not catalog)
/destinations           → 6–8 hero destination tiles
/destinations/:slug     → Single destination hub (resorts + filters scoped here)
/hotels/:slug           → Resort detail (unchanged URL, kept for SEO)
/collections/:slug      → Curated collections (Honeymoon, Adults Only, Nora's Picks…)
/about /contact /reviews /faq
```

Key behavior change:
- The global `/hotels` page (mixed catalog with chips on top) is **demoted**. It still exists for admin/QA but is no longer linked in main nav.
- `Hotels` listing logic moves into `/destinations/:slug` and only ever shows resorts where `destination = :slug`.
- Category chips on a destination hub only render categories that have ≥1 resort in *that* destination (computed from `tags`).
- Collections (`/collections/:slug`) are the cross-destination view, but they're explicitly framed as editorial picks, not a search result.

Result: user picks Maldives → sees only Maldives resorts and only Maldives-relevant chips (Water Villa, Honeymoon, Family, etc.). No more disconnected dropdown + chip flow.

---

## 2. Homepage hierarchy

Rebuild `src/pages/Index.tsx` in this fixed order, each section a discrete component:

1. **Hero** — text-only, brand statement + single primary CTA ("Plan with Nora" → WhatsApp). No fake imagery.
2. **Luxury Destinations** — 6 tiles, image only if a destination has a verified hero photo from a published hotel in that destination; otherwise branded placeholder. Links to `/destinations/:slug`.
3. **Curated Collections** — 3–4 editorial tiles (Honeymoon, Adults-Only Sanctuaries, Family Villas, Nora's Picks).
4. **Featured Resorts** — max 3, only `is_published=true` with verified `hero_image_url`. If <3 exist, the section hides itself rather than padding with placeholders.
5. **Why Choose Us** — 4 concise pillars (existing `WhyBookWithUs`).
6. **Reviews / Testimonials** — pulled from `customer_reviews` where approved.
7. **WhatsApp CTA band** — single, calm, full-width.
8. **Inquiry form** — short (name, email/WhatsApp, destination, dates, message) → writes to `hotel_inquiries` with `hotel_id` nullable.

Removed from home: `BookingTabs` global search (replaced by destination tiles), oversized dropdowns, floating elements.

---

## 3. Verified imagery enforcement

- Keep `safeHotelImage()` — already gates to Supabase Storage only. Good.
- Extend gate to **destination tiles**: a destination tile's hero is computed server-side as "first verified `hero_image_url` from a published hotel in this destination". If none, show typographic tile (destination name on brand background) — never a stock photo.
- Admin (`/admin/hotels`) gains a visible "Publish-ready checklist" before `is_published` can be toggled:
  - hero image uploaded via CMS
  - ≥6 gallery images tagged with `category_kind` (villa/outlet/spa/etc.)
  - ≥1 official resource link (website or factsheet)
  - EN + AR short description present
- Backend: add a DB trigger that prevents `is_published=true` unless the above are satisfied. Hard gate, matches the memory rule.

---

## 4. Luxury visual system

- Reduce chip density: max 5 visible category chips per destination, "More" reveals the rest.
- Increase vertical rhythm: section padding `py-20 md:py-28`, generous max-widths.
- Typography: keep current serif for display, tighten body to single sans, drop competing weights.
- Colors: lock to memory rule — navy `#1e3a5f` primary, off-white surfaces, single cyan accent for actions only.
- Remove: BookingTabs cyan brand block on home, oversized hero filter bar, decorative gradients on cards.

---

## 5. Mobile fixes

- Replace native `<Select>` with a bottom-sheet on `<640px` for destination/category pickers.
- Sticky filter rail collapses to a single "Filters" button on mobile that opens a sheet; chips no longer fight the page scroll.
- WhatsApp floating button: smaller (48px), bottom-right only, hides on scroll-down, re-appears on scroll-up.
- Cards: single column under 640px, `aspect-[4/3]` preserved, tap targets ≥44px.

---

## 6. Rebrand-ready architecture

- Move all brand strings (name, tagline, WhatsApp number, social handles, logo wordmark colors) into `src/lib/brand.ts`. Components import from there — no hardcoded "Resorts Offers" or `#003B95`/`#00A4E4` literals in JSX.
- Logo becomes `<BrandWordmark />` component reading from `brand.ts`.
- Switching to Yasnora later = edit one file + swap one SVG.
- Domain/canonical logic in `main.tsx` stays, just reads from `brand.ts`.

---

## Technical notes

- **New page**: `src/pages/DestinationHub.tsx` — fetches `hotels` where `destination = slug AND is_published = true`, computes available tags from that subset only.
- **New page**: `src/pages/CollectionHub.tsx` — fetches by tag across destinations, explicitly editorial framing.
- **New component**: `src/components/home/DestinationTiles.tsx` — server-derived hero per destination.
- **Refactor**: `Index.tsx`, `Navbar.tsx` (nav links → Destinations / Collections / About / Reviews / Contact), `BookingTabs.tsx` (deleted from home, kept only inside destination hub as scoped search).
- **DB migration**: trigger on `hotels` rejecting `is_published=true` without hero image + 6 tagged gallery images + 1 resource + EN/AR copy. Plus index on `hotels(destination, is_published)`.
- **Brand layer**: `src/lib/brand.ts` exports `BRAND = { name, tagline, whatsapp, colors, wordmark }`.

---

## Out of scope (explicit)
- No new hotel data entry — catalog stays empty until you approve each hotel per the publish-approval gate.
- No payment integration — all CTAs remain WhatsApp.
- No admin UI redesign in this pass beyond the publish checklist.
- No AI image generation, ever.

---

## Suggested execution order
1. Brand layer + Navbar refactor (foundation, low risk)
2. Homepage rebuild (visible win)
3. Destination hub + routing + Hotels page demotion
4. Collection hub
5. Mobile sheet pickers + WhatsApp button polish
6. DB publish-gate trigger + admin checklist UI
