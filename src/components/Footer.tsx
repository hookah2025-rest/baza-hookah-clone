import { Phone, MapPin } from "lucide-react";
import { SiteData } from "@/data/siteData";
import { Link } from "react-router-dom";

interface FooterProps {
  siteData: SiteData;
}

export const Footer = ({ siteData }: FooterProps) => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & Name */}
          <div>
            <h3 className="text-xl font-bold tracking-wider mb-2">{siteData.name}</h3>
            <p className="text-muted-foreground">{siteData.city}</p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{siteData.address}</span>
            </div>
            <a
              href={`tel:${siteData.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{siteData.phone}</span>
            </a>
          </div>

          {/* Hours */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground">{siteData.hoursWeekday}</p>
            <p className="text-muted-foreground">{siteData.hoursWeekend}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteData.name}. Все права защищены.
          </p>
          <Link 
            to="/admin" 
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            Админ-панель
          </Link>
        </div>
      </div>
    </footer>
  );
};
