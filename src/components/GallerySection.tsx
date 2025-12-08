import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteData } from "@/data/siteData";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";

interface GallerySectionProps {
  siteData: SiteData;
}

export const GallerySection = ({ siteData }: GallerySectionProps) => {
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
    <section id="gallery" className="min-h-screen flex flex-col">
      {/* Header */}
      <Header siteData={siteData} />

      {/* Gallery Slider */}
      <div className="flex-1 relative pt-16 bg-background">
        <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
          {/* Current Image */}
          <img
            src={siteData.gallery[currentIndex]?.url}
            alt={siteData.gallery[currentIndex]?.alt}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 bottom-8 text-foreground hover:opacity-80 transition-opacity"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {siteData.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-foreground" : "bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <ContactInfo siteData={siteData} />
    </section>
  );
};