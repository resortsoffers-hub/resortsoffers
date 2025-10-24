import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import consultancyImage from "@/assets/consultancy.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us - Sales & Marketing Representation for Luxury Hotels | ResortsOffers.com</title>
        <meta name="description" content="The Resorts Offers Portfolio specializes in promoting unique luxury hotels, resorts and cruises to travellers from the Arabian Gulf. Comprehensive regional sales and marketing solutions within the GCC countries." />
        <meta name="keywords" content="hotel representation, luxury hotel marketing, GCC travel, Arabian Gulf resorts, hotel sales agency, travel portfolio, luxury hospitality marketing" />
        <link rel="canonical" href="https://www.resortsoffers.com/about-us" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/about-us" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="About Us - Luxury Hotel Representation" />
        <meta property="og:description" content="Sales and marketing representation company specialising in luxury hotels, resorts and cruises for the Arabian Gulf market." />
        <meta property="og:image" content="https://www.resortsoffers.com/about-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.resortsoffers.com/about-us" />
        <meta name="twitter:title" content="About Us - Luxury Hotel Representation" />
        <meta name="twitter:description" content="Sales and marketing representation for luxury hotels in the GCC region." />
        <meta name="twitter:image" content="https://www.resortsoffers.com/about-og.jpg" />
        
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
                "name": "About Us",
                "item": "https://www.resortsoffers.com/about-us"
              }
            ]
          })}
        </script>
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ResortsOffers.com",
            "description": "Sales and marketing representation company specialising in promoting unique luxury hotels, resorts and cruises to travellers from the Arabian Gulf",
            "areaServed": ["UAE", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman"],
            "url": "https://www.resortsoffers.com"
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
            About Us
          </h1>
          <p className="text-xl md:text-2xl hero-text max-w-3xl mx-auto">
            Sales, PR, Marketing & Social Media Agency for Luxury Hotels & Travel Brands
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The Resorts Offers Portfolio is a sales and marketing representation company, specialising in promoting 
              unique luxury hotels, resorts and cruises to travellers from the Arabian Gulf.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We operate out of offices in United Arab Emirates (Dubai and Abu Dhabi) and Saudi Arabia (Jeddah and Riyadh), 
              and we offer comprehensive regional sales and marketing solutions within the GCC countries. We have an in depth 
              knowledge of our portfolio, having individually visited the properties and built strong relationships with each 
              of our partners.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-4">Our Value</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our values of communication, connection, creation, professionalism, knowledge, and influence 
                  are at the heart and passion of what we offer and in all the work we do.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Target className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-4">Our Objective</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Representing bespoke, individual and luxurious travel partners from across the world in the GCC region. 
                  We aim to spearhead our partners strategic marketing and sales communications, to achieve a measurable 
                  and effective return on their investments.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Lightbulb className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-4">Our Purpose</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We are driven by our passion, and commitment to identifying and delivering results. Our team's strength 
                  of knowledge and strong relationships with the Travel Professionals in the region ensure strategic marketing 
                  plans are achieved. We analyse the current and potential market trends, to effectively promote our partners 
                  brand image and establish an excellent positioning within the defined markets.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how we can elevate your property's presence in the GCC market and connect you with 
            discerning travelers from the Arabian Gulf.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                Contact Us
              </button>
            </a>
            <a href="/team">
              <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-colors">
                Meet The Team
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
