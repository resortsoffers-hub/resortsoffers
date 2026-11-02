import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Compass, Megaphone, Plane, Handshake, CalendarDays } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useLocale } from "@/hooks/useLocale";

/**
 * Hotel & DMC representation services, for travel trade partners.
 */
const Representation = () => {
  const locale = useLocale();

  const services = [
    {
      icon: Building2,
      title: "Hotel & Resort Representation",
      text: "We represent luxury hotels and resorts in the Middle East and GCC market, building visibility and demand with travel agents, tour operators and high-end travellers.",
    },
    {
      icon: Compass,
      title: "DMC Representation",
      text: "We act as the regional partner for premium destination management companies, introducing their tailor-made itineraries and experiences to the right buyers.",
    },
    {
      icon: Megaphone,
      title: "Sales & Marketing",
      text: "Sales calls, agent trainings, social media and campaigns that keep your property or destination front of mind with Middle East partners.",
    },
    {
      icon: CalendarDays,
      title: "Trade Shows & Events",
      text: "Representation at leading travel trade shows such as WTM London, ILTM Cannes and Arabian Travel Market, with meetings booked on your behalf.",
    },
    {
      icon: Plane,
      title: "FAM Trips & Site Inspections",
      text: "We organise familiarisation trips and site inspections so that agents and partners can experience your product first-hand.",
    },
    {
      icon: Handshake,
      title: "Partner Introductions",
      text: "Direct introductions to travel agencies, corporate travel buyers and tour operators across the GCC.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hotel & DMC Representation | Resorts Offers</title>
        <meta
          name="description"
          content="Hotel, resort and DMC representation in the Middle East and GCC: sales and marketing, trade shows, FAM trips and partner introductions."
        />
      </Helmet>

      <Navbar />

      <main className="pt-14">
        <section className="bg-gradient-to-b from-primary to-primary/90 text-white py-20 md:py-28">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Hotel &amp; DMC Representation</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We represent premium DMCs and luxury hotels, connecting them with travellers and travel partners across the Middle East and the GCC.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-accent-strong/10 text-accent-strong flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-3">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Become a Partner</h2>
              <p className="text-muted-foreground mb-8">
                Hotels, resorts and DMCs looking to grow in the Middle East market: let's talk about how we can represent you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`mailto:${BRAND.email}?subject=Representation enquiry`}>
                  <Button size="lg" className="bg-accent-strong hover:bg-accent-strong/90">Contact Us</Button>
                </a>
                <a href={`/${locale}/events`}>
                  <Button size="lg" variant="outline">Meet Us at Events</Button>
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

export default Representation;
