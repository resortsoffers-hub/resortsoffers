ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS reference_code text;

CREATE OR REPLACE FUNCTION public.gen_booking_reference()
RETURNS text
LANGUAGE sql
VOLATILE
SET search_path = public
AS $$
  SELECT 'RO-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
$$;

UPDATE public.consultation_bookings
SET reference_code = public.gen_booking_reference()
WHERE reference_code IS NULL;

ALTER TABLE public.consultation_bookings
  ALTER COLUMN reference_code SET DEFAULT public.gen_booking_reference();

ALTER TABLE public.consultation_bookings
  ALTER COLUMN reference_code SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS consultation_bookings_reference_code_key
  ON public.consultation_bookings (reference_code);

CREATE OR REPLACE FUNCTION public.get_booking_confirmation(_reference_code text)
RETURNS TABLE (
  reference_code text,
  name text,
  destination text,
  preferred_date date,
  preferred_time time without time zone,
  consultation_type text,
  status booking_status,
  payment_status text,
  created_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.reference_code,
         b.name,
         b.destination,
         b.preferred_date,
         b.preferred_time,
         b.consultation_type,
         b.status,
         b.payment_status,
         b.created_at
  FROM public.consultation_bookings b
  WHERE upper(b.reference_code) = upper(trim(_reference_code))
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_booking_confirmation(text) TO anon, authenticated;