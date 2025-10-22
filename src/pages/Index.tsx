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
      title: "Early Bird Summer Escape",
      destination: "Maldives",
      type: "Seasonal",
      discount: 30,
      validUntil: "2025-12-31",
      description: "Book 90 days in advance and save 30% on your tropical paradise getaway with overwater villa accommodation.",
      features: ["Free Airport Transfer", "Daily Breakfast", "Spa Credit $200"],
      price: "from $450/night",
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
      image: santoriniGreece
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
      image: dubaiFamily
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
      image: maldivesWaterVilla
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
      image: maldivesVillaPool
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
      image: maldivesKandinma
    }
  ];
  
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

      {/* What's New Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">What's new</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img src={maldivesKandinma} alt="Summer Campaign" className="w-full h-full object-cover" />
                <Badge className="absolute top-4 left-4 bg-accent">New</Badge>
              </div>
              <CardHeader>
                <CardTitle>Winter Your Way</CardTitle>
                <CardDescription>
                  Discover exclusive winter escapes with up to 35% off luxury resorts worldwide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img src={dubaiFamily} alt="Family Packages" className="w-full h-full object-cover" />
                <Badge className="absolute top-4 left-4 bg-secondary">Featured</Badge>
              </div>
              <CardHeader>
                <CardTitle>Family Adventure Packages</CardTitle>
                <CardDescription>
                  Kids stay free + theme park tickets included in select Dubai hotels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img src={santoriniGreece} alt="Honeymoon Specials" className="w-full h-full object-cover" />
                <Badge className="absolute top-4 left-4 bg-primary">Exclusive</Badge>
              </div>
              <CardHeader>
                <CardTitle>Honeymoon Specials</CardTitle>
                <CardDescription>
                  Romantic packages with champagne, spa treatments & private dining
                </CardDescription>
              </CardHeader>
            </Card>
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

      {/* Featured Offers Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Exclusive Special Offers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked exclusive deals with savings up to 40% off. Limited availability - book your dream vacation today!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredOffers.map((offer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in hover-scale border-2 hover:border-accent">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={`${offer.title} - ${offer.destination}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground text-lg px-3 py-1">
                      <Percent className="w-4 h-4 mr-1 inline" />
                      {offer.discount}% OFF
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{offer.title}</CardTitle>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">{offer.type}</Badge>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{offer.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Until {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {offer.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">Included:</p>
                    <ul className="space-y-1">
                      {offer.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="text-accent">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary">{offer.price}</span>
                    </div>
                    <a
                      href={getWhatsAppUrl(offer.title, offer.destination, offer.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-accent hover:bg-accent/90">
                        Book Now
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/offers">
              <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                View All Offers
              </Button>
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
