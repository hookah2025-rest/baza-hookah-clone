-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for gallery bucket
CREATE POLICY "Anyone can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'));