import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Building2, Gift, Users, Calendar, MapPin, Percent, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import BookingTabs from "@/components/BookingTabs";
import AddressSection from "@/components/AddressSection";
import maldivesWaldorf from "@/assets/maldives-waldorf.jpg";
import santoriniGreece from "@/assets/santorini-greece.jpg";
import dubaiFamily from "@/assets/dubai-family.jpg";
import maldivesWaterVilla from "@/assets/resorts/maldives-water-villa.jpg";
import maldivesVillaPool from "@/assets/resorts/maldives-villa-pool.jpg";
import maldivesKandinma from "@/assets/resorts/maldives-kandinma-hq.jpg";
import boraBora from "@/assets/resorts/bora-bora.jpg";
import dubaiLuxury from "@/assets/resorts/dubai-luxury.jpg";
import swissAlps from "@/assets/resorts/swiss-alps.jpg";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  const whatsappNumber = "971567622484";
  
  const getWhatsAppUrl = (offerTitle: string, destination: string, price: string) => {
    const message = `Hi! I'm interested in booking the "${offerTitle}" offer in ${destination}. Price: ${price}. Can you provide more details?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Hero Carousel Slides
  const heroSlides = [
    {
      image: maldivesWaldorf,
      title: "Maldives Paradise Awaits",
      subtitle: "Overwater villas & exclusive island experiences",
      buttonText: "Explore Offers",
      buttonLink: "/offers"
    },
    {
      image: dubaiLuxury,
      title: "Dubai Luxury Escapes",
      subtitle: "World-class hotels & unforgettable experiences",
      buttonText: "View Packages",
      buttonLink: "/resorts"
    },
    {
      image: santoriniGreece,
      title: "Romantic Santorini",
      subtitle: "Sunset views & honeymoon dreams come true",
      buttonText: "Book Now",
      buttonLink: "/offers"
    },
    {
      image: swissAlps,
      title: "Swiss Alps Retreat",
      subtitle: "Mountain luxury & winter wonderland",
      buttonText: "Discover More",
      buttonLink: "/resorts"
    }
  ];

  // Featured Destinations
  const featuredDestinations = [
    {
      name: "Maldives",
      image: maldivesVillaPool,
      resorts: "120+ resorts",
      rating: 4.9,
      startPrice: "$450"
    },
    {
      name: "Dubai",
      image: dubaiLuxury,
      resorts: "85+ hotels",
      rating: 4.8,
      startPrice: "$320"
    },
    {
      name: "Bora Bora",
      image: boraBora,
      resorts: "45+ resorts",
      rating: 4.9,
      startPrice: "$680"
    },
    {
      name: "Santorini",
      image: santoriniGreece,
      resorts: "60+ hotels",
      rating: 4.7,
      startPrice: "$380"
    }
  ];

  // Featured Special Offers - these are marked as featured on the Offers page
  const featuredOffers = [
    {
      title: "Maldives Overwater Paradise",
      destination: "Maldives - Waldorf Astoria",
      type: "Limited Time",
      discount: 40,
      validUntil: "2025-12-15",
      urgency: "Only 3 Villas Left!",
      description: "Exclusive 40% off overwater villas with private infinity pools, butler service, and sunset views.",
      features: ["Private Pool Villa", "Butler Service 24/7", "Seaplane Transfer Included", "Spa Credit $500", "Complimentary Excursions"],
      price: "$680/night",
      originalPrice: "$1,133",
      image: maldivesWaldorf,
      featured: true
    },
    {
      title: "Dubai Ultra Luxury Week",
      destination: "Dubai - Burj Al Arab",
      type: "Flash Sale",
      discount: 35,
      validUntil: "2025-11-20",
      description: "7-night stay at the world's most luxurious hotel with gold-plated interiors, personal butler, and Rolls-Royce transfers.",
      features: ["24/7 Butler Service", "Rolls-Royce Transfers", "Gold Suite", "Private Beach Access", "Fine Dining Credits"],
      price: "$2,850/night",
      originalPrice: "$4,385",
      image: dubaiLuxury,
      featured: true
    },
    {
      title: "Santorini Honeymoon Special",
      destination: "Santorini - Cave Suite",
      type: "Romantic Package",
      discount: 30,
      validUntil: "2025-12-31",
      urgency: "Book by Nov 30!",
      description: "Luxury cave suite with caldera views, private infinity pool, couples spa, champagne sunset cruise, and romantic dinners.",
      features: ["Cave Suite with Pool", "Sunset Cruise", "Couples Spa Package", "Champagne Welcome", "5 Romantic Dinners"],
      price: "$520/night",
      originalPrice: "$743",
      image: santoriniGreece,
      featured: true
    }
  ];

  // Features section data
  const features = [
    {
      icon: <Compass className="w-8 h-8 text-accent" />,
      title: t('services.travelConsultancy'),
      description: t('services.travelConsultancyDesc'),
      link: "/consultancy",
    },
    {
      icon: <Building2 className="w-8 h-8 text-accent" />,
      title: t('services.luxuryResorts'),
      description: t('services.luxuryResortsDesc'),
      link: "/resorts",
    },
    {
      icon: <Gift className="w-8 h-8 text-accent" />,
      title: t('services.specialOffers'),
      description: t('services.specialOffersDesc'),
      link: "/offers",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: t('services.expertTeam'),
      description: t('services.expertTeamDesc'),
      link: "/team",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Luxury Resort Deals & Exclusive Hotel Offers | ResortsOffers.com</title>
        <meta name="description" content="Discover exclusive luxury resort deals worldwide. Save up to 40% on premium hotels in Maldives, Dubai, Bali & more. Expert travel consultancy & personalized booking services." />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
        <meta name="keywords" content="luxury resorts, hotel deals, resort offers, travel packages, Maldives resorts, Dubai hotels, luxury travel, honeymoon packages, beach resorts, exclusive deals" />
        <link rel="canonical" href="https://www.resortsoffers.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/" />
        <meta property="og:title" content="Luxury Resort Deals & Exclusive Hotel Offers | ResortsOffers.com" />
        <meta property="og:description" content="Discover exclusive luxury resort deals worldwide. Save up to 40% on premium hotels in Maldives, Dubai, Bali & more." />
        <meta property="og:image" content="https://www.resortsoffers.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.resortsoffers.com/" />
        <meta name="twitter:title" content="Luxury Resort Deals & Exclusive Hotel Offers" />
        <meta name="twitter:description" content="Discover exclusive luxury resort deals worldwide. Save up to 40% on premium hotels." />
        <meta name="twitter:image" content="https://www.resortsoffers.com/og-image.jpg" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ResortsOffers.com",
            "alternateName": "Resorts Offers",
            "url": "https://www.resortsoffers.com",
            "logo": "https://www.resortsoffers.com/logo.png",
            "description": "Premium luxury travel agency specializing in exclusive resort deals, personalized vacation planning, and hospitality consultancy services worldwide.",
            "foundingDate": "2020",
            "telephone": ["+971567622484", "+966582360080", "+447500029091"],
            "email": "info@resortsoffers.com",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Deira - Port Saeed",
              "addressLocality": "Dubai",
              "addressCountry": "AE"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+971567622484",
                "contactType": "Customer Service",
                "availableLanguage": ["English", "Arabic", "Chinese", "Russian"],
                "areaServed": "Worldwide",
                "hoursAvailable": "24/7"
              }
            ],
            "sameAs": [
              "https://www.instagram.com/resortsoffers",
              "https://www.facebook.com/resortsoffers",
              "https://www.linkedin.com/company/resortsoffers"
            ],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": "280",
              "highPrice": "850",
              "offerCount": "100+"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ResortsOffers.com",
            "image": "https://www.resortsoffers.com/logo.png",
            "@id": "https://www.resortsoffers.com",
            "url": "https://www.resortsoffers.com",
            "telephone": "+971567622484",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Deira - Port Saeed",
              "addressLocality": "Dubai",
              "addressCountry": "AE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 25.2532,
              "longitude": 55.3307
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            }
          })}
        </script>
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
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ResortsOffers.com",
            "url": "https://www.resortsoffers.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.resortsoffers.com/resorts?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I book a luxury resort through ResortsOffers.com?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Booking is simple: browse our exclusive resort offers, select your preferred package, and click 'Book Now' to contact our travel consultants via WhatsApp. We'll handle all arrangements including flights, transfers, and special requests to ensure your dream vacation."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods do you accept?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept Visa, Mastercard, American Express, Tabby, and Tamara for your convenience. Multiple payment options are available to make booking your luxury vacation as seamless as possible."
                }
              },
              {
                "@type": "Question",
                "name": "Can I get a custom travel package?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Our expert travel consultants specialize in creating personalized luxury vacation packages tailored to your preferences, budget, and travel dates. Contact us for a free consultation to design your perfect getaway."
                }
              },
              {
                "@type": "Question",
                "name": "What is your cancellation policy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cancellation policies vary by resort and booking type. Generally, cancellations made 30+ days before arrival receive full refunds, 15-30 days receive 50% refunds, and less than 15 days may be non-refundable. We'll provide specific terms during booking."
                }
              },
              {
                "@type": "Question",
                "name": "Are the prices shown final or do they include taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Prices displayed are starting rates per night and may not include taxes, resort fees, or additional services. Our consultants will provide complete pricing including all applicable fees and taxes when you inquire about a specific offer."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer honeymoon packages?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We specialize in romantic honeymoon packages featuring overwater villas, couples spa treatments, private dining experiences, and special amenities. Our team can create the perfect honeymoon tailored to your romantic vision."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Carousel Section */}
      <section className="mt-16">
        <HeroCarousel slides={heroSlides} />
        
        {/* Booking Tabs Widget */}
        <div className="container-custom">
          <BookingTabs />
        </div>
      </section>

      {/* FEATURED OFFERS - HERO SECTION (Moved to top for maximum visibility) */}
      <section className="section-padding bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 px-6 py-2 text-base bg-accent/20 text-accent border-2 border-accent">
              🔥 HOT DEALS - LIMITED TIME ONLY
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Exclusive Luxury Offers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Save up to 40% on handpicked luxury resorts. Book now before they're gone!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {featuredOffers.map((offer, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent relative animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Urgency Banner */}
                {offer.urgency && (
                  <div className="absolute top-0 left-0 right-0 bg-destructive text-destructive-foreground text-center py-2 px-4 text-sm font-bold z-10 animate-pulse">
                    ⚡ {offer.urgency}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={`${offer.title} - ${offer.destination}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-16 right-4">
                    <div className="bg-accent text-accent-foreground rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-2xl animate-pulse border-4 border-background">
                      <span className="text-3xl font-black">{offer.discount}%</span>
                      <span className="text-xs font-bold">OFF</span>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <Badge className="absolute top-20 left-4 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold">
                    {offer.type}
                  </Badge>

                  {/* Bottom info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{offer.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{offer.destination}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Valid Until */}
                  <div className="flex items-center justify-between text-sm pb-3 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Valid until {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 pb-4 border-b">
                    <p className="font-bold text-sm text-foreground">What's Included:</p>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {offer.features.slice(0, 3).map((feature, fIndex) => (
                        <li key={fIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-accent font-bold text-base">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {offer.features.length > 3 && (
                      <p className="text-xs text-accent font-semibold">+ {offer.features.length - 3} more benefits</p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      {offer.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">{offer.originalPrice}</span>
                      )}
                      <span className="text-3xl font-black text-primary">{offer.price}</span>
                    </div>
                    
                    {/* CTA Button */}
                    <a
                      href={getWhatsAppUrl(offer.title, offer.destination, offer.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full h-12 text-base font-bold bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all">
                        🎉 Book This Deal Now
                      </Button>
                    </a>
                    <p className="text-center text-xs text-muted-foreground">
                      💬 Instant WhatsApp confirmation
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center">
            <Link to="/offers">
              <Button size="lg" className="text-lg px-12 h-14 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all font-bold">
                🔍 Explore All 50+ Exclusive Offers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Destinations</h2>
            <Link to="/resorts">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination, index) => (
              <Link key={index} to="/resorts">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer">
                  <div className="relative h-56">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{destination.resorts}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Starting from</span>
                      <span className="text-xl font-bold text-primary">{destination.startPrice}/night</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            {t('services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's New - Now with REAL OFFERS */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-primary">What's New This Week</h2>
            <p className="text-lg text-muted-foreground">Fresh deals just added - grab them before they're gone!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Offer 1 */}
            <Link to="/offers">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-accent">
                <div className="relative h-56 overflow-hidden">
                  <img src={maldivesKandinma} alt="Maldives All-Inclusive" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1.5 text-sm font-bold">
                    NEW 🔥
                  </Badge>
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground rounded-full w-16 h-16 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">35%</span>
                    <span className="text-xs">OFF</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Maldives All-Inclusive</h3>
                    <p className="text-sm opacity-90">5 nights + flights</p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-sm text-muted-foreground line-through mr-2">$2,850</span>
                      <span className="text-2xl font-black text-primary">$1,850</span>
                      <span className="text-sm text-muted-foreground">/person</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Luxury resort with all meals, drinks, water sports & spa included. Limited to 10 bookings.
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 font-bold">
                    Book Now - 3 Spots Left!
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Offer 2 */}
            <Link to="/offers">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-accent">
                <div className="relative h-56 overflow-hidden">
                  <img src={dubaiFamily} alt="Dubai Family Week" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1.5 text-sm font-bold">
                    NEW 🔥
                  </Badge>
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground rounded-full w-16 h-16 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">40%</span>
                    <span className="text-xs">OFF</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Dubai Family Adventure</h3>
                    <p className="text-sm opacity-90">7 nights + theme parks</p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-sm text-muted-foreground line-through mr-2">$3,200</span>
                      <span className="text-2xl font-black text-primary">$1,920</span>
                      <span className="text-sm text-muted-foreground">/family</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    5-star hotel + unlimited theme park access for 2 adults & 2 kids. Kids eat free!
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 font-bold">
                    Book Now - Ends Nov 30!
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Offer 3 */}
            <Link to="/offers">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-accent">
                <div className="relative h-56 overflow-hidden">
                  <img src={santoriniGreece} alt="Santorini Romance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1.5 text-sm font-bold">
                    NEW 🔥
                  </Badge>
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground rounded-full w-16 h-16 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">30%</span>
                    <span className="text-xs">OFF</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Santorini Honeymoon</h3>
                    <p className="text-sm opacity-90">6 nights romance package</p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-sm text-muted-foreground line-through mr-2">$3,600</span>
                      <span className="text-2xl font-black text-primary">$2,520</span>
                      <span className="text-sm text-muted-foreground">/couple</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cave suite with pool, couples spa, sunset cruise & romantic dinners included.
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 font-bold">
                    Book Now - 5 Suites Left!
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('cta.description')}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Address Section with Map */}
      <AddressSection />

      <Footer />
    </div>
  );
};

export default Index;
