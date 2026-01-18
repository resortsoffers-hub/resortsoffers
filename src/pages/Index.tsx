import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, MessageCircle, ArrowRight, CreditCard, Calendar, Plane, UtensilsCrossed, Sparkles, Camera, Wine, Anchor, Sun, Sunrise, Waves, Glasses, Wifi, Dumbbell, ExternalLink, Sailboat, Users, Heart, Flower2, Music, Gamepad2, Coffee } from "lucide-react";
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
    { icon: Star, title: "EARN REWARD", subtitle: "POINTS" },
    { icon: CreditCard, title: "EASY PAYMENT", subtitle: "PLANS" },
    { icon: Calendar, title: "FLEXIBLE", subtitle: "BOOKINGS" }
  ];

  const holidayRecommendations = [
    { name: "Maldives", image: maldivesVillaPool, tagline: "Paradise on Earth" },
    { name: "Dubai", image: dubaiLuxury, tagline: "City of Dreams" },
    { name: "Seychelles", image: seychellesHero, tagline: "Untouched Beauty" },
    { name: "Mauritius", image: mauritiusHero, tagline: "Island Paradise" }
  ];

  // Kandima Maldives Inclusions
  const kandimaInclusions = [
    { icon: Users, text: "Meet & Greet at Airport" },
    { icon: Wine, text: "Welcome Drinks" },
    { icon: Gamepad2, text: "Kids Club, Group Yoga & Fitness Classes" },
    { icon: Sun, text: "Beach Games" },
    { icon: Camera, text: "30-minute Complimentary Photoshoot" },
    { icon: Waves, text: "Daily Boat Shuttles to House Reef" },
    { icon: Music, text: "Movie Night Under the Stars" }
  ];

  const kandimaAddedValues = [
    { icon: UtensilsCrossed, text: "Complimentary Floating Breakfast" },
    { icon: Anchor, text: "Dolphin Cruise" },
    { icon: Sparkles, text: "30 Minutes Spa" }
  ];

  const kandimaHoneymoon = [
    { icon: Flower2, text: "Fruit basket & sparkling drink on arrival" },
    { icon: Heart, text: "3 Course Romantic Beachside Dinner" },
    { icon: Flower2, text: "Bed Decoration" }
  ];

  const kandimaHoneymoon7Nights = [
    { icon: Flower2, text: "Fruit basket & sparkling drink on arrival" },
    { icon: Heart, text: "3 Course Romantic Beachside Dinner" },
    { icon: Sparkles, text: "60 Minutes Massage for Two" },
    { icon: Flower2, text: "Bed Decoration" }
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
    { icon: UtensilsCrossed, text: "Complimentary Floating Breakfast (once)" },
    { icon: Sparkles, text: "Complimentary 30 Min Spa per Adult" },
    { icon: Coffee, text: "Complimentary Shisha (once)" },
    { icon: Sailboat, text: "One-time Boat Excursion (Sunset/Dolphin Cruise or Fishing)" },
    { icon: Camera, text: "30-minute Photoshoot (1 digital photo free)" }
  ];

  const furaveriHoneymoon = [
    { icon: Flower2, text: "Lover's platter – arrangement of desserts" },
    { icon: Wine, text: "Bottle of bubbles" },
    { icon: Heart, text: "3 Course romantic dinner with sparkling drink" }
  ];

  // The Standard Maldives Inclusions
  const standardInclusions = [
    { icon: Users, text: "Meet & Greet at MLE Airport" },
    { icon: Plane, text: "Use of Standard Lounge at MLE Airport" },
    { icon: Wine, text: "Welcome Drinks" },
    { icon: Sun, text: "Tennis Court & Equipment" },
    { icon: Coffee, text: "Coffee/Tea in Villa" },
    { icon: Wifi, text: "WiFi in All Villas & Public Areas" },
    { icon: Waves, text: "Bottled Drinking Water (Daily)" },
    { icon: Dumbbell, text: "Fully Equipped Fitness Center" },
    { icon: Gamepad2, text: "Kid's Club & Activities" },
    { icon: Glasses, text: "Snorkeling Equipment in Villa" },
    { icon: Waves, text: "Kayak & Paddle Board (30 min daily)" }
  ];

  const standardAddedValues = [
    { icon: UtensilsCrossed, text: "Complimentary Floating Breakfast (once)" },
    { icon: Sparkles, text: "Complimentary 30 Min Spa per Adult" },
    { icon: Coffee, text: "Complimentary Shisha (once)" },
    { icon: Sailboat, text: "One-time Boat Excursion (Choice of 4 options)" },
    { icon: Camera, text: "30-minute Photoshoot" }
  ];

  const standardHoneymoon = [
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

      {/* Kandima Maldives Featured Package */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/90 via-[#1e3a5f]/80 to-[#1e3a5f]/95 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80" 
            alt="Kandima Maldives Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-20">
          <div className="text-center mb-10">
            <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 mb-4 text-sm px-4 py-2">
              Adults Friendly Resort
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
              Kandima Maldives
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Ocean Pool Villa | Beach Pool Villa with Swirl | Sunset Aqua Suite
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Price & Inclusions */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
              {/* Price at Top */}
              <div className="mb-6 pb-6 border-b border-[#1e3a5f]/10">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-[#1e3a5f]/60 mb-1">4 Nights Package</p>
                    <p className="text-4xl font-bold text-[#1e3a5f]">$3,700</p>
                    <p className="text-sm text-[#1e3a5f]/60">for 2 people</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-[#1e3a5f]">4.8</span>
                    </div>
                    <p className="text-xs text-[#1e3a5f]/60">Ocean Pool Villa</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4">Complimentary Benefits</h3>
              <div className="grid gap-2">
                {kandimaInclusions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-[#1e3a5f]/5">
                      <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#1e3a5f] font-medium text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Added Values */}
              <div className="mt-4 pt-4 border-t border-[#1e3a5f]/10">
                <h4 className="text-md font-serif font-bold text-teal-700 mb-3">Added Values (4 nights min)</h4>
                <div className="grid gap-2">
                  {kandimaAddedValues.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-teal-50">
                        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-teal-800 font-medium text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Honeymoon Benefits */}
              <div className="mt-4 pt-4 border-t border-[#1e3a5f]/10">
                <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-xl p-4 border border-rose-200 relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-20">
                    <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
                  </div>
                  <h4 className="text-md font-serif font-bold text-rose-700 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                    Honeymoon Benefits
                  </h4>
                  <div className="grid gap-2">
                    {kandimaHoneymoon.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-center gap-2 p-1">
                          <Icon className="w-4 h-4 text-rose-600" />
                          <span className="text-rose-800 font-medium text-sm">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-6 space-y-3">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in the Kandima Maldives package for 4 nights at $3,700 for 2 people. Please send availability and booking details.")}`}
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

            {/* Right - Gallery */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Resort Gallery</h3>
              
              {/* Main Resort Photo */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80" 
                  alt="Kandima Maldives - Resort View"
                  className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80" 
                    alt="Kandima - Ocean Pool Villa"
                    className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&q=80" 
                    alt="Kandima - Beach Pool Villa"
                    className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Sunset Aqua Suite */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" 
                  alt="Kandima - Sunset Aqua Pool Suite"
                  className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Standard Maldives Package */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/85 via-amber-800/80 to-amber-900/90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1920&q=80" 
            alt="The Standard Maldives Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-20">
          <div className="text-center mb-10">
            <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 mb-4 text-sm px-4 py-2">
              Trendy Lifestyle Resort
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
              The Standard, Huruvalhi Maldives
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Overwater Villa with Private Pool | Lagoon Villa | Beach Villa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Price & Inclusions */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
              {/* Price at Top */}
              <div className="mb-6 pb-6 border-b border-[#1e3a5f]/10">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-[#1e3a5f]/60 mb-1">4 Nights Package</p>
                    <p className="text-4xl font-bold text-amber-700">$4,700</p>
                    <p className="text-sm text-[#1e3a5f]/60">for 2 people</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-[#1e3a5f]">4.8</span>
                    </div>
                    <p className="text-xs text-[#1e3a5f]/60">Overwater Pool Villa</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4">Complimentary Benefits</h3>
              <div className="grid gap-2 max-h-[250px] overflow-y-auto pr-2">
                {standardInclusions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-amber-50">
                      <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-amber-900 font-medium text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Added Values */}
              <div className="mt-4 pt-4 border-t border-[#1e3a5f]/10">
                <h4 className="text-md font-serif font-bold text-teal-700 mb-3">Added Values (4 nights)</h4>
                <div className="grid gap-2">
                  {standardAddedValues.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-teal-50">
                        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-teal-800 font-medium text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Honeymoon Benefits */}
              <div className="mt-4 pt-4 border-t border-[#1e3a5f]/10">
                <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-xl p-4 border border-rose-200 relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-20">
                    <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
                  </div>
                  <h4 className="text-md font-serif font-bold text-rose-700 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                    Honeymoon / Anniversary
                  </h4>
                  <div className="grid gap-2">
                    {standardHoneymoon.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-center gap-2 p-1">
                          <Icon className="w-4 h-4 text-rose-600" />
                          <span className="text-rose-800 font-medium text-sm">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-6 space-y-3">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in The Standard Maldives package for 4 nights at $4,700 for 2 people. Please send availability and booking details.")}`}
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

            {/* Right - Gallery */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Resort Gallery</h3>
              
              {/* Main Photo */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80" 
                  alt="The Standard Maldives - Resort View"
                  className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80" 
                    alt="The Standard - Island View"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80" 
                    alt="The Standard - Lagoon Villa"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80" 
                    alt="The Standard - Pool Villa"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80" 
                    alt="The Standard - Ocean Villa"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Beach Pool Villa */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80" 
                  alt="The Standard - Beach Pool Villa"
                  className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Furaveri Maldives Package */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/85 via-teal-800/80 to-teal-900/90 z-10" />
          <img 
            src={furaveriHero}
            alt="Furaveri Maldives Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-20">
          <div className="text-center mb-10">
            <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 mb-4 text-sm px-4 py-2">
              5-Star Luxury Resort
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
              Furaveri Maldives
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Ocean Pool Villa | Sunset Ocean Pool Villa | Beach Pool Villa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Price & Inclusions */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
              {/* Price at Top */}
              <div className="mb-6 pb-6 border-b border-teal-200">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-[#1e3a5f]/60 mb-1">4 Nights Package</p>
                    <p className="text-4xl font-bold text-teal-600">$4,100</p>
                    <p className="text-sm text-[#1e3a5f]/60">for 3 people</p>
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

              <h3 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4">Package Highlights</h3>
              <div className="grid gap-2">
                {furaveriInclusions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#1e3a5f] font-medium text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Honeymoon Extras */}
              <div className="mt-4 pt-4 border-t border-teal-200">
                <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-xl p-4 border border-rose-200 relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-20">
                    <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
                  </div>
                  <h4 className="text-md font-serif font-bold text-rose-700 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                    Honeymoon Special
                  </h4>
                  <div className="grid gap-2">
                    {furaveriHoneymoon.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-center gap-2 p-1">
                          <Icon className="w-4 h-4 text-rose-600" />
                          <span className="text-rose-800 font-medium text-sm">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-6 space-y-3">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in the Furaveri Maldives package for 4 nights at $4,100 for 3 people. Please send availability and booking details.")}`}
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
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Resort Gallery</h3>
              
              {/* Main Resort Photo */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={furaveriHero} 
                  alt="Furaveri Maldives - Resort View"
                  className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80" 
                    alt="Furaveri - Ocean Pool Villa"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80" 
                    alt="Furaveri - Sunset Pool Villa"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Beach Pool Villa */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" 
                  alt="Furaveri - Beach Pool Villa"
                  className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Resort Library Link */}
              <a 
                href="https://furaveri.com/library"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-4 text-white hover:from-teal-700 hover:to-teal-600 transition-all shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6" />
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

      {/* Westin Maldives Featured Package */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/90 via-[#1e3a5f]/80 to-[#1e3a5f]/95 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&q=80" 
            alt="Westin Maldives Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-20">
          <div className="text-center mb-10">
            <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 mb-4 text-sm px-4 py-2">
              Featured Maldives Package
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
              Westin Maldives - Heavenly Water Pool Villa
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Glass bottom + Wall glass | 1 Bedroom Villa, King, Sofa bed, Ocean view, Private pool | 194sqm/2087sqft
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Inclusions */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-6">Package Inclusions</h3>
              <div className="grid gap-3">
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

            {/* Right - Resort Gallery */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Resort Gallery</h3>
              
              <a 
                href="https://www.marriott.com/en-us/hotels/mlewi-the-westin-maldives-miriandhoo-resort/overview/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-2xl p-6 text-white hover:from-[#2d4a6f] hover:to-[#3d5a7f] transition-all shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <ExternalLink className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">View Official Resort Website</h4>
                      <p className="text-white/80 text-sm">Explore Westin Maldives Gallery & Information</p>
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