import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
  note?: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  price: string;
  subcategory?: string;
  description?: string;
  sort_order: number;
}

export const useMenuData = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        supabase.from("menu_categories").select("*").order("sort_order"),
        supabase.from("menu_items").select("*").order("sort_order"),
      ]);

      if (categoriesRes.error) throw categoriesRes.error;
      if (itemsRes.error) throw itemsRes.error;

      setCategories(categoriesRes.data || []);
      setMenuItems(itemsRes.data || []);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      toast.error("Ошибка загрузки данных меню");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Category operations
  const addCategory = async (name: string) => {
    const maxOrder = categories.reduce((max, cat) => Math.max(max, cat.sort_order), 0);
    const { data, error } = await supabase
      .from("menu_categories")
      .insert({ name, sort_order: maxOrder + 1 })
      .select()
      .single();

    if (error) {
      toast.error("Ошибка добавления категории");
      return null;
    }

    setCategories([...categories, data]);
    toast.success("Категория добавлена");
    return data;
  };

  const updateCategory = async (id: string, updates: Partial<Pick<MenuCategory, 'name' | 'note'>>) => {
    const { error } = await supabase
      .from("menu_categories")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления категории");
      return false;
    }

    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)));
    return true;
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from("menu_categories").delete().eq("id", id);

    if (error) {
      toast.error("Ошибка удаления категории");
      return false;
    }

    setCategories(categories.filter((cat) => cat.id !== id));
    setMenuItems(menuItems.filter((item) => item.category_id !== id));
    toast.success("Категория удалена");
    return true;
  };

  // Menu item operations
  const addMenuItem = async (item: Omit<MenuItem, "id" | "sort_order">) => {
    const maxOrder = menuItems.reduce((max, m) => Math.max(max, m.sort_order), 0);
    const { data, error } = await supabase
      .from("menu_items")
      .insert({ ...item, sort_order: maxOrder + 1 })
      .select()
      .single();

    if (error) {
      toast.error("Ошибка добавления позиции");
      return null;
    }

    setMenuItems([...menuItems, data]);
    toast.success("Позиция добавлена");
    return data;
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    const { error } = await supabase.from("menu_items").update(updates).eq("id", id);

    if (error) {
      toast.error("Ошибка обновления позиции");
      return false;
    }

    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    return true;
  };

  const deleteMenuItem = async (id: string) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) {
      toast.error("Ошибка удаления позиции");
      return false;
    }

    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast.success("Позиция удалена");
    return true;
  };

  return {
    categories,
    menuItems,
    loading,
    refetch: fetchData,
    addCategory,
    updateCategory,
    deleteCategory,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};
