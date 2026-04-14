CREATE TABLE public.client_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  website TEXT NOT NULL,
  project_description TEXT,
  budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a request"
ON public.client_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can read requests"
ON public.client_requests
FOR SELECT
TO anon, authenticated
USING (true);