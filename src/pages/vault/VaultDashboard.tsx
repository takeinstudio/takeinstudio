import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ArrowRight, CheckCircle2, FileCheck } from "lucide-react";
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

      <div className="min-h-screen bg-[#FCFBF9] text-gray-900 flex flex-col justify-between font-sans">
        {/* Header */}
        <header className="border-b border-gray-200 py-4 px-6 sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo/logo_no_text.png"
                alt="TakeIN Studio"
                className="h-7 w-auto mix-blend-multiply object-contain"
              />
              <div className="flex items-center text-sm font-display">
                <span className="text-gray-950 font-black">Take</span>
                <span className="text-[#FF6B00] font-black">IN</span>
                <span className="text-gray-400 font-normal ml-1">Vault</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                {session?.email || "vault@takeinstudio.com"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full px-3 py-1.5 transition-colors bg-white hover:bg-gray-50"
              >
                <LogOut size={13} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.25em] font-black text-[#FF6B00] uppercase mb-2">
              MY VAULT PRODUCTS
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
              Welcome to your Digital Vault
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Select an unlocked product below to access full curriculum, prompts, and playbooks.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* AIWebDev Playbook Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden shadow-sm hover:border-[#FF6B00]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  UNLOCKED ACCESS
                </span>
                <span className="text-[10px] font-bold text-[#FF6B00] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                  3 VOLUMES • 53 PAGES
                </span>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] font-black text-gray-400 uppercase mb-1">
                  TAKEIN STUDIO
                </p>
                <h2 className="font-display text-2xl font-black text-gray-950 tracking-tight mb-2">
                  AIWeb<span className="text-[#FF6B00]">Dev</span>
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  The AI-Native Web Development Playbook. Learn to understand, build, debug, secure, deploy and deliver modern web applications using AI coding agents.
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 mb-6 text-center text-[10px] text-gray-600 font-medium">
                  <div>
                    <span className="font-bold block text-gray-900">Vol I (20 Pages)</span>
                    <span className="text-[9px] text-gray-400">Tool Directory</span>
                  </div>
                  <div>
                    <span className="font-bold block text-gray-900">Vol II (15 Pages)</span>
                    <span className="text-[9px] text-gray-400">Code Blueprints</span>
                  </div>
                  <div>
                    <span className="font-bold block text-gray-900">Vol III (18 Pages)</span>
                    <span className="text-[9px] text-gray-400">Freelance Manual</span>
                  </div>
                </div>
              </div>

              <Link
                to="/vault/aiwebdev/access"
                className="w-full bg-[#FF6B00] text-white py-3.5 rounded-xl font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
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
              className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col justify-between shadow-sm opacity-80"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                  ROADMAP & UPDATES
                </span>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] font-black text-gray-400 uppercase mb-1">
                  FUTURE ADDITIONS
                </p>
                <h2 className="font-display text-xl font-black text-gray-950 tracking-tight mb-2">
                  Vault Expansion Pack
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  New industry prompts, advanced multi-agent workflows, debugging cases, and client proposal templates are added periodically.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-center text-xs text-gray-500 font-medium">
                Included with your Vault Membership
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
          © 2026 TakeIN Studio. Protected Vault Environment.
        </footer>
      </div>
    </>
  );
}
