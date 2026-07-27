import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, ShieldCheck, Check, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";

// ─── Razorpay Payment Page URL ─────────────────────────────────────────────────
const RAZORPAY_URL = "https://rzp.io/rzp/PtIpIG8Z";

const included = [
  "60-Day Execution Progression",
  "Premium Vault-Integrated Viewer",
  "Copy-Ready AI Prompts",
  "5-Tier Project Framework",
  "Checkpoint Evaluation Systems",
  "Career Preparation Guidelines",
];

export default function AIMLCheckout() {
  return (
    <>
      <SEO
        title="Checkout — AI/ML Engineer Roadmap | TakeIN Studio"
        description="Get access to the AI/ML Engineer Career Execution Roadmap from TakeIN Studio."
        url="https://takeinstudio.com/vault/ai-ml/checkout"
      />

      <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
        {/* ── Minimal header ── */}
        <header className="border-b border-gray-100 bg-white sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              to="/vault/ai-ml"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Back to Roadmap
            </Link>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
              <Lock size={11} strokeWidth={2.5} />
              Razorpay Secured
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="flex-1 py-10 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-5 gap-6 items-start">

              {/* ── Left: Product summary ── */}
              <div className="sm:col-span-2 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-3 mb-5">
                    <img
                      src="/logo/logo_no_text.png"
                      alt="TakeIN Studio"
                      className="h-8 w-auto mix-blend-multiply object-contain shrink-0"
                    />
                    <div>
                      <p className="text-[9px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-0.5">
                        TakeIN Studio
                      </p>
                      <h1 className="font-display text-base font-black text-gray-900 tracking-tight leading-tight mb-0.5">
                        AI / ML Engineer
                      </h1>
                      <p className="text-xs text-gray-400">
                        Career Execution Roadmap
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    <span className="text-[10px] font-bold text-[#FF6B00] bg-orange-50 rounded-full px-2.5 py-1">
                      2026 EDITION
                    </span>
                  </div>

                  <div className="space-y-2">
                    {included.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <Check size={12} className="text-[#FF6B00] shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-xs text-gray-600 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Security note */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex gap-3 items-start bg-white border border-gray-100 rounded-2xl p-5"
                >
                  <ShieldCheck size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed m-0">
                    Your purchase is securely processed via Razorpay. Access instructions are sent to your registered email upon payment verification.
                  </p>
                </motion.div>
              </div>

              {/* ── Right: Checkout actions ── */}
              <div className="sm:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-white border border-gray-200 shadow-xl shadow-gray-200/40 rounded-2xl p-6 sm:p-8"
                >
                  <div className="text-center mb-8">
                    <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2">
                      Complete Your Purchase
                    </p>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-sm font-bold text-gray-400">₹</span>
                      <span className="font-display text-5xl font-black text-gray-900 tracking-tight">99</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">One-time payment. Lifetime access.</p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={RAZORPAY_URL}
                      className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-black text-white font-black text-xs uppercase tracking-widest px-6 py-4 rounded-full transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
                    >
                      Proceed to Payment
                      <ExternalLink size={14} />
                    </a>

                    <p className="text-[10px] text-gray-400 text-center leading-relaxed max-w-xs mx-auto">
                      By proceeding, you agree to our Terms of Service and Digital Product Refund Policy.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
