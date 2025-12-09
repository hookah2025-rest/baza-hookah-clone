import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData } from "@/data/siteData";

const RulesPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    setSiteData(getSiteData());
  }, []);

  if (!siteData) return null;

  return (
    <PageLayout siteData={siteData} title="ПРАВИЛА ЗАВЕДЕНИЯ">
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="space-y-6 text-foreground font-body">
          {siteData.rules.map((rule) => (
            <p key={rule.id} className="text-sm leading-relaxed">
              {rule.number}. {rule.text}
            </p>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default RulesPage;
