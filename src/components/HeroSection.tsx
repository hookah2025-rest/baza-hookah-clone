import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SiteData } from "@/data/siteData";
import { SocialIcons } from "./SocialIcons";
import { AgeVerificationModal } from "./AgeVerificationModal";
import heroBg from "@/assets/hero-bg.jpg";
import bazaLogo from "@/assets/baza-logo.png";

interface HeroSectionProps {
  siteData: SiteData;
}

const navItems = [
  { label: "О НАС", subtitle: "Концепция", href: "#about", requiresAge: false },
  { label: "МЕНЮ", subtitle: "Что имеется?", href: "#menu", requiresAge: true },
  { label: "ГАЛЕРЕЯ", subtitle: "Визуальное сопровождение", href: "#gallery", requiresAge: false },
  { label: "КАК ДОБРАТЬСЯ", subtitle: "Локация", href: "#location", requiresAge: false },
  { label: "ПРАВИЛА", subtitle: "Правила заведения", href: "#rules", requiresAge: false },
];

const mobileNavItems = [
  { label: "ГЛАВНАЯ", subtitle: "Добро пожаловать", href: "#hero", requiresAge: false },
  ...navItems,
];

export const HeroSection = ({
  siteData
}: HeroSectionProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified") === "true";
    setAgeVerified(verified);
  }, []);

  const handleNavClick = (href: string, requiresAge: boolean) => {
    if (requiresAge && !ageVerified) {
      setPendingHref(href);
      setShowAgeModal(true);
      return;
    }
    setIsMenuOpen(false);
    window.location.href = href;
  };

  const handleAgeConfirm = () => {
    setAgeVerified(true);
    setShowAgeModal(false);
    if (pendingHref) {
      setIsMenuOpen(false);
      window.location.href = pendingHref;
      setPendingHref(null);
    }
  };

  const handleAgeDecline = () => {
    setShowAgeModal(false);
    setPendingHref(null);
  };
  return <>
      {showAgeModal && (
        <AgeVerificationModal
          onConfirm={handleAgeConfirm}
          onDecline={handleAgeDecline}
        />
      )}
      <section id="hero" className="relative min-h-screen flex flex-col" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Menu button - visible on all screen sizes, top right */}
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="p-2 flex flex-col gap-1.5 group"
            aria-label="Открыть меню"
          >
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
          </button>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={bazaLogo} alt="BAZA" className="w-40 md:w-56 mx-auto" />
          </div>
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
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X className="w-8 h-8 text-foreground" />
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col items-center justify-center gap-5">
            {mobileNavItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button 
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.requiresAge)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className={`w-6 h-[2px] bg-accent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                    <span className={`text-xl tracking-[0.15em] font-bold uppercase transition-colors duration-300 ${isActive ? 'text-accent' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                    <span className={`w-6 h-[2px] bg-accent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <p className="text-accent text-xs tracking-wider mt-1">{item.subtitle}</p>
                </button>
              );
            })}
          </nav>
          
          <div className="pb-10">
            <SocialIcons socialLinks={siteData.socialLinks} />
          </div>
        </div>
      )}
    </>;
};