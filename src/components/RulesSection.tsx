import { SiteData } from "@/data/siteData";

interface RulesSectionProps {
  siteData: SiteData;
}

export const RulesSection = ({ siteData }: RulesSectionProps) => {
  return (
    <section id="rules" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center mb-12">
          ПРАВИЛА ЗАВЕДЕНИЯ
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {siteData.rules.map((rule) => (
            <div key={rule.id} className="flex gap-4">
              <span className="text-accent font-bold text-lg flex-shrink-0 w-8">
                {rule.number}.
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {rule.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
