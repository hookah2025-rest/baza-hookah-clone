import { useState, useEffect } from "react";
import { SiteData, MenuItem } from "@/data/siteData";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";
import { AgeVerificationModal } from "./AgeVerificationModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MenuSectionProps {
  siteData: SiteData;
}

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

export const MenuSection = ({ siteData }: MenuSectionProps) => {
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>(["КАЛЬЯНЫ"]);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified") === "true";
    setAgeVerified(verified);
  }, []);

  const handleCategoryClick = (category: string) => {
    if (category === "АЛКОГОЛЬ" && !ageVerified) {
      setPendingCategory(category);
      setShowAgeModal(true);
      return;
    }
    
    if (openCategories.includes(category)) {
      setOpenCategories(openCategories.filter(c => c !== category));
    } else {
      setOpenCategories([...openCategories, category]);
    }
  };

  const handleAgeConfirm = () => {
    setAgeVerified(true);
    setShowAgeModal(false);
    if (pendingCategory) {
      setOpenCategories([...openCategories, pendingCategory]);
      setPendingCategory(null);
    }
  };

  const handleAgeDecline = () => {
    setShowAgeModal(false);
    setPendingCategory(null);
  };

  // Group menu items by category
  const menuByCategory = siteData.menu.reduce((acc, item) => {
    const category = item.category.toUpperCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Group items by subcategory within each category
  const groupBySubcategory = (items: MenuItem[]) => {
    return items.reduce((acc, item) => {
      const subcategory = item.subcategory || "";
      if (!acc[subcategory]) {
        acc[subcategory] = [];
      }
      acc[subcategory].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  };

  const categories = ["КАЛЬЯНЫ", "КУХНЯ", "НАПИТКИ", "АЛКОГОЛЬ"];

  return (
    <>
      {showAgeModal && (
        <AgeVerificationModal
          onConfirm={handleAgeConfirm}
          onDecline={handleAgeDecline}
        />
      )}
      <section id="menu" className="min-h-screen flex flex-col bg-black">
        <Header siteData={siteData} />
        
        <div className="flex-1 pt-20 lg:pt-24 pb-12">
          <div className="container mx-auto px-6 max-w-3xl">
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-wider text-center mb-12 text-white">
              Меню
            </h1>

            {/* Menu Categories */}
            <div className="space-y-8">
              {categories.map((category) => {
                const items = menuByCategory[category] || [];
                const isOpen = openCategories.includes(category);
                
                return (
                  <div key={category} className="border-t border-accent/30">
                    {/* Category Header */}
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="w-full py-4 text-center"
                    >
                      <h2 className="text-xl lg:text-2xl font-bold tracking-widest text-accent uppercase">
                        {category === "КУХНЯ" ? (
                          <span className="flex items-center justify-center gap-2">
                            КУХНЯ
                            <span className="text-xs font-normal text-white/50 italic">Oregano&apos;s</span>
                          </span>
                        ) : (
                          category
                        )}
                      </h2>
                    </button>

                    {/* Category Content */}
                    {isOpen && items.length > 0 && (
                      <div className="pb-8 animate-fade-in">
                        {category === "КАЛЬЯНЫ" ? (
                          <>
                            {/* Menu Note */}
                            <div className="mb-8 text-xs text-accent/80 leading-relaxed">
                              <p>Ограничение времени бронирования стола — 2 часа.</p>
                              <p>Отсчёт времени начинается с момента подачи кальяна.</p>
                              <p>Цена на кальянное меню должна быть закрыта полностью.</p>
                              <p>Количество кальянов и персон в чеке — 1 Hookah / 1 Guests / Hookah</p>
                            </div>

                            {/* Hookah items with icons */}
                            <div className="space-y-3">
                              {items.filter(item => item.icons).map((item) => (
                                <div key={item.id} className="flex items-center justify-between text-white border-t border-white/10 pt-3">
                                  <div className="flex items-center gap-4">
                                    <span className="text-white/90">
                                      {item.name === "1-3 ЧЕЛОВЕКА" && "1-2"}
                                      {item.name === "4-6 ЧЕЛОВЕК" && "3-4"}
                                      {item.name === "7-9 ЧЕЛОВЕК" && "5-6"}
                                    </span>
                                    <span className="flex gap-1 text-accent">
                                      {Array.from({ length: item.icons || 1 }).map((_, i) => (
                                        <HookahIcon key={i} />
                                      ))}
                                    </span>
                                    <span className="flex gap-1 text-white/70">
                                      {Array.from({ length: item.icons || 1 }).map((_, i) => (
                                        <PersonIcon key={i} />
                                      ))}
                                    </span>
                                  </div>
                                  <span className="text-accent font-medium">{item.price}</span>
                                </div>
                              ))}
                            </div>

                            {/* Professional items */}
                            <div className="mt-8 space-y-3">
                              <div className="flex items-center justify-between text-white border-t border-white/10 pt-3">
                                <span className="font-medium">Professional</span>
                                <span className="text-accent font-medium">3 200</span>
                              </div>
                              
                              {/* Flavor list */}
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-white">ZEN BASIC</span>
                                  <p className="text-white/50 text-xs">Ром / Грецкий орех / Мандарин</p>
                                </div>
                                <div>
                                  <span className="text-white">Morning time / ZEN VOGA</span>
                                  <p className="text-white/50 text-xs">Игристое / Персик / Лаванда</p>
                                </div>
                                <div>
                                  <span className="text-white">JADE BRANCH</span>
                                  <p className="text-white/50 text-xs">Банан / Шоколад / Грейпфрут / Роза</p>
                                </div>
                              </div>
                            </div>

                            {/* Special items */}
                            <div className="mt-8 space-y-3">
                              <div className="flex items-center justify-between text-white border-t border-white/10 pt-3">
                                <span>Grapefruit</span>
                                <span className="text-accent font-medium">3 900</span>
                              </div>
                              <div className="flex items-center justify-between text-white">
                                <span>DEUS PERFUME</span>
                                <span className="text-accent font-medium">4 400</span>
                              </div>
                              <div className="flex items-center justify-between text-white">
                                <span>DEUS PERFUME MIX</span>
                                <span className="text-accent font-medium">3 400</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          // Other categories - grouped by subcategory
                          <div className="space-y-8">
                            {Object.entries(groupBySubcategory(items)).map(([subcategory, subItems]) => (
                              <div key={subcategory}>
                                {subcategory && (
                                  <h3 className="text-sm font-medium tracking-wider text-accent mb-4 uppercase border-b border-accent/30 pb-2">
                                    {subcategory}
                                  </h3>
                                )}
                                <div className="space-y-2">
                                  {subItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between text-white">
                                      <div>
                                        <span>{item.name}</span>
                                        {item.description && (
                                          <p className="text-white/50 text-xs">{item.description}</p>
                                        )}
                                      </div>
                                      <span className="text-accent font-medium ml-4 flex-shrink-0">
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ContactInfo siteData={siteData} />
      </section>
    </>
  );
};
