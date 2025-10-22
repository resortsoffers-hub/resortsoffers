import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Building2, Gift, Users, Calendar, MapPin, Percent } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import AddressSection from "@/components/AddressSection";
import heroImage from "@/assets/resorts/bali-clifftop-resort.jpg";
import maldivesWaldorf from "@/assets/maldives-waldorf.jpg";
import santoriniGreece from "@/assets/santorini-greece.jpg";
import dubaiFamily from "@/assets/dubai-family.jpg";
import maldivesWaterVilla from "@/assets/resorts/maldives-water-villa.jpg";
import maldivesVillaPool from "@/assets/resorts/maldives-villa-pool.jpg";
import maldivesKandinma from "@/assets/resorts/maldives-kandinma-hq.jpg";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  const whatsappNumber = "971567622484";
  
  const getWhatsAppUrl = (offerTitle: string, destination: string, price: string) => {
    const message = `Hi! I'm interested in booking the "${offerTitle}" offer in ${destination}. Price: ${price}. Can you provide more details?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const featuredOffers = [
    {
      title: "Early Bird Summer Escape",
      destination: "Maldives",
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
      discount: 35,
      validUntil: "2025-12-20",
      description: "Ultimate family experience with theme park tickets, kids club access, and connecting rooms for maximum comfort.",
      features: ["Kids Stay Free", "Theme Park Tickets", "Kids Club Access"],
      price: "from $320/night",
      image: dubaiFamily
    },
    {
      title: "Luxury Water Villa Experience",
      destination: "Maldives",
      discount: 25,
      validUntil: "2026-04-30",
      description: "Stay in a stunning overwater villa with private pool, direct ocean access, and sunset views.",
      features: ["Private Pool", "Ocean Access", "Butler Service"],
      price: "from $680/night",
      image: maldivesWaterVilla
    },
    {
      title: "Exclusive Ocean Pool Villa",
      destination: "Maldives",
      discount: 20,
      validUntil: "2026-05-31",
      description: "Ultra-modern circular villa on stilts with infinity pool, direct ocean views, and contemporary design.",
      features: ["Infinity Pool", "Modern Design", "Ocean Views"],
      price: "from $850/night",
      image: maldivesVillaPool
    },
    {
      title: "Maldives Villa Collection",
      destination: "Maldives",
      discount: 35,
      validUntil: "2026-06-30",
      description: "Choose from our collection of overwater villas with private pools and direct lagoon access.",
      features: ["Private Villas", "All-Inclusive Option", "Water Activities"],
      price: "from $520/night",
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
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury clifftop resort with infinity pools overlooking turquoise ocean in Bali" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
        </div>
        
        <div className="relative z-10 container-custom animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold hero-text mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl hero-text mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
          
          {/* Search Bar */}
          <SearchBar />
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
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
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Resort Offers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Limited-time luxury resort deals with savings up to 40% off. Book your dream vacation today!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredOffers.map((offer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in hover-scale">
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
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                      <Button className="w-full">
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
              <Button size="lg" variant="outline" className="text-lg px-8">
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
