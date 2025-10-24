-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create consultation_bookings table
CREATE TABLE public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('video', 'phone')),
  message TEXT,
  status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create bookings
CREATE POLICY "Anyone can create bookings"
ON public.consultation_bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Admins can view all bookings
CREATE POLICY "Admins can view all bookings"
ON public.consultation_bookings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Policy: Admins can update bookings
CREATE POLICY "Admins can update bookings"
ON public.consultation_bookings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_consultation_bookings_updated_at
BEFORE UPDATE ON public.consultation_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();