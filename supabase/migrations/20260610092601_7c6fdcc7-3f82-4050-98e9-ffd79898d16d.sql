DROP POLICY IF EXISTS "Anyone can view active documents" ON public.resort_documents;

CREATE POLICY "Admins can view documents" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

REVOKE EXECUTE ON FUNCTION public.get_hotel_preview(text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_hotel_preview(text, uuid) TO authenticated;