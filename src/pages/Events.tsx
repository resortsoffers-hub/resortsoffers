import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ExternalLink, Images } from "lucide-react";
import packagesImage from "@/assets/packages.jpg";
import ttmMaldivesImage from "@/assets/events/ttm-maldives.jpg";
import wtmLondonImage from "@/assets/events/wtm-london.jpg";
import atmDubaiImage from "@/assets/events/atm-dubai.jpg";
import iltmCannesImage from "@/assets/events/iltm-cannes.jpg";
import gulfBrideImage from "@/assets/events/gulf-bride.jpg";
import eventsHeroImg from "@/assets/events-hero.jpg";

const Events = () => {
  const events = [
    {
      name: "Travel Trade Mission (TTM) Maldives 2025",
      shortName: "TTM Maldives",
      date: "March 2025",
      location: "Maldives",
      description: "The premier travel trade mission bringing together international buyers and Maldivian resort properties. Network with key decision-makers and discover exclusive resort partnerships.",
      highlights: [
        "Direct resort property visits",
        "Exclusive buyer-seller meetings",
        "Maldives tourism board support",
        "Island-hopping experiences"
      ],
      website: "https://www.visitmaldives.com",
      category: "Trade Mission",
      image: ttmMaldivesImage
    },
    {
      name: "World Travel Market (WTM) London 2025",
      shortName: "WTM London",
      date: "November 2025",
      location: "ExCeL London, United Kingdom",
      description: "Where Travel & Tourism Meet - The world's most influential travel and tourism event. WTM London is the premier three-day B2B event connecting the global travel trade to inspire and facilitate business opportunities.",
      highlights: [
        "50,000+ senior travel professionals",
        "5,000+ exhibitors from 182 countries",
        "Multi-billion-dollar deals negotiated",
        "Shape the future of travel industry"
      ],
      website: "https://www.wtm.com/london",
      category: "Trade Show",
      image: wtmLondonImage
    },
    {
      name: "Arabian Travel Market (ATM) 2026",
      shortName: "ATM Dubai",
      date: "April 2026",
      location: "Dubai World Trade Centre, UAE",
      description: "The leading travel & tourism trade show in the Middle East. ATM brings together the world's leading travel and tourism professionals to conduct business, discover innovations, and forge partnerships.",
      highlights: [
        "40,000+ attendees from 150+ countries",
        "2,500+ exhibiting companies",
        "Exclusive Middle East market access",
        "Latest travel technology showcase"
      ],
      website: "https://www.wtm.com/atm",
      category: "Trade Show",
      image: atmDubaiImage
    },
    {
      name: "ILTM Cannes - International Luxury Travel Market",
      shortName: "ILTM Cannes",
      date: "December 2025",
      location: "Palais des Festivals, Cannes, France",
      description: "The flagship luxury travel event and ultimate marketplace for the luxury travel industry. ILTM Cannes connects the world's most prestigious luxury travel providers with elite travel buyers.",
      highlights: [
        "1,500+ luxury travel exhibitors",
        "Pre-scheduled one-on-one appointments",
        "Exclusive networking events & dinners",
        "Ultra-high-net-worth clientele focus"
      ],
      website: "https://www.iltm.com/cannes",
      category: "Luxury Travel",
      image: iltmCannesImage
    },
    {
      name: "The Gulf Bride Show 2025",
      shortName: "Gulf Bride Show",
      date: "12-18 September 2025",
      location: "Sheikh Maktoum Hall & Sheikh Rashid Hall, Dubai World Trade Centre, UAE",
      description: "The region's largest and most anticipated bridal event, bringing together five specialised exhibitions: Jewellery, Fashion, Perfume, Beauty, and Interior Design & Furniture. Designed to offer a fully integrated experience for the modern bride and her family.",
      highlights: [
        "5 specialised exhibitions in one venue",
        "Latest wedding trends and innovations",
        "Premium luxury brands showcase",
        "Exclusive product launches and interactive zones"
      ],
      website: "https://gulfbrideshow.com/",
      category: "Wedding & Lifestyle",
      image: gulfBrideImage
    },
    {
      name: "Summit Bridge Abu Dhabi 2025",
      shortName: "Summit Bridge",
      date: "2025",
      location: "Abu Dhabi, UAE",
      description: "A premier business and travel summit connecting industry leaders, tourism professionals, and luxury hospitality brands. Summit Bridge Abu Dhabi brings together key stakeholders to explore new opportunities and partnerships in the travel and hospitality sector.",
      highlights: [
        "High-level networking opportunities",
        "Industry leader keynote sessions",
        "Business matchmaking meetings",
        "Abu Dhabi tourism partnerships"
      ],
      website: "#",
      category: "Business Summit",
      image: atmDubaiImage
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Travel Industry Events & Trade Shows 2025-2026 | ResortsOffers.com</title>
        <meta name="description" content="Join us at major travel industry events: WTM London, ATM Dubai, ILTM Cannes, TTM Maldives. Network with luxury travel professionals worldwide." />
        <meta name="keywords" content="travel trade shows, WTM London, ATM Dubai, ILTM Cannes, travel industry events, hospitality conferences, luxury travel events" />
        <link rel="canonical" href="https://www.resortsoffers.com/events" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/events" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Travel Industry Events & Trade Shows 2025-2026" />
        <meta property="og:description" content="Join us at major travel trade shows worldwide." />
        <meta property="og:image" content="https://www.resortsoffers.com/events-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Travel Industry Events 2025-2026" />
        <meta name="twitter:description" content="Join us at WTM London, ATM Dubai, ILTM Cannes & more." />
        
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
                "name": "Events",
                "item": "https://www.resortsoffers.com/events"
              }
            ]
          })}
        </script>
        {/* Structured Data - Events */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "Event",
                "name": "World Travel Market (WTM) London 2025",
                "startDate": "2025-11-01",
                "location": {
                  "@type": "Place",
                  "name": "ExCeL London",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "London",
                    "addressCountry": "GB"
                  }
                },
                "description": "The world's most influential travel and tourism event",
                "organizer": {
                  "@type": "Organization",
                  "name": "Reed Travel Exhibitions"
                }
              },
              {
                "@type": "Event",
                "name": "Arabian Travel Market (ATM) 2026",
                "startDate": "2026-04-01",
                "location": {
                  "@type": "Place",
                  "name": "Dubai World Trade Centre",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dubai",
                    "addressCountry": "AE"
                  }
                },
                "description": "Leading travel & tourism trade show in the Middle East"
              },
              {
                "@type": "Event",
                "name": "ILTM Cannes 2025",
                "startDate": "2025-12-01",
                "location": {
                  "@type": "Place",
                  "name": "Palais des Festivals",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Cannes",
                    "addressCountry": "FR"
                  }
                },
                "description": "International Luxury Travel Market flagship event"
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20" style={{ backgroundImage: `url(${eventsHeroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60" />
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Travel Industry Events
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Meet us at the world's leading travel and tourism exhibitions
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Where to Find Us
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Resorts Offers Tourism Consultancy actively participates in major international travel exhibitions and trade shows. 
            These events allow us to stay at the forefront of the luxury travel industry, forge partnerships with premium resort brands, 
            and bring you the most exclusive deals and packages.
          </p>
          <p className="text-lg text-muted-foreground">
            Visit our booth to discuss your next luxury vacation, explore exclusive resort offers, and meet our expert travel consultants.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 overflow-hidden group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {event.image && (
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                      <Images size={16} className="text-primary" />
                      View Gallery
                    </div>
                  </div>
                )}
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
                        {event.category}
                      </span>
                      <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                        {event.name}
                      </CardTitle>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar size={18} className="mr-2 text-primary" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-start text-muted-foreground">
                      <MapPin size={18} className="mr-2 text-primary mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <CardDescription className="text-base leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-3 flex items-center">
                      <Users size={16} className="mr-2 text-primary" />
                      Event Highlights
                    </h4>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    {event.website !== "#" && (
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.open(event.website, '_blank')}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Event Website
                      </Button>
                    )}
                    <Button 
                      className="flex-1"
                      onClick={() => window.location.href = '/contact'}
                    >
                      <Calendar size={16} className="mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
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
            Let's Connect at Our Next Event
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a meeting with our team at any of these events. We'll help you discover exclusive resort packages 
            and personalized travel experiences tailored to your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Contact Us
              </Button>
            </a>
            <a href="/book-consultation">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Book Free Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;