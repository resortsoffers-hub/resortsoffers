# Cleanup pass + scope filters to Maldives

## Why /resorts and /offers look empty (no code change)
This is expected — not a bug.
- **Per your own rule (memory: "User-Provided Content Only" + "Hotel Publish Approval Gate")** no hotel goes live until you explicitly say *"publish [name]"*. Right now zero hotels are published, so `/resorts` shows the "Coming Soon — Our opening collection is being prepared" empty state and `/offers` shows "Offers are being refreshed" (offers are bound to verified hotels).
- As soon as you approve the first hotel (Four Seasons / Noku / Ozen / Dusit D2 once their pages are ready), both pages will populate automatically.

## 1. Standardise on a single phone number → +971 54 747 4404
Replace every hardcoded `971567622484` / `+971 56 762 2484` reference across the codebase with `971547474404` / `+971 54 747 4404`. `src/lib/brand.ts` already uses 547474404 — extend that everywhere.

Files touched: `Contact.tsx`, `BookConsultation.tsx`, `OfferDetail.tsx`, `Offers.tsx`, `PartnerHotels.tsx`, `Packages.tsx`, `Cruises.tsx`, `BookingTabs.tsx`, `OfferDetailModal.tsx`, `AddressSection.tsx`, `Navbar.tsx`.

## 2. Contact page trims (`src/pages/Contact.tsx`)
- WhatsApp card: drop the title "WhatsApp Business - Available 24/7", the `24/7` badge, and both flag lines. Show only one clean entry: **`+971 54 747 4404`** → `https://wa.me/971547474404`.
- Remove the dual `🇦🇪 Worldwide` / `🇸🇦 Saudi Arabia` chip pair above the form (keep a single WhatsApp shortcut).
- Paid Consultation card — remove these three lines:
  - "Instant confirmation via WhatsApp for both parties"
  - "Schedule a personalized consultation with our travel experts. Perfect for urgent inquiries and detailed trip planning." (and its shorter variant)
  - The three bullets: "Automated calendar sync for both parties", "WhatsApp notifications & reminders", "Meeting confirmation sent instantly".
  - Keep: title, $200 fee block, the "Book $200 Consultation" button.
- Delete the entire **Connect With Us / Follow us on social media** card (the social-icons block at the bottom of the contact column).

## 3. Homepage eyebrow (`src/pages/Index.tsx`)
Remove the eyebrow label **"A Private Luxury Travel House"** (and its Arabic equivalent) above the hero headline. Keep the headline + CTA.
*(Note: there is no literal "PRIVATE LUXURY TRAVEL ADVISORY" string in the codebase — this eyebrow is the only matching uppercase tagline. Confirm if you meant a different one.)*

## 4. Maldives-only resort filter chips (`src/pages/Hotels.tsx`)
Today the chips (Seaplane, Speedboat, All Inclusive, Family Friendly, Honeymoon, Adults Only, …) render globally. Scope them so they only appear when the user is browsing **Maldives**:
- The chip row renders only if `destFilter === "maldives"` **or** every currently-loaded hotel belongs to Maldives.
- When viewing "All destinations" or a non-Maldives destination, hide the category chip row entirely — keep only the search bar and destination chips.
- No changes to `hotelCategories.ts` (categories stay available for the admin); this is a presentational scope only.

## Out of scope
- No new hotels are published (still gated on your explicit approval per hotel).
- Admin pages and `brand.ts` already use 547474404 — left unchanged.
