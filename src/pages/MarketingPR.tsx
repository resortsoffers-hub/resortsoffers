import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Megaphone, Star, Gem, Newspaper, Link2, Forward } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useLocale } from "@/hooks/useLocale";

/**
 * Marketing, PR and media services for hotels, resorts and DMCs in the Middle East.
 */
const MarketingPR = () => {
  const locale = useLocale();

  const services = [
    {
      icon: Megaphone,
      title: "Brand Awareness in the Middle East",
      text: "Campaigns that put your hotel, resort or destination in front of travellers across the UAE, Saudi Arabia and the wider GCC.",
    },
    {
      icon: Star,
      title: "Celebrity & Influencer Collaborations",
      text: "We coordinate stays and partnerships with celebrities, influencers and content creators whose audiences match your brand.",
    },
    {
      icon: Gem,
      title: "High-Net-Worth Audiences",
      text: "Introducing your property to high-net-worth individuals and families through private networks, events and curated experiences.",
    },
    {
      icon: Newspaper,
      title: "Media & PR",
      text: "Press releases, magazine features and media relations with leading Middle East travel and lifestyle titles.",
    },
    {
      icon: Link2,
      title: "Digital Visibility & SEO",
      text: "Editorial features and quality backlinks that strengthen your brand's search presence in Arabic and English.",
    },
    {
      icon: Forward,
      title: "Enquiries Passed Straight to You",
      text: "We create the demand; your team closes it. Every booking or partnership enquiry we generate is forwarded directly to the right person at your property.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hospitality Marketing & PR in the Middle East | Resorts Offers</title>
        <meta
          name="description"
          content="Marketing, PR and media for hotels, resorts and DMCs in the Middle East: brand awareness, celebrity and influencer collaborations, high-net-worth audiences, magazines and SEO."
        />
      </Helmet>

      <Navbar />

      <main className="pt-14">
        <section className="bg-gradient-to-b from-primary to-primary/90 text-white py-20 md:py-28">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Hospitality Marketing &amp; PR</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We build awareness for luxury hotels, resorts and DMCs across the Middle East, through PR, media, celebrities, influencers and high-net-worth networks.
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
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Work With Us</h2>
              <p className="text-muted-foreground mb-8">
                Hotels, resorts and DMCs looking to build their brand in the Middle East: let's talk about your next campaign.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`mailto:${BRAND.email}?subject=Marketing %26 PR enquiry`}>
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

export default MarketingPR;
