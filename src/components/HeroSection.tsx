import { Phone, MapPin, Clock } from "lucide-react";
import { SiteData } from "@/data/siteData";

interface HeroSectionProps {
  siteData: SiteData;
}

export const HeroSection = ({ siteData }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Decorative smoke effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-24">
        <div className="fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-4 text-shadow">
            {siteData.name}
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="w-5 h-5" />
            <span className="text-lg tracking-wide">{siteData.city}</span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
            {siteData.address}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <a
              href={`tel:${siteData.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-xl font-semibold hover:text-accent transition-colors group"
            >
              <div className="p-3 rounded-full bg-secondary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <span>{siteData.phone}</span>
            </a>

            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Режим работы</span>
              </div>
              <p className="text-sm">{siteData.hoursWeekday}</p>
              <p className="text-sm">{siteData.hoursWeekend}</p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-muted-foreground rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
