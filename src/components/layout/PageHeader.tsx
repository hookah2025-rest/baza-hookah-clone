import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { SocialIcons } from "../SocialIcons";
import bazaLogo from "@/assets/baza-logo.png";
import { SocialLinks } from "@/data/siteData";

interface PageHeaderProps {
  socialLinks: SocialLinks;
  onMenuClick?: (path: string) => void;
  logoDesktop?: string;
  logoMobile?: string;
}

const navItems = [
  { label: "О НАС", subtitle: "Концепция", path: "/about" },
  { label: "МЕНЮ", subtitle: "Что имеется?", path: "/menu" },
  { label: "ГАЛЕРЕЯ", subtitle: "Визуальное сопровождение", path: "/gallery" },
  { label: "КАК ДОБРАТЬСЯ", subtitle: "Локация", path: "/location" },
  { label: "ПРАВИЛА", subtitle: "Правила заведения", path: "/rules" },
];

export const PageHeader = ({ socialLinks, onMenuClick, logoDesktop, logoMobile }: PageHeaderProps) => {
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

  // Use custom logos if provided, otherwise fall back to default
  const desktopLogoSrc = logoDesktop || bazaLogo;
  const mobileLogoSrc = logoMobile || bazaLogo;

  return (
    <>
      <header className="h-[100px] flex-shrink-0 bg-background border-b border-foreground/10 relative">
        {/* Mobile: Logo left, burger right */}
        <div className="h-full container mx-auto px-6 flex lg:hidden items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={mobileLogoSrc} alt="BAZA" className="h-14" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 flex flex-col gap-1.5 group"
            aria-label="Открыть меню"
          >
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
          </button>
        </div>

        {/* Desktop: Logo + Navigation centered */}
        <div className="hidden lg:flex h-full items-center justify-center gap-10">
          <Link to="/" className="flex items-center">
            <img src={desktopLogoSrc} alt="BAZA" className="h-16" />
          </Link>
          <nav className="flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm tracking-wider uppercase transition-all duration-300 hover:text-foreground hover:font-bold ${
                  location.pathname === item.path
                    ? "text-foreground font-bold"
                    : "text-foreground/70 font-medium"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
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
                <span className={`h-[1px] bg-foreground transition-all duration-300 ease-out ${
                  location.pathname === "/" ? "w-10 mr-3" : "w-0 mr-0 group-hover:w-10 group-hover:mr-3"
                }`} />
                {/* Label */}
                <span className={`text-2xl tracking-[0.15em] font-heading uppercase transition-colors duration-300 ${
                  location.pathname === "/" ? "text-accent" : "text-foreground group-hover:text-accent"
                }`}>
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
                      className={`h-[1px] bg-foreground transition-all duration-300 ease-out ${
                        isActive ? "w-10 mr-3" : "w-0 mr-0 group-hover:w-10 group-hover:mr-3"
                      }`}
                    />
                    {/* Label */}
                    <span
                      className={`text-2xl tracking-[0.15em] font-heading uppercase transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-foreground group-hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="pb-10">
            <SocialIcons socialLinks={socialLinks} />
          </div>
        </div>
      )}
    </>
  );
};
