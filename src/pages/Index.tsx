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
  return <div className="min-h-screen bg-background">
      <HeroSection siteData={siteData} />
      
      {/* Simple footer */}
      
    </div>;
};
export default Index;