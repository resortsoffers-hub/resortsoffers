import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Activity, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import destinationsHero from "@/assets/destinations-hero.jpg";

const Destinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      name: "Maldives",
      slug: "maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      description: "Paradise islands with overwater villas, crystal waters, and world-class luxury resorts",
      regions: ["North Malé Atoll", "South Malé Atoll", "Ari Atoll", "Baa Atoll"],
    },
    {
      name: "Dubai",
      slug: "dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      description: "Futuristic luxury, desert adventures, and world-class shopping in the heart of the UAE",
      regions: ["Downtown Dubai", "Palm Jumeirah", "Dubai Marina", "Jumeirah Beach"],
    },
    {
      name: "Thailand",
      slug: "thailand",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      description: "Experience the perfect blend of ancient culture and modern luxury in the Land of Smiles",
      regions: ["Phuket", "Bangkok", "Pattaya", "Koh Samui", "Krabi", "Chiang Mai"],
    },
    {
      name: "Bali",
      slug: "bali",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      description: "Spiritual tranquility meets tropical paradise with temples, rice terraces, and luxury villas",
      regions: ["Ubud", "Seminyak", "Nusa Dua", "Uluwatu"],
    },
    {
      name: "Japan",
      slug: "japan",
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
      description: "Ancient traditions harmonize with cutting-edge modernity in the Land of the Rising Sun",
      regions: ["Tokyo", "Kyoto", "Osaka", "Hokkaido"],
    },
    {
      name: "Switzerland",
      slug: "switzerland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      description: "Alpine luxury, pristine mountains, and world-renowned hospitality",
      regions: ["Zermatt", "St. Moritz", "Interlaken", "Geneva"],
    },
    {
      name: "Italy",
      slug: "italy",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      description: "Renaissance art, world-class cuisine, and romantic landscapes",
      regions: ["Tuscany", "Amalfi Coast", "Lake Como", "Sicily"],
    },
    {
      name: "Norway",
      slug: "norway",
      image: "https://images.unsplash.com/photo-1601439678777-b2d2d6fd6333?w=800&q=80",
      description: "Dramatic fjords, Northern Lights, and Scandinavian elegance",
      regions: ["Oslo", "Bergen", "Tromsø", "Lofoten"],
    },
    {
      name: "Finland",
      slug: "finland",
      image: "https://images.unsplash.com/photo-1517680944537-5d994a1ebf32?w=800&q=80",
      description: "Arctic wilderness, glass igloos, and the magical Northern Lights experience",
      regions: ["Lapland", "Helsinki", "Rovaniemi", "Lake District"],
    },
    {
      name: "United Kingdom",
      slug: "uk",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
      description: "Royal heritage, countryside estates, and sophisticated urban luxury",
      regions: ["London", "Scottish Highlands", "Cotswolds", "Edinburgh"],
    },
    {
      name: "China",
      slug: "china",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
      description: "Ancient wonders, modern megacities, and rich cultural heritage",
      regions: ["Beijing", "Shanghai", "Guilin", "Hong Kong"],
    },
    {
      name: "Malaysia",
      slug: "malaysia",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      description: "Tropical rainforests, pristine islands, and multicultural urban experiences",
      regions: ["Kuala Lumpur", "Langkawi", "Penang", "Borneo"],
    },
    {
      name: "Greece",
      slug: "greece",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
      description: "Ancient history, stunning islands, and Mediterranean luxury await",
      regions: ["Santorini", "Mykonos", "Crete", "Athens"],
    },
    {
      name: "Zanzibar",
      slug: "zanzibar",
      image: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80",
      description: "Exotic spice islands with white sand beaches and Swahili culture",
      regions: ["Stone Town", "Nungwi", "Kendwa", "Paje"],
    },
    {
      name: "South Africa",
      slug: "south-africa",
      image: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800&q=80",
      description: "Safari adventures, dramatic landscapes, and world-class wine estates",
      regions: ["Cape Town", "Kruger", "Garden Route", "Johannesburg"],
    },
    {
      name: "Seychelles",
      slug: "seychelles",
      image: "https://images.unsplash.com/photo-1589197331516-3c5d6e961f6c?w=800&q=80",
      description: "Pristine beaches, granite boulders, and exclusive island resorts in the Indian Ocean",
      regions: ["Mahé", "Praslin", "La Digue", "Silhouette"],
    },
    {
      name: "Mauritius",
      slug: "mauritius",
      image: "https://images.unsplash.com/photo-1535189043414-47a3c49a0fa5?w=800&q=80",
      description: "Tropical paradise offering diverse landscapes, luxury resorts, and vibrant culture",
      regions: ["North", "South", "East", "West"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Luxury Destinations | ResortsOffers.com</title>
        <meta name="description" content="Explore our handpicked luxury destinations worldwide. From Thailand to Maldives, Seychelles to Italy - discover your perfect getaway with expert guidance and exclusive offers." />
        <meta name="keywords" content="luxury destinations, Thailand resorts, Maldives holidays, Seychelles travel, Mauritius resorts, Greece islands, Italy luxury travel" />
        <link rel="canonical" href="https://www.resortsoffers.com/destinations" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Luxury Destinations | ResortsOffers.com" />
        <meta property="og:description" content="Explore our handpicked luxury destinations worldwide" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/destinations" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "ResortsOffers.com",
            "description": "Luxury travel destinations and resort experiences worldwide",
            "url": "https://www.resortsoffers.com/destinations"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-16">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${destinationsHero})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Handpicked Global Destinations
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover luxury resorts and unforgettable experiences in the world's most beautiful locations
            </p>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Card 
                key={destination.slug}
                className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/destinations/${destination.slug}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {destination.name}
                  </h3>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {destination.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.regions.slice(0, 4).map((region) => (
                      <span 
                        key={region}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Explore {destination.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Destinations;