import { SiteData } from "@/data/siteData";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";

interface LocationSectionProps {
  siteData: SiteData;
}

export const LocationSection = ({ siteData }: LocationSectionProps) => {
  return (
    <section id="location" className="min-h-screen flex flex-col">
      <Header siteData={siteData} />
      
      <div className="flex-1 pt-16">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A55.678936%2C37.505283&amp;source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Карта"
          className="w-full h-[60vh]"
        />
      </div>
      
      <ContactInfo siteData={siteData} />
    </section>
  );
};