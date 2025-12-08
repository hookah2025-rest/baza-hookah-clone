import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MenuSection } from "@/components/MenuSection";
import { GallerySection } from "@/components/GallerySection";
import { LocationSection } from "@/components/LocationSection";
import { RulesSection } from "@/components/RulesSection";
import { Footer } from "@/components/Footer";
import { getSiteData, SiteData } from "@/data/siteData";

const Index = () => {
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());

  useEffect(() => {
    // Listen for storage changes to update data in real-time
    const handleStorageChange = () => {
      setSiteData(getSiteData());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header siteData={siteData} />
      <main>
        <HeroSection siteData={siteData} />
        <AboutSection siteData={siteData} />
        <MenuSection siteData={siteData} />
        <GallerySection siteData={siteData} />
        <LocationSection siteData={siteData} />
        <RulesSection siteData={siteData} />
      </main>
      <Footer siteData={siteData} />
    </div>
  );
};

export default Index;
