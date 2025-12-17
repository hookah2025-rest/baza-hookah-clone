import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useGalleryData } from "@/hooks/useGalleryData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const GalleryPage = () => {
  const { images, loading: galleryLoading } = useGalleryData();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (galleryLoading || settingsLoading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-content-bg">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (images.length === 0) {
    return (
      <PageLayout settings={settings}>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Галерея пуста</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout settings={settings}>
      <div className="relative w-full h-full">
        {/* Current Image - Full width */}
        <div className="w-full h-full">
          <img
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.alt}
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
          {images.map((_, index) => (
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
