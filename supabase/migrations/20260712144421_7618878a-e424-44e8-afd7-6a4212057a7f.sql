
-- Harden review-media uploads: require a fixed 'reviews/' path prefix and add admin delete/update for moderation.
DROP POLICY IF EXISTS "Public can upload review media (images/videos, <=50MB)" ON storage.objects;

CREATE POLICY "Public can upload pending review media"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'review-media'
    AND (storage.foldername(name))[1] = 'reviews'
    AND (lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','gif','heic','mp4','mov','webm'))
    AND coalesce((metadata->>'size')::bigint, 0) <= 52428800
  );

-- Allow admins to moderate (delete/update) review media
DROP POLICY IF EXISTS "Admins can delete review media" ON storage.objects;
CREATE POLICY "Admins can delete review media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'review-media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can update review media" ON storage.objects;
CREATE POLICY "Admins can update review media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'review-media' AND public.has_role(auth.uid(), 'admin'::public.app_role));
