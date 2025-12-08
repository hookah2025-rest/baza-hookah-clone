import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  getSiteData, 
  saveSiteData, 
  SiteData, 
  MenuItem, 
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
  List 
} from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({
    name: "",
    price: "",
    category: "Кальяны",
    subcategory: "",
  });
  const [newGalleryImage, setNewGalleryImage] = useState({ url: "", alt: "" });
  const [newRule, setNewRule] = useState({ text: "" });

  const handleSave = () => {
    saveSiteData(siteData);
    toast.success("Данные сохранены!");
    // Dispatch storage event for other tabs
    window.dispatchEvent(new Event('storage'));
  };

  const handleGeneralChange = (field: keyof SiteData, value: string) => {
    setSiteData({ ...siteData, [field]: value });
  };

  // Menu handlers
  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.price) {
      toast.error("Заполните название и цену");
      return;
    }
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: newMenuItem.name,
      price: newMenuItem.price,
      category: newMenuItem.category || "Кальяны",
      subcategory: newMenuItem.subcategory,
    };
    setSiteData({ ...siteData, menu: [...siteData.menu, newItem] });
    setNewMenuItem({ name: "", price: "", category: "Кальяны", subcategory: "" });
    toast.success("Позиция добавлена");
  };

  const handleDeleteMenuItem = (id: string) => {
    setSiteData({ ...siteData, menu: siteData.menu.filter((item) => item.id !== id) });
    toast.success("Позиция удалена");
  };

  const handleMenuItemChange = (id: string, field: keyof MenuItem, value: string) => {
    setSiteData({
      ...siteData,
      menu: siteData.menu.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
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

  const menuCategories = ["Кальяны", "Напитки", "Кухня", "Алкоголь"];

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
          <Button onClick={handleSave} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <Save className="w-4 h-4" />
            Сохранить
          </Button>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management */}
          <TabsContent value="menu">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Добавить позицию</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                    value={newMenuItem.category}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {menuCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <Input
                    placeholder="Подкатегория"
                    value={newMenuItem.subcategory}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, subcategory: e.target.value })}
                  />
                  <Button onClick={handleAddMenuItem} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {menuCategories.map((category) => {
              const categoryItems = siteData.menu.filter((item) => item.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <Card key={category} className="mb-4">
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categoryItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">
                          <Input
                            value={item.name}
                            onChange={(e) => handleMenuItemChange(item.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            value={item.price}
                            onChange={(e) => handleMenuItemChange(item.id, "price", e.target.value)}
                            className="w-32"
                          />
                          <Input
                            value={item.subcategory || ""}
                            onChange={(e) => handleMenuItemChange(item.id, "subcategory", e.target.value)}
                            placeholder="Подкатегория"
                            className="w-40"
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
