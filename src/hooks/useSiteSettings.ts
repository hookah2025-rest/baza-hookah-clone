import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SiteSettings {
  name: string;
  city: string;
  address: string;
  phone: string;
  hoursWeekday: string;
  hoursWeekend: string;
  aboutText: string;
  menuNote: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
  // Название и подназвание для главной страницы (если нет логотипа)
  heroTitle: string;
  heroSubtitle: string;
  // Логотипы для главной страницы
  logo_home_desktop: string;
  logo_home_tablet: string;
  logo_home_mobile: string;
  // Логотипы для хедера на остальных страницах
  logo_header_desktop: string;
  logo_header_tablet: string;
  logo_header_mobile: string;
}

const defaultSettings: SiteSettings = {
  name: "BAZA",
  city: "МОСКВА",
  address: "ПРОСПЕКТ ВЕРНАДСКОГО, 86Бс1, 3 ЭТАЖ",
  phone: "+7 964 526 75 55",
  hoursWeekday: "ПН — ЧТ    12:00—02:00",
  hoursWeekend: "ПТ — ВС    12:00—04:00",
  aboutText: "",
  menuNote: "",
  instagram: "",
  telegram: "",
  whatsapp: "",
  heroTitle: "HookahPlace",
  heroSubtitle: "BAZA",
  logo_home_desktop: "",
  logo_home_tablet: "",
  logo_home_mobile: "",
  logo_header_desktop: "",
  logo_header_tablet: "",
  logo_header_mobile: "",
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((item) => {
          settingsMap[item.key] = item.value;
        });

        // Helper to get value - use empty string if key exists with empty value
        const getValue = (key: string, defaultValue: string) => {
          if (key in settingsMap) {
            return settingsMap[key];
          }
          return defaultValue;
        };

        setSettings({
          name: getValue('name', defaultSettings.name),
          city: getValue('city', defaultSettings.city),
          address: getValue('address', defaultSettings.address),
          phone: getValue('phone', defaultSettings.phone),
          hoursWeekday: getValue('hoursWeekday', defaultSettings.hoursWeekday),
          hoursWeekend: getValue('hoursWeekend', defaultSettings.hoursWeekend),
          aboutText: getValue('aboutText', defaultSettings.aboutText),
          menuNote: getValue('menuNote', defaultSettings.menuNote),
          instagram: getValue('instagram', defaultSettings.instagram),
          telegram: getValue('telegram', defaultSettings.telegram),
          whatsapp: getValue('whatsapp', defaultSettings.whatsapp),
          heroTitle: getValue('heroTitle', defaultSettings.heroTitle),
          heroSubtitle: getValue('heroSubtitle', defaultSettings.heroSubtitle),
          logo_home_desktop: getValue('logo_home_desktop', defaultSettings.logo_home_desktop),
          logo_home_tablet: getValue('logo_home_tablet', defaultSettings.logo_home_tablet),
          logo_home_mobile: getValue('logo_home_mobile', defaultSettings.logo_home_mobile),
          logo_header_desktop: getValue('logo_header_desktop', defaultSettings.logo_header_desktop),
          logo_header_tablet: getValue('logo_header_tablet', defaultSettings.logo_header_tablet),
          logo_header_mobile: getValue('logo_header_mobile', defaultSettings.logo_header_mobile),
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Ошибка загрузки настроек");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSetting = async (key: keyof SiteSettings, value: string) => {
    const { error } = await supabase
      .from("site_settings")
      .update({ value })
      .eq("key", key);

    if (error) {
      toast.error("Ошибка сохранения");
      return false;
    }

    setSettings((prev) => ({ ...prev, [key]: value }));
    return true;
  };

  type LogoType = 'home_desktop' | 'home_tablet' | 'home_mobile' | 'header_desktop' | 'header_tablet' | 'header_mobile';

  const uploadLogo = async (file: File, type: LogoType): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `logo_${type}_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('logos')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      toast.error('Ошибка загрузки логотипа');
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('logos')
      .getPublicUrl(fileName);

    // Save URL to settings
    const settingKey = `logo_${type}` as keyof SiteSettings;
    await updateSetting(settingKey, publicUrl);
    
    return publicUrl;
  };

  const deleteLogo = async (type: LogoType): Promise<boolean> => {
    const settingKey = `logo_${type}` as keyof SiteSettings;
    const currentUrl = settings[settingKey];
    
    if (currentUrl) {
      // Extract filename from URL and delete from storage
      const urlParts = currentUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      await supabase.storage.from('logos').remove([fileName]);
    }
    
    // Clear the setting
    const success = await updateSetting(settingKey, '');
    if (success) {
      toast.success('Логотип удалён');
    }
    return success;
  };

  const saveAllSettings = async (newSettings: SiteSettings) => {
    try {
      const updates = Object.entries(newSettings).map(([key, value]) =>
        supabase.from("site_settings").upsert(
          { key, value, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        )
      );

      await Promise.all(updates);
      setSettings(newSettings);
      toast.success("Настройки сохранены");
      return true;
    } catch (error) {
      toast.error("Ошибка сохранения настроек");
      return false;
    }
  };

  return {
    settings,
    loading,
    updateSetting,
    uploadLogo,
    deleteLogo,
    saveAllSettings,
    refetch: fetchSettings,
  };
};
