import { useState, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const PhotoGallery = ({ images, columns = 3, className }: PhotoGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, images.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  }, [goToPrevious, goToNext, closeLightbox]);

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn(`grid ${gridCols[columns]} gap-4`, className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            {/* Caption */}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none"
          onKeyDown={handleKeyDown}
        >
          {selectedIndex !== null && images[selectedIndex] && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Previous Button */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
              )}

              {/* Main Image */}
              <div className="flex flex-col items-center justify-center max-w-[90%] max-h-[85%]">
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-fade-in"
                />
                {/* Caption & Counter */}
                <div className="mt-4 text-center">
                  {images[selectedIndex].caption && (
                    <p className="text-white text-lg font-medium mb-2">
                      {images[selectedIndex].caption}
                    </p>
                  )}
                  <p className="text-white/60 text-sm">
                    {selectedIndex + 1} / {images.length}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              )}

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80%] overflow-x-auto py-2 px-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-12 rounded-md overflow-hidden transition-all duration-200",
                        index === selectedIndex 
                          ? "ring-2 ring-white scale-110" 
                          : "opacity-50 hover:opacity-100"
                      )}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;
