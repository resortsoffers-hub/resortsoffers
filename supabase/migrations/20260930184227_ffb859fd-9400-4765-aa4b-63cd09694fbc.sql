ALTER TABLE public.hotel_images
  ADD COLUMN IF NOT EXISTS flagged_ai boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS flagged_ai_at timestamptz;

CREATE OR REPLACE FUNCTION public.is_ai_image_url(_url text)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT _url IS NOT NULL AND lower(_url) ~ '(ai[-_]?generated|midjourney|dall[-_]?e|openai|oaiusercontent|stable[-_]?diffusion|stability\.ai|leonardo\.ai|firefly|replicate\.delivery|image-gen|imagegen|/generated/|unsplash|pexels|pixabay|shutterstock|istockphoto|gettyimages|freepik)'
$$;

CREATE OR REPLACE FUNCTION public.guard_hotel_image()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF public.is_ai_image_url(NEW.image_url) THEN
    RAISE EXCEPTION 'Blocked: AI-generated or stock images are not allowed (%).', NEW.image_url;
  END IF;
  IF TG_OP = 'UPDATE' AND OLD.flagged_ai AND NOT NEW.flagged_ai THEN
    RAISE EXCEPTION 'Blocked: an image flagged as AI cannot be unflagged — remove it instead.';
  END IF;
  IF NEW.flagged_ai AND NEW.flagged_ai_at IS NULL THEN NEW.flagged_ai_at := now(); END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS guard_hotel_image_trg ON public.hotel_images;
CREATE TRIGGER guard_hotel_image_trg BEFORE INSERT OR UPDATE ON public.hotel_images
  FOR EACH ROW EXECUTE FUNCTION public.guard_hotel_image();

CREATE OR REPLACE FUNCTION public.guard_hotel_hero()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.hero_image_url IS DISTINCT FROM OLD.hero_image_url OR TG_OP = 'INSERT' THEN
    IF public.is_ai_image_url(NEW.hero_image_url) THEN
      RAISE EXCEPTION 'Blocked: AI-generated or stock hero images are not allowed.';
    END IF;
    IF EXISTS (SELECT 1 FROM public.hotel_images WHERE image_url = NEW.hero_image_url AND flagged_ai) THEN
      RAISE EXCEPTION 'Blocked: this image is flagged as AI and cannot be the hero.';
    END IF;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS guard_hotel_hero_trg ON public.hotels;
CREATE TRIGGER guard_hotel_hero_trg BEFORE INSERT OR UPDATE ON public.hotels
  FOR EACH ROW EXECUTE FUNCTION public.guard_hotel_hero();

-- When an image is flagged, clear it as hero anywhere it's used
CREATE OR REPLACE FUNCTION public.clear_flagged_hero()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.flagged_ai THEN
    UPDATE public.hotels SET hero_image_url = NULL WHERE hero_image_url = NEW.image_url;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS clear_flagged_hero_trg ON public.hotel_images;
CREATE TRIGGER clear_flagged_hero_trg AFTER UPDATE OF flagged_ai ON public.hotel_images
  FOR EACH ROW EXECUTE FUNCTION public.clear_flagged_hero();