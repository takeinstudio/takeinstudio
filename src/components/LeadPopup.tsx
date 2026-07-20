import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if we already captured this lead
    if (localStorage.getItem("takein_lead_captured") === "true") return;

    // Initial delay of 15 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // If closed without submitting, show again in 2.5 minutes (150 seconds)
    setTimeout(() => {
      if (localStorage.getItem("takein_lead_captured") !== "true") {
        setIsVisible(true);
      }
    }, 150000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) return;
    setLoading(true);

    try {
      // 1. Save to Supabase Leads Table
      await supabase.from("leads").insert([{
        name: "Quick Lead (Popup)",
        phone: phone,
        message: "Captured from automated website popup.",
        status: "New"
      }]);

      setSuccess(true);
      localStorage.setItem("takein_lead_captured", "true");
      
      // Auto close after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);

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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[999]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[1000] w-auto md:w-[400px]"
          >
            <div className="bg-card border border-primary/20 p-1 rounded-3xl shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
              
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-full p-1.5 transition-colors z-10"
              >
                <X size={16} />
              </button>

              <div className="p-6 pt-8">
                {success ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="text-primary w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-2">Got it!</h3>
                    <p className="text-muted-foreground">Our team will call you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                        <Phone className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl leading-tight">Let's discuss your project</h3>
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">Free Consultation</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      Drop your phone number below and our senior team will call you within 24 hours to discuss your vision.
                    </p>

                    <form onSubmit={handleSubmit} className="flex gap-2 relative">
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Phone Number..."
                        className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        required
                      />
                      <button 
                        type="submit"
                        disabled={loading}
                        className="glow-btn bg-primary text-primary-foreground px-4 rounded-xl font-bold flex items-center justify-center transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                      </button>
                    </form>
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
