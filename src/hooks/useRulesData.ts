import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Rule {
  id: string;
  number: number;
  text: string;
}

export const useRulesData = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("rules")
        .select("id, number, text")
        .order("number");

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error("Error fetching rules:", error);
      toast.error("Ошибка загрузки правил");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const addRule = async (text: string) => {
    const maxNumber = rules.reduce((max, rule) => Math.max(max, rule.number), 0);
    const { data, error } = await supabase
      .from("rules")
      .insert({ text, number: maxNumber + 1 })
      .select()
      .single();

    if (error) {
      toast.error("Ошибка добавления правила");
      return null;
    }

    setRules([...rules, data]);
    toast.success("Правило добавлено");
    return data;
  };

  const updateRule = async (id: string, text: string) => {
    const { error } = await supabase
      .from("rules")
      .update({ text })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления");
      return false;
    }

    setRules(rules.map((rule) => (rule.id === id ? { ...rule, text } : rule)));
    return true;
  };

  const deleteRule = async (id: string) => {
    const { error } = await supabase
      .from("rules")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Ошибка удаления");
      return false;
    }

    // Renumber remaining rules
    const remaining = rules.filter((r) => r.id !== id);
    const renumbered = remaining.map((rule, index) => ({
      ...rule,
      number: index + 1,
    }));

    // Update numbers in database
    for (const rule of renumbered) {
      await supabase.from("rules").update({ number: rule.number }).eq("id", rule.id);
    }

    setRules(renumbered);
    toast.success("Правило удалено");
    return true;
  };

  return {
    rules,
    loading,
    addRule,
    updateRule,
    deleteRule,
    refetch: fetchRules,
  };
};
