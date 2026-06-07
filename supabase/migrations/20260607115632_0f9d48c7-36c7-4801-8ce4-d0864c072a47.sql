
-- 1. Resort documents: admin-only read
DROP POLICY IF EXISTS "Anyone can view resort documents" ON storage.objects;
CREATE POLICY "Admins can view resort documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'resort-documents' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2. Consultation bookings: admin DELETE policy
CREATE POLICY "Admins can delete bookings"
  ON public.consultation_bookings FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3. Review media uploads: restrict MIME types and size
DROP POLICY IF EXISTS "Anyone can upload review media" ON storage.objects;
CREATE POLICY "Public can upload review media (images/videos, <=50MB)"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'review-media'
    AND (lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','gif','heic','mp4','mov','webm'))
    AND coalesce((metadata->>'size')::bigint, 0) <= 52428800
  );

-- 4. Harden trigger function with fixed search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- 5. Revoke EXECUTE on has_role from anon (still callable by authenticated for RLS)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
