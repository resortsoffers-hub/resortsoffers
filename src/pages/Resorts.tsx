import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import maldivesAerial1 from "@/assets/resorts/maldives-aerial-1.jpg";
import maldivesAerial2 from "@/assets/resorts/maldives-aerial-2.jpg";
import maldivesPoolDining from "@/assets/resorts/maldives-pool-dining.jpg";
import maldivesWaterVilla from "@/assets/resorts/maldives-water-villa.jpg";
import maldivesVillaPool from "@/assets/resorts/maldives-villa-pool.jpg";
import luxuryVillaPool from "@/assets/resorts/luxury-villa-pool.jpg";
import coupleBikes from "@/assets/resorts/couple-bikes.jpg";
import poolAerial from "@/assets/resorts/pool-aerial.jpg";
import weddingCeremony from "@/assets/resorts/wedding-ceremony.jpg";
import weddingDance from "@/assets/resorts/wedding-dance.jpg";
import weddingCoupleCart from "@/assets/resorts/wedding-couple-cart.jpg";
import poolBreakfast from "@/assets/resorts/pool-breakfast.jpg";
import waterVillasAerial from "@/assets/resorts/water-villas-aerial.jpg";
import luxuryInfinityPool from "@/assets/resorts/luxury-infinity-pool.jpg";
import baliClifftopResort from "@/assets/resorts/bali-clifftop-resort.jpg";

const Resorts = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const heroImages = [
    { src: maldivesAerial1, alt: "Aerial view of luxury Maldives resort with overwater villas and pristine turquoise lagoon" },
    { src: baliClifftopResort, alt: "Stunning clifftop resort pools overlooking crystal blue ocean in Bali" },
    { src: luxuryInfinityPool, alt: "Ultra-luxury infinity pool villa with panoramic ocean views" },
    { src: luxuryVillaPool, alt: "Luxury Maldives villa with private pool, wooden deck, and tropical palm trees" },
    { src: coupleBikes, alt: "Romantic couple cycling along overwater walkway at Maldives luxury resort" },
    { src: poolAerial, alt: "Aerial view of stunning infinity pool surrounded by lush tropical gardens and turquoise ocean" },
    { src: weddingCeremony, alt: "Romantic Maldives beach wedding ceremony with traditional drummers at sunset" },
    { src: weddingDance, alt: "Newlyweds dancing on pristine white sand beach in Maldives paradise" },
    { src: weddingCoupleCart, alt: "Happy wedding couple with vintage golf cart on Maldives resort pathway" },
    { src: poolBreakfast, alt: "Luxury oceanfront pool with gourmet breakfast setup overlooking crystal waters" },
    { src: waterVillasAerial, alt: "Breathtaking aerial view of luxury overwater villas with private pools in Maldives" },
    { src: maldivesAerial2, alt: "Stunning aerial perspective of Maldives island resort surrounded by crystal clear waters" },
    { src: maldivesPoolDining, alt: "Luxury infinity pool with oceanfront dining at sunset in Maldives resort" },
    { src: maldivesWaterVilla, alt: "Exclusive overwater villa with private pool and ocean access in Maldives" },
    { src: maldivesVillaPool, alt: "Premium water villa with infinity pool overlooking turquoise Maldives lagoon" },
  ];

  const resorts = [
    {
      name: "The Ritz-Carlton Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Be surrounded by azure sky and ocean at The Ritz-Carlton Maldives, Fari Islands, featuring luxury villas and world-class amenities.",
      features: ["Overwater Villas", "Kids Club", "Spa & Wellness", "Multiple Restaurants"],
      website: "https://www.ritzcarlton.com/en/hotels/maldives"
    },
    {
      name: "Patina Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "A 42-hectare island haven of freedom and wonder, offering perpetual flow of inspiration with world-class dining destinations.",
      features: ["Beach & Overwater Villas", "Multiple Dining", "Wellness Center", "Cultural Events"],
      website: "https://www.patinamaldives.com"
    },
    {
      name: "One&Only Reethi Rah",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Surrounded by azure sky and ocean, immersed in iconic over-water villas with eight restaurants and five bars.",
      features: ["Overwater Villas", "8 Restaurants", "5 Bars", "Private Beach"],
      website: "https://www.oneandonlyresorts.com/one-and-only-reethi-rah-maldives"
    },
    {
      name: "Four Seasons Landaa Giraavaru",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "UNESCO Biosphere Reserve luxury resort offering pristine natural beauty and world-class hospitality.",
      features: ["Beach Villas", "Marine Discovery", "Spa Retreat", "Fine Dining"],
      website: "https://www.fourseasons.com/maldiveslg"
    },
    {
      name: "Jumeirah Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Experience luxury in the Maldives with Jumeirah's signature hospitality, featuring elegant villas and exceptional dining.",
      features: ["Water Villas", "Spa Services", "Water Sports", "Kids Club"],
      website: "https://www.jumeirah.com/en/stay/maldives"
    },
    {
      name: "OZEN Reserve Bolifushi",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Your intimate escape into luxury where opulence meets meaningful connection. Cultural immersion with Maldivian-inspired cuisine.",
      features: ["All-Inclusive", "Wellness Journey", "Cultural Immersion", "Private Pool Villas"],
      website: "https://ozenreserve.com"
    },
    {
      name: "Waldorf Astoria Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Iconic luxury resort in the Maldives offering exceptional service and pristine natural beauty in an exclusive setting.",
      features: ["Reef & Beach Villas", "Spa Sanctuary", "Multiple Dining", "Water Sports"],
      website: "https://www.waldorfastoriamaldives.com"
    },
    {
      name: "Villa Private Island",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Ultimate privacy and luxury in exclusive private island villas with personalized service and bespoke experiences.",
      features: ["Private Islands", "Butler Service", "Yacht Excursions", "Exclusive Dining"],
      website: "https://www.villahotels.com"
    },
    {
      name: "Cheval Blanc Randheli",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "A new contemporary vision of hospitality promoting French craftsmanship and Art de Vivre à la française in the Maldives.",
      features: ["Luxury Villas", "French Cuisine", "Spa by Guerlain", "Private Island"],
      website: "https://www.chevalblanc.com/en/maison/maldives-randheli"
    },
    {
      name: "Joali Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "An immersive luxury experience where art meets nature. Discover bespoke design, world-class dining, and unparalleled service.",
      features: ["Art Gallery", "Private Beaches", "Underwater Restaurant", "Spa Sanctuary"],
      website: "https://www.joali.com"
    },
    {
      name: "Soneva Fushi",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Barefoot luxury in a pristine tropical paradise. Experience sustainable sophistication with oversized villas and exceptional dining.",
      features: ["Eco-Luxury Villas", "Observatory", "Outdoor Cinema", "Organic Cuisine"],
      website: "https://www.soneva.com/soneva-fushi"
    },
    {
      name: "JW Marriott Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Sophisticated island sanctuary offering contemporary luxury with stunning overwater and beach villas in the heart of the Maldives.",
      features: ["Overwater Pool Villas", "Multiple Restaurants", "Spa & Wellness", "Water Sports Center"],
      website: "https://www.marriott.com/hotels/travel/mlejw-jw-marriott-maldives-resort-and-spa"
    },
    {
      name: "SO/ Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Bold, playful, and avant-garde luxury resort inspired by fashion and design. Experience the extraordinary with vibrant energy.",
      features: ["Designer Villas", "Fashion Events", "Gourmet Dining", "Beach Club"],
      website: "https://www.so-maldives.com"
    },
    {
      name: "Kuda Villingili Resort",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Tropical island paradise combining natural beauty with refined luxury. Enjoy pristine beaches and exceptional personalized service.",
      features: ["Beach & Water Villas", "Infinity Pools", "Spa Treatments", "Water Activities"],
      website: "https://www.kudavillingili.com"
    },
    {
      name: "Niyama Private Islands",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Two stunning private islands offering ultimate freedom and bespoke experiences. Redefine luxury with underwater restaurants and more.",
      features: ["Private Islands", "Underwater Nightclub", "Surf School", "Spa by Drift"],
      website: "https://www.niyama.com"
    },
    {
      name: "W Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Contemporary luxury meets island paradise. Experience vibrant energy, innovative design, and world-class entertainment.",
      features: ["Overwater Bungalows", "Beach Club", "AWAY Spa", "Water Sports"],
      website: "https://www.marriott.com/hotels/travel/mlewh-w-maldives"
    },
    {
      name: "Hilton Maldives Amingiri",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Intimate island resort featuring pristine beaches, turquoise lagoons, and sophisticated accommodation with modern amenities.",
      features: ["Beach & Overwater Villas", "All-Inclusive Options", "Spa Wellness", "Kids Club"],
      website: "https://www.hilton.com/en/hotels/mleaahh-hilton-maldives-amingiri-resort-and-spa"
    },
    {
      name: "Hard Rock Hotel Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Rock star luxury in paradise. Enjoy music-inspired experiences, legendary service, and world-class entertainment.",
      features: ["Rock Spa", "Live Music", "Overwater Villas", "Signature Dining"],
      website: "https://www.hardrockhotels.com/maldives"
    },
    {
      name: "Dusit Thani Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Thai-inspired luxury resort combining warm hospitality with stunning natural beauty. Experience authentic Thai wellness and cuisine.",
      features: ["Thai Spa", "Authentic Cuisine", "Beach & Ocean Villas", "Dive Center"],
      website: "https://www.dusit.com/dusitthani-maldives"
    },
    {
      name: "Siyam World Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "The ultimate playground for adventure seekers and families. Experience thrilling water sports, entertainment, and luxury accommodations.",
      features: ["Water Park", "Adventure Sports", "Family Villas", "Multiple Restaurants"],
      website: "https://www.siyam.com/siyamworld"
    },
    {
      name: "Joy Island Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Contemporary island retreat offering modern luxury and genuine Maldivian hospitality in a vibrant tropical setting.",
      features: ["Modern Villas", "Beach Access", "Spa Services", "Water Activities"],
      website: "https://www.joyislandmaldives.com"
    },
    {
      name: "Velaa Private Island",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Ultra-exclusive private island offering unmatched luxury with personal butlers, world-class spa, and Michelin-starred dining.",
      features: ["Private Island", "Golf Academy", "Michelin Dining", "Velaa Spa"],
      website: "https://www.velaaprivateisland.com"
    },
    {
      name: "Anantara Kihavah Villas",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Luxurious resort featuring underwater restaurant SEA, infinity pools, and pristine beaches in the UNESCO Biosphere Reserve.",
      features: ["Underwater Restaurant", "Overwater Spa", "Observatory", "Private Villas"],
      website: "https://www.anantara.com/en/kihavah-maldives"
    },
    {
      name: "Vakkaru Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Secluded island paradise offering barefoot luxury with spacious villas, pristine beaches, and exceptional personalized service.",
      features: ["Beach & Water Villas", "Merana Spa", "Marine Discovery", "Kids Club"],
      website: "https://www.vakkarumaldives.com"
    },
    {
      name: "Fairmont Maldives Sirru Fen Fushi",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Secluded sanctuary in the Shaviyani Atoll offering pristine nature, underwater sculpture gallery, and luxurious accommodations.",
      features: ["Coralarium", "Willow Stream Spa", "Water Sports", "Turtle Rehabilitation"],
      website: "https://www.fairmont-maldives.com"
    },
    {
      name: "Gili Lankanfushi",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Sustainable luxury resort offering rustic sophistication with overwater villas, organic dining, and barefoot elegance.",
      features: ["Eco-Luxury", "Private Water Reserves", "Organic Spa", "Barefoot Experience"],
      website: "https://www.gili-lankanfushi.com"
    },
    // Seychelles Hotels
    {
      name: "Four Seasons Resort Seychelles",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Nestled on a hillside overlooking Petite Anse Bay, featuring luxurious tree-house villas with panoramic ocean views.",
      features: ["Hillside Villas", "Private Beach", "Spa Sanctuary", "Gourmet Dining"],
      website: "https://www.fourseasons.com/seychelles"
    },
    {
      name: "Six Senses Zil Pasyon",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Private island resort featuring expansive villas, pristine beaches, and sustainable luxury in a breathtaking natural setting.",
      features: ["Private Island", "Eco-Luxury Villas", "Organic Spa", "Cinema Paradiso"],
      website: "https://www.sixsenses.com/en/resorts/zil-pasyon"
    },
    {
      name: "North Island Seychelles",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Ultra-exclusive private island resort with only 11 villas, offering unparalleled privacy and bespoke luxury experiences.",
      features: ["Ultra-Luxury Villas", "Private Island", "Conservation Program", "Butler Service"],
      website: "https://www.north-island.com"
    },
    {
      name: "Constance Ephelia Seychelles",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Seychelles' largest resort spanning 120 hectares, featuring two pristine beaches and lush tropical gardens.",
      features: ["Two Beaches", "Spa Village", "Zip Line", "Kids Club"],
      website: "https://www.ephelia.com"
    },
    {
      name: "Raffles Seychelles",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Perched on a hillside with stunning ocean views, offering spacious villas with private plunge pools and butler service.",
      features: ["Hillside Villas", "Private Pools", "Curieuse Marine Park", "Spa by Raffles"],
      website: "https://www.raffles.com/seychelles"
    },
    {
      name: "Hilton Seychelles Labriz Resort & Spa",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Beachfront paradise on Silhouette Island featuring spacious villas, pristine nature, and world-class wellness facilities.",
      features: ["Island Paradise", "Eforea Spa", "Seven Restaurants", "Marine Activities"],
      website: "https://www.hilton.com/en/hotels/sezhihi-hilton-seychelles-labriz-resort-and-spa"
    },
    {
      name: "Anantara Maia Seychelles Villas",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Ultra-luxurious all-villa resort on a private peninsula offering complete seclusion and personalized service.",
      features: ["Private Pool Villas", "Butler Service", "Spa", "Gourmet Dining"],
      website: "https://www.anantara.com/en/maia-seychelles"
    },
    {
      name: "Kempinski Seychelles Resort",
      location: "Seychelles",
      region: "Seychelles",
      rating: 5,
      description: "Luxury beachfront resort on Baie Lazare offering elegant rooms, exceptional dining, and stunning Indian Ocean views.",
      features: ["Beachfront Villas", "European Elegance", "Spa by Resense", "Water Sports"],
      website: "https://www.kempinski.com/en/seychelles/baie-lazare"
    },
    // Mauritius Hotels
    {
      name: "One&Only Le Saint Géran",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Legendary beachfront resort on a private peninsula, offering timeless elegance and world-class service.",
      features: ["Private Peninsula", "Championship Golf", "Kids Only Club", "Water Sports"],
      website: "https://www.oneandonlyresorts.com/le-saint-geran-mauritius"
    },
    {
      name: "The Oberoi Mauritius",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Subtropical paradise featuring elegant villas and pavilions with private gardens and ocean views.",
      features: ["Ocean Villas", "Private Gardens", "Spa by Oberoi", "Fine Dining"],
      website: "https://www.oberoihotels.com/hotels-in-mauritius"
    },
    {
      name: "Shangri-La Le Touessrok",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Beachfront resort with exclusive private island access, offering world-class golf and dining experiences.",
      features: ["Private Island Access", "Championship Golf", "CHI Spa", "Beachfront Suites"],
      website: "https://www.shangri-la.com/mauritius/letouessrokresort"
    },
    {
      name: "Four Seasons Resort Mauritius",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Luxury resort on Anahita Golf Estate, featuring spacious villas and world-class amenities.",
      features: ["Golf Course Villas", "Spa Sanctuary", "Kids For All Seasons", "Water Sports"],
      website: "https://www.fourseasons.com/mauritius"
    },
    {
      name: "Constance Prince Maurice",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Secluded sanctuary on the east coast, offering overwater suites and romantic luxury experiences.",
      features: ["Overwater Suites", "Private Beach", "U Spa by Constance", "Gourmet Dining"],
      website: "https://www.princemaurice.com"
    },
    {
      name: "Lux* Belle Mare",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Beachfront resort on the east coast offering contemporary luxury, world-class dining, and extensive wellness facilities.",
      features: ["Beachfront Suites", "LUX* Me Spa", "Multiple Restaurants", "Water Sports"],
      website: "https://www.luxresorts.com/en/mauritius/lux-belle-mare"
    },
    {
      name: "Constance Belle Mare Plage",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Expansive beachfront resort featuring two championship golf courses, multiple restaurants, and family-friendly amenities.",
      features: ["Two Golf Courses", "Seven Restaurants", "U Spa", "Kids Club"],
      website: "https://www.bellemareplage.com"
    },
    {
      name: "The St. Regis Mauritius Resort",
      location: "Mauritius",
      region: "Mauritius",
      rating: 5,
      description: "Sophisticated beachfront resort offering bespoke butler service, luxurious accommodations, and refined dining experiences.",
      features: ["Butler Service", "Iridium Spa", "Private Beach", "Fine Dining"],
      website: "https://www.marriott.com/hotels/travel/mruse-the-st-regis-mauritius-resort"
    },
    // Bali Hotels
    {
      name: "Four Seasons Resort Bali at Sayan",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Riverside sanctuary in Ubud's jungle, featuring dramatic architecture and holistic wellness experiences.",
      features: ["Jungle Villas", "Sacred River Spa", "Yoga Programs", "Balinese Culture"],
      website: "https://www.fourseasons.com/sayan"
    },
    {
      name: "The Mulia Bali",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Ultra-luxury beachfront resort in Nusa Dua, offering opulent suites and exceptional dining experiences.",
      features: ["Beachfront Suites", "Nine Restaurants", "Spa by Mulia", "Aqua Park"],
      website: "https://www.themulia.com"
    },
    {
      name: "Bulgari Resort Bali",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Clifftop resort in Uluwatu combining Italian luxury with Balinese hospitality and breathtaking ocean views.",
      features: ["Clifftop Villas", "Bulgari Spa", "Private Beach", "Italian Cuisine"],
      website: "https://www.bulgarihotels.com/en_US/bali"
    },
    {
      name: "Mandapa, a Ritz-Carlton Reserve",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Luxury riverside retreat in Ubud, offering authentic Balinese experiences and serene natural beauty.",
      features: ["Riverside Villas", "Cultural Experiences", "Spa Sanctuary", "Organic Cuisine"],
      website: "https://www.ritzcarlton.com/en/hotels/mandapa-bali"
    },
    {
      name: "Amankila Bali",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Hillside resort overlooking Lombok Strait, featuring traditional Balinese architecture and world-class service.",
      features: ["Beach Club", "Infinity Pools", "Aman Spa", "Private Beach"],
      website: "https://www.aman.com/resorts/amankila"
    },
    {
      name: "COMO Shambhala Estate",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Holistic wellness retreat in Ubud's jungle offering transformative programs, yoga, and integrative health.",
      features: ["Wellness Programs", "Yoga Pavilion", "Organic Cuisine", "Jungle Villas"],
      website: "https://www.comohotels.com/bali/como-shambhala-estate"
    },
    {
      name: "Alila Villas Uluwatu",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Contemporary clifftop resort offering sustainable luxury with stunning ocean views and innovative architecture.",
      features: ["Clifftop Villas", "Infinity Pool", "Spa Alila", "Sustainable Design"],
      website: "https://www.alilahotels.com/uluwatu"
    },
    {
      name: "AYANA Resort and Spa Bali",
      location: "Bali",
      region: "Bali",
      rating: 5,
      description: "Sprawling clifftop resort featuring multiple pools, world-famous Rock Bar, and extensive spa facilities.",
      features: ["Rock Bar", "Multiple Pools", "Aquatonic Spa", "12 Restaurants"],
      website: "https://www.ayana.com/bali"
    },
    // Phuket Hotels
    {
      name: "Amanpuri Phuket",
      location: "Phuket",
      region: "Phuket",
      rating: 5,
      description: "Thailand's first Aman resort, offering serene luxury on a pristine peninsula with private beach access.",
      features: ["Private Pavilions", "Beach Club", "Aman Spa", "Yacht Charter"],
      website: "https://www.aman.com/resorts/amanpuri"
    },
    {
      name: "Anantara Layan Phuket Resort",
      location: "Phuket",
      region: "Phuket",
      rating: 5,
      description: "Secluded beachfront resort on Layan Beach, offering contemporary Thai luxury and personalized service.",
      features: ["Beach Access", "Anantara Spa", "Infinity Pools", "Thai Cuisine"],
      website: "https://www.anantara.com/en/layan-phuket"
    },
    {
      name: "Trisara Phuket",
      location: "Phuket",
      region: "Phuket",
      rating: 5,
      description: "Ultra-exclusive resort featuring private pool villas with stunning ocean views and personalized service.",
      features: ["Private Pool Villas", "Private Beach", "Jara Spa", "Seafood Restaurant"],
      website: "https://www.trisara.com"
    },
    {
      name: "The Slate Phuket",
      location: "Phuket",
      region: "Phuket",
      rating: 5,
      description: "Unique heritage-inspired resort on Nai Yang Beach, celebrating Phuket's tin-mining history with bold design.",
      features: ["Heritage Design", "Beach Club", "Coqoon Spa", "Multiple Dining"],
      website: "https://www.theslatephuket.com"
    },
    {
      name: "Keemala Phuket",
      location: "Phuket",
      region: "Phuket",
      rating: 5,
      description: "Enchanting rainforest resort featuring unique clay cottage and tree house villas with innovative design and holistic wellness.",
      features: ["Unique Villas", "Mala Spa", "Rainforest Setting", "Organic Cuisine"],
      website: "https://www.keemala.com"
    },
    {
      name: "Point Yamu by COMO",
      location: "Phuket",
      region: "Phuket",
      rating: 5,
      description: "Contemporary resort on Cape Yamu peninsula, offering wellness-focused luxury with stunning Phang Nga Bay views.",
      features: ["Peninsula Location", "COMO Shambhala", "Infinity Pool", "Italian Cuisine"],
      website: "https://www.comohotels.com/phuket"
    },
    // Dubai Partners
    {
      name: "Burj Al Arab Jumeirah",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "The world's most luxurious hotel, an iconic sail-shaped landmark offering unparalleled service and opulent suites.",
      features: ["Iconic Architecture", "Private Beach", "Michelin-Star Dining", "Butler Service"],
      website: "https://www.jumeirah.com/en/stay/dubai/burj-al-arab-jumeirah"
    },
    {
      name: "Atlantis The Royal",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Ultra-luxury beachfront resort on Palm Jumeirah featuring celebrity chef restaurants and breathtaking architecture.",
      features: ["Beachfront Suites", "World-Class Dining", "Aquaventure Access", "Cloud 22 Beach Club"],
      website: "https://www.atlantis.com/dubai/atlantis-the-royal"
    },
    {
      name: "Bulgari Resort Dubai",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Ultra-luxurious seahorse-shaped island resort featuring Italian elegance and stunning marina views.",
      features: ["Private Island", "Bulgari Spa", "Yacht Club", "Italian Dining"],
      website: "https://www.bulgarihotels.com/en_US/dubai"
    },
    {
      name: "One&Only The Palm",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Beachfront sanctuary on Palm Jumeirah offering Moorish architecture and world-class dining experiences.",
      features: ["Private Beach", "Moorish Design", "Guerlain Spa", "Celebrity Chef Restaurants"],
      website: "https://www.oneandonlyresorts.com/one-and-only-the-palm-dubai"
    },
    {
      name: "Jumeirah Al Naseem",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Contemporary beachfront resort at Madinat Jumeirah with Burj Al Arab views and family-friendly luxury.",
      features: ["Burj Al Arab Views", "Private Beach", "Talise Spa", "Multiple Pools"],
      website: "https://www.jumeirah.com/en/stay/dubai/madinat-jumeirah/jumeirah-al-naseem"
    },
    {
      name: "Palazzo Versace Dubai",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Italian opulence meets Arabian luxury on Culture Village waterfront with signature Versace design throughout.",
      features: ["Versace Design", "Marina Views", "Italian Cuisine", "Spa"],
      website: "https://www.palazzoversace.ae"
    },
    {
      name: "Armani Hotel Dubai",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Sophisticated hotel in Burj Khalifa designed by Giorgio Armani, offering minimalist elegance and world-class service.",
      features: ["Burj Khalifa", "Armani Design", "Fine Dining", "Armani/SPA"],
      website: "https://www.armanihotels.com/dubai"
    },
    {
      name: "Address Downtown Dubai",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Modern luxury hotel adjacent to Dubai Mall with stunning Burj Khalifa and fountain views.",
      features: ["Fountain Views", "Rooftop Pool", "Dubai Mall Access", "Multiple Restaurants"],
      website: "https://www.addresshotels.com/en/hotels/address-downtown"
    },
    {
      name: "Mandarin Oriental Jumeira",
      location: "Dubai",
      region: "Dubai",
      rating: 5,
      description: "Beachfront luxury resort featuring contemporary Arabian design and Mandarin Oriental's legendary service.",
      features: ["Private Beach", "Skyline Views", "The Spa", "Eight Restaurants"],
      website: "https://www.mandarinoriental.com/en/dubai/jumeira-beach"
    },
    // London Partners
    {
      name: "The Savoy",
      location: "London",
      region: "London",
      rating: 5,
      description: "Legendary luxury hotel on the River Thames, offering timeless elegance and impeccable British hospitality since 1889.",
      features: ["River Thames Views", "Historic Luxury", "Michelin-Star Restaurant", "American Bar"],
      website: "https://www.fairmont.com/savoy-london"
    },
    {
      name: "Claridge's",
      location: "London",
      region: "London",
      rating: 5,
      description: "Art Deco masterpiece in Mayfair, epitomizing British elegance and world-class service.",
      features: ["Mayfair Location", "Art Deco Design", "Afternoon Tea", "Michelin-Star Dining"],
      website: "https://www.claridges.co.uk"
    },
    {
      name: "The Connaught",
      location: "London",
      region: "London",
      rating: 5,
      description: "Refined Mayfair hotel blending tradition with contemporary luxury and world-renowned dining.",
      features: ["Mayfair Location", "Michelin Stars", "Aman Spa", "Traditional Elegance"],
      website: "https://www.the-connaught.co.uk"
    },
    {
      name: "The Langham London",
      location: "London",
      region: "London",
      rating: 5,
      description: "Europe's first grand hotel, offering Victorian elegance and modern luxury near Regent Street.",
      features: ["Historic Property", "Artesian Bar", "Chuan Spa", "Afternoon Tea"],
      website: "https://www.langhamhotels.com/en/the-langham/london"
    },
    // Bora Bora Partners
    {
      name: "Four Seasons Resort Bora Bora",
      location: "Bora Bora",
      region: "Bora Bora",
      rating: 5,
      description: "Overwater bungalows with Mount Otemanu views, offering the ultimate French Polynesian luxury experience.",
      features: ["Overwater Bungalows", "Mount Otemanu Views", "Lagoonarium", "Private Beach"],
      website: "https://www.fourseasons.com/borabora"
    },
    {
      name: "The St. Regis Bora Bora Resort",
      location: "Bora Bora",
      region: "Bora Bora",
      rating: 5,
      description: "Exclusive overwater villas with private pools and butlers, set in the turquoise lagoon.",
      features: ["Overwater Villas", "Private Pools", "Butler Service", "Lagoon Restaurant"],
      website: "https://www.marriott.com/hotels/travel/bobxr-the-st-regis-bora-bora-resort"
    },
    {
      name: "Conrad Bora Bora Nui",
      location: "Bora Bora",
      region: "Bora Bora",
      rating: 5,
      description: "Luxury resort on private island offering overwater villas and hillside pool villas with spectacular lagoon views.",
      features: ["Private Island", "Overwater Villas", "Hillside Villas", "Hina Spa"],
      website: "https://www.hilton.com/en/hotels/bobpfci-conrad-bora-bora-nui"
    },
    {
      name: "InterContinental Bora Bora Resort",
      location: "Bora Bora",
      region: "Bora Bora",
      rating: 5,
      description: "Iconic resort featuring overwater bungalows and beach villas with Mount Otemanu backdrop.",
      features: ["Overwater Bungalows", "Beach Villas", "Thalasso Spa", "Multiple Restaurants"],
      website: "https://www.ihg.com/intercontinental/hotels/us/en/bora-bora"
    },
    // Turkey Partners
    {
      name: "Six Senses Kaplankaya",
      location: "Turkey",
      region: "Turkey",
      rating: 5,
      description: "Hillside retreat on the Aegean coast, offering holistic wellness and stunning sea views.",
      features: ["Aegean Sea Views", "Wellness Programs", "Private Beach", "Organic Cuisine"],
      website: "https://www.sixsenses.com/en/resorts/kaplankaya"
    },
    {
      name: "Mandarin Oriental Bodrum",
      location: "Turkey",
      region: "Turkey",
      rating: 5,
      description: "Luxury resort in Bodrum's Paradise Bay, featuring private beaches and contemporary Turkish hospitality.",
      features: ["Paradise Bay", "Private Beach", "Turkish Spa", "Gourmet Dining"],
      website: "https://www.mandarinoriental.com/en/bodrum/paradise-bay"
    },
    {
      name: "D-Hotel Maris",
      location: "Turkey",
      region: "Turkey",
      rating: 5,
      description: "Design-focused luxury resort on pristine beach, featuring stunning architecture and exceptional service.",
      features: ["Beach Access", "Contemporary Design", "Nu Teras Restaurant", "Private Marina"],
      website: "https://www.dhotel.com.tr"
    },
    {
      name: "Maxx Royal Belek",
      location: "Turkey",
      region: "Turkey",
      rating: 5,
      description: "Ultra-all-inclusive resort in Belek offering world-class facilities and personalized luxury service.",
      features: ["All-Inclusive Luxury", "Multiple Pools", "Private Beach", "Kids Club"],
      website: "https://www.maxxroyal.com/belek"
    },
    // Morocco Partners
    {
      name: "La Mamounia",
      location: "Morocco",
      region: "Morocco",
      rating: 5,
      description: "Legendary palace hotel in Marrakech, surrounded by magnificent gardens and featuring Moroccan luxury.",
      features: ["Palace Architecture", "Magnificent Gardens", "Moroccan Spa", "Fine Dining"],
      website: "https://www.mamounia.com"
    },
    {
      name: "Royal Mansour Marrakech",
      location: "Morocco",
      region: "Morocco",
      rating: 5,
      description: "Palatial resort featuring private riads with rooftop terraces, exemplifying Moroccan craftsmanship.",
      features: ["Private Riads", "Rooftop Terraces", "Three Restaurants", "Spa by Guerlain"],
      website: "https://www.royalmansour.com/en"
    },
    {
      name: "Four Seasons Resort Marrakech",
      location: "Morocco",
      region: "Morocco",
      rating: 5,
      description: "Palatial resort surrounded by gardens and palm groves, offering Moroccan elegance and modern luxury.",
      features: ["Garden Setting", "Moroccan Design", "Spa", "Multiple Pools"],
      website: "https://www.fourseasons.com/marrakech"
    },
    // Switzerland Partners
    {
      name: "The Chedi Andermatt",
      location: "Switzerland",
      region: "Switzerland",
      rating: 5,
      description: "Alpine luxury resort blending Swiss tradition with Asian design, featuring Europe's largest private spa.",
      features: ["Alpine Location", "Europe's Largest Spa", "Michelin-Star Dining", "Ski-In/Ski-Out"],
      website: "https://www.thechediandermatt.com"
    },
    {
      name: "Badrutt's Palace Hotel",
      location: "Switzerland",
      region: "Switzerland",
      rating: 5,
      description: "Legendary St. Moritz hotel offering timeless elegance and world-class skiing since 1896.",
      features: ["St. Moritz Location", "Historic Luxury", "Michelin Dining", "Private Ski Lessons"],
      website: "https://www.badruttspalace.com"
    },
    // Italy Partners
    {
      name: "Belmond Hotel Caruso",
      location: "Italy",
      region: "Italy",
      rating: 5,
      description: "Perched high on the cliffs of Ravello, featuring an infinity pool overlooking the Amalfi Coast.",
      features: ["Amalfi Coast Views", "Infinity Pool", "Historic Building", "Michelin-Star Restaurant"],
      website: "https://www.belmond.com/hotels/europe/italy/amalfi-coast/belmond-hotel-caruso"
    },
    {
      name: "Passalacqua",
      location: "Italy",
      region: "Italy",
      rating: 5,
      description: "18th-century villa on Lake Como, offering unparalleled luxury and Italian elegance.",
      features: ["Lake Como", "Historic Villa", "Private Gardens", "Boat Service"],
      website: "https://www.passalacqua.it"
    },
    // Amsterdam Partners
    {
      name: "Waldorf Astoria Amsterdam",
      location: "Amsterdam",
      region: "Amsterdam",
      rating: 5,
      description: "Six 17th-century canal palaces transformed into a luxury hotel, featuring elegant rooms and Michelin-star dining.",
      features: ["Canal Views", "Historic Palaces", "Michelin-Star Restaurant", "Guerlain Spa"],
      website: "https://www.hilton.com/en/hotels/amsw aldorf-astoria-amsterdam"
    },
    {
      name: "The Dylan Amsterdam",
      location: "Amsterdam",
      region: "Amsterdam",
      rating: 5,
      description: "Boutique luxury hotel on Keizersgracht canal, offering intimate elegance in the heart of Amsterdam.",
      features: ["Canal Location", "Boutique Luxury", "Michelin-Star Dining", "Intimate Atmosphere"],
      website: "https://www.dylanamsterdam.com"
    },
    // Finland Partners
    {
      name: "Arctic TreeHouse Hotel",
      location: "Finland",
      region: "Finland",
      rating: 5,
      description: "Unique glass-walled suites elevated among trees, offering Northern Lights views in Lapland.",
      features: ["Northern Lights", "Glass Suites", "Arctic Location", "Lapland Experience"],
      website: "https://arctictreehousehotel.com"
    },
    {
      name: "Kakslauttanen Arctic Resort",
      location: "Finland",
      region: "Finland",
      rating: 5,
      description: "Famous glass igloos and log cabins in the Arctic wilderness, perfect for aurora viewing.",
      features: ["Glass Igloos", "Aurora Views", "Arctic Activities", "Ice Restaurant"],
      website: "https://www.kakslauttanen.fi"
    },
    // China Partners
    {
      name: "Aman Summer Palace Beijing",
      location: "China",
      region: "China",
      rating: 5,
      description: "Exclusive retreat within the UNESCO World Heritage Summer Palace grounds, offering serene luxury.",
      features: ["Summer Palace Grounds", "Historic Setting", "Aman Spa", "Fine Dining"],
      website: "https://www.aman.com/resorts/aman-summer-palace"
    },
    {
      name: "The Peninsula Shanghai",
      location: "China",
      region: "China",
      rating: 5,
      description: "Art Deco masterpiece on the Bund, offering legendary Peninsula service and stunning river views.",
      features: ["The Bund Location", "Art Deco Design", "Peninsula Spa", "Rooftop Bar"],
      website: "https://www.peninsula.com/en/shanghai/5-star-luxury-hotel-bund"
    },
    // Vietnam Partners
    {
      name: "Six Senses Ninh Van Bay",
      location: "Vietnam",
      region: "Vietnam",
      rating: 5,
      description: "Secluded beachfront resort accessible only by boat, offering pristine nature and holistic wellness.",
      features: ["Private Bay", "Boat Access Only", "Six Senses Spa", "Organic Dining"],
      website: "https://www.sixsenses.com/en/resorts/ninh-van-bay"
    },
    {
      name: "Amanoi",
      location: "Vietnam",
      region: "Vietnam",
      rating: 5,
      description: "Clifftop resort overlooking Vinh Hy Bay, combining Vietnamese culture with Aman's signature luxury.",
      features: ["Clifftop Villas", "Vinh Hy Bay Views", "Aman Spa", "Vietnamese Cuisine"],
      website: "https://www.aman.com/resorts/amanoi"
    },
    // Malaysia Partners
    {
      name: "The Datai Langkawi",
      location: "Malaysia",
      region: "Malaysia",
      rating: 5,
      description: "Rainforest resort on pristine beach, offering unparalleled nature immersion and luxury.",
      features: ["Rainforest Setting", "Private Beach", "Nature Excursions", "Spa Treatments"],
      website: "https://www.thedatai.com"
    },
    {
      name: "Four Seasons Resort Langkawi",
      location: "Malaysia",
      region: "Malaysia",
      rating: 5,
      description: "Beach resort on Langkawi island, featuring overwater villas and exceptional family amenities.",
      features: ["Beach & Overwater Villas", "Family Amenities", "Geo Spa", "Water Sports"],
      website: "https://www.fourseasons.com/langkawi"
    }
  ];

  const regions = ["All", "Maldives", "Seychelles", "Mauritius", "Bali", "Phuket", "Dubai", "London", "Bora Bora", "Turkey", "Morocco", "Switzerland", "Italy", "Amsterdam", "Finland", "China", "Vietnam", "Malaysia"];

  const filteredResorts = selectedRegion === "All" 
    ? resorts 
    : resorts.filter(resort => resort.region === selectedRegion);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Luxury Resorts Worldwide - Maldives, Dubai, Bali & More | ResortsOffers.com</title>
        <meta name="description" content="Browse 100+ luxury resorts worldwide. Premium hotels in Maldives, Dubai, Bali, Switzerland, Bora Bora. 5-star accommodations, overwater villas, private beaches & spa resorts." />
        <meta name="keywords" content="luxury resorts, 5-star hotels, Maldives resorts, Dubai hotels, Bali villas, overwater bungalows, beach resorts, ski resorts, honeymoon resorts, family resorts" />
        <link rel="canonical" href="https://www.resortsoffers.com/resorts" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/resorts" />
        <meta property="og:title" content="Luxury Resorts Worldwide - Maldives, Dubai, Bali & More" />
        <meta property="og:description" content="Browse 100+ luxury resorts worldwide. Premium 5-star hotels and exclusive accommodations." />
        <meta property="og:image" content="https://www.resortsoffers.com/resorts-og.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.resortsoffers.com/resorts" />
        <meta name="twitter:title" content="Luxury Resorts Worldwide" />
        <meta name="twitter:description" content="Browse 100+ luxury resorts - Maldives, Dubai, Bali & more." />
        <meta name="twitter:image" content="https://www.resortsoffers.com/resorts-og.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Luxury Resorts Collection",
            "numberOfItems": "100+",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Resort",
                  "name": "Maldives Luxury Resorts",
                  "description": "Overwater villas and private island resorts"
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[70vh]">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        <div className="absolute z-10 container-custom text-center pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-bold hero-text mb-6 animate-fade-in">
            Our Partner Resorts
          </h1>
          <p className="text-xl md:text-2xl hero-text max-w-3xl mx-auto">
            Discover our handpicked premium resort partners worldwide
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-md">
              <label htmlFor="destination-select" className="block text-sm font-semibold text-foreground mb-3 text-center">
                Select Destination
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger id="destination-select" className="w-full bg-background border-2 h-12 text-base">
                  <SelectValue placeholder="Select a destination" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {regions.map((region) => (
                    <SelectItem key={region} value={region} className="cursor-pointer">
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-300" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{resort.name}</CardTitle>
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(resort.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin size={16} className="mr-1" />
                    {resort.location}
                  </div>
                  <CardDescription className="text-base">
                    {resort.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resort.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-3 py-1 bg-muted rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => window.open(resort.website, '_blank')}
                  >
                    Visit Website
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Create Your Perfect Luxury Escape
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Our travel experts will craft a bespoke holiday package tailored to your preferences and desires.
          </p>
          <a href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Request Custom Package
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resorts;
