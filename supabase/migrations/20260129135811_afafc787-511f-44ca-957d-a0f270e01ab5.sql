-- Добавляем настройку для ссылки на адрес
INSERT INTO public.site_settings (key, value)
VALUES ('addressLink', '')
ON CONFLICT (key) DO NOTHING;