import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft, BookOpen, FileCode, Briefcase, ChevronRight,
  Lock, Download, ZoomIn, ZoomOut, Maximize, Minimize,
  Columns2, Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import vol1Raw from '@/assets/volumes/vol1.html?raw';
import vol2Raw from '@/assets/volumes/vol2.html?raw';
import vol3Raw from '@/assets/volumes/vol3.html?raw';

import vol1Pdf from '@/assets/volumes/vol1.pdf';
import vol2Pdf from '@/assets/volumes/vol2.pdf';
import vol3Pdf from '@/assets/volumes/vol3.pdf';

// Import as URLs — must use window.location.origin for absolute path in blob context
import logoTextUrl from '@/assets/volumes/logo_text.png';
import logoNoTextUrl from '@/assets/volumes/logo_no_text.png';
import ogImageUrl from '@/assets/volumes/og-image.jpg';

function prepareHtml(raw: string, twoPage: boolean, zoom: number): string {
  // Build absolute URLs so they resolve inside blob:// context
  const base = window.location.origin;
  const logoText = base + logoTextUrl;
  const logoNoText = base + logoNoTextUrl;
  const ogImage = base + ogImageUrl;

  const twoPageCss = twoPage ? `
    @media screen {
      body > .page { display: inline-block !important; vertical-align: top !important; }
      body { display: flex !important; flex-wrap: wrap !important; justify-content: center !important; align-items: flex-start !important; gap: 16px !important; padding: 30px 20px !important; }
    }
  ` : '';

  const zoomCss = `
    @media screen {
      body { zoom: ${zoom / 100}; }
    }
  `;

  return raw
    .replace(/src=["']\.\/logo\/logo_text\.png["']/g, `src="${logoText}"`)
    .replace(/src=["']\.\/logo\/logo_no_text\.png["']/g, `src="${logoNoText}"`)
    .replace(/src=["']\.\/logo\/og-image\.jpg["']/g, `src="${ogImage}"`)
    .replace(
      '</style>',
      `/* VAULT VIEWER OVERRIDES */
  @media screen {
    body { background: #e2e8f0 !important; padding: 30px 0 !important; }
    .no-print { display: none !important; }
    .page { margin-bottom: 20px !important; }
  }
  ${twoPageCss}
  ${zoomCss}
</style>`
    );
}

const volumes = [
  { id: 'vol1', title: 'Volume I',   subtitle: 'Tools & Workflow',  icon: BookOpen,  content: vol1Raw, pdf: vol1Pdf, pdfName: 'AIWebDev_Vol1_Tools_Workflow.pdf' },
  { id: 'vol2', title: 'Volume II',  subtitle: 'Code Blueprints',   icon: FileCode,  content: vol2Raw, pdf: vol2Pdf, pdfName: 'AIWebDev_Vol2_Code_Blueprints.pdf' },
  { id: 'vol3', title: 'Volume III', subtitle: 'Freelance Manual',  icon: Briefcase, content: vol3Raw, pdf: vol3Pdf, pdfName: 'AIWebDev_Vol3_Freelance_Manual.pdf' },
];

const ZOOM_STEP = 10;
const ZOOM_MIN = 50;
const ZOOM_MAX = 150;

export default function ProductViewer() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const viewerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeVolume, setActiveVolume] = useState(volumes[0]);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [twoPage, setTwoPage] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => { checkAccess(); }, [productId]);

  useEffect(() => {
    const processed = prepareHtml(activeVolume.content, twoPage, zoom);
    const blob = new Blob([processed], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [activeVolume, twoPage, zoom]);

  // Listen for fullscreen change
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const checkAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate('/vault/login'); return; }

    const { data: product } = await supabase
      .from('vault_products').select('id').eq('slug', productId).single();
    if (!product) { navigate('/vault/dashboard'); return; }

    const { data: entitlement } = await supabase
      .from('vault_entitlements').select('status')
      .eq('user_id', session.user.id).eq('product_id', product.id).single();

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
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
    <div ref={viewerRef} className="flex h-screen w-full bg-[#0f172a] overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Sidebar ── */}
      <div className="w-60 flex-shrink-0 bg-[#0f172a] border-r border-slate-800 flex flex-col">

        <div className="px-4 py-3.5 flex items-center gap-3 border-b border-slate-800">
          <Link to="/vault/dashboard/my-vault" className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={15} />
          </Link>
          <div>
            <div className="text-xs font-black text-white">AIWebDev</div>
            <div className="text-[9px] text-orange-500 font-black tracking-widest">PREMIUM VAULT</div>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2 py-2">Course Modules</p>
          {volumes.map((vol) => {
            const Icon = vol.icon;
            const isActive = activeVolume.id === vol.id;
            return (
              <button key={vol.id} onClick={() => setActiveVolume(vol)}
                className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all group ${
                  isActive ? 'bg-orange-500/10 border border-orange-500/25' : 'hover:bg-slate-800 border border-transparent'
                }`}>
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                  <Icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>{vol.title}</div>
                  <div className="text-[9px] text-slate-500 truncate">{vol.subtitle}</div>
                </div>
                {isActive && <ChevronRight size={11} className="text-orange-500" />}
              </button>
            );
          })}
        </div>

        {/* Download PDFs */}
        <div className="p-3 border-t border-slate-800">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">Download PDFs</p>
          <div className="space-y-1">
            {volumes.map((vol) => (
              <button key={vol.id} onClick={() => downloadPdf(vol)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/40 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all group">
                <Download size={11} className="text-slate-500 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                <div className="text-left min-w-0">
                  <div className="text-[11px] font-bold text-slate-400 group-hover:text-white truncate">{vol.title}</div>
                  <div className="text-[9px] text-slate-600 truncate">{vol.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-slate-800">
          <div className="bg-slate-800/40 rounded-lg p-2.5 text-center">
            <Lock size={10} className="mx-auto text-emerald-500 mb-1" />
            <p className="text-[8px] text-slate-500 leading-snug">Licensed to your account only.</p>
          </div>
        </div>
      </div>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Adobe-style top toolbar */}
        <div className="flex-shrink-0 bg-[#1e293b] border-b border-slate-700 px-4 py-2 flex items-center gap-3">
          {/* Volume label */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xs font-black text-white truncate">{activeVolume.title}</span>
            <span className="text-slate-600 hidden sm:block">·</span>
            <span className="text-xs text-slate-400 hidden sm:block truncate">{activeVolume.subtitle}</span>
          </div>

          {/* Controls group */}
          <div className="flex items-center gap-1">

            {/* Page layout toggle */}
            <div className="flex items-center gap-0.5 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setTwoPage(false)}
                title="Single page"
                className={`p-1.5 rounded-md transition-all ${!twoPage ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                <Square size={13} />
              </button>
              <button
                onClick={() => setTwoPage(true)}
                title="Two-page spread"
                className={`p-1.5 rounded-md transition-all ${twoPage ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                <Columns2 size={13} />
              </button>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-0.5 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button onClick={() => setZoom(z => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
                title="Zoom out" className="p-1.5 rounded-md text-slate-400 hover:text-white transition-colors">
                <ZoomOut size={13} />
              </button>
              <span className="text-xs font-bold text-slate-300 px-2 min-w-[42px] text-center tabular-nums">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
                title="Zoom in" className="p-1.5 rounded-md text-slate-400 hover:text-white transition-colors">
                <ZoomIn size={13} />
              </button>
            </div>

            {/* Fullscreen */}
            <button onClick={toggleFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors">
              {isFullscreen ? <Minimize size={13} /> : <Maximize size={13} />}
            </button>

            {/* Download current */}
            <button onClick={() => downloadPdf(activeVolume)}
              className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all shadow-lg shadow-orange-500/20">
              <Download size={12} />
              <span className="hidden sm:block">Download PDF</span>
            </button>
          </div>
        </div>

        {/* iframe */}
        <div className="flex-1 overflow-auto bg-slate-700">
          <AnimatePresence mode="wait">
            {blobUrl && (
              <motion.iframe
                key={blobUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={blobUrl}
                className="w-full border-none"
                style={{ height: '100%', minHeight: '200vh' }}
                title={activeVolume.title}
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
