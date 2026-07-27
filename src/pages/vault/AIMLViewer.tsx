import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Lock } from 'lucide-react';
import SEO from '@/components/SEO';

export default function AIMLViewer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/vault/login');
        return;
      }

      // Find the ai-ml product
      const { data: product } = await supabase
        .from('vault_products')
        .select('id')
        .eq('slug', 'ai-ml')
        .single();

      if (!product) {
        navigate('/vault/dashboard');
        return;
      }

      // Check entitlement
      const { data: entitlement } = await supabase
        .from('vault_entitlements')
        .select('status')
        .eq('user_id', session.user.id)
        .eq('product_id', product.id)
        .single();

      if (entitlement?.status === 'active') {
        setAuthorized(true);
      } else {
        navigate('/vault/dashboard');
      }
    } catch (error) {
      console.error("Access check failed:", error);
      navigate('/vault/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2 text-white">
          <Lock size={16} /> Authenticating Vault Access...
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <SEO
        title="AI/ML Engineer Roadmap Viewer | TakeIN Studio"
        description="Premium Vault Access"
        url="https://takeinstudio.com/vault/view/ai-ml"
      />
      
      <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
        {/* Minimal Viewer Header */}
        <header className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Link 
              to="/vault/dashboard" 
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hidden sm:block">
              AI / ML Engineer Career Execution Roadmap
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
              <Lock size={10} /> SECURE ACCESS
            </span>
          </div>
        </header>

        {/* Seamless Iframe */}
        <div className="flex-1 w-full bg-[#f8f9fa] relative">
          <iframe
            src="/ai-ml-roadmap.html"
            className="absolute inset-0 w-full h-full border-none"
            title="AI/ML Career Execution Roadmap"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </>
  );
}
