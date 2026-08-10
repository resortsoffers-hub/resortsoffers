import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { MapPin, Star, MessageCircle, Check, Calendar, Users, Utensils, Wifi, Car } from "lucide-react";

interface Offer {
  title: string;
  destination: string;
  discount: number;
  originalPrice: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  rating: number;
  reviews: number;
}

interface OfferDetailModalProps {
  offer: Offer | null;
  isOpen: boolean;
  onClose: () => void;
}

const OfferDetailModal = ({ offer, isOpen, onClose }: OfferDetailModalProps) => {
  if (!offer) return null;

  const whatsappNumber = "971547474404";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi! I am interested in booking "${offer.title}" in ${offer.destination}. Price: ${offer.price}/night. Please send me availability and more details.`
  )}`;

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Utensils, label: "Breakfast Included" },
    { icon: Car, label: "Airport Transfer" },
    { icon: Users, label: "24/7 Concierge" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80">
          <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-500 text-white font-bold text-lg px-3 py-1">
              {offer.discount}% OFF
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{offer.title}</h2>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{offer.destination}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{offer.rating} ({offer.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Price per night</p>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-400 line-through">{offer.originalPrice}</span>
                <span className="text-3xl font-bold text-[#003B95]">{offer.price}</span>
              </div>
              <p className="text-sm text-green-600 font-medium">You save {offer.discount}%</p>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-[#04291a]">
                <MessageCircle className="w-5 h-5 mr-2" />
                Book via WhatsApp
              </Button>
            </a>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About this offer</h3>
            <p className="text-gray-600">{offer.description}</p>
          </div>

          {/* What is Included */}
          <div>
            <h3 className="text-lg font-semibold mb-3">What is included</h3>
            <div className="grid grid-cols-2 gap-3">
              {offer.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resort amenities</h3>
            <div className="flex flex-wrap gap-4">
              {amenities.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <Icon className="w-5 h-5 text-[#0077A8]" />
                    <span className="text-sm">{amenity.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Info */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-[#003B95] mb-2">How to book</h3>
            <p className="text-sm text-gray-600 mb-3">
              Click the WhatsApp button above to chat with our travel experts. They will help you with:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check availability for your dates</li>
              <li>• Customize your package</li>
              <li>• Arrange flights and transfers</li>
              <li>• Answer any questions</li>
            </ul>
          </div>

          {/* Bottom CTA */}
          <div className="flex gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-[#0077A8] hover:bg-[#0090c9] text-white py-6">
                <MessageCircle className="w-5 h-5 mr-2" />
                Enquire Now
              </Button>
            </a>
            <a href="tel:+971547474404" className="flex-1">
              <Button variant="outline" className="w-full py-6 border-[#003B95] text-[#003B95] hover:bg-[#003B95] hover:text-white">
                Call to Book
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDetailModal;