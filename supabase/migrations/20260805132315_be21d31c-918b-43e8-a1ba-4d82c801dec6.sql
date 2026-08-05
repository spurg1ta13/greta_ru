ALTER TABLE public.contact_messages
ADD COLUMN IF NOT EXISTS inquiry_type text NOT NULL DEFAULT 'job'
CHECK (inquiry_type IN ('job', 'project'));