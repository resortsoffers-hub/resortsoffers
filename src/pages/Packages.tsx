import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Star, 
  Plane, 
  UtensilsCrossed, 
  Sparkles, 
  Wine, 
  Anchor, 
  Sun, 
  Waves, 
  Glasses,
  Wifi,
  Dumbbell,
  Music,
  Utensils,
  Coffee,
  Ship,
  Users,
  Heart,
  Flower2,
  Sailboat,
  MapPin
} from "lucide-react";

// Resort Images
import cocoonAerial from "@/assets/resorts/you-and-me-cocoon-aerial.jpg";
import furaveriHero from "@/assets/resorts/furaveri-aerial-hero.png";
import maldivesKandinma from "@/assets/resorts/maldives-kandinma-hq.jpg";
import waldorfMaldives from "@/assets/resorts/waldorf-astoria-maldives.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Package Card Component - dnata style
interface PackageCardProps {
  image: string;
  hotelName: string;
  location: string;
  stars: number;
  description: string;
  amenityIcons: { icon: React.ElementType; label: string }[];
  inclusions: string[];
  nights: number;
  price: string;
  priceNote?: string;
  transferType?: string;
  whatsappMessage: string;
}

const PackageCard = ({
  image,
  hotelName,
  location,
  stars,
  description,
  amenityIcons,
  inclusions,
  nights,
  price,
  priceNote = "per person",
  transferType,
  whatsappMessage
}: PackageCardProps) => {
  const whatsappNumber = "971567622484";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={hotelName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Hotel Name & Location */}
        <h3 className="text-[#1e3a5f] font-bold text-lg uppercase tracking-wide">
          {hotelName}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#1e3a5f]/70 text-sm">{location}</span>
          <div className="flex">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#1e3a5f] text-[#1e3a5f]" />
            ))}
          </div>
        </div>

        {/* Amenity Icons - Green circles like dnata */}
        <div className="flex gap-2 mb-3">
          {amenityIcons.slice(0, 4).map((item, index) => {
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
          {description}
        </p>

        {/* Inclusions */}
        <div className="mb-4">
          <p className="text-[#1e3a5f] font-semibold text-sm mb-1">Inclusions:</p>
          <ul className="text-[#1e3a5f]/70 text-sm space-y-0.5">
            {inclusions.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Price Bar - dnata style */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-[#1e3a5f]/60">{nights === 1 ? 'One' : nights}</p>
              <p className="text-xs text-[#1e3a5f]/60">{nights === 1 ? 'night' : 'nights'}</p>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <p className="text-xs text-[#1e3a5f]/60">From</p>
              <p className="text-[#1e3a5f] font-bold text-lg">{price}</p>
              <p className="text-xs text-[#1e3a5f]/60">{priceNote}</p>
            </div>
          </div>

          {/* Transfer Type Badge */}
          {transferType && (
            <div className="flex items-center gap-1 text-xs text-[#1e3a5f]/70 bg-gray-100 px-2 py-1 rounded">
              <Plane className="w-3 h-3" />
              <span>{transferType}</span>
            </div>
          )}
        </div>

        {/* WhatsApp Button */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
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
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Maldives Packages - Exclusive Resort Deals | ResortsOffers.com</title>
        <meta name="description" content="Book exclusive Maldives resort packages. Premium all-inclusive deals at Westin, Cocoon and more luxury resorts." />
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

      {/* Maldives Special Offers */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          {/* Section Header - dnata style */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-[#1e3a5f]" />
              <h2 className="text-xl font-bold text-[#1e3a5f] uppercase tracking-wider">
                Maldives Special Offers
              </h2>
            </div>
            <div className="h-1 w-20 bg-[#1e3a5f]"></div>
          </div>

          {/* Packages Grid - 2 columns like dnata */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* You & Me by Cocoon */}
            <PackageCard
              image={cocoonAerial}
              hotelName="You & Me by Cocoon Maldives"
              location="MALDIVES"
              stars={5}
              amenityIcons={[
                { icon: Heart, label: "Adults Only" },
                { icon: Wine, label: "All-Inclusive" },
                { icon: Utensils, label: "5 Restaurants" },
                { icon: Waves, label: "Water Sports" }
              ]}
              description="An intimate adults-only sanctuary with Premium All-Inclusive experience. Features H2O Underwater Restaurant and overwater villas with private pools."
              inclusions={[
                "Stay in an Aqua Suite with Pool",
                "Premium All-Inclusive dining",
                "Return Seaplane transfers"
              ]}
              nights={3}
              price="$3,300"
              priceNote="for 2 people"
              transferType="Seaplane"
              whatsappMessage="Hi! I'm interested in the You & Me by Cocoon Maldives package for 3 nights at $3,300 for 2 people. Please send availability."
            />

            {/* Furaveri Maldives */}
            <PackageCard
              image={furaveriHero}
              hotelName="Furaveri Maldives"
              location="MALDIVES"
              stars={5}
              amenityIcons={[
                { icon: Utensils, label: "Half Board" },
                { icon: Sparkles, label: "Spa" },
                { icon: Sailboat, label: "Sunset Cruise" },
                { icon: Waves, label: "Water Sports" }
              ]}
              description="Ocean Pool Villa Package with Floating Breakfast, Sunset Cruise & 60-min Spa Massage. Perfect for couples and honeymooners."
              inclusions={[
                "Stay in an Ocean Pool Villa",
                "Half Board meals",
                "Floating Breakfast & Sunset Cruise"
              ]}
              nights={3}
              price="$4,400"
              priceNote="for 3 people"
              transferType="Speedboat"
              whatsappMessage="Hi! I'm interested in the Furaveri Maldives 3 nights package at USD 4,400 for 3 people. Please send availability."
            />

            {/* Kandima Maldives */}
            <PackageCard
              image={maldivesKandinma}
              hotelName="Kandima Maldives"
              location="MALDIVES"
              stars={5}
              amenityIcons={[
                { icon: Dumbbell, label: "Fitness" },
                { icon: Users, label: "Family Friendly" },
                { icon: Music, label: "Entertainment" },
                { icon: Waves, label: "Water Sports" }
              ]}
              description="A game-changing lifestyle resort with endless activities. Features the longest outdoor pool in the Maldives and vibrant nightlife."
              inclusions={[
                "Stay in an Ocean Pool Villa",
                "Full Board Plus meals",
                "Group yoga & photoshoot"
              ]}
              nights={4}
              price="$3,700"
              priceNote="for 2 people"
              transferType="Domestic + Speedboat"
              whatsappMessage="Hi! I'm interested in the Kandima Maldives 4 nights package at $3,700 for 2 people. Please send availability."
            />

            {/* Madifushi Private Island */}
            <PackageCard
              image={waldorfMaldives}
              hotelName="Madifushi Private Island"
              location="MALDIVES"
              stars={5}
              amenityIcons={[
                { icon: Anchor, label: "Private Island" },
                { icon: Sparkles, label: "Mandara Spa" },
                { icon: UtensilsCrossed, label: "Floating Breakfast" },
                { icon: Glasses, label: "Snorkeling" }
              ]}
              description="Water Pool Villa Experience with Half Board & Seaplane Transfer. Features Mandara Spa and exclusive island atmosphere."
              inclusions={[
                "Stay in a Water Pool Villa",
                "Half Board meals at BlueFin",
                "Shared Seaplane transfers"
              ]}
              nights={3}
              price="$4,600"
              priceNote="for 2 people"
              transferType="Seaplane"
              whatsappMessage="Hi! I'm interested in the Madifushi Private Island Water Pool Villa package for 3 nights at $4,600 for 2 people. Please send availability."
            />
          </div>
        </div>
      </section>

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
