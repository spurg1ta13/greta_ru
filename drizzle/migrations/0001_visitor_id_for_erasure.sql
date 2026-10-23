ALTER TABLE public.chat_logs ADD COLUMN visitor_id text;
ALTER TABLE public.contact_messages ADD COLUMN visitor_id text;
ALTER TABLE public.cv_downloads ADD COLUMN visitor_id text;
CREATE INDEX IF NOT EXISTS chat_logs_visitor_idx ON public.chat_logs(visitor_id);
CREATE INDEX IF NOT EXISTS contact_messages_visitor_idx ON public.contact_messages(visitor_id);
CREATE INDEX IF NOT EXISTS cv_downloads_visitor_idx ON public.cv_downloads(visitor_id);
CREATE INDEX IF NOT EXISTS consent_records_visitor_idx ON public.consent_records(visitor_id);