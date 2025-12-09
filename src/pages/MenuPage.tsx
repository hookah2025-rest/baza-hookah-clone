import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData, MenuItem } from "@/data/siteData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const menuCategories = [
  { id: "КАЛЬЯНЫ", label: "КАЛЬЯН" },
  { id: "КУХНЯ", label: "КУХНЯ", hasIcon: true },
  { id: "НАПИТКИ", label: "НАПИТКИ" },
  { id: "АЛКОГОЛЬ", label: "АЛКОГОЛЬ" },
];

const MenuPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    setSiteData(getSiteData());
    const verified = localStorage.getItem("age_verified") === "true";
    if (!verified) {
      window.location.href = "/";
    }
  }, []);

  if (!siteData) return null;

  const getMenuByCategory = (category: string) => {
    return siteData.menu.filter(
      (item) => item.category.toUpperCase() === category
    );
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

  return (
    <PageLayout siteData={siteData}>
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Title */}
        <h1 className="text-2xl font-heading tracking-wider text-center text-foreground mb-8 uppercase">
          Меню
        </h1>

        {/* Accordion Categories */}
        <Accordion type="single" collapsible className="space-y-2">
          {menuCategories.map((cat) => {
            const items = getMenuByCategory(cat.id);
            const grouped = groupBySubcategory(items);

            return (
              <AccordionItem
                key={cat.id}
                value={cat.id}
                className="border-b border-foreground/20"
              >
                <AccordionTrigger 
                  hideChevron 
                  className="py-4 text-foreground hover:no-underline justify-center gap-2 [&[data-state=open]]:text-accent"
                >
                  <span className="text-lg tracking-wider font-heading uppercase">
                    {cat.label}
                  </span>
                  {cat.hasIcon && <Flame className="w-4 h-4" />}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  {/* Hookah special section */}
                  {cat.id === "КАЛЬЯНЫ" && (
                    <div className="space-y-3 mb-6">
                      {[
                        { people: "1-3 ЧЕЛОВЕКА", price: "1800" },
                        { people: "4-6 ЧЕЛОВЕК", price: "3600" },
                        { people: "7-9 ЧЕЛОВЕК", price: "5400" },
                      ].map((row) => (
                        <div
                          key={row.people}
                          className="flex justify-between items-center text-foreground"
                        >
                          <span className="text-sm">{row.people}</span>
                          <span className="text-sm font-medium">{row.price}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-foreground pt-2">
                        <span className="text-sm">ГРЕЙПФРУТ</span>
                        <span className="text-sm font-medium">2200</span>
                      </div>
                      {siteData.menuNote && (
                        <div className="mt-4 border border-foreground/30 p-4">
                          <p className="text-xs text-foreground/80 text-center leading-relaxed whitespace-pre-line">
                            {siteData.menuNote}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Other categories with subcategories */}
                  {cat.id !== "КАЛЬЯНЫ" && (
                    <div className="space-y-6">
                      {Object.entries(grouped).map(([subcategory, subItems]) => (
                        <div key={subcategory}>
                          <h3 className="text-accent text-sm font-bold tracking-wider uppercase mb-3 border-b border-accent/30 pb-1">
                            {subcategory}
                          </h3>
                          <div className="space-y-2">
                            {subItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-baseline text-foreground"
                              >
                                <span className="text-sm">{item.name}</span>
                                <span className="text-sm font-medium ml-4">
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
