import { useState } from "react";
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
      name: "Lefay Resort & SPA Dolomiti",
      location: "Italy",
      region: "Europe",
      rating: 5,
      description: "Luxury wellness resort nestled in the Italian Dolomites with stunning mountain views and world-class spa facilities.",
      features: ["Spa & Wellness", "Mountain Views", "Gourmet Dining", "Ski Access"]
    },
    {
      name: "Lefay Resort & SPA Lago di Garda",
      location: "Italy",
      region: "Europe",
      rating: 5,
      description: "Elegant lakeside retreat offering panoramic views of Lake Garda and comprehensive wellness programs.",
      features: ["Lakeside", "Wellness Center", "Fine Dining", "Private Beach"]
    },
    {
      name: "Allium Bodrum Resort & Spa",
      location: "Turkey",
      region: "Middle East",
      rating: 5,
      description: "Contemporary luxury resort on the Turkish Riviera combining modern design with traditional hospitality.",
      features: ["Beach Access", "Spa Treatments", "Water Sports", "All-Inclusive"]
    },
    {
      name: "Paradise Maldives Resort",
      location: "Maldives",
      region: "Asia",
      rating: 5,
      description: "Exclusive overwater villas in pristine tropical paradise with world-class diving and snorkeling.",
      features: ["Overwater Villas", "Diving Center", "Private Islands", "Butler Service"]
    },
    {
      name: "Desert Oasis Dubai",
      location: "UAE",
      region: "Middle East",
      rating: 5,
      description: "Luxurious desert resort combining Arabian heritage with contemporary elegance and adventure.",
      features: ["Desert Safari", "Spa Retreat", "Fine Dining", "Cultural Experiences"]
    },
    {
      name: "Santorini Sunset Suites",
      location: "Greece",
      region: "Europe",
      rating: 5,
      description: "Cliffside luxury suites with breathtaking caldera views and infinity pools overlooking the Aegean Sea.",
      features: ["Infinity Pools", "Sunset Views", "Wine Tastings", "Private Terraces"]
    }
  ];

  const regions = ["All", "Europe", "Middle East", "Asia"];

  const filteredResorts = selectedRegion === "All" 
    ? resorts 
    : resorts.filter(resort => resort.region === selectedRegion);

  return (
    <div className="min-h-screen">
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
            Luxury Resorts & Holiday Packages
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
                  <Button className="w-full" variant="outline">
                    View Details
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
