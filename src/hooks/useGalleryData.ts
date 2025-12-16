import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  sort_order: number;
}

export const useGalleryData = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order");

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Ошибка загрузки галереи");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (file: File, alt: string) => {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      const maxOrder = images.reduce((max, img) => Math.max(max, img.sort_order), 0);
      const { data, error } = await supabase
        .from("gallery_images")
        .insert({ url: publicUrl, alt, sort_order: maxOrder + 1 })
        .select()
        .single();

      if (error) throw error;

      setImages([...images, data]);
      toast.success("Изображение добавлено");
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Ошибка загрузки изображения");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const addImage = async (url: string, alt: string) => {
    const maxOrder = images.reduce((max, img) => Math.max(max, img.sort_order), 0);
    const { data, error } = await supabase
      .from("gallery_images")
      .insert({ url, alt, sort_order: maxOrder + 1 })
      .select()
      .single();

    if (error) {
      toast.error("Ошибка добавления изображения");
      return null;
    }

    setImages([...images, data]);
    toast.success("Изображение добавлено");
    return data;
  };

  const updateImage = async (id: string, updates: Partial<GalleryImage>) => {
    const { error } = await supabase
      .from("gallery_images")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления");
      return false;
    }

    setImages(images.map((img) => (img.id === id ? { ...img, ...updates } : img)));
    return true;
  };

  const deleteImage = async (id: string) => {
    const imageToDelete = images.find((img) => img.id === id);
    
    // Try to delete from storage if it's a Supabase URL
    if (imageToDelete?.url.includes("supabase")) {
      try {
        const urlParts = imageToDelete.url.split("/gallery/");
        if (urlParts[1]) {
          await supabase.storage.from("gallery").remove([urlParts[1]]);
        }
      } catch (error) {
        console.error("Error deleting from storage:", error);
      }
    }

    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Ошибка удаления");
      return false;
    }

    setImages(images.filter((img) => img.id !== id));
    toast.success("Изображение удалено");
    return true;
  };

  return {
    images,
    loading,
    uploading,
    addImage,
    uploadImage,
    updateImage,
    deleteImage,
    refetch: fetchImages,
  };
};
