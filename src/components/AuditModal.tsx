import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Search, Zap, Layout } from "lucide-react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-cream rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white text-muted-foreground transition-all"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <div className="p-8 sm:p-12">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Search size={24} className="text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2">Free Website Audit</h2>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  Enter your business details below. We'll perform a manual SEO, Speed, and UX audit of your site and send the report within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Website URL</label>
                    <input
                      required
                      type="url"
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                    />
                  </div>
                  <button type="submit" className="w-full glow-btn bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm mt-4">
                    Send My Free Audit
                  </button>
                </form>

                <div className="mt-8 flex items-center gap-4 justify-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1"><Zap size={10} /> Speed Check</div>
                  <div className="flex items-center gap-1"><Search size={10} /> SEO Check</div>
                  <div className="flex items-center gap-1"><Layout size={10} /> UX Check</div>
                </div>
              </div>
            ) : (
              <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-primary animate-bounce" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2">Audit Requested!</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thank you! Our experts are now analyzing your website. You'll receive your custom PDF report at your email soon.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 text-primary font-bold text-sm hover:underline"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
