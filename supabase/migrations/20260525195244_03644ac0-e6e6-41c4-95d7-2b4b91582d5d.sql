ALTER TABLE public.hotels
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}'::text[];

CREATE INDEX IF NOT EXISTS idx_hotels_tags ON public.hotels USING GIN (tags);