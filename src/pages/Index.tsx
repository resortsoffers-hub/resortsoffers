import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Building2, Gift, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-resort.jpg";

const Index = () => {
  const features = [
    {
      icon: <Compass className="w-8 h-8 text-accent" />,
      title: "Consultancy",
      description: "Expert guidance and professional consulting services tailored to your needs.",
      link: "/consultancy",
    },
    {
      icon: <Building2 className="w-8 h-8 text-accent" />,
      title: "Our Partners",
      description: "Trusted partnerships and collaborations that drive success.",
      link: "/resorts",
    },
    {
      icon: <Gift className="w-8 h-8 text-accent" />,
      title: "Special Offers",
      description: "Exclusive packages and deals tailored for you.",
      link: "/offers",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Our Team",
      description: "Dedicated professionals with years of industry expertise.",
      link: "/team",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury resort with ocean view" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        
        <div className="relative z-10 container-custom text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold hero-text mb-6">
            Professional Business Services
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold hero-text mb-4">
            Excellence in Every Detail
          </h2>
          <p className="text-xl md:text-2xl hero-text mb-8 max-w-3xl mx-auto">
            Delivering quality solutions tailored to your unique needs
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/services">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Explore Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Trusted Business Partner
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We provide comprehensive professional services designed to help your business thrive. 
              Our team of experts works closely with you to understand your unique needs and deliver 
              tailored solutions that drive growth and success. With years of industry experience, 
              we're committed to excellence in everything we do.
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
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Discover how our professional services can help you achieve your goals.
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
