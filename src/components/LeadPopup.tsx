import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, ArrowRight, Loader2, CheckCircle2, Zap, Tag, Flame } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { sendBrevoEmail } from "@/lib/email";

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("takein_lead_captured") === "true") return;

    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 8000); // show after 8 seconds

    return () => clearTimeout(initialTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (localStorage.getItem("takein_lead_captured") !== "true") {
        setIsVisible(true);
      }
    }, 180000); // re-show in 3 min if not submitted
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) return;
    setLoading(true);

    try {
      await supabase.from("leads").insert([{
        name: "Mega Offer Lead (Popup)",
        phone: phone,
        message: "Captured via Mega Offer 10% Discount popup.",
        status: "New"
      }]);

      // Try to send email notification to takeinstudio@gmail.com
      try {
        await sendBrevoEmail(
          `🎉 New Popup Lead Captured: ${phone}`,
          `<h3>New Discount Offer Lead Captured</h3>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Source:</strong> Mega Offer 10% Discount popup</p>`,
          "noreply"
        );
      } catch (emailErr) {
        console.error("Failed to send email notification:", emailErr);
      }

      setSuccess(true);
      localStorage.setItem("takein_lead_captured", "true");

      setTimeout(() => {
        setIsVisible(false);
      }, 4000);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed inset-0 flex items-center justify-center z-[1000] px-4"
          >
            <div className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl">

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Header Banner */}
              <div className="relative bg-gradient-to-br from-[#ff5722] via-[#ff7043] to-[#ff8a65] px-7 pt-8 pb-6 text-white overflow-hidden">
                {/* Decorative bg blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-black/10 rounded-full blur-xl" />

                {/* Offer badge */}
                <div className="relative z-10 flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    <Flame size={11} className="fill-yellow-700" />
                    Mega Offer — Limited Period
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-7xl font-black leading-none tracking-tight">10%</span>
                    <div className="pb-2">
                      <p className="text-lg font-bold leading-tight">OFF</p>
                      <p className="text-white/80 text-sm font-medium">on all services</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm font-medium leading-relaxed">
                    Websites, Apps, SEO, Branding & more — <strong className="text-white">discount on every plan</strong> for a limited time only!
                  </p>
                </div>

                {/* Floating tag icon */}
                <div className="absolute right-6 bottom-4 opacity-20">
                  <Tag size={60} />
                </div>
              </div>

              {/* Body */}
              <div className="bg-white px-7 py-6">
                {success ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="text-green-600 w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1 text-gray-900">You're locked in!</h3>
                    <p className="text-gray-500 text-sm">Our team will call you to apply your discount. 🎉</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-5">
                      <h3 className="font-display font-bold text-lg text-gray-900 mb-1">Claim Your 10% Discount</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Drop your phone number and we'll call you to lock in the offer before it expires.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                      <div className="flex-1 relative">
                        <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Your phone number"
                          className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff5722]/20 focus:border-[#ff5722] outline-none transition-all bg-gray-50"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-3 rounded-xl bg-[#ff5722] text-white font-bold flex items-center gap-1.5 hover:bg-[#e64a19] hover:shadow-lg hover:shadow-[#ff5722]/30 transition-all disabled:opacity-70 text-sm whitespace-nowrap"
                      >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <><Zap size={14} className="fill-white" /> Claim Now</>}
                      </button>
                    </form>

                    {/* CTAs */}
                    <div className="flex gap-3 pt-3 border-t border-gray-100">
                      <Link
                        to="/pricing"
                        onClick={handleClose}
                        className="flex-1 text-center py-2.5 rounded-xl border border-[#ff5722]/30 text-[#ff5722] text-xs font-bold hover:bg-[#ff5722]/5 transition-colors"
                      >
                        View Pricing
                      </Link>
                      <Link
                        to="/services"
                        onClick={handleClose}
                        className="flex-1 text-center py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                      >
                        Our Services <ArrowRight size={11} />
                      </Link>
                    </div>

                    <p className="text-center text-[10px] text-gray-400 mt-3">
                      No spam. We'll only call to discuss your project.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
