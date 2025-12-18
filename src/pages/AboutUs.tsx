import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/resorts/luxury-infinity-pool.jpg";
import noraCEO from "@/assets/team/nora-ceo.jpg";

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
            src={heroImage} 
            alt="Luxury resort infinity pool with ocean views" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <div className="bg-white/95 px-8 py-6 rounded-lg inline-block">
            <p className="text-xl md:text-3xl text-primary font-bold max-w-3xl mx-auto">
              Sales, PR, Marketing & Social Media Agency for Luxury Hotels & Travel Brands
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-6 tracking-tight">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The Resorts Offers Tourism Consultancy, specialising in promoting unique luxury hotels, resorts and cruises 
              to travellers from the Arabian Gulf & Europe.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We operate out of offices in United Arab Emirates (Abu Dhabi) and Saudi Arabia (Riyadh). We have an in depth 
              knowledge of our portfolio, having individually visited the properties and built strong relationships with each 
              of our partners.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-80 md:h-auto">
                  <img 
                    src={noraCEO}
                    alt="Nora El Khalifi - CEO & Founder" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-2 tracking-tight">Nora El Khalifi</h3>
                  <p className="text-xl text-primary font-playfair italic mb-4">CEO & Founder</p>
                  <div className="space-y-3 text-muted-foreground mb-6">
                    <p className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Expert Hotelier with over 12 years of luxury travel industry experience</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Master of Strategic Branding and Business Intelligence (Dr.SBBI)</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>European International University Graduate</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Member of DBWC | Dubai Business Women Council</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Arabic businesswoman entrepreneur dedicated to redefining luxury travel</span>
                    </p>
                  </div>
                  <p className="text-base italic border-l-4 border-primary pl-4 mb-6">
                    "Every resort on ResortsOffers.com is handpicked based on personal experience and commitment to excellence. 
                    We specialize in delivering tailor-made holidays for honeymooners, families, VIPs, and spiritual travelers."
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href="https://www.linkedin.com/in/nora-el-khalifi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/resortsoffers/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
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
                <CardTitle className="text-2xl mb-4">Why Book With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get exclusive rates up to 40% off, 24/7 WhatsApp support, flexible payment plans with 0% interest, 
                  and personalized travel planning from experts who know every destination inside out.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Target className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-4">Why Partner With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access the lucrative GCC market through our established network of travel professionals, 
                  targeted marketing campaigns, and strong relationships with high-value clients from the Arabian Gulf.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Lightbulb className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-4">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Trust, transparency, and excellence guide everything we do. We build lasting relationships 
                  through honest communication, deep industry knowledge, and a genuine passion for travel.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default AboutUs;
