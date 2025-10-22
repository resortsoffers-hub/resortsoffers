import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import packagesImage from "@/assets/packages.jpg";

const Events = () => {
  const events = [
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
      category: "Trade Show"
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
      category: "Trade Show"
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
      category: "Luxury Travel"
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
      category: "Wedding & Lifestyle"
    },
    {
      name: "Gulf Cooperation Council Tourism Exhibition (GCCTE)",
      shortName: "GCCTE",
      date: "May 2025",
      location: "Riyadh International Convention Center, Saudi Arabia",
      description: "The region's leading tourism and hospitality exhibition focusing on GCC markets. GCCTE connects regional tourism authorities with international travel providers.",
      highlights: [
        "GCC tourism authorities",
        "Regional market insights",
        "Investment opportunities",
        "Cultural exchange programs"
      ],
      website: "#",
      category: "Regional Tourism"
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Travel Industry Events - Resorts Offers</title>
        <meta name="description" content="Join us at major travel industry events worldwide. Connect with luxury resort experts at ATM Dubai, WTM London, ILTM Cannes, and more." />
        <link rel="canonical" href="https://www.resortsoffers.com/events" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img 
            src={packagesImage} 
            alt="Travel industry events" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60" />
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold hero-text mb-6 animate-fade-in">
            Travel Industry Events
          </h1>
          <p className="text-xl md:text-2xl hero-text max-w-3xl mx-auto">
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
