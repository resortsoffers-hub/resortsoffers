/**
 * Canonical destination registry.
 *
 * Drives the new destination-first IA: /destinations and /destinations/:slug.
 * Each destination scopes its own resort grid and category chips — categories
 * never bleed across destinations.
 *
 * The `slug` MUST match the value stored in `hotels.destination` (case-insensitive
 * comparison is applied at query time).
 */
export interface Destination {
  slug: string;
  name_en: string;
  name_ar: string;
  region: "Indian Ocean" | "Middle East" | "Asia" | "Europe" | "Africa";
  blurb_en: string;
  blurb_ar: string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "maldives",
    name_en: "Maldives",
    name_ar: "المالديف",
    region: "Indian Ocean",
    blurb_en: "Private water villas, atoll sanctuaries, and seaplane arrivals.",
    blurb_ar: "فيلات خاصة فوق الماء، وملاذات الجزر، ووصول بالطائرة المائية.",
  },
  {
    slug: "dubai",
    name_en: "Dubai",
    name_ar: "دبي",
    region: "Middle East",
    blurb_en: "Skyline suites, beachfront palaces, and desert estates.",
    blurb_ar: "أجنحة بإطلالة على الأفق، قصور شاطئية، ومنتجعات صحراوية.",
  },
  {
    slug: "seychelles",
    name_en: "Seychelles",
    name_ar: "سيشل",
    region: "Indian Ocean",
    blurb_en: "Granite coves, rare wildlife, ultra-private resorts.",
    blurb_ar: "خلجان جرانيتية وحياة برية نادرة ومنتجعات شديدة الخصوصية.",
  },
  {
    slug: "mauritius",
    name_en: "Mauritius",
    name_ar: "موريشيوس",
    region: "Indian Ocean",
    blurb_en: "Lagoon villas, fine cuisine, and family estates.",
    blurb_ar: "فيلات على البحيرة، مطبخ راقٍ، ومنتجعات عائلية.",
  },
  {
    slug: "bali",
    name_en: "Bali",
    name_ar: "بالي",
    region: "Asia",
    blurb_en: "Cliffside villas, rice-terrace retreats, and wellness sanctuaries.",
    blurb_ar: "فيلات على المنحدرات، ملاذات بين حقول الأرز، وسكون السبا.",
  },
  {
    slug: "thailand",
    name_en: "Thailand",
    name_ar: "تايلاند",
    region: "Asia",
    blurb_en: "Andaman beach pavilions and private island reserves.",
    blurb_ar: "أجنحة شاطئية على بحر أندامان ومحميات جزر خاصة.",
  },
];

export const findDestination = (slug?: string) =>
  DESTINATIONS.find((d) => d.slug.toLowerCase() === (slug ?? "").toLowerCase());
