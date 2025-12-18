import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[560px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/30 to-transparent" />
          
          {/* Text positioned on right side like dnata */}
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="container-custom">
              <div className="max-w-xl ml-auto text-right text-white pr-4 md:pr-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  {slide.subtitle}
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full"
                >
                  <a href={slide.buttonLink} target="_blank" rel="noopener noreferrer">
                    {slide.buttonText}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HeroCarousel;