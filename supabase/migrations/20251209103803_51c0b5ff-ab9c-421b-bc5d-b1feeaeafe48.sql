-- Clear existing menu data and insert new
DELETE FROM public.menu_items;
DELETE FROM public.menu_categories;

-- Insert categories with auto-generated UUIDs
INSERT INTO public.menu_categories (name, sort_order, note) VALUES
  ('КАЛЬЯНЫ', 1, 'Ограничение времени бронирования стола - 2 часа.
Отсчёт времени начинается с момента подачи кальяна.
Цена и количество не меняются в зависимости от того,
курит гость или нет.

Если Вам не понравился кальян, наши мастера могут поменять
его в первые 10 минут после его подачи.'),
  ('НАПИТКИ', 2, NULL),
  ('КУХНЯ', 3, NULL),
  ('АЛКОГОЛЬ', 4, NULL);

-- Insert menu items using subqueries to get category IDs
-- КАЛЬЯНЫ items
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, '1-3 ЧЕЛОВЕКА', '1800', NULL, NULL, 1 FROM public.menu_categories WHERE name = 'КАЛЬЯНЫ'
UNION ALL SELECT id, '4-6 ЧЕЛОВЕКА', '3600', NULL, NULL, 2 FROM public.menu_categories WHERE name = 'КАЛЬЯНЫ'
UNION ALL SELECT id, '7-9 ЧЕЛОВЕКА', '5400', NULL, NULL, 3 FROM public.menu_categories WHERE name = 'КАЛЬЯНЫ'
UNION ALL SELECT id, 'ГРЕЙПФРУТ', '2200', NULL, NULL, 4 FROM public.menu_categories WHERE name = 'КАЛЬЯНЫ';

-- НАПИТКИ - ЛИМОНАДЫ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Фейхоа иланг-иланг', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 10 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Слива рислинг', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 11 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Ананас лемонграсс', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 12 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Черника лаванда', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 13 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Вишня шисо', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 14 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Ежевика гранат', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 15 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Ладан кокос', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 16 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Фуджи сакура', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 17 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Манго маракуйя', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 18 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Кактус ренет', '350 / 700', 'ЛИМОНАДЫ', '300/1000мл', 19 FROM public.menu_categories WHERE name = 'НАПИТКИ';

-- НАПИТКИ - КЛАССИЧЕСКИЕ ЧАИ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Ассам', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 20 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Те Гуань Инь', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 21 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Молочный улун', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 22 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Жасминовый чай', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 23 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Да Хун Пао', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 24 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Пуэр', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 25 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Эрл Грей', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 26 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Сенча', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 27 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Габа', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 28 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Вишнёвый пуэр', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 29 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Гречишный чай', '500', 'КЛАССИЧЕСКИЕ ЧАИ', '1000мл', 30 FROM public.menu_categories WHERE name = 'НАПИТКИ';

-- НАПИТКИ - ЧАИ ИЗ ЯГОД И ФРУКТОВ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Облепиховый чай', '700', 'ЧАИ ИЗ ЯГОД И ФРУКТОВ', '1000мл', 31 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Лесные ягоды', '700', 'ЧАИ ИЗ ЯГОД И ФРУКТОВ', '1000мл', 32 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Чёрная смородина', '700', 'ЧАИ ИЗ ЯГОД И ФРУКТОВ', '1000мл', 33 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Имбирно-лимонный чай', '700', 'ЧАИ ИЗ ЯГОД И ФРУКТОВ', '1000мл', 34 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Масала', '700', 'ЧАИ ИЗ ЯГОД И ФРУКТОВ', '1000мл', 35 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Вишнёвый чай', '700', 'ЧАИ ИЗ ЯГОД И ФРУКТОВ', '1000мл', 36 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Мандариновый чай', '700', 'ЧАИ ИЗ ЯГОД И ФРУКТОВ', '1000мл', 37 FROM public.menu_categories WHERE name = 'НАПИТКИ';

-- НАПИТКИ - КОФЕ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Американо', '250', 'КОФЕ', '200мл', 40 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Эспрессо', '250', 'КОФЕ', '40мл', 41 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Капучино', '300', 'КОФЕ', '380мл', 42 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Латте', '300', 'КОФЕ', '380мл', 43 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Какао с маршмеллоу', '300', 'КОФЕ', '380мл', 44 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Флэт Уайт', '300', 'КОФЕ', '380мл', 45 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Эспрессо-тоник', '300', 'КОФЕ', '380мл', 46 FROM public.menu_categories WHERE name = 'НАПИТКИ';

-- НАПИТКИ - НАПИТКИ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Coca-Cola', '250', 'НАПИТКИ', '330мл', 50 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Red Bull', '350', 'НАПИТКИ', '250мл', 51 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Jermuk', '250', 'НАПИТКИ', '500мл', 52 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Тоник', '250', 'НАПИТКИ', '330мл', 53 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Сок', '250', 'НАПИТКИ', '200мл', 54 FROM public.menu_categories WHERE name = 'НАПИТКИ'
UNION ALL SELECT id, 'Вода б/г', '250', 'НАПИТКИ', '500мл', 55 FROM public.menu_categories WHERE name = 'НАПИТКИ';

-- КУХНЯ - ПАСТА
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Курица в томатном соусе', '520', 'ПАСТА', NULL, 60 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Карбонара с беконом/индейка', '560', 'ПАСТА', NULL, 61 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Болоньезе', '560', 'ПАСТА', NULL, 62 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Сливочно-устричная с курицей', '540', 'ПАСТА', NULL, 63 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Арабьята', '500', 'ПАСТА', NULL, 64 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Алио е олио с креветкой', '690', 'ПАСТА', NULL, 65 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Страчателла и томаты', '690', 'ПАСТА', NULL, 66 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Альфредо', '620', 'ПАСТА', NULL, 67 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Сливочная с морепродуктами', '520', 'ПАСТА', NULL, 68 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Грибная с трюфельным маслом', '790', 'ПАСТА', NULL, 69 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Блю чиз с грецким орехом', '620', 'ПАСТА', NULL, 70 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С тушеным мясом', '590', 'ПАСТА', NULL, 71 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- КУХНЯ - ДОПОЛНИТЬ ВАШУ ПАСТУ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Бекон', '150', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 75 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Индейка', '150', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 76 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Курица', '150', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 77 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Пармезан', '120', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 78 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Пепперони', '90', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 79 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Моцарелла', '150', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 80 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Страчателла', '150', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 81 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Креветки', '280', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 82 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Грибы', '280', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 83 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Черри', '90', 'ДОПОЛНИТЬ ВАШУ ПАСТУ', NULL, 84 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- КУХНЯ - ПИЦЦА
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Маргарита', '490/690', 'ПИЦЦА', '22см/28см', 90 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Четыре сыра', '540/790', 'ПИЦЦА', '22см/28см', 91 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Пепперони', '540/790', 'ПИЦЦА', '22см/28см', 92 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Грибная с трюфельным маслом', '540/790', 'ПИЦЦА', '22см/28см', 93 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Цезарь с курицей', '590/790', 'ПИЦЦА', '22см/28см', 94 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Цыплёнок песто', '590/790', 'ПИЦЦА', '22см/28см', 95 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Ветчина и грибы', '590/790', 'ПИЦЦА', '22см/28см', 96 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Пицца карбонара с индейкой', '540/790', 'ПИЦЦА', '22см/28см', 97 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Пицца карбонара с беконом', '590/790', 'ПИЦЦА', '22см/28см', 98 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Горгонзола, груша', '540/790', 'ПИЦЦА', '22см/28см', 99 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Болоньезе с холопеньо', '590/790', 'ПИЦЦА', '22см/28см', 100 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- КУХНЯ - САЛАТЫ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Цезарь с курицей', '620', 'САЛАТЫ', NULL, 105 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Цезарь с креветками', '730', 'САЛАТЫ', NULL, 106 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Греческий', '590', 'САЛАТЫ', NULL, 107 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Панцанелла, томаты', '690', 'САЛАТЫ', NULL, 108 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- КУХНЯ - СУПЫ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Крем-суп с шампиньонами', '490', 'СУПЫ', NULL, 110 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- КУХНЯ - НИОККИ
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Блю Чиз с грецким орехом', '640', 'НИОККИ', NULL, 115 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Грибная с трюфельным маслом', '640', 'НИОККИ', NULL, 116 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Курица, грибы', '640', 'НИОККИ', NULL, 117 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С морепродуктами', '790', 'НИОККИ', NULL, 118 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С овощами', '590', 'НИОККИ', NULL, 119 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С тушеным мясом', '790', 'НИОККИ', NULL, 120 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- КУХНЯ - РИЗОТТО
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Блю Чиз с грецким орехом', '640', 'РИЗОТТО', NULL, 125 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Грибная с трюфельным маслом', '640', 'РИЗОТТО', NULL, 126 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'Курица, грибы', '640', 'РИЗОТТО', NULL, 127 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С морепродуктами', '790', 'РИЗОТТО', NULL, 128 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С овощами', '590', 'РИЗОТТО', NULL, 129 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С тушеным мясом', '790', 'РИЗОТТО', NULL, 130 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- КУХНЯ - ФОКАЧЧА
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'С томатами и красным луком', '340', 'ФОКАЧЧА', NULL, 135 FROM public.menu_categories WHERE name = 'КУХНЯ'
UNION ALL SELECT id, 'С пармезаном', '380', 'ФОКАЧЧА', NULL, 136 FROM public.menu_categories WHERE name = 'КУХНЯ';

-- АЛКОГОЛЬ - ПИВО И СИДР
INSERT INTO public.menu_items (category_id, name, price, subcategory, description, sort_order)
SELECT id, 'Bud', '300', 'ПИВО И СИДР', '440мл', 140 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ'
UNION ALL SELECT id, 'Hoegaarden', '300', 'ПИВО И СИДР', '440мл', 141 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ'
UNION ALL SELECT id, 'Krushovice', '300', 'ПИВО И СИДР', '450мл', 142 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ'
UNION ALL SELECT id, 'Spaten', '350', 'ПИВО И СИДР', '440мл', 143 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ'
UNION ALL SELECT id, 'Corona Extra', '400', 'ПИВО И СИДР', '330мл', 144 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ'
UNION ALL SELECT id, 'Clausthaler', '400', 'ПИВО И СИДР', '330мл', 145 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ'
UNION ALL SELECT id, 'Double Tree', '350', 'ПИВО И СИДР', '450мл', 146 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ'
UNION ALL SELECT id, 'White Phoenix', '350', 'ПИВО И СИДР', '450мл', 147 FROM public.menu_categories WHERE name = 'АЛКОГОЛЬ';