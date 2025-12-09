-- Create site_settings table for general settings
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings
CREATE POLICY "Anyone can view settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Admins can manage settings
CREATE POLICY "Admins can manage settings"
ON public.site_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url text NOT NULL,
  alt text NOT NULL DEFAULT 'Изображение галереи',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view gallery
CREATE POLICY "Anyone can view gallery"
ON public.gallery_images
FOR SELECT
USING (true);

-- Admins can manage gallery
CREATE POLICY "Admins can manage gallery"
ON public.gallery_images
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create rules table
CREATE TABLE public.rules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  number integer NOT NULL,
  text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rules ENABLE ROW LEVEL SECURITY;

-- Anyone can view rules
CREATE POLICY "Anyone can view rules"
ON public.rules
FOR SELECT
USING (true);

-- Admins can manage rules
CREATE POLICY "Admins can manage rules"
ON public.rules
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at on site_settings
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_menu_items_updated_at();

-- Create trigger for updated_at on rules
CREATE TRIGGER update_rules_updated_at
BEFORE UPDATE ON public.rules
FOR EACH ROW
EXECUTE FUNCTION public.update_menu_items_updated_at();

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
('name', 'BAZA'),
('city', 'МОСКВА'),
('address', 'ПРОСПЕКТ ВЕРНАДСКОГО, 86Бс1, 3 ЭТАЖ'),
('phone', '+7 964 526 75 55'),
('hoursWeekday', 'ПН — ЧТ    12:00—02:00'),
('hoursWeekend', 'ПТ — ВС    12:00—04:00'),
('aboutText', 'Данная страница находится в разработке в виду чрезмерной скромности одной части команды и колоссального самомнения другой. Пока спорим.'),
('menuNote', 'Ограничение времени бронирования стола - 2 часа.
Отсчёт времени начинается с момента подачи кальяна.
Цена и количество не меняются в зависимости от того,
курит гость или нет.

Если Вам не понравился кальян, наши мастера могут поменять
его в первые 10 минут после его подачи.'),
('instagram', 'https://instagram.com'),
('telegram', 'https://t.me'),
('whatsapp', 'https://wa.me/79645267555');

-- Insert default gallery images
INSERT INTO public.gallery_images (url, alt, sort_order) VALUES
('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600', 'Интерьер бара', 1),
('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600', 'Зона отдыха', 2),
('https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=1600', 'Кальяны', 3),
('https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=1600', 'Атмосфера', 4),
('https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=1600', 'Лаунж зона', 5),
('https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1600', 'Бар', 6);

-- Insert default rules
INSERT INTO public.rules (number, text) VALUES
(1, 'В нашем заведении не допускается пребывание лиц младше 18 лет. Мы в праве попросить вас показать оригинальный документ, удостоверяющий личность (паспорт, водительское удостоверение).'),
(2, 'Мы имеем право отказать гостям, находящимся в состоянии алкогольного или наркотического опьянения, в посещении нашего заведения.'),
(3, 'Заказ кальяна в нашем заведении обязателен. Для того, чтобы вы могли полноценно наслаждаться вкусом и качеством табака, время курения составляет 2 часа с момента подачи кальяна. По истечении установленного времени мы предложим вам новый кальян.'),
(4, 'Со своими безалкогольным напитками, пивом и сидром к нам нельзя. Если вы пришли со своими напитками, мы попросим вас оставить их у администратора, при расчете вернем их вам обратно. На алкогольную продукцию предусмотрен пробковый сбор. На пробку алкоголя свыше 30 градусов - 500р, на пробку алкоголя ниже 30 градусов - 300р.'),
(5, 'В целях безопасности в нашем заведении ведётся видеонаблюдение.'),
(6, 'Недопустимо использование сигарет, сигар, сигарилл, электронных испарителей и электронных систем нагревания табака (IQOS, GLO).'),
(7, 'На территории запрещены азартные игры.'),
(8, 'В случае порчи имущества заведение имеет право потребовать материальную компенсацию в виде денежных средств.'),
(9, 'За аренду вип-комнаты взимается депозит - 3000 рублей в час.'),
(10, 'За аренду PlayStation 5 взимается депозит - 300 рублей в час.');