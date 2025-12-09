import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/hooks/useMenuData";

interface SortableMenuItemProps {
  item: MenuItem;
  onUpdate: (id: string, field: keyof MenuItem, value: string) => void;
  onDelete: (id: string) => void;
}

export const SortableMenuItem = ({ item, onUpdate, onDelete }: SortableMenuItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-wrap items-center gap-2 p-2 bg-secondary/50 rounded-md"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-secondary rounded touch-none"
        type="button"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </button>
      <Input
        value={item.name}
        onChange={(e) => onUpdate(item.id, "name", e.target.value)}
        className="flex-1 min-w-[150px]"
        placeholder="Название"
      />
      <Input
        value={item.price}
        onChange={(e) => onUpdate(item.id, "price", e.target.value)}
        className="w-24"
        placeholder="Цена"
      />
      <Input
        value={item.subcategory || ""}
        onChange={(e) => onUpdate(item.id, "subcategory", e.target.value)}
        placeholder="Подкатегория"
        className="w-32"
      />
      <Input
        value={item.description || ""}
        onChange={(e) => onUpdate(item.id, "description", e.target.value)}
        placeholder="Описание"
        className="flex-1 min-w-[150px]"
      />
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(item.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};