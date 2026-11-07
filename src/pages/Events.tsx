import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, ExternalLink, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import wtmLondon from "@/assets/events/wtm-london.jpg";
import atmDubai from "@/assets/events/atm-dubai.jpg";
import iltmCannes from "@/assets/events/iltm-cannes.jpg";

type TradeEvent = {
  name: string;
  fullName: string;
  location: string;
  venue: string;
  dates: string;
  /** Last day of the event, used to sort and to hide past editions. */
  endDate: string;
  attending?: boolean;
  description: string;
  image?: string;
  website: string;
  highlights: string[];
};

const Events = () => {
  const allEvents: TradeEvent[] = [
    {
      name: "WTM London",
      fullName: "World Travel Market London 2026",
      location: "London, United Kingdom",
      venue: "ExCeL London",
      dates: "3 – 5 November 2026",
      endDate: "2026-11-05",
      attending: true,
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
      name: "ILTM Cannes",
      fullName: "International Luxury Travel Market 2026",
      location: "Cannes, France",
      venue: "Palais des Festivals",
      dates: "30 November – 3 December 2026",
      endDate: "2026-12-03",
      description: "The premier global event for the luxury travel industry. ILTM brings together the world's most influential luxury travel advisors with exceptional travel brands and destinations.",
      image: iltmCannes,
      website: "https://www.iltm.com/cannes",
      highlights: [
        "Ultra-luxury travel focus",
        "Private appointments",
        "Exclusive networking events",
        "Premium destination showcases"
      ]
    },
    {
      name: "FITUR",
      fullName: "FITUR International Tourism Trade Fair 2027",
      location: "Madrid, Spain",
      venue: "IFEMA Madrid",
      dates: "20 – 24 January 2027",
      endDate: "2027-01-24",
      description: "One of the world's largest tourism trade fairs, opening the travel industry calendar each year in Madrid, with a strong focus on Europe, Latin America and emerging destinations.",
      website: "https://www.ifema.es/en/fitur",
      highlights: [
        "Opening event of the travel year",
        "Europe and Latin America focus",
        "Destination and hotel pavilions",
        "Trade and public days"
      ]
    },
    {
      name: "ITB Berlin",
      fullName: "ITB Berlin 2027",
      location: "Berlin, Germany",
      venue: "Messe Berlin",
      dates: "16 – 18 March 2027",
      endDate: "2027-03-18",
      description: "The world's leading B2B travel trade show, bringing together tour operators, hotels, destinations and travel technology providers from every continent.",
      website: "https://www.itb.com",
      highlights: [
        "Global B2B travel trade",
        "ITB Convention and industry insights",
        "Hotel and destination exhibitors",
        "Travel technology hall"
      ]
    },
    {
      name: "ATM Dubai",
      fullName: "Arabian Travel Market 2027",
      location: "Dubai, United Arab Emirates",
      venue: "Dubai World Trade Centre",
      dates: "3 – 6 May 2027",
      endDate: "2027-05-06",
      description: "The Middle East's leading travel and tourism event, showcasing thousands of exhibitors to buyers and travel trade visitors from around the world.",
      image: atmDubai,
      website: "https://www.wtm.com/atm",
      highlights: [
        "Middle East's largest travel show",
        "Luxury travel pavilion",
        "Hotel industry summit",
        "Travel technology showcase"
      ]
    }
  ];

  // Show upcoming and ongoing editions only, soonest first.
  const today = new Date().toISOString().slice(0, 10);
  const events = allEvents
    .filter((e) => e.endDate >= today)
    .sort((a, b) => a.endDate.localeCompare(b.endDate));

  return (
    <>
      <Helmet>
        <title>Industry Events | Resorts Offers - Travel Trade Shows</title>
        <meta 
          name="description" 
          content="Meet Resorts Offers at leading travel industry events: WTM London, ILTM Cannes, FITUR, ITB Berlin and ATM Dubai. Dates, venues and how to meet our team." 
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
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary via-primary/90 to-accent-strong flex items-center justify-center">
                          <span className="text-white text-4xl md:text-5xl font-bold tracking-wide">{event.name}</span>
                        </div>
                      )}
                      {event.attending && (
                        <span className="absolute top-4 left-4 bg-white text-primary px-4 py-2 rounded-full text-sm font-semibold shadow">
                          We're attending
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-accent-strong text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                        <MapPin className="w-4 h-4 text-accent-strong" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-accent-strong" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-primary">
                        <Calendar className="w-4 h-4 text-accent-strong" />
                        <span>{event.dates}</span>
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
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-strong" />
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:info@resortsoffers.com">
                  <Button size="lg" className="bg-accent-strong hover:bg-accent-strong/90">
                    Schedule a Meeting
                  </Button>
                </a>
                <a href="marketing-pr">
                  <Button size="lg" variant="outline">Our Marketing &amp; PR Services</Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Events;
