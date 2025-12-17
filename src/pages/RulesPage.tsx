import { PageLayout } from "@/components/layout/PageLayout";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useRulesData } from "@/hooks/useRulesData";

const RulesPage = () => {
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { rules, loading: rulesLoading } = useRulesData();

  if (settingsLoading || rulesLoading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-content-bg">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <PageLayout settings={settings} flexibleHeight>
      <div className="container mx-auto px-6 max-w-3xl min-h-[calc(100svh-300px)] flex flex-col py-6 justify-center">
        {/* Title */}
        <h1 className="text-2xl font-heading font-black tracking-wider text-center mb-8 uppercase text-primary">
          Правила заведения
        </h1>

        {/* Rules list */}
        <div className="space-y-4">
          {rules.map((rule) => (
            <p
              key={rule.id}
              className="text-sm leading-relaxed text-gray-800"
            >
              {rule.number}. {rule.text}
            </p>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default RulesPage;
