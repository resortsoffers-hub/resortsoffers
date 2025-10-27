import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Star, MapPin, Clock, Users, Wifi, Utensils, 
  Waves, Dumbbell, Baby, Activity, ExternalLink 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getResortBySlug } from "@/data/resortsData";

const ResortDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const resort = slug ? getResortBySlug(slug) : null;

  if (!resort) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center mt-16">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Resort Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The resort you're looking for doesn't exist or hasn't been added yet.
              </p>
              <Button onClick={() => navigate("/resorts")}>
                Back to Resorts
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
        <title>{resort.name} - Luxury Resort Details | ResortsOffers.com</title>
        <meta name="description" content={resort.description} />
        <meta name="keywords" content={`${resort.name}, ${resort.location}, luxury resort, ${resort.region}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section 
          className="relative h-[70vh] flex items-center justify-center bg-cover bg-center mt-16"
          style={{ backgroundImage: `url('${resort.heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center text-white px-4">
            <div className="flex justify-center mb-4">
              {[...Array(resort.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {isArabic ? resort.nameAr : resort.name}
            </h1>
            <p className="text-xl mb-2 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              {isArabic ? resort.locationAr : resort.location}
            </p>
            <p className="text-lg max-w-3xl mx-auto mt-6">
              {isArabic ? resort.descriptionAr : resort.description}
            </p>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-accent/20 py-6">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? "تسجيل الدخول" : "Check-in"}</p>
                  <p className="font-semibold">{resort.checkIn}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? "تسجيل الخروج" : "Check-out"}</p>
                  <p className="font-semibold">{resort.checkOut}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? "التصنيف" : "Rating"}</p>
                  <p className="font-semibold">{resort.rating} {isArabic ? "نجوم" : "Stars"}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Utensils className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? "المطاعم" : "Restaurants"}</p>
                  <p className="font-semibold">{resort.restaurants.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Carousel */}
        <section className="container-custom py-12">
          <h2 className="text-4xl font-bold mb-8 text-center">
            {isArabic ? "معرض الصور" : "Photo Gallery"}
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {resort.gallery.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[500px] rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${resort.name} - Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Main Content Tabs */}
        <section className="container-custom py-16">
          <Tabs defaultValue="rooms" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="rooms">{isArabic ? "الغرف" : "Rooms"}</TabsTrigger>
              <TabsTrigger value="dining">{isArabic ? "المطاعم" : "Dining"}</TabsTrigger>
              <TabsTrigger value="amenities">{isArabic ? "المرافق" : "Amenities"}</TabsTrigger>
              <TabsTrigger value="activities">{isArabic ? "الأنشطة" : "Activities"}</TabsTrigger>
            </TabsList>

            {/* Rooms Tab */}
            <TabsContent value="rooms">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resort.rooms.map((room, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-64">
                      <img 
                        src={room.image} 
                        alt={isArabic ? room.nameAr : room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2">
                        {isArabic ? room.nameAr : room.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">{room.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{isArabic ? "المساحة:" : "Size:"} {room.size}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{isArabic ? "السعة:" : "Capacity:"} {room.capacity}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((amenity, i) => (
                          <span key={i} className="px-3 py-1 bg-accent rounded-full text-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Dining Tab */}
            <TabsContent value="dining">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resort.restaurants.map((restaurant, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-primary" />
                        {isArabic ? restaurant.nameAr : restaurant.name}
                      </CardTitle>
                      <p className="text-sm text-primary">
                        {isArabic ? restaurant.cuisineAr : restaurant.cuisine}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {isArabic ? restaurant.descriptionAr : restaurant.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Spa Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Activity className="w-6 h-6 text-primary" />
                    {resort.spa.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resort.spa.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {resort.spa.treatments.map((treatment, i) => (
                      <div key={i} className="px-3 py-2 bg-accent rounded-lg text-center text-sm">
                        {treatment}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Amenities Tab */}
            <TabsContent value="amenities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resort.amenities.map((amenity, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {index === 0 && <Waves className="w-5 h-5 text-primary" />}
                        {index === 1 && <Dumbbell className="w-5 h-5 text-primary" />}
                        {index === 2 && <Baby className="w-5 h-5 text-primary" />}
                        {index === 3 && <Activity className="w-5 h-5 text-primary" />}
                        {isArabic ? amenity.categoryAr : amenity.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {amenity.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {isArabic ? "الأنشطة والتجارب" : "Activities & Experiences"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {resort.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                        <Activity className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">
              {isArabic ? "هل أنت مستعد للحجز؟" : "Ready to Book?"}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {isArabic 
                ? "تواصل مع خبرائنا للحصول على أفضل الأسعار والعروض الحصرية" 
                : "Contact our experts for the best rates and exclusive offers"}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/book-consultation")}
              >
                {isArabic ? "احجز استشارة" : "Book Consultation"}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <a href={resort.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {isArabic ? "زيارة الموقع الرسمي" : "Visit Official Website"}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ResortDetail;