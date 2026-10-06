import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Star, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import contactHeroImg from "@/assets/uploads/browse-patina-maldives-aerial.jpg";
import consultationPoolImg from "@/assets/uploads/browse-dhawa-ihuru-twin-island.jpeg";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll be in touch soon.");
  };

  const contactInfo = [
    {
      icon: <MessageCircle className="w-6 h-6 text-[#25D366]" />,
      title: "WhatsApp",
      details: [
        { text: "+971 54 747 4404", link: "https://wa.me/971547474404" },
      ],
    },
    {
      icon: <Mail className="w-6 h-6 text-accent-strong" />,
      title: "Email Us",
      details: [{ text: "VIP@resortsoffers.com", link: "mailto:VIP@resortsoffers.com" }],
    },
    {
      icon: <Star className="w-6 h-6 text-accent-strong" />,
      title: "Google Reviews",
      details: [{ text: "Leave us a review ⭐", link: "https://maps.app.goo.gl/yrTrMqHRhTEuwXmDA?g_st=ic" }],
    },
  ];

  const faqs = [
    {
      q: "What types of resorts do you offer?",
      a: "We partner with luxury resorts worldwide, including beachfront properties, mountain retreats, island paradises, and exclusive boutique hotels. Each resort is carefully selected for quality and service.",
    },
    {
      q: "How do I book a resort package?",
      a: "Simply contact us through this form, email, or phone. Our travel experts will discuss your preferences, show you available options, and handle all booking arrangements.",
    },
    {
      q: "Are your offers really exclusive?",
      a: "Yes! We have special partnerships with luxury resorts that provide us with exclusive rates and packages not available to the general public.",
    },
    {
      q: "Do you offer custom vacation packages?",
      a: "Absolutely! We specialize in creating personalized vacation experiences tailored to your specific preferences, budget, and travel dates.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us - Luxury Travel Experts | ResortsOffers.com</title>
        <meta
          name="description"
          content="Contact our luxury travel experts. Get instant support via WhatsApp or email, or book a paid consultation for detailed trip planning."
        />
        <meta
          name="keywords"
          content="contact travel agency, luxury travel experts, resort booking help, travel support, WhatsApp booking, paid travel consultation"
        />
        <link rel="canonical" href="https://resortsoffers.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://resortsoffers.com/contact" />
        <meta property="og:site_name" content="ResortsOffers.com" />
        <meta property="og:title" content="Contact Us - Luxury Travel Experts" />
        <meta property="og:description" content="Contact our luxury travel experts or book a $200 consultation." />
        <meta property="og:image" content={contactHeroImg} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Luxury Travel Experts" />
        <meta name="twitter:description" content="Contact our team or book a $200 consultation." />
      </Helmet>

      <Navbar />

      <section
        className="relative mt-20 flex min-h-[60vh] items-end overflow-hidden"
        style={{ backgroundImage: `url(${contactHeroImg})`, backgroundSize: "cover", backgroundPosition: "center top" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 container-custom pb-14 text-center text-white">
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-6xl">Contact Us</h1>
          <p className="mx-auto max-w-3xl text-lg md:text-2xl">Let's plan your perfect luxury resort experience together</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-bold">Send Us a Message</h2>
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="p-4">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                      Prefer instant chat? Contact us on WhatsApp!
                    </p>
                    <a
                      href="https://wa.me/971547474404"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-2 text-sm font-medium transition-colors hover:bg-[#25D366]/20"
                    >
                      +971 54 747 4404
                    </a>
                  </CardContent>
                </Card>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                <Button type="submit" size="lg" className="w-full px-12 md:w-auto">
                  Send Message
                </Button>
              </form>
            </div>

            <div>
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
                        <div key={i} className="mb-2 last:mb-0">
                          <a
                            href={detail.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent/10"
                          >
                            <span className="text-base font-medium transition-colors group-hover:text-accent-strong">{detail.text}</span>
                          </a>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}

                <Card className="overflow-hidden border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img src={consultationPoolImg} alt="Luxury consultation setting" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">Book Paid Consultation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-accent/30 bg-background/80 p-4 text-center">
                      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Consultation Fee</div>
                      <div className="mt-2 font-serif text-3xl text-primary">$200</div>
                      <div className="mt-1 text-sm text-muted-foreground">Per consultation</div>
                    </div>
                    <Button className="w-full" size="lg" onClick={() => (window.location.href = "/book-consultation")}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Book a Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
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
