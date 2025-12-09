import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getSiteData, SiteData, MenuItem } from "@/data/siteData";

const menuCategories = [
  { id: "КАЛЬЯНЫ", label: "КАЛЬЯНЫ" },
  { id: "НАПИТКИ", label: "НАПИТКИ" },
  { id: "КУХНЯ", label: "КУХНЯ", hasIcon: true },
  { id: "АЛКОГОЛЬ", label: "АЛКОГОЛЬ" },
];

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const HookahIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block" fill="currentColor">
    <path d="M12 2C10.89 2 10 2.89 10 4V6H14V4C14 2.89 13.11 2 12 2ZM11 8V11H13V8H11ZM7 13C5.89 13 5 13.89 5 15V17H19V15C19 13.89 18.11 13 17 13H7ZM6 19V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V19H6Z" />
  </svg>
);

const MenuPage = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("КАЛЬЯНЫ");

  useEffect(() => {
    setSiteData(getSiteData());
    // Check age verification
    const verified = localStorage.getItem("age_verified") === "true";
    if (!verified) {
      window.location.href = "/";
    }
  }, []);

  if (!siteData) return null;

  const filteredMenu = siteData.menu.filter(
    (item) => item.category.toUpperCase() === activeCategory
  );

  // Group items by subcategory
  const groupedMenu = filteredMenu.reduce((acc, item) => {
    const subcategory = item.subcategory || "";
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <PageLayout siteData={siteData}>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-sm tracking-wider uppercase font-medium transition-colors flex items-center gap-2 pb-1 ${
                activeCategory === cat.id
                  ? "text-background border-b-2 border-background"
                  : "text-background/60 hover:text-background"
              }`}
            >
              {cat.label}
              {cat.hasIcon && <Flame className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Hookah section with special pricing */}
        {activeCategory === "КАЛЬЯНЫ" && (
          <div className="mb-10">
            <div className="space-y-4 max-w-md mx-auto">
              {[
                { people: "1-3 ЧЕЛОВЕКА", hookahs: 1, price: "1800" },
                { people: "4-6 ЧЕЛОВЕК", hookahs: 2, price: "3600" },
                { people: "7-9 ЧЕЛОВЕК", hookahs: 3, price: "5400" },
              ].map((row) => (
                <div
                  key={row.people}
                  className="flex items-center justify-between text-foreground py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{row.people}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: row.hookahs }).map((_, i) => (
                        <PersonIcon key={i} />
                      ))}
                    </div>
                  </div>
                  <span className="font-medium">{row.price}</span>
                </div>
              ))}
              
              <div className="flex items-center justify-between text-foreground py-2 mt-4">
                <span className="font-medium">ГРЕЙПФРУТ</span>
                <span className="font-medium">2200</span>
              </div>
            </div>

            {/* Menu note */}
            {siteData.menuNote && (
              <div className="mt-8 border border-foreground/30 p-6 max-w-lg mx-auto">
                <p className="text-sm text-foreground text-center leading-relaxed whitespace-pre-line font-body">
                  {siteData.menuNote}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Other categories - grouped by subcategory */}
        {activeCategory !== "КАЛЬЯНЫ" && (
          <div className="space-y-8">
            {Object.entries(groupedMenu).map(([subcategory, items]) => (
              <div key={subcategory}>
                {subcategory && (
                  <h2 className="text-lg font-bold tracking-wider text-background mb-4 uppercase">
                    {subcategory}
                  </h2>
                )}
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-baseline"
                    >
                      <span className="text-gray-800 font-medium">
                        {item.name}
                      </span>
                      {item.description && (
                        <span className="text-gray-500 text-sm mx-4 flex-shrink-0">
                          {item.description}
                        </span>
                      )}
                      <span className="text-background font-bold ml-auto whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MenuPage;
