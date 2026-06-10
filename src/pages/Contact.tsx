import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, MessageCircle, Mail, Send, Facebook, Instagram, Twitter, Star, Youtube, Linkedin, Calendar, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import contactHeroImg from "@/assets/uploads/resorts-offers-nora-maldives.jpeg.asset.json";
...
                <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-primary" />
                      <CardTitle className="text-lg">Book Paid Consultation</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Bell className="w-4 h-4" />
                      Instant confirmation via WhatsApp for both parties
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Schedule a personalized consultation with our travel experts for urgent inquiries and detailed trip planning.
                    </p>
                    <div className="rounded-lg border border-accent/30 bg-background/80 p-4 text-center">
                      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Consultation Fee</div>
                      <div className="mt-2 text-3xl font-serif text-primary">$200</div>
                      <div className="mt-1 text-sm text-muted-foreground">Per consultation</div>
                    </div>
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
                      onClick={() => window.location.href = '/book-consultation'}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book $200 Consultation
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Paid consultation — $200 per session
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
                        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
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
