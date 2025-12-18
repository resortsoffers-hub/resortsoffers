import { 
  Plane, 
  Ship, 
  Car, 
  Bus, 
  Globe, 
  FileText, 
  Shield, 
  Building2, 
  Hotel, 
  QrCode,
  Percent,
  Calendar,
  Crown,
  Heart,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyBookWithUs = () => {
  const services = [
    { icon: Plane, label: "FLIGHTS" },
    { icon: Ship, label: "CRUISE" },
    { icon: Car, label: "CAR HIRE" },
    { icon: Bus, label: "AIRPORT TRANSFERS" },
    { icon: Globe, label: "TAILOR-MADE TOURING" },
    { icon: FileText, label: "VISA SERVICES" },
    { icon: Shield, label: "INSURANCE" },
    { icon: Building2, label: "HOME CHECK-IN SERVICES" },
    { icon: Hotel, label: "HOTEL STAYS" },
  ];

  const paymentMethods = [
    { name: "Visa", color: "bg-blue-600" },
    { name: "Mastercard", color: "bg-red-500" },
    { name: "Apple Pay", color: "bg-black" },
    { name: "Google Pay", color: "bg-white border border-gray-300" },
    { name: "Bank Transfer", color: "bg-emerald-600" },
    { name: "Tabby", color: "bg-teal-500" },
    { name: "Tamara", color: "bg-purple-600" },
  ];

  return (
    <section className="py-0">
      {/* Why Book Section - Dark Background */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6bS0xMiAwYzAtMiAyLTQgMi00czIgMiAyIDQtMiA0LTIgNC0yLTItMi00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              WHY BOOK WITH RESORTS OFFERS?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We offer a huge range of travel options across the world and because we only work with hotels, 
              travel companies and airlines that meet our discerning standards, you can be sure that your 
              holiday will be of the very highest quality.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-12 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent">📧</span>
              <span>info@resortsoffers.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">📞</span>
              <span>+971 567 622 484</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">📍</span>
              <span>Visit our Office</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Follow us</span>
              <span className="text-accent">@resortsoffers</span>
            </div>
          </div>

          {/* Services Grid Title */}
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-accent">
              WE CAN HELP WITH ALL YOUR TRAVEL NEEDS INCLUDING:
            </h3>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider">{service.label}</span>
              </div>
            ))}
            {/* QR Code / Discover More */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center mb-3">
                <QrCode className="w-10 h-10 text-slate-900" />
              </div>
              <span className="text-xs font-medium tracking-wider">DISCOVER MORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accepted Payment Methods Section */}
      <div className="bg-slate-100 py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CreditCard className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-primary">ACCEPTED PAYMENT METHODS</h3>
            </div>
            <p className="text-muted-foreground">We accept multiple payment options for your convenience</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method, index) => (
              <div 
                key={index} 
                className={`${method.color} px-6 py-3 rounded-lg shadow-md flex items-center justify-center min-w-[120px] hover:scale-105 transition-transform`}
              >
                <span className={`font-semibold text-sm ${method.name === 'Google Pay' ? 'text-gray-800' : 'text-white'}`}>
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Save Section - Light Background */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10">
            HOW TO SAVE ON EVERY SINGLE TRIP:
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Membership Cards */}
            <div>
              {/* Membership Cards Display */}
              <div className="flex flex-wrap gap-4 mb-8">
                {/* VIP Membership Card */}
                <div className="relative w-72 h-44 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 p-4 shadow-xl transform hover:scale-105 transition-transform">
                  <div className="absolute top-3 left-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-3 right-4 text-right">
                    <span className="text-white text-xs font-semibold">RESORTS OFFERS</span>
                  </div>
                  <div className="absolute bottom-12 left-4">
                    <div className="text-white font-bold text-lg tracking-wider">VIP MEMBERSHIP</div>
                    <div className="text-white/80 text-xs mt-1">EXCLUSIVE REWARDS PROGRAM</div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-sm">
                    •••• •••• •••• 0001
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">VIP</span>
                    </div>
                  </div>
                </div>

                {/* Honeymoon Membership Card */}
                <div className="relative w-72 h-44 rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-4 shadow-xl transform hover:scale-105 transition-transform">
                  <div className="absolute top-3 left-4">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div className="absolute top-3 right-4 text-right">
                    <span className="text-white text-xs font-semibold">RESORTS OFFERS</span>
                  </div>
                  <div className="absolute bottom-12 left-4">
                    <div className="text-white font-bold text-lg tracking-wider">HONEYMOON</div>
                    <div className="text-white/80 text-xs mt-1">ROMANTIC GETAWAY REWARDS</div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-sm">
                    •••• •••• •••• 0002
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Section */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Percent className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    SAVE WITH RESORTS OFFERS MEMBERSHIP
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Enjoy unique and exciting benefits when using your Resorts Offers VIP or Honeymoon Membership. 
                    Members receive <span className="font-bold text-primary">10% cashback</span> as Resorts Offers Points with EVERY 
                    purchase at Resorts Offers and partner outlets.
                  </p>
                </div>
              </div>

              {/* Points Value */}
              <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Points Value:</span>
                  <span className="font-bold text-primary ml-2">1 Resorts Offers Point = AED 1</span>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Plans */}
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Purchase at Resorts Offers outlets and resortsoffers.com. With a payment plan of 
                <span className="font-bold text-primary"> 0% interest for up to 6 months</span>, complimentary 
                access to exclusive travel perks, 0% FX rates and unrestricted redemption criteria, 
                travelling has never been easier.
              </p>

              <p className="text-sm text-muted-foreground italic">
                Terms and conditions apply.
              </p>

              {/* Easy Payment Plans */}
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">0% Interest Easy Payment Plans</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Enjoy 0% Interest Easy Payment Plans for your dream holiday. Resorts Offers is 
                    delighted to partner with several banks to offer you the opportunity to easily 
                    spread the cost of your bucket-list experiences into <span className="font-bold">3 / 6 / 9 / 12-month 
                    interest-free instalments</span>.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent/90">
                    Become a Member
                  </Button>
                </Link>
                <Link to="/offers">
                  <Button variant="outline">
                    View Offers
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-12 pt-6 border-t">
            <h4 className="font-bold text-primary mb-2">TERMS & CONDITIONS</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Please note all prices are correct at the time of publishing and are subject to availability. 
              Prices shown are per person and include applicable taxes and surcharges unless otherwise specified. 
              Actual prices for your preferred travel dates may vary and change without notice and some seasonal 
              surcharges may apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithUs;
