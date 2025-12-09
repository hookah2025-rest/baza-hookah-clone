import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
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

  return (
    <PageLayout siteData={siteData}>
      <div className="relative w-full h-full">
        {/* Full width image */}
        <img
          src={siteData.gallery[currentIndex]?.url}
          alt={siteData.gallery[currentIndex]?.alt}
          className="w-full h-full object-cover"
        />

        {/* Navigation - inside image, bottom right */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          {/* Dots */}
          {siteData.gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex 
                  ? "bg-foreground" 
                  : "bg-transparent border border-foreground/70"
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}

          {/* Next arrow */}
          <button
            onClick={nextSlide}
            className="text-foreground hover:text-accent transition-colors ml-1"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
