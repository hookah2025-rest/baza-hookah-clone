import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SiteData } from "@/data/siteData";

interface HeaderProps {
  siteData: SiteData;
  showNav?: boolean;
}

const navItems = [
  { label: "О НАС", href: "#about" },
  { label: "МЕНЮ", href: "#menu" },
  { label: "ГАЛЕРЕЯ", href: "#gallery" },
  { label: "КАК ДОБРАТЬСЯ", href: "#location" },
  { label: "ПРАВИЛА ЗАВЕДЕНИЯ", href: "#rules" },
];

const mobileNavItems = [
  { label: "ГЛАВНАЯ", href: "#hero" },
  ...navItems
];

export const Header = ({ siteData, showNav = true }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                className="lg:hidden p-2"
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Navigation Fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {mobileNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg tracking-wider font-medium hover:opacity-80 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};