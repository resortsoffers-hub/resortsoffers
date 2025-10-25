import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Calendar, Activity, Plane, Hotel, Utensils, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Thailand destination data
  const thailandData = {
    name: "Thailand",
    arabicName: "تايلاند",
    slug: "thailand",
    heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=80",
    description: "Experience the perfect blend of ancient culture, tropical beaches, and modern luxury in the Land of Smiles. Thailand offers world-class resorts, pristine islands, vibrant cities, and warm hospitality.",
    arabicDescription: "استمتع بمزيج مثالي من الثقافة القديمة والشواطئ الاستوائية والرفاهية الحديثة في بلد الابتسامات. تقدم تايلاند منتجعات عالمية المستوى وجزر نقية ومدن نابضة بالحياة وضيافة دافئة.",
    bestTimeToVisit: {
      en: "November to February - Cool and dry season with pleasant temperatures (18-32°C)",
      ar: "نوفمبر إلى فبراير - موسم بارد وجاف مع درجات حرارة لطيفة (18-32 درجة مئوية)"
    },
    regions: [
      {
        name: "Phuket",
        arabicName: "بوكيت",
        description: "Thailand's largest island, famous for stunning beaches, luxury resorts, and vibrant nightlife",
        image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80"
      },
      {
        name: "Bangkok",
        arabicName: "بانكوك",
        description: "Vibrant capital city with golden temples, luxury shopping, and world-class dining",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80"
      },
      {
        name: "Pattaya",
        arabicName: "باتايا",
        description: "Beach resort city with family attractions, water sports, and entertainment",
        image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800&q=80"
      },
      {
        name: "Koh Samui",
        arabicName: "كوه ساموي",
        description: "Tropical paradise island with palm-fringed beaches and luxury wellness resorts",
        image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800&q=80"
      },
      {
        name: "Krabi",
        arabicName: "كرابي",
        description: "Stunning limestone cliffs, hidden lagoons, and pristine island beaches",
        image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&q=80"
      },
      {
        name: "Chiang Mai",
        arabicName: "شيانغ ماي",
        description: "Cultural capital of the north with ancient temples and mountain scenery",
        image: "https://images.unsplash.com/photo-1598965675045-f2c2f7a46b0a?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Grand Palace & Wat Phra Kaew",
        titleAr: "القصر الكبير ووات فرا كايو",
        description: "Bangkok's most sacred temple complex with stunning architecture"
      },
      {
        title: "Phi Phi Islands",
        titleAr: "جزر في في",
        description: "Crystal-clear waters, dramatic cliffs, and world-famous Maya Bay"
      },
      {
        title: "Floating Markets",
        titleAr: "الأسواق العائمة",
        description: "Traditional markets on canals selling local produce and crafts"
      },
      {
        title: "Elephant Nature Park",
        titleAr: "حديقة الفيلة الطبيعية",
        description: "Ethical elephant sanctuary in Chiang Mai"
      },
      {
        title: "James Bond Island",
        titleAr: "جزيرة جيمس بوند",
        description: "Iconic limestone rock formation in Phang Nga Bay"
      },
      {
        title: "Ayutthaya Historical Park",
        titleAr: "حديقة أيوتثايا التاريخية",
        description: "UNESCO World Heritage ancient capital ruins"
      }
    ],
    activities: [
      "Island hopping boat tours",
      "Thai cooking classes",
      "Traditional Thai massage and spa treatments",
      "Scuba diving and snorkeling",
      "Muay Thai boxing experiences",
      "Temple tours and Buddhist ceremonies",
      "Night market shopping",
      "Jungle trekking and zip-lining",
      "Luxury yacht charters",
      "Golf at world-class courses"
    ],
    cuisine: [
      "Pad Thai - Stir-fried rice noodles",
      "Tom Yum Goong - Spicy shrimp soup",
      "Green Curry - Coconut-based curry",
      "Mango Sticky Rice - Sweet dessert",
      "Som Tam - Papaya salad",
      "Massaman Curry - Rich and mild curry"
    ],
    faqs: [
      {
        question: "Do I need a visa to visit Thailand?",
        questionAr: "هل أحتاج إلى تأشيرة لزيارة تايلاند؟",
        answer: "Many nationalities receive visa-free entry for 30-45 days. GCC citizens get 30 days visa-free. Check with Thai embassy for your specific requirements.",
        answerAr: "العديد من الجنسيات تحصل على دخول بدون تأشيرة لمدة 30-45 يومًا. مواطنو دول مجلس التعاون الخليجي يحصلون على 30 يومًا بدون تأشيرة. تحقق من السفارة التايلاندية لمتطلباتك المحددة."
      },
      {
        question: "What is the best time to visit Thailand?",
        questionAr: "ما هو أفضل وقت لزيارة تايلاند؟",
        answer: "November to February is ideal with cool, dry weather. March to May is hot. June to October is rainy season but good for deals.",
        answerAr: "نوفمبر إلى فبراير مثالي مع طقس بارد وجاف. مارس إلى مايو حار. يونيو إلى أكتوبر موسم الأمطار ولكنه جيد للعروض."
      },
      {
        question: "How do I get around in Thailand?",
        questionAr: "كيف أتنقل في تايلاند؟",
        answer: "Options include domestic flights, trains, buses, ferries, taxis, Grab app (like Uber), tuk-tuks, and motorbike taxis. Resorts often provide private transfers.",
        answerAr: "تشمل الخيارات الرحلات الداخلية والقطارات والحافلات والعبارات وسيارات الأجرة وتطبيق Grab (مثل أوبر) والتوك توك وتاكسي الدراجات النارية. المنتجعات غالبًا توفر نقل خاص."
      },
      {
        question: "Is Thailand safe for tourists?",
        questionAr: "هل تايلاند آمنة للسياح؟",
        answer: "Yes, Thailand is very safe for tourists. Thai people are friendly and welcoming. Use normal precautions with valuables and respect local customs.",
        answerAr: "نعم، تايلاند آمنة جدًا للسياح. الشعب التايلاندي ودود ومرحب. استخدم الاحتياطات العادية مع الأشياء الثمينة واحترم العادات المحلية."
      },
      {
        question: "What currency is used in Thailand?",
        questionAr: "ما هي العملة المستخدمة في تايلاند؟",
        answer: "Thai Baht (THB). Credit cards widely accepted at hotels and restaurants. ATMs available everywhere. Exchange rates better in Thailand than abroad.",
        answerAr: "البات التايلاندي (THB). بطاقات الائتمان مقبولة على نطاق واسع في الفنادق والمطاعم. أجهزة الصراف الآلي متوفرة في كل مكان. أسعار الصرف أفضل في تايلاند من الخارج."
      },
      {
        question: "Where should I eat in Thailand?",
        questionAr: "أين يجب أن آكل في تايلاند؟",
        answer: "Try street food for authentic flavors, local restaurants for traditional dishes, and hotel restaurants for luxury dining. Don't miss night markets for variety.",
        answerAr: "جرب طعام الشارع للنكهات الأصيلة، والمطاعم المحلية للأطباق التقليدية، ومطاعم الفنادق لتناول الطعام الفاخر. لا تفوت الأسواق الليلية للتنوع."
      },
      {
        question: "How do I travel between Thai islands?",
        questionAr: "كيف أسافر بين الجزر التايلاندية؟",
        answer: "Ferry services, speedboats, and domestic flights connect major islands. Your resort can arrange private boat transfers. Book in advance during peak season.",
        answerAr: "خدمات العبارات والقوارب السريعة والرحلات الداخلية تربط الجزر الرئيسية. يمكن لمنتجعك ترتيب نقل خاص بالقارب. احجز مسبقًا خلال الموسم."
      },
      {
        question: "What should I pack for Thailand?",
        questionAr: "ماذا يجب أن أحزم لتايلاند؟",
        answer: "Light, breathable clothing, swimwear, sunscreen, insect repellent, comfortable walking shoes, and modest clothing for temples (covering shoulders and knees).",
        answerAr: "ملابس خفيفة وقابلة للتنفس، ملابس سباحة، واقي شمسي، طارد حشرات، أحذية مشي مريحة، وملابس محتشمة للمعابد (تغطي الكتفين والركبتين)."
      }
    ]
  };

  const destination = slug === "thailand" ? thailandData : null;

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