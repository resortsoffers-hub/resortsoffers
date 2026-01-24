import { useState, useMemo } from "react";
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
  BedDouble
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
import rafflesSeychelles from "@/assets/resorts/raffles-seychelles.jpg";
import fourSeasonsSeychelles from "@/assets/resorts/four-seasons-seychelles.jpg";
import sixSensesSeychelles from "@/assets/resorts/six-senses-seychelles.jpg";
import constanceEphelia from "@/assets/resorts/constance-ephelia.jpg";
import constancePrinceMaurice from "@/assets/resorts/constance-prince-maurice.jpg";
import fourSeasonsMauritius from "@/assets/resorts/four-seasons-mauritius.jpg";
import stRegisMauritius from "@/assets/resorts/st-regis-mauritius.jpg";
import shangriLaMauritius from "@/assets/resorts/shangri-la-mauritius.jpg";

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
}

const offersData: OfferData[] = [
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
    id: "furaveri",
    image: furaveriHero,
    hotelName: "Furaveri Maldives",
    location: "Raa Atoll",
    destination: "Maldives",
    stars: 5,
    description: "Ocean Pool Villa Package with Floating Breakfast and Sunset Cruise.",
    nights: 3,
    price: "$4,400",
    priceNote: "for 3 people",
    transferType: "Speedboat",
    whatsappMessage: "Hi! I'm interested in the Furaveri Maldives package for 3 nights at $4,400. Please send availability.",
    validUntil: "30 April 2025",
    discount: "30% OFF"
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
  }
];

const Offers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

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
        <link rel="canonical" href="https://www.resortsoffers.com/offers" />
        <meta property="og:title" content="Exclusive Resort Offers & Deals | ResortsOffers.com" />
        <meta property="og:description" content="Discover exclusive luxury resort offers in Maldives, Seychelles & Mauritius. Special discounts up to 40% off." />
        <meta property="og:url" content="https://www.resortsoffers.com/offers" />
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
                      src={offer.image}
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
