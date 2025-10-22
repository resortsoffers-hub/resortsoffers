import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Target, Lightbulb, BarChart, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import consultancyImage from "@/assets/consultancy.jpg";

const Consultancy = () => {
  const consultancyServices = [
    {
      icon: <MapPin className="w-10 h-10 text-accent" />,
      title: "Destination Consulting",
      description: "Expert guidance on destination development and positioning strategies for luxury tourism markets."
    },
    {
      icon: <Users className="w-10 h-10 text-accent" />,
      title: "Stakeholder Engagement",
      description: "Building strategic partnerships with key tourism stakeholders and industry leaders."
    },
    {
      icon: <Target className="w-10 h-10 text-accent" />,
      title: "Market Entry Strategy",
      description: "Comprehensive planning for successful market entry into the Middle East region."
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-accent" />,
      title: "Product Development",
      description: "Creating innovative tourism products tailored to luxury market demands."
    },
    {
      icon: <BarChart className="w-10 h-10 text-accent" />,
      title: "Performance Analysis",
      description: "In-depth analysis of market performance and competitive positioning."
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: "Quality Assurance",
      description: "Ensuring service excellence and maintaining luxury standards across operations."
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Expert Travel Consultancy Services - Personalized Vacation Planning | ResortsOffers.com</title>
        <meta name="description" content="Professional travel consultancy services. Get expert advice on luxury resort selection, destination planning, and personalized itineraries. Free consultation available." />
        <meta name="keywords" content="travel consultancy, vacation planning, luxury travel advisor, resort consultant, destination expert, travel planning services, honeymoon planning" />
        <link rel="canonical" href="https://www.resortsoffers.com/consultancy" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/consultancy" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Expert Travel Consultancy Services" />
        <meta property="og:description" content="Professional travel consultancy for luxury resorts. Free consultation available." />
        <meta property="og:image" content="https://www.resortsoffers.com/consultancy-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.resortsoffers.com/consultancy" />
        <meta name="twitter:title" content="Expert Travel Consultancy Services" />
        <meta name="twitter:description" content="Professional travel consultancy for luxury resorts." />
        <meta name="twitter:image" content="https://www.resortsoffers.com/consultancy-og.jpg" />
        
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
                "name": "Consultancy",
                "item": "https://www.resortsoffers.com/consultancy"
              }
            ]
          })}
        </script>
        {/* Structured Data - Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Travel Consultancy",
            "provider": {
              "@type": "TravelAgency",
              "name": "ResortsOffers.com"
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Travel Planning Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Free 15-Minute Consultation"
                  }
                }
              ]
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
                "name": "What does your travel consultancy service include?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our consultancy service includes personalized destination recommendations, resort selection based on your preferences and budget, itinerary planning, booking management, and 24/7 support throughout your trip. We handle all details from flights to special requests."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a fee for consultation services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Initial consultations are completely free. We offer a complimentary 15-minute discovery call to understand your travel needs. Our revenue comes from resort partnerships, allowing us to provide expert advice at no cost to you while often securing better rates than booking directly."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to plan a custom vacation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Custom vacation planning typically takes 3-7 days depending on complexity. Simple resort bookings can be arranged within 24-48 hours, while multi-destination itineraries with special requirements may need a week. We accommodate urgent requests whenever possible."
                }
              },
              {
                "@type": "Question",
                "name": "Do you handle group bookings and events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We specialize in group travel including weddings, corporate retreats, family reunions, and celebration events. Our team coordinates all logistics, negotiates group rates, and ensures every guest has an exceptional experience."
                }
              },
              {
                "@type": "Question",
                "name": "What destinations do you specialize in?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We specialize in luxury destinations worldwide with particular expertise in the Maldives, UAE, Seychelles, Bali, Greece, and Italy. Our team has firsthand knowledge of premium resorts globally and maintains strong partnerships with leading hospitality brands."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img 
            src={consultancyImage} 
            alt="Luxury hotel consultancy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold hero-text mb-6 animate-fade-in">
            Tourism Consultancy
          </h1>
          <p className="text-xl md:text-2xl hero-text max-w-3xl mx-auto">
            Strategic expertise to transform your hospitality vision into reality
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Expert Hospitality Consulting
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With decades of combined experience in luxury hospitality, our consultancy team provides 
              strategic insights and actionable solutions to help properties and destinations achieve 
              excellence in the competitive Middle East market. We bridge the gap between international 
              hospitality standards and regional market expectations.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultancyServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Consulting Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals and challenges" },
              { step: "02", title: "Analysis", desc: "Market research and competitive assessment" },
              { step: "03", title: "Strategy", desc: "Developing tailored solutions" },
              { step: "04", title: "Implementation", desc: "Execution and ongoing support" }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-accent mb-4">{phase.step}</div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Tourism Vision
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our experts to discover how we can elevate your property or destination.
          </p>
          <a href="/contact">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
              Schedule Consultation
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consultancy;
