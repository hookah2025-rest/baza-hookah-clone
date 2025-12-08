import { SiteData } from "@/data/siteData";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";

interface RulesSectionProps {
  siteData: SiteData;
}

export const RulesSection = ({ siteData }: RulesSectionProps) => {
  return (
    <section id="rules" className="min-h-screen flex flex-col bg-secondary">
      <Header siteData={siteData} />
      
      <div className="flex-1 pt-20 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-wider text-center mb-12 text-secondary-foreground">
            ПРАВИЛА ЗАВЕДЕНИЯ
          </h2>

          <div className="space-y-6">
            {siteData.rules.map((rule) => (
              <div key={rule.id} className="flex gap-4">
                <span className="text-primary font-bold text-lg flex-shrink-0">
                  {rule.number}.
                </span>
                <p className="text-secondary-foreground/80 leading-relaxed">
                  {rule.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <ContactInfo siteData={siteData} />
    </section>
  );
};