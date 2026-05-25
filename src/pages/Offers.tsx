import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Star, 
  Plane, 
  Search, 
  Filter,
  MapPin,
  BedDouble,
  Info,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

// Resort Images
import cocoonAerial from "@/assets/resorts/you-and-me-cocoon-aerial.jpg";
import maldivesKandinma from "@/assets/resorts/maldives-kandinma-hq.jpg";
import waldorfMaldives from "@/assets/resorts/waldorf-astoria-maldives.jpg";
import ozenReserve from "@/assets/resorts/ozen-reserve-bolifushi.jpg";
import anantaraKihavah from "@/assets/resorts/anantara-kihavah.jpg";
import velaaMaldives from "@/assets/resorts/velaa-private-island.jpg";
import constanceBelleMare from "@/assets/resorts/constance-belle-mare.jpg";
import siyamWorld from "@/assets/resorts/siyam-world.jpg";
import luxBelleMare from "@/assets/resorts/lux-belle-mare.jpg";
import fairmont from "@/assets/resorts/fairmont-maldives.jpg";
import niyama from "@/assets/resorts/niyama-maldives.jpg";
import rafflesSeychelles from "@/assets/resorts/raffles-seychelles.jpg";
import fourSeasonsSeychelles from "@/assets/resorts/four-seasons-seychelles.jpg";
import sixSensesSeychelles from "@/assets/resorts/six-senses-seychelles.jpg";
import constanceEphelia from "@/assets/resorts/constance-ephelia.jpg";
import constancePrinceMaurice from "@/assets/resorts/constance-prince-maurice.jpg";
import fourSeasonsMauritius from "@/assets/resorts/four-seasons-mauritius.jpg";
import stRegisMauritius from "@/assets/resorts/st-regis-mauritius.jpg";
import shangriLaMauritius from "@/assets/resorts/shangri-la-mauritius.jpg";
// Bali
import samabeBali from "@/assets/resorts/samabe-bali.jpg";
import baliClifftop from "@/assets/resorts/bali-clifftop-resort.jpg";
import clubmedBali from "@/assets/resorts/clubmed-bali.jpg";
// Phuket
import amanpuriPhuket from "@/assets/resorts/amanpuri-phuket.jpg";
import rosewoodPhuket from "@/assets/resorts/rosewood-phuket.jpg";
import banyanTreePhuket from "@/assets/resorts/banyan-tree-phuket.jpg";
import trisaraPhuket from "@/assets/resorts/trisara-phuket.jpg";
// Dubai
  import atlantisTheRoyal from "@/assets/resorts/atlantis-the-royal.jpg";
  import burjAlArabJumeirah from "@/assets/resorts/burj-al-arab-jumeirah.jpg";
  import oneAndOnlyThePalm from "@/assets/resorts/oneandonly-the-palm.jpg";
// Greece
import domesOfElounda from "@/assets/resorts/domes-of-elounda.jpg";
import eloundaBayPalace from "@/assets/resorts/elounda-bay-palace.jpg";
import eloundaBeachHotel from "@/assets/resorts/elounda-beach-hotel.jpg";
import clubmedGregolimano from "@/assets/resorts/clubmed-gregolimano.jpg";
// Greece Honeymoon
import santoriniHoneymoonSuite from "@/assets/resorts/santorini-honeymoon-suite.jpg";
import mykonosHoneymoonVilla from "@/assets/resorts/mykonos-honeymoon-villa.jpg";
import santoriniOiaHoneymoon from "@/assets/resorts/santorini-oia-honeymoon.jpg";
import mykonosBoutiqueHoneymoon from "@/assets/resorts/mykonos-boutique-honeymoon.jpg";
// Switzerland
import swissAlps from "@/assets/resorts/swiss-alps.jpg";
import clubmedStMoritz from "@/assets/resorts/clubmed-stmoritz.jpg";
import clubmedVillars from "@/assets/resorts/clubmed-villars.jpg";
// South Africa
  import oneAndOnlyCapeTown from "@/assets/resorts/oneandonly-cape-town.jpg";
  import singitaSabiSand from "@/assets/resorts/singita-sabi-sand.webp";
  import ellermanHouse from "@/assets/resorts/ellerman-house.jpg";
  import theSiloHotel from "@/assets/resorts/the-silo-hotel.jpg";
// Dhawa Ihuru
import dhawaIhuru from "@/assets/resorts/dhawa-ihuru.jpg";
// Cruises
import disneyCruise from "@/assets/resorts/disney-cruise.jpg";

interface OfferData {
  id: string;
  image: string;
  hotelName: string;
  location: string;
  destination: string;
  stars: number;
  description: string;
  nights: number;
  price: string;
  priceNote?: string;
  transferType?: string;
  whatsappMessage: string;
  validUntil?: string;
  discount?: string;
  specialNote?: string;
}

const offersData: OfferData[] = [
  {
    id: "dhawa-ihuru",
    image: dhawaIhuru,
    hotelName: "Dhawa Ihuru",
    location: "North Malé Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Intimate beach resort with complimentary activities including dolphin cruise, sunset cruise, night fishing and spa massage.",
    nights: 3,
    price: "$2,340",
    priceNote: "for 2 adults",
    transferType: "Speedboat",
    whatsappMessage: "Hi! I'm interested in the Dhawa Ihuru Maldives package - 3 Nights Beach Villa at $2,340 for 2 adults. Please share availability.",
    validUntil: "30 April 2025",
    discount: "SPECIAL OFFER",
    specialNote: "Complimentary 3 activities for 3 nights stay, 4 activities for 4 nights stay, and maximum 5 activities for 5 nights stay and above."
  },
  {
    id: "ozen-reserve",
    image: ozenReserve,
    hotelName: "OZEN Reserve Bolifushi",
    location: "South Malé Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Ultra-luxury all-inclusive sanctuary with underwater restaurant and private butler service.",
    nights: 4,
    price: "$6,200",
    priceNote: "for 2 people",
    transferType: "Speedboat",
    whatsappMessage: "Hi! I'm interested in the OZEN Reserve Bolifushi package for 4 nights at $6,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "atmosphere-kanifushi",
    image: anantaraKihavah,
    hotelName: "Atmosphere Kanifushi Maldives",
    location: "Lhaviyani Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Award-winning Platinum Plus all-inclusive with 6 restaurants and unlimited spa.",
    nights: 4,
    price: "$4,800",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in the Atmosphere Kanifushi package for 4 nights at $4,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "kudadoo",
    image: velaaMaldives,
    hotelName: "Kudadoo Private Island",
    location: "Lhaviyani Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Ultra-luxury adults-only private island with limitless experiences and personal butler.",
    nights: 3,
    price: "$8,500",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in Kudadoo Private Island for 3 nights at $8,500 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "20% OFF"
  },
  {
    id: "constance-halaveli",
    image: constanceBelleMare,
    hotelName: "Constance Halaveli",
    location: "North Ari Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Elegant Mauritian hospitality with exceptional diving and world-class water villas.",
    nights: 4,
    price: "$5,400",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in Constance Halaveli for 4 nights at $5,400 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "you-me-cocoon",
    image: cocoonAerial,
    hotelName: "You & Me by Cocoon Maldives",
    location: "Raa Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Intimate adults-only sanctuary with H2O Underwater Restaurant and Premium All-Inclusive.",
    nights: 3,
    price: "$3,300",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in the You & Me by Cocoon Maldives package for 3 nights at $3,300 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "35% OFF"
  },
  {
    id: "kandima",
    image: maldivesKandinma,
    hotelName: "Kandima Maldives",
    location: "Dhaalu Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Game-changing lifestyle resort with the longest outdoor pool in Maldives.",
    nights: 4,
    price: "$3,700",
    priceNote: "for 2 people",
    transferType: "Domestic + Speedboat",
    whatsappMessage: "Hi! I'm interested in the Kandima Maldives package for 4 nights at $3,700 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "40% OFF"
  },
  {
    id: "raffles-seychelles",
    image: rafflesSeychelles,
    hotelName: "Raffles Seychelles",
    location: "Praslin Island",
    destination: "Seychelles",
    stars: 5,
    description: "Iconic hillside villas with private pools and award-winning Raffles Spa.",
    nights: 4,
    price: "$5,200",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Raffles Seychelles for 4 nights at $5,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "four-seasons-seychelles",
    image: fourSeasonsSeychelles,
    hotelName: "Four Seasons Seychelles",
    location: "Mahé Island",
    destination: "Seychelles",
    stars: 5,
    description: "Tree-house inspired villas with exceptional diving and nature experiences.",
    nights: 4,
    price: "$6,100",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Four Seasons Seychelles for 4 nights at $6,100 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "20% OFF"
  },
  {
    id: "six-senses-seychelles",
    image: sixSensesSeychelles,
    hotelName: "Six Senses Zil Pasyon",
    location: "Félicité Island",
    destination: "Seychelles",
    stars: 5,
    description: "Private island escape with wellness-focused experiences and stunning natural beauty.",
    nights: 4,
    price: "$7,200",
    priceNote: "for 2 people",
    transferType: "Boat Transfer",
    whatsappMessage: "Hi! I'm interested in Six Senses Zil Pasyon for 4 nights at $7,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "constance-ephelia",
    image: constanceEphelia,
    hotelName: "Constance Ephelia",
    location: "Mahé Island",
    destination: "Seychelles",
    stars: 5,
    description: "Sprawling family-friendly resort with two pristine beaches and extensive amenities.",
    nights: 5,
    price: "$4,500",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Constance Ephelia for 5 nights at $4,500 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "constance-prince-maurice",
    image: constancePrinceMaurice,
    hotelName: "Constance Prince Maurice",
    location: "Poste de Flacq",
    destination: "Mauritius",
    stars: 5,
    description: "Legendary resort with floating restaurant and timeless tropical elegance.",
    nights: 5,
    price: "$4,800",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Constance Prince Maurice for 5 nights at $4,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "four-seasons-mauritius",
    image: fourSeasonsMauritius,
    hotelName: "Four Seasons Resort Mauritius",
    location: "Anahita",
    destination: "Mauritius",
    stars: 5,
    description: "Secluded beachfront villas with private plunge pools and world-class golf.",
    nights: 5,
    price: "$5,600",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Four Seasons Mauritius for 5 nights at $5,600 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "20% OFF"
  },
  {
    id: "st-regis-mauritius",
    image: stRegisMauritius,
    hotelName: "The St. Regis Mauritius",
    location: "Le Morne",
    destination: "Mauritius",
    stars: 5,
    description: "Legendary butler service with stunning Le Morne mountain views.",
    nights: 5,
    price: "$5,200",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in The St. Regis Mauritius for 5 nights at $5,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "shangri-la-mauritius",
    image: shangriLaMauritius,
    hotelName: "Shangri-La's Le Touessrok",
    location: "Trou d'Eau Douce",
    destination: "Mauritius",
    stars: 5,
    description: "Iconic beachfront resort with private island access and championship golf.",
    nights: 5,
    price: "$4,400",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Shangri-La Mauritius for 5 nights at $4,400 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "35% OFF"
  },
  // Bali Offers
  {
    id: "samabe-bali",
    image: samabeBali,
    hotelName: "Samabe Bali Suites & Villas",
    location: "Nusa Dua",
    destination: "Bali",
    stars: 5,
    description: "Unlimited Privilege luxury all-inclusive with private beach and butler service.",
    nights: 4,
    price: "$3,800",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Samabe Bali for 4 nights at $3,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "four-seasons-bali",
    image: baliClifftop,
    hotelName: "Four Seasons Resort Bali at Jimbaran Bay",
    location: "Jimbaran Bay",
    destination: "Bali",
    stars: 5,
    description: "Iconic clifftop villas with stunning ocean views and world-class spa.",
    nights: 4,
    price: "$5,200",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Four Seasons Bali Jimbaran for 4 nights at $5,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "clubmed-bali",
    image: clubmedBali,
    hotelName: "Club Med Bali",
    location: "Nusa Dua",
    destination: "Bali",
    stars: 5,
    description: "Premium all-inclusive family resort with endless activities and gourmet dining.",
    nights: 5,
    price: "$4,100",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Club Med Bali for 5 nights at $4,100 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "35% OFF"
  },
  // Phuket Offers
  {
    id: "amanpuri-phuket",
    image: amanpuriPhuket,
    hotelName: "Amanpuri Phuket",
    location: "Pansea Beach",
    destination: "Phuket",
    stars: 5,
    description: "The legendary Aman flagship property with Thai-inspired pavilions and private beach.",
    nights: 4,
    price: "$6,500",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Amanpuri Phuket for 4 nights at $6,500 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "20% OFF"
  },
  {
    id: "rosewood-phuket",
    image: rosewoodPhuket,
    hotelName: "Rosewood Phuket",
    location: "Emerald Bay",
    destination: "Phuket",
    stars: 5,
    description: "Ultra-luxury hillside resort with panoramic Andaman Sea views and private pools.",
    nights: 4,
    price: "$5,800",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Rosewood Phuket for 4 nights at $5,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "banyan-tree-phuket",
    image: banyanTreePhuket,
    hotelName: "Banyan Tree Phuket",
    location: "Laguna",
    destination: "Phuket",
    stars: 5,
    description: "Award-winning spa resort with private pool villas and championship golf.",
    nights: 4,
    price: "$4,200",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Banyan Tree Phuket for 4 nights at $4,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "trisara-phuket",
    image: trisaraPhuket,
    hotelName: "Trisara Phuket",
    location: "Nai Thon Beach",
    destination: "Phuket",
    stars: 5,
    description: "Exclusive oceanfront villas with private infinity pools and personalized dining.",
    nights: 4,
    price: "$5,400",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Trisara Phuket for 4 nights at $5,400 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  // Dubai Offers
  {
    id: "atlantis-royal",
    image: atlantisTheRoyal,
    hotelName: "Atlantis The Royal",
    location: "Palm Jumeirah",
    destination: "Dubai",
    stars: 5,
    description: "Ultra-luxury architectural marvel with 17 celebrity chef restaurants and infinity pools.",
    nights: 4,
    price: "$5,200",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Atlantis The Royal Dubai for 4 nights at $5,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "burj-al-arab",
    image: burjAlArabJumeirah,
    hotelName: "Burj Al Arab Jumeirah",
    location: "Jumeirah Beach",
    destination: "Dubai",
    stars: 5,
    description: "The world's most luxurious hotel with iconic sail design and personalized butler service.",
    nights: 3,
    price: "$7,800",
    priceNote: "for 2 people",
    transferType: "Rolls-Royce Transfer",
    whatsappMessage: "Hi! I'm interested in Burj Al Arab for 3 nights at $7,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "15% OFF"
  },
  {
    id: "one-only-palm",
    image: oneAndOnlyThePalm,
    hotelName: "One&Only The Palm",
    location: "Palm Jumeirah",
    destination: "Dubai",
    stars: 5,
    description: "Intimate beachfront sanctuary with Moorish architecture and private marina.",
    nights: 4,
    price: "$4,600",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in One&Only The Palm for 4 nights at $4,600 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  // Greece Offers
  {
    id: "domes-of-elounda",
    image: domesOfElounda,
    hotelName: "Domes of Elounda",
    location: "Elounda, Crete",
    destination: "Greece",
    stars: 5,
    description: "Autograph Collection resort with private beach, Haute Living suites and family-friendly luxury.",
    nights: 5,
    price: "$4,200",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Domes of Elounda for 5 nights at $4,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "elounda-bay-palace",
    image: eloundaBayPalace,
    hotelName: "Elounda Bay Palace",
    location: "Elounda, Crete",
    destination: "Greece",
    stars: 5,
    description: "Legendary Greek hospitality with private marina, spa and stunning Mirabello Bay views.",
    nights: 5,
    price: "$3,800",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Elounda Bay Palace for 5 nights at $3,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "35% OFF"
  },
  {
    id: "elounda-beach-hotel",
    image: eloundaBeachHotel,
    hotelName: "Elounda Beach Hotel & Villas",
    location: "Elounda, Crete",
    destination: "Greece",
    stars: 5,
    description: "Award-winning beachfront resort with private villas, six-star service and world-class dining.",
    nights: 5,
    price: "$4,500",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Elounda Beach Hotel for 5 nights at $4,500 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  {
    id: "clubmed-gregolimano",
    image: clubmedGregolimano,
    hotelName: "Club Med Gregolimano",
    location: "Evia Island",
    destination: "Greece",
    stars: 4,
    description: "Family-friendly all-inclusive on a private peninsula with watersports and kids clubs.",
    nights: 7,
    price: "$3,200",
    priceNote: "for 2 people",
    transferType: "Car Transfer",
    whatsappMessage: "Hi! I'm interested in Club Med Gregolimano for 7 nights at $3,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "40% OFF"
  },
  // Greece Honeymoon Packages
  {
    id: "santorini-andronis-honeymoon",
    image: santoriniHoneymoonSuite,
    hotelName: "Andronis Luxury Suites Honeymoon",
    location: "Oia, Santorini",
    destination: "Greece",
    stars: 5,
    description: "Ultimate Santorini honeymoon with return flights from Dubai, private airport transfers, infinity pool suite overlooking the caldera, sunset sailing cruise, and couple's spa treatment.",
    nights: 5,
    price: "$7,200",
    priceNote: "for 2 people incl. flights",
    transferType: "Flights + Private Transfer",
    whatsappMessage: "Hi! I'm interested in the Andronis Luxury Suites Santorini Honeymoon Package - 5 Nights at $7,200 including flights and transfers. Please share availability.",
    validUntil: "30 September 2025",
    discount: "HONEYMOON SPECIAL",
    specialNote: "Includes: Return flights from Dubai, private airport transfers, daily breakfast, sunset sailing cruise, couple's spa massage, romantic candlelit dinner, and room upgrade subject to availability."
  },
  {
    id: "santorini-canaves-honeymoon",
    image: santoriniOiaHoneymoon,
    hotelName: "Canaves Oia Epitome Honeymoon",
    location: "Oia, Santorini",
    destination: "Greece",
    stars: 5,
    description: "Exclusive honeymoon escape with flights, cave pool suite with caldera views, private wine tasting tour, sunset catamaran cruise, and in-room couple's massage.",
    nights: 6,
    price: "$8,500",
    priceNote: "for 2 people incl. flights",
    transferType: "Flights + Private Transfer",
    whatsappMessage: "Hi! I'm interested in the Canaves Oia Epitome Santorini Honeymoon Package - 6 Nights at $8,500 including flights. Please share availability.",
    validUntil: "30 September 2025",
    discount: "25% OFF",
    specialNote: "Includes: Return flights from Dubai/GCC, VIP airport meet & greet, daily gourmet breakfast, sunset catamaran cruise with dinner, wine tasting in Santorini vineyards, and couple's spa experience."
  },
  {
    id: "santorini-katikies-honeymoon",
    image: santoriniHoneymoonSuite,
    hotelName: "Katikies Kirini Honeymoon",
    location: "Oia, Santorini",
    destination: "Greece",
    stars: 5,
    description: "Romantic spa retreat with flights, master suite with private pool, signature Hammam experience, private photography session, and sunset dinner overlooking the Aegean.",
    nights: 5,
    price: "$6,800",
    priceNote: "for 2 people incl. flights",
    transferType: "Flights + Private Transfer",
    whatsappMessage: "Hi! I'm interested in the Katikies Kirini Santorini Honeymoon Package - 5 Nights at $6,800 including flights. Please share availability.",
    validUntil: "30 September 2025",
    discount: "30% OFF",
    specialNote: "Includes: Return flights from Dubai, private transfers, daily breakfast, Hammam spa experience, professional honeymoon photo session, and romantic private dinner."
  },
  {
    id: "mykonos-cavo-tagoo-honeymoon",
    image: mykonosHoneymoonVilla,
    hotelName: "Cavo Tagoo Mykonos Honeymoon",
    location: "Mykonos Town",
    destination: "Greece",
    stars: 5,
    description: "Iconic Mykonos honeymoon with flights, suite with private pool, sunset yacht cruise to Delos, couples spa, and private dining experience at the infinity pool.",
    nights: 5,
    price: "$7,500",
    priceNote: "for 2 people incl. flights",
    transferType: "Flights + Private Transfer",
    whatsappMessage: "Hi! I'm interested in the Cavo Tagoo Mykonos Honeymoon Package - 5 Nights at $7,500 including flights. Please share availability.",
    validUntil: "30 September 2025",
    discount: "HONEYMOON SPECIAL",
    specialNote: "Includes: Return flights from Dubai, VIP airport transfers, daily gourmet breakfast, private yacht cruise to Delos Island, couple's spa treatment, and romantic poolside dinner."
  },
  {
    id: "mykonos-kivotos-honeymoon",
    image: mykonosBoutiqueHoneymoon,
    hotelName: "Kivotos Mykonos Honeymoon",
    location: "Ornos Beach, Mykonos",
    destination: "Greece",
    stars: 5,
    description: "Boutique luxury honeymoon with flights, Hideaway Villa with infinity pool, private beach cabana, sunset sailing cruise, and romantic dinner on private yacht.",
    nights: 6,
    price: "$8,200",
    priceNote: "for 2 people incl. flights",
    transferType: "Flights + Private Transfer",
    whatsappMessage: "Hi! I'm interested in the Kivotos Mykonos Honeymoon Package - 6 Nights at $8,200 including flights. Please share availability.",
    validUntil: "30 September 2025",
    discount: "20% OFF",
    specialNote: "Includes: Return flights from Dubai/GCC, private airport transfers, daily breakfast, Hideaway Villa upgrade, sunset sailing cruise, private beach dinner, and complimentary spa credits."
  },
  {
    id: "mykonos-bill-coo-honeymoon",
    image: mykonosHoneymoonVilla,
    hotelName: "Bill & Coo Suites Honeymoon",
    location: "Megali Ammos, Mykonos",
    destination: "Greece",
    stars: 5,
    description: "Adults-only honeymoon sanctuary with flights, suite with private pool, tasting menu dinner, Delos archaeological tour, and sunset cocktails at the beach bar.",
    nights: 5,
    price: "$6,500",
    priceNote: "for 2 people incl. flights",
    transferType: "Flights + Private Transfer",
    whatsappMessage: "Hi! I'm interested in the Bill & Coo Mykonos Honeymoon Package - 5 Nights at $6,500 including flights. Please share availability.",
    validUntil: "30 September 2025",
    discount: "35% OFF",
    specialNote: "Includes: Return flights from Dubai, luxury transfers, daily gourmet breakfast, tasting menu dinner for 2, Delos island excursion, couple's massage, and sunset cocktails daily."
  },
  // Switzerland Offers
  {
    id: "badrutts-palace",
    image: swissAlps,
    hotelName: "Badrutt's Palace Hotel",
    location: "St. Moritz",
    destination: "Switzerland",
    stars: 5,
    description: "Legendary alpine palace with world-class skiing, spa and panoramic mountain views.",
    nights: 4,
    price: "$6,800",
    priceNote: "for 2 people",
    transferType: "Private Transfer",
    whatsappMessage: "Hi! I'm interested in Badrutt's Palace St. Moritz for 4 nights at $6,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "20% OFF"
  },
  {
    id: "clubmed-stmoritz",
    image: clubmedStMoritz,
    hotelName: "Club Med Saint-Moritz Roi Soleil",
    location: "St. Moritz",
    destination: "Switzerland",
    stars: 4,
    description: "Premium all-inclusive ski resort with ski-in/ski-out access and gourmet dining.",
    nights: 7,
    price: "$5,200",
    priceNote: "for 2 people",
    transferType: "Coach Transfer",
    whatsappMessage: "Hi! I'm interested in Club Med St. Moritz for 7 nights at $5,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "clubmed-villars",
    image: clubmedVillars,
    hotelName: "Club Med Villars-sur-Ollon",
    location: "Villars-sur-Ollon",
    destination: "Switzerland",
    stars: 4,
    description: "Chic alpine village resort with family-friendly slopes and stunning Lake Geneva views.",
    nights: 7,
    price: "$4,800",
    priceNote: "for 2 people",
    transferType: "Coach Transfer",
    whatsappMessage: "Hi! I'm interested in Club Med Villars for 7 nights at $4,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "35% OFF"
  },
  {
    id: "chedi-andermatt",
    image: swissAlps,
    hotelName: "The Chedi Andermatt",
    location: "Andermatt",
    destination: "Switzerland",
    stars: 5,
    description: "Contemporary alpine luxury with Asia-inspired design, exceptional spa and ski concierge.",
    nights: 4,
    price: "$5,600",
    priceNote: "for 2 people",
    transferType: "Private Transfer",
    whatsappMessage: "Hi! I'm interested in The Chedi Andermatt for 4 nights at $5,600 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  // South Africa Offers
  {
    id: "oneandonly-cape-town",
    image: oneAndOnlyCapeTown,
    hotelName: "One&Only Cape Town",
    location: "V&A Waterfront",
    destination: "South Africa",
    stars: 5,
    description: "Urban resort oasis with Table Mountain views, spa island and celebrity chef restaurants.",
    nights: 5,
    price: "$4,200",
    priceNote: "for 2 people",
    transferType: "Private Transfer",
    whatsappMessage: "Hi! I'm interested in One&Only Cape Town for 5 nights at $4,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
  },
  {
    id: "singita-sabi-sand",
    image: singitaSabiSand,
    hotelName: "Singita Sabi Sand",
    location: "Kruger National Park",
    destination: "South Africa",
    stars: 5,
    description: "Ultra-luxury safari lodge with Big Five game drives and conservation experience.",
    nights: 4,
    price: "$8,500",
    priceNote: "for 2 people",
    transferType: "Charter Flight",
    whatsappMessage: "Hi! I'm interested in Singita Sabi Sand for 4 nights at $8,500 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "15% OFF"
  },
  {
    id: "ellerman-house",
    image: ellermanHouse,
    hotelName: "Ellerman House",
    location: "Bantry Bay, Cape Town",
    destination: "South Africa",
    stars: 5,
    description: "Intimate boutique villa hotel with contemporary art collection and Atlantic Ocean views.",
    nights: 5,
    price: "$5,800",
    priceNote: "for 2 people",
    transferType: "Private Transfer",
    whatsappMessage: "Hi! I'm interested in Ellerman House for 5 nights at $5,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "20% OFF"
  },
  {
    id: "the-silo-cape-town",
    image: theSiloHotel,
    hotelName: "The Silo Hotel",
    location: "V&A Waterfront",
    destination: "South Africa",
    stars: 5,
    description: "Iconic design hotel above Zeitz MOCAA with extraordinary pillowed windows and rooftop pool.",
    nights: 4,
    price: "$4,600",
    priceNote: "for 2 people",
    transferType: "Private Transfer",
    whatsappMessage: "Hi! I'm interested in The Silo Hotel for 4 nights at $4,600 for 2 people. Please send availability.",
    validUntil: "30 April 2025",
    discount: "25% OFF"
  },
  // Cruise Offers
  {
    id: "disney-cruise-caribbean",
    image: disneyCruise,
    hotelName: "Disney Cruise Line - Caribbean Adventure",
    location: "Caribbean Islands",
    destination: "Cruises",
    stars: 5,
    description: "Magical family adventure with character dining, Broadway-style shows, kids clubs, and exclusive Castaway Cay island.",
    nights: 7,
    price: "$5,800",
    priceNote: "for family of 4",
    transferType: "Port Canaveral",
    whatsappMessage: "Hi! I'm interested in the Disney Cruise Caribbean Adventure for 7 nights at $5,800 for a family of 4. Please send availability.",
    validUntil: "30 June 2025",
    discount: "FAMILY SPECIAL",
    specialNote: "Includes character meet & greets, kids club access, and rotational dining at 3 themed restaurants."
  },
  {
    id: "disney-cruise-bahamas",
    image: disneyCruise,
    hotelName: "Disney Cruise Line - Bahamas Escape",
    location: "Nassau & Castaway Cay",
    destination: "Cruises",
    stars: 5,
    description: "Short getaway with Disney magic, featuring Castaway Cay private island and world-class entertainment.",
    nights: 4,
    price: "$3,200",
    priceNote: "for family of 4",
    transferType: "Port Canaveral",
    whatsappMessage: "Hi! I'm interested in the Disney Cruise Bahamas Escape for 4 nights at $3,200 for a family of 4. Please send availability.",
    validUntil: "30 June 2025",
    discount: "20% OFF"
  }
];

interface UploadedOffer {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  category: string | null;
  destination: string | null;
  hotel_name: string | null;
  nights: number | null;
  file_url: string | null;
}

const Offers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [uploadedOffers, setUploadedOffers] = useState<UploadedOffer[]>([]);

  useEffect(() => {
    supabase
      .from("offers")
      .select("id,title,description,price,currency,image_url,category,destination,hotel_name,nights,file_url")
      .eq("is_active", true)
      .order("display_order", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => setUploadedOffers((data as UploadedOffer[]) || []));
  }, []);

  const destinations = useMemo(() => {
    const destSet = new Set(offersData.map(o => o.destination));
    return ["all", ...Array.from(destSet)];
  }, []);


  const filteredOffers = useMemo(() => {
    return offersData.filter(offer => {
      const matchesSearch = offer.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDestination = selectedDestination === "all" || offer.destination === selectedDestination;
      return matchesSearch && matchesDestination;
    });
  }, [searchQuery, selectedDestination]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Exclusive Resort Offers & Deals | ResortsOffers.com</title>
        <meta name="description" content="Discover exclusive luxury resort offers in Maldives, Seychelles & Mauritius. Special discounts up to 40% off on 5-star resorts. Limited time deals." />
        <meta name="keywords" content="luxury resort offers, Maldives deals, Seychelles packages, Mauritius resorts, exclusive hotel discounts, vacation packages" />
        <link rel="canonical" href="https://resortsoffers.com/offers" />
        <meta property="og:title" content="Exclusive Resort Offers & Deals | ResortsOffers.com" />
        <meta property="og:description" content="Discover exclusive luxury resort offers in Maldives, Seychelles & Mauritius. Special discounts up to 40% off." />
        <meta property="og:url" content="https://resortsoffers.com/offers" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Exclusive Offers
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Limited-time luxury resort deals with up to 40% savings
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search offers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {destinations.map((dest) => (
                <Button
                  key={dest}
                  variant={selectedDestination === dest ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDestination(dest)}
                  className="capitalize"
                >
                  {dest === "all" ? "All Destinations" : dest}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Uploaded Offers */}
      {uploadedOffers.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-primary">Latest Offers</h2>
                <p className="text-muted-foreground mt-2">Freshly uploaded by our advisory team</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedOffers.map((o) => (
                <Link
                  key={o.id}
                  to={`/offers/${o.id}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border block"
                >
                  <div className="relative h-56 bg-muted overflow-hidden">
                    {o.image_url ? (
                      <img
                        src={safeHotelImage(o.image_url)}
                        alt={o.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        PDF Offer
                      </div>
                    )}
                    {o.category && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {o.category}
                      </Badge>
                    )}
                    {o.destination && (
                      <Badge variant="secondary" className="absolute top-3 right-3">
                        {o.destination}
                      </Badge>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{o.title}</h3>
                    {o.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{o.description}</p>
                    )}
                    <div className="flex items-end justify-between">
                      <div>
                        {o.price != null ? (
                          <>
                            <p className="text-2xl font-bold text-primary">
                              {o.currency || "USD"} {Number(o.price).toLocaleString()}
                            </p>
                            {o.nights && (
                              <p className="text-xs text-muted-foreground">{o.nights} nights</p>
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground">View details</span>
                        )}
                      </div>
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                        Details <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Offers Grid */}
      <section className="section-padding">
        <div className="container-custom">

          {filteredOffers.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No offers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <div key={offer.id} className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={safeHotelImage(offer.image)}
                      alt={offer.hotelName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {offer.discount && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white">
                        {offer.discount}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      {offer.destination}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Stars & Location */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(offer.stars)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {offer.location}
                      </div>
                    </div>

                    {/* Hotel Name */}
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{offer.hotelName}</h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{offer.description}</p>

                    {/* Transfer & Nights */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      {offer.transferType && (
                        <div className="flex items-center gap-1">
                          <Plane className="h-3.5 w-3.5" />
                          {offer.transferType}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <BedDouble className="h-3.5 w-3.5" />
                        {offer.nights} Nights
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">{offer.price}</p>
                        {offer.priceNote && (
                          <p className="text-xs text-muted-foreground">{offer.priceNote}</p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#25D366] hover:bg-[#128C7E]"
                        asChild
                      >
                        <a
                          href={`https://wa.me/971567622484?text=${encodeURIComponent(offer.whatsappMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Enquire
                        </a>
                      </Button>
                    </div>

                    {/* Special Note */}
                    {offer.specialNote && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-4">
                        <div className="flex gap-2">
                          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-800 leading-relaxed">
                            <strong>Note:</strong> {offer.specialNote}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Valid Until */}
                    {offer.validUntil && (
                      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                        Valid until {offer.validUntil}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our travel experts can create a custom package tailored to your preferences and budget.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            asChild
          >
            <a
              href="https://wa.me/971567622484?text=Hi! I'm looking for a custom resort package. Can you help?"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat With Us
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offers;
