-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to logos
CREATE POLICY "Public can view logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'logos');

-- Allow admins to upload logos
CREATE POLICY "Admins can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'logos' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update logos
CREATE POLICY "Admins can update logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'logos' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete logos
CREATE POLICY "Admins can delete logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'logos' AND has_role(auth.uid(), 'admin'::app_role));

-- Add logo settings to site_settings
INSERT INTO public.site_settings (key, value) VALUES
  ('logo_desktop', ''),
  ('logo_mobile', '')
ON CONFLICT (key) DO NOTHING;