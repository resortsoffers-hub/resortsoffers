import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      category: "Destinations",
      icon: "🌍",
      questions: [
        {
          q: "Which destinations are most popular for luxury holidays?",
          a: "The Maldives consistently ranks as our most sought-after destination for luxury travelers, offering unparalleled overwater villas and pristine beaches. Dubai and the UAE are popular for families and shopping enthusiasts, while Seychelles appeals to honeymooners seeking privacy. For European luxury, Italy's Lake Garda and the Amalfi Coast remain timeless favorites. Bali combines cultural richness with beachfront luxury, making it ideal for couples and wellness seekers."
        },
        {
          q: "When is the best time to visit the Maldives?",
          a: "The peak season for the Maldives is November to April, offering dry weather, calm seas, and perfect conditions for water sports and diving. December to March sees the highest prices due to ideal weather. The monsoon season (May to October) brings occasional rain but also significant discounts of 30-40%, with July and August still offering good weather windows. For the best value, consider booking in late April or early November."
        },
        {
          q: "What makes Seychelles different from Maldives?",
          a: "While both offer tropical luxury, Seychelles features dramatic granite rock formations, lush hillside vegetation, and larger islands with more diverse terrain perfect for hiking and exploration. The Maldives is flatter with classic coral atolls, more focus on overwater accommodations, and better diving/snorkeling. Seychelles offers better biodiversity with unique wildlife and UNESCO World Heritage sites. Maldives has more ultra-luxury water villa options, while Seychelles provides a mix of beach and jungle experiences."
        }
      ]
    },
    {
      category: "Visa & Travel",
      icon: "✈️",
      questions: [
        {
          q: "Do I need a visa for Maldives, Dubai, or Seychelles?",
          a: "Most nationalities receive a free 30-day visa on arrival in the Maldives with a valid passport, return ticket, and proof of accommodation. Dubai (UAE) offers visa-free entry or visa on arrival for 90+ countries, with 30-90 day stays depending on nationality. Seychelles grants a free visitor's permit on arrival valid for 3 months, extendable up to 12 months. Always check the latest requirements based on your citizenship before booking."
        }
      ]
    },
    {
      category: "Booking & Pricing",
      icon: "💰",
      questions: [
        {
          q: "How far in advance should I book my resort vacation?",
          a: "For peak seasons (December-January, July-August), book 4-6 months in advance to secure the best villas and rates. Maldives water villas at top resorts can sell out 6+ months ahead for Christmas and New Year. For shoulder season travel (April-May, September-October), 2-3 months advance booking usually suffices. We also offer exceptional last-minute deals for flexible travelers booking 2-4 weeks ahead, with potential savings of 30-40% off regular rates."
        },
        {
          q: "What's the typical budget for a Maldives luxury vacation?",
          a: "A mid-range Maldives resort averages $400-600 per night for water villas including breakfast. Ultra-luxury brands like Soneva, One&Only, and Cheval Blanc range $1,000-3,000+ per night all-inclusive. Budget an additional $100-200 per person daily for meals (if not included), excursions, and spa treatments. Seaplane transfers cost $300-500 per person roundtrip. A typical 7-night Maldives luxury holiday for a couple runs $5,000-15,000 total depending on resort tier and season. Our packages help maximize value with included benefits."
        },
        {
          q: "Are all-inclusive packages worth it at luxury resorts?",
          a: "All-inclusive packages can offer significant value, especially in remote destinations like the Maldives where resort dining is the only option and can be very expensive. For active travelers who'll dine multiple times daily, enjoy premium beverages, and participate in water sports, all-inclusive often pays for itself. However, if you prefer dining flexibility, light eating patterns, or don't drink alcohol, half-board (breakfast and dinner) may be more economical. We help calculate which option saves you more based on your travel style."
        }
      ]
    },
    {
      category: "Resorts & Accommodation",
      icon: "🏨",
      questions: [
        {
          q: "How do I choose the right resort for my family?",
          a: "For families, prioritize resorts with kids clubs, family villas with multiple bedrooms, and shallow beach areas safe for children. Dubai excels for families with theme parks and attractions nearby. Maldives resorts with speedboat transfers (under 30 minutes) are better for young children than seaplane transfers. Look for all-inclusive options to manage costs and resorts with babysitting services for parents' alone time. Check age restrictions—some Maldives resorts are adults-only or have minimum age requirements."
        },
         {
           q: "Which destinations are best for honeymoons?",
           a: "The Maldives tops honeymoon choices with private overwater villas, romantic dining experiences, and complete seclusion. Seychelles offers more adventurous honeymoons combining beach luxury with nature exploration. Santorini, Greece provides stunning sunsets, charming villages, and Mediterranean cuisine. Bali blends romance with culture, offering private villa resorts and spiritual experiences. Many resorts offer honeymoon packages including romantic welcome amenities, couples spa treatments, sunset cruises, and special dining arrangements."
         }
      ]
    },
    {
      category: "Planning & Services",
      icon: "📋",
      questions: [
        {
          q: "Can you arrange multi-destination trips combining different resorts?",
          a: "Absolutely! We specialize in creating seamless multi-destination itineraries. Popular combinations include Dubai + Maldives (luxury shopping and beach relaxation), Seychelles island hopping (Mahé, Praslin, La Digue), or Italy multi-city (Rome, Florence, Lake Garda). We handle all transfers, ensure proper pacing between destinations, and negotiate better rates through our resort partnerships. Multi-destination trips work best with 3+ nights per location to avoid excessive travel time and truly experience each place."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Frequently Asked Questions - Travel & Resort Information | Resorts Offers</title>
        <meta name="description" content="Get answers to common questions about luxury resort bookings, destinations, visa requirements, and travel planning with Resorts Offers." />
        <link rel="canonical" href="https://www.resortsoffers.com/faq" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-accent py-24 mt-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Find answers to common questions about destinations, bookings, and luxury travel
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base bg-background"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No questions found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((category, catIndex) => (
                <div key={catIndex} className="bg-card rounded-xl shadow-sm border overflow-hidden">
                  <div className="bg-primary/5 px-6 py-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      {category.category}
                    </h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((qa, qIndex) => (
                      <AccordionItem 
                        key={qIndex} 
                        value={`item-${catIndex}-${qIndex}`}
                        className="border-b last:border-b-0 px-6"
                      >
                        <AccordionTrigger className="text-left py-5 hover:no-underline hover:text-primary text-base font-semibold">
                          {qa.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                          {qa.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Our travel experts are here to help. Contact us for personalized assistance with your booking.
          </p>
          <a href="/contact" className="inline-block">
            <button className="bg-background text-primary hover:bg-background/90 px-8 py-3 rounded-lg font-semibold text-lg transition-all">
              Contact Our Team
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
