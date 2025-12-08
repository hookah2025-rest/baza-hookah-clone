import { MapPin, Phone, Clock } from "lucide-react";
import { SiteData } from "@/data/siteData";

interface LocationSectionProps {
  siteData: SiteData;
}

export const LocationSection = ({ siteData }: LocationSectionProps) => {
  return (
    <section id="location" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center mb-12">
          КАК ДОБРАТЬСЯ
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Map */}
          <div className="aspect-square md:aspect-auto rounded-lg overflow-hidden bg-secondary">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A55.678936%2C37.505283&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Карта"
              className="w-full h-full min-h-[300px]"
              style={{ filter: 'grayscale(30%) contrast(1.1)' }}
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center gap-8 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-secondary flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                <p className="text-muted-foreground">{siteData.city}</p>
                <p className="text-muted-foreground">{siteData.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-secondary flex-shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                <a
                  href={`tel:${siteData.phone.replace(/\s/g, '')}`}
                  className="text-accent hover:underline"
                >
                  {siteData.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-secondary flex-shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Режим работы</h3>
                <p className="text-muted-foreground">{siteData.hoursWeekday}</p>
                <p className="text-muted-foreground">{siteData.hoursWeekend}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
