import { SocialIcons } from "../SocialIcons";
import { SiteData } from "@/data/siteData";

interface PageFooterProps {
  siteData: SiteData;
}

export const PageFooter = ({ siteData }: PageFooterProps) => {
  return (
    <footer className="h-[200px] flex-shrink-0 bg-background">
      <div className="h-full container mx-auto px-6 flex flex-col items-center justify-center py-4">
        <SocialIcons socialLinks={siteData.socialLinks} />

        <p className="text-[13px] tracking-[0.2em] mt-3 font-heading">
          КАЛЬЯН-БАР <span className="font-bold">BAZA</span>
        </p>

        <p className="text-[11px] text-foreground/90 uppercase tracking-[0.15em] mt-1">
          {siteData.city}
        </p>
        <p className="text-[11px] text-foreground/90 uppercase tracking-[0.15em]">
          {siteData.address}
        </p>

        <a
          href={`tel:${siteData.phone.replace(/\s/g, "")}`}
          className="text-foreground text-[15px] tracking-wider hover:opacity-80 transition-opacity mt-1 font-bold"
        >
          {siteData.phone}
        </a>

        <div className="flex gap-4 text-[11px] text-foreground/90 uppercase tracking-[0.1em] mt-1">
          <span>ПН — ЧТ {siteData.hoursWeekday.split(' ').pop()}</span>
          <span>ПТ — ВС {siteData.hoursWeekend.split(' ').pop()}</span>
        </div>
      </div>
    </footer>
  );
};
