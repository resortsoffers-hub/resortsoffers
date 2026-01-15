import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Star, MapPin, Ship, Palmtree, Building2, Tent } from "lucide-react";

interface Hotel {
  name: string;
  image: string;
  description: string;
}

interface Destination {
  name: string;
  icon: React.ReactNode;
  hotels: Hotel[];
}

const destinations: Destination[] = [
  {
    name: "Maldives",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "Soneva Fushi", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80", description: "An ultra-luxury barefoot escape on a pristine private island, offering world-class dining, open-air cinemas, and unparalleled natural beauty." },
      { name: "Cheval Blanc Randheli", image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80", description: "LVMH's exclusive Maldivian retreat featuring contemporary design, Guerlain spa, and personalized butler service." },
      { name: "One&Only Reethi Rah", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80", description: "Sprawling over-water villas and pristine beaches on one of the largest resort islands in the Maldives." },
      { name: "The St. Regis Maldives Vommuli Resort", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", description: "Architectural masterpiece with iconic overwater villas, legendary St. Regis Butler Service, and world-class diving." },
      { name: "Waldorf Astoria Maldives Ithaafushi", image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80", description: "Three private islands of uncompromising luxury with 11 dining venues and the largest spa in the Maldives." },
      { name: "Four Seasons Resort Maldives at Landaa Giraavaru", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", description: "UNESCO Biosphere Reserve location with pioneering marine discovery center and Ayurvedic spa." },
      { name: "The Ritz-Carlton Maldives, Fari Islands", image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=800&q=80", description: "Contemporary island sanctuary with overwater and beach villas, featuring Ritz-Carlton's legendary service." },
      { name: "Velaa Private Island", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", description: "The epitome of bespoke luxury with private residences, golf academy, and exclusive fine dining." },
      { name: "Kandima Maldives", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", description: "Vibrant lifestyle resort offering endless activities, diverse dining, and stunning ocean pool villas." },
      { name: "The Standard, Huruvalhi Maldives", image: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=80", description: "Trendy, design-forward resort bringing urban sophistication to paradise with playful luxury experiences." },
      { name: "Furaveri Maldives", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", description: "Authentic Maldivian hospitality on a stunning natural island with exceptional house reef snorkeling." },
      { name: "Patina Maldives, Fari Islands", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", description: "Contemporary wellness sanctuary designed by Brazilian architect Marcio Kogan with sustainability at heart." },
      { name: "JOALI Maldives", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", description: "Art-immersive luxury resort showcasing curated installations by renowned international artists." },
      { name: "Anantara Kihavah Maldives Villas", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", description: "Award-winning resort with underwater restaurant, world-class observatory, and exceptional diving." },
    ]
  },
  {
    name: "Seychelles",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "North Island", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80", description: "Ultra-exclusive private island sanctuary where royalty and celebrities find ultimate privacy and natural beauty." },
      { name: "Four Seasons Resort Seychelles", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", description: "Hillside and oceanfront villas on Mahé with spectacular views and private plunge pools." },
      { name: "Six Senses Zil Pasyon", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Private island wellness retreat on Félicité with holistic spa and sustainable luxury philosophy." },
      { name: "Raffles Seychelles", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", description: "Elegant hillside villas on Praslin overlooking pristine beaches with legendary Raffles hospitality." },
      { name: "Constance Ephelia", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", description: "Sprawling beachfront resort on two stunning beaches with extensive family amenities and spa village." },
      { name: "Mango House Seychelles", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", description: "LXR Hotels & Resorts collection boutique property with intimate luxury on Mahé's southern coast." },
      { name: "Anantara Maia Seychelles Villas", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", description: "All-villa resort with dedicated butlers, oceanfront dining, and exceptional privacy." },
      { name: "Hilton Seychelles Northolme Resort & Spa", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Historic luxury resort perched on a hillside overlooking Beau Vallon with stunning sunset views." },
    ]
  },
  {
    name: "Mauritius",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "One&Only Le Saint Géran", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", description: "Legendary beachfront resort on its own peninsula with championship golf and Givenchy spa." },
      { name: "The St. Regis Mauritius Resort", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", description: "Colonial elegance meets contemporary luxury on Le Morne peninsula with exceptional butler service." },
      { name: "Four Seasons Resort Mauritius at Anahita", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", description: "Spacious villas with private pools on a pristine lagoon with Ernie Els signature golf course." },
      { name: "Shangri-La Le Touessrok, Mauritius", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", description: "Iconic resort on Trou d'Eau Douce bay with two private island retreats and championship golf." },
      { name: "The Oberoi Mauritius", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", description: "Intimate luxury resort in Turtle Bay with exceptional service and tranquil gardens." },
      { name: "Constance Prince Maurice", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Architectural marvel on stilts with floating restaurant and world-class spa sanctuary." },
      { name: "LUX* Belle Mare", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", description: "Vibrant beachfront resort with playful luxury, exceptional cuisine, and stunning beach." },
      { name: "Constance Belle Mare Plage", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", description: "Two kilometers of pristine beach with two championship golf courses and gourmet dining." },
    ]
  },
  {
    name: "Santorini",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "Canaves Oia Epitome", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", description: "Ultra-luxury cave suites perched on Santorini's caldera with private infinity pools and sunset views." },
      { name: "Grace Hotel Santorini", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80", description: "Intimate boutique hotel in Imerovigli with stunning champagne lounge and caldera panoramas." },
      { name: "Mystique, a Luxury Collection Hotel", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80", description: "Cave hotel carved into Oia's cliffs with infinity pools overlooking the volcano." },
      { name: "Andronis Arcadia", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80", description: "Contemporary wellness retreat in Oia with rooftop pool and holistic spa experiences." },
      { name: "Katikies Santorini", image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&q=80", description: "Iconic white-washed suites cascading down the caldera with legendary Greek hospitality." },
      { name: "Santo Maris Oia Luxury Suites & Spa", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", description: "Cycladic architecture meets contemporary luxury with expansive spa and gourmet dining." },
    ]
  },
  {
    name: "London",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "The Ritz London", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Legendary Piccadilly landmark offering timeless elegance, afternoon tea, and royal-approved luxury." },
      { name: "Claridge's", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", description: "Art Deco masterpiece in Mayfair, beloved by royalty and celebrities for over a century." },
      { name: "The Savoy", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", description: "Iconic Thames-side hotel blending Edwardian and Art Deco grandeur with theatrical flair." },
      { name: "The Connaught", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", description: "Mayfair's most distinguished address with Michelin-starred Hélène Darroze restaurant." },
      { name: "Rosewood London", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", description: "Edwardian splendor in High Holborn with stunning courtyard and world-class Sense spa." },
      { name: "The Lanesborough", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", description: "Regency grandeur overlooking Hyde Park with 24-hour butler service and Michelin-starred dining." },
      { name: "Four Seasons Hotel London at Ten Trinity Square", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Historic landmark near the Tower of London with La Dame de Pic and exclusive members' club." },
      { name: "Bulgari Hotel London", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", description: "Italian glamour in Knightsbridge with stunning spa, cinema, and exclusive boutique." },
    ]
  },
  {
    name: "Dubai",
    icon: <Building2 className="w-6 h-6" />,
    hotels: [
      { name: "Burj Al Arab Jumeirah", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", description: "The world's most iconic luxury hotel, offering unparalleled opulence and legendary Arabian hospitality." },
      { name: "Atlantis The Royal", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", description: "Ultra-luxury beachfront resort with celebrity restaurants, Aquaventure, and stunning architecture." },
      { name: "One&Only The Palm", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Intimate Arabian-inspired sanctuary on Palm Jumeirah with pristine private beach." },
      { name: "Four Seasons Resort Dubai at Jumeirah Beach", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", description: "Beachfront Mediterranean-inspired resort with exceptional dining and world-class spa." },
      { name: "Armani Hotel Dubai", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", description: "Giorgio Armani's design vision in the iconic Burj Khalifa with minimalist Italian luxury." },
      { name: "Jumeirah Al Naseem", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", description: "Contemporary beachfront luxury with turtle rehabilitation sanctuary and Burj Al Arab views." },
      { name: "Waldorf Astoria Dubai Palm Jumeirah", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", description: "Art Deco elegance on Palm Jumeirah with private beach and legendary Waldorf service." },
      { name: "Raffles Dubai", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", description: "Egyptian-inspired pyramid landmark with legendary butler service and rooftop garden." },
    ]
  },
  {
    name: "Bali",
    icon: <Palmtree className="w-6 h-6" />,
    hotels: [
      { name: "Four Seasons Resort Bali at Sayan", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", description: "Riverside jungle sanctuary with dramatic entrance bridge and world-renowned Sacred River Spa." },
      { name: "Aman Villas at Nusa Dua", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", description: "Clifftop minimalist villas with sweeping ocean views and legendary Aman service." },
      { name: "The Mulia, Mulia Resort & Villas", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Grand beachfront resort with The Mulia Spa, nine restaurants, and pristine white sand beach." },
      { name: "COMO Shambhala Estate", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", description: "Holistic wellness retreat in Ubud's jungle with life-changing health programs." },
      { name: "Mandapa, a Ritz-Carlton Reserve", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", description: "Intimate riverside retreat with rice paddy views, organic farm, and exceptional wellness." },
      { name: "Bulgari Resort Bali", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", description: "Cliffside Italian elegance in Uluwatu with dramatic ocean views and exclusive beach club." },
      { name: "The St. Regis Bali Resort", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", description: "Beachfront grandeur in Nusa Dua with largest lagoon pool and St. Regis Butler Service." },
      { name: "Capella Ubud", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", description: "Glamping tents in the rainforest designed by Bill Bensley with theatrical luxury." },
    ]
  },
  {
    name: "South Africa - Luxury Safari Lodges",
    icon: <Tent className="w-6 h-6" />,
    hotels: [
      { name: "Singita Sabi Sand", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", description: "Legendary private game reserve with world-class lodges, exceptional Big Five sightings, and conservation leadership." },
      { name: "Royal Malewane", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", description: "Colonial elegance in Greater Kruger with Africa House spa and exclusive bush experiences." },
      { name: "Londolozi Private Game Reserve", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80", description: "Pioneer of luxury safari with five distinct camps and legendary leopard sightings." },
      { name: "andBeyond Phinda Private Game Reserve", image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80", description: "Seven ecosystems, six lodges, and pioneering community conservation programs." },
      { name: "Ellerman House", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", description: "Cape Town's most exclusive boutique hotel with art collection and panoramic ocean views." },
      { name: "The Silo Hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", description: "Architectural marvel atop Zeitz MOCAA with pillowed windows and V&A Waterfront views." },
      { name: "One&Only Cape Town", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", description: "V&A Waterfront luxury with island spa, Nobu restaurant, and Table Mountain backdrop." },
      { name: "Saxon Hotel, Villas and Spa", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", description: "Johannesburg's most exclusive hotel where Nelson Mandela completed his autobiography." },
    ]
  },
  {
    name: "Luxury Cruises",
    icon: <Ship className="w-6 h-6" />,
    hotels: [
      { name: "Regent Seven Seas Cruises", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80", description: "The most inclusive luxury cruise experience with all-suite ships and world-class cuisine." },
      { name: "Silversea Cruises", image: "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800&q=80", description: "Italian elegance at sea with intimate ships, butler service, and expedition voyages." },
      { name: "Seabourn Cruise Line", image: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=800&q=80", description: "Ultra-luxury intimate ships with award-winning cuisine and destination immersion." },
      { name: "Crystal Cruises", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80", description: "Legendary luxury cruise line known for spacious suites and exceptional service." },
      { name: "Oceania Cruises", image: "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800&q=80", description: "Finest cuisine at sea with destination-focused itineraries and intimate ship atmosphere." },
      { name: "Viking Ocean Cruises", image: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=800&q=80", description: "Scandinavian elegance with cultural enrichment and destination-focused voyages." },
      { name: "The Ritz-Carlton Yacht Collection", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80", description: "Legendary Ritz-Carlton service at sea with bespoke itineraries and personalized experiences." },
      { name: "Explora Journeys", image: "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800&q=80", description: "MSC's ultra-luxury brand offering European sophistication and ocean-state-of-mind philosophy." },
    ]
  }
];

const specialOccasions = [
  "Honeymoon",
  "Anniversary",
  "Birthday",
  "Wedding",
  "Family Vacation",
  "Romantic Getaway",
  "Business Trip",
  "Other"
];

interface QuoteFormData {
  fullName: string;
  adults: string;
  kids: string;
  kidsAges: string;
  travelDates: string;
  occasion: string;
  requests: string;
}

const HotelCard = ({ hotel, destination }: { hotel: Hotel; destination: string }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    adults: "2",
    kids: "0",
    kidsAges: "",
    travelDates: "",
    occasion: "",
    requests: ""
  });

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "971547474404";
    const message = `
🌟 *Quote Request - ${hotel.name}*
━━━━━━━━━━━━━━━━━━━━━

📍 *Destination:* ${destination}
🏨 *Hotel/Cruise:* ${hotel.name}

👤 *Guest Details:*
• Full Name: ${formData.fullName || "Not specified"}
• Adults: ${formData.adults}
• Children: ${formData.kids}
${formData.kids !== "0" ? `• Children Ages: ${formData.kidsAges || "Not specified"}` : ""}

📅 *Travel Dates:* ${formData.travelDates || "Flexible"}
🎉 *Special Occasion:* ${formData.occasion || "None specified"}

💬 *Additional Requests:*
${formData.requests || "None"}

━━━━━━━━━━━━━━━━━━━━━
Sent via Resorts Offers
    `.trim();

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Hotel Image & Info */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">{hotel.name}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{hotel.description}</p>

        {/* Quote Request Form */}
        <div className="space-y-4 bg-gray-50 rounded-xl p-5">
          <h4 className="font-semibold text-[#1e3a5f] flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5" />
            Request a Quote
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor={`name-${hotel.name}`} className="text-sm font-medium text-gray-700">Full Name *</Label>
              <Input
                id={`name-${hotel.name}`}
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`adults-${hotel.name}`} className="text-sm font-medium text-gray-700">Number of Adults *</Label>
              <Select value={formData.adults} onValueChange={(value) => handleInputChange("adults", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Adults" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor={`kids-${hotel.name}`} className="text-sm font-medium text-gray-700">Number of Kids</Label>
              <Select value={formData.kids} onValueChange={(value) => handleInputChange("kids", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Kids" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.kids !== "0" && (
              <div className="md:col-span-2">
                <Label htmlFor={`ages-${hotel.name}`} className="text-sm font-medium text-gray-700">Ages of Kids</Label>
                <Input
                  id={`ages-${hotel.name}`}
                  placeholder="e.g., 5, 8, 12"
                  value={formData.kidsAges}
                  onChange={(e) => handleInputChange("kidsAges", e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <Label htmlFor={`dates-${hotel.name}`} className="text-sm font-medium text-gray-700">Travel Dates</Label>
              <Input
                id={`dates-${hotel.name}`}
                placeholder="e.g., March 15-22, 2025"
                value={formData.travelDates}
                onChange={(e) => handleInputChange("travelDates", e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor={`occasion-${hotel.name}`} className="text-sm font-medium text-gray-700">Special Occasion</Label>
              <Select value={formData.occasion} onValueChange={(value) => handleInputChange("occasion", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select occasion (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {specialOccasions.map(occasion => (
                    <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor={`requests-${hotel.name}`} className="text-sm font-medium text-gray-700">Additional Requests</Label>
              <Textarea
                id={`requests-${hotel.name}`}
                placeholder="Any special requirements, room preferences, dietary needs..."
                value={formData.requests}
                onChange={(e) => handleInputChange("requests", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3 text-lg gap-2">
              <MessageCircle className="w-5 h-5" />
              Ask for a Quote
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

const PartnerHotels = () => {
  return (
    <>
      <Helmet>
        <title>Our Partner Hotels - Luxury Resorts & Cruises | Resorts Offers</title>
        <meta name="description" content="Explore our curated collection of luxury partner hotels, resorts, and cruise lines across Maldives, Seychelles, Mauritius, Santorini, London, Dubai, Bali, South Africa, and more." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
              alt="Luxury Resort"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/80 via-[#1e3a5f]/60 to-[#1e3a5f]/80" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our Partner Hotels</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Curated collection of the world's most exceptional luxury hotels, resorts, and cruise experiences
            </p>
          </div>
        </section>

        {/* Destination Sections */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {destinations.map((destination, index) => (
            <section key={destination.name} className="mb-20">
              {/* Destination Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white">
                  {destination.icon}
                </div>
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f]">
                    {destination.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.hotels.length} Luxury Properties</span>
                  </div>
                </div>
              </div>

              {/* Hotels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destination.hotels.map((hotel) => (
                  <HotelCard key={hotel.name} hotel={hotel} destination={destination.name} />
                ))}
              </div>

              {/* Divider */}
              {index < destinations.length - 1 && (
                <div className="mt-16 flex items-center justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#1e3a5f]/30 to-transparent rounded-full" />
                </div>
              )}
            </section>
          ))}
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default PartnerHotels;
