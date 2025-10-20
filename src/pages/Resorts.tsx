import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import packagesImage from "@/assets/packages.jpg";

const Resorts = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const resorts = [
    {
      name: "The Ritz-Carlton Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Be surrounded by azure sky and ocean at The Ritz-Carlton Maldives, Fari Islands, featuring luxury villas and world-class amenities.",
      features: ["Overwater Villas", "Kids Club", "Spa & Wellness", "Multiple Restaurants"],
      website: "https://www.ritzcarlton.com/en/hotels/maldives"
    },
    {
      name: "Patina Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "A 42-hectare island haven of freedom and wonder, offering perpetual flow of inspiration with world-class dining destinations.",
      features: ["Beach & Overwater Villas", "Multiple Dining", "Wellness Center", "Cultural Events"],
      website: "https://www.patinamaldives.com"
    },
    {
      name: "One&Only Reethi Rah",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Surrounded by azure sky and ocean, immersed in iconic over-water villas with eight restaurants and five bars.",
      features: ["Overwater Villas", "8 Restaurants", "5 Bars", "Private Beach"],
      website: "https://www.oneandonlyresorts.com/one-and-only-reethi-rah-maldives"
    },
    {
      name: "Four Seasons Landaa Giraavaru",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "UNESCO Biosphere Reserve luxury resort offering pristine natural beauty and world-class hospitality.",
      features: ["Beach Villas", "Marine Discovery", "Spa Retreat", "Fine Dining"],
      website: "https://www.fourseasons.com/maldiveslg"
    },
    {
      name: "Jumeirah Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Experience luxury in the Maldives with Jumeirah's signature hospitality, featuring elegant villas and exceptional dining.",
      features: ["Water Villas", "Spa Services", "Water Sports", "Kids Club"],
      website: "https://www.jumeirah.com/en/stay/maldives"
    },
    {
      name: "OZEN Reserve Bolifushi",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Your intimate escape into luxury where opulence meets meaningful connection. Cultural immersion with Maldivian-inspired cuisine.",
      features: ["All-Inclusive", "Wellness Journey", "Cultural Immersion", "Private Pool Villas"],
      website: "https://ozenreserve.com"
    },
    {
      name: "Waldorf Astoria Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Iconic luxury resort in the Maldives offering exceptional service and pristine natural beauty in an exclusive setting.",
      features: ["Reef & Beach Villas", "Spa Sanctuary", "Multiple Dining", "Water Sports"],
      website: "https://www.waldorfastoriamaldives.com"
    },
    {
      name: "Villa Private Island",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Ultimate privacy and luxury in exclusive private island villas with personalized service and bespoke experiences.",
      features: ["Private Islands", "Butler Service", "Yacht Excursions", "Exclusive Dining"],
      website: "https://www.villahotels.com"
    },
    {
      name: "Cheval Blanc Randheli",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "A new contemporary vision of hospitality promoting French craftsmanship and Art de Vivre à la française in the Maldives.",
      features: ["Luxury Villas", "French Cuisine", "Spa by Guerlain", "Private Island"],
      website: "https://www.chevalblanc.com/en/maison/maldives-randheli"
    },
    {
      name: "Joali Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "An immersive luxury experience where art meets nature. Discover bespoke design, world-class dining, and unparalleled service.",
      features: ["Art Gallery", "Private Beaches", "Underwater Restaurant", "Spa Sanctuary"],
      website: "https://www.joali.com"
    },
    {
      name: "Soneva Fushi",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Barefoot luxury in a pristine tropical paradise. Experience sustainable sophistication with oversized villas and exceptional dining.",
      features: ["Eco-Luxury Villas", "Observatory", "Outdoor Cinema", "Organic Cuisine"],
      website: "https://www.soneva.com/soneva-fushi"
    },
    {
      name: "JW Marriott Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Sophisticated island sanctuary offering contemporary luxury with stunning overwater and beach villas in the heart of the Maldives.",
      features: ["Overwater Pool Villas", "Multiple Restaurants", "Spa & Wellness", "Water Sports Center"],
      website: "https://www.marriott.com/hotels/travel/mlejw-jw-marriott-maldives-resort-and-spa"
    },
    {
      name: "SO/ Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Bold, playful, and avant-garde luxury resort inspired by fashion and design. Experience the extraordinary with vibrant energy.",
      features: ["Designer Villas", "Fashion Events", "Gourmet Dining", "Beach Club"],
      website: "https://www.so-maldives.com"
    },
    {
      name: "Kuda Villingili Resort",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Tropical island paradise combining natural beauty with refined luxury. Enjoy pristine beaches and exceptional personalized service.",
      features: ["Beach & Water Villas", "Infinity Pools", "Spa Treatments", "Water Activities"],
      website: "https://www.kudavillingili.com"
    },
    {
      name: "Niyama Private Islands",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Two stunning private islands offering ultimate freedom and bespoke experiences. Redefine luxury with underwater restaurants and more.",
      features: ["Private Islands", "Underwater Nightclub", "Surf School", "Spa by Drift"],
      website: "https://www.niyama.com"
    },
    {
      name: "W Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Contemporary luxury meets island paradise. Experience vibrant energy, innovative design, and world-class entertainment.",
      features: ["Overwater Bungalows", "Beach Club", "AWAY Spa", "Water Sports"],
      website: "https://www.marriott.com/hotels/travel/mlewh-w-maldives"
    },
    {
      name: "Hilton Maldives Amingiri",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Intimate island resort featuring pristine beaches, turquoise lagoons, and sophisticated accommodation with modern amenities.",
      features: ["Beach & Overwater Villas", "All-Inclusive Options", "Spa Wellness", "Kids Club"],
      website: "https://www.hilton.com/en/hotels/mleaahh-hilton-maldives-amingiri-resort-and-spa"
    },
    {
      name: "Hard Rock Hotel Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Rock star luxury in paradise. Enjoy music-inspired experiences, legendary service, and world-class entertainment.",
      features: ["Rock Spa", "Live Music", "Overwater Villas", "Signature Dining"],
      website: "https://www.hardrockhotels.com/maldives"
    },
    {
      name: "Dusit Thani Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Thai-inspired luxury resort combining warm hospitality with stunning natural beauty. Experience authentic Thai wellness and cuisine.",
      features: ["Thai Spa", "Authentic Cuisine", "Beach & Ocean Villas", "Dive Center"],
      website: "https://www.dusit.com/dusitthani-maldives"
    },
    {
      name: "Siyam World Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "The ultimate playground for adventure seekers and families. Experience thrilling water sports, entertainment, and luxury accommodations.",
      features: ["Water Park", "Adventure Sports", "Family Villas", "Multiple Restaurants"],
      website: "https://www.siyam.com/siyamworld"
    },
    {
      name: "Joy Island Maldives",
      location: "Maldives",
      region: "Maldives",
      rating: 5,
      description: "Contemporary island retreat offering modern luxury and genuine Maldivian hospitality in a vibrant tropical setting.",
      features: ["Modern Villas", "Beach Access", "Spa Services", "Water Activities"],
      website: "https://www.joyislandmaldives.com"
    }
  ];

  const regions = ["All", "Maldives"];

  const filteredResorts = selectedRegion === "All" 
    ? resorts 
    : resorts.filter(resort => resort.region === selectedRegion);

  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href="https://www.resortsoffers.com/resorts" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img 
            src={packagesImage} 
            alt="Luxury resort paradise" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/50" />
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold hero-text mb-6 animate-fade-in">
            Our Partners - Luxury Resorts
          </h1>
          <p className="text-xl md:text-2xl hero-text max-w-3xl mx-auto">
            Discover our curated collection of the world's finest luxury properties
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
                size="lg"
              >
                {region}
              </Button>
            ))}
          </div>

          {/* Resorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-300" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{resort.name}</CardTitle>
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(resort.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin size={16} className="mr-1" />
                    {resort.location}
                  </div>
                  <CardDescription className="text-base">
                    {resort.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resort.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-3 py-1 bg-muted rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => window.open(resort.website, '_blank')}
                  >
                    Visit Website
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Create Your Perfect Luxury Escape
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Our travel experts will craft a bespoke holiday package tailored to your preferences and desires.
          </p>
          <a href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Request Custom Package
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resorts;
