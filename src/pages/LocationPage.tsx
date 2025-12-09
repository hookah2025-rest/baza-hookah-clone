import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData } from "@/data/siteData";
import { SocialIcons } from "@/components/SocialIcons";

const LocationPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    setSiteData(getSiteData());
  }, []);

  if (!siteData) return null;

  return (
    <PageLayout siteData={siteData} title="КОНТАКТЫ">
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 min-h-[50vh]">
        <div className="text-center">
          <p className="text-lg tracking-wider font-body">
            КАЛЬЯН-БАР <span className="font-bold">BAZA</span>
          </p>

          <div className="mt-6 text-muted-foreground">
            <p>{siteData.city}</p>
            <p>{siteData.address}</p>
          </div>

          <a
            href={`tel:${siteData.phone.replace(/\s/g, "")}`}
            className="block mt-6 text-accent text-2xl font-bold"
          >
            {siteData.phone}
          </a>

          <div className="mt-6 text-muted-foreground">
            <p>{siteData.hoursWeekday}</p>
            <p>{siteData.hoursWeekend}</p>
          </div>

          <div className="mt-10">
            <SocialIcons socialLinks={siteData.socialLinks} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LocationPage;
