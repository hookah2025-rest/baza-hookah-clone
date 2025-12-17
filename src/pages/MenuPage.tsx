import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useMenuData } from "@/hooks/useMenuData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import kitchenIcon from "@/assets/kitchen-icon.png";
import { HookahIcon } from "@/components/HookahIcon";
const MenuPage = () => {
  const {
    settings,
    loading: settingsLoading
  } = useSiteSettings();
  const {
    categories,
    menuItems,
    loading: menuLoading
  } = useMenuData();
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified") === "true";
    if (!verified) {
      window.location.href = "/";
    }
  }, []);
  if (settingsLoading || menuLoading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-content-bg">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }
  const getMenuByCategory = (categoryId: string) => {
    return menuItems.filter(item => item.category_id === categoryId);
  };
  const groupBySubcategory = (items: typeof menuItems) => {
    return items.reduce((acc, item) => {
      const subcategory = item.subcategory || "Прочее";
      if (!acc[subcategory]) {
        acc[subcategory] = [];
      }
      acc[subcategory].push(item);
      return acc;
    }, {} as Record<string, typeof menuItems>);
  };
  const isHookahCategory = (name: string) => {
    return name.toLowerCase().includes("кальян");
  };
  const isKitchenCategory = (name: string) => {
    return name.toLowerCase().includes("кухня");
  };

  const isAnyCategoryOpen = openItems.length > 0;

  return <PageLayout settings={settings} flexibleHeight>
      <div className={`container mx-auto px-6 max-w-3xl min-h-[calc(100svh-300px)] flex flex-col py-6 ${
        isAnyCategoryOpen ? "justify-start" : "justify-center"
      }`}>
        {/* Title */}
        <h1 className="text-2xl font-heading font-black tracking-wider text-center mb-8 uppercase text-primary">
          Меню
        </h1>

        {/* Accordion Categories */}
        <Accordion type="multiple" className="space-y-2" value={openItems} onValueChange={setOpenItems}>
          {categories.map(cat => {
          const items = getMenuByCategory(cat.id);
          const grouped = groupBySubcategory(items);
          const isHookah = isHookahCategory(cat.name);
          const isKitchen = isKitchenCategory(cat.name);
          return <AccordionItem key={cat.id} value={cat.id} className="border-b border-background/30">
                <AccordionTrigger hideChevron className="py-4 text-background hover:no-underline justify-center [&[data-state=open]]:text-background">
                  <div className="flex items-center gap-3">
                    <span className="text-lg tracking-wider font-heading uppercase">
                      {cat.name}
                    </span>
                    {isKitchen && <img src={kitchenIcon} alt="Oregano's pasta bar логотип" className="h-5" />}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  {/* Hookah special section */}
                  {isHookah && items.length > 0 && <div className="space-y-3 mb-6">
                      {items.map(item => {
                        // Determine number of hookah icons based on item name
                        const getHookahCount = (name: string) => {
                          if (name.includes("1-3")) return 1;
                          if (name.includes("4-6")) return 2;
                          if (name.includes("7-9")) return 3;
                          return 0;
                        };
                        const hookahCount = getHookahCount(item.name);
                        
                        return (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-800">{item.name}</span>
                              {hookahCount > 0 && (
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: hookahCount }).map((_, i) => (
                                    <HookahIcon key={i} className="w-3.5 h-4 text-primary" />
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-bold text-background">{item.price}</span>
                          </div>
                        );
                      })}
                      {cat.note && <div className="mt-4 border border-background/30 p-4">
                          <p className="text-xs text-gray-700 text-center leading-relaxed whitespace-pre-line">
                            {cat.note}
                          </p>
                        </div>}
                    </div>}

                  {/* Other categories with subcategories */}
                  {!isHookah && <div className="space-y-6">
                      {Object.entries(grouped).map(([subcategory, subItems]) => <div key={subcategory}>
                          <h3 className="text-background text-sm font-bold tracking-wider uppercase mb-3">
                            {subcategory}
                          </h3>
                          <div className="space-y-2">
                            {subItems.map(item => <div key={item.id} className="flex justify-between items-baseline">
                                <span className="text-sm text-gray-800">{item.name}</span>
                                {item.description && <span className="text-xs text-gray-500 mx-2 flex-shrink-0">
                                    {item.description}
                                  </span>}
                                <span className="text-sm font-bold text-background ml-auto">
                                  {item.price}
                                </span>
                              </div>)}
                          </div>
                        </div>)}
                      {cat.note && <div className="mt-4 border border-background/30 p-4">
                          <p className="text-xs text-gray-700 text-center leading-relaxed whitespace-pre-line">
                            {cat.note}
                          </p>
                        </div>}
                    </div>}
                </AccordionContent>
              </AccordionItem>;
        })}
        </Accordion>
      </div>
    </PageLayout>;
};
export default MenuPage;