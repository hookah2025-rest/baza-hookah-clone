import { SiteData } from "@/data/siteData";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";

interface AboutSectionProps {
  siteData: SiteData;
}

export const AboutSection = ({ siteData }: AboutSectionProps) => {
  return (
    <section id="about" className="min-h-screen flex flex-col bg-secondary">
      <Header siteData={siteData} />
      
      <div className="flex-1 flex items-center justify-center pt-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-wider mb-12 text-secondary-foreground">
            О НАС
          </h2>
          <p className="text-lg text-secondary-foreground/80 leading-relaxed whitespace-pre-line">
            {siteData.aboutText}
          </p>
        </div>
      </div>
      
      <ContactInfo siteData={siteData} />
    </section>
  );
};