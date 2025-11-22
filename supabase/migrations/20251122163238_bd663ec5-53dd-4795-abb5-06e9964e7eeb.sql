-- Add nationality field to customer_reviews
ALTER TABLE public.customer_reviews 
ADD COLUMN IF NOT EXISTS nationality text;

-- Add index for better filtering performance
CREATE INDEX IF NOT EXISTS idx_customer_reviews_destination ON public.customer_reviews(destination);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_nationality ON public.customer_reviews(nationality);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_hotel_name ON public.customer_reviews(hotel_name);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_rating ON public.customer_reviews(rating);