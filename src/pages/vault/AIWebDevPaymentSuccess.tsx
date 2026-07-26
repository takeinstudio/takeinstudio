import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Clock, ArrowRight, AlertCircle } from "lucide-react";
import SEO from "@/components/SEO";

export default function AIWebDevPaymentSuccess() {
  return (
    <>
      <SEO
        title="Payment Received — AIWebDev Vault | TakeIN Studio"
        description="Your payment has been received. TakeIN Studio will verify and activate your AIWebDev Vault access shortly."
        url="https://takeinstudio.com/vault/aiwebdev/payment-success"
      />

      <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
        {/* Minimal header */}
        <header className="border-b border-gray-100 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/logo/logo_no_text.png"
                alt="TakeIN Studio"
                className="h-7 w-auto mix-blend-multiply object-contain"
              />
              <span className="font-display text-sm font-black text-gray-900 tracking-tight">
                TakeIN Studio
              </span>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-lg text-center">

            {/* Success icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-green-500" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-[10px] tracking-[0.25em] font-black text-[#FF6B00] uppercase mb-3">
                PAYMENT RECEIVED
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4">
                Thank you.
              </h1>
              <p className="text-base text-gray-500 leading-relaxed max-w-sm mx-auto mb-10">
                Your payment has been received. TakeIN Studio will verify the transaction and activate your Vault access.
              </p>
            </motion.div>

            {/* Status card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 mb-4 text-left"
            >
              <p className="text-[10px] tracking-widest font-black text-gray-400 uppercase mb-5">
                WHAT HAPPENS NEXT
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: Clock,
                    title: "Transaction Verification",
                    desc: "TakeIN Studio will verify your payment against Razorpay records. This is done manually.",
                    color: "text-amber-500",
                    bg: "bg-amber-50",
                  },
                  {
                    icon: Mail,
                    title: "Vault Access Sent",
                    desc: "Once verified, your Vault credentials or access instructions will be sent to the email address provided during checkout.",
                    color: "text-[#FF6B00]",
                    bg: "bg-orange-50",
                  },
                  {
                    icon: CheckCircle2,
                    title: "You're in",
                    desc: "Use your credentials to access the AIWebDev 3-Volume Vault.",
                    color: "text-green-500",
                    bg: "bg-green-50",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-xl ${step.bg} flex items-center justify-center shrink-0`}>
                      <step.icon size={16} className={step.color} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-0.5">{step.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Important notice */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8 text-left"
            >
              <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                Reaching this page does not automatically activate Vault access.
                Access is activated only after manual payment verification by TakeIN Studio.
                If you have not received credentials within a reasonable timeframe, contact{" "}
                <a
                  href="mailto:takeinstudio@gmail.com"
                  className="text-[#FF6B00] hover:underline font-semibold"
                >
                  takeinstudio@gmail.com
                </a>
                .
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                to="/vault/aiwebdev"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 text-[11px] font-black tracking-widest uppercase rounded-full hover:border-gray-300 hover:text-gray-900 transition-all"
              >
                Review AIWebDev
                <ArrowRight size={12} />
              </Link>
              <a
                href="mailto:takeinstudio@gmail.com"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B00] text-white text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-orange-500 shadow-lg shadow-orange-500/20 transition-all"
              >
                <Mail size={12} />
                Contact TakeIN Studio
              </a>
            </motion.div>

          </div>
        </main>

        {/* Footer note */}
        <footer className="border-t border-gray-100 py-5">
          <p className="text-center text-xs text-gray-400">
            © 2026{" "}
            <span className="text-[#FF6B00]">TakeIN Studio</span>.
            {" "}Razorpay receipt sent to your registered email.
          </p>
        </footer>
      </div>
    </>
  );
}
