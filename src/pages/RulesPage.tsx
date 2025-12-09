import { PageLayout } from "@/components/layout/PageLayout";
import { useRulesData } from "@/hooks/useRulesData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const RulesPage = () => {
  const { rules, loading: rulesLoading } = useRulesData();
  const { settings, loading: settingsLoading } = useSiteSettings();

  if (rulesLoading || settingsLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-content-bg">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <PageLayout settings={settings}>
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="space-y-6 font-body">
          {rules.map((rule) => (
            <p key={rule.id} className="text-sm leading-relaxed text-gray-800">
              {rule.number}. {rule.text}
            </p>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default RulesPage;
