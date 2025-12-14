-- Insert new logo settings keys
INSERT INTO public.site_settings (key, value)
VALUES 
  ('logo_home_desktop', ''),
  ('logo_home_tablet', ''),
  ('logo_home_mobile', ''),
  ('logo_header_desktop', ''),
  ('logo_header_tablet', ''),
  ('logo_header_mobile', '')
ON CONFLICT (key) DO NOTHING;