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
    <PageLayout siteData={siteData} title="ГАЛЕРЕЯ">
      <div className="relative w-full">
        {/* Current Image - Full width */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9]">
          <img
            src={siteData.gallery[currentIndex]?.url}
            alt={siteData.gallery[currentIndex]?.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 py-6">
          <button
            onClick={prevSlide}
            className="text-foreground hover:text-accent transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {siteData.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors border border-foreground/50 ${
                  index === currentIndex ? "bg-foreground" : "bg-transparent"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-foreground hover:text-accent transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
