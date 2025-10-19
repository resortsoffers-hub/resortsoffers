import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Percent, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

const Offers = () => {
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [selectedSubFilter, setSelectedSubFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Featured");
  
  const subFilters: Record<string, string[]> = {
    "Maldives": [
      "Sea plane",
      "Domestic flight",
      "Speed boat",
      "Honeymooners",
      "Families",
      "Ladies",
      "All inclusive",
      "Water pool villa"
    ],
    "Seychelles": [
      "Prasline island",
      "Mahe",
      "La digue",
      "Private island"
    ]
  };

  const offers = [
    {
      title: "Early Bird Summer Escape",
      destination: "Maldives",
      type: "Seasonal",
      discount: 30,
      validUntil: "2025-12-31",
      description: "Book 90 days in advance and save 30% on your tropical paradise getaway with overwater villa accommodation.",
      features: ["Free Airport Transfer", "Daily Breakfast", "Spa Credit $200"],
      price: "from $450/night",
      featured: true
    },
    {
      title: "Romantic Honeymoon Package",
      destination: "Santorini, Greece",
      type: "Package",
      discount: 25,
      validUntil: "2026-03-31",
      description: "Celebrate your love with champagne, couples spa treatment, and sunset dinner at our exclusive cliffside restaurant.",
      features: ["Champagne on Arrival", "Couples Massage", "Private Dinner"],
      price: "from $550/night",
      featured: true
    },
    {
      title: "Ski Season Special",
      destination: "Dolomiti, Italy",
      type: "Seasonal",
      discount: 20,
      validUntil: "2026-03-15",
      description: "Hit the slopes with our winter special including ski pass, equipment rental, and après-ski wellness treatments.",
      features: ["Ski Pass Included", "Equipment Rental", "Daily Spa Access"],
      price: "from $380/night",
      featured: false
    },
    {
      title: "Family Adventure Package",
      destination: "Dubai, UAE",
      type: "Package",
      discount: 35,
      validUntil: "2025-12-20",
      description: "Ultimate family experience with theme park tickets, kids club access, and connecting rooms for maximum comfort.",
      features: ["Kids Stay Free", "Theme Park Tickets", "Kids Club Access"],
      price: "from $320/night",
      featured: true
    },
    {
      title: "Wellness Retreat Offer",
      destination: "Lake Garda, Italy",
      type: "Wellness",
      discount: 15,
      validUntil: "2026-06-30",
      description: "5-night wellness program including daily yoga, meditation, spa treatments, and organic gourmet cuisine.",
      features: ["Daily Yoga", "Spa Treatments", "Wellness Menu"],
      price: "from $420/night",
      featured: false
    },
    {
      title: "Last Minute Beach Escape",
      destination: "Bodrum, Turkey",
      type: "Last Minute",
      discount: 40,
      validUntil: "2025-11-30",
      description: "Book within 14 days of arrival for exclusive savings on all-inclusive beach resort experience.",
      features: ["All-Inclusive", "Water Sports", "Beach Club Access"],
      price: "from $280/night",
      featured: true
    }
  ];

  const toggleSubFilter = (filter: string) => {
    setSelectedSubFilter(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredOffers = selectedDestination === "All" 
    ? offers 
    : offers.filter(offer => {
        const matchesDestination = offer.destination.includes(selectedDestination);
        if (selectedSubFilter.length === 0) return matchesDestination;
        
        // Here you would match sub-filters based on offer properties
        // For now, just filter by destination
        return matchesDestination;
      });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === "Featured") return b.featured ? 1 : -1;
    if (sortBy === "Discount") return b.discount - a.discount;
    return 0;
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href="https://www.resortsoffers.com/offers" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding mt-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Special Offers
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground">
            Exclusive deals on luxury destinations worldwide - Limited time only
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Search Bar with Destination Filter */}
          <div className="mb-8">
            <SearchBar 
              selectedDestination={selectedDestination}
              onDestinationChange={(dest) => {
                setSelectedDestination(dest);
                setSelectedSubFilter([]);
              }}
            />
          </div>

          {/* Sub Filters */}
          {selectedDestination !== "All" && subFilters[selectedDestination] && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                {selectedDestination} Filters
              </h2>
              <div className="flex gap-2 flex-wrap">
                {subFilters[selectedDestination].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedSubFilter.includes(filter) ? "default" : "outline"}
                    onClick={() => toggleSubFilter(filter)}
                    size="sm"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Sort By */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">Sort By</h2>
            <div className="flex gap-2">
              {["Featured", "Discount"].map((sort) => (
                <Button
                  key={sort}
                  variant={sortBy === sort ? "default" : "outline"}
                  onClick={() => setSortBy(sort)}
                  size="sm"
                >
                  {sort}
                </Button>
              ))}
            </div>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedOffers.map((offer, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{offer.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{offer.destination}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        <Percent size={14} className="mr-1" />
                        {offer.discount}% OFF
                      </Badge>
                      {offer.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {offer.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {offer.features.map((feature, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-3 py-1 bg-muted rounded-full flex items-center"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent mr-2" />
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-2xl font-bold text-primary">{offer.price}</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Calendar size={12} className="mr-1" />
                          Valid until {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <Button size="lg">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss an Exclusive Offer
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to receive our latest luxury travel deals and special packages directly to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
            />
            <Button size="lg" className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offers;
