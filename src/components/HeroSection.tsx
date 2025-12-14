import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { SiteData } from "@/data/siteData";
import { SocialIcons } from "./SocialIcons";
import { AgeVerificationModal } from "./AgeVerificationModal";
import heroBg from "@/assets/hero-bg.jpg";
import bazaLogo from "@/assets/baza-logo.png";

interface HeroSectionProps {
  siteData: SiteData;
  logoDesktop?: string;
  logoTablet?: string;
  logoMobile?: string;
}

const navItems = [
  { label: "О НАС", subtitle: "Концепция", path: "/about", requiresAge: false },
  { label: "МЕНЮ", subtitle: "Что имеется?", path: "/menu", requiresAge: true },
  { label: "ГАЛЕРЕЯ", subtitle: "Визуальное сопровождение", path: "/gallery", requiresAge: false },
  { label: "КАК ДОБРАТЬСЯ", subtitle: "Локация", path: "/location", requiresAge: false },
  { label: "ПРАВИЛА", subtitle: "Правила заведения", path: "/rules", requiresAge: false },
];

const mobileNavItems = [
  { label: "ГЛАВНАЯ", subtitle: "Добро пожаловать", path: "/", requiresAge: false },
  ...navItems,
];

export const HeroSection = ({ siteData, logoDesktop, logoTablet, logoMobile }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);
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

  return (
    <>
      {/* Age verification modal */}
      {showAgeModal && (
        <AgeVerificationModal
          onConfirm={handleAgeConfirm}
          onDecline={handleAgeDecline}
        />
      )}

      <section
        id="hero"
        className="relative min-h-screen flex flex-col"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
          {/* Logo */}
          <div className="text-center mb-8">
            {/* Desktop logo */}
            <img src={logoDesktop || bazaLogo} alt="BAZA" className="w-40 md:w-56 mx-auto hidden lg:block" />
            {/* Tablet logo */}
            <img src={logoTablet || logoDesktop || bazaLogo} alt="BAZA" className="w-48 mx-auto hidden md:block lg:hidden" />
            {/* Mobile logo */}
            <img src={logoMobile || bazaLogo} alt="BAZA" className="w-40 mx-auto block md:hidden" />
          </div>
        </div>

        {/* Bottom section with social and contact */}
        <div className="relative z-10 pb-10">
          <SocialIcons socialLinks={siteData.socialLinks} />

          <p className="text-center text-[13px] tracking-[0.2em] mt-3 font-heading">
            КАЛЬЯН-БАР <span className="font-bold">{siteData.name}</span>
          </p>

          <p className="text-center text-[11px] text-foreground/90 uppercase tracking-[0.15em] mt-1">
            {siteData.city}
          </p>
          <p className="text-center text-[11px] text-foreground/90 uppercase tracking-[0.15em]">
            {siteData.address}
          </p>

          <a
            href={`tel:${siteData.phone.replace(/\s/g, "")}`}
            className="block text-center text-foreground text-[15px] tracking-wider hover:opacity-80 transition-opacity mt-1 font-bold"
          >
            {siteData.phone}
          </a>

          <div className="flex justify-center gap-4 text-[11px] text-foreground/90 uppercase tracking-[0.1em] mt-1">
            <span>ПН — ЧТ {siteData.hoursWeekday.split(' ').pop()}</span>
            <span>ПТ — ВС {siteData.hoursWeekend.split(' ').pop()}</span>
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

          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {mobileNavItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path, item.requiresAge)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className="group"
                >
                  <div className="flex items-center">
                    {/* Animated line directly attached to text */}
                    <span
                      className={`h-[2px] bg-foreground transition-all duration-300 ease-out ${
                        isActive ? "w-10 mr-3" : "w-0 mr-0"
                      }`}
                    />
                    {/* Label */}
                    <span className="text-xl tracking-[0.15em] font-heading uppercase text-foreground">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="pb-10">
            <SocialIcons socialLinks={siteData.socialLinks} />
          </div>
        </div>
      )}
    </>
  );
};
