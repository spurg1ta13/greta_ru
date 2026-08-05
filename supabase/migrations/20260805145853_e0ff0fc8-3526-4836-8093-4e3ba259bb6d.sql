CREATE TABLE public.cv_downloads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language text,
  ip_address text,
  country text,
  city text,
  region text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT ALL ON public.cv_downloads TO service_role;
ALTER TABLE public.cv_downloads ENABLE ROW LEVEL SECURITY;