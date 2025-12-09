import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData } from "@/data/siteData";

const LocationPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    setSiteData(getSiteData());
  }, []);

  if (!siteData) return null;

  return (
    <PageLayout siteData={siteData}>
      <div className="h-full w-full">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aec19c4ac8461360bfa98ec1ea5a217f73dff2ea4cd378c4b1dc5049efc060b90&amp;source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          style={{ display: 'block' }}
        />
      </div>
    </PageLayout>
  );
};

export default LocationPage;
