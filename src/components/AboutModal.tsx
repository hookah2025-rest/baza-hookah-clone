import { X } from "lucide-react";

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal = ({ onClose }: AboutModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a2c2c]">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
      >
        <X size={32} strokeWidth={1.5} />
      </button>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-8 py-12 text-center">
        <h2 className="text-2xl font-bold tracking-wider text-white mb-10">
          О НАС
        </h2>

        <div className="border border-white/30 p-8 lg:p-12">
          <p className="text-white/90 text-center leading-relaxed text-base lg:text-lg">
            Данная страница находится в разработке
            <br />
            в виду чрезмерной скромности
            <br />
            одной части команды
            <br />
            и колоссального самомнения другой.
            <br />
            Пока спорим.
          </p>
        </div>
      </div>
    </div>
  );
};