import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star, MapPin, Ship, Palmtree, Building2, Tent, Plane, Anchor, Car, Heart, Sparkles, Crown, Clock, Filter, X, Search } from "lucide-react";

// Import local images
import soneva from "@/assets/resorts/soneva-fushi.jpg";
import chevalBlanc from "@/assets/resorts/cheval-blanc-randheli.jpg";
import oneOnlyReethi from "@/assets/resorts/oneandonly-reethi-rah.jpg";
import stRegisMaldives from "@/assets/resorts/maldives-water-villa.jpg";
import waldorfMaldives from "@/assets/resorts/waldorf-astoria-maldives.jpg";
import fourSeasonsLandaa from "@/assets/resorts/four-seasons-landaa.jpg";
import ritzCarltonMaldives from "@/assets/resorts/ritz-carlton-maldives.jpg";
import velaaMaldives from "@/assets/resorts/velaa-private-island.jpg";
import kandimaMaldives from "@/assets/resorts/maldives-kandinma-hq.jpg";
import standardMaldives from "@/assets/resorts/maldives-villa-pool.jpg";

import patinaMaldives from "@/assets/resorts/patina-maldives.jpg";
import joaliMaldives from "@/assets/resorts/joali-maldives.jpg";
import anantaraKihavah from "@/assets/resorts/anantara-kihavah.jpg";
import youAndMeCocoon from "@/assets/resorts/you-and-me-cocoon-aerial.jpg";
import dusitThani from "@/assets/resorts/dusit-thani-maldives.jpg";
import siyamWorld from "@/assets/resorts/siyam-world.jpg";
import hardRock from "@/assets/resorts/hard-rock-maldives.jpg";
import fairmont from "@/assets/resorts/fairmont-maldives.jpg";
import wMaldives from "@/assets/resorts/w-maldives.jpg";
import niyama from "@/assets/resorts/niyama-maldives.jpg";
import vakkaru from "@/assets/resorts/vakkaru-maldives.jpg";
import soMaldives from "@/assets/resorts/so-maldives.jpg";
import ozenReserve from "@/assets/resorts/ozen-reserve-bolifushi.jpg";
import jwMarriott from "@/assets/resorts/jw-marriott-maldives.jpg";
import jumeirahMaldives from "@/assets/resorts/jumeirah-maldives.jpg";
import kudaVillingili from "@/assets/resorts/kuda-villingili.jpg";
import hiltonAmingiri from "@/assets/resorts/hilton-amingiri.jpg";
import joyIsland from "@/assets/resorts/joy-island.jpg";
import oagaArt from "@/assets/resorts/oaga-art-maldives.jpg";
// New Maldives resorts
import nautilusMaldives from "@/assets/resorts/nautilus-maldives.jpg";
import fushifaruMaldives from "@/assets/resorts/fushifaru-maldives.jpg";
import ayadaMaldives from "@/assets/resorts/ayada-maldives.jpg";
import amariHavodda from "@/assets/resorts/amari-havodda.jpg";
import finolhuMaldives from "@/assets/resorts/finolhu-maldives.jpg";
import varuAtmosphere from "@/assets/resorts/varu-atmosphere.jpg";
import sunSiyamIruVeli from "@/assets/resorts/sun-siyam-iru-veli.jpg";
import alilaMaldives from "@/assets/resorts/alila-maldives.jpg";
import jaManafaru from "@/assets/resorts/ja-manafaru.jpg";
import furaveriMaldives from "@/assets/resorts/furaveri-maldives.jpg";
import baglioniMaldives from "@/assets/resorts/baglioni-maldives.jpg";
import residenceMaldives from "@/assets/resorts/residence-maldives.jpg";

import northIsland from "@/assets/resorts/north-island-seychelles.jpg";
import fourSeasonsSeychelles from "@/assets/resorts/four-seasons-seychelles.jpg";
import sixSensesSeychelles from "@/assets/resorts/six-senses-seychelles.jpg";
import rafflesSeychelles from "@/assets/resorts/raffles-seychelles.jpg";
import constanceEphelia from "@/assets/resorts/constance-ephelia.jpg";
import mangoHouse from "@/assets/resorts/mango-house-seychelles.jpg";
import anantaraMaia from "@/assets/resorts/anantara-maia-seychelles.jpg";
import hiltonNortholme from "@/assets/resorts/hilton-northolme.jpg";
import astoriaSeychelles from "@/assets/resorts/astoria-seychelles.jpg";
import kempinskiSeychelles from "@/assets/resorts/kempinski-seychelles.jpg";
import hiltonCanopySeychelles from "@/assets/resorts/hilton-canopy-seychelles.jpg";
import domaineOrangeraieSeychelles from "@/assets/resorts/domaine-orangeraie-seychelles.jpg";
import doubletreeSeychelles from "@/assets/resorts/doubletree-seychelles.jpg";
import lailaSeychelles from "@/assets/resorts/laila-seychelles.jpg";
import crownBeachSeychelles from "@/assets/resorts/crown-beach-seychelles.jpg";
import blissMahe from "@/assets/resorts/bliss-mahe.jpg";
import blissPraslin from "@/assets/resorts/bliss-praslin.jpg";
import leDucSeychelles from "@/assets/resorts/le-duc-seychelles.jpg";
import edenBleuSeychelles from "@/assets/resorts/eden-bleu-seychelles.jpg";
import lesLauriersSeychelles from "@/assets/resorts/les-lauriers-seychelles.jpg";

import oneOnlyMauritius from "@/assets/resorts/oneandonly-mauritius.jpg";
import stRegisMauritius from "@/assets/resorts/st-regis-mauritius.jpg";
import fourSeasonsMauritius from "@/assets/resorts/four-seasons-mauritius.jpg";
import shangrila from "@/assets/resorts/shangri-la-mauritius.jpg";
import oberoiMauritius from "@/assets/resorts/oberoi-mauritius.jpg";
import constancePrince from "@/assets/resorts/constance-prince-maurice.jpg";
import luxBelleMare from "@/assets/resorts/lux-belle-mare.jpg";
import constanceBelleMare from "@/assets/resorts/constance-belle-mare.jpg";
import cMauritius from "@/assets/resorts/c-mauritius.jpg";
import luxGrandBaie from "@/assets/resorts/lux-grand-baie.jpg";
import baweIslandZanzibar from "@/assets/resorts/bawe-island-zanzibar.jpg";
import goldZanzibar from "@/assets/resorts/gold-zanzibar.jpg";
import islandPongweZanzibar from "@/assets/resorts/island-pongwe-zanzibar.jpg";

import santoriniHero from "@/assets/destinations/greece-santorini.jpg";
import mykonosHero from "@/assets/destinations/greece-mykonos.jpg";
import greeceAthens from "@/assets/destinations/greece-athens.jpg";
import greeceCrete from "@/assets/destinations/greece-crete.jpg";
import domesOfElounda from "@/assets/resorts/domes-of-elounda.jpg";
import royalBlueResort from "@/assets/resorts/royal-blue-resort.jpg";
import abatonIslandResort from "@/assets/resorts/abaton-island-resort.jpg";
import eloundaBeachHotel from "@/assets/resorts/elounda-beach-hotel.jpg";
import eloundaBayPalace from "@/assets/resorts/elounda-bay-palace.jpg";

import londonHero from "@/assets/destinations/london-hero.jpg";
import londonLuxury from "@/assets/resorts/london-luxury.jpg";

import dubaiLuxury from "@/assets/resorts/dubai-luxury.jpg";

import baliResort from "@/assets/resorts/bali-clifftop-resort.jpg";
import samabeBali from "@/assets/resorts/samabe-bali.jpg";
import rafflesBali from "@/assets/resorts/raffles-bali.jpg";

import cruiseHero from "@/assets/destinations/cruise-hero.jpg";
import disneyCruise from "@/assets/resorts/disney-cruise.jpg";

import phuketHero from "@/assets/destinations/phuket-hero.jpg";
import banyanTreePhuket from "@/assets/resorts/banyan-tree-phuket.jpg";
import trisaraPhuket from "@/assets/resorts/trisara-phuket.jpg";
import rosewoodPhuket from "@/assets/resorts/rosewood-phuket.jpg";
import keemalaPhuket from "@/assets/resorts/keemala-phuket.jpg";
import amanpuriPhuket from "@/assets/resorts/amanpuri-phuket.jpg";
import anantaraLayanPhuket from "@/assets/resorts/anantara-layan-phuket.jpg";
import diamondCliffPhuket from "@/assets/resorts/diamond-cliff-phuket.jpg";
import vVillasPhuket from "@/assets/resorts/v-villas-phuket.jpg";
import kalimaPhuket from "@/assets/resorts/kalima-phuket.jpg";

import heroImage from "@/assets/resorts/luxury-infinity-pool.jpg";

// Club Med imports
import clubmedKani from "@/assets/resorts/clubmed-kani.jpg";
import clubmedFinolhu from "@/assets/resorts/clubmed-finolhu.jpg";
import clubmedSeychelles from "@/assets/resorts/clubmed-seychelles.jpg";
import clubmedMauritiusPointe from "@/assets/resorts/clubmed-mauritius-pointe.jpg";
import clubmedMauritiusAlbion from "@/assets/resorts/clubmed-mauritius-albion.jpg";
import clubmedGregolimano from "@/assets/resorts/clubmed-gregolimano.jpg";
import clubmedBali from "@/assets/resorts/clubmed-bali.jpg";
import clubmedPhuket from "@/assets/resorts/clubmed-phuket.jpg";
import clubmedStmoritz from "@/assets/resorts/clubmed-stmoritz.jpg";
import clubmedVillars from "@/assets/resorts/clubmed-villars.jpg";

// Transfer types (Maldives)
type TransferType = "seaplane" | "speedboat" | "domestic";

// Seychelles island/area types
type SeychellesArea = "mahe" | "praslin" | "la-digue" | "silhouette" | "felicite" | "private-island";

// Greece island types
type GreeceIsland = "santorini" | "mykonos" | "crete" | "athens";

// Filter categories
type FilterCategory = "all" | "adult-only" | "all-inclusive" | "honeymoon" | "nora-picks" | "top-luxury" | "upcoming";

interface Hotel {
  name: string;
  image: string;
  description: string;
  transfer?: TransferType;
  seychellesArea?: SeychellesArea;
  greeceIsland?: GreeceIsland;
  isAdultOnly?: boolean;
  isAllInclusive?: boolean;
  isHoneymoon?: boolean;
  isNoraPick?: boolean;
  isTopLuxury?: boolean;
  isUpcoming?: boolean;
  openingYear?: string;
  hasPoolVilla?: boolean;
}

interface Destination {
  name: string;
  icon: React.ReactNode;
  hotels: Hotel[];
}

const destinations: Destination[] = [
  {
    name: "Maldives",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      // Top Luxury
      { name: "Velaa Private Island", image: velaaMaldives, description: "The epitome of bespoke luxury with private residences, golf academy, and exclusive fine dining.", transfer: "seaplane", isTopLuxury: true, isHoneymoon: true },
      { name: "Cheval Blanc Randheli", image: chevalBlanc, description: "LVMH's exclusive Maldivian retreat featuring contemporary design, Guerlain spa, and personalized butler service.", transfer: "seaplane", isTopLuxury: true, isHoneymoon: true },
      { name: "JOALI Maldives", image: joaliMaldives, description: "Art-immersive luxury resort showcasing curated installations by renowned international artists.", transfer: "seaplane", isTopLuxury: true, isNoraPick: true, isHoneymoon: true },
      { name: "One&Only Reethi Rah", image: oneOnlyReethi, description: "Sprawling over-water villas and pristine beaches on one of the largest resort islands in the Maldives.", transfer: "speedboat", isTopLuxury: true, isHoneymoon: true },
      { name: "Four Seasons Resort Maldives at Landaa Giraavaru", image: fourSeasonsLandaa, description: "UNESCO Biosphere Reserve location with pioneering marine discovery center and Ayurvedic spa.", transfer: "seaplane", isTopLuxury: true, isHoneymoon: true },
      { name: "Patina Maldives, Fari Islands", image: patinaMaldives, description: "Contemporary wellness sanctuary designed by Brazilian architect Marcio Kogan with sustainability at heart.", transfer: "speedboat", isTopLuxury: true, isNoraPick: true, isHoneymoon: true },
      { name: "Kuda Villingili Resort Maldives", image: kudaVillingili, description: "Intimate island sanctuary with personalized service and exceptional dining experiences.", transfer: "speedboat", isTopLuxury: true, isHoneymoon: true },
      { name: "Raffles Maldives Meradhoo", image: rafflesSeychelles, description: "Remote southern atoll hideaway with legendary Raffles butler service and pristine house reef.", transfer: "domestic", isTopLuxury: true, isHoneymoon: true },
      { name: "Jumeirah Maldives", image: jumeirahMaldives, description: "Overwater and beach villas with private pools, world-class dining and Arabian hospitality.", transfer: "seaplane", isTopLuxury: true, isHoneymoon: true },
      
      // Nora Recommendations
      { name: "The Ritz-Carlton Maldives, Fari Islands", image: ritzCarltonMaldives, description: "Contemporary island sanctuary with overwater and beach villas, featuring Ritz-Carlton's legendary service.", transfer: "speedboat", isNoraPick: true, isHoneymoon: true, isTopLuxury: true },
      { name: "The Westin Maldives Miriandhoo Resort", image: standardMaldives, description: "Wellness-focused resort with Heavenly Spa, pristine house reef, and sustainable luxury.", transfer: "seaplane", isNoraPick: true, isHoneymoon: true },
      
      { name: "The Standard, Huruvalhi Maldives", image: standardMaldives, description: "Trendy, design-forward resort bringing urban sophistication to paradise with playful luxury experiences.", transfer: "seaplane", isNoraPick: true, isHoneymoon: true },
      
      // Adult Only
      { name: "You & Me by Cocoon Maldives", image: youAndMeCocoon, description: "Adults-only paradise with premium all-inclusive dining, H2O underwater restaurant, and romantic overwater villas.", transfer: "seaplane", isAdultOnly: true, isHoneymoon: true },
      { name: "Nala Maldives by Jawakara", image: joaliMaldives, description: "Exclusive adults-only boutique resort with intimate luxury and personalized experiences.", transfer: "seaplane", isAdultOnly: true, isHoneymoon: true, isUpcoming: true, openingYear: "2025" },
      { name: "Milaidhoo Island Maldives", image: velaaMaldives, description: "Boutique adults-only island with just 50 villas and award-winning Ba'theli restaurant.", transfer: "seaplane", isAdultOnly: true, isHoneymoon: true },
      { name: "Komandoo Island Resort", image: kandimaMaldives, description: "Intimate adults-only resort perfect for couples seeking tranquility and romance.", transfer: "seaplane", isAdultOnly: true, isHoneymoon: true },
      
      // All-Inclusive
      { name: "DusitD2 Feydhoo Resort", image: dusitThani, description: "All-inclusive Thai hospitality with authentic cuisine, Devarana Spa, and excellent value.", transfer: "domestic", isAllInclusive: true, isHoneymoon: true, isUpcoming: true, openingYear: "2025" },
      { name: "Siyam World Maldives", image: siyamWorld, description: "Mega all-inclusive resort with 24 dining options, waterpark, and endless activities.", transfer: "seaplane", isAllInclusive: true, isHoneymoon: true },
      { name: "Olhuveli Beach & Spa Maldives", image: ozenReserve, description: "All-inclusive tropical paradise with excellent house reef and family-friendly atmosphere.", transfer: "speedboat", isAllInclusive: true, isHoneymoon: true },
      { name: "LiLi Beach Resort", image: joyIsland, description: "All-inclusive boutique resort with authentic Maldivian experiences and vibrant house reef.", transfer: "seaplane", isAllInclusive: true, isHoneymoon: true },
      { name: "Sun Siyam Iru Fushi", image: siyamWorld, description: "Premium all-inclusive with 21 restaurants, extensive spa, and family amenities.", transfer: "seaplane", isAllInclusive: true, isHoneymoon: true },
      { name: "Constance Moofushi Maldives", image: constanceBelleMare, description: "Award-winning all-inclusive resort with exceptional diving and pristine beaches.", transfer: "seaplane", isAllInclusive: true, isHoneymoon: true },
      
      // Other Premium Resorts
      { name: "Soneva Fushi", image: soneva, description: "An ultra-luxury barefoot escape on a pristine private island, offering world-class dining, open-air cinemas, and unparalleled natural beauty.", transfer: "seaplane", isHoneymoon: true, isTopLuxury: true },
      { name: "Soneva Jani", image: soneva, description: "Ultra-luxury resort in Noonu Atoll with stunning overwater villas featuring private pools, retractable roofs, and water slides.", transfer: "seaplane", isHoneymoon: true, isTopLuxury: true },
      { name: "The St. Regis Maldives Vommuli Resort", image: stRegisMaldives, description: "Architectural masterpiece with iconic overwater villas, legendary St. Regis Butler Service, and world-class diving.", transfer: "seaplane", isHoneymoon: true },
      { name: "Waldorf Astoria Maldives Ithaafushi", image: waldorfMaldives, description: "Three private islands of uncompromising luxury with 11 dining venues and the largest spa in the Maldives.", transfer: "speedboat", isHoneymoon: true },
      { name: "Anantara Kihavah Maldives Villas", image: anantaraKihavah, description: "Award-winning resort with underwater restaurant, world-class observatory, and exceptional diving.", transfer: "seaplane", isHoneymoon: true },
      { name: "Kandima Maldives", image: kandimaMaldives, description: "Vibrant lifestyle resort offering endless activities, diverse dining, and stunning ocean pool villas.", transfer: "domestic", isHoneymoon: true },
      { name: "W Maldives", image: wMaldives, description: "Vibrant luxury with underwater restaurant, stellar house reef, and signature W energy.", transfer: "seaplane", isHoneymoon: true },
      { name: "NIYAMA Private Islands Maldives", image: niyama, description: "Two islands of bold design with underwater nightclub and world-class surfing.", transfer: "seaplane", isHoneymoon: true },
      { name: "Vakkaru Maldives", image: vakkaru, description: "Classic Maldivian luxury with exceptional diving, family-friendly amenities, and romantic villas.", transfer: "seaplane", isHoneymoon: true },
      { name: "Hard Rock Hotel Maldives", image: hardRock, description: "Rock star luxury with music-themed experiences, underwater restaurant, and vibrant nightlife.", transfer: "speedboat", isHoneymoon: true },
      { name: "Fairmont Maldives Sirru Fen Fushi", image: fairmont, description: "Artistic sanctuary with underwater sculpture museum and world-class spa.", transfer: "seaplane", isHoneymoon: true },
      { name: "JW Marriott Maldives Resort & Spa", image: jwMarriott, description: "Contemporary luxury with overwater villas, JW Spa, and exceptional culinary experiences.", transfer: "seaplane", isHoneymoon: true },
      { name: "Hilton Maldives Amingiri Resort & Spa", image: hiltonAmingiri, description: "Modern design with spectacular sunset views and only 20 minutes from Male.", transfer: "speedboat", isHoneymoon: true },
      { name: "OZEN Reserve Bolifushi", image: ozenReserve, description: "Ultra-all-inclusive sanctuary with underwater restaurant and personalized butler service.", transfer: "speedboat", isHoneymoon: true },
      { name: "Joy Island Maldives", image: joyIsland, description: "Boutique island escape with authentic Maldivian charm and exceptional house reef.", transfer: "speedboat", isHoneymoon: true },
      { name: "Bandos Maldives", image: standardMaldives, description: "Iconic Maldivian resort just 15 minutes from Male with excellent diving, water sports, and family-friendly atmosphere.", transfer: "speedboat", isHoneymoon: true },
      { name: "Angsana Velavaru", image: anantaraKihavah, description: "Vibrant resort with colorful design, InOcean villas suspended above the lagoon, and excellent snorkeling.", transfer: "domestic", isHoneymoon: true },
      { name: "Banyan Tree Vabbinfaru", image: velaaMaldives, description: "Intimate sanctuary with exceptional spa, marine conservation programs, and romantic beachfront villas.", transfer: "speedboat", isHoneymoon: true, isTopLuxury: true },
      { name: "Hideaway Beach Resort & Spa", image: velaaMaldives, description: "Exclusive luxury resort with expansive villas, world-class dining, and pristine house reef.", transfer: "seaplane", isHoneymoon: true, isTopLuxury: true },
      { name: "JA Manafaru", image: patinaMaldives, description: "Secluded northern atoll escape with spacious villas, seven restaurants, and exceptional diving experiences.", transfer: "seaplane", isHoneymoon: true, isTopLuxury: true },
      { name: "Amilla Maldives Resort", image: ritzCarltonMaldives, description: "Contemporary island paradise with stunning overwater and treetop residences, wellness focus, and private island exclusivity.", transfer: "seaplane", isHoneymoon: true, isTopLuxury: true },
      { name: "Baros Maldives", image: chevalBlanc, description: "Legendary boutique resort with timeless elegance, award-winning dining, and romantic overwater villas since 1973.", transfer: "speedboat", isHoneymoon: true, isTopLuxury: true },
      { name: "Emerald Maldives Resort & Spa", image: patinaMaldives, description: "All-inclusive Deluxe concept with premium inclusions, stunning lagoon setting, and Maldivian-inspired architecture.", transfer: "seaplane", isAllInclusive: true, isHoneymoon: true },
      
      // Nora's Personal Partner Resorts
      { name: "Kuramathi Island Resort", image: kandimaMaldives, description: "One of the largest islands in Maldives with diverse villa options, three distinct villages, and exceptional house reef for snorkeling.", transfer: "seaplane", isNoraPick: true, isHoneymoon: true, isAllInclusive: true },
      { name: "Velassaru Maldives", image: standardMaldives, description: "Tranquil paradise for the young at heart with shimmering blue lagoons, modern romance, and effortlessly sophisticated island living.", transfer: "speedboat", isNoraPick: true, isHoneymoon: true },
      { name: "Huvafen Fushi", image: velaaMaldives, description: "World's first underwater spa retreat where dreams become days, featuring private bungalows with freshwater pools and exclusive wine cellar.", transfer: "speedboat", isNoraPick: true, isTopLuxury: true, isHoneymoon: true },
      { name: "Villa Nautica Paradise Island", image: ritzCarltonMaldives, description: "Luxurious 5-star resort with overwater and beachfront villas, infinity pool, and personalized services just minutes from Male.", transfer: "speedboat", isNoraPick: true, isAllInclusive: true, isHoneymoon: true },
      { name: "Kurumba Maldives", image: wMaldives, description: "Historic landmark and first resort in Maldives since 1972, just 10 minutes from airport with award-winning dining and endless activities.", transfer: "speedboat", isNoraPick: true, isHoneymoon: true },
      { name: "Constance Moofushi Maldives", image: constanceBelleMare, description: "Award-winning all-inclusive resort in pristine South Ari Atoll with exceptional diving, world-class service, and barefoot luxury.", transfer: "seaplane", isNoraPick: true, isAllInclusive: true, isHoneymoon: true },
      { name: "Oaga Art Resort", image: oagaArt, description: "Authentic Maldivian art-inspired retreat in North Malé Atoll with vibrant cultural experiences, all-inclusive dining, and personalized hospitality.", transfer: "speedboat", isAllInclusive: true, isHoneymoon: true },
      { name: "Kudadoo Maldives Private Island", image: velaaMaldives, description: "Ultra-luxury all-inclusive private island with only 15 residences, unlimited spa, and personalized butler service.", transfer: "seaplane", isTopLuxury: true, isAllInclusive: true, isHoneymoon: true, isAdultOnly: true },
      { name: "Hurawalhi Island Resort", image: joaliMaldives, description: "Adults-only paradise featuring the world's largest underwater restaurant 5.8, exceptional house reef, and contemporary overwater villas.", transfer: "seaplane", isAdultOnly: true, isAllInclusive: true, isHoneymoon: true },
      { name: "Jawakara Islands Maldives", image: patinaMaldives, description: "All-inclusive boutique resort with authentic Maldivian hospitality, intimate island setting, and exceptional value.", transfer: "seaplane", isAllInclusive: true, isHoneymoon: true },
      { name: "Kagi Maldives Spa Island", image: anantaraKihavah, description: "Wellness-focused sanctuary in North Malé Atoll with holistic spa journeys, healthy cuisine, and tranquil overwater villas.", transfer: "speedboat", isHoneymoon: true, isNoraPick: true },
      { name: "Reethi Beach Resort", image: fairmont, description: "Eco-friendly island paradise in Baa Atoll UNESCO Biosphere Reserve with excellent diving, vibrant house reef, and authentic Maldivian charm.", transfer: "seaplane", isHoneymoon: true },
      
      // New Openings 2024 (Reopened/Opened)
      { name: "Veligandu Maldives Resort Island", image: wMaldives, description: "Iconic adults-only resort reopened Nov 2024 after extensive renovation with stunning water villas and pristine house reef.", transfer: "seaplane", isUpcoming: true, openingYear: "2024", isHoneymoon: true, isAdultOnly: true },
      { name: "Centara Mirage Lagoon Maldives", image: siyamWorld, description: "Family-focused 'Mirage' concept resort opened Nov 2024 with waterpark, kids club, and Thai hospitality.", transfer: "speedboat", isUpcoming: true, openingYear: "2024", isHoneymoon: true },
      { name: "Soneva Secret", image: soneva, description: "Ultra-bespoke hideaway with very limited villas, welcomed first guests early 2024.", transfer: "seaplane", isUpcoming: true, openingYear: "2024", isTopLuxury: true, isHoneymoon: true },
      
      // New Openings 2025
      { name: "Nala Maldives by Jawakara", image: joaliMaldives, description: "Exclusive adults-focused boutique resort in Lhaviyani Atoll, opened Dec 2025 (12+ guests).", transfer: "seaplane", isAdultOnly: true, isHoneymoon: true, isUpcoming: true, openingYear: "2025" },
      { name: "Meyyafushi Maldives", image: standardMaldives, description: "New luxury resort in Lhaviyani Atoll with soft opening Oct 2025 and grand opening Dec 2025.", transfer: "seaplane", isUpcoming: true, openingYear: "2025", isHoneymoon: true },
      { name: "dusitD2 Feydhoo Maldives", image: dusitThani, description: "All-inclusive lifestyle concept near Velana airport, opened Jul 2025 with very short speedboat transfer.", transfer: "speedboat", isAllInclusive: true, isHoneymoon: true, isUpcoming: true, openingYear: "2025" },
      { name: "Ananea Madivaru Maldives", image: velaaMaldives, description: "Contemporary luxury in North Ari Atoll, commenced operations Apr 2025 with exceptional marine life.", transfer: "seaplane", isUpcoming: true, openingYear: "2025", isHoneymoon: true },
      { name: "Centara Grand Lagoon Maldives", image: ozenReserve, description: "Grand resort in The Atollia (North Malé Atoll area) opened Apr 2025 with extensive facilities and Thai hospitality.", transfer: "speedboat", isUpcoming: true, openingYear: "2025", isHoneymoon: true },
      { name: "JW Marriott Maldives Kaafu Atoll Island Resort", image: jwMarriott, description: "Elegant JW Marriott property opened Jan 2025 with speedboat access from Velana and signature wellness.", transfer: "speedboat", isUpcoming: true, openingYear: "2025", isHoneymoon: true },
      
      // Upcoming 2026
      { name: "Meliá Whale Lagoon Maldives", image: niyama, description: "Spanish hospitality in South Ari Atoll opening Jan 2026, reached via ~30-minute seaplane transfer from Velana Airport.", transfer: "seaplane", isUpcoming: true, openingYear: "2026", isHoneymoon: true },
      { name: "Rah Gili Maldives", image: northIsland, description: "Exclusive new development debuting Feb 2026 with short speedboat transfer from Velana Airport.", transfer: "speedboat", isUpcoming: true, openingYear: "2026", isTopLuxury: true, isHoneymoon: true },
      { name: "Don Maaga Maldives", image: velaaMaldives, description: "Six & Six Private Islands development with exceptional privacy and service.", transfer: "seaplane", isUpcoming: true, openingYear: "2026", isTopLuxury: true, isHoneymoon: true },
      { name: "Bvlgari Resort Ranfushi", image: chevalBlanc, description: "Italian luxury brand's Maldives debut in Raa Atoll with signature elegance.", transfer: "seaplane", isUpcoming: true, openingYear: "2026", isTopLuxury: true, isHoneymoon: true },
      { name: "Mondrian Maldives", image: wMaldives, description: "Design-forward new resort in Noonu Atoll with Mondrian's signature style.", transfer: "seaplane", isUpcoming: true, openingYear: "2026", isHoneymoon: true },
      
      // Robinson Hotels
      { name: "Robinson Club Maldives", image: siyamWorld, description: "Adults-only (18+) premium all-inclusive resort with WellFit spa, extensive sports, and vibrant entertainment in Gaafu Alifu Atoll.", transfer: "domestic", isAdultOnly: true, isAllInclusive: true, isHoneymoon: true },
      
      // New Top Luxury Additions
      { name: "The Nautilus Maldives", image: nautilusMaldives, description: "Ultra-exclusive bohemian hideaway with only 26 houses, completely bespoke experiences, and no menus, schedules, or rules.", transfer: "seaplane", isTopLuxury: true, isHoneymoon: true },
      { name: "The St. Regis Maldives Vommuli Resort", image: nautilusMaldives, description: "Architectural masterpiece with iconic overwater villas, legendary St. Regis Butler Service, and world-class diving in Dhaalu Atoll.", transfer: "seaplane", isTopLuxury: true, isHoneymoon: true },
      { name: "Fushifaru Maldives", image: fushifaruMaldives, description: "Boutique island sanctuary in Lhaviyani Atoll with barefoot luxury, exceptional house reef, and personalized authentic Maldivian experiences.", transfer: "seaplane", isHoneymoon: true, isNoraPick: true },
      { name: "Ayada Maldives", image: ayadaMaldives, description: "Turkish-inspired luxury in remote Gaafu Dhaalu Atoll with stunning ocean villas, world-class spa, and pristine diving experiences.", transfer: "domestic", isTopLuxury: true, isHoneymoon: true },
      { name: "Amari Havodda Maldives", image: amariHavodda, description: "Contemporary luxury in Gaafu Dhaalu Atoll with pristine beaches, exceptional diving, and authentic Maldivian hospitality.", transfer: "domestic", isHoneymoon: true },
      { name: "Finolhu Baa Atoll Maldives", image: finolhuMaldives, description: "Playful retro-chic island resort in UNESCO Biosphere with iconic beach club, vibrant atmosphere, and spectacular sunsets.", transfer: "seaplane", isHoneymoon: true, isNoraPick: true },
      { name: "Varu by Atmosphere", image: varuAtmosphere, description: "Premium all-inclusive resort in Malé Atoll with overwater villas, exceptional dining, and personalized butler service.", transfer: "speedboat", isAllInclusive: true, isHoneymoon: true },
      { name: "Sun Siyam Iru Veli", image: sunSiyamIruVeli, description: "Stylish island retreat in Dhaalu Atoll with overwater villas, multiple dining venues, and world-class spa experiences.", transfer: "seaplane", isHoneymoon: true },
      { name: "Alila Kothaifaru Maldives", image: alilaMaldives, description: "Modern wellness sanctuary in Raa Atoll with sustainable luxury, holistic spa, and stunning architectural design.", transfer: "seaplane", isHoneymoon: true, isTopLuxury: true },
      { name: "JA Manafaru", image: jaManafaru, description: "Secluded northern atoll escape with spacious villas, seven dining venues, and exceptional diving experiences.", transfer: "seaplane", isHoneymoon: true, isTopLuxury: true },
      { name: "Furaveri Maldives", image: furaveriMaldives, description: "Authentic Maldivian island in Raa Atoll with overwater villas, vibrant house reef, and warm island hospitality.", transfer: "seaplane", isHoneymoon: true },
      { name: "Baglioni Resort Maldives", image: baglioniMaldives, description: "Italian elegance in Dhaalu Atoll featuring refined overwater and beach villas, authentic Italian cuisine, and exclusive spa experiences.", transfer: "seaplane", isTopLuxury: true, isHoneymoon: true },
      { name: "The Residence Maldives at Falhumaafushi", image: residenceMaldives, description: "Luxurious beachfront resort in Gaafu Alifu Atoll with spacious villas, personalized butler service, and exceptional diving.", transfer: "domestic", isTopLuxury: true, isHoneymoon: true },

      // Club Med
      { name: "Club Med Kani", image: clubmedKani, description: "Premium all-inclusive resort in North Malé Atoll with stunning water villas, world-class diving, and signature Club Med hospitality.", transfer: "speedboat", isAllInclusive: true, isHoneymoon: true },
      { name: "Club Med Finolhu Villas", image: clubmedFinolhu, description: "Exclusive Eco Chic all-inclusive villas in Baa Atoll UNESCO Biosphere with personalized service and adults-only serenity.", transfer: "seaplane", isAllInclusive: true, isHoneymoon: true, isAdultOnly: true, isTopLuxury: true },
    ]
  },
  {
    name: "Seychelles",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "North Island", image: northIsland, description: "Ultra-exclusive private island sanctuary where royalty and celebrities find ultimate privacy and natural beauty.", seychellesArea: "private-island", isTopLuxury: true, isHoneymoon: true },
      { name: "Four Seasons Resort Seychelles", image: fourSeasonsSeychelles, description: "Hillside and oceanfront villas on Mahé with spectacular views and private plunge pools.", seychellesArea: "mahe", isTopLuxury: true, isHoneymoon: true },
      { name: "Six Senses Zil Pasyon", image: sixSensesSeychelles, description: "Private island wellness retreat on Félicité with holistic spa and sustainable luxury philosophy.", seychellesArea: "felicite", isTopLuxury: true, isHoneymoon: true },
      { name: "Raffles Seychelles", image: rafflesSeychelles, description: "Elegant hillside villas on Praslin overlooking pristine beaches with legendary Raffles hospitality.", seychellesArea: "praslin", isTopLuxury: true, isHoneymoon: true },
      { name: "Constance Ephelia", image: constanceEphelia, description: "Sprawling beachfront resort on two stunning beaches with extensive family amenities and spa village.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Mango House Seychelles", image: mangoHouse, description: "LXR Hotels & Resorts collection boutique property with intimate luxury on Mahé's southern coast.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Anantara Maia Seychelles Villas", image: anantaraMaia, description: "All-villa resort with dedicated butlers, oceanfront dining, and exceptional privacy.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Hilton Seychelles Northolme Resort & Spa", image: hiltonNortholme, description: "Historic luxury resort perched on a hillside overlooking Beau Vallon with stunning sunset views.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Waldorf Astoria Seychelles Platte Island", image: astoriaSeychelles, description: "Remote private island sanctuary with legendary Waldorf service and pristine natural beauty.", seychellesArea: "private-island", isTopLuxury: true, isHoneymoon: true },
      { name: "Kempinski Seychelles Resort Baie Lazare", image: kempinskiSeychelles, description: "Grand European elegance on Mahé's pristine Baie Lazare beach with extensive spa, lush tropical gardens, and authentic Seychellois hospitality.", seychellesArea: "mahe", isHoneymoon: true, isTopLuxury: true },
      { name: "Hilton Seychelles Labriz Resort & Spa", image: hiltonCanopySeychelles, description: "Secluded paradise on Silhouette Island within a national marine park, featuring the largest spa in Seychelles and pristine natural surroundings.", seychellesArea: "silhouette", isHoneymoon: true },
      { name: "Savoy Seychelles Resort & Spa", image: sixSensesSeychelles, description: "Contemporary beachfront resort on Beau Vallon with stylish rooms, infinity pool, and vibrant dining scene.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Coral Strand Smart Choice Hotel", image: constanceEphelia, description: "Popular mid-range choice on Beau Vallon Beach offering excellent value with pool, spa, and water sports.", seychellesArea: "mahe", isHoneymoon: false },
      { name: "STORY Seychelles", image: mangoHouse, description: "Boutique luxury retreat on Mahé's southern coast with personalized service and intimate beach setting.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "DoubleTree by Hilton Seychelles Allamanda Resort & Spa", image: hiltonNortholme, description: "Charming beachfront resort on Anse Forbans with excellent snorkeling and warm Hilton hospitality.", seychellesArea: "mahe", isHoneymoon: true },
      
      // Additional Luxury 5-Star Resorts
      { name: "Le Domaine de L'Orangeraie", image: domaineOrangeraieSeychelles, description: "Award-winning boutique resort on La Digue with stunning hillside villas, panoramic ocean views, and authentic Creole charm.", seychellesArea: "la-digue", isTopLuxury: true, isHoneymoon: true },
      { name: "Constance Lemuria", image: rafflesSeychelles, description: "Grand beachfront resort on Praslin with 18-hole championship golf course, three pristine beaches, and exceptional dining.", seychellesArea: "praslin", isTopLuxury: true, isHoneymoon: true },
      { name: "Banyan Tree Seychelles", image: anantaraMaia, description: "Intimate hillside sanctuary on Mahé with private pool villas, award-winning spa, and panoramic Intendance Bay views.", seychellesArea: "mahe", isTopLuxury: true, isHoneymoon: true },
      { name: "JA Enchanted Island Resort", image: northIsland, description: "Exclusive private island sanctuary with only 10 villas in St. Anne Marine National Park, all-inclusive luxury.", seychellesArea: "private-island", isTopLuxury: true, isHoneymoon: true, isAllInclusive: true },
      { name: "Fregate Island Private", image: northIsland, description: "Ultra-exclusive private island with only 16 residences, giant tortoises, and pristine nature sanctuary.", seychellesArea: "private-island", isTopLuxury: true, isHoneymoon: true },
      { name: "Denis Private Island", image: sixSensesSeychelles, description: "Remote coral island retreat with sustainable luxury, barefoot elegance, and exceptional fishing and diving.", seychellesArea: "private-island", isTopLuxury: true, isHoneymoon: true },
      { name: "The H Resort Beau Vallon Beach", image: hiltonNortholme, description: "Contemporary beachfront luxury on Beau Vallon with spacious suites, infinity pool, and vibrant atmosphere.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "AVANI Seychelles Barbarons Resort & Spa", image: constanceEphelia, description: "Family-friendly beachfront resort on Barbarons Beach with stunning sunset views and tropical gardens.", seychellesArea: "mahe", isHoneymoon: true },
      
      // Additional Hotels
      { name: "DoubleTree by Hilton Seychelles Allamanda Resort & Spa", image: doubletreeSeychelles, description: "Charming beachfront resort on Anse Forbans with excellent snorkeling, pool, and warm Hilton hospitality.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Hilton Seychelles Labriz Resort & Spa", image: hiltonCanopySeychelles, description: "Secluded paradise on Silhouette Island within a national marine park, featuring the largest spa in Seychelles.", seychellesArea: "silhouette", isHoneymoon: true },
      { name: "Laila Seychelles", image: lailaSeychelles, description: "Boutique luxury retreat with stunning beachfront villas, granite boulder setting, and intimate Creole charm.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Crown Beach Hotel", image: crownBeachSeychelles, description: "Elegant beachfront hotel on Praslin with stunning views of Côte d'Or beach and warm Seychellois hospitality.", seychellesArea: "praslin", isHoneymoon: true },
      { name: "Bliss Hotel Mahé", image: blissMahe, description: "Contemporary boutique hotel on Mahé with tropical gardens, infinity pool, and personalized island experiences.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Bliss Hotel Praslin", image: blissPraslin, description: "Stylish boutique property on Praslin with lush gardens, ocean views, and easy access to pristine beaches.", seychellesArea: "praslin", isHoneymoon: true },
      { name: "Le Duc de Praslin", image: leDucSeychelles, description: "Colonial-style luxury hotel on Praslin with elegant suites, tropical gardens, and refined Creole dining.", seychellesArea: "praslin", isHoneymoon: true },
      { name: "Eden Bleu Hotel", image: edenBleuSeychelles, description: "Luxury marina hotel on Eden Island with yacht club access, waterfront dining, and sophisticated island living.", seychellesArea: "mahe", isHoneymoon: true },
      { name: "Les Lauriers Eco Hotel", image: lesLauriersSeychelles, description: "Eco-friendly boutique hotel on Praslin with traditional Creole architecture, lush gardens, and sustainable luxury.", seychellesArea: "praslin", isHoneymoon: true },
      
      // Club Med
      { name: "Club Med Seychelles", image: clubmedSeychelles, description: "Premium all-inclusive eco-resort on Sainte Anne Island with pristine marine park, water sports, and authentic Creole experiences.", seychellesArea: "private-island", isAllInclusive: true, isHoneymoon: true },
    ]
  },
  {
    name: "Mauritius",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "One&Only Le Saint Géran", image: oneOnlyMauritius, description: "Legendary beachfront resort on its own peninsula with championship golf and Givenchy spa.", isTopLuxury: true, isHoneymoon: true },
      { name: "The St. Regis Mauritius Resort", image: stRegisMauritius, description: "Colonial elegance meets contemporary luxury on Le Morne peninsula with exceptional butler service.", isHoneymoon: true },
      { name: "Four Seasons Resort Mauritius at Anahita", image: fourSeasonsMauritius, description: "Spacious villas with private pools on a pristine lagoon with Ernie Els signature golf course.", isTopLuxury: true, isHoneymoon: true },
      { name: "Shangri-La Le Touessrok, Mauritius", image: shangrila, description: "Iconic resort on Trou d'Eau Douce bay with two private island retreats and championship golf.", isHoneymoon: true },
      { name: "The Oberoi Mauritius", image: oberoiMauritius, description: "Intimate luxury resort in Turtle Bay with exceptional service and tranquil gardens.", isHoneymoon: true },
      { name: "Constance Prince Maurice", image: constancePrince, description: "Architectural marvel on stilts with floating restaurant and world-class spa sanctuary.", isHoneymoon: true },
      { name: "LUX* Belle Mare", image: luxBelleMare, description: "Vibrant beachfront resort with playful luxury, exceptional cuisine, and stunning beach.", isHoneymoon: true },
      { name: "Constance Belle Mare Plage", image: constanceBelleMare, description: "Two kilometers of pristine beach with two championship golf courses and gourmet dining.", isHoneymoon: true },
      { name: "C Mauritius", image: cMauritius, description: "Contemporary lifestyle resort on Palmar Beach with all-inclusive concept, vibrant atmosphere, and modern Mauritian hospitality.", isAllInclusive: true, isHoneymoon: true },
      { name: "LUX* Grand Baie", image: luxGrandBaie, description: "Contemporary beachfront resort in Grand Baie featuring modern design, rooftop terrace, exceptional dining, and vibrant northern Mauritius energy.", isTopLuxury: true, isHoneymoon: true },
      
      // Club Med
      { name: "Club Med La Pointe aux Canonniers", image: clubmedMauritiusPointe, description: "All-inclusive tropical paradise in Grand Baie with water sports, kids clubs, and vibrant nightlife on the northern coast.", isAllInclusive: true, isHoneymoon: true },
      { name: "Club Med Albion Villas", image: clubmedMauritiusAlbion, description: "Exclusive 5-Trident Zen villa resort with private pools, dedicated concierge, and premium all-inclusive luxury on Mauritius' west coast.", isAllInclusive: true, isHoneymoon: true, isTopLuxury: true },
    ]
  },
  {
    name: "Greece",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      // Santorini
      { name: "Canaves Oia Epitome", image: santoriniHero, description: "Ultra-luxury cave suites perched on Santorini's caldera with private infinity pools and sunset views.", greeceIsland: "santorini", isHoneymoon: true, isTopLuxury: true },
      { name: "Cavo Tagoo Santorini", image: santoriniHero, description: "Iconic design hotel in Imerovigli with signature cave pool, caldera views, and sophisticated island luxury.", greeceIsland: "santorini", isHoneymoon: true, isTopLuxury: true, isNoraPick: true },
      { name: "Athermi Suites", image: santoriniHero, description: "Boutique luxury suites in Fira with stunning caldera views, private jacuzzis, and authentic Santorinian hospitality.", greeceIsland: "santorini", isHoneymoon: true },
      { name: "Grace Hotel Santorini", image: mykonosHero, description: "Intimate boutique hotel in Imerovigli with stunning champagne lounge and caldera panoramas.", greeceIsland: "santorini", isHoneymoon: true, isTopLuxury: true },
      { name: "Mystique, a Luxury Collection Hotel", image: greeceAthens, description: "Cave hotel carved into Oia's cliffs with infinity pools overlooking the volcano.", greeceIsland: "santorini", isHoneymoon: true, isTopLuxury: true },
      { name: "Andronis Arcadia", image: greeceCrete, description: "Contemporary wellness retreat in Oia with rooftop pool and holistic spa experiences.", greeceIsland: "santorini", isHoneymoon: true },
      { name: "Katikies Santorini", image: santoriniHero, description: "Iconic white-washed suites cascading down the caldera with legendary Greek hospitality.", greeceIsland: "santorini", isHoneymoon: true, isTopLuxury: true },
      { name: "Santo Maris Oia Luxury Suites & Spa", image: mykonosHero, description: "Cycladic architecture meets contemporary luxury with expansive spa and gourmet dining.", greeceIsland: "santorini", isHoneymoon: true },
      { name: "Astra Suites", image: santoriniHero, description: "Award-winning boutique hotel in Imerovigli with romantic suites, infinity pool, and legendary breakfast.", greeceIsland: "santorini", isHoneymoon: true },
      { name: "Cosmopolitan Suites", image: mykonosHero, description: "Intimate luxury retreat in Fira with personalized service, caldera views, and elegant Cycladic design.", greeceIsland: "santorini", isHoneymoon: true },
      // Mykonos
      { name: "Cavo Tagoo Mykonos", image: mykonosHero, description: "Iconic luxury hotel carved into the hillside with famous cave pool, sea views, and vibrant Mykonian energy.", greeceIsland: "mykonos", isHoneymoon: true, isTopLuxury: true, isNoraPick: true },
      { name: "Kalesma Mykonos", image: mykonosHero, description: "Contemporary Cycladic sanctuary perched above Ornos Bay with infinity pool and farm-to-table dining.", greeceIsland: "mykonos", isHoneymoon: true, isTopLuxury: true },
      { name: "Myconian Utopia Resort", image: mykonosHero, description: "Adults-only clifftop retreat in Elia Beach with thalasso spa and stunning Aegean panoramas.", greeceIsland: "mykonos", isHoneymoon: true, isAdultOnly: true },
      { name: "Santa Marina, a Luxury Collection Resort", image: mykonosHero, description: "Private peninsula resort with exclusive beach, Buddha-Bar Beach, and Cycladic elegance.", greeceIsland: "mykonos", isHoneymoon: true, isTopLuxury: true },
      { name: "Belvedere Hotel Mykonos", image: mykonosHero, description: "Legendary boutique hotel in Mykonos Town with Matsuhisa restaurant and bohemian luxury.", greeceIsland: "mykonos", isHoneymoon: true },
      { name: "Bill & Coo Suites and Lounge", image: mykonosHero, description: "Award-winning adults-only hideaway with minimalist suites, gourmet dining, and Little Venice views.", greeceIsland: "mykonos", isHoneymoon: true, isAdultOnly: true, isTopLuxury: true },
      // Athens
      { name: "Hotel Grande Bretagne", image: greeceAthens, description: "Legendary landmark on Syntagma Square with Acropolis views, historic grandeur, and rooftop dining.", greeceIsland: "athens", isHoneymoon: true, isTopLuxury: true },
      { name: "Four Seasons Astir Palace Hotel Athens", image: greeceAthens, description: "Prestigious coastal resort on Athens Riviera with three private beaches and Mediterranean elegance.", greeceIsland: "athens", isHoneymoon: true, isTopLuxury: true },
      { name: "King George, a Luxury Collection Hotel", image: greeceAthens, description: "Intimate luxury in the heart of Athens with Tudor Hall restaurant and Acropolis panoramas.", greeceIsland: "athens", isHoneymoon: true },
      { name: "The Margi Hotel", image: greeceAthens, description: "Boutique retreat in Vouliagmeni with beach club access, spa, and sophisticated coastal living.", greeceIsland: "athens", isHoneymoon: true },
      { name: "One&Only Aesthesis Athens Riviera", image: greeceAthens, description: "Ultra-luxury coastal sanctuary blending contemporary design with Greek heritage on the Athens Riviera.", greeceIsland: "athens", isHoneymoon: true, isTopLuxury: true, isUpcoming: true, openingYear: "2024" },
      // Crete
      { name: "Blue Palace Elounda", image: greeceCrete, description: "Sprawling luxury resort on Crete's coast with private beach, spa, and stunning views of Spinalonga.", greeceIsland: "crete", isHoneymoon: true, isTopLuxury: true },
      { name: "Daios Cove Luxury Resort", image: greeceCrete, description: "Cliffside retreat with private beach, infinity pools, and panoramic Aegean Sea views.", greeceIsland: "crete", isHoneymoon: true, isTopLuxury: true },
      { name: "Amirandes Grecotel Exclusive Resort", image: greeceCrete, description: "Palatial resort with lagoon pools, private beach, and Cretan hospitality at its finest.", greeceIsland: "crete", isHoneymoon: true },
      { name: "Elounda Beach Hotel & Villas", image: eloundaBeachHotel, description: "Legendary Cretan resort on Mirabello Bay with private sandy beach, award-winning spa, and elegant suites overlooking the Gulf of Elounda.", greeceIsland: "crete", isHoneymoon: true, isTopLuxury: true },
      { name: "Elounda Bay Palace", image: eloundaBayPalace, description: "Five-star beachfront palace on Elounda's stunning coastline with panoramic sea views, world-class dining, and luxurious suites with private pools.", greeceIsland: "crete", isHoneymoon: true, isTopLuxury: true },
      { name: "Domes of Elounda", image: domesOfElounda, description: "Autograph Collection resort with avant-garde design, private beach, and Cretan wellness experiences on Elounda's peninsula.", greeceIsland: "crete", isHoneymoon: true, isTopLuxury: true },
      { name: "Royal Blue Resort", image: royalBlueResort, description: "Panormos Bay hideaway with contemporary luxury suites, infinity pools, and exceptional Mediterranean cuisine.", greeceIsland: "crete", isHoneymoon: true, isTopLuxury: true },
      { name: "Abaton Island Resort & Spa", image: abatonIslandResort, description: "Stylish adults-only retreat in Hersonissos with serene beach, indulgent spa, and refined Greek hospitality.", greeceIsland: "crete", isHoneymoon: true, isTopLuxury: true },
      
      // Club Med
      { name: "Club Med Gregolimano", image: clubmedGregolimano, description: "Premium all-inclusive resort on Evia Island with sailing school, water sports, and stunning Aegean Sea setting.", greeceIsland: "athens", isAllInclusive: true, isHoneymoon: true },
    ]
  },
  {
    name: "London",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "The Ritz London", image: londonHero, description: "Legendary Piccadilly landmark offering timeless elegance, afternoon tea, and royal-approved luxury.", isHoneymoon: true },
      { name: "Claridge's", image: londonLuxury, description: "Art Deco masterpiece in Mayfair, beloved by royalty and celebrities for over a century.", isHoneymoon: true },
      { name: "The Savoy", image: londonHero, description: "Iconic Thames-side hotel blending Edwardian and Art Deco grandeur with theatrical flair.", isHoneymoon: true },
      { name: "The Connaught", image: londonLuxury, description: "Mayfair's most distinguished address with Michelin-starred Hélène Darroze restaurant.", isHoneymoon: true },
      { name: "Rosewood London", image: londonHero, description: "Edwardian splendor in High Holborn with stunning courtyard and world-class Sense spa.", isHoneymoon: true },
      { name: "The Lanesborough", image: londonLuxury, description: "Regency grandeur overlooking Hyde Park with 24-hour butler service and Michelin-starred dining.", isHoneymoon: true },
      { name: "Four Seasons Hotel London at Ten Trinity Square", image: londonHero, description: "Historic landmark near the Tower of London with La Dame de Pic and exclusive members' club.", isHoneymoon: true },
      { name: "Bulgari Hotel London", image: londonLuxury, description: "Italian glamour in Knightsbridge with stunning spa, cinema, and exclusive boutique.", isHoneymoon: true },
    ]
  },
  {
    name: "Dubai",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "Burj Al Arab Jumeirah", image: dubaiLuxury, description: "The world's most iconic luxury hotel, offering unparalleled opulence and legendary Arabian hospitality.", isTopLuxury: true, isHoneymoon: true },
      { name: "Atlantis The Royal", image: dubaiLuxury, description: "Ultra-luxury beachfront resort with celebrity restaurants, Aquaventure, and stunning architecture.", isTopLuxury: true, isHoneymoon: true },
      { name: "One&Only The Palm", image: dubaiLuxury, description: "Intimate Arabian-inspired sanctuary on Palm Jumeirah with pristine private beach.", isTopLuxury: true, isHoneymoon: true },
      { name: "Four Seasons Resort Dubai at Jumeirah Beach", image: dubaiLuxury, description: "Beachfront Mediterranean-inspired resort with exceptional dining and world-class spa.", isHoneymoon: true },
      { name: "Armani Hotel Dubai", image: dubaiLuxury, description: "Giorgio Armani's design vision in the iconic Burj Khalifa with minimalist Italian luxury.", isHoneymoon: true },
      { name: "Jumeirah Al Naseem", image: dubaiLuxury, description: "Contemporary beachfront luxury with turtle rehabilitation sanctuary and Burj Al Arab views.", isHoneymoon: true },
      { name: "Waldorf Astoria Dubai Palm Jumeirah", image: dubaiLuxury, description: "Art Deco elegance on Palm Jumeirah with private beach and legendary Waldorf service.", isHoneymoon: true },
      { name: "Raffles Dubai", image: dubaiLuxury, description: "Egyptian-inspired pyramid landmark with legendary butler service and rooftop garden.", isHoneymoon: true },
      { name: "Jumeirah Zabeel Saray", image: dubaiLuxury, description: "Ottoman-inspired palace on Palm Jumeirah with award-winning Talise Ottoman Spa and private beach.", isHoneymoon: true, isTopLuxury: true },
      { name: "Palazzo Versace Dubai", image: dubaiLuxury, description: "Italian fashion house elegance with stunning lagoon views, haute couture interiors, and Mediterranean dining.", isHoneymoon: true, isTopLuxury: true },
      { name: "The Ritz-Carlton Dubai", image: dubaiLuxury, description: "Beachfront Mediterranean palace in JBR with legendary service, spa, and pristine private beach.", isHoneymoon: true },
      { name: "Mandarin Oriental Jumeira, Dubai", image: dubaiLuxury, description: "Contemporary waterfront resort with stunning skyline views, award-winning spa, and exceptional dining.", isHoneymoon: true, isTopLuxury: true },
      { name: "Address Beach Resort", image: dubaiLuxury, description: "Iconic twin towers with the world's highest infinity pool, stunning JBR beachfront location.", isHoneymoon: true },
      { name: "Bvlgari Resort Dubai", image: dubaiLuxury, description: "Italian craftsmanship on Jumeira Bay island with exclusive marina, yacht club, and Mediterranean sophistication.", isTopLuxury: true, isHoneymoon: true },
      { name: "Anantara The Palm Dubai Resort", image: dubaiLuxury, description: "Thai-inspired luxury on Palm Jumeirah with overwater villas, lagoon pools, and Anantara Spa.", isHoneymoon: true },
      { name: "Caesars Palace Dubai", image: dubaiLuxury, description: "Las Vegas glamour meets Arabian hospitality on Bluewaters Island with celebrity dining and entertainment.", isHoneymoon: true },
      { name: "Kempinski Hotel Mall of the Emirates", image: dubaiLuxury, description: "Ski Dubai views, European elegance, and direct mall access with exceptional dining and wellness.", isHoneymoon: true },
      { name: "Sofitel Dubai The Palm", image: dubaiLuxury, description: "Polynesian-inspired beachfront resort on Palm Jumeirah with overwater bungalows and French flair.", isHoneymoon: true },
    ]
  },
  {
    name: "Bali",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "Hanging Gardens of Bali", image: baliResort, description: "Iconic jungle hideaway in Ubud with legendary dual infinity pools overlooking Ayung River gorge, world's best pool views.", isHoneymoon: true, isTopLuxury: true, isNoraPick: true },
      { name: "Four Seasons Resort Bali at Sayan", image: baliResort, description: "Riverside jungle sanctuary with dramatic entrance bridge and world-renowned Sacred River Spa.", isHoneymoon: true, isTopLuxury: true },
      { name: "Aman Villas at Nusa Dua", image: baliResort, description: "Clifftop minimalist villas with sweeping ocean views and legendary Aman service.", isTopLuxury: true, isHoneymoon: true },
      { name: "The Mulia, Mulia Resort & Villas", image: baliResort, description: "Grand beachfront resort with The Mulia Spa, nine restaurants, and pristine white sand beach.", isHoneymoon: true },
      { name: "COMO Shambhala Estate", image: baliResort, description: "Holistic wellness retreat in Ubud's jungle with life-changing health programs.", isHoneymoon: true },
      { name: "Mandapa, a Ritz-Carlton Reserve", image: baliResort, description: "Intimate riverside retreat with rice paddy views, organic farm, and exceptional wellness.", isHoneymoon: true, isTopLuxury: true },
      { name: "Bulgari Resort Bali", image: baliResort, description: "Cliffside Italian elegance in Uluwatu with dramatic ocean views and exclusive beach club.", isTopLuxury: true, isHoneymoon: true },
      { name: "The St. Regis Bali Resort", image: baliResort, description: "Beachfront grandeur in Nusa Dua with largest lagoon pool and St. Regis Butler Service.", isHoneymoon: true },
      { name: "Capella Ubud", image: baliResort, description: "Glamping tents in the rainforest designed by Bill Bensley with theatrical luxury.", isHoneymoon: true, isTopLuxury: true },
      { name: "Samabe Bali Suites & Villas", image: samabeBali, description: "Beachfront all-inclusive luxury in Nusa Dua with clifftop ocean views, unlimited privileges, and personalized e-butler service.", isHoneymoon: true, isAllInclusive: true },
      { name: "Raffles Bali", image: rafflesBali, description: "Legendary Raffles hospitality in Jimbaran Bay with ocean-facing pool villas, world-class dining, and signature butler service.", isTopLuxury: true, isHoneymoon: true },
      
      // Club Med
      { name: "Club Med Bali", image: clubmedBali, description: "Premium all-inclusive resort in Nusa Dua with stunning beach, world-class spa, kids clubs, and authentic Balinese cultural experiences.", isAllInclusive: true, isHoneymoon: true },
    ]
  },
  {
    name: "Phuket",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "Amanpuri", image: amanpuriPhuket, description: "The original Aman resort, offering Thai pavilions on a private peninsula with legendary service, holistic wellness, and Andaman Sea views.", isTopLuxury: true, isHoneymoon: true, isNoraPick: true, hasPoolVilla: true },
      { name: "Trisara", image: trisaraPhuket, description: "Exclusive private pool villas cascading down hillside to pristine beach, with exceptional dining and world-class spa on Phuket's northwest coast.", isTopLuxury: true, isHoneymoon: true, hasPoolVilla: true },
      { name: "Rosewood Phuket", image: rosewoodPhuket, description: "Ultra-luxury beachfront resort on Emerald Bay with pool pavilions, residences, and Sense spa in a pristine natural setting.", isTopLuxury: true, isHoneymoon: true, hasPoolVilla: true },
      { name: "Banyan Tree Phuket", image: banyanTreePhuket, description: "Award-winning all-pool-villa resort on Laguna Beach with legendary Banyan Tree Spa, Thai architecture, and lush tropical gardens.", isHoneymoon: true, hasPoolVilla: true },
      { name: "Keemala", image: keemalaPhuket, description: "Unique rainforest retreat with bird's nest and tree house pool villas, holistic wellness, and organic cuisine above Kamala Beach.", isHoneymoon: true, isTopLuxury: true, hasPoolVilla: true },
      { name: "Anantara Layan Phuket Villas", image: anantaraLayanPhuket, description: "Beachfront pool villas overlooking Layan Beach with Thai-inspired luxury, Anantara Spa, and exceptional dining experiences.", isHoneymoon: true, hasPoolVilla: true },
      { name: "Anantara Mai Khao Phuket Villas", image: anantaraLayanPhuket, description: "Serene pool villa retreat on Phuket's longest beach with lagoon and beachfront villas, Sea.Fire.Salt restaurant, and turtle conservation.", isHoneymoon: true, hasPoolVilla: true },
      { name: "Six Senses Yao Noi", image: phuketHero, description: "Private island eco-luxury near Phuket with panoramic Phang Nga Bay views, sustainable practices, and Six Senses wellness.", isTopLuxury: true, isHoneymoon: true, hasPoolVilla: true },
      { name: "COMO Point Yamu", image: phuketHero, description: "Contemporary design on dramatic cape with COMO Shambhala wellness, Italian dining, and stunning Phang Nga Bay panoramas.", isHoneymoon: true, hasPoolVilla: true },
      { name: "The Naka Phuket", image: phuketHero, description: "Design-forward pool villas on private Naka Beach with infinity pools, contemporary Thai architecture, and secluded luxury.", isHoneymoon: true, hasPoolVilla: true },
      { name: "InterContinental Phuket Resort", image: phuketHero, description: "Contemporary beachfront resort on Kamala Beach with ocean-facing rooms, Club InterContinental, and exceptional dining.", isHoneymoon: true, hasPoolVilla: true },
      { name: "The Surin Phuket", image: phuketHero, description: "Hillside cottages and beach suites on Pansea Beach with legendary service, beachfront dining, and lush tropical setting.", isHoneymoon: true },
      { name: "Diamond Cliff Resort & Spa", image: diamondCliffPhuket, description: "Award-winning clifftop resort overlooking Patong Bay with panoramic ocean views, multiple pools, and legendary Thai hospitality since 1979.", isHoneymoon: true, hasPoolVilla: true },
      { name: "V Villas Phuket", image: vVillasPhuket, description: "Ultra-exclusive boutique retreat with only 19 private pool villas, personalized butler service, and stunning Andaman Sea sunset views.", isTopLuxury: true, isHoneymoon: true, hasPoolVilla: true },
      { name: "Kalima Resort & Spa", image: kalimaPhuket, description: "Contemporary hillside resort above Patong Beach featuring infinity pool with ocean views, Spa by Kalima, and award-winning design.", isHoneymoon: true, hasPoolVilla: true },
      
      // Club Med
      { name: "Club Med Phuket", image: clubmedPhuket, description: "Premium all-inclusive beachfront resort in Kata Beach with Flying Trapeze, water sports, and lush tropical gardens.", isAllInclusive: true, isHoneymoon: true },
    ]
  },
  {
    name: "South Africa - Luxury Safari Lodges",
    icon: <Tent className="w-6 h-6" />,
    hotels: [
      { name: "Singita Sabi Sand", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", description: "Legendary private game reserve with world-class lodges, exceptional Big Five sightings, and conservation leadership.", isTopLuxury: true, isHoneymoon: true },
      { name: "Royal Malewane", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", description: "Colonial elegance in Greater Kruger with Africa House spa and exclusive bush experiences.", isHoneymoon: true },
      { name: "Londolozi Private Game Reserve", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80", description: "Pioneer of luxury safari with five distinct camps and legendary leopard sightings.", isHoneymoon: true },
      { name: "andBeyond Phinda Private Game Reserve", image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80", description: "Seven ecosystems, six lodges, and pioneering community conservation programs.", isHoneymoon: true },
      { name: "Ellerman House", image: londonLuxury, description: "Cape Town's most exclusive boutique hotel with art collection and panoramic ocean views.", isTopLuxury: true, isHoneymoon: true },
      { name: "The Silo Hotel", image: londonLuxury, description: "Architectural marvel atop Zeitz MOCAA with pillowed windows and V&A Waterfront views.", isHoneymoon: true },
      { name: "One&Only Cape Town", image: oneOnlyMauritius, description: "V&A Waterfront luxury with island spa, Nobu restaurant, and Table Mountain backdrop.", isHoneymoon: true },
      { name: "Saxon Hotel, Villas and Spa", image: londonLuxury, description: "Johannesburg's most exclusive hotel where Nelson Mandela completed his autobiography.", isHoneymoon: true },
    ]
  },
  {
    name: "Luxury Cruises",
    icon: <Ship className="w-6 h-6" />,
    hotels: [
      { name: "Regent Seven Seas Cruises", image: cruiseHero, description: "The most inclusive luxury cruise experience with all-suite ships and world-class cuisine.", isHoneymoon: true },
      { name: "Silversea Cruises", image: cruiseHero, description: "Italian elegance at sea with intimate ships, butler service, and expedition voyages.", isHoneymoon: true },
      { name: "Seabourn Cruise Line", image: cruiseHero, description: "Ultra-luxury intimate ships with award-winning cuisine and destination immersion.", isHoneymoon: true },
      { name: "Crystal Cruises", image: cruiseHero, description: "Legendary luxury cruise line known for spacious suites and exceptional service.", isHoneymoon: true },
      { name: "Oceania Cruises", image: cruiseHero, description: "Finest cuisine at sea with destination-focused itineraries and intimate ship atmosphere.", isHoneymoon: true },
      { name: "Viking Ocean Cruises", image: cruiseHero, description: "Scandinavian elegance with cultural enrichment and destination-focused voyages.", isHoneymoon: true },
      { name: "The Ritz-Carlton Yacht Collection", image: cruiseHero, description: "Legendary Ritz-Carlton service at sea with bespoke itineraries and personalized experiences.", isTopLuxury: true, isHoneymoon: true },
      { name: "Explora Journeys", image: cruiseHero, description: "MSC's ultra-luxury brand offering European sophistication and ocean-state-of-mind philosophy.", isHoneymoon: true },
      { name: "Disney Cruise Line", image: disneyCruise, description: "Magical family adventures at sea with legendary Disney entertainment, character experiences, and world-class service.", isHoneymoon: true },
    ]
  },
  {
    name: "Switzerland",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "Hotel Villa Honegg", image: heroImage, description: "Iconic boutique hotel perched above Lake Lucerne with legendary infinity pool, panoramic Alpine views, and intimate luxury.", isTopLuxury: true, isHoneymoon: true, isNoraPick: true },
      { name: "The Chedi Andermatt", image: heroImage, description: "Award-winning alpine destination with 123 rooms and suites, Asia-meets-Alps design, six restaurants, and Europe's largest spa in the Swiss Alps.", isTopLuxury: true, isHoneymoon: true },
      { name: "Badrutt's Palace Hotel St. Moritz", image: heroImage, description: "Legendary grand hotel since 1896, birthplace of winter tourism, with Renaissance tower, Michelin-starred dining, and iconic St. Moritz glamour.", isTopLuxury: true, isHoneymoon: true },
      { name: "The Dolder Grand Zurich", image: heroImage, description: "Historic City Resort combining Belle Époque architecture with contemporary design, featuring 4,000sqm spa, two-Michelin-star restaurant, and stunning lake views.", isTopLuxury: true, isHoneymoon: true },
      { name: "Bürgenstock Resort Lake Lucerne", image: heroImage, description: "Legendary resort reborn with four hotels, Alpine Spa spanning 10,000sqm, Europe's highest outdoor elevator, and breathtaking Lake Lucerne panoramas.", isTopLuxury: true, isHoneymoon: true, isNoraPick: true },
      
      // Club Med
      { name: "Club Med Saint-Moritz Roi Soleil", image: clubmedStmoritz, description: "Premium ski-in/ski-out resort in iconic St. Moritz with après-ski, wellness, and legendary Swiss Alpine hospitality.", isAllInclusive: true, isHoneymoon: true },
      { name: "Club Med Villars-sur-Ollon", image: clubmedVillars, description: "All-inclusive family resort in Vaud Alps with skiing, snowboarding, and stunning Lake Geneva views.", isAllInclusive: true, isHoneymoon: true },
    ]
  },
  {
    name: "Zanzibar",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "Bawe Island", image: baweIslandZanzibar, description: "Exclusive private island retreat offering pristine beaches, turquoise waters, and secluded luxury just off Stone Town.", isTopLuxury: true, isHoneymoon: true },
      { name: "Gold Zanzibar Beach House & Spa", image: goldZanzibar, description: "Elegant beachfront resort on Kendwa Beach featuring infinity pool, gourmet dining, and authentic Zanzibari hospitality.", isHoneymoon: true },
      { name: "The Island Pongwe", image: islandPongweZanzibar, description: "Boutique beach lodge on Pongwe Beach with rustic luxury cottages, pristine white sand, and intimate tropical paradise atmosphere.", isHoneymoon: true },
    ]
  }
];

const specialOccasions = [
  "Honeymoon",
  "Anniversary",
  "Birthday",
  "Wedding",
  "Family Vacation",
  "Romantic Getaway",
  "Business Trip",
  "Other"
];

const filterOptions: { id: FilterCategory; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "all", label: "All Resorts", icon: <Palmtree className="w-4 h-4" />, color: "bg-[#1e3a5f]" },
  { id: "upcoming", label: "New 2024-2026", icon: <Clock className="w-4 h-4" />, color: "bg-blue-500" },
  { id: "nora-picks", label: "Nora's Picks", icon: <Star className="w-4 h-4" />, color: "bg-amber-500" },
  { id: "top-luxury", label: "Top Luxury", icon: <Crown className="w-4 h-4" />, color: "bg-purple-600" },
  { id: "adult-only", label: "Adults Only", icon: <Heart className="w-4 h-4" />, color: "bg-pink-500" },
  { id: "all-inclusive", label: "All-Inclusive", icon: <Sparkles className="w-4 h-4" />, color: "bg-emerald-500" },
  { id: "honeymoon", label: "Honeymoon", icon: <Heart className="w-4 h-4" />, color: "bg-rose-500" },
];

const transferOptions: { id: TransferType | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Transfers", icon: <Filter className="w-4 h-4" /> },
  { id: "seaplane", label: "Seaplane", icon: <Plane className="w-4 h-4" /> },
  { id: "speedboat", label: "Speedboat", icon: <Anchor className="w-4 h-4" /> },
  { id: "domestic", label: "Domestic Flight", icon: <Car className="w-4 h-4" /> },
];

const seychellesAreaOptions: { id: SeychellesArea | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Islands", icon: <Filter className="w-4 h-4" /> },
  { id: "mahe", label: "Mahé", icon: <Palmtree className="w-4 h-4" /> },
  { id: "praslin", label: "Praslin", icon: <Palmtree className="w-4 h-4" /> },
  { id: "la-digue", label: "La Digue", icon: <Palmtree className="w-4 h-4" /> },
  { id: "silhouette", label: "Silhouette", icon: <Palmtree className="w-4 h-4" /> },
  { id: "felicite", label: "Félicité", icon: <Palmtree className="w-4 h-4" /> },
  { id: "private-island", label: "Private Island", icon: <Crown className="w-4 h-4" /> },
];

const greeceIslandOptions: { id: GreeceIsland | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Regions", icon: <Filter className="w-4 h-4" /> },
  { id: "santorini", label: "Santorini", icon: <Building2 className="w-4 h-4" /> },
  { id: "mykonos", label: "Mykonos", icon: <Building2 className="w-4 h-4" /> },
  { id: "athens", label: "Athens", icon: <Building2 className="w-4 h-4" /> },
  { id: "crete", label: "Crete", icon: <Building2 className="w-4 h-4" /> },
];

interface QuoteFormData {
  fullName: string;
  adults: string;
  kids: string;
  kidsAges: string;
  travelDates: string;
  occasion: string;
  requests: string;
}

const HotelCard = ({ hotel, destination }: { hotel: Hotel; destination: string }) => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    adults: "2",
    kids: "0",
    kidsAges: "",
    travelDates: "",
    occasion: "",
    requests: ""
  });

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "971547474404";
    const message = `
🌟 *Quote Request - ${hotel.name}*
━━━━━━━━━━━━━━━━━━━━━

📍 *Destination:* ${destination}
🏨 *Hotel/Cruise:* ${hotel.name}

👤 *Guest Details:*
• Full Name: ${formData.fullName || "Not specified"}
• Adults: ${formData.adults}
• Children: ${formData.kids}
${formData.kids !== "0" ? `• Children Ages: ${formData.kidsAges || "Not specified"}` : ""}

📅 *Travel Dates:* ${formData.travelDates || "Flexible"}
🎉 *Special Occasion:* ${formData.occasion || "None specified"}

💬 *Additional Requests:*
${formData.requests || "None"}

━━━━━━━━━━━━━━━━━━━━━
Sent via Resorts Offers
    `.trim();

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Hotel Image & Info */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {hotel.isUpcoming && (
            <Badge className="bg-blue-500 text-white text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {hotel.openingYear}
            </Badge>
          )}
          {hotel.isAdultOnly && (
            <Badge className="bg-pink-500 text-white text-xs">Adults Only</Badge>
          )}
          {hotel.isAllInclusive && (
            <Badge className="bg-emerald-500 text-white text-xs">All-Inclusive</Badge>
          )}
          {hotel.isNoraPick && (
            <Badge className="bg-amber-500 text-white text-xs">
              <Star className="w-3 h-3 mr-1" />
              Nora's Pick
            </Badge>
          )}
          {hotel.isTopLuxury && (
            <Badge className="bg-purple-600 text-white text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Top Luxury
            </Badge>
          )}
        </div>
        
        {/* Transfer Type Badge */}
        {hotel.transfer && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-[#1e3a5f] text-xs">
              {hotel.transfer === "seaplane" && <Plane className="w-3 h-3 mr-1" />}
              {hotel.transfer === "speedboat" && <Anchor className="w-3 h-3 mr-1" />}
              {hotel.transfer === "domestic" && <Car className="w-3 h-3 mr-1" />}
              {hotel.transfer === "seaplane" ? "Seaplane" : hotel.transfer === "speedboat" ? "Speedboat" : "Domestic"}
            </Badge>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">{hotel.name}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{hotel.description}</p>

        {/* Collapsed Quote Button */}
        {!showQuoteForm ? (
          <Button 
            onClick={() => setShowQuoteForm(true)}
            className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-2 gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Ask for a Quote
          </Button>
        ) : (
          /* Expanded Quote Form */
          <div className="space-y-4 bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-[#1e3a5f] flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                Request a Quote
              </h4>
              <button 
                onClick={() => setShowQuoteForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor={`name-${hotel.name}`} className="text-xs font-medium text-gray-700">Full Name *</Label>
                <Input
                  id={`name-${hotel.name}`}
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="mt-1 h-9 text-sm"
                />
              </div>

              <div>
                <Label htmlFor={`adults-${hotel.name}`} className="text-xs font-medium text-gray-700">Adults *</Label>
                <Select value={formData.adults} onValueChange={(value) => handleInputChange("adults", value)}>
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue placeholder="Adults" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor={`kids-${hotel.name}`} className="text-xs font-medium text-gray-700">Kids</Label>
                <Select value={formData.kids} onValueChange={(value) => handleInputChange("kids", value)}>
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue placeholder="Kids" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.kids !== "0" && (
                <div className="col-span-2">
                  <Label htmlFor={`ages-${hotel.name}`} className="text-xs font-medium text-gray-700">Ages of Kids</Label>
                  <Input
                    id={`ages-${hotel.name}`}
                    placeholder="e.g., 5, 8"
                    value={formData.kidsAges}
                    onChange={(e) => handleInputChange("kidsAges", e.target.value)}
                    className="mt-1 h-9 text-sm"
                  />
                </div>
              )}

              <div className="col-span-2">
                <Label htmlFor={`dates-${hotel.name}`} className="text-xs font-medium text-gray-700">Travel Dates</Label>
                <Input
                  id={`dates-${hotel.name}`}
                  placeholder="e.g., March 15-22, 2025"
                  value={formData.travelDates}
                  onChange={(e) => handleInputChange("travelDates", e.target.value)}
                  className="mt-1 h-9 text-sm"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor={`occasion-${hotel.name}`} className="text-xs font-medium text-gray-700">Occasion</Label>
                <Select value={formData.occasion} onValueChange={(value) => handleInputChange("occasion", value)}>
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue placeholder="Select (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialOccasions.map(occasion => (
                      <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor={`requests-${hotel.name}`} className="text-xs font-medium text-gray-700">Requests</Label>
                <Textarea
                  id={`requests-${hotel.name}`}
                  placeholder="Special requirements..."
                  value={formData.requests}
                  onChange={(e) => handleInputChange("requests", e.target.value)}
                  className="mt-1 min-h-[60px] text-sm"
                />
              </div>
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-2 gap-2">
                <MessageCircle className="w-4 h-4" />
                Send via WhatsApp
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const PartnerHotels = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [activeTransfer, setActiveTransfer] = useState<TransferType | "all">("all");
  const [activeSeychellesArea, setActiveSeychellesArea] = useState<SeychellesArea | "all">("all");
  const [activeGreeceIsland, setActiveGreeceIsland] = useState<GreeceIsland | "all">("all");
  const [activeDestination, setActiveDestination] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique destination names for the filter
  const destinationNames = useMemo(() => {
    return ["all", ...destinations.map(d => d.name)];
  }, []);

  // Show destination-specific sub-filters
  const showTransferFilter = activeDestination === "Maldives";
  const showSeychellesFilter = activeDestination === "Seychelles";
  const showGreeceFilter = activeDestination === "Greece";

  // Filter destinations and hotels
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter(destination => {
        // Destination filter
        if (activeDestination !== "all") {
          return destination.name === activeDestination;
        }
        return true;
      })
      .map(destination => {
        const filteredHotels = destination.hotels.filter(hotel => {
          // Search filter
          const matchesSearch = searchQuery === "" || 
            hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
          
          // Category filter
          let matchesCategory = true;
          if (activeFilter === "adult-only") matchesCategory = hotel.isAdultOnly === true;
          else if (activeFilter === "all-inclusive") matchesCategory = hotel.isAllInclusive === true;
          else if (activeFilter === "honeymoon") matchesCategory = hotel.isHoneymoon === true;
          else if (activeFilter === "nora-picks") matchesCategory = hotel.isNoraPick === true;
          else if (activeFilter === "top-luxury") matchesCategory = hotel.isTopLuxury === true;
          else if (activeFilter === "upcoming") matchesCategory = hotel.isUpcoming === true;
          
          // Transfer filter (only applies when Maldives is selected)
          let matchesTransfer = true;
          if (activeTransfer !== "all" && destination.name === "Maldives") {
            matchesTransfer = hotel.transfer === activeTransfer;
          }
          
          // Seychelles area filter
          let matchesSeychellesArea = true;
          if (activeSeychellesArea !== "all" && destination.name === "Seychelles") {
            matchesSeychellesArea = hotel.seychellesArea === activeSeychellesArea;
          }
          
          // Greece island filter
          let matchesGreeceIsland = true;
          if (activeGreeceIsland !== "all" && destination.name === "Greece") {
            matchesGreeceIsland = hotel.greeceIsland === activeGreeceIsland;
          }
          
          return matchesSearch && matchesCategory && matchesTransfer && matchesSeychellesArea && matchesGreeceIsland;
        });
        
        return { ...destination, hotels: filteredHotels };
      }).filter(destination => destination.hotels.length > 0);
  }, [activeFilter, activeTransfer, activeSeychellesArea, activeGreeceIsland, activeDestination, searchQuery]);

  const totalHotels = filteredDestinations.reduce((acc, d) => acc + d.hotels.length, 0);

  return (
    <>
      <Helmet>
        <title>Our Partner Hotels - Luxury Resorts & Cruises | Resorts Offers</title>
        <meta name="description" content="Explore our curated collection of luxury partner hotels, resorts, and cruise lines across Maldives, Seychelles, Mauritius, Santorini, London, Dubai, Bali, South Africa, and more." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Luxury Resort"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/80 via-[#1e3a5f]/60 to-[#1e3a5f]/80" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our Partner Hotels</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Curated collection of the world's most exceptional luxury hotels, resorts, and cruise experiences
            </p>
          </div>
        </section>

        {/* Filters Section - Single Row */}
        <section className="sticky top-0 z-30 bg-white shadow-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Single Row Filter Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {/* Search Input */}
              <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-8 h-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Destination Filter - First priority */}
              <Select 
                value={activeDestination} 
                onValueChange={(value) => {
                  setActiveDestination(value);
                  // Reset all destination-specific filters when switching
                  setActiveTransfer("all");
                  setActiveSeychellesArea("all");
                  setActiveGreeceIsland("all");
                }}
              >
                <SelectTrigger className="w-[140px] h-10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <SelectValue placeholder="Destination" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {destinationNames.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest === "all" ? "All Destinations" : dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterCategory)}>
                <SelectTrigger className="w-[150px] h-10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((filter) => (
                    <SelectItem key={filter.id} value={filter.id}>
                      <div className="flex items-center gap-2">
                        {filter.icon}
                        {filter.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Transfer Filter - Only visible when Maldives is selected */}
              {showTransferFilter && (
                <Select value={activeTransfer} onValueChange={(value) => setActiveTransfer(value as "all" | TransferType)}>
                  <SelectTrigger className="w-[150px] h-10 border-primary/50 bg-primary/5">
                    <SelectValue placeholder="Transfer" />
                  </SelectTrigger>
                  <SelectContent>
                    {transferOptions.map((transfer) => (
                      <SelectItem key={transfer.id} value={transfer.id}>
                        <div className="flex items-center gap-2">
                          {transfer.icon}
                          {transfer.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Seychelles Area Filter - Only visible when Seychelles is selected */}
              {showSeychellesFilter && (
                <Select value={activeSeychellesArea} onValueChange={(value) => setActiveSeychellesArea(value as "all" | SeychellesArea)}>
                  <SelectTrigger className="w-[150px] h-10 border-primary/50 bg-primary/5">
                    <SelectValue placeholder="Island" />
                  </SelectTrigger>
                  <SelectContent>
                    {seychellesAreaOptions.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        <div className="flex items-center gap-2">
                          {area.icon}
                          {area.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Greece Island Filter - Only visible when Greece is selected */}
              {showGreeceFilter && (
                <Select value={activeGreeceIsland} onValueChange={(value) => setActiveGreeceIsland(value as "all" | GreeceIsland)}>
                  <SelectTrigger className="w-[150px] h-10 border-primary/50 bg-primary/5">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {greeceIslandOptions.map((island) => (
                      <SelectItem key={island.id} value={island.id}>
                        <div className="flex items-center gap-2">
                          {island.icon}
                          {island.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Clear All Button */}
              {(activeFilter !== "all" || activeTransfer !== "all" || activeSeychellesArea !== "all" || activeGreeceIsland !== "all" || activeDestination !== "all" || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveFilter("all");
                    setActiveTransfer("all");
                    setActiveSeychellesArea("all");
                    setActiveGreeceIsland("all");
                    setActiveDestination("all");
                    setSearchQuery("");
                  }}
                  className="h-10 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-center mt-3 text-sm text-gray-500">
              Showing {totalHotels} properties
              {activeDestination !== "all" && ` in ${activeDestination}`}
            </div>
          </div>
        </section>

        {/* Destination Sections */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <Palmtree className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500">No hotels found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search query</p>
              <Button
                onClick={() => {
                  setActiveFilter("all");
                  setActiveTransfer("all");
                  setActiveSeychellesArea("all");
                  setActiveGreeceIsland("all");
                  setActiveDestination("all");
                  setSearchQuery("");
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            filteredDestinations.map((destination, index) => (
              <section key={destination.name} className="mb-20">
                {/* Destination Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white">
                    {destination.icon}
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f]">
                      {destination.name}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.hotels.length} Luxury Properties</span>
                    </div>
                  </div>
                </div>

                {/* Hotels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {destination.hotels.map((hotel) => (
                    <HotelCard key={hotel.name} hotel={hotel} destination={destination.name} />
                  ))}
                </div>

                {/* Divider */}
                {index < filteredDestinations.length - 1 && (
                  <div className="mt-16 flex items-center justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#1e3a5f]/30 to-transparent rounded-full" />
                  </div>
                )}
              </section>
            ))
          )}
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default PartnerHotels;
