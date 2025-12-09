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
  { label: "О НАС", path: "/about" },
  { label: "МЕНЮ", path: "/menu" },
  { label: "ГАЛЕРЕЯ", path: "/gallery" },
  { label: "КАК ДОБРАТЬСЯ", path: "/location" },
  { label: "ПРАВИЛА ЗАВЕДЕНИЯ", path: "/rules" },
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
      <header className="bg-background py-4 px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo with text */}
          <Link to="/" className="flex flex-col items-center">
            <img src={bazaLogo} alt="BAZA" className="h-10 lg:h-12" />
            <span className="text-[10px] tracking-[0.2em] text-foreground/80 mt-0.5">КАЛЬЯН-БАР</span>
          </Link>

          {/* Desktop Navigation - right aligned */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 hover:text-accent ${
                  location.pathname === item.path
                    ? "text-foreground border-b border-foreground pb-0.5"
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
            className="lg:hidden p-2 flex flex-col gap-1.5"
            aria-label="Открыть меню"
          >
            <span className="w-7 h-0.5 bg-foreground" />
            <span className="w-7 h-0.5 bg-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background menu-slide-in flex flex-col">
          <div className="py-4 px-6 flex justify-between items-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center">
              <img src={bazaLogo} alt="BAZA" className="h-10" />
              <span className="text-[10px] tracking-[0.2em] text-foreground/80 mt-0.5">КАЛЬЯН-БАР</span>
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X className="w-8 h-8 text-foreground" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-6">
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="text-xl tracking-[0.15em] font-bold uppercase text-foreground hover:text-accent transition-colors"
            >
              ГЛАВНАЯ
            </button>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-xl tracking-[0.15em] font-bold uppercase transition-colors ${
                  location.pathname === item.path
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pb-10">
            <SocialIcons socialLinks={socialLinks} />
          </div>
        </div>
      )}
    </>
  );
};
