import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Star, 
  Plane, 
  UtensilsCrossed, 
  Sparkles, 
  Wine, 
  Anchor, 
  Waves, 
  Glasses,
  Wifi,
  Dumbbell,
  Utensils,
  Coffee,
  Ship,
  Users,
  Heart,
  Flower2,
  Sailboat,
  MapPin,
  Search,
  Filter,
  Camera,
  Palmtree
} from "lucide-react";

// Resort Images
import cocoonAerial from "@/assets/resorts/you-and-me-cocoon-aerial.jpg";
import furaveriHero from "@/assets/resorts/furaveri-aerial-hero.png";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Package data structure
interface PackageData {
  id: string;
  image: string;
  hotelName: string;
  location: string;
  destination: string;
  stars: number;
  description: string;
  amenityIcons: { icon: React.ElementType; label: string }[];
  inclusions: string[];
  nights: number;
  price: string;
  priceNote?: string;
  transferType?: string;
  whatsappMessage: string;
  validUntil?: string;
}

// All packages data
const packagesData: PackageData[] = [
  // OZEN Reserve Bolifushi
  {
    id: "ozen-reserve",
    image: ozenReserve,
    hotelName: "OZEN Reserve Bolifushi",
    location: "South Malé Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Wine, label: "All-Inclusive" },
      { icon: Sparkles, label: "Spa" },
      { icon: UtensilsCrossed, label: "Fine Dining" },
      { icon: Waves, label: "Water Sports" }
    ],
    description: "Ultra-luxury all-inclusive sanctuary with underwater restaurant, private butler service, and infinite indulgence concept.",
    inclusions: [
      "Earth Pool Villa with private pool",
      "RESERVE Plan All-Inclusive",
      "Return speedboat transfers",
      "60-min spa treatment"
    ],
    nights: 4,
    price: "$6,200",
    priceNote: "for 2 people",
    transferType: "Speedboat",
    whatsappMessage: "Hi! I'm interested in the OZEN Reserve Bolifushi package for 4 nights at $6,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Atmosphere Kanifushi
  {
    id: "atmosphere-kanifushi",
    image: anantaraKihavah,
    hotelName: "Atmosphere Kanifushi Maldives",
    location: "Lhaviyani Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Wine, label: "All-Inclusive" },
      { icon: Utensils, label: "6 Restaurants" },
      { icon: Waves, label: "Water Sports" },
      { icon: Sparkles, label: "Spa" }
    ],
    description: "Award-winning Platinum Plus all-inclusive with 6 restaurants, unlimited spa, and stunning sunset beach villas.",
    inclusions: [
      "Sunset Beach Villa",
      "Platinum Plus All-Inclusive",
      "Return seaplane transfers",
      "Unlimited spa treatments"
    ],
    nights: 4,
    price: "$4,800",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in the Atmosphere Kanifushi package for 4 nights at $4,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Kudadoo Private Island
  {
    id: "kudadoo",
    image: velaaMaldives,
    hotelName: "Kudadoo Private Island",
    location: "Lhaviyani Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Heart, label: "Adults Only" },
      { icon: Wine, label: "All-Inclusive" },
      { icon: Sparkles, label: "Spa" },
      { icon: Anchor, label: "Private Island" }
    ],
    description: "Ultra-luxury adults-only private island with limitless experiences, personal butler, and sustainable luxury.",
    inclusions: [
      "Ocean Residence with pool",
      "Anything Anytime Anywhere concept",
      "Return seaplane transfers",
      "Personal butler service"
    ],
    nights: 3,
    price: "$8,500",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in Kudadoo Private Island for 3 nights at $8,500 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Constance Halaveli
  {
    id: "constance-halaveli",
    image: constanceBelleMare,
    hotelName: "Constance Halaveli",
    location: "North Ari Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Utensils, label: "Half Board" },
      { icon: Glasses, label: "Diving" },
      { icon: Sparkles, label: "U Spa" },
      { icon: Waves, label: "Water Sports" }
    ],
    description: "Elegant Mauritian hospitality with exceptional diving, U Spa by Constance, and world-class water villas.",
    inclusions: [
      "Water Villa",
      "Half Board dining",
      "Return seaplane transfers",
      "Sunset dolphin cruise"
    ],
    nights: 4,
    price: "$5,400",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in Constance Halaveli for 4 nights at $5,400 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Sun Siyam Iru Fushi
  {
    id: "sun-siyam-iru-fushi",
    image: siyamWorld,
    hotelName: "Sun Siyam Iru Fushi",
    location: "Noonu Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Wine, label: "All-Inclusive" },
      { icon: Utensils, label: "21 Restaurants" },
      { icon: Sparkles, label: "Spa" },
      { icon: Users, label: "Family" }
    ],
    description: "Premium all-inclusive paradise with 21 restaurants, extensive spa, and family-friendly amenities on a natural island.",
    inclusions: [
      "Beach Villa with pool",
      "Premium All-Inclusive",
      "Return seaplane transfers",
      "Kids stay free"
    ],
    nights: 4,
    price: "$4,200",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in Sun Siyam Iru Fushi for 4 nights at $4,200 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // LUX* South Ari Atoll
  {
    id: "lux-south-ari",
    image: luxBelleMare,
    hotelName: "LUX* South Ari Atoll",
    location: "South Ari Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Utensils, label: "Half Board" },
      { icon: Glasses, label: "Whale Sharks" },
      { icon: Sparkles, label: "LUX Me Spa" },
      { icon: Waves, label: "Water Sports" }
    ],
    description: "Playfully elegant resort famous for whale shark encounters, LUX* surprises, and vibrant island atmosphere.",
    inclusions: [
      "Beach Pool Villa",
      "Half Board Plus",
      "Return seaplane transfers",
      "Sunset fishing excursion"
    ],
    nights: 4,
    price: "$4,600",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in LUX* South Ari Atoll for 4 nights at $4,600 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Emerald Maldives
  {
    id: "emerald-maldives",
    image: fairmont,
    hotelName: "Emerald Maldives Resort & Spa",
    location: "Raa Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Wine, label: "All-Inclusive" },
      { icon: Sparkles, label: "Spa" },
      { icon: Waves, label: "Water Sports" },
      { icon: Utensils, label: "Fine Dining" }
    ],
    description: "Italian design meets Maldivian paradise with Deluxe All-Inclusive concept and stunning overwater villas.",
    inclusions: [
      "Beach Villa with pool",
      "Deluxe All-Inclusive",
      "Return seaplane transfers",
      "Daily minibar refill"
    ],
    nights: 4,
    price: "$4,100",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in Emerald Maldives for 4 nights at $4,100 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Conrad Maldives Rangali Island
  {
    id: "conrad-rangali",
    image: niyama,
    hotelName: "Conrad Maldives Rangali Island",
    location: "South Ari Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: UtensilsCrossed, label: "Ithaa Restaurant" },
      { icon: Sparkles, label: "The Spa Retreat" },
      { icon: Glasses, label: "Diving" },
      { icon: Anchor, label: "Two Islands" }
    ],
    description: "Iconic two-island resort featuring the world's first underwater restaurant Ithaa and legendary Maldivian hospitality.",
    inclusions: [
      "Superior Water Villa",
      "Half Board dining",
      "Return seaplane transfers",
      "Ithaa dinner experience"
    ],
    nights: 4,
    price: "$5,800",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in Conrad Maldives Rangali Island for 4 nights at $5,800 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // You & Me by Cocoon
  {
    id: "you-me-cocoon",
    image: cocoonAerial,
    hotelName: "You & Me by Cocoon Maldives",
    location: "Raa Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Heart, label: "Adults Only" },
      { icon: Wine, label: "All-Inclusive" },
      { icon: Utensils, label: "5 Restaurants" },
      { icon: Waves, label: "Water Sports" }
    ],
    description: "An intimate adults-only sanctuary with Premium All-Inclusive experience. Features H2O Underwater Restaurant and overwater villas with private pools.",
    inclusions: [
      "Stay in an Aqua Suite with Pool",
      "Premium All-Inclusive dining",
      "Return Seaplane transfers"
    ],
    nights: 3,
    price: "$3,300",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in the You & Me by Cocoon Maldives package for 3 nights at $3,300 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Furaveri Maldives
  {
    id: "furaveri",
    image: furaveriHero,
    hotelName: "Furaveri Maldives",
    location: "Raa Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Utensils, label: "Half Board" },
      { icon: Sparkles, label: "Spa" },
      { icon: Sailboat, label: "Sunset Cruise" },
      { icon: Waves, label: "Water Sports" }
    ],
    description: "Ocean Pool Villa Package with Floating Breakfast, Sunset Cruise & 60-min Spa Massage. Perfect for couples and honeymooners.",
    inclusions: [
      "Stay in an Ocean Pool Villa",
      "Half Board meals",
      "Floating Breakfast & Sunset Cruise"
    ],
    nights: 3,
    price: "$4,400",
    priceNote: "for 3 people",
    transferType: "Speedboat",
    whatsappMessage: "Hi! I'm interested in the Furaveri Maldives 3 nights package at USD 4,400 for 3 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Kandima Maldives
  {
    id: "kandima",
    image: maldivesKandinma,
    hotelName: "Kandima Maldives",
    location: "Dhaalu Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Dumbbell, label: "Fitness" },
      { icon: Users, label: "Family Friendly" },
      { icon: Camera, label: "Entertainment" },
      { icon: Waves, label: "Water Sports" }
    ],
    description: "A game-changing lifestyle resort with endless activities. Features the longest outdoor pool in the Maldives and vibrant nightlife.",
    inclusions: [
      "Stay in an Ocean Pool Villa",
      "Full Board Plus meals",
      "Group yoga & photoshoot"
    ],
    nights: 4,
    price: "$3,700",
    priceNote: "for 2 people",
    transferType: "Domestic + Speedboat",
    whatsappMessage: "Hi! I'm interested in the Kandima Maldives 4 nights package at $3,700 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  },
  // Madifushi Private Island
  {
    id: "madifushi",
    image: waldorfMaldives,
    hotelName: "Madifushi Private Island",
    location: "South Malé Atoll",
    destination: "Maldives",
    stars: 5,
    amenityIcons: [
      { icon: Anchor, label: "Private Island" },
      { icon: Sparkles, label: "Mandara Spa" },
      { icon: UtensilsCrossed, label: "Floating Breakfast" },
      { icon: Glasses, label: "Snorkeling" }
    ],
    description: "Water Pool Villa Experience with Half Board & Seaplane Transfer. Features Mandara Spa and exclusive island atmosphere.",
    inclusions: [
      "Stay in a Water Pool Villa",
      "Half Board meals at BlueFin",
      "Shared Seaplane transfers"
    ],
    nights: 3,
    price: "$4,600",
    priceNote: "for 2 people",
    transferType: "Seaplane",
    whatsappMessage: "Hi! I'm interested in the Madifushi Private Island Water Pool Villa package for 3 nights at $4,600 for 2 people. Please send availability.",
    validUntil: "30 April 2025"
  }
];

// Get unique destinations
const destinations = [...new Set(packagesData.map(p => p.destination))];

// Package Card Component - dnata style
const PackageCard = ({ pkg }: { pkg: PackageData }) => {
  const whatsappNumber = "971567622484";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.hotelName}
          className="w-full h-full object-cover"
        />
        {/* Valid Until Badge */}
        {pkg.validUntil && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-amber-500 text-white text-xs">
              Valid until {pkg.validUntil}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Hotel Name & Location */}
        <h3 className="text-[#1e3a5f] font-bold text-lg uppercase tracking-wide">
          {pkg.hotelName}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#1e3a5f]/70 text-sm">{pkg.location}</span>
          <div className="flex">
            {[...Array(pkg.stars)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#1e3a5f] text-[#1e3a5f]" />
            ))}
          </div>
        </div>

        {/* Amenity Icons - Green circles like dnata */}
        <div className="flex gap-2 mb-3">
          {pkg.amenityIcons.slice(0, 4).map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center"
                title={item.label}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-[#1e3a5f]/80 text-sm mb-3 line-clamp-3">
          {pkg.description}
        </p>

        {/* Inclusions */}
        <div className="mb-4">
          <p className="text-[#1e3a5f] font-semibold text-sm mb-1">Inclusions:</p>
          <ul className="text-[#1e3a5f]/70 text-sm space-y-0.5">
            {pkg.inclusions.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Price Bar - dnata style */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-[#1e3a5f]/60">{pkg.nights === 1 ? 'One' : pkg.nights}</p>
              <p className="text-xs text-[#1e3a5f]/60">{pkg.nights === 1 ? 'night' : 'nights'}</p>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <p className="text-xs text-[#1e3a5f]/60">From</p>
              <p className="text-[#1e3a5f] font-bold text-lg">{pkg.price}</p>
              <p className="text-xs text-[#1e3a5f]/60">{pkg.priceNote}</p>
            </div>
          </div>

          {/* Transfer Type Badge */}
          {pkg.transferType && (
            <div className="flex items-center gap-1 text-xs text-[#1e3a5f]/70 bg-gray-100 px-2 py-1 rounded">
              <Plane className="w-3 h-3" />
              <span>{pkg.transferType}</span>
            </div>
          )}
        </div>

        {/* WhatsApp Button */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pkg.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3"
        >
          <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-2">
            <MessageCircle className="w-4 h-4 mr-2" />
            Book via WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
};

const Packages = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPackages = useMemo(() => {
    return packagesData.filter(pkg => {
      const matchesDestination = selectedDestination === "all" || pkg.destination === selectedDestination;
      const matchesSearch = searchQuery === "" || 
        pkg.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDestination && matchesSearch;
    });
  }, [selectedDestination, searchQuery]);

  // Group packages by destination
  const groupedPackages = useMemo(() => {
    const groups: { [key: string]: PackageData[] } = {};
    filteredPackages.forEach(pkg => {
      if (!groups[pkg.destination]) {
        groups[pkg.destination] = [];
      }
      groups[pkg.destination].push(pkg);
    });
    return groups;
  }, [filteredPackages]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Luxury Resort Packages - Maldives, Seychelles & More | ResortsOffers.com</title>
        <meta name="description" content="Book exclusive luxury resort packages. Premium all-inclusive deals at top Maldives resorts with special inclusions." />
        <link rel="canonical" href="https://www.resortsoffers.com/packages" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-[#1e3a5f] to-[#1e3a5f]/90">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            Resort Packages
          </h1>
          <p className="text-lg text-white/80">
            Hand-picked luxury experiences with premium inclusions
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search resorts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            {/* Destination Filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter className="w-4 h-4 text-[#1e3a5f]" />
              <span className="text-sm text-[#1e3a5f] font-medium">Destination:</span>
              <Button
                variant={selectedDestination === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDestination("all")}
                className={selectedDestination === "all" ? "bg-[#1e3a5f]" : ""}
              >
                All
              </Button>
              {destinations.map(dest => (
                <Button
                  key={dest}
                  variant={selectedDestination === dest ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDestination(dest)}
                  className={selectedDestination === dest ? "bg-[#1e3a5f]" : ""}
                >
                  <Palmtree className="w-3 h-3 mr-1" />
                  {dest}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages by Destination */}
      {Object.entries(groupedPackages).map(([destination, packages]) => (
        <section key={destination} className="py-12 bg-white">
          <div className="container-custom">
            {/* Section Header - dnata style */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                <h2 className="text-xl font-bold text-[#1e3a5f] uppercase tracking-wider">
                  {destination} Special Offers
                </h2>
              </div>
              <div className="h-1 w-20 bg-[#1e3a5f]"></div>
            </div>

            {/* Packages Grid - 2 columns like dnata */}
            <div className="grid md:grid-cols-2 gap-6">
              {packages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* No Results */}
      {filteredPackages.length === 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom text-center">
            <p className="text-[#1e3a5f]/60 text-lg">No packages found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => { setSelectedDestination("all"); setSearchQuery(""); }}
            >
              Clear Filters
            </Button>
          </div>
        </section>
      )}

      {/* Honeymoon Extras Section */}
      <section className="py-8 bg-rose-50">
        <div className="container-custom">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-rose-200">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="text-lg font-bold text-[#1e3a5f]">Honeymoon Special Benefits</h3>
            </div>
            <p className="text-[#1e3a5f]/70 text-sm mb-4">
              All honeymoon bookings receive complimentary extras (proof of marriage required within 6 months):
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-[#1e3a5f] text-sm">
                <Flower2 className="w-4 h-4 text-rose-500" />
                <span>Fruit basket on arrival</span>
              </div>
              <div className="flex items-center gap-2 text-[#1e3a5f] text-sm">
                <Wine className="w-4 h-4 text-rose-500" />
                <span>Sparkling drink</span>
              </div>
              <div className="flex items-center gap-2 text-[#1e3a5f] text-sm">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Flower bed decoration</span>
              </div>
              <div className="flex items-center gap-2 text-[#1e3a5f] text-sm">
                <Utensils className="w-4 h-4 text-rose-500" />
                <span>Beach dinner (selected resorts)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer Types Info */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">Transfer Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 bg-[#1e3a5f]/5 rounded-lg">
                <Plane className="w-5 h-5 text-[#1e3a5f] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1e3a5f] text-sm">Seaplane</p>
                  <p className="text-xs text-[#1e3a5f]/70">Scenic 25-45 min flight directly to resort</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-[#1e3a5f]/5 rounded-lg">
                <Ship className="w-5 h-5 text-[#1e3a5f] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1e3a5f] text-sm">Speedboat</p>
                  <p className="text-xs text-[#1e3a5f]/70">20-90 min boat ride from Malé airport</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-[#1e3a5f]/5 rounded-lg">
                <div className="flex gap-1">
                  <Plane className="w-5 h-5 text-[#1e3a5f] mt-0.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#1e3a5f] text-sm">Domestic + Speedboat</p>
                  <p className="text-xs text-[#1e3a5f]/70">Domestic flight + short boat transfer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validity Notice */}
      <section className="py-6 bg-white">
        <div className="container-custom text-center">
          <Badge className="bg-amber-100 text-amber-800 text-sm px-4 py-2">
            All packages valid until 30 April 2025 • Subject to availability
          </Badge>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
