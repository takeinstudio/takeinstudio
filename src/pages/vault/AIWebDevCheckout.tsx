import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, ShieldCheck, Check, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";

// ─── Razorpay Payment Page URL ─────────────────────────────────────────────────
const RAZORPAY_URL = "https://rzp.io/rzp/PtIpIG8Z";

const included = [
  "3-Volume Digital Vault",
  "53 pages total across current release",
  "Exact AI prompts & workflows",
  "Architecture guides & RLS blueprints",
  "Debugging frameworks & capstones",
  "Freelance outreach & proposal templates",
];

export default function AIWebDevCheckout() {
  return (
    <>
      <SEO
        title="Checkout — AIWebDev Vault | TakeIN Studio"
        description="Get access to the AIWebDev 3-Volume Vault from TakeIN Studio."
        url="https://takeinstudio.com/vault/aiwebdev/checkout"
      />

      <div className="min-h-screen bg-[#FAFAF8] flex flex-col">

        {/* ── Minimal header ── */}
        <header className="border-b border-gray-100 bg-white sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              to="/vault/aiwebdev"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Back to AIWebDev
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
                      <h1 className="font-display text-base font-black text-gray-900 tracking-tight leading-tight">
                        AIWebDev
                      </h1>
                      <p className="text-xs text-gray-400 mt-0.5">
                        The AI-Native Web Development Playbook
                      </p>
                    </div>
                  </div>

                  {/* Volume pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["Volume I", "Volume II", "Volume III"].map((v) => (
                      <span
                        key={v}
                        className="text-[10px] font-bold text-[#FF6B00] bg-orange-50 rounded-full px-2.5 py-1"
                      >
                        {v}
                      </span>
                    ))}
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
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4"
                >
                  <ShieldCheck size={14} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    TakeIN Studio will never ask for your UPI PIN, OTP, CVV or banking password. Payment is processed securely by Razorpay.
                  </p>
                </motion.div>
              </div>

              {/* ── Right: Payment CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="sm:col-span-3 bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                {/* Header strip */}
                <div className="px-7 py-5 border-b border-gray-50">
                  <p className="text-[10px] tracking-widest font-black text-gray-400 uppercase mb-1">
                    STEP 1 OF 1
                  </p>
                  <h2 className="font-display text-lg font-black text-gray-900 tracking-tight">
                    Complete Payment
                  </h2>
                </div>

                <div className="px-7 py-7">
                  {/* How this works */}
                  <div className="mb-8">
                    <p className="text-[10px] tracking-widest font-black text-gray-400 uppercase mb-4">
                      HOW THIS WORKS
                    </p>
                    <div className="space-y-4">
                      {[
                        {
                          n: "01",
                          title: "Pay via Razorpay",
                          desc: "Click the button below. You'll be taken to TakeIN Studio's Razorpay Payment Page — pay via UPI, card, netbanking or wallet.",
                        },
                        {
                          n: "02",
                          title: "Razorpay sends you a receipt",
                          desc: "Razorpay automatically emails a payment receipt to your address.",
                        },
                        {
                          n: "03",
                          title: "TakeIN Studio verifies & activates",
                          desc: "We verify the transaction in Razorpay and send your personal Vault credentials by email.",
                        },
                      ].map((step) => (
                        <div key={step.n} className="flex items-start gap-4">
                          <span className="text-[10px] font-black text-[#FF6B00] tracking-widest shrink-0 w-5 mt-0.5">
                            {step.n}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-gray-900 mb-0.5">{step.title}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <a
                    href={RAZORPAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-center gap-2.5 bg-[#FF6B00] text-white py-4 rounded-full font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 mb-3"
                  >
                    Proceed to Payment
                    <ExternalLink
                      size={13}
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                      strokeWidth={2.5}
                    />
                  </a>

                  <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                    You'll be redirected to Razorpay — TakeIN Studio's payment partner.
                    After payment, you'll return to a confirmation page.
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-50 my-6" />

                  {/* Already paid? */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">Already paid?</p>
                    <a
                      href="mailto:takeinstudio@gmail.com?subject=AIWebDev%20Vault%20Access%20Request&body=Hi%2C%20I%20have%20completed%20payment%20for%20AIWebDev%20Vault.%20Please%20find%20my%20Razorpay%20receipt%20attached."
                      className="text-xs font-bold text-[#FF6B00] hover:underline"
                    >
                      Contact us with your receipt →
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-gray-100 py-5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <p>
              © 2026 <span className="text-[#FF6B00]">TakeIN Studio</span>
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
              <Link to="/refund-policy" className="hover:text-gray-600 transition-colors">Refund Policy</Link>
              <Link to="/vault/aiwebdev" className="hover:text-gray-600 transition-colors">Review AIWebDev</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
