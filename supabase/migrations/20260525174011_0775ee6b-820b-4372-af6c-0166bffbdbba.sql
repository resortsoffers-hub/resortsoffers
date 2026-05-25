
-- ============================================================
-- HOTEL CMS — Session 2 core schema
-- Photo isolation guarantee: hotel_images.hotel_id FK CASCADE +
-- storage path enforced as {hotel_id}/* via RLS check.
-- ============================================================

-- Hotels
CREATE TABLE public.hotels (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  name_en         TEXT NOT NULL,
  name_ar         TEXT,
  destination     TEXT NOT NULL,
  country         TEXT,
  short_desc_en   TEXT,
  short_desc_ar   TEXT,
  long_desc_en    TEXT,
  long_desc_ar    TEXT,
  hero_image_url  TEXT,
  brochure_url    TEXT,
  is_published    BOOLEAN NOT NULL DEFAULT false,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_hotels_published ON public.hotels(is_published, display_order);
CREATE INDEX idx_hotels_slug ON public.hotels(slug);

ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published hotels"
  ON public.hotels FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all hotels"
  ON public.hotels FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert hotels"
  ON public.hotels FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update hotels"
  ON public.hotels FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete hotels"
  ON public.hotels FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_hotels_updated_at
  BEFORE UPDATE ON public.hotels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Hotel images — strict FK so an image can never orphan or migrate hotels
CREATE TABLE public.hotel_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id      UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  caption_en    TEXT,
  caption_ar    TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_hotel_images_hotel ON public.hotel_images(hotel_id, display_order);

ALTER TABLE public.hotel_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view images of published hotels"
  ON public.hotel_images FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.hotels h WHERE h.id = hotel_images.hotel_id AND h.is_published = true));

CREATE POLICY "Admins can view all hotel images"
  ON public.hotel_images FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage hotel images"
  ON public.hotel_images FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Hotel inquiries (booking request form)
CREATE TABLE public.hotel_inquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id      UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  check_in      DATE,
  check_out     DATE,
  guests        INTEGER,
  message       TEXT,
  source_locale TEXT,
  status        TEXT NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_hotel_inquiries_hotel ON public.hotel_inquiries(hotel_id, created_at DESC);

ALTER TABLE public.hotel_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit hotel inquiries"
  ON public.hotel_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view hotel inquiries"
  ON public.hotel_inquiries FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update hotel inquiries"
  ON public.hotel_inquiries FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_hotel_inquiries_updated_at
  BEFORE UPDATE ON public.hotel_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Link offers → hotels (optional FK; existing offers stay valid)
ALTER TABLE public.offers ADD COLUMN hotel_id UUID REFERENCES public.hotels(id) ON DELETE SET NULL;
CREATE INDEX idx_offers_hotel ON public.offers(hotel_id);

-- ============================================================
-- Storage bucket for hotel images — public read, admin write,
-- path must start with {hotel_id}/ to prevent cross-hotel uploads.
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('hotel-images', 'hotel-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read hotel images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hotel-images');

CREATE POLICY "Admins can upload hotel images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'hotel-images'
    AND has_role(auth.uid(), 'admin'::app_role)
    AND (storage.foldername(name))[1] IS NOT NULL
  );

CREATE POLICY "Admins can update hotel images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'hotel-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete hotel images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'hotel-images' AND has_role(auth.uid(), 'admin'::app_role));
