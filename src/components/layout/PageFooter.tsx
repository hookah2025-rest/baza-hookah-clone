import { SocialIcons } from "../SocialIcons";
import { SiteData } from "@/data/siteData";

interface PageFooterProps {
  siteData: SiteData;
}

export const PageFooter = ({ siteData }: PageFooterProps) => {
  return (
    <footer className="bg-background py-10">
      <div className="container mx-auto px-6">
        <SocialIcons socialLinks={siteData.socialLinks} />

        <div className="text-center mt-6">
          <p className="text-sm tracking-wider font-body">
            КАЛЬЯН-БАР <span className="font-bold">BAZA</span>
          </p>
        </div>

        <div className="text-center mt-4 text-sm text-muted-foreground">
          <p>{siteData.city}</p>
          <p>{siteData.address}</p>
        </div>

        <a
          href={`tel:${siteData.phone.replace(/\s/g, "")}`}
          className="block text-center mt-4 text-accent text-lg font-medium hover:opacity-80 transition-opacity"
        >
          {siteData.phone}
        </a>

        <div className="text-center mt-4 text-sm text-muted-foreground">
          <p>{siteData.hoursWeekday}</p>
          <p>{siteData.hoursWeekend}</p>
        </div>
      </div>
    </footer>
  );
};
