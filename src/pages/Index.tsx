import { HeroSection } from "@/components/HeroSection";
import { getSiteData, SiteData } from "@/data/siteData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Index = () => {
  const { settings } = useSiteSettings();
  const siteData: SiteData = {
    ...getSiteData(),
    name: settings.name,
    city: settings.city,
    address: settings.address,
    phone: settings.phone,
    hoursWeekday: settings.hoursWeekday,
    hoursWeekend: settings.hoursWeekend,
    socialLinks: {
      instagram: settings.instagram,
      telegram: settings.telegram,
      whatsapp: settings.whatsapp,
    },
  };

  return (
    <div className="min-h-[100svh] h-[100svh] bg-background overflow-hidden">
      <HeroSection 
        siteData={siteData}
        logoDesktop={settings.logo_home_desktop}
        logoTablet={settings.logo_home_tablet}
        logoMobile={settings.logo_home_mobile}
        heroTitle={settings.heroTitle}
        heroSubtitle={settings.heroSubtitle}
      />
    </div>
  );
};
export default Index;