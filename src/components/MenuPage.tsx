import { useState } from "react";
import { X, Flame } from "lucide-react";
import { SiteData, MenuItem } from "@/data/siteData";
import { SocialIcons } from "./SocialIcons";

interface MenuPageProps {
  siteData: SiteData;
  onClose: () => void;
}

const menuCategories = [
  { id: "КАЛЬЯНЫ", label: "КАЛЬЯН", icon: null },
  { id: "КУХНЯ", label: "КУХНЯ", icon: "flame" },
  { id: "НАПИТКИ", label: "НАПИТКИ", icon: null },
  { id: "АЛКОГОЛЬ", label: "АЛКОГОЛЬ", icon: null },
];

const HookahIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block" fill="currentColor">
    <path d="M12 2C10.89 2 10 2.89 10 4V6H14V4C14 2.89 13.11 2 12 2ZM11 8V11H13V8H11ZM7 13C5.89 13 5 13.89 5 15V17H19V15C19 13.89 18.11 13 17 13H7ZM6 19V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V19H6Z"/>
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

export const MenuPage = ({ siteData, onClose }: MenuPageProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const filteredMenu = activeCategory
    ? siteData.menu.filter((item) => item.category.toUpperCase() === activeCategory)
    : [];

  // Group items by subcategory
  const groupedMenu = filteredMenu.reduce((acc, item) => {
    const subcategory = item.subcategory || "";
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleBack = () => {
    setActiveCategory(null);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
      {/* Close button */}
      <div className="fixed top-6 right-6 z-10">
        <button onClick={onClose} className="p-2">
          <X className="w-8 h-8 text-foreground hover:text-accent transition-colors" />
        </button>
      </div>

      {/* Back button when viewing category */}
      {activeCategory && (
        <div className="fixed top-6 left-6 z-10">
          <button 
            onClick={handleBack} 
            className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wider"
          >
            ← НАЗАД
          </button>
        </div>
      )}

      {!activeCategory ? (
        // Category selection view
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-foreground mb-12">
            Меню
          </h1>
          
          <nav className="flex flex-col items-center gap-8">
            {menuCategories.map((category) => {
              const isHovered = hoveredCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="text-center group"
                >
                  <span className={`text-xl md:text-2xl tracking-[0.2em] font-medium uppercase transition-colors duration-300 flex items-center gap-2 ${isHovered ? 'text-foreground' : 'text-accent'}`}>
                    {category.label}
                    {category.icon === "flame" && <Flame className="w-5 h-5" />}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      ) : (
        // Menu items view
        <div className="min-h-screen py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Category title */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-accent text-center mb-4 flex items-center justify-center gap-3">
              {activeCategory === "КУХНЯ" ? (
                <>КУХНЯ <Flame className="w-6 h-6" /></>
              ) : (
                activeCategory
              )}
            </h1>

            {/* Menu note for Кальяны */}
            {activeCategory === "КАЛЬЯНЫ" && siteData.menuNote && (
              <p className="text-xs text-accent/70 text-center mb-8 max-w-md mx-auto whitespace-pre-line">
                {siteData.menuNote}
              </p>
            )}

            {/* Special hookah pricing table */}
            {activeCategory === "КАЛЬЯНЫ" && (
              <div className="mb-10">
                <div className="space-y-4">
                  {[
                    { people: "1-2", hookahs: 1, price: "2 800" },
                    { people: "3-4", hookahs: 2, price: "5 600" },
                    { people: "5-6", hookahs: 3, price: "8 400" },
                    { people: "7-8", hookahs: 4, price: "11 200" },
                  ].map((row) => (
                    <div key={row.people} className="flex items-center justify-between text-foreground border-b border-muted/20 pb-3">
                      <div className="flex items-center gap-4">
                        <span className="text-lg">{row.people}</span>
                        <PersonIcon />
                        <span className="text-lg">{row.hookahs}</span>
                        <HookahIcon />
                      </div>
                      <span className="text-lg font-medium">{row.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center justify-between text-foreground border-b border-muted/20 pb-3">
                  <span className="text-lg">Professional</span>
                  <span className="text-lg font-medium">3 200</span>
                </div>
              </div>
            )}

            {/* Menu items grouped by subcategory */}
            {Object.entries(groupedMenu).map(([subcategory, items]) => (
              <div key={subcategory} className="mb-10">
                {subcategory && (
                  <h2 className="text-lg font-bold tracking-wider text-accent mb-4 uppercase border-b border-accent/30 pb-2">
                    {subcategory}
                  </h2>
                )}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-foreground font-medium text-base">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-accent/70 text-xs mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="text-foreground font-medium ml-4 whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* If no grouped items, show flat list */}
            {activeCategory !== "КАЛЬЯНЫ" && Object.keys(groupedMenu).length === 0 && filteredMenu.length > 0 && (
              <div className="space-y-4">
                {filteredMenu.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b border-muted/20 pb-3">
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium">{item.name}</h3>
                      {item.description && (
                        <p className="text-accent/70 text-xs mt-0.5">{item.description}</p>
                      )}
                    </div>
                    <span className="text-foreground font-medium ml-4">{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="py-8">
        <SocialIcons socialLinks={siteData.socialLinks} />
        <div className="text-center mt-4 text-xs text-muted-foreground">
          <p>{siteData.address}</p>
          <a href={`tel:${siteData.phone.replace(/\s/g, '')}`} className="text-accent">
            {siteData.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
