import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Building2, Gift, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import heroImage from "@/assets/hero-resort.jpg";

const Index = () => {
  const features = [
    {
      icon: <Compass className="w-8 h-8 text-accent" />,
      title: "Travel Consultancy",
      description: "Expert guidance to help you find the perfect resort for your dream vacation.",
      link: "/consultancy",
    },
    {
      icon: <Building2 className="w-8 h-8 text-accent" />,
      title: "Luxury Resorts",
      description: "Handpicked premium resorts and hotels from around the world.",
      link: "/resorts",
    },
    {
      icon: <Gift className="w-8 h-8 text-accent" />,
      title: "Special Offers",
      description: "Exclusive resort packages and limited-time deals you won't find elsewhere.",
      link: "/offers",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Expert Team",
      description: "Dedicated travel specialists with years of resort industry expertise.",
      link: "/team",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury resort with ocean view" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        
        <div className="relative z-10 container-custom animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold hero-text mb-6">
              Luxury Resort Experiences
            </h1>
            <p className="text-xl md:text-2xl hero-text mb-8 max-w-3xl mx-auto">
              Discover the world's finest resorts with unbeatable deals
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
              Your Gateway to Luxury Travel
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At ResortsOffers.com, we specialize in curating exceptional resort experiences worldwide. 
              Our expert team works closely with premium resort partners to bring you exclusive packages, 
              unbeatable deals, and personalized travel consultancy. With years of experience in luxury travel, 
              we're committed to making your dream vacation a reality.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What We Do
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
            Ready to Book Your Dream Vacation?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today and let our experts help you find the perfect resort experience.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
