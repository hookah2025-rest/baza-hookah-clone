import { SocialIcons } from "../SocialIcons";
import { SiteData } from "@/data/siteData";

interface PageFooterProps {
  siteData: SiteData;
}

export const PageFooter = ({ siteData }: PageFooterProps) => {
  return (
    <footer className="h-[200px] flex-shrink-0 bg-background border-t border-foreground/10">
      <div className="h-full container mx-auto px-6 flex flex-col items-center justify-center">
        <SocialIcons socialLinks={siteData.socialLinks} />

        <div className="text-center mt-4">
          <p className="text-sm tracking-wider font-body">
            КАЛЬЯН-БАР <span className="font-bold">BAZA</span>
          </p>
        </div>

        <div className="text-center mt-2 text-sm text-muted-foreground">
          <p>{siteData.city}</p>
          <p>{siteData.address}</p>
        </div>

        <a
          href={`tel:${siteData.phone.replace(/\s/g, "")}`}
          className="block text-center mt-2 text-accent text-lg font-medium hover:opacity-80 transition-opacity"
        >
          {siteData.phone}
        </a>

        <div className="text-center mt-2 text-sm text-muted-foreground">
          <p>{siteData.hoursWeekday}</p>
          <p>{siteData.hoursWeekend}</p>
        </div>
      </div>
    </footer>
  );
};
