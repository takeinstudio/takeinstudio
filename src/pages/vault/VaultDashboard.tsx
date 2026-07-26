import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, LogOut, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Layers } from "lucide-react";
import SEO from "@/components/SEO";

export default function VaultDashboard() {
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const rawSession = localStorage.getItem("takein_vault_session");
    if (rawSession) {
      try {
        setSession(JSON.parse(rawSession));
      } catch (e) {
        setSession({ email: "vault@takeinstudio.com" });
      }
    } else {
      // Default state for preview/direct navigation fallback
      setSession({ email: "user@takeinstudio.com" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("takein_vault_session");
    navigate("/vault/login");
  };

  return (
    <>
      <SEO
        title="Vault Dashboard — TakeIN Studio Digital Vault"
        description="Access your purchased playbooks, digital volumes, and developer tools."
        url="https://takeinstudio.com/vault/dashboard"
      />

      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col justify-between">
        {/* Header */}
        <header className="border-b border-white/5 py-4 px-6 sticky top-0 z-30 bg-[#0d0d0d]/90 backdrop-blur-md">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo_no_text.png"
                alt="TakeIN Studio"
                className="h-8 w-auto mix-blend-screen object-contain"
              />
              <div className="flex items-center text-sm font-display">
                <span className="text-white font-black">Take</span>
                <span className="text-[#FF6B00] font-black">IN</span>
                <span className="text-white/60 font-normal ml-1">Vault</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-white/40 hidden sm:inline">
                {session?.email || "vault@takeinstudio.com"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white border border-white/10 rounded-full px-3 py-1.5 transition-colors"
              >
                <LogOut size={13} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-[10px] tracking-[0.25em] font-black text-[#FF6B00] uppercase mb-2">
              MY VAULT PRODUCTS
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome to your Digital Vault
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Select an unlocked product below to access full curriculum, prompts, and playbooks.
            </p>
          </motion.div>

          {/* Purchased Products Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* AIWebDev Playbook Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#121216] border border-white/10 rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF6B00]/40 transition-all duration-300"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  UNLOCKED ACCESS
                </span>
                <span className="text-[10px] text-white/40 tracking-wider">
                  3 VOLUMES • 73 PAGES
                </span>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] font-black text-white/40 uppercase mb-1">
                  TAKEIN STUDIO
                </p>
                <h2 className="font-display text-2xl font-black text-white tracking-tight mb-2">
                  AIWeb<span className="text-[#FF6B00]">Dev</span>
                </h2>
                <p className="text-xs text-white/60 leading-relaxed mb-6">
                  The AI-Native Web Development Playbook. Learn to understand, build, debug, secure, deploy and deliver modern web applications using AI coding agents.
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-6 text-center text-[10px] text-white/50 uppercase tracking-widest font-bold">
                  <div>Vol I: Foundations</div>
                  <div>Vol II: Security</div>
                  <div>Vol III: Delivery</div>
                </div>
              </div>

              <Link
                to="/vault/aiwebdev/access"
                className="w-full bg-[#FF6B00] text-white py-3.5 rounded-xl font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                Access AIWebDev Vault
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Upcoming / Additional Resources Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#121216]/50 border border-white/5 rounded-2xl p-7 flex flex-col justify-between opacity-60"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="bg-white/5 text-white/40 border border-white/10 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                  ROADMAP & UPDATES
                </span>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] font-black text-white/30 uppercase mb-1">
                  FUTURE ADDITIONS
                </p>
                <h2 className="font-display text-xl font-black text-white/70 tracking-tight mb-2">
                  Vault Expansion Pack
                </h2>
                <p className="text-xs text-white/40 leading-relaxed mb-6">
                  New industry prompts, advanced multi-agent workflows, debugging cases, and client proposal templates are added periodically.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-center text-xs text-white/30 font-medium">
                Included with your Vault Membership
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-4 text-center text-xs text-white/30">
          © 2026 TakeIN Studio. Protected Vault Environment.
        </footer>
      </div>
    </>
  );
}
