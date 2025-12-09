import { SocialIcons } from "../SocialIcons";
import { SiteData } from "@/data/siteData";

interface PageFooterProps {
  siteData: SiteData;
}

export const PageFooter = ({ siteData }: PageFooterProps) => {
  return (
    <footer className="h-[200px] flex-shrink-0 bg-background">
      <div className="h-full container mx-auto px-6 flex flex-col items-center justify-center gap-1">
        <SocialIcons socialLinks={siteData.socialLinks} />

        <p className="text-sm tracking-wider mt-2">
          КАЛЬЯН-БАР <span className="font-bold">BAZA</span>
        </p>

        <p className="text-xs text-foreground/80 uppercase tracking-wide">
          {siteData.city}
        </p>
        <p className="text-xs text-foreground/80 uppercase tracking-wide">
          {siteData.address}
        </p>

        <a
          href={`tel:${siteData.phone.replace(/\s/g, "")}`}
          className="text-accent text-base font-medium hover:opacity-80 transition-opacity mt-1"
        >
          {siteData.phone}
        </a>

        <div className="flex gap-6 text-xs text-foreground/80 uppercase tracking-wide">
          <p>{siteData.hoursWeekday}</p>
          <p>{siteData.hoursWeekend}</p>
        </div>
      </div>
    </footer>
  );
};
