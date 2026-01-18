import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed, Plane, Camera, Sparkles, Ship, Baby, UserCheck, Heart, Gift, CheckCircle } from "lucide-react";

// Import images for each value
import floatingBreakfast from "@/assets/resorts/pool-breakfast.jpg";
import seaplaneTransfer from "@/assets/maldives-waldorf.jpg";
import photoSession from "@/assets/resorts/wedding-couple-cart.jpg";
import spaMassage from "@/assets/lake-garda-wellness.jpg";
import sunsetCruise from "@/assets/resorts/maldives-water-villa.jpg";
import kidsStay from "@/assets/dubai-family.jpg";
import butlerService from "@/assets/resorts/luxury-villa-pool.jpg";
import honeymoonAmenities from "@/assets/resorts/wedding-ceremony.jpg";

const addedValues = [
  {
    id: 1,
    title: "Floating Breakfast",
    description: "Start your day with a magical in-pool breakfast experience",
    icon: UtensilsCrossed,
    image: floatingBreakfast,
  },
  {
    id: 2,
    title: "Seaplane Transfer",
    description: "Scenic aerial journey to your island paradise",
    icon: Plane,
    image: seaplaneTransfer,
  },
  {
    id: 3,
    title: "Photo Session",
    description: "Professional photography to capture your memories",
    icon: Camera,
    image: photoSession,
  },
  {
    id: 4,
    title: "Spa & Massage",
    description: "Rejuvenating treatments for complete relaxation",
    icon: Sparkles,
    image: spaMassage,
  },
  {
    id: 5,
    title: "Sunset Cruise",
    description: "Romantic dolphin watching at golden hour",
    icon: Ship,
    image: sunsetCruise,
  },
  {
    id: 6,
    title: "Kids Stay Free",
    description: "Family-friendly packages with complimentary child stays",
    icon: Baby,
    image: kidsStay,
  },
  {
    id: 7,
    title: "Dedicated Butler",
    description: "Personal service for an exceptional experience",
    icon: UserCheck,
    image: butlerService,
  },
  {
    id: 8,
    title: "Honeymoon Amenities",
    description: "Special touches for celebrating your love",
    icon: Heart,
    image: honeymoonAmenities,
  },
];

const AddedValuesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % addedValues.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + addedValues.length) % addedValues.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % addedValues.length);
  };

  const currentValue = addedValues[currentIndex];
  const IconComponent = currentValue.icon;

  return (
    <section className="py-12 bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f] overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Gift className="w-5 h-5 text-[#00A4E4]" />
            <span className="text-white/90 font-medium text-sm">Exclusive Added Values</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
            Complimentary Benefits
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#00A4E4]">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Best Price Secured</span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Main Slide */}
          <div className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden mx-auto max-w-4xl">
            <img
              src={currentValue.image}
              alt={currentValue.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#00A4E4] flex items-center justify-center">
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    {currentValue.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base">
                    {currentValue.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#1e3a5f]" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#1e3a5f]" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {addedValues.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#00A4E4] w-6" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Mini Thumbnails */}
          <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-2 px-4">
            {addedValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <button
                  key={value.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#00A4E4] text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs md:text-sm font-medium whitespace-nowrap">{value.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddedValuesSlider;
