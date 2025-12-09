import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData } from "@/data/siteData";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  price: string;
  subcategory?: string;
  description?: string;
  sort_order: number;
}

const MenuPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSiteData(getSiteData());
    const verified = localStorage.getItem("age_verified") === "true";
    if (!verified) {
      window.location.href = "/";
    }

    const fetchMenuData = async () => {
      try {
        const [categoriesRes, itemsRes] = await Promise.all([
          supabase.from("menu_categories").select("*").order("sort_order"),
          supabase.from("menu_items").select("*").order("sort_order"),
        ]);

        if (categoriesRes.data) setCategories(categoriesRes.data);
        if (itemsRes.data) setMenuItems(itemsRes.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  if (!siteData || loading) return null;

  const getMenuByCategory = (categoryId: string) => {
    return menuItems.filter((item) => item.category_id === categoryId);
  };

  const groupBySubcategory = (items: MenuItem[]) => {
    return items.reduce((acc, item) => {
      const subcategory = item.subcategory || "Прочее";
      if (!acc[subcategory]) {
        acc[subcategory] = [];
      }
      acc[subcategory].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  };

  const isHookahCategory = (name: string) => {
    return name.toLowerCase().includes("кальян");
  };

  const isKitchenCategory = (name: string) => {
    return name.toLowerCase().includes("кухня");
  };

  return (
    <PageLayout siteData={siteData}>
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Title */}
        <h1 className="text-2xl font-heading tracking-wider text-center text-foreground mb-8 uppercase">
          Меню
        </h1>

        {/* Accordion Categories */}
        <Accordion type="single" collapsible className="space-y-2">
          {categories.map((cat) => {
            const items = getMenuByCategory(cat.id);
            const grouped = groupBySubcategory(items);
            const isHookah = isHookahCategory(cat.name);
            const isKitchen = isKitchenCategory(cat.name);

            return (
              <AccordionItem
                key={cat.id}
                value={cat.id}
                className="border-b border-background/30"
              >
                <AccordionTrigger 
                  hideChevron 
                  className="py-4 text-background hover:no-underline justify-center gap-2 [&[data-state=open]]:text-background"
                >
                  <span className="text-lg tracking-wider font-heading uppercase">
                    {cat.name}
                  </span>
                  {isKitchen && <Flame className="w-4 h-4" />}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  {/* Hookah special section */}
                  {isHookah && items.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-800">{item.name}</span>
                          <span className="text-sm font-bold text-background">{item.price}</span>
                        </div>
                      ))}
                      {siteData.menuNote && (
                        <div className="mt-4 border border-background/30 p-4">
                          <p className="text-xs text-gray-700 text-center leading-relaxed whitespace-pre-line">
                            {siteData.menuNote}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Other categories with subcategories */}
                  {!isHookah && (
                    <div className="space-y-6">
                      {Object.entries(grouped).map(([subcategory, subItems]) => (
                        <div key={subcategory}>
                          <h3 className="text-background text-sm font-bold tracking-wider uppercase mb-3">
                            {subcategory}
                          </h3>
                          <div className="space-y-2">
                            {subItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-baseline"
                              >
                                <span className="text-sm text-gray-800">{item.name}</span>
                                {item.description && (
                                  <span className="text-xs text-gray-500 mx-2 flex-shrink-0">
                                    {item.description}
                                  </span>
                                )}
                                <span className="text-sm font-bold text-background ml-auto">
                                  {item.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </PageLayout>
  );
};

export default MenuPage;
