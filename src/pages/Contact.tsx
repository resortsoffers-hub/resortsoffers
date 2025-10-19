import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, MessageCircle, Globe, Send, Facebook, Instagram, Twitter, Star } from "lucide-react";
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
      title: "WhatsApp",
      details: [
        { text: "+971 56 762 2484 (UAE)", link: "https://wa.me/971567622484" },
        { text: "+966 582 360 080 (KSA)", link: "https://wa.me/966582360080" }
      ]
    },
    {
      icon: <Globe className="w-6 h-6 text-accent" />,
      title: "Website",
      details: [{ text: "www.resortsoffers.com", link: "https://www.resortsoffers.com" }]
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: "Business Hours",
      details: ["Available 24/7 for urgent inquiries"]
    },
    {
      icon: <Star className="w-6 h-6 text-accent" />,
      title: "Google Reviews",
      details: [{ text: "Leave us a review ⭐", link: "https://g.page/r/CfJvRGYBkj4NEBM/review" }]
    }
  ];

  return (
    <div className="min-h-screen">
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
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {info.icon}
                        <CardTitle className="text-lg">{info.title}</CardTitle>
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
                    <a href="https://twitter.com/Resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Twitter">
                      <Twitter size={24} />
                    </a>
                    <a href="https://t.me/resortsoffers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Telegram">
                      <Send size={24} />
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
