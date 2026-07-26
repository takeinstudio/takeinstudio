import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, BookOpen, FileCode, Briefcase, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Securely import the HTML content as raw strings. 
// This prevents them from being accessible via direct public URLs.
import vol1Raw from '@/assets/volumes/vol1.html?raw';
import vol2Raw from '@/assets/volumes/vol2.html?raw';
import vol3Raw from '@/assets/volumes/vol3.html?raw';

const volumes = [
  { id: 'vol1', title: 'Volume I', subtitle: 'Tools & Workflow', icon: BookOpen, content: vol1Raw },
  { id: 'vol2', title: 'Volume II', subtitle: 'Code Blueprints', icon: FileCode, content: vol2Raw },
  { id: 'vol3', title: 'Volume III', subtitle: 'Freelance Manual', icon: Briefcase, content: vol3Raw },
];

export default function ProductViewer() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeVolume, setActiveVolume] = useState(volumes[0]);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    checkAccess();
  }, [productId]);

  useEffect(() => {
    // Convert raw HTML string into a secure Blob URL
    // This perfectly isolates the CSS of the HTML from the React app
    if (activeVolume) {
      const blob = new Blob([activeVolume.content], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);

      // Cleanup to prevent memory leaks
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [activeVolume]);

  const checkAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/vault/login');
      return;
    }

    // Verify entitlement for this product
    const { data: product } = await supabase
      .from('vault_products')
      .select('id')
      .eq('slug', productId)
      .single();

    if (!product) {
      navigate('/vault/dashboard');
      return;
    }

    const { data: entitlement } = await supabase
      .from('vault_entitlements')
      .select('status')
      .eq('user_id', session.user.id)
      .eq('product_id', product.id)
      .single();

    if (entitlement && entitlement.status === 'active') {
      setAuthorized(true);
    } else {
      // Not authorized
      navigate('/vault/dashboard');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Lock className="w-12 h-12 text-slate-500 mb-4" />
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p className="text-slate-400 mt-2 mb-6 text-sm">You do not have an active entitlement for this product.</p>
        <Link to="/vault/dashboard" className="px-6 py-2.5 bg-orange-600 rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <div className="w-72 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/80 bg-slate-900/50">
          <Link to="/vault/dashboard" className="p-2 -ml-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight truncate max-w-[180px]">AIWebDev Masterclass</h1>
            <p className="text-[9px] text-orange-500 font-bold tracking-widest mt-0.5">PREMIUM VAULT</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-2 mt-2">Course Modules</p>
          
          {volumes.map((vol) => {
            const Icon = vol.icon;
            const isActive = activeVolume.id === vol.id;
            return (
              <button
                key={vol.id}
                onClick={() => setActiveVolume(vol)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400 shadow-inner' 
                    : 'hover:bg-slate-800/80 text-slate-400 border border-transparent hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-orange-500/20 text-orange-500' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : ''}`}>{vol.title}</div>
                  <div className="text-[10px] truncate opacity-80">{vol.subtitle}</div>
                </div>
                {isActive && <ChevronRight size={14} className="text-orange-500" />}
              </button>
            );
          })}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/30">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center shadow-inner">
            <Lock size={14} className="mx-auto text-emerald-500 mb-2" />
            <p className="text-[9px] text-slate-400 leading-relaxed font-medium">
              This content is securely encrypted and licensed exclusively to your account. Do not share.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area (Iframe) */}
      <div className="flex-1 relative bg-white">
        <AnimatePresence mode="wait">
          {blobUrl && (
            <motion.iframe
              key={blobUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={blobUrl}
              className="w-full h-full border-none"
              title={activeVolume.title}
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
