import { useState, useEffect } from "react";
import { safeHotelImage } from "@/lib/safeImage";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, MessageCircle, ArrowRight, Building2, Sparkles, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import AddedValuesSlider from "@/components/AddedValuesSlider";
import FeaturedOffersCarousel from "@/components/FeaturedOffersCarousel";
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
import greeceHero from "@/assets/destinations/greece-santorini.jpg";
import turkeyHero from "@/assets/resorts/turkey-resort.jpg";
import baliHero from "@/assets/resorts/bali-clifftop-resort.jpg";
import moroccoHero from "@/assets/destinations/morocco-hero.jpg";
import thailandHero from "@/assets/resorts/malaysia-beach.jpg";
import indonesiaHero from "@/assets/resorts/luxury-infinity-pool.jpg";

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
    { name: "Maldives", image: maldivesVillaPool },
    { name: "Dubai", image: dubaiLuxury },
    { name: "Seychelles", image: seychellesHero },
    { name: "Mauritius", image: mauritiusHero },
    { name: "Greece", image: greeceHero },
    { name: "Turkey", image: turkeyHero },
    { name: "Bali", image: baliHero },
    { name: "Phuket", image: thailandHero, hasPoolVillaFilter: true },
    { name: "Morocco", image: moroccoHero },
    { name: "Indonesia", image: indonesiaHero }
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
        <link rel="canonical" href="https://resortsoffers.com/" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Carousel */}
      <section className="mt-14">
        <HeroCarousel slides={heroSlides} />
      </section>


      {/* Added Values Slider */}
      <AddedValuesSlider />

      {/* Featured Offers Carousel */}
      <FeaturedOffersCarousel />

      {/* Partner Hotels CTA — temporarily hidden.
          Catalog removed pending verified official imagery per the Authentic
          Imagery Quality Gate. Will return once curated resorts are published. */}


      {/* Destinations Grid with Transfer Filters */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover luxury resorts across the world's most stunning locations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {holidayRecommendations.map((dest, index) => (
              <div key={index} className="group relative">
                <Link 
                  to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                  className="block relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img 
                    src={safeHotelImage(dest.image)} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                  </div>
                </Link>
                
                {/* View Packages Link */}
                <div className="mt-2">
                  <Link
                    to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-medium rounded-full transition-colors duration-200 w-full"
                  >
                    <Package className="w-3 h-3" />
                    <span>View Packages</span>
                  </Link>
                </div>
                
                
                {/* Pool Villa filter removed — pending verified hotel data */}
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <img src={safeHotelImage(offer.image)} alt={offer.title} className="w-full h-full object-cover" />
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

      {/* Price Match Guarantee Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Price Match Guarantee
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Found a better deal elsewhere? Send us the link and we'll match the price or give you an exclusive discount. 
              We're committed to offering you the best value on luxury resort bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hi! I found a resort offer I'd like you to price match. Here's the link: `}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 font-semibold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Offer Link via WhatsApp
                </Button>
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Simply share the competitor's offer link and our team will respond within 24 hours
            </p>
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