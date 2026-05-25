
-- Add file_url column for uploaded PDF/image source files
ALTER TABLE public.offers
ADD COLUMN IF NOT EXISTS file_url text,
ADD COLUMN IF NOT EXISTS file_type text,
ADD COLUMN IF NOT EXISTS destination text,
ADD COLUMN IF NOT EXISTS hotel_name text,
ADD COLUMN IF NOT EXISTS nights integer,
ADD COLUMN IF NOT EXISTS valid_until date;

-- Create public storage bucket for offer files (PDFs/images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('offer-files', 'offer-files', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for offer-files bucket
CREATE POLICY "Public can view offer files"
ON storage.objects FOR SELECT
USING (bucket_id = 'offer-files');

CREATE POLICY "Admins can upload offer files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'offer-files' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update offer files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'offer-files' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete offer files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'offer-files' AND has_role(auth.uid(), 'admin'));
