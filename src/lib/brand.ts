/**
 * Single source of truth for brand identity.
 *
 * Designed so a future migration from "Resorts Offers" → "Yasnora" only
 * requires editing this file + swapping a logo SVG. Components must import
 * strings/colors from here rather than hardcoding them in JSX.
 */
export const BRAND = {
  name: "Resorts Offers",
  legalName: "Resorts Offers Tourism Consultancy",
  tagline: "",
  taglineAr: "",
  domain: "resortsoffers.com",
  whatsapp: "971547474404",
  email: "Vip@resortsoffers.com",
  mobile: "+971547474404",
  // HSL tokens are defined in index.css; these literals are only for non-themed
  // surfaces (e.g. WhatsApp brand green which must remain its official color).
  colors: {
    primary: "#141414", // Near-black
    accent: "#C9A961", // Champagne gold
    whatsapp: "#25D366",
  },
  // Same links as the Google Business Profile.
  social: {
    facebook: "https://www.facebook.com/share/1T9b62UH9M/",
    google: "https://maps.app.goo.gl/9ynX4gDmjGR3J2V79",
    instagram: "https://www.instagram.com/resortsoffers",
    tiktok: "https://www.tiktok.com/@resortsoffers",
    youtube: "https://www.youtube.com/@resortsoffers",
    x: "https://www.twitter.com/resortsoffers",
    bioLink: "https://resortsoffers.bio.link",
  },
} as const;

export type Brand = typeof BRAND;
