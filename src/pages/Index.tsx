import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, MessageCircle, ArrowRight, Clock, CreditCard, Calendar, Leaf, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import BookingTabs from "@/components/BookingTabs";
import maldivesWaldorf from "@/assets/maldives-waldorf.jpg";
import santoriniGreece from "@/assets/santorini-greece.jpg";
import dubaiFamily from "@/assets/dubai-family.jpg";
import maldivesVillaPool from "@/assets/resorts/maldives-villa-pool.jpg";
import boraBora from "@/assets/resorts/bora-bora.jpg";
import dubaiLuxury from "@/assets/resorts/dubai-luxury.jpg";
import mauritiusHero from "@/assets/destinations/mauritius-hero.jpg";
import seychellesHero from "@/assets/destinations/seychelles-hero.jpg";
import moroccoHero from "@/assets/destinations/morocco-hero.jpg";
import baliResort from "@/assets/resorts/bali-clifftop-resort.jpg";

const Index = () => {
  const whatsappNumber = "971567622484";
  
  const getWhatsAppUrl = (offerTitle: string, destination: string, price: string) => {
    const message = `Hi! I am interested in "${offerTitle}" in ${destination}. Price: ${price}. Please send me availability and booking details.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const getDestinationWhatsApp = (destination: string) => {
    const message = `Hi! I want to book a holiday in ${destination}. Please send me the best offers.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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

  const trustBadges = [
    { icon: Headphones, title: "24/7 CUSTOMER", subtitle: "SUPPORT" },
    { icon: Star, title: "EARN REWARD", subtitle: "POINTS" },
    { icon: CreditCard, title: "EASY PAYMENT", subtitle: "PLANS" },
    { icon: Calendar, title: "FLEXIBLE", subtitle: "BOOKINGS" },
    { icon: Leaf, title: "SUSTAINABLE TRAVEL", subtitle: "OPTIONS" }
  ];

  const holidayRecommendations = [
    { name: "Maldives", image: maldivesVillaPool, tagline: "Paradise on Earth" },
    { name: "Dubai", image: dubaiLuxury, tagline: "City of Dreams" },
    { name: "Seychelles", image: seychellesHero, tagline: "Untouched Beauty" },
    { name: "Mauritius", image: mauritiusHero, tagline: "Island Paradise" }
  ];

  const featuredOffers = [
    {
      title: "Maldives Overwater Villa",
      destination: "Maldives",
      discount: 30,
      originalPrice: "$650",
      price: "$450",
      description: "Luxury overwater villa with private pool and butler service.",
      features: ["Private Pool", "Butler Service", "Free Transfers"],
      image: maldivesVillaPool,
      rating: 4.9,
      reviews: 234
    },
    {
      title: "Dubai Family Package",
      destination: "Dubai, UAE",
      discount: 35,
      originalPrice: "$490",
      price: "$320",
      description: "5-star hotel with theme park tickets and kids club.",
      features: ["Kids Stay Free", "Theme Park Tickets", "Pool Access"],
      image: dubaiLuxury,
      rating: 4.8,
      reviews: 189
    },
    {
      title: "Santorini Honeymoon",
      destination: "Santorini, Greece",
      discount: 25,
      originalPrice: "$560",
      price: "$420",
      description: "Cliffside suite with caldera views and couples spa.",
      features: ["Caldera Views", "Couples Spa", "Sunset Dinner"],
      image: santoriniGreece,
      rating: 4.9,
      reviews: 156
    },
    {
      title: "Mauritius Beach Resort",
      destination: "Mauritius",
      discount: 28,
      originalPrice: "$530",
      price: "$380",
      description: "All-inclusive beachfront resort with water sports.",
      features: ["All-Inclusive", "Water Sports", "Spa Access"],
      image: mauritiusHero,
      rating: 4.7,
      reviews: 198
    },
    {
      title: "Seychelles Private Island",
      destination: "Seychelles",
      discount: 25,
      originalPrice: "$690",
      price: "$520",
      description: "Exclusive private island villa with personal chef.",
      features: ["Private Beach", "Personal Chef", "Yacht Tours"],
      image: seychellesHero,
      rating: 4.9,
      reviews: 87
    },
    {
      title: "Bora Bora Bungalow",
      destination: "Bora Bora",
      discount: 20,
      originalPrice: "$850",
      price: "$680",
      description: "Iconic overwater bungalow with glass floor.",
      features: ["Glass Floor", "Mountain Views", "Snorkeling"],
      image: boraBora,
      rating: 4.9,
      reviews: 145
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
        <div className="container-custom -mt-20 relative z-10">
          <BookingTabs />
        </div>
      </section>

      {/* Trust Badges - dnata style */}
      <section className="py-10 mt-8">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <Icon className="w-10 h-10 text-[#00A4E4]" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-xs text-gray-800 uppercase tracking-wide">{badge.title}</p>
                    <p className="font-semibold text-xs text-gray-800 uppercase tracking-wide">{badge.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Switch off section - dnata style */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              SWITCH OFF FROM THE SCROLL, SWITCH ON TO SERENITY
            </h2>
            <p className="text-lg text-gray-600">Find calm with holidays that put you first</p>
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

      {/* Featured Offers */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Holiday Recommendations for You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked luxury resorts with exclusive savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map((offer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
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
                  <CardDescription className="text-sm">{offer.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-1">
                    {offer.features.map((feature, i) => (
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
                    <a href={getWhatsAppUrl(offer.title, offer.destination, offer.price)} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-[#00A4E4] hover:bg-[#0090c9] text-white font-semibold">
                        View deal
                      </Button>
                    </a>
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
                Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+971567622484">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#003B95] px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call 80036282
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;