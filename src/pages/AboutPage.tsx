import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData } from "@/data/siteData";
import aboutBg from "@/assets/hero-bg.jpg";

const AboutPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    setSiteData(getSiteData());
  }, []);

  if (!siteData) return null;

  return (
    <PageLayout siteData={siteData}>
      <div className="flex flex-col lg:flex-row min-h-[50vh]">
        {/* Left content */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-background">
          <div className="border border-foreground/30 p-8 lg:p-12 max-w-lg">
            <p className="text-foreground text-center leading-relaxed font-body">
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

        {/* Right image - hidden on mobile */}
        <div
          className="hidden lg:block flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutBg})` }}
        />
      </div>
    </PageLayout>
  );
};

export default AboutPage;
