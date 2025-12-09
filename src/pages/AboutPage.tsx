import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useGalleryData } from "@/hooks/useGalleryData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const AboutPage = () => {
  const { images, loading: galleryLoading } = useGalleryData();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  if (galleryLoading || settingsLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-content-bg">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <PageLayout settings={settings}>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left content - gray background */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-content-bg">
          <div className="border border-background p-8 lg:p-12 max-w-lg">
            <p className="text-background text-center leading-relaxed font-body text-sm lg:text-base whitespace-pre-line">
              {settings.aboutText || "Данная страница находится в разработке\nв виду чрезмерной скромности\nодной части команды\nи колоссального самомнения другой.\nПока спорим."}
            </p>
          </div>
        </div>

        {/* Right slideshow */}
        <div className="flex-1 relative overflow-hidden">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
