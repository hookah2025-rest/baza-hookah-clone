import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { SocialIcons } from "../SocialIcons";
import { SocialLinks } from "@/data/siteData";
import bazaHeaderLogo from "@/assets/baza-header-logo.png";

interface PageHeaderProps {
  socialLinks: SocialLinks;
  onMenuClick?: (path: string) => void;
  logoDesktop?: string;
  logoTablet?: string;
  logoMobile?: string;
  siteName?: string;
  heroTitle?: string;
}

const navItems = [
  { label: "О НАС", subtitle: "Концепция", path: "/about" },
  { label: "МЕНЮ", subtitle: "Что имеется?", path: "/menu" },
  { label: "ГАЛЕРЕЯ", subtitle: "Визуальное сопровождение", path: "/gallery" },
  { label: "КАК ДОБРАТЬСЯ", subtitle: "Локация", path: "/location" },
  { label: "ПРАВИЛА", subtitle: "Правила заведения", path: "/rules" },
];

export const PageHeader = ({ socialLinks, onMenuClick, logoDesktop, logoTablet, logoMobile, siteName, heroTitle }: PageHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Check if any logo is available
  const hasAnyLogo = logoDesktop || logoTablet || logoMobile;

  return (
    <>
      <header className="h-[100px] flex-shrink-0 bg-background border-b border-foreground/10 relative">
        <div className="h-full container mx-auto px-6 flex items-center justify-center md:justify-between relative">
          {/* Logo - centered on mobile, left on tablet+ */}
          <Link to="/" className="flex items-center gap-2">
            {hasAnyLogo ? (
              <>
                {/* Desktop logo */}
                {logoDesktop && <img src={logoDesktop} alt={siteName || "BAZA"} className="h-14 md:h-16 hidden lg:block object-contain" />}
                {/* Tablet logo */}
                <img src={logoTablet || logoDesktop || logoMobile} alt={siteName || "BAZA"} className="h-14 hidden md:block lg:hidden object-contain" />
                {/* Mobile logo */}
                <img src={logoMobile || logoTablet || logoDesktop} alt={siteName || "BAZA"} className="h-12 block md:hidden object-contain" />
              </>
            ) : (
              <img src={bazaHeaderLogo} alt={siteName || "BAZA"} className="h-10 sm:h-12 md:h-14 object-contain" />
            )}
          </Link>
          {/* Burger - absolute on mobile to keep logo centered */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute right-6 md:relative md:right-auto p-2 flex flex-col gap-1.5 group hover:scale-110 transition-transform duration-300 z-50"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className={`w-7 h-0.5 bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-7 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`w-7 h-0.5 bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 menu-slide-in flex flex-col bg-background/95 backdrop-blur-sm">
          <div className="h-20 flex-shrink-0" />

          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="group menu-item-appear"
              style={{ animationDelay: '0s' }}
            >
              <div className="flex items-center">
                <span className={`h-[2px] bg-foreground transition-all duration-300 ease-out ${
                  location.pathname === "/" ? "w-10 mr-3" : "w-0 mr-0 group-hover:w-10 group-hover:mr-3"
                }`} />
                <span className="text-2xl tracking-[0.15em] font-heading uppercase text-foreground transition-all duration-300 group-hover:tracking-[0.25em]">
                  ГЛАВНАЯ
                </span>
              </div>
            </button>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="group menu-item-appear"
                  style={{ animationDelay: `${(index + 1) * 0.08}s` }}
                >
                  <div className="flex items-center">
                    <span
                      className={`h-[2px] bg-foreground transition-all duration-300 ease-out ${
                        isActive ? "w-10 mr-3" : "w-0 mr-0 group-hover:w-10 group-hover:mr-3"
                      }`}
                    />
                    <span className="text-2xl tracking-[0.15em] font-heading uppercase text-foreground transition-all duration-300 group-hover:tracking-[0.25em]">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="pb-10 menu-item-appear" style={{ animationDelay: '0.5s' }}>
            <SocialIcons socialLinks={socialLinks} />
          </div>
        </div>
      )}
    </>
  );
};
