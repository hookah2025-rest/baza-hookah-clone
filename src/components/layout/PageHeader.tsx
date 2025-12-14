import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { SocialIcons } from "../SocialIcons";
import bazaLogo from "@/assets/baza-logo.png";
import { SocialLinks } from "@/data/siteData";
import { RulesModal } from "../RulesModal";

interface PageHeaderProps {
  socialLinks: SocialLinks;
  onMenuClick?: (path: string) => void;
  logoDesktop?: string;
  logoTablet?: string;
  logoMobile?: string;
}

const navItems = [
  { label: "О НАС", subtitle: "Концепция", path: "/about" },
  { label: "МЕНЮ", subtitle: "Что имеется?", path: "/menu" },
  { label: "ГАЛЕРЕЯ", subtitle: "Визуальное сопровождение", path: "/gallery" },
  { label: "КАК ДОБРАТЬСЯ", subtitle: "Локация", path: "/location" },
];

export const PageHeader = ({ socialLinks, onMenuClick, logoDesktop, logoTablet, logoMobile }: PageHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    if (onMenuClick) {
      onMenuClick(path);
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  // Use custom logos if provided, otherwise fall back to default
  const desktopLogoSrc = logoDesktop || bazaLogo;
  const tabletLogoSrc = logoTablet || logoDesktop || bazaLogo;
  const mobileLogoSrc = logoMobile || bazaLogo;

  return (
    <>
      <header className="h-[100px] flex-shrink-0 bg-background border-b border-foreground/10 relative">
        {/* All versions: Logo left, burger right */}
        <div className="h-full container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {/* Desktop logo */}
            <img src={desktopLogoSrc} alt="BAZA" className="h-14 md:h-16 hidden lg:block" />
            {/* Tablet logo */}
            <img src={tabletLogoSrc} alt="BAZA" className="h-14 hidden md:block lg:hidden" />
            {/* Mobile logo */}
            <img src={mobileLogoSrc} alt="BAZA" className="h-12 block md:hidden" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 flex flex-col gap-1.5 group"
            aria-label="Открыть меню"
          >
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-foreground/70 transition-colors" />
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-foreground/70 transition-colors" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background menu-slide-in flex flex-col">
          <div className="h-20 flex-shrink-0 flex justify-end items-center px-6">
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X className="w-8 h-8 text-foreground" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="group"
            >
              <div className="flex items-center">
                {/* Animated line directly attached to text */}
                <span className={`h-[2px] bg-foreground transition-all duration-300 ease-out ${
                  location.pathname === "/" ? "w-10 mr-3" : "w-0 mr-0 group-hover:w-10 group-hover:mr-3"
                }`} />
                {/* Label */}
                <span className="text-2xl tracking-[0.15em] font-heading uppercase text-foreground">
                  ГЛАВНАЯ
                </span>
              </div>
            </button>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="group"
                >
                  <div className="flex items-center">
                    {/* Animated line directly attached to text */}
                    <span
                      className={`h-[2px] bg-foreground transition-all duration-300 ease-out ${
                        isActive ? "w-10 mr-3" : "w-0 mr-0 group-hover:w-10 group-hover:mr-3"
                      }`}
                    />
                    {/* Label */}
                    <span className="text-2xl tracking-[0.15em] font-heading uppercase text-foreground"
                    >
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
            {/* Rules as modal trigger */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsRulesOpen(true);
              }}
              className="group"
            >
              <div className="flex items-center">
                <span className="h-[2px] bg-foreground transition-all duration-300 ease-out w-0 mr-0 group-hover:w-10 group-hover:mr-3" />
                <span className="text-2xl tracking-[0.15em] font-heading uppercase text-foreground">
                  ПРАВИЛА
                </span>
              </div>
            </button>
          </nav>

          <div className="pb-10">
            <SocialIcons socialLinks={socialLinks} />
          </div>
        </div>
      )}

      <RulesModal open={isRulesOpen} onOpenChange={setIsRulesOpen} />
    </>
  );
};
