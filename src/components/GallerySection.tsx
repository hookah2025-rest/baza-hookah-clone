import { useState } from "react";
import { SiteData } from "@/data/siteData";
import { X } from "lucide-react";

interface GallerySectionProps {
  siteData: SiteData;
}

export const GallerySection = ({ siteData }: GallerySectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center mb-12">
          ГАЛЕРЕЯ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteData.gallery.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
};
