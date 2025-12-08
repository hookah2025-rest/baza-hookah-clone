import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteData } from "@/data/siteData";

interface GalleryModalProps {
  siteData: SiteData;
  onClose: () => void;
}

export const GalleryModal = ({ siteData, onClose }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === siteData.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? siteData.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#4a2c2c]">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
      >
        <X size={32} strokeWidth={1.5} />
      </button>

      {/* Gallery Slider - Fullscreen */}
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          {/* Current Image */}
          <img
            src={siteData.gallery[currentIndex]?.url}
            alt={siteData.gallery[currentIndex]?.alt}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 bottom-6 text-white/80 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 bottom-6 text-white/80 hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {siteData.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors border border-white/50 ${
                  index === currentIndex ? "bg-white" : "bg-transparent"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};