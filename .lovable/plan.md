# Fix the blank homepage

## Symptom
Both production (resortsoffers.com) and the in-editor preview render an empty white page. Only the floating chat/WhatsApp buttons appear. No runtime errors are reported, console shows React mounts cleanly, and a DOM extract confirms `0` `<section>` and `0` `<h1>` — meaning the Routes tree silently returns nothing while siblings (chat widgets) render normally.

Because no error is being surfaced, step one is to make the failure visible. Step two is to fix it.

## Plan

### 1. Add a top-level ErrorBoundary (diagnostic + permanent)
Create `src/components/ErrorBoundary.tsx` (class component) that:
- Catches render-time errors in the React tree
- Logs them to console with the full component stack
- Renders a minimal fallback ("Something went wrong — please refresh") instead of a blank page

Wrap `<Routes>` in `App.tsx` with it so any future render crash is visible, not silent.

### 2. Pinpoint the current crash
With the boundary in place, reload `/en`. The captured error name + stack will tell us exactly which component fails. Most likely candidates based on the destination-first rebuild:
- `Navbar` → references `t('nav.whatsapp' | 'signIn' | 'wishlist' | 'help')` and a `/services` link in Footer — if any i18n key is missing it only warns, not crash, so this is low risk
- `HomeInquiryForm` → uses `DESTINATIONS` and supabase client at import; safe
- `AddedValuesSlider` / `HomeInquiryForm` / `Sidebar` → check for a top-level `throw`, missing default export, or a hook called outside a Router context
- `useLocalePath` / `useLocale` — only safe inside `<BrowserRouter>`; `WhatsAppButton` and `ChatWidget` sit inside `BrowserRouter` so they're fine, but anything that calls these hooks at module scope would break

### 3. Fix whatever the boundary surfaces
Apply the smallest correct fix (missing import, missing translation key fallback, etc.) and re-verify.

### 4. Verify
- Reload `/en` in preview, confirm hero + destination tiles + footer render
- Confirm `/ar` renders RTL
- Confirm `/destinations` and a hotel detail route still render

## Out of scope
- No design changes
- No new content or hotel data
- No changes to the publish/security flow

## Notes
The user's screenshot also shows the publish dialog stuck on "Updating". That deploy is independent of this bug — once the render is fixed and they re-publish, both preview and production will be healthy.
