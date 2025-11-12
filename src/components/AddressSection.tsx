import { MapPin, Phone, Mail } from "lucide-react";

const AddressSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Offices</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Located in Dubai, we're here to help you plan your perfect getaway
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
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-4">Our Offices</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-1">Main Office</p>
                      <p className="text-muted-foreground">
                        Deira - Port Saeed<br />
                        Dubai, United Arab Emirates
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Deira+Port+Saeed+Dubai+UAE" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-primary hover:underline text-sm"
                      >
                        Get Directions →
                      </a>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="font-medium text-foreground mb-1">Creator HQ</p>
                      <p className="text-muted-foreground">
                        Sheikh Rashid Tower, 8th Floor<br />
                        Sheikh Zayed Road<br />
                        Dubai, United Arab Emirates
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Sheikh+Rashid+Tower+Sheikh+Zayed+Road+Dubai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-primary hover:underline text-sm"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14440.097626566683!2d55.26423!3d25.21826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42d0c0c0c0c0%3A0x0!2sSheikh%20Rashid%20Tower!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Resorts Offers Tourism Consultancy - Creator HQ Location"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Our offices in Dubai - Main Office (Port Saeed) & Creator HQ (Sheikh Zayed Road)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
