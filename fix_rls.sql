-- SECURITY PATCH: Fix RLS Vulnerabilities for TakeIN Studio

-- 1. Fix vault_profiles self-escalation vulnerability
-- Drop the permissive policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.vault_profiles;

-- 2. Fix Admin Tables permissive access
-- Drop permissive policies
DROP POLICY IF EXISTS "Allow authenticated full access on content" ON public.content;
DROP POLICY IF EXISTS "Allow authenticated full access on pricing" ON public.pricing;
DROP POLICY IF EXISTS "Allow authenticated full access on services" ON public.services;
DROP POLICY IF EXISTS "Allow authenticated full access on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated full access on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated full access on jobs" ON public.jobs;
DROP POLICY IF EXISTS "Allow authenticated full access on careers" ON public.careers;
DROP POLICY IF EXISTS "Allow admins to read leads" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated users to read config" ON public.system_config;

-- Recreate strict admin-only policies using the vault_profiles role check
CREATE POLICY "Admins full access on content" ON public.content FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins full access on pricing" ON public.pricing FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins full access on services" ON public.services FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins full access on leads" ON public.leads FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins full access on testimonials" ON public.testimonials FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins full access on jobs" ON public.jobs FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins full access on careers" ON public.careers FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Secure system_config
CREATE POLICY "Admins read config" ON public.system_config FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
