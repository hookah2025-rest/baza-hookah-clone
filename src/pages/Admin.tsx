import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  getSiteData, 
  saveSiteData, 
  SiteData, 
  GalleryImage, 
  Rule 
} from "@/data/siteData";
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
  FolderPlus
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useMenuData, MenuCategory, MenuItem } from "@/hooks/useMenuData";

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
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
  } = useMenuData();
  
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());
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
  const [newRule, setNewRule] = useState({ text: "" });

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

  const handleSave = () => {
    saveSiteData(siteData);
    toast.success("Данные сохранены!");
    window.dispatchEvent(new Event('storage'));
  };

  const handleGeneralChange = (field: keyof SiteData, value: string) => {
    setSiteData({ ...siteData, [field]: value });
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
    await updateCategory(id, editCategoryName.trim());
    setEditingCategory(null);
    setEditCategoryName("");
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

  // Gallery handlers
  const handleAddGalleryImage = () => {
    if (!newGalleryImage.url) {
      toast.error("Укажите URL изображения");
      return;
    }
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: newGalleryImage.url,
      alt: newGalleryImage.alt || "Изображение галереи",
    };
    setSiteData({ ...siteData, gallery: [...siteData.gallery, newImage] });
    setNewGalleryImage({ url: "", alt: "" });
    toast.success("Изображение добавлено");
  };

  const handleDeleteGalleryImage = (id: string) => {
    setSiteData({ ...siteData, gallery: siteData.gallery.filter((img) => img.id !== id) });
    toast.success("Изображение удалено");
  };

  // Rules handlers
  const handleAddRule = () => {
    if (!newRule.text) {
      toast.error("Введите текст правила");
      return;
    }
    const maxNumber = siteData.rules.reduce((max, rule) => Math.max(max, rule.number), 0);
    const newRuleItem: Rule = {
      id: Date.now().toString(),
      number: maxNumber + 1,
      text: newRule.text,
    };
    setSiteData({ ...siteData, rules: [...siteData.rules, newRuleItem] });
    setNewRule({ text: "" });
    toast.success("Правило добавлено");
  };

  const handleDeleteRule = (id: string) => {
    const updatedRules = siteData.rules
      .filter((rule) => rule.id !== id)
      .map((rule, index) => ({ ...rule, number: index + 1 }));
    setSiteData({ ...siteData, rules: updatedRules });
    toast.success("Правило удалено");
  };

  const handleRuleChange = (id: string, text: string) => {
    setSiteData({
      ...siteData,
      rules: siteData.rules.map((rule) =>
        rule.id === id ? { ...rule, text } : rule
      ),
    });
  };

  if (authLoading || menuLoading) {
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
            <Button onClick={handleSave} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Save className="w-4 h-4" />
              Сохранить
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
                    value={siteData.name}
                    onChange={(e) => handleGeneralChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Город</label>
                  <Input
                    value={siteData.city}
                    onChange={(e) => handleGeneralChange("city", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Адрес</label>
                  <Input
                    value={siteData.address}
                    onChange={(e) => handleGeneralChange("address", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <Input
                    value={siteData.phone}
                    onChange={(e) => handleGeneralChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Часы работы (будни)</label>
                  <Input
                    value={siteData.hoursWeekday}
                    onChange={(e) => handleGeneralChange("hoursWeekday", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Часы работы (выходные)</label>
                  <Input
                    value={siteData.hoursWeekend}
                    onChange={(e) => handleGeneralChange("hoursWeekend", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Текст «О нас»</label>
                  <Textarea
                    value={siteData.aboutText}
                    onChange={(e) => handleGeneralChange("aboutText", e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Примечание к меню</label>
                  <Textarea
                    value={siteData.menuNote}
                    onChange={(e) => handleGeneralChange("menuNote", e.target.value)}
                    rows={4}
                  />
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
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">
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
              const categoryItems = menuItems.filter((item) => item.category_id === category.id);
              if (categoryItems.length === 0) return null;

              return (
                <Card key={category.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categoryItems.map((item) => (
                        <div key={item.id} className="flex flex-wrap items-center gap-2 p-2 bg-secondary/50 rounded-md">
                          <Input
                            value={item.name}
                            onChange={(e) => handleMenuItemChange(item.id, "name", e.target.value)}
                            className="flex-1 min-w-[150px]"
                            placeholder="Название"
                          />
                          <Input
                            value={item.price}
                            onChange={(e) => handleMenuItemChange(item.id, "price", e.target.value)}
                            className="w-24"
                            placeholder="Цена"
                          />
                          <Input
                            value={item.subcategory || ""}
                            onChange={(e) => handleMenuItemChange(item.id, "subcategory", e.target.value)}
                            placeholder="Подкатегория"
                            className="w-32"
                          />
                          <Input
                            value={item.description || ""}
                            onChange={(e) => handleMenuItemChange(item.id, "description", e.target.value)}
                            placeholder="Описание"
                            className="flex-1 min-w-[150px]"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteMenuItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
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
              {siteData.gallery.map((image) => (
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
                    value={newRule.text}
                    onChange={(e) => setNewRule({ text: e.target.value })}
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
                {siteData.rules.map((rule) => (
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
