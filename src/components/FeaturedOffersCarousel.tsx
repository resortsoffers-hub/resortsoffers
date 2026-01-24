import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Import images
import sonevaMaldives from "@/assets/resorts/soneva-fushi.jpg";
import dubaiLuxury from "@/assets/resorts/dubai-luxury.jpg";
import santoriniGreece from "@/assets/santorini-greece.jpg";
import mauritiusHero from "@/assets/destinations/mauritius-hero.jpg";
import seychellesHero from "@/assets/destinations/seychelles-hero.jpg";
import boraBora from "@/assets/resorts/bora-bora.jpg";
import swissAlps from "@/assets/resorts/swiss-alps.jpg";
import moroccoRiad from "@/assets/resorts/morocco-riad.jpg";

interface FeaturedOffer {
  id: string;
  title: string;
  destination: string;
  country: string;
  discount: number;
  originalPrice: string;
  price: string;
  image: string;
  rating: number;
  features: string[];
}

const featuredOffers: FeaturedOffer[] = [
  {
    id: "soneva-fushi",
    title: "Soneva Fushi",
    destination: "Baa Atoll",
    country: "Maldives",
    discount: 25,
    originalPrice: "AED 4,800",
    price: "AED 3,600",
    image: sonevaMaldives,
    rating: 4.9,
    features: ["Private Pool", "Butler Service", "Seaplane Transfer"]
  },
  {
    id: "atlantis-dubai",
    title: "Atlantis The Palm",
    destination: "Palm Jumeirah",
    country: "Dubai",
    discount: 35,
    originalPrice: "AED 2,200",
    price: "AED 1,430",
    image: dubaiLuxury,
    rating: 4.7,
    features: ["Aquaventure Access", "Beach Access", "Breakfast"]
  },
  {
    id: "canaves-oia",
    title: "Canaves Oia Epitome",
    destination: "Oia, Santorini",
    country: "Greece",
    discount: 20,
    originalPrice: "AED 3,800",
    price: "AED 3,040",
    image: santoriniGreece,
    rating: 4.9,
    features: ["Caldera Views", "Private Pool", "Wine Tasting"]
  },
  {
    id: "one-and-only-mauritius",
    title: "One&Only Le Saint Géran",
    destination: "Belle Mare",
    country: "Mauritius",
    discount: 30,
    originalPrice: "AED 3,200",
    price: "AED 2,240",
    image: mauritiusHero,
    rating: 4.8,
    features: ["Golf Course", "Water Sports", "All-Inclusive"]
  },
  {
    id: "four-seasons-seychelles",
    title: "Four Seasons Resort",
    destination: "Mahé Island",
    country: "Seychelles",
    discount: 22,
    originalPrice: "AED 5,100",
    price: "AED 3,978",
    image: seychellesHero,
    rating: 4.9,
    features: ["Private Villa", "Infinity Pool", "Diving Center"]
  },
  {
    id: "conrad-bora-bora",
    title: "Conrad Bora Bora Nui",
    destination: "Motu To'opua",
    country: "Bora Bora",
    discount: 18,
    originalPrice: "AED 6,500",
    price: "AED 5,330",
    image: boraBora,
    rating: 4.8,
    features: ["Glass Floor", "Overwater Villa", "Hilltop Spa"]
  },
  {
    id: "badrutts-palace",
    title: "Badrutt's Palace Hotel",
    destination: "St. Moritz",
    country: "Switzerland",
    discount: 15,
    originalPrice: "AED 5,800",
    price: "AED 4,930",
    image: swissAlps,
    rating: 4.9,
    features: ["Ski-in/Ski-out", "Michelin Dining", "Spa"]
  },
  {
    id: "royal-mansour",
    title: "Royal Mansour",
    destination: "Marrakech",
    country: "Morocco",
    discount: 28,
    originalPrice: "AED 4,200",
    price: "AED 3,024",
    image: moroccoRiad,
    rating: 4.9,
    features: ["Private Riad", "Hammam", "Butler Service"]
  }
];

const whatsappNumber = "971567622484";

const FeaturedOffersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, featuredOffers.length - visibleCards);

  const goToPrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const getWhatsAppLink = (offer: FeaturedOffer) => {
    const message = `Hi! I'm interested in ${offer.title} in ${offer.country}. Price: ${offer.price}/night (${offer.discount}% OFF). Please send availability.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">
            Limited Time Offers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Top Deals This Season
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exclusive rates on the world's most sought-after luxury resorts
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-foreground p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Previous offer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-foreground p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next offer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {featuredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full">
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 text-white font-bold px-3 py-1 text-sm">
                          {offer.discount}% OFF
                        </Badge>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-sm">{offer.rating}</span>
                      </div>

                      {/* Country Tag */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/20 backdrop-blur-md text-white text-sm font-medium px-3 py-1 rounded-full">
                          {offer.country}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {offer.title}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{offer.destination}</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {offer.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-secondary/50"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-sm text-muted-foreground line-through">
                            {offer.originalPrice}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-primary">
                              {offer.price}
                            </span>
                            <span className="text-sm text-muted-foreground">/night</span>
                          </div>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
                        >
                          <a
                            href={getWhatsAppLink(offer)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Book
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <a href="/offers">
              View All Offers
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffersCarousel;
