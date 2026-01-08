import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, MessageCircle, ArrowRight, CreditCard, Calendar, Leaf, Headphones, Plane, UtensilsCrossed, Sparkles, Camera, Wine, Anchor, Sun, Sunrise, Waves, Glasses, Wifi, Dumbbell, ExternalLink, Sailboat, Users, Heart, Flower2, Music, Gamepad2, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import BookingTabs from "@/components/BookingTabs";
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
import moroccoHero from "@/assets/destinations/morocco-hero.jpg";
import baliResort from "@/assets/resorts/bali-clifftop-resort.jpg";
import sonevaMaldives from "@/assets/resorts/soneva-fushi.jpg";
import waterVillasAerial from "@/assets/resorts/water-villas-aerial.jpg";
import furaveriHero from "@/assets/resorts/furaveri-aerial-hero.png";

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

  const westinMaldivesInclusions = [
    { icon: CreditCard, text: "All Applicable Taxes and Green Tax" },
    { icon: Plane, text: "Seaplane Shared Round-trip Transfers" },
    { icon: UtensilsCrossed, text: "Complimentary One Floating Breakfast" },
    { icon: Sparkles, text: "Complimentary 30-minute Head & Shoulder Massage" },
    { icon: Camera, text: "Complimentary 30-minute Photo Shoot" },
    { icon: Wine, text: "Daily Minibar Refills & Snacks" },
    { icon: Anchor, text: "Complimentary Dolphin Cruise Excursion" },
    { icon: Sunrise, text: "Sunset and Sunrise Yoga" },
    { icon: Waves, text: "Complimentary Two-hour Kayaks Per Day" },
    { icon: Glasses, text: "Complimentary Snorkeling Equipment" }
  ];

  const furaveriInclusions = [
    { icon: UtensilsCrossed, text: "Floating Breakfast at Sunset" },
    { icon: Sailboat, text: "Sunset Cruise / Dolphin Cruise" },
    { icon: Sparkles, text: "30-minute Spa per Adult" },
    { icon: Coffee, text: "Shisha once during stay" },
    { icon: Camera, text: "30-minute Photo Shoot" },
    { icon: Wifi, text: "Free Wi-Fi throughout resort" },
    { icon: Waves, text: "Free Kayak & Stand-Up Paddle" },
    { icon: Glasses, text: "Complimentary Snorkeling Equipment" },
    { icon: Dumbbell, text: "Fitness Center & Tennis Court" },
    { icon: Gamepad2, text: "Kid's Club & Activities" }
  ];

  const furaveriHoneymoon = [
    { icon: Flower2, text: "Lover's platter – arrangement of desserts" },
    { icon: Wine, text: "Bottle of bubbles" },
    { icon: Heart, text: "3 Course romantic dinner with sparkling drink" }
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
        <div className="container-custom -mt-20 relative z-10">
          <BookingTabs />
        </div>
      </section>

      {/* Trust Badges */}
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

      {/* Switch off section */}
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

      {/* Westin Maldives Featured Package */}
      <section className="py-16 bg-gradient-to-b from-[#1e3a5f]/5 to-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Badge className="bg-[#1e3a5f] text-white mb-4 text-sm px-4 py-1">Featured Maldives Package</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f] mb-3">
              Westin Maldives - Heavenly Water Pool Villa
            </h2>
            <p className="text-lg text-[#1e3a5f]/70 max-w-3xl mx-auto">
              Glass bottom + Wall glass | 1 Bedroom Villa, King, Sofa bed, Ocean view, Private pool | 194sqm/2087sqft
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Inclusions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#1e3a5f]/10">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-6">Package Inclusions</h3>
              <div className="grid gap-4">
                {westinMaldivesInclusions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[#1e3a5f] font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Price & CTA */}
              <div className="mt-8 pt-6 border-t border-[#1e3a5f]/10">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#1e3a5f]/60 mb-1">4 Nights Package</p>
                    <p className="text-4xl font-bold text-[#1e3a5f]">$5,500</p>
                    <p className="text-sm text-[#1e3a5f]/60">per person</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-[#1e3a5f]">4.8</span>
                    </div>
                    <p className="text-xs text-[#1e3a5f]/60">Luxury Resort</p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in the Westin Maldives Heavenly Water Pool Villa package for 4 nights at $5,500. Please send availability and booking details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-6 text-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Book Now via WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Right - Instagram Embeds */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-4">Resort Gallery</h3>
              
              {/* Instagram Embed 1 */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/CNCcHwNnY3b/embed" 
                  className="w-full h-[450px] border-0"
                  loading="lazy"
                  title="Westin Maldives - Water Pool Villa"
                  allowFullScreen
                />
              </div>

              {/* Instagram Embed 2 */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/CXa_bnNJjDw/embed" 
                  className="w-full h-[450px] border-0"
                  loading="lazy"
                  title="Westin Maldives - Interior View"
                  allowFullScreen
                />
              </div>

              {/* Instagram Embed 3 */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/CQRTHPCHHus/embed" 
                  className="w-full h-[450px] border-0"
                  loading="lazy"
                  title="Westin Maldives - Villa Views"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Furaveri Maldives Package */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Badge className="bg-teal-600 text-white mb-4 text-sm px-4 py-2">
              Featured Maldives Package
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f] mb-3">
              Furaveri Maldives
            </h2>
            <p className="text-lg text-[#1e3a5f]/70 max-w-3xl mx-auto">
              3 Nights Ocean Pool Villa with Floating Breakfast, Sunset Cruise & Spa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Price & Inclusions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-200">
              {/* Price at Top */}
              <div className="mb-6 pb-6 border-b border-teal-200">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-[#1e3a5f]/60 mb-1">3 Nights Package</p>
                    <p className="text-4xl font-bold text-teal-600">$3,700</p>
                    <p className="text-sm text-[#1e3a5f]/60">for 2 people</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-[#1e3a5f]">4.7</span>
                    </div>
                    <p className="text-xs text-[#1e3a5f]/60">Ocean Pool Villa</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-4">Package Highlights</h3>
              <div className="grid gap-3">
                {furaveriInclusions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[#1e3a5f] font-medium text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Honeymoon Extras */}
              <div className="mt-6 pt-6 border-t border-teal-200">
                <h4 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4">
                  <Heart className="w-5 h-5 inline mr-2 text-rose-500" />
                  Honeymoon / Anniversary Benefits
                </h4>
                <div className="grid gap-2">
                  {furaveriHoneymoon.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-rose-50">
                        <Icon className="w-5 h-5 text-rose-600" />
                        <span className="text-[#1e3a5f] text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-teal-200 space-y-3">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in the Furaveri Maldives package for 3 nights at $3,700 for 2 people. Please send availability and booking details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-6 text-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Book Now via WhatsApp
                  </Button>
                </a>
                
                <a 
                  href="https://furaveri.com/library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 font-bold py-5">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Resort Gallery
                  </Button>
                </a>
              </div>
            </div>

            {/* Right - Gallery */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-4">Resort Gallery</h3>
              
              {/* Main Resort Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={furaveriHero} 
                  alt="Furaveri Maldives - Aerial View"
                  className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Instagram Embeds */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/B77pMbDnH_V/embed" 
                  className="w-full h-[450px] border-0"
                  loading="lazy"
                  title="Furaveri Maldives - Resort Video"
                  allowFullScreen
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                  <iframe 
                    src="https://www.instagram.com/p/CWa55JCvFM-/embed" 
                    className="w-full h-[300px] border-0"
                    loading="lazy"
                    title="Furaveri Maldives - Island Photos"
                    allowFullScreen
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                  <iframe 
                    src="https://www.instagram.com/p/CIqCbDlH9ia/embed" 
                    className="w-full h-[300px] border-0"
                    loading="lazy"
                    title="Furaveri Maldives - Island View"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/CWa4vTHvqSp/embed" 
                  className="w-full h-[450px] border-0"
                  loading="lazy"
                  title="Furaveri Maldives - Lagoon Water Pool Villa"
                  allowFullScreen
                />
              </div>

              {/* Resort Library Link */}
              <a 
                href="https://furaveri.com/library"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-6 text-white hover:from-teal-700 hover:to-teal-600 transition-all shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <ExternalLink className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Explore Furaveri Library</h4>
                      <p className="text-white/80 text-sm">Photos, Videos & Resort Information</p>
                    </div>
                  </div>
                </div>
              </a>
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