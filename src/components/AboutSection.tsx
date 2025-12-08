import { SiteData } from "@/data/siteData";

interface AboutSectionProps {
  siteData: SiteData;
}

export const AboutSection = ({ siteData }: AboutSectionProps) => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center mb-12">
          О НАС
        </h2>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
            {siteData.aboutText}
          </p>
        </div>
      </div>
    </section>
  );
};
