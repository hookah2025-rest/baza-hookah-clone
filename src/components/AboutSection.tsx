import { SiteData } from "@/data/siteData";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";

interface AboutSectionProps {
  siteData: SiteData;
}

export const AboutSection = ({ siteData }: AboutSectionProps) => {
  return (
    <section id="about" className="min-h-screen flex flex-col bg-primary">
      <Header siteData={siteData} />
      
      <div className="flex-1 flex pt-16">
        {/* Левая колонка - серый фон с текстом */}
        <div className="w-full lg:w-1/2 bg-[#d4d4d4] flex items-center justify-center p-8 lg:p-16">
          <div className="border border-foreground/30 p-8 lg:p-12 max-w-lg">
            <p className="text-foreground text-center leading-relaxed text-base lg:text-lg">
              Данная страница находится в разработке
              <br />
              в виду чрезмерной скромности
              <br />
              одной части команды
              <br />
              и колоссального самомнения другой.
              <br />
              Пока спорим.
            </p>
          </div>
        </div>
        
        {/* Правая колонка - фото интерьера */}
        <div className="hidden lg:block w-1/2">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop')`
            }}
          />
        </div>
      </div>
      
      <ContactInfo siteData={siteData} />
    </section>
  );
};
