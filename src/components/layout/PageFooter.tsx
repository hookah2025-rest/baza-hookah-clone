import { SocialIcons } from "../SocialIcons";
import { SiteSettings } from "@/hooks/useSiteSettings";
interface PageFooterProps {
  settings: SiteSettings;
}
export const PageFooter = ({
  settings
}: PageFooterProps) => {
  const socialLinks = {
    instagram: settings.instagram,
    telegram: settings.telegram,
    whatsapp: settings.whatsapp
  };
  return <footer className="h-[200px] flex-shrink-0 bg-background">
      <div className="h-full container mx-auto px-6 flex flex-col items-center justify-center py-4">
        <SocialIcons socialLinks={socialLinks} />


        {settings.addressLink ? (
          <a 
            href={settings.addressLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[11px] text-foreground/90 uppercase tracking-[0.15em] mt-1 hover:text-foreground transition-colors"
          >
            {settings.city}, {settings.address}
          </a>
        ) : (
          <>
            <p className="text-[11px] text-foreground/90 uppercase tracking-[0.15em] mt-1">
              {settings.city}
            </p>
            <p className="text-[11px] text-foreground/90 uppercase tracking-[0.15em]">
              {settings.address}
            </p>
          </>
        )}

        <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-foreground text-[15px] tracking-wider hover:opacity-80 transition-opacity mt-1 font-bold">
          {settings.phone}
        </a>

        <div className="flex gap-4 text-[11px] text-foreground/90 uppercase tracking-[0.1em] mt-1">
          <span>ПН — ЧТ {settings.hoursWeekday.split(' ').pop()}</span>
          <span>ПТ — ВС {settings.hoursWeekend.split(' ').pop()}</span>
        </div>
      </div>
    </footer>;
};