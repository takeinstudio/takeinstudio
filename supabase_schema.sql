-- TakeIN Studio Supabase Schema
-- Run this in your Supabase SQL Editor to create the missing tables

-- 1. Content Table
CREATE TABLE IF NOT EXISTS public.content (
    section_key text PRIMARY KEY,
    text_value text
);

-- 2. Pricing Table
CREATE TABLE IF NOT EXISTS public.pricing (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category text NOT NULL,
    name text NOT NULL,
    description text,
    price_in text,
    price_intl text,
    is_popular integer DEFAULT 0,
    features text,
    cta_text text DEFAULT 'Get Started'
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    icon text,
    offerings text,
    buttons text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text,
    phone text,
    service text,
    message text,
    status text DEFAULT 'New',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    role text,
    text text NOT NULL,
    rating integer DEFAULT 5,
    is_approved integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Jobs Table
CREATE TABLE IF NOT EXISTS public.jobs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    department text,
    location text,
    type text,
    experience text,
    description text,
    requirements text,
    status text DEFAULT 'Open',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Careers Table (Applications)
CREATE TABLE IF NOT EXISTS public.careers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text,
    phone text,
    role text,
    portfolio_url text,
    resume_url text,
    message text,
    status text DEFAULT 'New',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and setup permissive policies for public access (Since it's an admin dashboard without auth limits yet)
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write on content" ON public.content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write on pricing" ON public.pricing FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write on services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write on leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write on testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write on jobs" ON public.jobs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write on careers" ON public.careers FOR ALL USING (true) WITH CHECK (true);
