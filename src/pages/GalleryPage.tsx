import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useGalleryData } from "@/hooks/useGalleryData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const GalleryPage = () => {
  const { images, loading: galleryLoading } = useGalleryData();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (galleryLoading || settingsLoading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-content-bg">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  const changeSlide = (newIndex: number, direction: "left" | "right") => {
    if (isAnimating || newIndex === currentIndex) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setPrevIndex(currentIndex);
    setSlideDirection(direction);
    setCurrentIndex(newIndex);
    setIsAnimating(true);
    
    timeoutRef.current = setTimeout(() => {
      setPrevIndex(null);
      setIsAnimating(false);
    }, 500);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex, "left");
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    changeSlide(newIndex, "right");
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    const direction = index > currentIndex ? "left" : "right";
    changeSlide(index, direction);
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
      <div className="relative w-full h-full overflow-hidden">
        {/* Previous image (sliding out) */}
        {prevIndex !== null && (
          <img
            src={images[prevIndex]?.url}
            alt={images[prevIndex]?.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${
              slideDirection === "left" ? "-translate-x-full" : "translate-x-full"
            }`}
          />
        )}
        
        {/* Current image (sliding in) */}
        <img
          src={images[currentIndex]?.url}
          alt={images[currentIndex]?.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${
            isAnimating ? "translate-x-0" : ""
          }`}
          style={{
            transform: isAnimating 
              ? "translateX(0)" 
              : prevIndex !== null 
                ? slideDirection === "left" ? "translateX(100%)" : "translateX(-100%)"
                : "translateX(0)"
          }}
        />

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
