import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData } from "@/data/siteData";

const AboutPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSiteData(getSiteData());
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (!siteData) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === siteData.gallery.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [siteData]);

  if (!siteData) return null;

  return (
    <PageLayout siteData={siteData}>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left content - gray background */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-content-bg">
          <div className="border border-background p-8 lg:p-12 max-w-lg">
            <p className="text-background text-center leading-relaxed font-body text-sm lg:text-base">
              Данная страница находится в разработке
              <br />
              в виду чрезмерной скромности
              <br />
              одной части команды
              <br />
              и колоссального самомнения другой.
              <br />
              Пока спорим.
            </p>
          </div>
        </div>

        {/* Right slideshow */}
        <div className="flex-1 relative overflow-hidden">
          {siteData.gallery.map((image, index) => (
            <div
              key={index}
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