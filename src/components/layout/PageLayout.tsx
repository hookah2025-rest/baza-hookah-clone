import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { AgeVerificationModal } from "../AgeVerificationModal";
import { SiteData } from "@/data/siteData";

interface PageLayoutProps {
  children: ReactNode;
  siteData: SiteData;
  title?: string;
}

export const PageLayout = ({ children, siteData, title }: PageLayoutProps) => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        socialLinks={siteData.socialLinks}
        onMenuClick={handleMenuClick}
      />

      <main className="flex-1">
        {title && (
          <h1 className="text-2xl md:text-3xl font-heading tracking-wider text-foreground text-center py-8 uppercase">
            {title}
          </h1>
        )}
        {children}
      </main>

      <PageFooter siteData={siteData} />

      {showAgeModal && (
        <AgeVerificationModal
          onConfirm={handleAgeConfirm}
          onDecline={handleAgeDecline}
        />
      )}
    </div>
  );
};
