import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X, CheckCircle2, Search, Zap, Layout } from "lucide-react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    businessType: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address containing '@'.");
      return;
    }
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting audit request:", error);
    } finally {
      setLoading(false);
    }
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
                <h2 className="font-display text-2xl font-bold mb-2 text-primary">Get a Free Website Audit</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["UX Issues", "Performance Report", "Design Suggestions"].map(f => (
                    <span key={f} className="px-2 py-0.5 rounded-md bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/10">✔ {f}</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  We analyze your current website and show you exactly how to improve performance, design, and conversions. Specialized for growth.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Website URL</label>
                      <input
                        required
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Phone Number</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Business Type</label>
                      <select 
                        required 
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                      >
                        <option value="">Select Type</option>
                        <option value="SaaS">SaaS / Startup</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Corporate">Corporate / B2B</option>
                        <option value="Local">Local Business</option>
                      </select>
                    </div>

                  </div>
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full glow-btn bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Capturing Data..." : "Get My Free Audit"}
                    </button>
                    <div className="flex gap-4 text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                      <span>✔ No commitment</span>
                      <span>✔ Response in 24h</span>
                    </div>
                  </div>
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
