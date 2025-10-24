-- Create storage bucket for resort documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resort-documents',
  'resort-documents',
  false,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Create table for document metadata
CREATE TABLE public.resort_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  resort_name TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resort_documents ENABLE ROW LEVEL SECURITY;

-- Anyone can view active documents
CREATE POLICY "Anyone can view active documents"
  ON public.resort_documents
  FOR SELECT
  USING (is_active = true);

-- Admins can manage documents
CREATE POLICY "Admins can manage documents"
  ON public.resort_documents
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for viewing documents (no download)
CREATE POLICY "Anyone can view resort documents"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'resort-documents');

-- Only admins can upload documents
CREATE POLICY "Admins can upload resort documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'resort-documents' AND
    has_role(auth.uid(), 'admin'::app_role)
  );

-- Trigger for updated_at
CREATE TRIGGER update_resort_documents_updated_at
  BEFORE UPDATE ON public.resort_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();