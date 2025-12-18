import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, TrendingUp, Globe, Award, HeadphonesIcon, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import consultancyImg from "@/assets/consultancy.jpg";
import packagesImg from "@/assets/packages.jpg";
import maldivesVillasImg from "@/assets/maldives-villas.jpg";
import dubaiLuxuryImg from "@/assets/resorts/dubai-luxury.jpg";
import luxuryPoolImg from "@/assets/resorts/luxury-infinity-pool.jpg";
import weddingCeremonyImg from "@/assets/resorts/wedding-ceremony.jpg";
import servicesHeroImg from "@/assets/services-hero.jpg";

const Services = () => {
  const services = [
    {
      icon: <Building2 className="w-12 h-12 text-accent" />,
      title: "Hotel Representation",
      description: "Comprehensive sales and marketing representation for luxury hotels and resorts across the Middle East region.",
      image: consultancyImg,
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
      image: luxuryPoolImg,
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
      image: packagesImg,
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
      image: dubaiLuxuryImg,
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
      image: maldivesVillasImg,
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
      image: weddingCeremonyImg,
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
        <title>Luxury Travel Services - Resort Booking & Vacation Planning | ResortsOffers.com</title>
        <meta name="description" content="Comprehensive luxury travel services: exclusive resort bookings, personalized vacation planning, honeymoon packages, group travel, and 24/7 concierge support." />
        <meta name="keywords" content="luxury travel services, resort booking, vacation planning, honeymoon packages, group travel, travel concierge, VIP travel services" />
        <link rel="canonical" href="https://www.resortsoffers.com/services" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/services" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Luxury Travel Services - Resort Booking & Planning" />
        <meta property="og:description" content="Comprehensive luxury travel services with 24/7 support." />
        <meta property="og:image" content="https://www.resortsoffers.com/services-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Travel Services" />
        <meta name="twitter:description" content="Resort booking, vacation planning & 24/7 support." />
        
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
                "name": "Services",
                "item": "https://www.resortsoffers.com/services"
              }
            ]
          })}
        </script>
        {/* Structured Data - Services List */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Travel Services",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "Exclusive Resort Bookings",
                  "description": "Access to premium resorts worldwide"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "Personalized Vacation Planning",
                  "description": "Customized travel itineraries"
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20" style={{ backgroundImage: `url(${servicesHeroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60" />
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
            Comprehensive hospitality solutions tailored to elevate your property's presence in the Middle East market
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
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

      {/* Get in Touch Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
          <Card className="max-w-md mx-auto hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <Mail className="w-10 h-10 text-accent mx-auto mb-2" />
              <CardTitle className="text-xl">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:info@resortsoffers.com"
                className="text-lg text-primary hover:text-accent transition-colors font-medium"
              >
                info@resortsoffers.com
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your property achieve its full potential in the Middle East and Europe markets.
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
