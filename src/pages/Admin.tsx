import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Settings, 
  FileText, 
  Image, 
  List,
  LogOut,
  Edit2,
  FolderPlus,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useMenuData, MenuCategory, MenuItem } from "@/hooks/useMenuData";
import { useSiteSettings, SiteSettings } from "@/hooks/useSiteSettings";
import { useGalleryData, GalleryImage } from "@/hooks/useGalleryData";
import { useRulesData, Rule } from "@/hooks/useRulesData";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableMenuItem } from "@/components/admin/SortableMenuItem";

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  
  // Database hooks
  const {
    categories,
    menuItems,
    loading: menuLoading,
    addCategory,
    updateCategory,
    deleteCategory,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    reorderMenuItems,
  } = useMenuData();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    settings,
    loading: settingsLoading,
    saveAllSettings,
    uploadLogo,
    deleteLogo,
  } = useSiteSettings();

  const {
    images: galleryImages,
    loading: galleryLoading,
    addImage,
    deleteImage,
  } = useGalleryData();

  const {
    rules,
    loading: rulesLoading,
    addRule,
    updateRule,
    deleteRule,
  } = useRulesData();

  // Local state for editing
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [newMenuItem, setNewMenuItem] = useState<{
    name: string;
    price: string;
    category_id: string;
    subcategory: string;
    description: string;
  }>({
    name: "",
    price: "",
    category_id: "",
    subcategory: "",
    description: "",
  });
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [newGalleryImage, setNewGalleryImage] = useState({ url: "", alt: "" });
  const [newRuleText, setNewRuleText] = useState("");

  // Sync local settings when loaded
  useEffect(() => {
    if (!settingsLoading) {
      setLocalSettings(settings);
    }
  }, [settings, settingsLoading]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!authLoading && user && !isAdmin) {
      toast.error("У вас нет прав администратора");
      navigate("/auth");
    }
  }, [authLoading, user, isAdmin, navigate]);

  // Set default category when categories load
  useEffect(() => {
    if (categories.length > 0 && !newMenuItem.category_id) {
      setNewMenuItem((prev) => ({ ...prev, category_id: categories[0].id }));
    }
  }, [categories]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleSaveSettings = async () => {
    await saveAllSettings(localSettings);
  };

  const handleSettingsChange = (field: keyof SiteSettings, value: string) => {
    setLocalSettings({ ...localSettings, [field]: value });
  };

  // Category handlers
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Введите название категории");
      return;
    }
    await addCategory(newCategoryName.trim());
    setNewCategoryName("");
  };

  const handleStartEditCategory = (cat: MenuCategory) => {
    setEditingCategory(cat.id);
    setEditCategoryName(cat.name);
  };

  const handleSaveCategory = async (id: string) => {
    if (!editCategoryName.trim()) {
      toast.error("Введите название категории");
      return;
    }
    await updateCategory(id, { name: editCategoryName.trim() });
    setEditingCategory(null);
    setEditCategoryName("");
  };

  const handleCategoryNoteChange = async (id: string, note: string) => {
    await updateCategory(id, { note });
  };

  const handleDeleteCategory = async (id: string) => {
    const categoryItems = menuItems.filter((item) => item.category_id === id);
    if (categoryItems.length > 0) {
      toast.error("Нельзя удалить категорию с позициями меню");
      return;
    }
    await deleteCategory(id);
  };

  // Menu handlers
  const handleAddMenuItem = async () => {
    if (!newMenuItem.name || !newMenuItem.price || !newMenuItem.category_id) {
      toast.error("Заполните название, цену и выберите категорию");
      return;
    }
    await addMenuItem({
      name: newMenuItem.name,
      price: newMenuItem.price,
      category_id: newMenuItem.category_id,
      subcategory: newMenuItem.subcategory || undefined,
      description: newMenuItem.description || undefined,
    });
    setNewMenuItem({
      name: "",
      price: "",
      category_id: categories[0]?.id || "",
      subcategory: "",
      description: "",
    });
  };

  const handleDeleteMenuItem = async (id: string) => {
    await deleteMenuItem(id);
  };

  const handleMenuItemChange = async (id: string, field: keyof MenuItem, value: string) => {
    await updateMenuItem(id, { [field]: value });
  };

  const handleDragEnd = (categoryId: string) => (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const categoryItems = menuItems
        .filter((item) => item.category_id === categoryId)
        .sort((a, b) => a.sort_order - b.sort_order);
      
      const oldIndex = categoryItems.findIndex((item) => item.id === active.id);
      const newIndex = categoryItems.findIndex((item) => item.id === over.id);

      const reordered = arrayMove(categoryItems, oldIndex, newIndex).map((item, index) => ({
        ...item,
        sort_order: index,
      }));

      reorderMenuItems(categoryId, reordered);
    }
  };

  // Gallery handlers
  const handleAddGalleryImage = async () => {
    if (!newGalleryImage.url) {
      toast.error("Укажите URL изображения");
      return;
    }
    await addImage(newGalleryImage.url, newGalleryImage.alt || "Изображение галереи");
    setNewGalleryImage({ url: "", alt: "" });
  };

  const handleDeleteGalleryImage = async (id: string) => {
    await deleteImage(id);
  };

  // Rules handlers
  const handleAddRule = async () => {
    if (!newRuleText.trim()) {
      toast.error("Введите текст правила");
      return;
    }
    await addRule(newRuleText.trim());
    setNewRuleText("");
  };

  const handleRuleChange = async (id: string, text: string) => {
    await updateRule(id, text);
  };

  const handleDeleteRule = async (id: string) => {
    await deleteRule(id);
  };

  const isLoading = authLoading || menuLoading || settingsLoading || galleryLoading || rulesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-secondary rounded-md transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Админ-панель</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSaveSettings} size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Save className="w-4 h-4" />
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="general" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Общие</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Меню</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Галерея</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="gap-2">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Правила</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Название заведения</label>
                  <Input
                    value={localSettings.name}
                    onChange={(e) => handleSettingsChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Город</label>
                  <Input
                    value={localSettings.city}
                    onChange={(e) => handleSettingsChange("city", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Адрес</label>
                  <Input
                    value={localSettings.address}
                    onChange={(e) => handleSettingsChange("address", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <Input
                    value={localSettings.phone}
                    onChange={(e) => handleSettingsChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Часы работы (будни)</label>
                  <Input
                    value={localSettings.hoursWeekday}
                    onChange={(e) => handleSettingsChange("hoursWeekday", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Часы работы (выходные)</label>
                  <Input
                    value={localSettings.hoursWeekend}
                    onChange={(e) => handleSettingsChange("hoursWeekend", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Текст «О нас»</label>
                  <Textarea
                    value={localSettings.aboutText}
                    onChange={(e) => handleSettingsChange("aboutText", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Логотипы для главной страницы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">ПК</label>
                      {localSettings.logo_home_desktop && (
                        <div className="mb-2 p-4 bg-background rounded border relative">
                          <img src={localSettings.logo_home_desktop} alt="Home Desktop logo" className="h-16 mx-auto" />
                          <button
                            onClick={async () => {
                              await deleteLogo('home_desktop');
                              setLocalSettings(prev => ({ ...prev, logo_home_desktop: '' }));
                            }}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadLogo(file, 'home_desktop');
                            if (url) {
                              setLocalSettings(prev => ({ ...prev, logo_home_desktop: url }));
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Планшет</label>
                      {localSettings.logo_home_tablet && (
                        <div className="mb-2 p-4 bg-background rounded border relative">
                          <img src={localSettings.logo_home_tablet} alt="Home Tablet logo" className="h-16 mx-auto" />
                          <button
                            onClick={async () => {
                              await deleteLogo('home_tablet');
                              setLocalSettings(prev => ({ ...prev, logo_home_tablet: '' }));
                            }}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadLogo(file, 'home_tablet');
                            if (url) {
                              setLocalSettings(prev => ({ ...prev, logo_home_tablet: url }));
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Мобильный</label>
                      {localSettings.logo_home_mobile && (
                        <div className="mb-2 p-4 bg-background rounded border relative">
                          <img src={localSettings.logo_home_mobile} alt="Home Mobile logo" className="h-16 mx-auto" />
                          <button
                            onClick={async () => {
                              await deleteLogo('home_mobile');
                              setLocalSettings(prev => ({ ...prev, logo_home_mobile: '' }));
                            }}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadLogo(file, 'home_mobile');
                            if (url) {
                              setLocalSettings(prev => ({ ...prev, logo_home_mobile: url }));
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Логотипы для хедера (остальные страницы)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">ПК</label>
                      {localSettings.logo_header_desktop && (
                        <div className="mb-2 p-4 bg-background rounded border relative">
                          <img src={localSettings.logo_header_desktop} alt="Header Desktop logo" className="h-16 mx-auto" />
                          <button
                            onClick={async () => {
                              await deleteLogo('header_desktop');
                              setLocalSettings(prev => ({ ...prev, logo_header_desktop: '' }));
                            }}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadLogo(file, 'header_desktop');
                            if (url) {
                              setLocalSettings(prev => ({ ...prev, logo_header_desktop: url }));
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Планшет</label>
                      {localSettings.logo_header_tablet && (
                        <div className="mb-2 p-4 bg-background rounded border relative">
                          <img src={localSettings.logo_header_tablet} alt="Header Tablet logo" className="h-16 mx-auto" />
                          <button
                            onClick={async () => {
                              await deleteLogo('header_tablet');
                              setLocalSettings(prev => ({ ...prev, logo_header_tablet: '' }));
                            }}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadLogo(file, 'header_tablet');
                            if (url) {
                              setLocalSettings(prev => ({ ...prev, logo_header_tablet: url }));
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Мобильный</label>
                      {localSettings.logo_header_mobile && (
                        <div className="mb-2 p-4 bg-background rounded border relative">
                          <img src={localSettings.logo_header_mobile} alt="Header Mobile logo" className="h-16 mx-auto" />
                          <button
                            onClick={async () => {
                              await deleteLogo('header_mobile');
                              setLocalSettings(prev => ({ ...prev, logo_header_mobile: '' }));
                            }}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadLogo(file, 'header_mobile');
                            if (url) {
                              setLocalSettings(prev => ({ ...prev, logo_header_mobile: url }));
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Instagram</label>
                      <Input
                        value={localSettings.instagram}
                        onChange={(e) => handleSettingsChange("instagram", e.target.value)}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Telegram</label>
                      <Input
                        value={localSettings.telegram}
                        onChange={(e) => handleSettingsChange("telegram", e.target.value)}
                        placeholder="https://t.me/..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">WhatsApp</label>
                      <Input
                        value={localSettings.whatsapp}
                        onChange={(e) => handleSettingsChange("whatsapp", e.target.value)}
                        placeholder="https://wa.me/..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management */}
          <TabsContent value="menu">
            {/* Categories Management */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderPlus className="w-5 h-5" />
                  Управление категориями
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Input
                    placeholder="Название новой категории"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddCategory} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <div key={cat.id} className="p-4 bg-secondary/50 rounded-md space-y-3">
                      <div className="flex items-center gap-2">
                        {editingCategory === cat.id ? (
                          <>
                            <Input
                              value={editCategoryName}
                              onChange={(e) => setEditCategoryName(e.target.value)}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => handleSaveCategory(cat.id)}>
                              Сохранить
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingCategory(null)}>
                              Отмена
                            </Button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 font-medium">{cat.name}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleStartEditCategory(cat)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => handleDeleteCategory(cat.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">
                          Примечание к категории
                        </label>
                        <Textarea
                          value={cat.note || ""}
                          onChange={(e) => handleCategoryNoteChange(cat.id, e.target.value)}
                          placeholder="Примечание отображается под позициями этой категории"
                          rows={3}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Menu Item */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Добавить позицию</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <Input
                    placeholder="Название"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                  />
                  <Input
                    placeholder="Цена"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                  />
                  <select
                    value={newMenuItem.category_id}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, category_id: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <Input
                    placeholder="Подкатегория"
                    value={newMenuItem.subcategory}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, subcategory: e.target.value })}
                  />
                  <Input
                    placeholder="Описание"
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                  />
                  <Button onClick={handleAddMenuItem} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items by Category */}
            {categories.map((category) => {
              const categoryItems = menuItems
                .filter((item) => item.category_id === category.id)
                .sort((a, b) => a.sort_order - b.sort_order);
              if (categoryItems.length === 0) return null;

              return (
                <Card key={category.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd(category.id)}
                    >
                      <SortableContext
                        items={categoryItems.map((item) => item.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {categoryItems.map((item) => (
                            <SortableMenuItem
                              key={item.id}
                              item={item}
                              onUpdate={handleMenuItemChange}
                              onDelete={handleDeleteMenuItem}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Добавить изображение</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="URL изображения"
                    value={newGalleryImage.url}
                    onChange={(e) => setNewGalleryImage({ ...newGalleryImage, url: e.target.value })}
                    className="md:col-span-1"
                  />
                  <Input
                    placeholder="Описание (alt)"
                    value={newGalleryImage.alt}
                    onChange={(e) => setNewGalleryImage({ ...newGalleryImage, alt: e.target.value })}
                  />
                  <Button onClick={handleAddGalleryImage} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-video bg-secondary">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground truncate mb-2">{image.alt}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleDeleteGalleryImage(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Удалить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rules Management */}
          <TabsContent value="rules">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Добавить правило</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Textarea
                    placeholder="Текст правила"
                    value={newRuleText}
                    onChange={(e) => setNewRuleText(e.target.value)}
                    className="flex-1"
                    rows={2}
                  />
                  <Button onClick={handleAddRule} className="gap-2 self-end">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список правил</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex gap-4 items-start p-4 bg-secondary/50 rounded-md">
                    <span className="text-accent font-bold text-lg flex-shrink-0 w-8">
                      {rule.number}.
                    </span>
                    <Textarea
                      value={rule.text}
                      onChange={(e) => handleRuleChange(rule.id, e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
