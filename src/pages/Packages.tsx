import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Star, 
  Plane, 
  UtensilsCrossed, 
  Sparkles, 
  Camera, 
  Wine, 
  Anchor, 
  Sun, 
  Sunrise, 
  Waves, 
  Glasses,
  CreditCard,
  Wifi,
  Dumbbell,
  Music,
  Utensils,
  Coffee,
  GlassWater,
  Ship,
  Users,
  Heart,
  ExternalLink,
  Flower2,
  Gamepad2,
  Sailboat
} from "lucide-react";

// Cocoon Resort Images
import cocoonAerial from "@/assets/resorts/you-and-me-cocoon-aerial.jpg";
import cocoonVillaPool from "@/assets/resorts/you-and-me-cocoon-villa-pool.jpg";
import cocoonAquaSuite from "@/assets/resorts/you-and-me-cocoon-aqua-suite.jpg";
import cocoonSuite from "@/assets/resorts/you-and-me-cocoon-suite.jpg";
// Furaveri Resort Images
import furaveriHero from "@/assets/resorts/furaveri-aerial-hero.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Packages = () => {
  const whatsappNumber = "971567622484";

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

  const cocoonInclusions = [
    { icon: Wine, text: "Premium All-Inclusive" },
    { icon: Plane, text: "Return transfer by Seaplane" },
    { icon: Coffee, text: "Access to The Cocoon Collection Lounge at Airport" },
    { icon: Wifi, text: "Free Wi-Fi throughout resort" },
    { icon: UtensilsCrossed, text: "Floating Breakfast" },
    { icon: Waves, text: "Free Kayak & Stand-Up Paddle Board" },
    { icon: Sun, text: "Free daily Yoga, Zumba and Aqua Aerobics" },
    { icon: GlassWater, text: "Welcome sparkling drink & canapés in-villa" },
    { icon: Utensils, text: "Dine-Around in 5 restaurants (à la carte)" },
    { icon: Coffee, text: "Tea/Coffee with high-tea snacks (4:30PM-6PM)" },
    { icon: Wine, text: "Unlimited beverages including signature cocktails" },
    { icon: GlassWater, text: "Mini bar - unlimited soft drinks (daily refill)" },
    { icon: Anchor, text: "Complimentary Snorkeling Adventure" },
    { icon: Glasses, text: "Complimentary snorkeling equipment" },
    { icon: Utensils, text: "Themed nights with seafood BBQ, lobster & oysters" },
    { icon: Music, text: "White Party, DJ, Karaoke, Movie nights & more" },
    { icon: Dumbbell, text: "Full access to gym facilities" }
  ];

  const cocoonExtras = [
    { text: "2 bottles of preferred brands (min 5 nights)", icon: Wine },
    { text: "Complimentary Catamaran Cruise (min 7 nights)", icon: Ship },
    { text: "Group cooking class - Ethnic or Italian (min 5 nights)", icon: Utensils },
    { text: "Up to 3 yoga/Pilates classes", icon: Sun }
  ];

  const furaveriInclusions = [
    { icon: Utensils, text: "Half Board: Breakfast & Dinner" },
    { icon: UtensilsCrossed, text: "Floating Breakfast at Sunset" },
    { icon: Sailboat, text: "Sunset Cruise" },
    { icon: Sparkles, text: "60-minute Spa Massage" },
    { icon: Users, text: "Meet & Greet on arrival by dedicated team" },
    { icon: Glasses, text: "Complimentary snorkeling equipment" },
    { icon: Waves, text: "Free Stand-Up Paddle & Kayak" },
    { icon: Anchor, text: "Free windsurfing equipment" },
    { icon: Music, text: "Daily entertainment activities" },
    { icon: Dumbbell, text: "Free Gym, Tennis & Badminton access" },
    { icon: Gamepad2, text: "Billiards, Table Tennis & board games" },
    { icon: Music, text: "Karaoke, Disco night, Fire show & more" }
  ];

  const furaveriHoneymoon = [
    { icon: Flower2, text: "Complimentary fruit plate on arrival" },
    { icon: Wine, text: "Bottle of sparkling drink" },
    { icon: Heart, text: "Flower bed decoration in villa" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Maldives Packages - Exclusive Resort Deals | ResortsOffers.com</title>
        <meta name="description" content="Book exclusive Maldives resort packages. Premium all-inclusive deals at Westin, Cocoon and more luxury resorts." />
        <link rel="canonical" href="https://www.resortsoffers.com/packages" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-[#1e3a5f] to-[#1e3a5f]/90">
        <div className="container-custom text-center">
          <Badge className="bg-white/20 text-white mb-4 text-sm px-4 py-1">Maldives Packages</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Exclusive Maldives Resort Packages
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Hand-picked luxury experiences with premium inclusions
          </p>
        </div>
      </section>

      {/* Cocoon Maldives Package */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Badge className="bg-rose-600 text-white mb-4 text-sm px-4 py-2">
              <Heart className="w-4 h-4 mr-1 inline" /> Adults Only Resort
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f] mb-3">
              You & Me by Cocoon Maldives
            </h2>
            <p className="text-lg text-[#1e3a5f]/70 max-w-3xl mx-auto">
              An intimate adults-only sanctuary with Premium All-Inclusive experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Inclusions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-rose-200">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-6">Package Inclusions</h3>
              <div className="grid gap-3">
                {cocoonInclusions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[#1e3a5f] font-medium text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Extended Stay Extras */}
              <div className="mt-6 pt-6 border-t border-rose-200">
                <h4 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4">Extended Stay Extras</h4>
                <div className="grid gap-2">
                  {cocoonExtras.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-amber-50">
                        <Icon className="w-5 h-5 text-amber-600" />
                        <span className="text-[#1e3a5f] text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Price & CTA */}
              <div className="mt-8 pt-6 border-t border-rose-200">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#1e3a5f]/60 mb-1">3 Nights Package</p>
                    <p className="text-4xl font-bold text-[#1e3a5f]">$3,300</p>
                    <p className="text-sm text-[#1e3a5f]/60">for 2 people</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-[#1e3a5f]">4.9</span>
                    </div>
                    <p className="text-xs text-[#1e3a5f]/60">Adults Only</p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in the You & Me by Cocoon Maldives package for 3 nights at $3,300 for 2 people. Please send availability and booking details.")}`}
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

            {/* Right - Gallery & Resources */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-4">Resort Gallery</h3>
              
              {/* Main Resort Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={cocoonAerial} 
                  alt="You & Me by Cocoon Maldives - Aerial View"
                  className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={cocoonVillaPool} 
                    alt="Dolphin Villa with Pool"
                    className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="bg-white p-3">
                    <p className="text-sm font-medium text-[#1e3a5f]">Dolphin Villa with Pool</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={cocoonAquaSuite} 
                    alt="Aqua Suite with Pool"
                    className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="bg-white p-3">
                    <p className="text-sm font-medium text-[#1e3a5f]">Aqua Suite with Pool</p>
                  </div>
                </div>
              </div>

              {/* You & Me Suite */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={cocoonSuite} 
                  alt="You & Me Suite - Luxury Overwater Villa"
                  className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="bg-white p-4">
                  <p className="font-medium text-[#1e3a5f]">You & Me Suite</p>
                  <p className="text-sm text-[#1e3a5f]/70">280sqm | Private Pool | Cinema | Gym</p>
                </div>
              </div>

              {/* Google Drive Link */}
              <a 
                href="https://drive.google.com/drive/folders/19gS9HWS-M7WbyYUOhrT4S7lE6TXiYVWN"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl p-6 text-white hover:from-rose-700 hover:to-rose-600 transition-all shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <ExternalLink className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">View Full Gallery & Resources</h4>
                      <p className="text-white/80 text-sm">Photos, Videos, Fact-sheet & Price Guides</p>
                    </div>
                  </div>
                </div>
              </a>

              {/* Resort Highlights */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-200">
                <h4 className="font-serif font-bold text-[#1e3a5f] mb-4">Resort Highlights</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Users className="w-4 h-4 text-rose-500" />
                    <span>Adults Only</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Utensils className="w-4 h-4 text-rose-500" />
                    <span>5 Restaurants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Wine className="w-4 h-4 text-rose-500" />
                    <span>Premium All-Inclusive</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Anchor className="w-4 h-4 text-rose-500" />
                    <span>H2O Underwater Restaurant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Furaveri Maldives Package */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="container-custom max-w-5xl">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-teal-200">
            {/* Hero Image with Destination Badge */}
            <div className="relative">
              <a 
                href="https://www.instagram.com/furaveri_maldives/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                title="Visit Instagram"
              >
                <ExternalLink className="w-5 h-5 text-[#1e3a5f]" />
              </a>
              <Badge className="absolute top-4 left-4 z-10 bg-[#1e3a5f] text-white text-sm px-4 py-2">
                Maldives
              </Badge>
              <img 
                src={furaveriHero} 
                alt="Furaveri Maldives Aerial View" 
                className="w-full h-[350px] md:h-[450px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title & Location */}
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a5f] mb-2">
                Furaveri Maldives
              </h2>
              <div className="flex items-center gap-2 text-[#1e3a5f]/70 mb-4">
                <Anchor className="w-4 h-4" />
                <span>Maldives</span>
              </div>

              {/* Package Description */}
              <p className="text-[#1e3a5f] text-lg mb-4">
                3 Nights Ocean Pool Villa Package with Floating Breakfast, Sunset Cruise & Spa
              </p>

              {/* Highlight Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="border-[#1e3a5f]/30 text-[#1e3a5f] px-3 py-1">
                  3 Nights Stay
                </Badge>
                <Badge variant="outline" className="border-[#1e3a5f]/30 text-[#1e3a5f] px-3 py-1">
                  Ocean Pool Villa
                </Badge>
                <Badge variant="outline" className="border-[#1e3a5f]/30 text-[#1e3a5f] px-3 py-1">
                  Half Board Meal Plan
                </Badge>
                <Badge variant="outline" className="border-[#1e3a5f]/30 text-[#1e3a5f] px-3 py-1">
                  Floating Breakfast
                </Badge>
                <Badge variant="outline" className="border-[#1e3a5f]/30 text-[#1e3a5f] px-3 py-1">
                  +11 more
                </Badge>
              </div>

              {/* Inclusions with Icons Grid */}
              <div className="bg-teal-50 rounded-2xl p-5 mb-6">
                <h3 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4">Package Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <UtensilsCrossed className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] text-sm font-medium">Floating Breakfast</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <Sailboat className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] text-sm font-medium">Sunset Cruise</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] text-sm font-medium">60-min Spa Massage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <Utensils className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] text-sm font-medium">Half Board Meals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <Waves className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] text-sm font-medium">Water Sports</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <Glasses className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] text-sm font-medium">Snorkeling Gear</span>
                  </div>
                </div>
              </div>

              {/* Honeymoon Special */}
              <div className="bg-rose-50 rounded-2xl p-5 mb-6">
                <h4 className="text-md font-serif font-bold text-[#1e3a5f] mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" /> Honeymoon Special
                </h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-[#1e3a5f] text-sm">
                    <Flower2 className="w-4 h-4 text-rose-500" />
                    <span>Fruit plate on arrival</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1e3a5f] text-sm">
                    <Wine className="w-4 h-4 text-rose-500" />
                    <span>Sparkling drink</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1e3a5f] text-sm">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Flower bed decoration</span>
                  </div>
                </div>
              </div>

              {/* Price Section - Highlighted */}
              <div className="border-t border-teal-200 pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-[#1e3a5f] text-4xl md:text-5xl font-bold">
                      USD 4,400 <span className="text-lg font-normal text-[#1e3a5f]/60">total</span>
                    </p>
                    <p className="text-sm text-[#1e3a5f]/60 mt-1">for 3 people • Valid until 30 April</p>
                  </div>
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in the Furaveri Maldives 3 nights package at USD 4,400 for 3 people. Please send availability and booking details.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto"
                  >
                    <Button className="w-full md:w-auto bg-[#1e3a5f] hover:bg-[#1e3a5f]/90 text-white font-bold py-6 px-8 text-lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Book Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Madifushi Private Island Package */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Badge className="bg-amber-600 text-white mb-4 text-sm px-4 py-2">
              Private Island Resort
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f] mb-3">
              Madifushi Private Island
            </h2>
            <p className="text-lg text-[#1e3a5f]/70 max-w-3xl mx-auto">
              Water Pool Villa Experience with Half Board & Seaplane Transfer
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Inclusions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-6">Package Inclusions</h3>
              
              {/* Rate Note */}
              <div className="bg-amber-100 rounded-xl p-4 mb-6">
                <p className="text-[#1e3a5f] font-medium text-sm">
                  ✈️ Rates are inclusive of Half Board & Shared Seaplane Transfer
                </p>
              </div>

              {/* 3 Nights Stay */}
              <div className="mb-6">
                <h4 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <Badge className="bg-amber-600 text-white">3 Nights Stay</Badge>
                </h4>
                <div className="grid gap-3">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                      <Coffee className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] font-medium text-sm">Daily buffet breakfast at BlueFin</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                      <Utensils className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] font-medium text-sm">Daily buffet dinner at BlueFin</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                      <UtensilsCrossed className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] font-medium text-sm">One time floating breakfast (reserve in advance)</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] font-medium text-sm">30-min head, shoulder & back massage at Mandara Spa</span>
                  </div>
                </div>
              </div>

              {/* 4 Nights Stay - Extra */}
              <div className="pt-6 border-t border-amber-200">
                <h4 className="text-lg font-serif font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <Badge className="bg-[#1e3a5f] text-white">4+ Nights Stay</Badge>
                  <span className="text-sm text-amber-600 font-medium">+ Extra Bonus</span>
                </h4>
                <div className="grid gap-3">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                      <Anchor className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#1e3a5f] font-medium text-sm">One time snorkeling to the nearest reef</span>
                  </div>
                  <p className="text-sm text-[#1e3a5f]/60 ml-14">Plus all 3-night inclusions</p>
                </div>
              </div>
              
              {/* Price & CTA */}
              <div className="mt-8 pt-6 border-t border-amber-200">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#1e3a5f]/60 mb-1">3 Nights • Water Pool Villa</p>
                    <p className="text-4xl font-bold text-[#1e3a5f]">$4,600</p>
                    <p className="text-sm text-[#1e3a5f]/60">for 2 people</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-[#1e3a5f]">4.9</span>
                    </div>
                    <p className="text-xs text-[#1e3a5f]/60">Private Island</p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in the Madifushi Private Island Water Pool Villa package for 3 nights at $4,600 for 2 people. Please send availability and booking details.")}`}
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

            {/* Right - Instagram Gallery */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#1e3a5f] mb-4">Villa Gallery</h3>
              
              {/* Water Pool Villa */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/DLn8ANdN9Vp/embed" 
                  className="w-full h-[400px] border-0"
                  loading="lazy"
                  title="Madifushi - Water Pool Villa"
                  allowFullScreen
                />
                <div className="bg-white p-3 border-t">
                  <p className="text-sm font-medium text-[#1e3a5f]">Water Pool Villa</p>
                </div>
              </div>

              {/* Two Bedroom Beach Pool Villa */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/DLn66lbtYjW/embed" 
                  className="w-full h-[400px] border-0"
                  loading="lazy"
                  title="Madifushi - Two Bedroom Beach Pool Villa"
                  allowFullScreen
                />
                <div className="bg-white p-3 border-t">
                  <p className="text-sm font-medium text-[#1e3a5f]">Two Bedroom Beach Pool Villa</p>
                </div>
              </div>

              {/* Two Bedroom Water Pool Villa */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                <iframe 
                  src="https://www.instagram.com/p/DLn7s8ANhTl/embed" 
                  className="w-full h-[400px] border-0"
                  loading="lazy"
                  title="Madifushi - Two Bedroom Water Pool Villa"
                  allowFullScreen
                />
                <div className="bg-white p-3 border-t">
                  <p className="text-sm font-medium text-[#1e3a5f]">Two Bedroom Water Pool Villa</p>
                </div>
              </div>

              {/* Resort Highlights */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
                <h4 className="font-serif font-bold text-[#1e3a5f] mb-4">Resort Highlights</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Plane className="w-4 h-4 text-amber-500" />
                    <span>Seaplane Transfer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Utensils className="w-4 h-4 text-amber-500" />
                    <span>BlueFin Restaurant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Mandara Spa</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1e3a5f]">
                    <Waves className="w-4 h-4 text-amber-500" />
                    <span>Private Island</span>
                  </div>
                </div>
              </div>
            </div>
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

      <Footer />
    </div>
  );
};

export default Packages;