-- Fix Infinite Recursion in Supabase Policies

-- 1. Create a Security Definer function to safely check admin status without triggering RLS loops
CREATE OR REPLACE FUNCTION public.is_vault_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM vault_profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Drop the recursive policies on vault_profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.vault_profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.vault_profiles;

-- 3. Recreate them using the safe function
CREATE POLICY "Admins can read all profiles" ON public.vault_profiles FOR SELECT USING (is_vault_admin());
CREATE POLICY "Admins can insert profiles" ON public.vault_profiles FOR INSERT WITH CHECK (is_vault_admin());

-- 4. Do the same for vault_products
DROP POLICY IF EXISTS "Admins have full access to products" ON public.vault_products;
CREATE POLICY "Admins have full access to products" ON public.vault_products FOR ALL USING (is_vault_admin());

-- 5. Fix purchases & entitlements
DROP POLICY IF EXISTS "Admins can read all purchases" ON public.vault_purchases;
DROP POLICY IF EXISTS "Admins can manage purchases" ON public.vault_purchases;
CREATE POLICY "Admins can read all purchases" ON public.vault_purchases FOR SELECT USING (is_vault_admin());
CREATE POLICY "Admins can manage purchases" ON public.vault_purchases FOR ALL USING (is_vault_admin());

DROP POLICY IF EXISTS "Admins can read all entitlements" ON public.vault_entitlements;
DROP POLICY IF EXISTS "Admins can manage entitlements" ON public.vault_entitlements;
CREATE POLICY "Admins can read all entitlements" ON public.vault_entitlements FOR SELECT USING (is_vault_admin());
CREATE POLICY "Admins can manage entitlements" ON public.vault_entitlements FOR ALL USING (is_vault_admin());

-- 6. Fix support conversations
DROP POLICY IF EXISTS "Admins can manage all conversations" ON public.vault_support_conversations;
CREATE POLICY "Admins can manage all conversations" ON public.vault_support_conversations FOR ALL USING (is_vault_admin());

DROP POLICY IF EXISTS "Admins can manage all messages" ON public.vault_support_messages;
CREATE POLICY "Admins can manage all messages" ON public.vault_support_messages FOR ALL USING (is_vault_admin());
