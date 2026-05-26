-- Resource links per hotel (official media library, fact sheets, presentations, etc.)
CREATE TABLE public.hotel_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
  kind TEXT NOT NULL DEFAULT 'custom',
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  notes TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_internal BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_hotel_resources_hotel ON public.hotel_resources(hotel_id);

ALTER TABLE public.hotel_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage hotel resources"
  ON public.hotel_resources
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view public resources of published hotels"
  ON public.hotel_resources
  FOR SELECT
  TO public
  USING (
    is_internal = false
    AND EXISTS (
      SELECT 1 FROM public.hotels h
      WHERE h.id = hotel_resources.hotel_id AND h.is_published = true
    )
  );

CREATE TRIGGER trg_hotel_resources_updated_at
  BEFORE UPDATE ON public.hotel_resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Per-image villa / outlet tagging so categories never get mixed
ALTER TABLE public.hotel_images
  ADD COLUMN category_label TEXT,
  ADD COLUMN category_kind  TEXT;
