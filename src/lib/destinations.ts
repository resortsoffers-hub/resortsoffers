/**
 * Canonical destination + collection registry.
 *
 * Drives the editorial catalog: /destinations and /destinations/:slug.
 *
 * Two kinds:
 *   - "place"  → resorts whose `hotels.destination` matches `name_en` (ci)
 *   - "theme"  → resorts whose `hotels.tags` array contains the slug
 *
 * Every collection slug must be unique across both kinds (one URL space).
 */
export type CollectionKind = "place" | "theme";

export interface Destination {
  slug: string;
  kind: CollectionKind;
  name_en: string;
  name_ar: string;
  region?: "Indian Ocean" | "Middle East" | "Asia" | "Europe" | "Africa";
  blurb_en: string;
  blurb_ar: string;
  /** Tag value matched against `hotels.tags` (theme collections only). */
  tag?: string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "maldives",
    kind: "place",
    name_en: "Maldives",
    name_ar: "المالديف",
    region: "Indian Ocean",
    blurb_en: "Private water villas, atoll sanctuaries, and seaplane arrivals.",
    blurb_ar: "فيلات خاصة فوق الماء، وملاذات الجزر، ووصول بالطائرة المائية.",
  },
  {
    slug: "seychelles",
    kind: "place",
    name_en: "Seychelles",
    name_ar: "سيشل",
    region: "Indian Ocean",
    blurb_en: "Granite coves, rare wildlife, ultra-private resorts.",
    blurb_ar: "خلجان جرانيتية وحياة برية نادرة ومنتجعات شديدة الخصوصية.",
  },
  {
    slug: "mauritius",
    kind: "place",
    name_en: "Mauritius",
    name_ar: "موريشيوس",
    region: "Indian Ocean",
    blurb_en: "Lagoon villas, fine cuisine, and family estates.",
    blurb_ar: "فيلات على البحيرة، مطبخ راقٍ، ومنتجعات عائلية.",
  },
  {
    slug: "bali",
    kind: "place",
    name_en: "Bali",
    name_ar: "بالي",
    region: "Asia",
    blurb_en: "Cliffside villas, rice-terrace retreats, and wellness sanctuaries.",
    blurb_ar: "فيلات على المنحدرات، ملاذات بين حقول الأرز، وسكون السبا.",
  },
  {
    slug: "thailand",
    kind: "place",
    name_en: "Thailand",
    name_ar: "تايلاند",
    region: "Asia",
    blurb_en: "Andaman beach pavilions and private island reserves.",
    blurb_ar: "أجنحة شاطئية على بحر أندامان ومحميات جزر خاصة.",
  },
  {
    slug: "uae",
    kind: "place",
    name_en: "UAE",
    name_ar: "الإمارات",
    region: "Middle East",
    blurb_en: "Skyline suites, beachfront palaces, and desert estates.",
    blurb_ar: "أجنحة بإطلالة على الأفق، قصور شاطئية، ومنتجعات صحراوية.",
  },
  {
    slug: "saudi-arabia",
    kind: "place",
    name_en: "Saudi Arabia",
    name_ar: "المملكة العربية السعودية",
    region: "Middle East",
    blurb_en: "Red Sea sanctuaries, heritage retreats, and ultra-private estates.",
    blurb_ar: "ملاذات على البحر الأحمر، منتجعات تراثية، وعقارات خاصة للغاية.",
  },
  {
    slug: "europe",
    kind: "place",
    name_en: "Europe",
    name_ar: "أوروبا",
    region: "Europe",
    blurb_en: "Mediterranean villas, alpine houses, and storied city palaces.",
    blurb_ar: "فيلات متوسطية، شاليهات ألبية، وقصور تاريخية في عواصم أوروبا.",
  },
];

export const COLLECTIONS: Destination[] = [
  {
    slug: "family-escapes",
    kind: "theme",
    tag: "family",
    name_en: "Family Escapes",
    name_ar: "إجازات العائلة",
    blurb_en: "Spacious villas, gentle waters, and quietly attentive service for every age.",
    blurb_ar: "فيلات واسعة ومياه هادئة وخدمة لطيفة تناسب كل الأعمار.",
  },
  {
    slug: "adults-only",
    kind: "theme",
    tag: "adults-only",
    name_en: "Adults Only",
    name_ar: "للبالغين فقط",
    blurb_en: "Hushed sanctuaries reserved for travellers who arrive without an itinerary.",
    blurb_ar: "ملاذات هادئة محجوزة لمسافرين يصلون دون جدول رحلة.",
  },
  {
    slug: "honeymoon",
    kind: "theme",
    tag: "honeymoon",
    name_en: "Honeymoon Collection",
    name_ar: "مجموعة شهر العسل",
    blurb_en: "Private overwater retreats and quiet shorelines chosen for two.",
    blurb_ar: "ملاذات خاصة فوق الماء وشواطئ هادئة مختارة للاثنين.",
  },
  {
    slug: "private-villas",
    kind: "theme",
    tag: "private-villa",
    name_en: "Private Villas",
    name_ar: "الفلل الخاصة",
    blurb_en: "Standalone residences with full staff — the house, the cove, the silence.",
    blurb_ar: "إقامات مستقلة مع طاقم كامل — البيت، الخليج، السكون.",
  },
];

export const ALL_COLLECTIONS: Destination[] = [...DESTINATIONS, ...COLLECTIONS];

export const findDestination = (slug?: string) =>
  ALL_COLLECTIONS.find((d) => d.slug.toLowerCase() === (slug ?? "").toLowerCase());
