import { X } from "lucide-react";
import { SiteData } from "@/data/siteData";

interface RulesModalProps {
  siteData: SiteData;
  onClose: () => void;
}

export const RulesModal = ({ siteData, onClose }: RulesModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a2c2c]">
      {/* Close button */}
      <button
        onClick={onClose}
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
  );
};