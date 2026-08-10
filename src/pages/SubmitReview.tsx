import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, MessageSquare, CheckCircle, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewSubmissionForm from "@/components/ReviewSubmissionForm";
import ReviewsDisplay from "@/components/ReviewsDisplay";
import contactHeroImg from "@/assets/contact-hero.jpg";

const SubmitReview = () => {
  const googleReviewUrl = "https://maps.app.goo.gl/yrTrMqHRhTEuwXmDA?g_st=ic";

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Submit Your Review - Share Your Experience | ResortsOffers.com</title>
        <meta name="description" content="Share your luxury travel experience with ResortsOffers.com. Submit your Google review and help other travelers discover exceptional resort vacations." />
        <meta name="keywords" content="submit review, travel review, resort review, luxury travel feedback, customer testimonials" />
        <link rel="canonical" href="https://resortsoffers.com/submit-review" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://resortsoffers.com/submit-review" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Submit Your Review - ResortsOffers.com" />
        <meta property="og:description" content="Share your luxury travel experience and help others discover exceptional resort vacations." />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Submit Your Review - ResortsOffers.com" />
        <meta name="twitter:description" content="Share your luxury travel experience with us." />
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
            Customer Reviews
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            See what travelers say and share your own experience
          </p>
        </div>
      </section>

      {/* Customer Reviews Section - NOW FIRST */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            </div>
            <p className="text-muted-foreground">
              Use the filters below to find reviews that match your interests
            </p>
          </div>
          <ReviewsDisplay />
        </div>
      </section>

      {/* Submit Review Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          
          {/* Google Review CTA */}
          <Card className="mb-8 border-2 border-accent bg-gradient-to-br from-accent/10 via-accent/5 to-transparent shadow-lg">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-strong">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold mb-1">Leave a Google Review</h2>
                  <p className="text-muted-foreground text-sm">
                    Share your experience on Google to help other travelers
                  </p>
                </div>
                <Button 
                  size="default"
                  className="w-full md:w-auto"
                  onClick={() => window.open(googleReviewUrl, '_blank')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
                  </svg>
                  Google Review
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Review Submission Form */}
          <div className="mb-12">
            <ReviewSubmissionForm />
          </div>

          {/* Thank You Message */}
          <Card className="bg-muted/50 text-center">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Thank You for Traveling With Us!</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We truly appreciate you choosing ResortsOffers.com for your luxury travel needs. 
                Your satisfaction is our top priority, and we look forward to serving you again.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitReview;