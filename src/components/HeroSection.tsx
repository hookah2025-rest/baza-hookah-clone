import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SiteData } from "@/data/siteData";
import { SocialIcons } from "./SocialIcons";
import { AgeVerificationModal } from "./AgeVerificationModal";
import { RulesModal } from "./RulesModal";
import heroBg from "@/assets/hero-bg.jpg";
import bazaSubtitleLogo from "@/assets/baza-subtitle-logo.png";
interface HeroSectionProps {
  siteData: SiteData;
  logoDesktop?: string;
  logoTablet?: string;
  logoMobile?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}
const navItems = [{
  label: "О НАС",
  subtitle: "Концепция",
  path: "/about",
  requiresAge: false
}, {
  label: "МЕНЮ",
  subtitle: "Что имеется?",
  path: "/menu",
  requiresAge: true
}, {
  label: "ГАЛЕРЕЯ",
  subtitle: "Визуальное сопровождение",
  path: "/gallery",
  requiresAge: false
}, {
  label: "КАК ДОБРАТЬСЯ",
  subtitle: "Локация",
  path: "/location",
  requiresAge: false
}, {
  label: "ПРАВИЛА",
  subtitle: "Правила заведения",
  path: "#rules",
  requiresAge: false
}];
const mobileNavItems = [{
  label: "ГЛАВНАЯ",
  subtitle: "Добро пожаловать",
  path: "/",
  requiresAge: false
}, ...navItems];
export const HeroSection = ({
  siteData,
  logoDesktop,
  logoTablet,
  logoMobile,
  heroTitle,
  heroSubtitle
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  useEffect(() => {
    const verified = localStorage.getItem("age_verified") === "true";
    setAgeVerified(verified);
  }, []);
  const handleNavClick = (path: string, requiresAge: boolean) => {
    if (path === "/") {
      setIsMenuOpen(false);
      return;
    }
    if (path === "#rules") {
      setIsMenuOpen(false);
      setShowRulesModal(true);
      return;
    }
    if (requiresAge && !ageVerified) {
      setPendingPath(path);
      setShowAgeModal(true);
      return;
    }
    setIsMenuOpen(false);
    navigate(path);
  };
  const handleAgeConfirm = () => {
    localStorage.setItem("age_verified", "true");
    setAgeVerified(true);
    setShowAgeModal(false);
    if (pendingPath) {
      setIsMenuOpen(false);
      navigate(pendingPath);
    }
    setPendingPath(null);
  };
  const handleAgeDecline = () => {
    setShowAgeModal(false);
    setPendingPath(null);
  };
  return <>
      {/* Age verification modal */}
      {showAgeModal && <AgeVerificationModal onConfirm={handleAgeConfirm} onDecline={handleAgeDecline} />}

      {/* Rules modal */}
      <RulesModal open={showRulesModal} onOpenChange={setShowRulesModal} />

      <section
        id="hero"
        className="relative min-h-[100svh] h-[100svh] flex flex-col overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Menu button - visible on all screen sizes, top right */}
        <div className="absolute top-[calc(1.5rem+env(safe-area-inset-top))] right-6 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 flex flex-col gap-1.5 group hover:scale-110 transition-transform duration-300"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span
              className={`w-7 h-0.5 bg-foreground transition-all duration-300 origin-center ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-foreground transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-foreground transition-all duration-300 origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          {/* Logo or Title */}
          <div className="text-center hero-content-appear">
            {logoDesktop || logoTablet || logoMobile ? <>
                {/* Desktop logo */}
                {logoDesktop && <img src={logoDesktop} alt="BAZA" className="max-w-[90vw] w-auto max-h-[30vh] mx-auto hidden lg:block object-contain" />}
                {/* Tablet logo */}
                <img src={logoTablet || logoDesktop || logoMobile} alt="BAZA" className="max-w-[85vw] w-auto max-h-[25vh] mx-auto hidden md:block lg:hidden object-contain" />
                {/* Mobile logo */}
                <img src={logoMobile || logoTablet || logoDesktop} alt="BAZA" className="max-w-[80vw] w-auto max-h-[20vh] mx-auto block md:hidden object-contain" />
              </> : <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-[11vw] lg:text-[82px] text-foreground tracking-tighter font-heading leading-none">
                  {heroTitle || "HookahPlace"}
                </h1>
                {heroSubtitle ? (
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading uppercase text-foreground tracking-[0.15em] sm:tracking-[0.3em] mt-1">
                    {heroSubtitle}
                  </h2>
                ) : (
                  <img src={bazaSubtitleLogo} alt="BAZA" className="h-10 sm:h-14 md:h-20 lg:h-28 xl:h-32 mt-2 max-w-[80vw] object-contain" />
                )}
              </div>}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
          <SocialIcons socialLinks={siteData.socialLinks} />


          <p className="text-center text-[11px] text-foreground/90 uppercase tracking-[0.15em] mt-1">
            {siteData.city}
          </p>
          <p className="text-center text-[11px] text-foreground/90 uppercase tracking-[0.15em]">
            {siteData.address}
          </p>

          <a href={`tel:${siteData.phone.replace(/\s/g, "")}`} className="block text-center text-foreground text-[15px] tracking-wider hover:opacity-80 transition-opacity mt-1 font-bold">
            {siteData.phone}
          </a>

          <div className="flex justify-center gap-4 text-[11px] text-foreground/90 uppercase tracking-[0.1em] mt-1">
            <span>ПН — ЧТ {siteData.hoursWeekday.split(' ').pop()}</span>
            <span>ПТ — ВС {siteData.hoursWeekend.split(' ').pop()}</span>
          </div>
        </div>
      </section>

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && <div className="fixed inset-0 z-40 menu-slide-in flex flex-col bg-background/95 backdrop-blur-sm">
          <div className="h-20" /> {/* Spacer for burger button */}

          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {mobileNavItems.map((item, index) => {
          const isActive = activeIndex === index;
          return <button key={item.label} onClick={() => handleNavClick(item.path, item.requiresAge)} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} className="group menu-item-appear" style={{
            animationDelay: `${index * 0.08}s`
          }}>
                  <div className="flex items-center">
                    {/* Animated line directly attached to text */}
                    <span className={`h-[2px] bg-foreground transition-all duration-300 ease-out ${isActive ? "w-10 mr-3" : "w-0 mr-0"}`} />
                    {/* Label */}
                    <span className="text-xl tracking-[0.15em] font-heading uppercase text-foreground transition-all duration-300 group-hover:tracking-[0.25em]">
                      {item.label}
                    </span>
                  </div>
                </button>;
        })}
          </nav>

          <div className="pb-10 menu-item-appear" style={{
        animationDelay: '0.5s'
      }}>
            <SocialIcons socialLinks={siteData.socialLinks} />
          </div>
        </div>}
    </>;
};