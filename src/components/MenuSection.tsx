import { useState, useEffect } from "react";
import { SiteData, MenuItem } from "@/data/siteData";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";
import { AgeVerificationModal } from "./AgeVerificationModal";

interface MenuSectionProps {
  siteData: SiteData;
}

const menuCategories = ["КАЛЬЯНЫ", "НАПИТКИ", "КУХНЯ", "АЛКОГОЛЬ"];

const HookahIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block text-primary" fill="currentColor">
    <path d="M12 2C10.89 2 10 2.89 10 4V6H14V4C14 2.89 13.11 2 12 2ZM11 8V11H13V8H11ZM7 13C5.89 13 5 13.89 5 15V17H19V15C19 13.89 18.11 13 17 13H7ZM6 19V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V19H6Z"/>
  </svg>
);

export const MenuSection = ({ siteData }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("КАЛЬЯНЫ");
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified") === "true";
    setAgeVerified(verified);
  }, []);

  const handleCategoryChange = (category: string) => {
    if (category === "АЛКОГОЛЬ" && !ageVerified) {
      setShowAgeModal(true);
      return;
    }
    setActiveCategory(category);
  };

  const handleAgeConfirm = () => {
    setAgeVerified(true);
    setShowAgeModal(false);
    setActiveCategory("АЛКОГОЛЬ");
  };

  const handleAgeDecline = () => {
    setShowAgeModal(false);
  };

  const filteredMenu = siteData.menu.filter(
    (item) => item.category.toUpperCase() === activeCategory
  );

  // Group items by subcategory for categories other than Кальяны
  const groupedMenu = filteredMenu.reduce((acc, item) => {
    const subcategory = item.subcategory || "";
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <>
      {showAgeModal && (
        <AgeVerificationModal
          onConfirm={handleAgeConfirm}
          onDecline={handleAgeDecline}
        />
      )}
      <section id="menu" className="min-h-screen flex flex-col">
        {/* Header */}
        <Header siteData={siteData} />
      <Header siteData={siteData} />
      
      {/* Menu Content */}
      <div className="flex-1 bg-secondary pt-20 lg:pt-16">
        <div className="container mx-auto px-6 py-12">
          {/* Title - Mobile only */}
          <h2 className="lg:hidden text-3xl font-bold tracking-wider text-center mb-8 text-secondary-foreground">
            МЕНЮ
          </h2>

          {/* Category Tabs - Desktop */}
          <div className="hidden lg:flex justify-center gap-12 mb-12">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "text-sm tracking-wider font-medium transition-all pb-1",
                  activeCategory === category
                    ? "text-primary border-b-2 border-primary"
                    : "text-secondary-foreground/70 hover:text-secondary-foreground"
                )}
              >
                {category === "КУХНЯ" ? (
                  <span>КУХНЯ <span className="text-[10px] italic text-secondary-foreground/50">Oregano's</span></span>
                ) : (
                  category
                )}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="max-w-2xl mx-auto">
            {activeCategory === "КАЛЬЯНЫ" ? (
              <>
                <h3 className="text-xl font-semibold tracking-wider text-center mb-8 text-primary">
                  КАЛЬЯНЫ
                </h3>
                <div className="space-y-4">
                  {filteredMenu.map((item) => (
                    <div key={item.id} className="menu-item-row text-secondary-foreground">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{item.name}</span>
                        {item.icons && (
                          <span className="flex gap-1">
                            {Array.from({ length: item.icons }).map((_, i) => (
                              <HookahIcon key={i} />
                            ))}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Menu Note */}
                <div className="mt-12 p-6 border border-secondary-foreground/30 text-center">
                  <p className="text-sm text-secondary-foreground/80 whitespace-pre-line leading-relaxed">
                    {siteData.menuNote}
                  </p>
                </div>
              </>
            ) : (
              Object.entries(groupedMenu).map(([subcategory, items]) => (
                <div key={subcategory} className="mb-10">
                  {subcategory && (
                    <h3 className="text-lg font-semibold tracking-wide text-primary mb-6 uppercase">
                      {subcategory}
                    </h3>
                  )}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="menu-item-row text-secondary-foreground">
                        <span>{item.name}</span>
                        <span className="font-semibold ml-4 flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mobile category links */}
          <div className="lg:hidden mt-12 space-y-4 text-center">
            {menuCategories.filter(c => c !== activeCategory).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="block w-full text-xl tracking-wider font-medium text-primary py-2"
              >
                {category === "КУХНЯ" ? (
                  <span>КУХНЯ <span className="text-sm italic text-secondary-foreground/50">Oregano's</span></span>
                ) : (
                  category
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

        {/* Footer */}
        <ContactInfo siteData={siteData} />
      </section>
    </>
  );
};