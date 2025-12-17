import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { AgeVerificationModal } from "../AgeVerificationModal";
import { SiteSettings } from "@/hooks/useSiteSettings";

interface PageLayoutProps {
  children: ReactNode;
  settings: SiteSettings;
  flexibleHeight?: boolean;
}

export const PageLayout = ({ children, settings, flexibleHeight = false }: PageLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified") === "true";
    setAgeVerified(verified);
  }, []);

  const handleMenuClick = (path: string) => {
    if (path === "/menu" && !ageVerified) {
      setPendingPath(path);
      setShowAgeModal(true);
      return;
    }
    navigate(path);
  };

  const handleAgeConfirm = () => {
    localStorage.setItem("age_verified", "true");
    setAgeVerified(true);
    setShowAgeModal(false);
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
  };

  const handleAgeDecline = () => {
    setShowAgeModal(false);
    setPendingPath(null);
  };

  const socialLinks = {
    instagram: settings.instagram,
    telegram: settings.telegram,
    whatsapp: settings.whatsapp,
  };

  return (
    <div className={`flex flex-col bg-background ${flexibleHeight ? 'min-h-screen' : 'h-screen overflow-hidden'}`}>
      <PageHeader 
        socialLinks={socialLinks} 
        onMenuClick={handleMenuClick}
        logoDesktop={settings.logo_header_desktop}
        logoTablet={settings.logo_header_tablet}
        logoMobile={settings.logo_header_mobile}
      />

      <main key={location.pathname} className={`flex-1 bg-content-bg page-enter ${flexibleHeight ? '' : 'overflow-auto'}`}>
        {children}
      </main>

      <PageFooter settings={settings} />

      {showAgeModal && (
        <AgeVerificationModal onConfirm={handleAgeConfirm} onDecline={handleAgeDecline} />
      )}
    </div>
  );
};
