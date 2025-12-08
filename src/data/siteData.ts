export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  subcategory?: string;
  icons?: number; // number of hookah icons to display
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface Rule {
  id: string;
  number: number;
  text: string;
}

export interface SocialLinks {
  instagram: string;
  telegram: string;
  whatsapp: string;
}

export interface SiteData {
  name: string;
  city: string;
  address: string;
  phone: string;
  hoursWeekday: string;
  hoursWeekend: string;
  aboutText: string;
  menuNote: string;
  menu: MenuItem[];
  gallery: GalleryImage[];
  rules: Rule[];
  socialLinks: SocialLinks;
}

export const defaultSiteData: SiteData = {
  name: "BAZA",
  city: "МОСКВА",
  address: "ПРОСПЕКТ ВЕРНАДСКОГО, 86Бс1, 3 ЭТАЖ",
  phone: "+7 964 526 75 55",
  hoursWeekday: "ПН — ЧТ    12:00—02:00",
  hoursWeekend: "ПТ — ВС    12:00—04:00",
  aboutText: "Данная страница находится в разработке в виду чрезмерной скромности одной части команды и колоссального самомнения другой. Пока спорим.",
  menuNote: "Ограничение времени бронирования стола - 2 часа.\nОтсчёт времени начинается с момента подачи кальяна.\nЦена и количество не меняются в зависимости от того,\nкурит гость или нет.\n\nЕсли Вам не понравился кальян, наши мастера могут поменять\nего в первые 10 минут после его подачи.",
  socialLinks: {
    instagram: "https://instagram.com",
    telegram: "https://t.me",
    whatsapp: "https://wa.me/79645267555"
  },
  menu: [
    // Кальяны
    { id: "1", name: "1-3 ЧЕЛОВЕКА", price: "1800", category: "Кальяны", icons: 1 },
    { id: "2", name: "4-6 ЧЕЛОВЕК", price: "3600", category: "Кальяны", icons: 2 },
    { id: "3", name: "7-9 ЧЕЛОВЕК", price: "5400", category: "Кальяны", icons: 3 },
    { id: "4", name: "ГРЕЙПФРУТ", price: "2200", category: "Кальяны" },
    
    // Напитки - Чай
    { id: "10", name: "Чёрный чай", price: "350 / 700", category: "Напитки", subcategory: "Чай" },
    { id: "11", name: "Зелёный чай", price: "350 / 700", category: "Напитки", subcategory: "Чай" },
    { id: "12", name: "Облепиховый чай", price: "350 / 700", category: "Напитки", subcategory: "Чай" },
    { id: "13", name: "Имбирный чай", price: "350 / 700", category: "Напитки", subcategory: "Чай" },
    
    // Напитки - Лимонады
    { id: "20", name: "Классический лимонад", price: "500", category: "Напитки", subcategory: "Лимонады" },
    { id: "21", name: "Клубничный лимонад", price: "500", category: "Напитки", subcategory: "Лимонады" },
    { id: "22", name: "Манго лимонад", price: "500", category: "Напитки", subcategory: "Лимонады" },
    
    // Напитки - Кофе
    { id: "30", name: "Эспрессо", price: "250", category: "Напитки", subcategory: "Кофе" },
    { id: "31", name: "Американо", price: "250", category: "Напитки", subcategory: "Кофе" },
    { id: "32", name: "Капучино", price: "300", category: "Напитки", subcategory: "Кофе" },
    { id: "33", name: "Латте", price: "350", category: "Напитки", subcategory: "Кофе" },
    { id: "34", name: "Раф", price: "350", category: "Напитки", subcategory: "Кофе" },
    
    // Кухня - Паста
    { id: "40", name: "Курица в томатном соусе", price: "520", category: "Кухня", subcategory: "Паста" },
    { id: "41", name: "Карбонара с беконом/индейка", price: "560", category: "Кухня", subcategory: "Паста" },
    { id: "42", name: "Болоньезе", price: "560", category: "Кухня", subcategory: "Паста" },
    { id: "43", name: "Сливочно-устричная с курицей", price: "540", category: "Кухня", subcategory: "Паста" },
    { id: "44", name: "Арабьята", price: "540", category: "Кухня", subcategory: "Паста" },
    { id: "45", name: "Алио и олио с креветкой", price: "690", category: "Кухня", subcategory: "Паста" },
    { id: "46", name: "Страчателла и томаты", price: "620", category: "Кухня", subcategory: "Паста" },
    { id: "47", name: "Альфредо", price: "520", category: "Кухня", subcategory: "Паста" },
    { id: "48", name: "Сливочная с морепродуктами", price: "790", category: "Кухня", subcategory: "Паста" },
    { id: "49", name: "Грибная с трюфельным маслом", price: "620", category: "Кухня", subcategory: "Паста" },
    { id: "50", name: "Блю чиз с грецким орехом", price: "590", category: "Кухня", subcategory: "Паста" },
    { id: "51", name: "С тушенным мясом", price: "720", category: "Кухня", subcategory: "Паста" },
    
    // Кухня - Пицца
    { id: "60", name: "Маргарита", price: "490/690", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "61", name: "Четыре сыра", price: "540/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "62", name: "Пепперони", price: "540/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "63", name: "Грибная с трюфельным маслом", price: "540/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "64", name: "Цезарь с курицей", price: "590/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "65", name: "Цыпленок песто", price: "590/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "66", name: "Ветчина и грибы", price: "540/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "67", name: "Пицца карбонара с индейкой", price: "590/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "68", name: "Пицца карбонара с беконом", price: "590/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "69", name: "Горгонзола, груша", price: "540/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    { id: "70", name: "Болоньезе с холопеньо", price: "590/790", category: "Кухня", subcategory: "Пицца 22см/28см" },
    
    // Кухня - Салаты
    { id: "80", name: "Цезарь с курицей", price: "620", category: "Кухня", subcategory: "Салаты" },
    { id: "81", name: "Цезарь с креветками", price: "730", category: "Кухня", subcategory: "Салаты" },
    { id: "82", name: "Греческий", price: "590", category: "Кухня", subcategory: "Салаты" },
    { id: "83", name: "Панцанелла, томаты", price: "690", category: "Кухня", subcategory: "Салаты" },
    
    // Кухня - Супы
    { id: "90", name: "Крем-суп с шампиньонами", price: "490", category: "Кухня", subcategory: "Супы" },
    
    // Алкоголь - Пиво и сидр
    { id: "100", name: "Bud", price: "300", category: "Алкоголь", subcategory: "Пиво и сидр 440мл" },
    { id: "101", name: "Hoegaarden", price: "300", category: "Алкоголь", subcategory: "Пиво и сидр 440мл" },
    { id: "102", name: "Krushovice", price: "300", category: "Алкоголь", subcategory: "Пиво и сидр 450мл" },
    { id: "103", name: "Spaten", price: "350", category: "Алкоголь", subcategory: "Пиво и сидр 440мл" },
    { id: "104", name: "Corona Extra", price: "400", category: "Алкоголь", subcategory: "Пиво и сидр 330мл" },
    { id: "105", name: "Clausthaler", price: "400", category: "Алкоголь", subcategory: "Пиво и сидр 330мл" },
    { id: "106", name: "Double Tree", price: "350", category: "Алкоголь", subcategory: "Пиво и сидр 450мл" },
    { id: "107", name: "White Phoenix", price: "350", category: "Алкоголь", subcategory: "Пиво и сидр 450мл" },
  ],
  gallery: [
    { id: "1", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600", alt: "Интерьер бара" },
    { id: "2", url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600", alt: "Зона отдыха" },
    { id: "3", url: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=1600", alt: "Кальяны" },
    { id: "4", url: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=1600", alt: "Атмосфера" },
    { id: "5", url: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=1600", alt: "Лаунж зона" },
    { id: "6", url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1600", alt: "Бар" },
  ],
  rules: [
    { id: "1", number: 1, text: "В нашем заведении не допускается пребывание лиц младше 18 лет. Мы в праве попросить вас показать оригинальный документ, удостоверяющий личность (паспорт, водительское удостоверение)." },
    { id: "2", number: 2, text: "Мы имеем право отказать гостям, находящимся в состоянии алкогольного или наркотического опьянения, в посещении нашего заведения." },
    { id: "3", number: 3, text: "Заказ кальяна в нашем заведении обязателен. Для того, чтобы вы могли полноценно наслаждаться вкусом и качеством табака, время курения составляет 2 часа с момента подачи кальяна. По истечении установленного времени мы предложим вам новый кальян." },
    { id: "4", number: 4, text: "Со своими безалкогольным напитками, пивом и сидром к нам нельзя. Если вы пришли со своими напитками, мы попросим вас оставить их у администратора, при расчете вернем их вам обратно. На алкогольную продукцию предусмотрен пробковый сбор. На пробку алкоголя свыше 30 градусов - 500р, на пробку алкоголя ниже 30 градусов - 300р." },
    { id: "5", number: 5, text: "В целях безопасности в нашем заведении ведётся видеонаблюдение." },
    { id: "6", number: 6, text: "Недопустимо использование сигарет, сигар, сигарилл, электронных испарителей и электронных систем нагревания табака (IQOS, GLO)." },
    { id: "7", number: 7, text: "На территории запрещены азартные игры." },
    { id: "8", number: 8, text: "В случае порчи имущества заведение имеет право потребовать материальную компенсацию в виде денежных средств." },
    { id: "9", number: 9, text: "За аренду вип-комнаты взимается депозит - 3000 рублей в час." },
    { id: "10", number: 10, text: "За аренду PlayStation 5 взимается депозит - 300 рублей в час." },
  ],
};

// Simple state management using localStorage
export const getSiteData = (): SiteData => {
  const stored = localStorage.getItem('siteData');
  if (stored) {
    return JSON.parse(stored);
  }
  return defaultSiteData;
};

export const saveSiteData = (data: SiteData): void => {
  localStorage.setItem('siteData', JSON.stringify(data));
};