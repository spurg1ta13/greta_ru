CREATE TABLE public.chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL,
  language text,
  ip_address text,
  country text,
  city text,
  region text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.chat_logs TO service_role;

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX chat_logs_session_idx ON public.chat_logs (session_id, created_at);