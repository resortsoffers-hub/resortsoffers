import type { SyntheticEvent } from "react";

/**
 * Image trust gate.
 *
 * Until each hotel has its own verified gallery uploaded through the CMS
 * (Supabase Storage `hotel-images` bucket), we refuse to display any
 * external stock / AI-generated / generic imagery on hotel surfaces.
 *
 * Allowlist:
 *   - Supabase Storage URLs (our CMS-uploaded property photos)
 *   - The branded placeholder itself
 *
 * Everything else (Unsplash, Pexels, bundled /assets/* AI renders, etc.)
 * is swapped for the neutral, branded placeholder. No fantasy mountains
 * shown for Maldives properties. No villa shared between two resorts.
 *
 * When real photos land in the CMS, they flow through unchanged.
 */
export const PLACEHOLDER = "/hotel-placeholder.svg";

export function safeHotelImage(src?: string | null): string {
  if (!src) return PLACEHOLDER;
  // Supabase Storage public URLs — these come from our admin upload pipeline
  if (src.includes("/storage/v1/object/")) return src;
  // The placeholder itself
  if (src === PLACEHOLDER || src.endsWith("/hotel-placeholder.svg")) return src;
  // Everything else (bundled AI assets, unsplash, pexels, third-party) → placeholder
  return PLACEHOLDER;
}

export function fallbackHotelImage(event: SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  if (!img.src.endsWith(PLACEHOLDER)) img.src = PLACEHOLDER;
}
