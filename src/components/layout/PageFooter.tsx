import { SocialIcons } from "../SocialIcons";
import { SiteData } from "@/data/siteData";

interface PageFooterProps {
  siteData: SiteData;
}

export const PageFooter = ({ siteData }: PageFooterProps) => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <SocialIcons socialLinks={siteData.socialLinks} />

        <p className="text-sm tracking-wider mt-5">
          КАЛЬЯН-БАР <span className="font-bold">BAZA</span>
        </p>

        <div className="text-center mt-3 text-sm text-muted-foreground leading-relaxed">
          <p>{siteData.city}</p>
          <p>{siteData.address}</p>
        </div>

        <a
          href={`tel:${siteData.phone.replace(/\s/g, "")}`}
          className="block text-center mt-3 text-accent font-medium hover:opacity-80 transition-opacity"
        >
          {siteData.phone}
        </a>

        <div className="text-center mt-3 text-sm text-muted-foreground">
          <p>{siteData.hoursWeekday}</p>
          <p>{siteData.hoursWeekend}</p>
        </div>
      </div>
    </footer>
  );
};
