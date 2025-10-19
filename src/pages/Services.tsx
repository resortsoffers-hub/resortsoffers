import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, TrendingUp, Globe, Award, HeadphonesIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: <Building2 className="w-12 h-12 text-accent" />,
      title: "Hotel Representation",
      description: "Comprehensive sales and marketing representation for luxury hotels and resorts across the Middle East region.",
      features: [
        "Strategic market positioning",
        "Sales team extension",
        "Marketing campaign management",
        "Brand development"
      ]
    },
    {
      icon: <Users className="w-12 h-12 text-accent" />,
      title: "Client Relations",
      description: "Building and maintaining strong relationships with travel agencies, corporate clients, and tour operators.",
      features: [
        "B2B partnerships",
        "Corporate accounts",
        "Travel agent networks",
        "VIP client services"
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-accent" />,
      title: "Revenue Management",
      description: "Strategic pricing and inventory management to maximize revenue and occupancy rates.",
      features: [
        "Dynamic pricing strategies",
        "Market analysis",
        "Yield optimization",
        "Performance tracking"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-accent" />,
      title: "Market Development",
      description: "Identifying and developing new market opportunities throughout the Middle East region.",
      features: [
        "Market research",
        "Competitor analysis",
        "Growth strategies",
        "Regional expansion"
      ]
    },
    {
      icon: <Award className="w-12 h-12 text-accent" />,
      title: "Brand Management",
      description: "Protecting and enhancing your property's brand image and reputation in the market.",
      features: [
        "Brand positioning",
        "Reputation management",
        "Quality assurance",
        "Brand consistency"
      ]
    },
    {
      icon: <HeadphonesIcon className="w-12 h-12 text-accent" />,
      title: "24/7 Support",
      description: "Round-the-clock support for all your sales and marketing needs in the region.",
      features: [
        "Dedicated account management",
        "Emergency support",
        "Regular reporting",
        "Consultative services"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href="https://www.resortsoffers.com/services" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mt-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Comprehensive hospitality solutions tailored to elevate your property's presence in the Middle East market
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your property achieve its full potential in the Middle East market.
          </p>
          <a href="/contact" className="inline-block">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
              Contact Our Team
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
