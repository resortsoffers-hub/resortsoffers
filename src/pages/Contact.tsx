import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, MessageCircle, Globe, Send, Facebook, Instagram, Twitter, Star, Youtube, Linkedin, Calendar, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll be in touch soon.");
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-accent" />,
      title: "Location",
      details: ["Deira - Port Saeed - Dubai - United Arab Emirates"]
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-accent" />,
      title: "WhatsApp Business - Available 24/7",
      details: [
        { text: "+971 56 762 2484 (UAE)", link: "https://wa.me/971567622484" },
        { text: "+966 582 360 080 (KSA)", link: "https://wa.me/966582360080" },
        { text: "+44 7500 029091 (UK)", link: "https://wa.me/447500029091" }
      ],
      badge: "24/7"
    },
    {
      icon: <Globe className="w-6 h-6 text-accent" />,
      title: "Website",
      details: [{ text: "www.resortsoffers.com", link: "https://www.resortsoffers.com" }]
    },
    {
      icon: <Star className="w-6 h-6 text-accent" />,
      title: "Google Reviews",
      details: [{ text: "Leave us a review ⭐", link: "https://g.page/r/CfJvRGYBkj4NEBM/review" }]
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us - Luxury Travel Experts | ResortsOffers.com</title>
        <meta name="description" content="Contact our luxury travel experts. Get instant support via WhatsApp, email, or phone. Available 24/7 to help plan your perfect resort vacation." />
        <meta name="keywords" content="contact travel agency, luxury travel experts, resort booking help, travel support, WhatsApp booking, travel consultation" />
        <link rel="canonical" href="https://www.resortsoffers.com/contact" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.resortsoffers.com/contact" />
        <meta property="og:title" content="Contact Us - Luxury Travel Experts" />
        <meta property="og:description" content="Contact our luxury travel experts. Available 24/7 to help plan your vacation." />
        <meta property="og:image" content="https://www.resortsoffers.com/contact-og.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Luxury Travel Experts" />
        <meta name="twitter:description" content="Available 24/7 to help plan your perfect vacation." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "TravelAgency",
              "name": "ResortsOffers.com",
              "telephone": "+971567622484",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971567622484",
                "contactType": "Customer Service",
                "availableLanguage": ["English", "Arabic", "Chinese", "Russian"]
              }
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mt-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Let's plan your perfect luxury resort experience together
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required placeholder="john.doe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+971 XX XXX XXXX" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Preferred Destination (Optional)</Label>
                  <Input id="company" placeholder="e.g., Maldives, Caribbean, Dubai" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" required placeholder="How can we help you?" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="Tell us about your dream vacation, travel dates, number of guests, and any special requirements..."
                    rows={6}
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto px-12">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className={info.badge ? "border-accent/50" : ""}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {info.icon}
                          <CardTitle className="text-lg">{info.title}</CardTitle>
                        </div>
                        {info.badge && (
                          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            {info.badge}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">
                          {typeof detail === 'string' ? (
                            detail
                          ) : (
                            <a href={detail.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                              {detail.text}
                            </a>
                          )}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                ))}

                {/* Book Online Meeting Card */}
                <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-primary" />
                      <CardTitle className="text-lg">Book Online Meeting</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Bell className="w-4 h-4" />
                      Instant confirmation via WhatsApp for both parties
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Schedule a personalized consultation with our travel experts. Perfect for urgent inquiries and detailed trip planning.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <span>Automated calendar sync for both parties</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <span>WhatsApp notifications & reminders</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <span>Meeting confirmation sent instantly</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => window.open('https://calendly.com/resortsoffers', '_blank')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Meeting Now
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Available time slots will be shown based on your timezone
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media Links */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                  <CardDescription>Follow us on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/Resortsoffers/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                      <Facebook size={24} />
                    </a>
                    <a href="https://www.instagram.com/resortsoffers/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                      <Instagram size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/noraelkhalifi/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://twitter.com/Resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Twitter">
                      <Twitter size={24} />
                    </a>
                    <a href="https://www.youtube.com/@resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="YouTube">
                      <Youtube size={24} />
                    </a>
                    <a href="https://t.me/resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Telegram">
                      <Send size={24} />
                    </a>
                    <a href="https://www.snapchat.com/add/Resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Snapchat">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-0 .605-.15.855-.389.22-.195.445-.359.694-.497.213-.116.473-.195.748-.195.682 0 1.229.463 1.229 1.04 0 .425-.236.777-.534 1.03-.267.226-.567.401-.854.566l-.003.002c-.285.162-.569.326-.764.576-.168.214-.292.457-.391.701.124.042.283.064.459.064.534 0 1.080-.188 1.544-.357.465-.173.933-.345 1.385-.345.307 0 .591.135.798.36.211.229.316.517.316.809 0 .647-.71 1.146-1.413 1.146-.385 0-.782-.094-1.195-.229-.411-.134-.853-.277-1.295-.277-.248 0-.485.044-.709.127-.285.104-.557.252-.82.398l-.003.002c-.264.146-.529.295-.835.416-.32.125-.68.19-1.065.19-1.415 0-2.470-.585-2.970-1.644-.23-.482-.324-.979-.324-1.439 0-.139.01-.274.027-.405.02-.156.043-.314.043-.475 0-.265-.135-.521-.368-.704-.253-.199-.6-.314-.96-.314-.18 0-.361.028-.536.086-.162.051-.324.115-.486.178l-.003.002c-.162.063-.324.127-.507.17-.253.058-.53.087-.821.087-1.160 0-2.131-.579-2.707-1.596-.573-1.011-.752-2.370-.752-3.771 0-2.362.78-4.607 2.196-6.313C9.968 1.572 11.683.793 12.206.793z"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What types of resorts do you offer?",
                a: "We partner with luxury resorts worldwide, including beachfront properties, mountain retreats, island paradises, and exclusive boutique hotels. Each resort is carefully selected for quality and service."
              },
              {
                q: "How do I book a resort package?",
                a: "Simply contact us through this form, email, or phone. Our travel experts will discuss your preferences, show you available options, and handle all booking arrangements."
              },
              {
                q: "Are your offers really exclusive?",
                a: "Yes! We have special partnerships with luxury resorts that provide us with exclusive rates and packages not available to the general public."
              },
              {
                q: "Do you offer custom vacation packages?",
                a: "Absolutely! We specialize in creating personalized vacation experiences tailored to your specific preferences, budget, and travel dates."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
