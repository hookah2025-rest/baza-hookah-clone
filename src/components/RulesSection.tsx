import { SiteData } from "@/data/siteData";
import { Header } from "./Header";
import { ContactInfo } from "./ContactInfo";
import { useState } from "react";
import { X } from "lucide-react";

interface RulesSectionProps {
  siteData: SiteData;
}

export const RulesSection = ({ siteData }: RulesSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <section id="rules" className="min-h-screen flex flex-col bg-secondary">
      <Header siteData={siteData} />
      
      <div className="flex-1" />
      
      <ContactInfo siteData={siteData} />

      {/* Rules Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a2c2c]">
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          {/* Modal content */}
          <div className="max-w-4xl mx-auto px-8 py-12 text-center">
            <h2 className="text-2xl font-bold tracking-wider text-white mb-10">
              ПРАВИЛА ЗАВЕДЕНИЯ
            </h2>

            <div className="space-y-4 text-white/90 text-sm leading-relaxed">
              {siteData.rules.map((rule) => (
                <p key={rule.id}>
                  {rule.number}. {rule.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};