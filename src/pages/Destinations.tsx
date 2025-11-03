import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Activity, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import destinationsHero from "@/assets/destinations-hero.jpg";
import { destinationsData } from "@/data/destinationsData";

const Destinations = () => {
  const navigate = useNavigate();

  const destinations = Object.values(destinationsData);

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
                    src={destination.heroImage} 
                    alt={destination.name}
                    loading="lazy"
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
                    {destination.regions.slice(0, 4).map((r) => (
                      <span 
                        key={r.name}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {r.name}
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