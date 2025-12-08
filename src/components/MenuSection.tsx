import { useState } from "react";
import { SiteData, MenuItem } from "@/data/siteData";
import { cn } from "@/lib/utils";

interface MenuSectionProps {
  siteData: SiteData;
}

const menuCategories = ["Кальяны", "Напитки", "Кухня", "Алкоголь"];

export const MenuSection = ({ siteData }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("Кальяны");

  const filteredMenu = siteData.menu.filter(
    (item) => item.category === activeCategory
  );

  // Group items by subcategory
  const groupedMenu = filteredMenu.reduce((acc, item) => {
    const subcategory = item.subcategory || "Другое";
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <section id="menu" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center mb-12">
          МЕНЮ
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-md",
                activeCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="max-w-3xl mx-auto">
          {Object.entries(groupedMenu).map(([subcategory, items]) => (
            <div key={subcategory} className="mb-10">
              <h3 className="text-xl font-semibold tracking-wide text-accent mb-6 uppercase">
                {subcategory}
              </h3>
              <div className="space-y-1">
                {items.map((item) => (
                  <div key={item.id} className="menu-item-row">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-muted-foreground font-semibold ml-4 flex-shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
