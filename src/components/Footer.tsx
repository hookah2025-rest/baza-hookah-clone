import { SiteData } from "@/data/siteData";
import { Link } from "react-router-dom";
import { ContactInfo } from "./ContactInfo";

interface FooterProps {
  siteData: SiteData;
}

export const Footer = ({ siteData }: FooterProps) => {
  return (
    <footer className="bg-background">
      <ContactInfo siteData={siteData} />
      
      <div className="container mx-auto px-6 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BAZA. Все права защищены.</p>
          <Link 
            to="/admin" 
            className="hover:text-accent transition-colors"
          >
            Админ-панель
          </Link>
        </div>
      </div>
    </footer>
  );
};