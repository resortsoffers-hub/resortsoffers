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
        <link rel="canonical" href="https://www.resortsoffers.com/" />
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
