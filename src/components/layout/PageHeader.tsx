import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { SocialIcons } from "../SocialIcons";
import bazaLogo from "@/assets/baza-logo.png";
import { SocialLinks } from "@/data/siteData";

interface PageHeaderProps {
  socialLinks: SocialLinks;
  onMenuClick?: (path: string) => void;
}

const navItems = [
  { label: "О НАС", subtitle: "Концепция", path: "/about" },
  { label: "МЕНЮ", subtitle: "Что имеется?", path: "/menu" },
  { label: "ГАЛЕРЕЯ", subtitle: "Визуальное сопровождение", path: "/gallery" },
  { label: "КАК ДОБРАТЬСЯ", subtitle: "Локация", path: "/location" },
  { label: "ПРАВИЛА", subtitle: "Правила заведения", path: "/rules" },
];

export const PageHeader = ({ socialLinks, onMenuClick }: PageHeaderProps) => {
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

  return (
    <>
      <header className="h-[100px] flex-shrink-0 bg-background border-b border-foreground/10">
        <div className="h-full container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={bazaLogo} alt="BAZA" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-accent ${
                  location.pathname === item.path
                    ? "text-foreground border-b border-foreground"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 flex flex-col gap-1.5 group"
            aria-label="Открыть меню"
          >
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
            <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background menu-slide-in flex flex-col">
          <div className="h-20 flex-shrink-0 flex justify-between items-center px-6 border-b border-foreground/10">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={bazaLogo} alt="BAZA" className="h-12" />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X className="w-8 h-8 text-foreground" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-5">
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="text-center group"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="w-6 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-xl tracking-[0.15em] font-heading uppercase text-foreground group-hover:text-accent transition-colors duration-300">
                  ГЛАВНАЯ
                </span>
                <span className="w-6 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-accent text-xs tracking-wider mt-1 font-body">
                Добро пожаловать
              </p>
            </button>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span
                      className={`w-6 h-[2px] bg-accent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <span
                      className={`text-xl tracking-[0.15em] font-heading uppercase transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-foreground group-hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`w-6 h-[2px] bg-accent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                  <p className="text-accent text-xs tracking-wider mt-1 font-body">
                    {item.subtitle}
                  </p>
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
