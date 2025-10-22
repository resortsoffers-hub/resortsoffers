import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Percent, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import maldivesAerial1 from "@/assets/resorts/maldives-aerial-1.jpg";
import maldivesAerial2 from "@/assets/resorts/maldives-aerial-2.jpg";
import maldivesPoolDining from "@/assets/resorts/maldives-pool-dining.jpg";
import maldivesWaterVilla from "@/assets/resorts/maldives-water-villa.jpg";
import maldivesVillaPool from "@/assets/resorts/maldives-villa-pool.jpg";
import maldivesWaldorf from "@/assets/maldives-waldorf.jpg";
import maldivesPatina from "@/assets/maldives-patina.jpg";
import maldivesOceanPool from "@/assets/maldives-ocean-pool.jpg";
import maldivesRitz from "@/assets/maldives-ritz.jpg";
import maldivesVillas from "@/assets/maldives-villas.jpg";
import santoriniGreece from "@/assets/santorini-greece.jpg";
import dolomitiSki from "@/assets/dolomiti-ski.jpg";
import dubaiFamily from "@/assets/dubai-family.jpg";
import lakeGardaWellness from "@/assets/lake-garda-wellness.jpg";
import bodrumBeach from "@/assets/bodrum-beach.jpg";

const Offers = () => {
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [selectedSubFilter, setSelectedSubFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("RO Preferred");

  const whatsappNumber = "971567622484";
  
  const heroImages = [
    { src: maldivesAerial1, alt: "Aerial view of luxury Maldives resort with overwater villas and pristine turquoise lagoon" },
    { src: maldivesAerial2, alt: "Stunning aerial perspective of Maldives island resort surrounded by crystal clear waters" },
    { src: maldivesPoolDining, alt: "Luxury infinity pool with oceanfront dining at sunset in Maldives resort" },
    { src: maldivesWaterVilla, alt: "Exclusive overwater villa with private pool and ocean access in Maldives" },
    { src: maldivesVillaPool, alt: "Premium water villa with infinity pool overlooking turquoise Maldives lagoon" },
  ];

  const handleBookNow = (offerTitle: string, destination: string, price: string) => {
    const message = `Hi! I'm interested in booking the "${offerTitle}" offer in ${destination}. Price: ${price}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
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
      featured: true,
      image: maldivesWaldorf
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
      featured: true,
      image: santoriniGreece
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
      featured: false,
      image: dolomitiSki
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
      featured: true,
      image: dubaiFamily
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
      featured: false,
      image: lakeGardaWellness
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
      featured: true,
      image: bodrumBeach
    },
    {
      title: "Luxury Water Villa Experience",
      destination: "Maldives",
      type: "Package",
      discount: 25,
      validUntil: "2026-04-30",
      description: "Stay in a stunning overwater villa with private pool, direct ocean access, and sunset views.",
      features: ["Private Pool", "Ocean Access", "Butler Service"],
      price: "from $680/night",
      featured: true,
      image: maldivesPatina
    },
    {
      title: "Exclusive Ocean Pool Villa",
      destination: "Maldives",
      type: "Luxury",
      discount: 20,
      validUntil: "2026-05-31",
      description: "Ultra-modern circular villa on stilts with infinity pool, direct ocean views, and contemporary design.",
      features: ["Infinity Pool", "Modern Design", "Ocean Views"],
      price: "from $850/night",
      featured: true,
      image: maldivesOceanPool
    },
    {
      title: "Ritz-Carlton Beach Paradise",
      destination: "Maldives",
      type: "Luxury",
      discount: 30,
      validUntil: "2026-03-31",
      description: "Signature Ritz-Carlton service in pristine beach villas surrounded by turquoise waters and white sand.",
      features: ["Beach Villa", "World-Class Service", "Water Sports"],
      price: "from $720/night",
      featured: true,
      image: maldivesRitz
    },
    {
      title: "Maldives Villa Collection",
      destination: "Maldives",
      type: "Package",
      discount: 35,
      validUntil: "2026-06-30",
      description: "Choose from our collection of overwater villas with private pools and direct lagoon access.",
      features: ["Private Villas", "All-Inclusive Option", "Water Activities"],
      price: "from $520/night",
      featured: true,
      image: maldivesVillas
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
    if (sortBy === "RO Preferred") return b.featured ? 1 : -1;
    if (sortBy === "Discount") return b.discount - a.discount;
    return 0;
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Exclusive Resort Offers & Deals - Up to 40% OFF | ResortsOffers.com</title>
        <meta name="description" content="Limited-time luxury resort offers! Save up to 40% on Maldives water villas, Dubai beach resorts, Bali honeymoon packages & more. Book your dream vacation today." />
        <meta name="keywords" content="resort deals, hotel offers, Maldives deals, Dubai hotel offers, honeymoon packages, luxury resort discounts, beach resort deals, exclusive travel offers" />
        <link rel="canonical" href="https://www.resortsoffers.com/offers" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/offers" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Exclusive Resort Offers & Deals - Up to 40% OFF" />
        <meta property="og:description" content="Limited-time luxury resort offers! Save up to 40% on Maldives, Dubai, Bali & more." />
        <meta property="og:image" content="https://www.resortsoffers.com/offers-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.resortsoffers.com/offers" />
        <meta name="twitter:title" content="Exclusive Resort Offers - Up to 40% OFF" />
        <meta name="twitter:description" content="Limited-time luxury resort offers! Save up to 40% on premium hotels." />
        <meta name="twitter:image" content="https://www.resortsoffers.com/offers-og.jpg" />
        
        {/* Structured Data - Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.resortsoffers.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Offers",
                "item": "https://www.resortsoffers.com/offers"
              }
            ]
          })}
        </script>
        {/* Structured Data - Offers */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            "name": "Luxury Resort Offers",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Maldives Luxury Resort Packages",
                  "description": "Exclusive water villa deals with up to 40% discount"
                },
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "priceCurrency": "USD",
                  "price": "Starting from $500/night"
                }
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much can I save with these resort offers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our exclusive resort offers provide savings of up to 40% off regular rates. Discounts vary by destination, season, and booking advance time. Early bird bookings typically offer 25-30% savings, while last-minute deals can reach 40% off."
                }
              },
              {
                "@type": "Question",
                "name": "What is included in the resort packages?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Package inclusions vary by offer but typically include accommodation, daily breakfast, airport transfers, and resort credits. Premium packages may include spa treatments, excursions, and all-inclusive dining. Each offer clearly lists all included amenities."
                }
              },
              {
                "@type": "Question",
                "name": "When is the best time to book resort deals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The best time to book is 60-90 days in advance for optimal selection and pricing. However, we also offer exceptional last-minute deals for flexible travelers. Subscribe to our newsletter to receive alerts on flash sales and limited-time offers."
                }
              },
              {
                "@type": "Question",
                "name": "Are these offers available for all travel dates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most offers have specific validity periods and blackout dates during peak seasons and holidays. Each offer displays its valid booking and travel dates. Contact our consultants to check availability for your preferred travel dates."
                }
              },
              {
                "@type": "Question",
                "name": "Can I combine multiple offers or discounts?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Generally, offers cannot be combined with other promotions. However, some resorts allow stacking of resort credits or loyalty benefits. Our consultants will help you find the best value option for your specific booking."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[70vh]">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/50" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        <div className="absolute z-10 container-custom text-center pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-bold hero-text mb-6 animate-fade-in">
            Resorts Offers
          </h1>
          <p className="text-xl md:text-2xl hero-text max-w-3xl mx-auto">
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
              {["RO Preferred", "Discount"].map((sort) => (
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
                {offer.image && (
                  <div className="w-full h-64 overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
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
                        <Badge variant="default">RO Preferred</Badge>
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
                      <Button 
                        size="lg"
                        onClick={() => handleBookNow(offer.title, offer.destination, offer.price)}
                        className="relative z-10 cursor-pointer pointer-events-auto"
                      >
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
