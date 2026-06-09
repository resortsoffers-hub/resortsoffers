ALTER TABLE public.hotel_images
  ADD COLUMN IF NOT EXISTS seo_filename text,
  ADD COLUMN IF NOT EXISTS alt_en text,
  ADD COLUMN IF NOT EXISTS alt_ar text,
  ADD COLUMN IF NOT EXISTS title_en text,
  ADD COLUMN IF NOT EXISTS title_ar text,
  ADD COLUMN IF NOT EXISTS description_en text,
  ADD COLUMN IF NOT EXISTS description_ar text;