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
  ExternalLink
} from "lucide-react";

// Cocoon Resort Images
import cocoonAerial from "@/assets/resorts/you-and-me-cocoon-aerial.jpg";
import cocoonVillaPool from "@/assets/resorts/you-and-me-cocoon-villa-pool.jpg";
import cocoonAquaSuite from "@/assets/resorts/you-and-me-cocoon-aqua-suite.jpg";
import cocoonSuite from "@/assets/resorts/you-and-me-cocoon-suite.jpg";
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