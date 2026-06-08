import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ship, Anchor, MapPin, Clock, Heart, Sparkles, Users, Search, X, MessageCircle, Calendar, Star } from "lucide-react";

// Import cruise images
import disneyCruise from "@/assets/resorts/disney-cruise.jpg";
import cruiseHero from "@/assets/destinations/cruise-hero.jpg";

type CruiseLine = "all" | "disney" | "royal-caribbean" | "msc" | "celebrity" | "norwegian";
type Destination = "all" | "caribbean" | "bahamas" | "mediterranean" | "alaska" | "europe";
type Duration = "all" | "3-4" | "5-7" | "8-12" | "13+";

interface Cruise {
  id: string;
  name: string;
  cruiseLine: CruiseLine;
  ship: string;
  image: string;
  destination: Destination;
  duration: number;
  durationLabel: string;
  ports: string[];
  description: string;
  price: string;
  priceNote: string;
  highlights: string[];
  isFamily?: boolean;
  isRomantic?: boolean;
  isLuxury?: boolean;
  departurePort: string;
}

const cruises: Cruise[] = [
  // Disney Cruises
  {
    id: "disney-caribbean-7",
    name: "Disney Caribbean Magic",
    cruiseLine: "disney",
    ship: "Disney Fantasy",
    image: disneyCruise,
    destination: "caribbean",
    duration: 7,
    durationLabel: "7 Nights",
    ports: ["Port Canaveral", "Cozumel", "Grand Cayman", "Castaway Cay"],
    description: "Experience Disney magic at sea with character meet & greets, Broadway-style shows, and the exclusive Castaway Cay island.",
    price: "$5,800",
    priceNote: "for family of 4",
    highlights: ["Character Dining", "Kids Club", "Castaway Cay", "Fireworks at Sea"],
    isFamily: true,
    departurePort: "Port Canaveral, Florida"
  },
  {
    id: "disney-bahamas-4",
    name: "Disney Bahamas Escape",
    cruiseLine: "disney",
    ship: "Disney Dream",
    image: disneyCruise,
    destination: "bahamas",
    duration: 4,
    durationLabel: "4 Nights",
    ports: ["Port Canaveral", "Nassau", "Castaway Cay"],
    description: "Perfect short getaway with Disney entertainment, private island paradise, and world-class family amenities.",
    price: "$3,200",
    priceNote: "for family of 4",
    highlights: ["Private Island", "Character Meet & Greets", "AquaDuck Water Coaster", "Themed Dining"],
    isFamily: true,
    departurePort: "Port Canaveral, Florida"
  },
  {
    id: "disney-mediterranean-10",
    name: "Disney Mediterranean Adventure",
    cruiseLine: "disney",
    ship: "Disney Magic",
    image: disneyCruise,
    destination: "mediterranean",
    duration: 10,
    durationLabel: "10 Nights",
    ports: ["Barcelona", "Naples", "Civitavecchia (Rome)", "Livorno (Florence)", "Villefranche"],
    description: "Explore European wonders with Disney's signature service, from ancient ruins to Riviera glamour.",
    price: "$9,500",
    priceNote: "for family of 4",
    highlights: ["European Ports", "Adult-Only Areas", "Broadway Shows", "Animator's Palate"],
    isFamily: true,
    isLuxury: true,
    departurePort: "Barcelona, Spain"
  },
  {
    id: "disney-alaska-7",
    name: "Disney Alaska Glacier Wonder",
    cruiseLine: "disney",
    ship: "Disney Wonder",
    image: disneyCruise,
    destination: "alaska",
    duration: 7,
    durationLabel: "7 Nights",
    ports: ["Vancouver", "Ketchikan", "Juneau", "Skagway", "Tracy Arm Fjord"],
    description: "Witness majestic glaciers and wildlife while enjoying Disney's legendary entertainment and hospitality.",
    price: "$7,200",
    priceNote: "for family of 4",
    highlights: ["Glacier Viewing", "Wildlife Tours", "Whale Watching", "Port Adventures"],
    isFamily: true,
    departurePort: "Vancouver, Canada"
  },
  // Royal Caribbean
  {
    id: "royal-caribbean-7",
    name: "Royal Caribbean Eastern Voyage",
    cruiseLine: "royal-caribbean",
    ship: "Icon of the Seas",
    image: cruiseHero,
    destination: "caribbean",
    duration: 7,
    durationLabel: "7 Nights",
    ports: ["Miami", "Cozumel", "Roatan", "Costa Maya", "CocoCay"],
    description: "Sail on the world's largest cruise ship with groundbreaking attractions, dining, and entertainment.",
    price: "$4,500",
    priceNote: "per couple",
    highlights: ["Icon of the Seas", "Surfing Simulator", "CocoCay Private Island", "20+ Restaurants"],
    isFamily: true,
    isLuxury: true,
    departurePort: "Miami, Florida"
  },
  {
    id: "royal-mediterranean-12",
    name: "Royal Mediterranean Odyssey",
    cruiseLine: "royal-caribbean",
    ship: "Odyssey of the Seas",
    image: cruiseHero,
    destination: "mediterranean",
    duration: 12,
    durationLabel: "12 Nights",
    ports: ["Rome", "Naples", "Santorini", "Mykonos", "Dubrovnik", "Barcelona"],
    description: "Discover the Mediterranean's treasures aboard a revolutionary Quantum Ultra Class ship.",
    price: "$6,800",
    priceNote: "per couple",
    highlights: ["Greek Islands", "Croatia Coast", "SeaPlex Complex", "North Star Observation"],
    isRomantic: true,
    isLuxury: true,
    departurePort: "Rome (Civitavecchia), Italy"
  },
  {
    id: "royal-bahamas-3",
    name: "Royal Bahamas Weekend",
    cruiseLine: "royal-caribbean",
    ship: "Wonder of the Seas",
    image: cruiseHero,
    destination: "bahamas",
    duration: 3,
    durationLabel: "3 Nights",
    ports: ["Port Canaveral", "Nassau", "CocoCay"],
    description: "Quick escape to paradise with Perfect Day at CocoCay and Nassau's vibrant culture.",
    price: "$1,800",
    priceNote: "per couple",
    highlights: ["CocoCay Thrills", "Central Park", "AquaTheater Shows", "Bionic Bar"],
    isFamily: true,
    departurePort: "Port Canaveral, Florida"
  },
  // MSC Cruises
  {
    id: "msc-caribbean-7",
    name: "MSC Caribbean Explorer",
    cruiseLine: "msc",
    ship: "MSC World Europa",
    image: cruiseHero,
    destination: "caribbean",
    duration: 7,
    durationLabel: "7 Nights",
    ports: ["Miami", "Ocean Cay", "Cozumel", "George Town", "Ocho Rios"],
    description: "European elegance meets Caribbean paradise with MSC's innovative World Europa ship.",
    price: "$3,200",
    priceNote: "per couple",
    highlights: ["Ocean Cay MSC Reserve", "Luna Park", "Luxury Yacht Club", "Le Cabaret Rouge"],
    isFamily: true,
    departurePort: "Miami, Florida"
  },
  {
    id: "msc-mediterranean-10",
    name: "MSC Mediterranean Splendor",
    cruiseLine: "msc",
    ship: "MSC Seascape",
    image: cruiseHero,
    destination: "mediterranean",
    duration: 10,
    durationLabel: "10 Nights",
    ports: ["Genoa", "Marseille", "Barcelona", "Tunis", "Malta", "Messina"],
    description: "Experience Italian craftsmanship and Mediterranean charm on MSC's stunning Seascape.",
    price: "$4,500",
    priceNote: "per couple",
    highlights: ["Italian Design", "Aurea Spa", "MSC Yacht Club", "Specialty Dining"],
    isRomantic: true,
    departurePort: "Genoa, Italy"
  },
  // Celebrity Cruises
  {
    id: "celebrity-caribbean-8",
    name: "Celebrity Caribbean Retreat",
    cruiseLine: "celebrity",
    ship: "Celebrity Edge",
    image: cruiseHero,
    destination: "caribbean",
    duration: 8,
    durationLabel: "8 Nights",
    ports: ["Fort Lauderdale", "San Juan", "St. Maarten", "St. Thomas", "Grand Cayman"],
    description: "Sophisticated luxury with Celebrity's innovative Edge-class ship and world-renowned service.",
    price: "$5,200",
    priceNote: "per couple",
    highlights: ["Magic Carpet", "The Retreat", "Rooftop Garden", "Michelin-Level Dining"],
    isRomantic: true,
    isLuxury: true,
    departurePort: "Fort Lauderdale, Florida"
  },
  {
    id: "celebrity-europe-14",
    name: "Celebrity Northern Europe",
    cruiseLine: "celebrity",
    ship: "Celebrity Apex",
    image: cruiseHero,
    destination: "europe",
    duration: 14,
    durationLabel: "14 Nights",
    ports: ["Southampton", "Amsterdam", "Copenhagen", "Stockholm", "Helsinki", "St. Petersburg", "Tallinn"],
    description: "Explore Scandinavia and the Baltic capitals with Celebrity's award-winning service.",
    price: "$8,900",
    priceNote: "per couple",
    highlights: ["Baltic Capitals", "White Nights", "Eden Restaurant", "Infinite Verandas"],
    isLuxury: true,
    isRomantic: true,
    departurePort: "Southampton, UK"
  },
  // Norwegian Cruise Line
  {
    id: "norwegian-caribbean-7",
    name: "Norwegian Caribbean Freestyle",
    cruiseLine: "norwegian",
    ship: "Norwegian Viva",
    image: cruiseHero,
    destination: "caribbean",
    duration: 7,
    durationLabel: "7 Nights",
    ports: ["Miami", "Great Stirrup Cay", "Puerto Plata", "St. Thomas", "Tortola"],
    description: "Freestyle cruising at its finest with NCL's newest Prima-class ship and flexible dining.",
    price: "$3,800",
    priceNote: "per couple",
    highlights: ["Prima Speedway", "Ocean Boulevard", "Indulge Food Hall", "The Drop Waterslide"],
    isFamily: true,
    departurePort: "Miami, Florida"
  },
  {
    id: "norwegian-alaska-9",
    name: "Norwegian Alaska Explorer",
    cruiseLine: "norwegian",
    ship: "Norwegian Bliss",
    image: cruiseHero,
    destination: "alaska",
    duration: 9,
    durationLabel: "9 Nights",
    ports: ["Seattle", "Ketchikan", "Juneau", "Skagway", "Glacier Bay", "Victoria"],
    description: "Purpose-built for Alaska with panoramic observation lounges and glacier viewing.",
    price: "$5,500",
    priceNote: "per couple",
    highlights: ["Observation Lounge", "Glacier Bay", "Laser Tag", "Go-Kart Track"],
    isFamily: true,
    departurePort: "Seattle, Washington"
  }
];

const cruiseLineOptions = [
  { value: "all", label: "All Cruise Lines" },
  { value: "disney", label: "Disney Cruise Line" },
  { value: "royal-caribbean", label: "Royal Caribbean" },
  { value: "msc", label: "MSC Cruises" },
  { value: "celebrity", label: "Celebrity Cruises" },
  { value: "norwegian", label: "Norwegian Cruise Line" }
];

const destinationOptions = [
  { value: "all", label: "All Destinations" },
  { value: "caribbean", label: "Caribbean" },
  { value: "bahamas", label: "Bahamas" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "alaska", label: "Alaska" },
  { value: "europe", label: "Northern Europe" }
];

const durationOptions = [
  { value: "all", label: "Any Duration" },
  { value: "3-4", label: "3-4 Nights" },
  { value: "5-7", label: "5-7 Nights" },
  { value: "8-12", label: "8-12 Nights" },
  { value: "13+", label: "13+ Nights" }
];

const CruiseCard = ({ cruise }: { cruise: Cruise }) => {
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${cruise.name} (${cruise.durationLabel}) on ${cruise.ship} at ${cruise.price} ${cruise.priceNote}. Please send me availability and booking details.`
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={cruise.image} 
          alt={cruise.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {cruise.isFamily && (
            <Badge className="bg-emerald-500/90 text-white">
              <Users className="w-3 h-3 mr-1" />
              Family
            </Badge>
          )}
          {cruise.isRomantic && (
            <Badge className="bg-rose-500/90 text-white">
              <Heart className="w-3 h-3 mr-1" />
              Romantic
            </Badge>
          )}
          {cruise.isLuxury && (
            <Badge className="bg-amber-500/90 text-white tracking-widest uppercase text-[10px]">
              Luxury
            </Badge>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-[#003B95] text-white">
            <Clock className="w-3 h-3 mr-1" />
            {cruise.durationLabel}
          </Badge>
        </div>

        {/* Ship Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-sm flex items-center gap-1">
            <Ship className="w-4 h-4" />
            {cruise.ship}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{cruise.name}</h3>
        <p className="text-sm text-[#003B95] font-medium mb-2 flex items-center gap-1">
          <Anchor className="w-4 h-4" />
          {cruiseLineOptions.find(c => c.value === cruise.cruiseLine)?.label}
        </p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cruise.description}</p>

        {/* Ports */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Ports of Call:
          </p>
          <div className="flex flex-wrap gap-1">
            {cruise.ports.slice(0, 4).map((port, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {port}
              </span>
            ))}
            {cruise.ports.length > 4 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                +{cruise.ports.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {cruise.highlights.map((highlight, idx) => (
              <span key={idx} className="text-xs bg-blue-50 text-[#003B95] px-2 py-1 rounded-full">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Departure */}
        <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Departs from: {cruise.departurePort}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-2xl font-bold text-[#003B95]">{cruise.price}</p>
            <p className="text-xs text-gray-500">{cruise.priceNote}</p>
          </div>
          <a
            href={`https://wa.me/971547474404?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <MessageCircle className="w-4 h-4" />
              Enquire
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

const Cruises = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCruiseLine, setSelectedCruiseLine] = useState<CruiseLine>("all");
  const [selectedDestination, setSelectedDestination] = useState<Destination>("all");
  const [selectedDuration, setSelectedDuration] = useState<Duration>("all");

  const filteredCruises = useMemo(() => {
    return cruises.filter(cruise => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        cruise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cruise.ship.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cruise.ports.some(port => port.toLowerCase().includes(searchQuery.toLowerCase()));

      // Cruise line filter
      const matchesCruiseLine = selectedCruiseLine === "all" || cruise.cruiseLine === selectedCruiseLine;

      // Destination filter
      const matchesDestination = selectedDestination === "all" || cruise.destination === selectedDestination;

      // Duration filter
      let matchesDuration = true;
      if (selectedDuration !== "all") {
        switch (selectedDuration) {
          case "3-4":
            matchesDuration = cruise.duration >= 3 && cruise.duration <= 4;
            break;
          case "5-7":
            matchesDuration = cruise.duration >= 5 && cruise.duration <= 7;
            break;
          case "8-12":
            matchesDuration = cruise.duration >= 8 && cruise.duration <= 12;
            break;
          case "13+":
            matchesDuration = cruise.duration >= 13;
            break;
        }
      }

      return matchesSearch && matchesCruiseLine && matchesDestination && matchesDuration;
    });
  }, [searchQuery, selectedCruiseLine, selectedDestination, selectedDuration]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCruiseLine("all");
    setSelectedDestination("all");
    setSelectedDuration("all");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCruiseLine !== "all" || selectedDestination !== "all" || selectedDuration !== "all";

  return (
    <>
      <Helmet>
        <title>Luxury Cruises | Caribbean, Mediterranean & Alaska | ResortsOffers</title>
        <meta name="description" content="Explore luxury cruise vacations with Disney, Royal Caribbean, MSC, Celebrity, and Norwegian. Family adventures, romantic getaways, and once-in-a-lifetime experiences." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={cruiseHero} 
            alt="Luxury Cruise Ship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B95]/90 to-[#003B95]/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ship className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury Cruises</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover unforgettable voyages across the Caribbean, Mediterranean, Alaska, and beyond
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-40 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search cruises, ships, ports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Cruise Line Filter */}
            <Select value={selectedCruiseLine} onValueChange={(v) => setSelectedCruiseLine(v as CruiseLine)}>
              <SelectTrigger className="w-full lg:w-48">
                <Anchor className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Cruise Line" />
              </SelectTrigger>
              <SelectContent>
                {cruiseLineOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Destination Filter */}
            <Select value={selectedDestination} onValueChange={(v) => setSelectedDestination(v as Destination)}>
              <SelectTrigger className="w-full lg:w-48">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                {destinationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Duration Filter */}
            <Select value={selectedDuration} onValueChange={(v) => setSelectedDuration(v as Duration)}>
              <SelectTrigger className="w-full lg:w-40">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2 text-gray-600">
                <X className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-[#003B95]">{filteredCruises.length}</span> cruises
            </p>
          </div>
        </div>
      </section>

      {/* Cruises Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {filteredCruises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCruises.map(cruise => (
                <CruiseCard key={cruise.id} cruise={cruise} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No cruises found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to find your perfect voyage.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#003B95]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing Your Cruise?</h2>
          <p className="text-white/80 text-lg mb-8">
            Our cruise specialists can help you find the perfect voyage for your vacation style and budget.
          </p>
          <a
            href="https://wa.me/971547474404?text=Hi!%20I%20need%20help%20choosing%20a%20cruise%20vacation.%20Please%20assist%20me."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-white text-[#003B95] hover:bg-gray-100 gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat with a Cruise Expert
            </Button>
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Cruises;