import { X } from "lucide-react";

interface LocationModalProps {
  onClose: () => void;
}

export const LocationModal = ({ onClose }: LocationModalProps) => {
  const yandexMapUrl =
    "https://yandex.ru/map-widget/v1/?ll=37.5084%2C55.6644&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjkyNTc0NxIr0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINC_0YDQvtGB0L_QtdC60YIg0JLQtdGA0L3QsNC00YHQutC-0LPQviwgODbQkdGBMSIKDYxEFkIVU1BeQg%2C%2C&z=14&pt=37.5084,55.6644,pm2rdl";

  return (
    <div className="fixed inset-0 z-50 bg-[#4a2c2c]">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
      >
        <X size={32} strokeWidth={1.5} />
      </button>

      {/* Map - Fullscreen */}
      <div className="w-full h-full">
        <iframe
          src={yandexMapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title="Карта - Как добраться до Baza"
          className="w-full h-full"
          style={{ border: 0 }}
        />

        {/* Ссылка на Яндекс Карты */}
        <a
          href="https://yandex.ru/maps/-/CHuh7W0S"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/95 hover:bg-white px-4 py-2 rounded shadow-lg transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-500"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="currentColor"
            />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
          <span className="text-gray-800 font-medium text-sm">
            Открыть в Яндекс Картах
          </span>
        </a>
      </div>
    </div>
  );
};