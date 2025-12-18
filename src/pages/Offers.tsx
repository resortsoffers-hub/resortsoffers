import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Check, Heart, Plane, Utensils, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import maldivesAerial1 from "@/assets/resorts/maldives-aerial-1.jpg";
import maldivesWaterVilla from "@/assets/resorts/maldives-water-villa.jpg";
import maldivesVillaPool from "@/assets/resorts/maldives-villa-pool.jpg";
import maldivesWaldorf from "@/assets/maldives-waldorf.jpg";
import maldivesPatina from "@/assets/maldives-patina.jpg";
import maldivesOceanPool from "@/assets/maldives-ocean-pool.jpg";
import maldivesRitz from "@/assets/maldives-ritz.jpg";
import maldivesKandinma from "@/assets/resorts/maldives-kandinma-hq.jpg";
import santoriniGreece from "@/assets/santorini-greece.jpg";
import dolomitiSki from "@/assets/dolomiti-ski.jpg";
import dubaiFamily from "@/assets/dubai-family.jpg";
import lakeGardaWellness from "@/assets/lake-garda-wellness.jpg";
import bodrumBeach from "@/assets/bodrum-beach.jpg";
import anantaraKihavah from "@/assets/resorts/anantara-kihavah.jpg";
import chevalBlanc from "@/assets/resorts/cheval-blanc-randheli.jpg";
import sonevaFushi from "@/assets/resorts/soneva-fushi.jpg";
import waldorfAstoria from "@/assets/resorts/waldorf-astoria-maldives.jpg";

const Offers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Deals");
  const [favorites, setFavorites] = useState<string[]>([]);

  const whatsappNumber = "971567622484";
  
  const heroImages = [
    { src: maldivesAerial1, alt: "Aerial view of luxury Maldives resort" },
    { src: maldivesKandinma, alt: "Stunning luxury Maldives resort" },
    { src: maldivesWaterVilla, alt: "Exclusive overwater villa" },
    { src: santoriniGreece, alt: "Santorini Greece sunset" },
    { src: dubaiFamily, alt: "Dubai beach resort" },
  ];

  const getWhatsAppUrl = (offerTitle: string, price: string) => {
    const message = `Hi! I'm interested in "${offerTitle}" (${price}). Can you help me book?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const categories = [
    "All Deals",
    "Maldives",
    "Honeymoon",
    "Family",
    "All-Inclusive", 
    "Last Minute",
    "Wellness"
  ];

  const offers = [
    {
      id: "waldorf-maldives",
      title: "Waldorf Astoria Maldives",
      location: "Ithaafushi, Maldives",
      rating: 9.6,
      reviews: 847,
      nightlyRate: 1850,
      originalRate: 2650,
      totalNights: 5,
      image: maldivesWaldorf,
      category: "Maldives",
      badges: ["RO Exclusive", "Free Upgrade"],
      includes: ["Seaplane Transfer", "Half Board", "Spa Credit $500"],
      validUntil: "2025-03-31"
    },
    {
      id: "patina-maldives",
      title: "Patina Maldives",
      location: "Fari Islands, Maldives",
      rating: 9.4,
      reviews: 623,
      nightlyRate: 1650,
      originalRate: 2200,
      totalNights: 5,
      image: maldivesPatina,
      category: "Maldives",
      badges: ["30% OFF"],
      includes: ["Speedboat Transfer", "Breakfast", "Kids Stay Free"],
      validUntil: "2025-04-15"
    },
    {
      id: "anantara-kihavah",
      title: "Anantara Kihavah Villas",
      location: "Baa Atoll, Maldives",
      rating: 9.5,
      reviews: 1102,
      nightlyRate: 1420,
      originalRate: 1890,
      totalNights: 7,
      image: anantaraKihavah,
      category: "All-Inclusive",
      badges: ["Best Seller", "All Inclusive"],
      includes: ["Seaplane", "All-Inclusive", "Underwater Dining"],
      validUntil: "2025-05-31"
    },
    {
      id: "cheval-blanc",
      title: "Cheval Blanc Randheli",
      location: "Noonu Atoll, Maldives",
      rating: 9.8,
      reviews: 412,
      nightlyRate: 3200,
      originalRate: 4500,
      totalNights: 4,
      image: chevalBlanc,
      category: "Honeymoon",
      badges: ["Honeymoon Special", "29% OFF"],
      includes: ["Private Seaplane", "Champagne", "Couples Spa"],
      validUntil: "2025-06-30"
    },
    {
      id: "soneva-fushi",
      title: "Soneva Fushi",
      location: "Baa Atoll, Maldives",
      rating: 9.7,
      reviews: 934,
      nightlyRate: 2100,
      originalRate: 2800,
      totalNights: 6,
      image: sonevaFushi,
      category: "Wellness",
      badges: ["Eco Luxury", "25% OFF"],
      includes: ["Seaplane", "All-Inclusive", "Wellness Program"],
      validUntil: "2025-04-30"
    },
    {
      id: "waldorf-astoria-full",
      title: "Waldorf Astoria Ithaafushi",
      location: "South Male Atoll, Maldives",
      rating: 9.6,
      reviews: 756,
      nightlyRate: 1750,
      originalRate: 2500,
      totalNights: 5,
      image: waldorfAstoria,
      category: "Maldives",
      badges: ["RO Preferred", "30% OFF"],
      includes: ["Yacht Transfer", "Half Board", "$300 Credit"],
      validUntil: "2025-05-15"
    },
    {
      id: "santorini-honeymoon",
      title: "Canaves Oia Suites",
      location: "Santorini, Greece",
      rating: 9.3,
      reviews: 512,
      nightlyRate: 580,
      originalRate: 780,
      totalNights: 5,
      image: santoriniGreece,
      category: "Honeymoon",
      badges: ["Romantic Escape"],
      includes: ["Airport Transfer", "Breakfast", "Wine Tasting"],
      validUntil: "2025-09-30"
    },
    {
      id: "dolomiti-ski",
      title: "Cristallo Resort & Spa",
      location: "Cortina d'Ampezzo, Italy",
      rating: 9.1,
      reviews: 389,
      nightlyRate: 420,
      originalRate: 550,
      totalNights: 4,
      image: dolomitiSki,
      category: "Wellness",
      badges: ["Ski Season", "24% OFF"],
      includes: ["Ski Pass", "Spa Access", "Half Board"],
      validUntil: "2025-03-15"
    },
    {
      id: "dubai-family",
      title: "Atlantis The Palm",
      location: "Dubai, UAE",
      rating: 8.9,
      reviews: 2341,
      nightlyRate: 380,
      originalRate: 580,
      totalNights: 5,
      image: dubaiFamily,
      category: "Family",
      badges: ["Kids Stay Free", "35% OFF"],
      includes: ["Waterpark Access", "Aquarium", "Half Board"],
      validUntil: "2025-12-20"
    },
    {
      id: "lake-garda-wellness",
      title: "Lefay Resort & SPA",
      location: "Lake Garda, Italy",
      rating: 9.4,
      reviews: 678,
      nightlyRate: 450,
      originalRate: 580,
      totalNights: 5,
      image: lakeGardaWellness,
      category: "Wellness",
      badges: ["Wellness Retreat"],
      includes: ["Spa Program", "Yoga Sessions", "Gourmet Dining"],
      validUntil: "2025-06-30"
    },
    {
      id: "bodrum-lastminute",
      title: "Mandarin Oriental Bodrum",
      location: "Bodrum, Turkey",
      rating: 9.2,
      reviews: 445,
      nightlyRate: 320,
      originalRate: 520,
      totalNights: 7,
      image: bodrumBeach,
      category: "Last Minute",
      badges: ["Flash Sale", "38% OFF"],
      includes: ["All-Inclusive", "Beach Club", "Water Sports"],
      validUntil: "2025-11-30"
    },
    {
      id: "ocean-pool-villa",
      title: "The Ritz-Carlton Maldives",
      location: "Fari Islands, Maldives",
      rating: 9.5,
      reviews: 521,
      nightlyRate: 1950,
      originalRate: 2600,
      totalNights: 5,
      image: maldivesOceanPool,
      category: "Maldives",
      badges: ["Ocean Pool Villa", "25% OFF"],
      includes: ["Speedboat", "Breakfast", "Private Pool"],
      validUntil: "2025-05-31"
    }
  ];

  const filteredOffers = selectedCategory === "All Deals" 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Exclusive Resort Offers & Deals - Up to 40% OFF | ResortsOffers.com</title>
        <meta name="description" content="Limited-time luxury resort offers! Save up to 40% on Maldives water villas, Dubai beach resorts, Bali honeymoon packages & more. Book your dream vacation today." />
        <link rel="canonical" href="https://www.resortsoffers.com/offers" />
      </Helmet>
      <Navbar />
      
      {/* Compact Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[50vh]">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        <div className="absolute z-10 container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">
            Exclusive Resort Deals
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Members save up to 40% on luxury resorts worldwide
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-20 z-30 bg-background border-b shadow-sm">
        <div className="container-custom">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap rounded-full"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-muted/50">
        <div className="container-custom">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredOffers.length} deals</span>
            {selectedCategory !== "All Deals" && ` in ${selectedCategory}`}
          </p>
        </div>
      </section>

      {/* Offers Grid - Card Based */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOffers.map((offer) => {
              const discount = Math.round((1 - offer.nightlyRate / offer.originalRate) * 100);
              const totalPrice = offer.nightlyRate * offer.totalNights;
              const originalTotal = offer.originalRate * offer.totalNights;
              
              return (
                <div 
                  key={offer.id} 
                  className="group bg-card rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(offer.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                    >
                      <Heart 
                        size={18} 
                        className={favorites.includes(offer.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                      />
                    </button>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {offer.badges.slice(0, 2).map((badge, i) => (
                        <Badge 
                          key={i} 
                          variant={badge.includes("OFF") || badge.includes("Sale") ? "destructive" : "default"}
                          className="text-xs px-2 py-0.5"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title & Location */}
                    <h3 className="font-semibold text-lg text-foreground line-clamp-1 mb-1">
                      {offer.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{offer.location}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                        {offer.rating}
                      </span>
                      <span className="text-sm font-medium">
                        {offer.rating >= 9.5 ? "Exceptional" : offer.rating >= 9 ? "Excellent" : "Wonderful"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({offer.reviews.toLocaleString()} reviews)
                      </span>
                    </div>

                    {/* Includes - Icons */}
                    <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                      {offer.includes.some(i => i.toLowerCase().includes("seaplane") || i.toLowerCase().includes("transfer")) && (
                        <div className="flex items-center gap-1 text-xs">
                          <Plane size={14} />
                          <span>Transfer</span>
                        </div>
                      )}
                      {offer.includes.some(i => i.toLowerCase().includes("board") || i.toLowerCase().includes("breakfast") || i.toLowerCase().includes("inclusive")) && (
                        <div className="flex items-center gap-1 text-xs">
                          <Utensils size={14} />
                          <span>Meals</span>
                        </div>
                      )}
                      {offer.includes.some(i => i.toLowerCase().includes("pool") || i.toLowerCase().includes("spa") || i.toLowerCase().includes("water")) && (
                        <div className="flex items-center gap-1 text-xs">
                          <Waves size={14} />
                          <span>Wellness</span>
                        </div>
                      )}
                    </div>

                    {/* Price Section */}
                    <div className="border-t pt-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <div>
                          <span className="text-2xl font-bold text-foreground">${offer.nightlyRate.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">/night</span>
                        </div>
                        <span className="text-sm text-muted-foreground line-through">
                          ${offer.originalRate.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-muted-foreground">
                          ${totalPrice.toLocaleString()} total · {offer.totalNights} nights
                        </span>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Save {discount}%
                        </Badge>
                      </div>
                      
                      {/* Valid Until */}
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <Calendar size={12} className="mr-1" />
                        Book by {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>

                      {/* CTA */}
                      <Button 
                        className="w-full"
                        asChild
                      >
                        <a 
                          href={getWhatsAppUrl(offer.title, `$${offer.nightlyRate}/night`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 bg-muted/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Best Price Guarantee</h3>
                <p className="text-sm text-muted-foreground">Found it cheaper? We'll match it and give you 10% extra off.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Exclusive Member Benefits</h3>
                <p className="text-sm text-muted-foreground">Room upgrades, late checkout & resort credits on every booking.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">24/7 Personal Concierge</h3>
                <p className="text-sm text-muted-foreground">Your dedicated travel expert available around the clock.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offers;
