CREATE TABLE public.consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  decision text NOT NULL,
  source text NOT NULL,
  policy_version text NOT NULL,
  language text,
  country text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.consent_records TO service_role;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.contact_messages ADD COLUMN consent_given boolean NOT NULL DEFAULT false;
ALTER TABLE public.contact_messages ADD COLUMN consent_at timestamptz;
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit a contact message" ON public.contact_messages
FOR INSERT TO anon, authenticated
WITH CHECK (consent_given = true AND length(name) BETWEEN 1 AND 100 AND length(email) BETWEEN 3 AND 255 AND length(message) BETWEEN 1 AND 2000);