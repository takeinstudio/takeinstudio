-- TakeIN Studio Customer Vault Supabase Schema
-- Run this in your Supabase SQL Editor to create the Vault tables

-- 1. Vault Profiles
CREATE TABLE IF NOT EXISTS public.vault_profiles (
    id uuid references auth.users ON DELETE CASCADE PRIMARY KEY,
    email text NOT NULL,
    full_name text,
    phone text,
    role text DEFAULT 'customer', -- 'customer' or 'admin'
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Vault Products
CREATE TABLE IF NOT EXISTS public.vault_products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    name text NOT NULL,
    short_description text,
    description text,
    thumbnail_url text,
    category text,
    price_in numeric,
    price_intl numeric,
    status text DEFAULT 'active', -- 'active', 'coming_soon'
    is_published boolean DEFAULT true,
    checkout_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Vault Purchases
CREATE TABLE IF NOT EXISTS public.vault_purchases (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid references public.vault_profiles(id) ON DELETE CASCADE NOT NULL,
    product_id uuid references public.vault_products(id) ON DELETE SET NULL,
    amount numeric,
    currency text DEFAULT 'INR',
    payment_status text DEFAULT 'pending', -- 'paid', 'pending', 'failed'
    provider text,
    provider_payment_id text,
    purchased_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Vault Entitlements
CREATE TABLE IF NOT EXISTS public.vault_entitlements (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid references public.vault_profiles(id) ON DELETE CASCADE NOT NULL,
    product_id uuid references public.vault_products(id) ON DELETE CASCADE NOT NULL,
    status text DEFAULT 'pending', -- 'active', 'pending', 'expired', 'revoked'
    granted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at timestamp with time zone,
    UNIQUE(user_id, product_id)
);

-- 5. Vault Support Conversations
CREATE TABLE IF NOT EXISTS public.vault_support_conversations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id uuid references public.vault_profiles(id) ON DELETE CASCADE NOT NULL,
    product_id uuid references public.vault_products(id) ON DELETE SET NULL,
    subject text NOT NULL,
    category text,
    status text DEFAULT 'open', -- 'open', 'awaiting_support', 'awaiting_customer', 'resolved', 'closed'
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Vault Support Messages
CREATE TABLE IF NOT EXISTS public.vault_support_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id uuid references public.vault_support_conversations(id) ON DELETE CASCADE NOT NULL,
    sender_id uuid references auth.users ON DELETE SET NULL,
    sender_type text NOT NULL, -- 'customer' or 'admin'
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    read_at timestamp with time zone
);

-- Create a trigger function to update updated_at on conversations
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vault_support_conversations_updated_at
BEFORE UPDATE ON public.vault_support_conversations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.vault_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_support_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_support_messages ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can read own profile" ON public.vault_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON public.vault_profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can update own profile" ON public.vault_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can insert profiles" ON public.vault_profiles FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can insert own profile" ON public.vault_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Products Policies
CREATE POLICY "Anyone can read published products" ON public.vault_products FOR SELECT USING (is_published = true);
CREATE POLICY "Admins have full access to products" ON public.vault_products FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Purchases Policies
CREATE POLICY "Users can read own purchases" ON public.vault_purchases FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can read all purchases" ON public.vault_purchases FOR SELECT USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage purchases" ON public.vault_purchases FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Entitlements Policies
CREATE POLICY "Users can read own entitlements" ON public.vault_entitlements FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can read all entitlements" ON public.vault_entitlements FOR SELECT USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage entitlements" ON public.vault_entitlements FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Support Conversations Policies
CREATE POLICY "Users can read own conversations" ON public.vault_support_conversations FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Users can insert own conversations" ON public.vault_support_conversations FOR INSERT WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Users can update own conversations" ON public.vault_support_conversations FOR UPDATE USING (customer_id = auth.uid());
CREATE POLICY "Admins can manage all conversations" ON public.vault_support_conversations FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Support Messages Policies
CREATE POLICY "Users can read messages in their conversations" ON public.vault_support_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.vault_support_conversations WHERE id = vault_support_messages.conversation_id AND customer_id = auth.uid())
);
CREATE POLICY "Users can insert messages in their conversations" ON public.vault_support_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.vault_support_conversations WHERE id = vault_support_messages.conversation_id AND customer_id = auth.uid())
    AND sender_type = 'customer'
);
CREATE POLICY "Admins can manage all messages" ON public.vault_support_messages FOR ALL USING (EXISTS (SELECT 1 FROM public.vault_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Note: We need a trigger to automatically create a vault_profile for new auth.users if they don't have one, or handle it via application logic.
-- We will handle profile creation via app logic upon first login/signup to ensure the user gets a profile.
