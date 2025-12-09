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

        setSettings({
          name: settingsMap.name || defaultSettings.name,
          city: settingsMap.city || defaultSettings.city,
          address: settingsMap.address || defaultSettings.address,
          phone: settingsMap.phone || defaultSettings.phone,
          hoursWeekday: settingsMap.hoursWeekday || defaultSettings.hoursWeekday,
          hoursWeekend: settingsMap.hoursWeekend || defaultSettings.hoursWeekend,
          aboutText: settingsMap.aboutText || defaultSettings.aboutText,
          menuNote: settingsMap.menuNote || defaultSettings.menuNote,
          instagram: settingsMap.instagram || defaultSettings.instagram,
          telegram: settingsMap.telegram || defaultSettings.telegram,
          whatsapp: settingsMap.whatsapp || defaultSettings.whatsapp,
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

  const saveAllSettings = async (newSettings: SiteSettings) => {
    try {
      const updates = Object.entries(newSettings).map(([key, value]) =>
        supabase.from("site_settings").update({ value }).eq("key", key)
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
    saveAllSettings,
    refetch: fetchSettings,
  };
};
