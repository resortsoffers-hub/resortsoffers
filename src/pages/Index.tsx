import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, MessageCircle, ArrowRight, Building2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import OfferDetailModal from "@/components/OfferDetailModal";
import { supabase } from "@/integrations/supabase/client";
import maldivesWaldorf from "@/assets/maldives-waldorf.jpg";
import santoriniGreece from "@/assets/santorini-greece.jpg";
import dubaiFamily from "@/assets/dubai-family.jpg";
import maldivesVillaPool from "@/assets/resorts/maldives-villa-pool.jpg";
import boraBora from "@/assets/resorts/bora-bora.jpg";
import dubaiLuxury from "@/assets/resorts/dubai-luxury.jpg";
import mauritiusHero from "@/assets/destinations/mauritius-hero.jpg";
import seychellesHero from "@/assets/destinations/seychelles-hero.jpg";
import sonevaMaldives from "@/assets/resorts/soneva-fushi.jpg";
import waterVillasAerial from "@/assets/resorts/water-villas-aerial.jpg";

interface Offer {
  title: string;
  destination: string;
  discount: number;
  originalPrice: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  rating: number;
  reviews: number;
}

const Index = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbOffers, setDbOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (data && !error) {
        setDbOffers(data);
      }
      setLoading(false);
    };
    fetchOffers();
  }, []);

  const whatsappNumber = "971567622484";

  const getDestinationWhatsApp = (destination: string) => {
    const message = `Hi! I want to book a holiday in ${destination}. Please send me the best offers.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const openOfferDetail = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const heroSlides = [
    {
      image: maldivesWaldorf,
      title: "EXPERIENCE THE WONDER OF MALDIVES",
      subtitle: "Feel the paradise in overwater luxury villas",
      buttonText: "Book now",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Maldives resort. Please send availability.`
    },
    {
      image: mauritiusHero,
      title: "DISCOVER MAURITIUS PARADISE",
      subtitle: "All-inclusive beach resorts await you",
      buttonText: "Book now",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Mauritius resort. Please send best offers.`
    },
    {
      image: seychellesHero,
      title: "ESCAPE TO SEYCHELLES",
      subtitle: "Private island experiences like no other",
      buttonText: "Book now",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Seychelles resort. Please send availability.`
    },
    {
      image: dubaiFamily,
      title: "EXPLORE DUBAI ADVENTURES",
      subtitle: "Where dreams become reality",
      buttonText: "Book now",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Dubai hotel. Please send details.`
    }
  ];

  const holidayRecommendations = [
    { name: "Maldives", image: maldivesVillaPool, tagline: "Paradise on Earth" },
    { name: "Dubai", image: dubaiLuxury, tagline: "City of Dreams" },
    { name: "Seychelles", image: seychellesHero, tagline: "Untouched Beauty" },
    { name: "Mauritius", image: mauritiusHero, tagline: "Island Paradise" }
  ];


const featuredOffers: Offer[] = [
    {
      title: "Soneva Fushi Maldives",
      destination: "Baa Atoll, Maldives",
      discount: 25,
      originalPrice: "AED 4,800",
      price: "AED 3,600",
      description: "Award-winning barefoot luxury resort in UNESCO Biosphere Reserve. Spacious beach and water villas with private pools, outdoor bathrooms, and butler service. Features open-air cinema, observatory, and 9 dining destinations.",
      features: ["Private Pool", "Butler Service", "Seaplane Transfer", "All-Inclusive", "Spa Treatment", "Sunset Dolphin Cruise"],
      image: sonevaMaldives,
      rating: 4.9,
      reviews: 1842
    },
    {
      title: "Atlantis The Palm Dubai",
      destination: "Palm Jumeirah, Dubai",
      discount: 35,
      originalPrice: "AED 2,200",
      price: "AED 1,430",
      description: "Iconic 5-star resort on Palm Jumeirah with direct beach access and the famous Aquaventure Waterpark. Features underwater suites with views into the Ambassador Lagoon, 23 restaurants, and world-class entertainment.",
      features: ["Aquaventure Access", "Lost Chambers Entry", "Kids Club", "Beach Access", "Free WiFi", "Breakfast Included"],
      image: dubaiLuxury,
      rating: 4.7,
      reviews: 12450
    },
    {
      title: "Canaves Oia Epitome",
      destination: "Oia, Santorini, Greece",
      discount: 20,
      originalPrice: "AED 3,800",
      price: "AED 3,040",
      description: "Award-winning boutique hotel perched on Santorini's famous caldera cliffs. Suites feature private plunge pools with unobstructed sunset views, handcrafted furnishings, and personalized concierge service. Named #1 Hotel in Greece by Condé Nast.",
      features: ["Caldera Views", "Private Pool", "Champagne Breakfast", "Wine Tasting", "Couples Spa", "Airport Transfer"],
      image: santoriniGreece,
      rating: 4.9,
      reviews: 876
    },
    {
      title: "One&Only Le Saint Géran",
      destination: "Belle Mare, Mauritius",
      discount: 30,
      originalPrice: "AED 3,200",
      price: "AED 2,240",
      description: "Legendary beachfront resort on a private peninsula with 1.5km of pristine white sand beach. Features a championship golf course, award-winning Cinq Mondes Spa, and 5 exceptional restaurants including the renowned Prime steakhouse.",
      features: ["All-Inclusive Option", "Golf Course", "Water Sports", "Kids Club", "Spa Access", "Sunset Catamaran"],
      image: mauritiusHero,
      rating: 4.8,
      reviews: 2156
    },
    {
      title: "Four Seasons Resort Seychelles",
      destination: "Mahé Island, Seychelles",
      discount: 22,
      originalPrice: "AED 5,100",
      price: "AED 3,978",
      description: "Hillside tree house-style villas nestled in lush tropical forest overlooking Petite Anse Bay. Each villa features private infinity pools, outdoor rain showers, and uninterrupted Indian Ocean views. Home to exceptional diving and nature experiences.",
      features: ["Private Villa", "Infinity Pool", "Personal Chef", "Diving Center", "Nature Trails", "Yoga Pavilion"],
      image: seychellesHero,
      rating: 4.9,
      reviews: 1324
    },
    {
      title: "Conrad Bora Bora Nui",
      destination: "Motu To'opua, Bora Bora",
      discount: 18,
      originalPrice: "AED 6,500",
      price: "AED 5,330",
      description: "Stunning overwater bungalows with glass floor panels for underwater viewing, set against the backdrop of Mount Otemanu. Features the only hilltop spa in French Polynesia, authentic Polynesian experiences, and private beach access.",
      features: ["Glass Floor", "Mount Otemanu Views", "Canoe Breakfast", "Hilltop Spa", "Snorkeling Gear", "Lagoon Tours"],
      image: boraBora,
      rating: 4.8,
      reviews: 987
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Luxury Resort Deals - Save up to 40% | ResortsOffers.com</title>
        <meta name="description" content="Book luxury resorts in Maldives, Dubai, Seychelles & more. Save up to 40% with exclusive deals." />
        <link rel="canonical" href="https://www.resortsoffers.com/" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Carousel */}
      <section className="mt-14">
        <HeroCarousel slides={heroSlides} />
      </section>


      {/* Switch off section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Best Luxury Holiday Offers
            </h2>
            <p className="text-lg text-gray-600">Explore our handpicked destinations with exclusive deals</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {holidayRecommendations.map((dest, index) => (
              <a
                key={index}
                href={getDestinationWhatsApp(dest.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="relative h-56 md:h-72 rounded-lg overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-[#00A4E4] font-medium text-sm group-hover:underline">
                  View deals <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Hotels CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00A4E4] rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Building2 className="w-8 h-8 text-[#00A4E4]" />
                <Badge className="bg-[#00A4E4]/20 text-[#00A4E4] border-[#00A4E4]/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  100+ Partner Resorts
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                Browse Our Partner Hotels
              </h2>
              <p className="text-lg text-white/80 max-w-xl">
                Discover luxury resorts across Maldives, Seychelles, Mauritius, Dubai and more. 
                Filter by destination, transfer type, and special categories.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/partner-hotels">
                <Button size="lg" className="bg-white text-[#1e3a5f] hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-xl">
                  <Building2 className="w-5 h-5 mr-2" />
                  View All Partner Hotels
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {dbOffers.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f] mb-4">Resort Offers</h2>
              <p className="text-lg text-[#1e3a5f]/70 max-w-2xl mx-auto font-sans">
                Exclusive deals from our partner resorts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbOffers.map((offer) => {
                const features = Array.isArray(offer.features) ? offer.features : [];
                return (
                  <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-[#1e3a5f]/10">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={offer.image_url || waterVillasAerial} 
                        alt={offer.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-[#1e3a5f] text-white font-sans font-medium">{offer.category || 'Special Offer'}</Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif text-[#1e3a5f]">{offer.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-[#1e3a5f]/60 font-sans">
                        <MapPin className="w-4 h-4" />
                        <span>{offer.category || 'Luxury Resort'}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <CardDescription className="text-sm text-[#1e3a5f]/70 line-clamp-2 font-sans">{offer.description}</CardDescription>
                      
                      <div className="flex flex-wrap gap-1">
                        {features.slice(0, 4).map((feature: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-[#1e3a5f]/5 text-[#1e3a5f] font-sans">{feature}</Badge>
                        ))}
                        {features.length > 4 && (
                          <Badge variant="secondary" className="text-xs bg-[#1e3a5f]/5 text-[#1e3a5f] font-sans">+{features.length - 4} more</Badge>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#1e3a5f]/10">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-2xl font-bold text-[#1e3a5f] font-sans">{offer.currency} {offer.price?.toLocaleString()}</span>
                            <span className="text-sm text-[#1e3a5f]/60 font-sans"> total</span>
                          </div>
                        </div>
                        <a 
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in the ${offer.title} package for ${offer.currency} ${offer.price}. Please send more details.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="w-full bg-[#1e3a5f] hover:bg-[#1e3a5f]/90 text-white font-sans font-medium">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Book Now
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Offers */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Holiday Recommendations for You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked luxury resorts with up to 40% savings. Book now via WhatsApp for instant confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map((offer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white cursor-pointer" onClick={() => openOfferDetail(offer)}>
                <div className="relative h-48 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white font-bold">{offer.discount}% OFF</Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{offer.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{offer.destination}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <CardDescription className="text-sm line-clamp-2">{offer.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-1">
                    {offer.features.slice(0, 3).map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-gray-100">{feature}</Badge>
                    ))}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm text-gray-400 line-through">{offer.originalPrice}</span>
                        <span className="text-2xl font-bold text-[#003B95] ml-2">{offer.price}</span>
                        <span className="text-sm text-gray-500">/night</span>
                      </div>
                    </div>
                    <Button className="w-full bg-[#00A4E4] hover:bg-[#0090c9] text-white font-semibold">
                      View details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#003B95]">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need help planning your trip?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Our travel experts are available 24/7 to help you find the perfect holiday
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8">
                <MessageCircle className="w-5 h-5 mr-2" />
                🇦🇪 UAE & Worldwide WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Offer Detail Modal */}
      <OfferDetailModal 
        offer={selectedOffer} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Index;