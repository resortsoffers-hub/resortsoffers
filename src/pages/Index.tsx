import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Building2, Gift, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import heroImage from "@/assets/resorts/bali-clifftop-resort.jpg";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Compass className="w-8 h-8 text-accent" />,
      title: t('services.travelConsultancy'),
      description: t('services.travelConsultancyDesc'),
      link: "/consultancy",
    },
    {
      icon: <Building2 className="w-8 h-8 text-accent" />,
      title: t('services.luxuryResorts'),
      description: t('services.luxuryResortsDesc'),
      link: "/resorts",
    },
    {
      icon: <Gift className="w-8 h-8 text-accent" />,
      title: t('services.specialOffers'),
      description: t('services.specialOffersDesc'),
      link: "/offers",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: t('services.expertTeam'),
      description: t('services.expertTeamDesc'),
      link: "/team",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Luxury Resort Deals & Exclusive Hotel Offers | ResortsOffers.com</title>
        <meta name="description" content="Discover exclusive luxury resort deals worldwide. Save up to 40% on premium hotels in Maldives, Dubai, Bali & more. Expert travel consultancy & personalized booking services." />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
        <meta name="keywords" content="luxury resorts, hotel deals, resort offers, travel packages, Maldives resorts, Dubai hotels, luxury travel, honeymoon packages, beach resorts, exclusive deals" />
        <link rel="canonical" href="https://www.resortsoffers.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/" />
        <meta property="og:title" content="Luxury Resort Deals & Exclusive Hotel Offers | ResortsOffers.com" />
        <meta property="og:description" content="Discover exclusive luxury resort deals worldwide. Save up to 40% on premium hotels in Maldives, Dubai, Bali & more." />
        <meta property="og:image" content="https://www.resortsoffers.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.resortsoffers.com/" />
        <meta name="twitter:title" content="Luxury Resort Deals & Exclusive Hotel Offers" />
        <meta name="twitter:description" content="Discover exclusive luxury resort deals worldwide. Save up to 40% on premium hotels." />
        <meta name="twitter:image" content="https://www.resortsoffers.com/og-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "ResortsOffers.com",
            "description": "Luxury resort deals and exclusive hotel offers worldwide",
            "url": "https://www.resortsoffers.com",
            "logo": "https://www.resortsoffers.com/logo.png",
            "telephone": "+971567622484",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "AE"
            },
            "sameAs": [
              "https://www.instagram.com/resortsoffers",
              "https://www.facebook.com/resortsoffers"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ResortsOffers.com",
            "url": "https://www.resortsoffers.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.resortsoffers.com/resorts?q={search_term_string}",
              "query-input": "required name=search_term_string"
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
                "name": "How do I book a luxury resort through ResortsOffers.com?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Booking is simple: browse our exclusive resort offers, select your preferred package, and click 'Book Now' to contact our travel consultants via WhatsApp. We'll handle all arrangements including flights, transfers, and special requests to ensure your dream vacation."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods do you accept?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept Visa, Mastercard, American Express, Tabby, and Tamara for your convenience. Multiple payment options are available to make booking your luxury vacation as seamless as possible."
                }
              },
              {
                "@type": "Question",
                "name": "Can I get a custom travel package?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Our expert travel consultants specialize in creating personalized luxury vacation packages tailored to your preferences, budget, and travel dates. Contact us for a free consultation to design your perfect getaway."
                }
              },
              {
                "@type": "Question",
                "name": "What is your cancellation policy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cancellation policies vary by resort and booking type. Generally, cancellations made 30+ days before arrival receive full refunds, 15-30 days receive 50% refunds, and less than 15 days may be non-refundable. We'll provide specific terms during booking."
                }
              },
              {
                "@type": "Question",
                "name": "Are the prices shown final or do they include taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Prices displayed are starting rates per night and may not include taxes, resort fees, or additional services. Our consultants will provide complete pricing including all applicable fees and taxes when you inquire about a specific offer."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer honeymoon packages?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We specialize in romantic honeymoon packages featuring overwater villas, couples spa treatments, private dining experiences, and special amenities. Our team can create the perfect honeymoon tailored to your romantic vision."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury clifftop resort with infinity pools overlooking turquoise ocean in Bali" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
        </div>
        
        <div className="relative z-10 container-custom animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold hero-text mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl hero-text mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
          
          {/* Search Bar */}
          <SearchBar />
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('cta.description')}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
