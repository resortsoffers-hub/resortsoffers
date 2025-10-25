import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Activity, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Destinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      name: "Thailand",
      slug: "thailand",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      description: "Experience the perfect blend of ancient culture and modern luxury in the Land of Smiles",
      regions: ["Phuket", "Bangkok", "Pattaya", "Koh Samui", "Krabi", "Chiang Mai"],
    },
    {
      name: "Maldives",
      slug: "maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      description: "Paradise islands with overwater villas, crystal waters, and world-class luxury resorts",
      regions: ["North Malé Atoll", "South Malé Atoll", "Ari Atoll", "Baa Atoll"],
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
    {
      name: "Greece",
      slug: "greece",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
      description: "Ancient history, stunning islands, and Mediterranean luxury await",
      regions: ["Santorini", "Mykonos", "Crete", "Athens"],
    },
    {
      name: "Italy",
      slug: "italy",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      description: "Renaissance art, world-class cuisine, and romantic landscapes",
      regions: ["Tuscany", "Veneto", "Lombardy", "Sicily"],
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
        <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark overflow-hidden mt-16">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')" }}
          />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
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