CREATE OR REPLACE FUNCTION public.get_hotel_preview(_slug text, _preview_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'hotel', to_jsonb(h),
    'images', COALESCE((
      SELECT jsonb_agg(to_jsonb(i) ORDER BY i.display_order ASC)
      FROM public.hotel_images i
      WHERE i.hotel_id = h.id
    ), '[]'::jsonb),
    'offer', (
      SELECT to_jsonb(o)
      FROM public.offers o
      WHERE o.hotel_id = h.id
        AND o.is_active = true
      ORDER BY o.display_order ASC
      LIMIT 1
    )
  )
  FROM public.hotels h
  WHERE h.slug = _slug
    AND h.id = _preview_id
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_hotel_preview(text, uuid) TO anon, authenticated, service_role;