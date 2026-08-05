CREATE TABLE public.site_visits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id text NOT NULL,
  path text,
  language text,
  ip_address text,
  country text,
  city text,
  region text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
CREATE INDEX site_visits_created_at_idx ON public.site_visits (created_at DESC);
CREATE INDEX site_visits_visitor_idx ON public.site_visits (visitor_id);
GRANT ALL ON public.site_visits TO service_role;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;