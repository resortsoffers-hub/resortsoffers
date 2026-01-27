import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import wtmLondon from "@/assets/events/wtm-london.jpg";
import atmDubai from "@/assets/events/atm-dubai.jpg";
import iltmCannes from "@/assets/events/iltm-cannes.jpg";

const Events = () => {
  const events = [
    {
      name: "WTM London",
      fullName: "World Travel Market London",
      location: "London, United Kingdom",
      venue: "ExCeL London",
      description: "The leading global event for the travel industry. WTM London is where the travel trade meets to conduct business deals, network with industry professionals, and discover the latest trends in travel and tourism.",
      image: wtmLondon,
      website: "https://www.wtm.com/london",
      highlights: [
        "Global travel trade networking",
        "Industry keynote sessions",
        "Destination showcases",
        "Technology innovations"
      ]
    },
    {
      name: "ATM Dubai",
      fullName: "Arabian Travel Market",
      location: "Dubai, United Arab Emirates",
      venue: "Dubai World Trade Centre",
      description: "The Middle East's leading travel and tourism event. ATM showcases over 2,800 exhibiting companies to more than 28,000 buyers and travel trade visitors, providing unrivalled business opportunities.",
      image: atmDubai,
      website: "https://www.wtm.com/atm",
      highlights: [
        "Middle East's largest travel show",
        "Luxury travel pavilion",
        "Hotel industry summit",
        "Travel technology showcase"
      ]
    },
    {
      name: "ILTM Cannes",
      fullName: "International Luxury Travel Market",
      location: "Cannes, France",
      venue: "Palais des Festivals",
      description: "The premier global event for the luxury travel industry. ILTM brings together the world's most influential luxury travel advisors with exceptional travel brands and destinations.",
      image: iltmCannes,
      website: "https://www.iltm.com/cannes",
      highlights: [
        "Ultra-luxury travel focus",
        "Private appointments",
        "Exclusive networking events",
        "Premium destination showcases"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Industry Events | Resorts Offers - Travel Trade Shows</title>
        <meta 
          name="description" 
          content="Meet Resorts Offers at leading travel industry events including WTM London, ATM Dubai, and ILTM Cannes. Connect with our team for exclusive partnerships." 
        />
      </Helmet>

      <Navbar />

      <main className="pt-14">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-primary/90 text-white py-20 md:py-28">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Industry Events
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connect with us at the world's leading travel and tourism trade shows. We're present at major industry events to build partnerships and showcase exclusive offerings.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="space-y-12">
              {events.map((event, index) => (
                <div 
                  key={event.name}
                  className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {event.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {event.fullName}
                    </h2>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="font-semibold text-primary mb-3">Event Highlights</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {event.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a 
                      href={event.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-primary hover:bg-primary/90">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Official Website
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Meet Us at Upcoming Events
              </h2>
              <p className="text-muted-foreground mb-8">
                Interested in meeting our team at an upcoming travel trade show? Contact us to schedule a private appointment and discuss partnership opportunities.
              </p>
              <a href="mailto:info@resortsoffers.com">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Schedule a Meeting
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Events;
