import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Star, MapPin, Ship, Palmtree, Building2, Tent } from "lucide-react";

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
import furaveriMaldives from "@/assets/resorts/furaveri-maldives.jpg";
import patinaMaldives from "@/assets/resorts/patina-maldives.jpg";
import joaliMaldives from "@/assets/resorts/joali-maldives.jpg";
import anantaraKihavah from "@/assets/resorts/anantara-kihavah.jpg";

import northIsland from "@/assets/resorts/north-island-seychelles.jpg";
import fourSeasonsSeychelles from "@/assets/resorts/four-seasons-seychelles.jpg";
import sixSensesSeychelles from "@/assets/resorts/six-senses-seychelles.jpg";
import rafflesSeychelles from "@/assets/resorts/raffles-seychelles.jpg";
import constanceEphelia from "@/assets/resorts/constance-ephelia.jpg";
import mangoHouse from "@/assets/resorts/mango-house-seychelles.jpg";
import anantaraMaia from "@/assets/resorts/anantara-maia-seychelles.jpg";
import hiltonNortholme from "@/assets/resorts/hilton-northolme.jpg";

import oneOnlyMauritius from "@/assets/resorts/oneandonly-mauritius.jpg";
import stRegisMauritius from "@/assets/resorts/st-regis-mauritius.jpg";
import fourSeasonsMauritius from "@/assets/resorts/four-seasons-mauritius.jpg";
import shangrila from "@/assets/resorts/shangri-la-mauritius.jpg";
import oberoiMauritius from "@/assets/resorts/oberoi-mauritius.jpg";
import constancePrince from "@/assets/resorts/constance-prince-maurice.jpg";
import luxBelleMare from "@/assets/resorts/lux-belle-mare.jpg";
import constanceBelleMare from "@/assets/resorts/constance-belle-mare.jpg";

import santoriniHero from "@/assets/destinations/greece-santorini.jpg";
import mykonosHero from "@/assets/destinations/greece-mykonos.jpg";
import greeceAthens from "@/assets/destinations/greece-athens.jpg";
import greeceCrete from "@/assets/destinations/greece-crete.jpg";

import londonHero from "@/assets/destinations/london-hero.jpg";
import londonLuxury from "@/assets/resorts/london-luxury.jpg";

import dubaiLuxury from "@/assets/resorts/dubai-luxury.jpg";

import baliResort from "@/assets/resorts/bali-clifftop-resort.jpg";

import cruiseHero from "@/assets/destinations/cruise-hero.jpg";

import heroImage from "@/assets/resorts/luxury-infinity-pool.jpg";

interface Hotel {
  name: string;
  image: string;
  description: string;
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
      { name: "Soneva Fushi", image: soneva, description: "An ultra-luxury barefoot escape on a pristine private island, offering world-class dining, open-air cinemas, and unparalleled natural beauty." },
      { name: "Cheval Blanc Randheli", image: chevalBlanc, description: "LVMH's exclusive Maldivian retreat featuring contemporary design, Guerlain spa, and personalized butler service." },
      { name: "One&Only Reethi Rah", image: oneOnlyReethi, description: "Sprawling over-water villas and pristine beaches on one of the largest resort islands in the Maldives." },
      { name: "The St. Regis Maldives Vommuli Resort", image: stRegisMaldives, description: "Architectural masterpiece with iconic overwater villas, legendary St. Regis Butler Service, and world-class diving." },
      { name: "Waldorf Astoria Maldives Ithaafushi", image: waldorfMaldives, description: "Three private islands of uncompromising luxury with 11 dining venues and the largest spa in the Maldives." },
      { name: "Four Seasons Resort Maldives at Landaa Giraavaru", image: fourSeasonsLandaa, description: "UNESCO Biosphere Reserve location with pioneering marine discovery center and Ayurvedic spa." },
      { name: "The Ritz-Carlton Maldives, Fari Islands", image: ritzCarltonMaldives, description: "Contemporary island sanctuary with overwater and beach villas, featuring Ritz-Carlton's legendary service." },
      { name: "Velaa Private Island", image: velaaMaldives, description: "The epitome of bespoke luxury with private residences, golf academy, and exclusive fine dining." },
      { name: "Kandima Maldives", image: kandimaMaldives, description: "Vibrant lifestyle resort offering endless activities, diverse dining, and stunning ocean pool villas." },
      { name: "The Standard, Huruvalhi Maldives", image: standardMaldives, description: "Trendy, design-forward resort bringing urban sophistication to paradise with playful luxury experiences." },
      { name: "Furaveri Maldives", image: furaveriMaldives, description: "Authentic Maldivian hospitality on a stunning natural island with exceptional house reef snorkeling." },
      { name: "Patina Maldives, Fari Islands", image: patinaMaldives, description: "Contemporary wellness sanctuary designed by Brazilian architect Marcio Kogan with sustainability at heart." },
      { name: "JOALI Maldives", image: joaliMaldives, description: "Art-immersive luxury resort showcasing curated installations by renowned international artists." },
      { name: "Anantara Kihavah Maldives Villas", image: anantaraKihavah, description: "Award-winning resort with underwater restaurant, world-class observatory, and exceptional diving." },
    ]
  },
  {
    name: "Seychelles",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "North Island", image: northIsland, description: "Ultra-exclusive private island sanctuary where royalty and celebrities find ultimate privacy and natural beauty." },
      { name: "Four Seasons Resort Seychelles", image: fourSeasonsSeychelles, description: "Hillside and oceanfront villas on Mahé with spectacular views and private plunge pools." },
      { name: "Six Senses Zil Pasyon", image: sixSensesSeychelles, description: "Private island wellness retreat on Félicité with holistic spa and sustainable luxury philosophy." },
      { name: "Raffles Seychelles", image: rafflesSeychelles, description: "Elegant hillside villas on Praslin overlooking pristine beaches with legendary Raffles hospitality." },
      { name: "Constance Ephelia", image: constanceEphelia, description: "Sprawling beachfront resort on two stunning beaches with extensive family amenities and spa village." },
      { name: "Mango House Seychelles", image: mangoHouse, description: "LXR Hotels & Resorts collection boutique property with intimate luxury on Mahé's southern coast." },
      { name: "Anantara Maia Seychelles Villas", image: anantaraMaia, description: "All-villa resort with dedicated butlers, oceanfront dining, and exceptional privacy." },
      { name: "Hilton Seychelles Northolme Resort & Spa", image: hiltonNortholme, description: "Historic luxury resort perched on a hillside overlooking Beau Vallon with stunning sunset views." },
    ]
  },
  {
    name: "Mauritius",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "One&Only Le Saint Géran", image: oneOnlyMauritius, description: "Legendary beachfront resort on its own peninsula with championship golf and Givenchy spa." },
      { name: "The St. Regis Mauritius Resort", image: stRegisMauritius, description: "Colonial elegance meets contemporary luxury on Le Morne peninsula with exceptional butler service." },
      { name: "Four Seasons Resort Mauritius at Anahita", image: fourSeasonsMauritius, description: "Spacious villas with private pools on a pristine lagoon with Ernie Els signature golf course." },
      { name: "Shangri-La Le Touessrok, Mauritius", image: shangrila, description: "Iconic resort on Trou d'Eau Douce bay with two private island retreats and championship golf." },
      { name: "The Oberoi Mauritius", image: oberoiMauritius, description: "Intimate luxury resort in Turtle Bay with exceptional service and tranquil gardens." },
      { name: "Constance Prince Maurice", image: constancePrince, description: "Architectural marvel on stilts with floating restaurant and world-class spa sanctuary." },
      { name: "LUX* Belle Mare", image: luxBelleMare, description: "Vibrant beachfront resort with playful luxury, exceptional cuisine, and stunning beach." },
      { name: "Constance Belle Mare Plage", image: constanceBelleMare, description: "Two kilometers of pristine beach with two championship golf courses and gourmet dining." },
    ]
  },
  {
    name: "Santorini",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "Canaves Oia Epitome", image: santoriniHero, description: "Ultra-luxury cave suites perched on Santorini's caldera with private infinity pools and sunset views." },
      { name: "Grace Hotel Santorini", image: mykonosHero, description: "Intimate boutique hotel in Imerovigli with stunning champagne lounge and caldera panoramas." },
      { name: "Mystique, a Luxury Collection Hotel", image: greeceAthens, description: "Cave hotel carved into Oia's cliffs with infinity pools overlooking the volcano." },
      { name: "Andronis Arcadia", image: greeceCrete, description: "Contemporary wellness retreat in Oia with rooftop pool and holistic spa experiences." },
      { name: "Katikies Santorini", image: santoriniHero, description: "Iconic white-washed suites cascading down the caldera with legendary Greek hospitality." },
      { name: "Santo Maris Oia Luxury Suites & Spa", image: mykonosHero, description: "Cycladic architecture meets contemporary luxury with expansive spa and gourmet dining." },
    ]
  },
  {
    name: "London",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "The Ritz London", image: londonHero, description: "Legendary Piccadilly landmark offering timeless elegance, afternoon tea, and royal-approved luxury." },
      { name: "Claridge's", image: londonLuxury, description: "Art Deco masterpiece in Mayfair, beloved by royalty and celebrities for over a century." },
      { name: "The Savoy", image: londonHero, description: "Iconic Thames-side hotel blending Edwardian and Art Deco grandeur with theatrical flair." },
      { name: "The Connaught", image: londonLuxury, description: "Mayfair's most distinguished address with Michelin-starred Hélène Darroze restaurant." },
      { name: "Rosewood London", image: londonHero, description: "Edwardian splendor in High Holborn with stunning courtyard and world-class Sense spa." },
      { name: "The Lanesborough", image: londonLuxury, description: "Regency grandeur overlooking Hyde Park with 24-hour butler service and Michelin-starred dining." },
      { name: "Four Seasons Hotel London at Ten Trinity Square", image: londonHero, description: "Historic landmark near the Tower of London with La Dame de Pic and exclusive members' club." },
      { name: "Bulgari Hotel London", image: londonLuxury, description: "Italian glamour in Knightsbridge with stunning spa, cinema, and exclusive boutique." },
    ]
  },
  {
    name: "Dubai",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "Burj Al Arab Jumeirah", image: dubaiLuxury, description: "The world's most iconic luxury hotel, offering unparalleled opulence and legendary Arabian hospitality." },
      { name: "Atlantis The Royal", image: dubaiLuxury, description: "Ultra-luxury beachfront resort with celebrity restaurants, Aquaventure, and stunning architecture." },
      { name: "One&Only The Palm", image: dubaiLuxury, description: "Intimate Arabian-inspired sanctuary on Palm Jumeirah with pristine private beach." },
      { name: "Four Seasons Resort Dubai at Jumeirah Beach", image: dubaiLuxury, description: "Beachfront Mediterranean-inspired resort with exceptional dining and world-class spa." },
      { name: "Armani Hotel Dubai", image: dubaiLuxury, description: "Giorgio Armani's design vision in the iconic Burj Khalifa with minimalist Italian luxury." },
      { name: "Jumeirah Al Naseem", image: dubaiLuxury, description: "Contemporary beachfront luxury with turtle rehabilitation sanctuary and Burj Al Arab views." },
      { name: "Waldorf Astoria Dubai Palm Jumeirah", image: dubaiLuxury, description: "Art Deco elegance on Palm Jumeirah with private beach and legendary Waldorf service." },
      { name: "Raffles Dubai", image: dubaiLuxury, description: "Egyptian-inspired pyramid landmark with legendary butler service and rooftop garden." },
    ]
  },
  {
    name: "Bali",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "Four Seasons Resort Bali at Sayan", image: baliResort, description: "Riverside jungle sanctuary with dramatic entrance bridge and world-renowned Sacred River Spa." },
      { name: "Aman Villas at Nusa Dua", image: baliResort, description: "Clifftop minimalist villas with sweeping ocean views and legendary Aman service." },
      { name: "The Mulia, Mulia Resort & Villas", image: baliResort, description: "Grand beachfront resort with The Mulia Spa, nine restaurants, and pristine white sand beach." },
      { name: "COMO Shambhala Estate", image: baliResort, description: "Holistic wellness retreat in Ubud's jungle with life-changing health programs." },
      { name: "Mandapa, a Ritz-Carlton Reserve", image: baliResort, description: "Intimate riverside retreat with rice paddy views, organic farm, and exceptional wellness." },
      { name: "Bulgari Resort Bali", image: baliResort, description: "Cliffside Italian elegance in Uluwatu with dramatic ocean views and exclusive beach club." },
      { name: "The St. Regis Bali Resort", image: baliResort, description: "Beachfront grandeur in Nusa Dua with largest lagoon pool and St. Regis Butler Service." },
      { name: "Capella Ubud", image: baliResort, description: "Glamping tents in the rainforest designed by Bill Bensley with theatrical luxury." },
    ]
  },
  {
    name: "South Africa - Luxury Safari Lodges",
    icon: <Tent className="w-6 h-6" />,
    hotels: [
      { name: "Singita Sabi Sand", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", description: "Legendary private game reserve with world-class lodges, exceptional Big Five sightings, and conservation leadership." },
      { name: "Royal Malewane", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", description: "Colonial elegance in Greater Kruger with Africa House spa and exclusive bush experiences." },
      { name: "Londolozi Private Game Reserve", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80", description: "Pioneer of luxury safari with five distinct camps and legendary leopard sightings." },
      { name: "andBeyond Phinda Private Game Reserve", image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80", description: "Seven ecosystems, six lodges, and pioneering community conservation programs." },
      { name: "Ellerman House", image: londonLuxury, description: "Cape Town's most exclusive boutique hotel with art collection and panoramic ocean views." },
      { name: "The Silo Hotel", image: londonLuxury, description: "Architectural marvel atop Zeitz MOCAA with pillowed windows and V&A Waterfront views." },
      { name: "One&Only Cape Town", image: oneOnlyMauritius, description: "V&A Waterfront luxury with island spa, Nobu restaurant, and Table Mountain backdrop." },
      { name: "Saxon Hotel, Villas and Spa", image: londonLuxury, description: "Johannesburg's most exclusive hotel where Nelson Mandela completed his autobiography." },
    ]
  },
  {
    name: "Luxury Cruises",
    icon: <Ship className="w-6 h-6" />,
    hotels: [
      { name: "Regent Seven Seas Cruises", image: cruiseHero, description: "The most inclusive luxury cruise experience with all-suite ships and world-class cuisine." },
      { name: "Silversea Cruises", image: cruiseHero, description: "Italian elegance at sea with intimate ships, butler service, and expedition voyages." },
      { name: "Seabourn Cruise Line", image: cruiseHero, description: "Ultra-luxury intimate ships with award-winning cuisine and destination immersion." },
      { name: "Crystal Cruises", image: cruiseHero, description: "Legendary luxury cruise line known for spacious suites and exceptional service." },
      { name: "Oceania Cruises", image: cruiseHero, description: "Finest cuisine at sea with destination-focused itineraries and intimate ship atmosphere." },
      { name: "Viking Ocean Cruises", image: cruiseHero, description: "Scandinavian elegance with cultural enrichment and destination-focused voyages." },
      { name: "The Ritz-Carlton Yacht Collection", image: cruiseHero, description: "Legendary Ritz-Carlton service at sea with bespoke itineraries and personalized experiences." },
      { name: "Explora Journeys", image: cruiseHero, description: "MSC's ultra-luxury brand offering European sophistication and ocean-state-of-mind philosophy." },
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
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{hotel.description}</p>

        {/* Quote Request Form */}
        <div className="space-y-4 bg-gray-50 rounded-xl p-5">
          <h4 className="font-semibold text-[#1e3a5f] flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5" />
            Request a Quote
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor={`name-${hotel.name}`} className="text-sm font-medium text-gray-700">Full Name *</Label>
              <Input
                id={`name-${hotel.name}`}
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`adults-${hotel.name}`} className="text-sm font-medium text-gray-700">Number of Adults *</Label>
              <Select value={formData.adults} onValueChange={(value) => handleInputChange("adults", value)}>
                <SelectTrigger className="mt-1">
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
              <Label htmlFor={`kids-${hotel.name}`} className="text-sm font-medium text-gray-700">Number of Kids</Label>
              <Select value={formData.kids} onValueChange={(value) => handleInputChange("kids", value)}>
                <SelectTrigger className="mt-1">
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
              <div className="md:col-span-2">
                <Label htmlFor={`ages-${hotel.name}`} className="text-sm font-medium text-gray-700">Ages of Kids</Label>
                <Input
                  id={`ages-${hotel.name}`}
                  placeholder="e.g., 5, 8, 12"
                  value={formData.kidsAges}
                  onChange={(e) => handleInputChange("kidsAges", e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <Label htmlFor={`dates-${hotel.name}`} className="text-sm font-medium text-gray-700">Travel Dates</Label>
              <Input
                id={`dates-${hotel.name}`}
                placeholder="e.g., March 15-22, 2025"
                value={formData.travelDates}
                onChange={(e) => handleInputChange("travelDates", e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor={`occasion-${hotel.name}`} className="text-sm font-medium text-gray-700">Special Occasion</Label>
              <Select value={formData.occasion} onValueChange={(value) => handleInputChange("occasion", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select occasion (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {specialOccasions.map(occasion => (
                    <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor={`requests-${hotel.name}`} className="text-sm font-medium text-gray-700">Additional Requests</Label>
              <Textarea
                id={`requests-${hotel.name}`}
                placeholder="Any special requirements, room preferences, dietary needs..."
                value={formData.requests}
                onChange={(e) => handleInputChange("requests", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3 text-lg gap-2">
              <MessageCircle className="w-5 h-5" />
              Ask for a Quote
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

const PartnerHotels = () => {
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

        {/* Destination Sections */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {destinations.map((destination, index) => (
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
              {index < destinations.length - 1 && (
                <div className="mt-16 flex items-center justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#1e3a5f]/30 to-transparent rounded-full" />
                </div>
              )}
            </section>
          ))}
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default PartnerHotels;
