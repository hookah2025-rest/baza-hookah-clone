import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useGalleryData } from "@/hooks/useGalleryData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const GalleryPage = () => {
  const { images, loading: galleryLoading } = useGalleryData();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  if (galleryLoading || settingsLoading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-content-bg">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOffset(-33.333);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setOffset(0);
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOffset(33.333);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setOffset(0);
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    const direction = index > currentIndex ? -33.333 : 33.333;
    setIsAnimating(true);
    setOffset(direction);
    setTimeout(() => {
      setCurrentIndex(index);
      setOffset(0);
      setIsAnimating(false);
    }, 500);
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

  const prevImageIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const nextImageIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  return (
    <PageLayout settings={settings}>
      <div className="relative w-full h-full overflow-hidden">
        {/* Slider track with all three images */}
        <div 
          className="flex h-full"
          style={{
            width: "300%",
            transform: `translateX(calc(-33.333% + ${offset}%))`,
            transition: isAnimating ? "transform 500ms ease-out" : "none"
          }}
        >
          {/* Previous image */}
          <div className="w-1/3 h-full flex-shrink-0">
            <img
              src={images[prevImageIndex]?.url}
              alt={images[prevImageIndex]?.alt}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Current image */}
          <div className="w-1/3 h-full flex-shrink-0">
            <img
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.alt}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Next image */}
          <div className="w-1/3 h-full flex-shrink-0">
            <img
              src={images[nextImageIndex]?.url}
              alt={images[nextImageIndex]?.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
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
