import { SiteData } from "@/data/siteData";
import { SocialIcons } from "./SocialIcons";

interface ContactInfoProps {
  siteData: SiteData;
}

export const ContactInfo = ({ siteData }: ContactInfoProps) => {
  return (
    <div className="text-center py-10 bg-background">
      <SocialIcons socialLinks={siteData.socialLinks} />
      
      <div className="mt-6">
        <p className="text-sm tracking-wider">КАЛЬЯН-БАР <span className="font-bold">BAZA</span></p>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>{siteData.city}</p>
        <p>{siteData.address}</p>
      </div>
      
      <a
        href={`tel:${siteData.phone.replace(/\s/g, '')}`}
        className="block mt-4 text-accent text-lg font-medium hover:opacity-80 transition-opacity"
      >
        {siteData.phone}
      </a>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>{siteData.hoursWeekday}</p>
        <p>{siteData.hoursWeekend}</p>
      </div>
    </div>
  );
};