import { MapPin, Phone, Mail } from "lucide-react";

const AddressSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Office</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of Dubai, we're here to help you plan your perfect getaway
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    Deira - Port Saeed<br />
                    Dubai, United Arab Emirates
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Deira+Port+Saeed+Dubai+UAE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-primary hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone Numbers</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <a href="https://wa.me/971567622484" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        +971 567 622 484 (UAE)
                      </a>
                    </p>
                    <p>
                      <a href="https://wa.me/966582360080" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        +966 582 360 080 (KSA)
                      </a>
                    </p>
                    <p>
                      <a href="https://wa.me/447500029091" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        +44 7500 029091 (UK)
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:vip@resortsoffers.com" className="hover:text-primary transition-colors">
                      vip@resortsoffers.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14433.426359644524!2d55.3284!3d25.2631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d0c0c0c0c0d%3A0x0!2sDeira%20Port%20Saeed!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Resorts Offers Tourism Consultancy Location"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Our office in Deira - Port Saeed, Dubai
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
