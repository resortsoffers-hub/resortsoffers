import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, MessageCircle, Shield, Clock, Award, ArrowRight } from "lucide-react";
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
      title: "Maldives from $450/night",
      subtitle: "Overwater villas with 30% OFF - Limited Time",
      buttonText: "Book via WhatsApp",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Maldives overwater villa. Please send availability.`
    },
    {
      image: mauritiusHero,
      title: "Mauritius from $380/night",
      subtitle: "All-inclusive beach resorts with free transfers",
      buttonText: "Get Quote Now",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Mauritius resort. Please send best offers.`
    },
    {
      image: seychellesHero,
      title: "Seychelles from $520/night",
      subtitle: "Private island experiences - 25% OFF",
      buttonText: "Book Now",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Seychelles private island resort. Please send availability.`
    },
    {
      image: dubaiFamily,
      title: "Dubai from $320/night",
      subtitle: "Kids stay FREE + Theme park tickets included",
      buttonText: "Get Family Package",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Dubai family package with theme park tickets. Please send details.`
    },
    {
      image: santoriniGreece,
      title: "Santorini from $420/night",
      subtitle: "Honeymoon special with sunset dinner",
      buttonText: "Book Honeymoon",
      buttonLink: `https://wa.me/${whatsappNumber}?text=Hi! I want to book Santorini honeymoon package. Please send details.`
    }
  ];

  const holidayRecommendations = [
    { name: "Maldives", image: maldivesVillaPool, tagline: "Paradise on Earth", price: "From $450" },
    { name: "Dubai", image: dubaiLuxury, tagline: "City of Dreams", price: "From $320" },
    { name: "Seychelles", image: seychellesHero, tagline: "Untouched Beauty", price: "From $520" },
    { name: "Mauritius", image: mauritiusHero, tagline: "Island Paradise", price: "From $380" },
    { name: "Bali", image: baliResort, tagline: "Tropical Escape", price: "From $290" },
    { name: "Morocco", image: moroccoHero, tagline: "Exotic Adventure", price: "From $350" }
  ];

  const featuredOffers = [
    {
      title: "Maldives Overwater Villa",
      destination: "Maldives",
      discount: 30,
      originalPrice: "$650",
      price: "$450",
      description: "Luxury overwater villa with private pool, direct ocean access, and butler service.",
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
      description: "5-star hotel with theme park tickets, kids club, and connecting rooms.",
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
      description: "Cliffside suite with caldera views, couples spa, and private sunset dinner.",
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
      description: "All-inclusive beachfront resort with water sports and spa treatments.",
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
      description: "Exclusive private island villa with personal chef and yacht excursions.",
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
      description: "Iconic overwater bungalow with glass floor and Mount Otemanu views.",
      features: ["Glass Floor", "Mountain Views", "Snorkeling"],
      image: boraBora,
      rating: 4.9,
      reviews: 145
    }
  ];

  const trustBadges = [
    { icon: Shield, title: "Best Price Guarantee", desc: "We match any lower price" },
    { icon: Clock, title: "24/7 Support", desc: "Always here to help" },
    { icon: Award, title: "500+ Partner Hotels", desc: "Exclusive rates" },
    { icon: Star, title: "4.9 Rating", desc: "From 2000+ reviews" }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Luxury Resort Deals - Save up to 40% | ResortsOffers.com</title>
        <meta name="description" content="Book luxury resorts in Maldives, Dubai, Seychelles & more. Save up to 40% with exclusive deals. WhatsApp booking available 24/7." />
        <link rel="canonical" href="https://www.resortsoffers.com/" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Carousel */}
      <section className="mt-16">
        <HeroCarousel slides={heroSlides} />
        <div className="container-custom">
          <BookingTabs />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-[#003B95]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="flex items-center gap-3 text-white">
                  <Icon className="w-8 h-8 text-white/80" />
                  <div>
                    <p className="font-semibold text-sm">{badge.title}</p>
                    <p className="text-xs text-white/70">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Holiday Recommendations - dnata style */}
      <section className="py-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Holiday Recommendations for You</h2>
            <p className="text-lg text-muted-foreground">Find calm with holidays that put you first</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {holidayRecommendations.map((dest, index) => (
              <a
                key={index}
                href={getDestinationWhatsApp(dest.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="relative h-48 md:h-56 rounded-xl overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                    <p className="text-sm text-white/80">{dest.tagline}</p>
                    <p className="text-sm font-semibold text-[#00D4FF] mt-1">{dest.price}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center text-[#003B95] font-medium text-sm group-hover:underline">
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
            <Badge className="bg-red-500 text-white mb-4">LIMITED TIME OFFERS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Resort Deals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked luxury resorts with up to 40% savings. Book now via WhatsApp for instant confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map((offer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-[#003B95]">
                <div className="relative h-52 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white font-bold">{offer.discount}% OFF</Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-lg px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{offer.rating}</span>
                      <span className="text-xs text-muted-foreground">({offer.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{offer.destination}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <CardDescription className="text-sm line-clamp-2">{offer.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-1">
                    {offer.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{feature}</Badge>
                    ))}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
                        <span className="text-2xl font-bold text-[#003B95] ml-2">{offer.price}</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                    </div>
                    <a href={getWhatsAppUrl(offer.title, offer.destination, offer.price)} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Book via WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-12 bg-[#003B95]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Cannot find what you are looking for?</h2>
              <p className="text-white/80">Our travel experts are available 24/7 to help you plan your perfect vacation.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`https://wa.me/${whatsappNumber}?text=Hi! I need help finding the perfect resort for my vacation.`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
              <a href="tel:+971567622484">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#003B95]">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-10">Why Book With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#003B95]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#003B95]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-muted-foreground">Find a lower price? We will match it and give you an extra 5% off.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#003B95]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#003B95]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Confirmation</h3>
              <p className="text-muted-foreground">Book via WhatsApp and get instant confirmation within minutes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#003B95]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#003B95]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Our travel experts have visited 500+ resorts to give you the best advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Accepted Payment Methods</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <span className="text-2xl font-bold text-[#1A1F71]">VISA</span>
              <span className="text-2xl font-bold text-[#EB001B]">Mastercard</span>
              <span className="text-xl font-bold text-[#006FCF]">AMEX</span>
              <span className="text-xl font-bold text-[#3CDBC0]">Tabby</span>
              <span className="text-xl font-bold text-[#00BAB8]">Tamara</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;