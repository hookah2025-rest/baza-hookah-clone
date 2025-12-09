import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SiteData } from "@/data/siteData";
import { SocialIcons } from "./SocialIcons";

interface HeaderProps {
  siteData: SiteData;
  showNav?: boolean;
}

const navItems = [
  { label: "О НАС", subtitle: "Концепция", href: "#about" },
  { label: "МЕНЮ", subtitle: "Что имеется?", href: "#menu" },
  { label: "ГАЛЕРЕЯ", subtitle: "Визуальное сопровождение", href: "#gallery" },
  { label: "КАК ДОБРАТЬСЯ", subtitle: "Локация", href: "#location" },
  { label: "ПРАВИЛА", subtitle: "Правила заведения", href: "#rules" },
];

export const Header = ({ siteData, showNav = true }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleNavClick = (href: string) => {
    setActiveItem(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      {showNav && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#hero" className="flex flex-col items-center">
                <span className="text-2xl font-bold tracking-[0.3em]">BAZA</span>
                <span className="text-[10px] tracking-wider text-muted-foreground">кальян-бар</span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="nav-link">
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 flex flex-col gap-1.5 group"
                aria-label="Открыть меню"
              >
                <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
                <span className="w-7 h-0.5 bg-foreground group-hover:bg-accent transition-colors" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background menu-slide-in flex flex-col">
          <div className="h-20 flex-shrink-0 flex justify-end items-center px-6">
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X className="w-8 h-8 text-foreground" />
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col items-center justify-center gap-6">
            <a
              href="#hero"
              onClick={() => handleNavClick("#hero")}
              className="text-center group"
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-[2px] bg-accent transition-transform duration-300 origin-right ${
                  activeItem === "#hero" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
                <span className="text-2xl tracking-[0.15em] font-heading uppercase text-foreground group-hover:text-foreground transition-colors duration-300">
                  ГЛАВНАЯ
                </span>
                <span className={`w-6 h-[2px] bg-accent transition-transform duration-300 origin-left ${
                  activeItem === "#hero" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </div>
              <p className="text-foreground/50 text-xs tracking-wider mt-1 font-body">
                Добро пожаловать
              </p>
            </a>
            {navItems.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-center group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-[2px] bg-accent transition-transform duration-300 origin-right ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                    <span
                      className={`text-2xl tracking-[0.15em] font-heading uppercase transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`w-6 h-[2px] bg-accent transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </div>
                  <p className="text-foreground/50 text-xs tracking-wider mt-1 font-body">
                    {item.subtitle}
                  </p>
                </a>
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