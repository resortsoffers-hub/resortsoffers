/**
 * Canonical hotel browsing categories.
 *
 * Surfaces as one-tap filter chips above the resort grid on /hotels.
 * Admins toggle these per hotel in /admin/hotels. The slug is the value
 * stored in `hotels.tags`; labels are bilingual.
 *
 * Keep order intentional — chips render in this exact order.
 */
export interface HotelCategory {
  slug: string;
  label_en: string;
  label_ar: string;
}

export const HOTEL_CATEGORIES: HotelCategory[] = [
  { slug: "seaplane",       label_en: "Seaplane",        label_ar: "طائرة مائية" },
  { slug: "speedboat",      label_en: "Speedboat",       label_ar: "قارب سريع" },
  { slug: "all-inclusive",  label_en: "All Inclusive",   label_ar: "شامل كلياً" },
  { slug: "family",         label_en: "Family Friendly", label_ar: "مناسب للعائلات" },
  { slug: "honeymoon",      label_en: "Honeymoon",       label_ar: "شهر العسل" },
  { slug: "adults-only",    label_en: "Adults Only",     label_ar: "للبالغين فقط" },
  { slug: "noras-picks",    label_en: "Nora's Picks",    label_ar: "اختيارات نورا" },
  { slug: "top-luxury",     label_en: "Top Luxury",      label_ar: "فخامة استثنائية" },
  { slug: "wellness",       label_en: "Wellness",        label_ar: "العافية والسبا" },
  { slug: "diving",         label_en: "Diving",          label_ar: "الغوص" },
  { slug: "private-island", label_en: "Private Island",  label_ar: "جزيرة خاصة" },
];

export const categoryLabel = (slug: string, lang: "en" | "ar") => {
  const c = HOTEL_CATEGORIES.find((x) => x.slug === slug);
  if (!c) return slug;
  return lang === "ar" ? c.label_ar : c.label_en;
};
