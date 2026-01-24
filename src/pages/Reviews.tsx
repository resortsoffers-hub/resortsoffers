import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  ExternalLink, 
  Users, 
  Building2, 
  Quote, 
  MapPin, 
  Calendar, 
  User, 
  PenSquare,
  Briefcase
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsDisplay from "@/components/ReviewsDisplay";
import ReviewSubmissionForm from "@/components/ReviewSubmissionForm";
import { supabase } from "@/integrations/supabase/client";
import contactHeroImg from "@/assets/contact-hero.jpg";

interface PartnerTestimonial {
  id: string;
  partner_name: string;
  partner_type: string;
  testimonial_text: string;
  contact_person: string | null;
  partner_logo_url: string | null;
  display_order: number | null;
}

const Reviews = () => {
  const [partnerTestimonials, setPartnerTestimonials] = useState<PartnerTestimonial[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const googleReviewUrl = "https://maps.app.goo.gl/yrTrMqHRhTEuwXmDA?g_st=ic";

  useEffect(() => {
    const fetchPartnerTestimonials = async () => {
      const { data, error } = await supabase
        .from("partner_testimonials")
        .select("*")
        .eq("is_approved", true)
        .order("display_order", { ascending: true });

      if (data && !error) {
        setPartnerTestimonials(data);
      }
      setLoadingPartners(false);
    };

    fetchPartnerTestimonials();
  }, []);

  const getPartnerTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "hotel":
      case "resort":
        return <Building2 className="w-5 h-5" />;
      case "dmc":
      case "travel agent":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const getPartnerTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "hotel":
      case "resort":
        return "bg-blue-100 text-blue-800";
      case "dmc":
        return "bg-green-100 text-green-800";
      case "travel agent":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Reviews & Testimonials | ResortsOffers.com</title>
        <meta name="description" content="Read authentic reviews from our customers and partner testimonials. Discover why travelers choose ResortsOffers.com for luxury resort bookings." />
        <meta name="keywords" content="customer reviews, travel testimonials, resort reviews, luxury travel feedback, partner testimonials, hotel reviews" />
        <link rel="canonical" href="https://www.resortsoffers.com/reviews" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/reviews" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Reviews & Testimonials | ResortsOffers.com" />
        <meta property="og:description" content="Read authentic reviews from our customers and partners." />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reviews & Testimonials | ResortsOffers.com" />
        <meta name="twitter:description" content="Discover why travelers choose ResortsOffers.com." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-20" 
        style={{ backgroundImage: `url(${contactHeroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60" />
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Reviews & Testimonials
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Real experiences from our customers and trusted partners
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-6 bg-muted/30 border-b">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="default"
              size="lg"
              onClick={() => window.open(googleReviewUrl, '_blank')}
              className="gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              </svg>
              Leave a Google Review
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Link to="/submit-review">
              <Button variant="outline" size="lg" className="gap-2">
                <PenSquare className="w-5 h-5" />
                Submit Your Review
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <Tabs defaultValue="customers" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="customers" className="gap-2">
                <Users className="w-4 h-4" />
                Customer Reviews
              </TabsTrigger>
              <TabsTrigger value="partners" className="gap-2">
                <Building2 className="w-4 h-4" />
                Partner Testimonials
              </TabsTrigger>
            </TabsList>

            {/* Customer Reviews Tab */}
            <TabsContent value="customers">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">What Our Customers Say</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Real feedback from travelers who booked their luxury vacations with us
                </p>
              </div>
              <ReviewsDisplay />
            </TabsContent>

            {/* Partner Testimonials Tab */}
            <TabsContent value="partners">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">Partner Testimonials</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  What our hotel partners, DMCs, and travel partners say about working with us
                </p>
              </div>

              {loadingPartners ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : partnerTestimonials.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {partnerTestimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        {/* Quote Icon */}
                        <Quote className="w-10 h-10 text-primary/20 mb-4" />
                        
                        {/* Testimonial Text */}
                        <p className="text-foreground mb-6 italic leading-relaxed">
                          "{testimonial.testimonial_text}"
                        </p>
                        
                        {/* Partner Info */}
                        <div className="flex items-center gap-4 pt-4 border-t">
                          {testimonial.partner_logo_url ? (
                            <img 
                              src={testimonial.partner_logo_url} 
                              alt={testimonial.partner_name}
                              className="w-12 h-12 object-contain rounded-lg bg-muted p-1"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              {getPartnerTypeIcon(testimonial.partner_type)}
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold">{testimonial.partner_name}</h4>
                            {testimonial.contact_person && (
                              <p className="text-sm text-muted-foreground">{testimonial.contact_person}</p>
                            )}
                          </div>
                          <Badge className={getPartnerTypeBadgeColor(testimonial.partner_type)}>
                            {testimonial.partner_type}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Partner Testimonials Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're collecting feedback from our valued hotel and travel partners. Check back soon!
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Review Submission Form */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-custom max-w-3xl">
          <ReviewSubmissionForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Prefer Google Reviews?</h2>
          <p className="text-muted-foreground mb-6">
            You can also share your experience directly on our Google Business profile.
          </p>
          <Button 
            size="lg"
            onClick={() => window.open(googleReviewUrl, '_blank')}
            className="gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
            </svg>
            Leave a Google Review
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;