import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ContactInfo } from "@/components/ContactInfo";
import { getSiteData, SiteData } from "@/data/siteData";
import { Link } from "react-router-dom";

const Index = () => {
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());

  useEffect(() => {
    const handleStorageChange = () => {
      setSiteData(getSiteData());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection siteData={siteData} />
      
      {/* Simple footer */}
      <footer className="bg-background py-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BAZA. Все права защищены.
        </p>
        <Link to="/admin" className="text-sm text-muted-foreground hover:text-accent">
          Админ-панель
        </Link>
      </footer>
    </div>
  );
};

export default Index;