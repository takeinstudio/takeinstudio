import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, BookOpen, FileCode, Briefcase, ChevronRight, Lock, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Securely import HTML as raw strings
import vol1Raw from '@/assets/volumes/vol1.html?raw';
import vol2Raw from '@/assets/volumes/vol2.html?raw';
import vol3Raw from '@/assets/volumes/vol3.html?raw';

// Import PDF asset URLs (bundled with hashed names, not guessable)
import vol1Pdf from '@/assets/volumes/vol1.pdf';
import vol2Pdf from '@/assets/volumes/vol2.pdf';
import vol3Pdf from '@/assets/volumes/vol3.pdf';

// Import logo images as asset URLs (will be absolute bundled URLs)
import logoTextUrl from '@/assets/volumes/logo_text.png';
import logoNoTextUrl from '@/assets/volumes/logo_no_text.png';
import ogImageUrl from '@/assets/volumes/og-image.jpg';

/** Preprocess raw HTML to fix broken relative asset paths and clean up screen artifacts */
function prepareHtml(raw: string): string {
  return raw
    // Fix logo images to use the bundled absolute URLs
    .replace(/src="\.\/logo\/logo_text\.png"/g, `src="${logoTextUrl}"`)
    .replace(/src='\.\/logo\/logo_text\.png'/g, `src='${logoTextUrl}'`)
    .replace(/src="\.\/logo\/logo_no_text\.png"/g, `src="${logoNoTextUrl}"`)
    .replace(/src='\.\/logo\/logo_no_text\.png'/g, `src='${logoNoTextUrl}'`)
    .replace(/src="\.\/logo\/og-image\.jpg"/g, `src="${ogImageUrl}"`)
    .replace(/src='\.\/logo\/og-image\.jpg'/g, `src='${ogImageUrl}'`)
    // Inject overrides: hide the print preview button, fix white screen bg
    .replace(
      '</style>',
      `
  /* VAULT VIEWER OVERRIDES */
  @media screen {
    body { background: #f1f5f9 !important; padding: 30px 0 !important; }
    .no-print { display: none !important; }
    .page { margin-bottom: 24px !important; }
  }
</style>`
    );
}

const volumes = [
  { id: 'vol1', title: 'Volume I',   subtitle: 'Tools & Workflow',  icon: BookOpen,  content: vol1Raw, pdf: vol1Pdf, pdfName: 'AIWebDev_Volume1_Tools_Workflow.pdf' },
  { id: 'vol2', title: 'Volume II',  subtitle: 'Code Blueprints',   icon: FileCode,  content: vol2Raw, pdf: vol2Pdf, pdfName: 'AIWebDev_Volume2_Code_Blueprints.pdf' },
  { id: 'vol3', title: 'Volume III', subtitle: 'Freelance Manual',  icon: Briefcase, content: vol3Raw, pdf: vol3Pdf, pdfName: 'AIWebDev_Volume3_Freelance_Manual.pdf' },
];

export default function ProductViewer() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeVolume, setActiveVolume] = useState(volumes[0]);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => { checkAccess(); }, [productId]);

  useEffect(() => {
    if (!activeVolume) return;
    const processed = prepareHtml(activeVolume.content);
    const blob = new Blob([processed], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [activeVolume]);

  const checkAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate('/vault/login'); return; }

    const { data: product } = await supabase
      .from('vault_products')
      .select('id')
      .eq('slug', productId)
      .single();

    if (!product) { navigate('/vault/dashboard'); return; }

    const { data: entitlement } = await supabase
      .from('vault_entitlements')
      .select('status')
      .eq('user_id', session.user.id)
      .eq('product_id', product.id)
      .single();

    setAuthorized(entitlement?.status === 'active');
    setLoading(false);
    if (entitlement?.status !== 'active') navigate('/vault/dashboard');
  };

  const downloadPdf = (vol: typeof volumes[0]) => {
    const a = document.createElement('a');
    a.href = vol.pdf;
    a.download = vol.pdfName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
    </div>
  );

  if (!authorized) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
      <Lock className="w-12 h-12 text-slate-500 mb-4" />
      <h2 className="text-xl font-bold">Access Denied</h2>
      <p className="text-slate-400 mt-2 mb-6 text-sm">You don't have an active entitlement for this product.</p>
      <Link to="/vault/dashboard" className="px-6 py-2.5 bg-orange-600 rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Sidebar ── */}
      <div className="w-64 flex-shrink-0 bg-[#0f172a] border-r border-slate-800 flex flex-col z-20">

        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-800">
          <Link to="/vault/dashboard/my-vault" className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="text-xs font-black text-white tracking-tight leading-tight">AIWebDev</div>
            <div className="text-[9px] text-orange-500 font-black tracking-widest">PREMIUM VAULT</div>
          </div>
        </div>

        {/* Volume nav */}
        <div className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2 py-2">Course Modules</p>
          {volumes.map((vol) => {
            const Icon = vol.icon;
            const isActive = activeVolume.id === vol.id;
            return (
              <button
                key={vol.id}
                onClick={() => setActiveVolume(vol)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                  isActive
                    ? 'bg-orange-500/10 border border-orange-500/25'
                    : 'hover:bg-slate-800 border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>{vol.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">{vol.subtitle}</div>
                </div>
                {isActive && <ChevronRight size={12} className="text-orange-500" />}
              </button>
            );
          })}
        </div>

        {/* Download PDFs */}
        <div className="p-3 border-t border-slate-800">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">Download PDFs</p>
          <div className="space-y-1">
            {volumes.map((vol) => (
              <button
                key={vol.id}
                onClick={() => downloadPdf(vol)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all group"
              >
                <Download size={12} className="text-slate-400 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                <div className="text-left min-w-0">
                  <div className="text-[11px] font-bold text-slate-300 group-hover:text-white truncate">{vol.title}</div>
                  <div className="text-[9px] text-slate-500 truncate">{vol.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security footer */}
        <div className="p-3 border-t border-slate-800">
          <div className="bg-slate-800/40 rounded-lg p-3 text-center">
            <Lock size={11} className="mx-auto text-emerald-500 mb-1" />
            <p className="text-[9px] text-slate-500 leading-snug">Licensed to your account only. Do not share.</p>
          </div>
        </div>
      </div>

      {/* ── Main Viewer ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top download bar */}
        <div className="flex-shrink-0 bg-slate-900 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white">{activeVolume.title}</span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400">{activeVolume.subtitle}</span>
          </div>
          <button
            onClick={() => downloadPdf(activeVolume)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-all shadow-lg shadow-orange-500/20"
          >
            <Download size={13} />
            Download PDF
          </button>
        </div>

        {/* iframe */}
        <div className="flex-1 overflow-auto bg-slate-200">
          <AnimatePresence mode="wait">
            {blobUrl && (
              <motion.iframe
                key={blobUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={blobUrl}
                className="w-full border-none"
                style={{ height: '100%', minHeight: '100%' }}
                title={activeVolume.title}
                sandbox="allow-scripts allow-same-origin"
                onLoad={(e) => {
                  // Auto-expand iframe to content height
                  try {
                    const iframe = e.currentTarget;
                    const doc = iframe.contentDocument || iframe.contentWindow?.document;
                    if (doc) {
                      iframe.style.height = doc.documentElement.scrollHeight + 'px';
                    }
                  } catch {}
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
