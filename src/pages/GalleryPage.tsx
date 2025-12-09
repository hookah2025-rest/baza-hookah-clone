import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData } from "@/data/siteData";

const GalleryPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSiteData(getSiteData());
  }, []);

  if (!siteData) return null;

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
    <PageLayout siteData={siteData}>
      <div className="relative w-full h-full">
        {/* Current Image - Full width */}
        <div className="w-full h-full">
          <img
            src={siteData.gallery[currentIndex]?.url}
            alt={siteData.gallery[currentIndex]?.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
    </PageLayout>
  );
};

export default GalleryPage;
