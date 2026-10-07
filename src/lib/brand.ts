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
    instagram: "https://www.instagram.com/resortsoffers",
    tiktok: "https://www.tiktok.com/@resortsoffers",
    youtube: "https://www.youtube.com/@resortsoffers",
    x: "https://www.twitter.com/resortsoffers",
    bioLink: "https://resortsoffers.bio.link",
  },
  // Dubai Unified License — shown in the footer for verification.
  license: {
    businessName: "Noel Marketing Management",
    number: "1276776",
    unifiedCode: "CU5106",
    authority: "Department of Economy and Tourism (DET), Dubai",
    authorityAr: "دائرة الاقتصاد والسياحة في دبي",
    legalType: "Sole Establishment",
    verifyUrl: "https://app.invest.dubai.ae/DUL/35ECD0FA-6E97-46A6-98EA-0789BE860D2F",
    qrImage: "/licence-qr.svg",
  },
} as const;

export type Brand = typeof BRAND;
