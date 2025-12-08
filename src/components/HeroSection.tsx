import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SiteData } from "@/data/siteData";
import { SocialIcons } from "./SocialIcons";
import heroBg from "@/assets/hero-bg.jpg";
import bazaLogo from "@/assets/baza-logo.png";
interface HeroSectionProps {
  siteData: SiteData;
}
const navItems = [{
  label: "О НАС",
  href: "#about"
}, {
  label: "МЕНЮ",
  href: "#menu"
}, {
  label: "ГАЛЕРЕЯ",
  href: "#gallery"
}, {
  label: "КАК ДОБРАТЬСЯ",
  href: "#location"
}, {
  label: "ПРАВИЛА ЗАВЕДЕНИЯ",
  href: "#rules"
}];
const mobileNavItems = [{
  label: "ГЛАВНАЯ",
  href: "#hero"
}, ...navItems];
export const HeroSection = ({
  siteData
}: HeroSectionProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <>
      <section id="hero" className="relative min-h-screen flex flex-col" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Mobile menu button */}
        <div className="lg:hidden absolute top-6 right-6 z-20">
          <button onClick={() => setIsMenuOpen(true)} className="p-2">
            <Menu className="w-8 h-8 text-foreground" />
          </button>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={bazaLogo} alt="BAZA" className="w-40 md:w-56 mx-auto" />
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 mt-8">
            {navItems.map(item => <a key={item.href} href={item.href} className="nav-link text-sm">
                {item.label}
              </a>)}
          </nav>
        </div>

        {/* Bottom section with social and contact */}
        <div className="relative z-10 pb-10">
          <SocialIcons socialLinks={siteData.socialLinks} />
          
          <div className="text-center mt-6">
            <p className="text-sm tracking-wider">КАЛЬЯН-БАР <span className="font-bold">BAZA</span></p>
          </div>
          
          <div className="text-center mt-3 text-sm text-muted-foreground">
            <p>{siteData.city}</p>
            <p>{siteData.address}</p>
          </div>
          
          <a href={`tel:${siteData.phone.replace(/\s/g, '')}`} className="block text-center mt-3 text-accent text-lg font-medium">
            {siteData.phone}
          </a>
          
          <div className="text-center mt-3 text-sm text-muted-foreground">
            <p>{siteData.hoursWeekday}</p>
            <p>{siteData.hoursWeekend}</p>
          </div>
        </div>
      </section>

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {mobileNavItems.map(item => <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-lg tracking-wider font-medium hover:opacity-80 transition-opacity">
                {item.label}
              </a>)}
          </nav>
        </div>}
    </>;
};