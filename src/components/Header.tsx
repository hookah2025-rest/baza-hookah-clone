import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { SiteData } from "@/data/siteData";

interface HeaderProps {
  siteData: SiteData;
}

const navItems = [
  { label: "О НАС", href: "#about" },
  { label: "МЕНЮ", href: "#menu" },
  { label: "ГАЛЕРЕЯ", href: "#gallery" },
  { label: "КАК ДОБРАТЬСЯ", href: "#location" },
  { label: "ПРАВИЛА ЗАВЕДЕНИЯ", href: "#rules" },
];

export const Header = ({ siteData }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Info */}
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold tracking-wider">{siteData.name}</h1>
            <p className="text-xs text-muted-foreground">{siteData.city}</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Phone & Hours */}
          <div className="hidden md:flex flex-col items-end">
            <a
              href={`tel:${siteData.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">{siteData.phone}</span>
            </a>
            <div className="text-xs text-muted-foreground mt-1">
              <span>{siteData.hoursWeekday}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link text-center py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`tel:${siteData.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 text-accent font-semibold mt-2"
              >
                <Phone className="w-4 h-4" />
                {siteData.phone}
              </a>
              <div className="text-center text-xs text-muted-foreground">
                <p>{siteData.hoursWeekday}</p>
                <p>{siteData.hoursWeekend}</p>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
