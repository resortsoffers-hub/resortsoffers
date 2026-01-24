import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  MapPin, 
  Plane, 
  Ship, 
  Fish, 
  Sparkles, 
  Glasses,
  Info,
  MessageCircle
} from "lucide-react";

// Sample image - would be replaced with actual Dhawa Ihuru image
import maldivesVilla from "@/assets/resorts/maldives-water-villa.jpg";

const DhawaPackageSample = () => {
  const whatsappNumber = "971567622484";
  const message = "Hi! I'm interested in the Dhawa Ihuru Maldives package - 3 Nights Beach Villa at $2,340. Please share availability.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const inclusions = [
    { icon: Plane, label: "Return Transfers" },
    { icon: Glasses, label: "Snorkeling Gear" },
    { icon: Ship, label: "Dolphin Cruise" },
    { icon: Ship, label: "Sunset Cruise" },
    { icon: Fish, label: "Night Fishing" },
    { icon: Sparkles, label: "60-min Massage" },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-serif font-bold text-center mb-8 text-foreground">
        Package Card Preview
      </h2>
      
      <div className="max-w-md mx-auto">
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
          {/* Hero Image */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={maldivesVilla}
              alt="Dhawa Ihuru Maldives"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Discount Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 text-white font-bold px-3 py-1.5 text-sm shadow-lg">
                SPECIAL OFFER
              </Badge>
            </div>

            {/* Rating */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-sm">4.5</span>
            </div>

            {/* Location Tag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">North Malé Atoll, Maldives</span>
            </div>
          </div>

          <CardContent className="p-5">
            {/* Title & Details */}
            <h3 className="text-xl font-bold text-foreground mb-1">
              Dhawa Ihuru
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              3 Nights • Beach Villa • 2 Adults
            </p>

            {/* Price Section */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">$2,340</span>
              <span className="text-sm text-muted-foreground">total package</span>
            </div>

            {/* Inclusions Grid */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Package Includes
              </p>
              <div className="grid grid-cols-3 gap-2">
                {inclusions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-2 bg-secondary/30 rounded-lg text-center"
                  >
                    <item.icon className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Note:</strong> Complimentary 3 activities for 3 nights stay, 
                  4 activities for 4 nights stay, and maximum 5 activities for 
                  5 nights stay and above.
                </p>
              </div>
            </div>

            {/* Valid Until Badge */}
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                Valid until 30 April
              </Badge>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Now via WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DhawaPackageSample;
