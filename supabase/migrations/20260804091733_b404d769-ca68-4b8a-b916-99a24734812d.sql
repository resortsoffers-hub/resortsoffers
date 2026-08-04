ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS destination text,
  ADD COLUMN IF NOT EXISTS travel_start_date date,
  ADD COLUMN IF NOT EXISTS travel_end_date date,
  ADD COLUMN IF NOT EXISTS adults integer,
  ADD COLUMN IF NOT EXISTS children integer,
  ADD COLUMN IF NOT EXISTS children_ages text,
  ADD COLUMN IF NOT EXISTS first_time_visit boolean,
  ADD COLUMN IF NOT EXISTS previous_visit_notes text,
  ADD COLUMN IF NOT EXISTS preferred_language text,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'unpaid';