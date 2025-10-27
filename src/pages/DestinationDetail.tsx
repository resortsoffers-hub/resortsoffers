import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Calendar, Activity, Plane, Hotel, Utensils, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinationsData } from "@/data/destinationsData";

const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const destination = slug ? destinationsData[slug] : null;

  if (!destination) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center mt-16">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Destination Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                We're working on adding detailed information for this destination.
              </p>
              <Button onClick={() => navigate("/destinations")}>
                Back to Destinations
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{destination.name} Luxury Resorts & Travel Guide | ResortsOffers.com</title>
        <meta name="description" content={destination.description} />
        <meta name="keywords" content={`${destination.name} resorts, luxury hotels ${destination.name}, ${destination.name} travel guide, best time to visit ${destination.name}`} />
        <link rel="canonical" href={`https://www.resortsoffers.com/destinations/${destination.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section 
          className="relative h-[70vh] flex items-center justify-center bg-cover bg-center mt-16"
          style={{ backgroundImage: `url('${destination.heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {destination.name}
            </h1>
            <p className="text-xl md:text-2xl mb-2">
              {destination.arabicName}
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mt-6">
              {destination.description}
            </p>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="container-custom py-12 bg-accent/10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Best Time to Visit | أفضل وقت للزيارة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-2">{destination.bestTimeToVisit.en}</p>
              <p className="text-lg text-muted-foreground">{destination.bestTimeToVisit.ar}</p>
            </CardContent>
          </Card>
        </section>

        {/* Regions */}
        <section className="container-custom py-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Popular Regions | المناطق الشهيرة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destination.regions.map((region) => (
              <Card key={region.name} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={region.image} 
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{region.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{region.arabicName}</p>
                  <p className="text-muted-foreground">{region.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Attractions */}
        <section className="container-custom py-16 bg-accent/10">
          <h2 className="text-4xl font-bold text-center mb-12">
            Top Attractions | أفضل المعالم السياحية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.topAttractions.map((attraction, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{attraction.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{attraction.titleAr}</p>
                      <p className="text-sm">{attraction.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="container-custom py-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Activities & Experiences | الأنشطة والتجارب
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cuisine */}
        <section className="container-custom py-16 bg-accent/10">
          <h2 className="text-4xl font-bold text-center mb-12">
            Must-Try Cuisine | الأطباق التي يجب تجربتها
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destination.cuisine.map((dish, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{dish}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="container-custom py-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions | الأسئلة الشائعة
          </h2>
          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            {destination.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div>
                    <div className="font-semibold">{faq.question}</div>
                    <div className="text-sm text-muted-foreground mt-1">{faq.questionAr}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    <p>{faq.answer}</p>
                    <p className="text-muted-foreground">{faq.answerAr}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Explore {destination.name}?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact our experts for personalized resort recommendations and exclusive offers
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/resorts")}
              >
                View Resorts
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20"
                onClick={() => navigate("/book-consultation")}
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DestinationDetail;