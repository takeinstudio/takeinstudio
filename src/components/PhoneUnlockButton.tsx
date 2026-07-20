import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Phone, Lock, X, ArrowRight, Loader2, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export default function PhoneUnlockButton({ variant = 'default' }: { variant?: 'default' | 'footer-whatsapp' | 'sidebar-whatsapp' }) {
  const [session, setSession] = useState<any>(null);
  const [phoneData, setPhoneData] = useState<{primary: string, secondary: string} | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'contact' | 'verify'>('contact');
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSecureData = async () => {
    try {
      const { data, error } = await supabase.from('system_config').select('key, value').in('key', ['phone_primary', 'phone_secondary']);
      if (!error && data) {
         const primary = data.find((d: any) => d.key === 'phone_primary')?.value || '';
         const secondary = data.find((d: any) => d.key === 'phone_secondary')?.value || '';
         if (primary && secondary) setPhoneData({ primary, secondary });
      }
    } catch(e) {}
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchSecureData();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchSecureData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });

      if (error) throw error;

      await supabase.from('leads').insert([{
        name: 'Pending Email Verification',
        email: email,
        phone: phone,
        company: 'N/A',
        message: 'User requested OTP code via Supabase Native Auth.',
        status: 'New'
      }]);

      setStep('verify');
    } catch (err: any) {
      setError(err.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });

      if (error) throw error;

      await supabase.from('leads').insert([{
        name: 'Verified Contact Lead',
        email: email,
        phone: phone,
        company: 'N/A',
        message: 'Successfully authenticated.',
        status: 'New'
      }]);

      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (session && phoneData) {
    if (variant === 'footer-whatsapp') {
      return (
        <a href={`https://wa.me/${phoneData.primary.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-white hover:bg-[#128C7E] transition-colors">
          <WhatsAppIcon size={15} />
        </a>
      );
    }
    if (variant === 'sidebar-whatsapp') {
      return (
        <a href={`https://wa.me/${phoneData.primary.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 relative rounded-full flex items-center justify-center shadow-sm bg-[#25D366] hover:bg-[#20ba56] text-white shadow-[#25D366]/20 hover:scale-110 transition-transform">
          <MessageSquare size={18} />
        </a>
      );
    }
    return (
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex items-center gap-3.5 group">
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 shadow-sm transition-transform group-hover:scale-110">
            <Phone size={14} strokeWidth={2.5} />
          </div>
          <a href={`tel:${phoneData.primary}`} className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">{phoneData.primary}</a>
        </div>
        <div className="flex items-center gap-3.5 group">
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 shadow-sm transition-transform group-hover:scale-110">
            <Phone size={14} strokeWidth={2.5} />
          </div>
          <a href={`tel:${phoneData.secondary}`} className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">{phoneData.secondary}</a>
        </div>
      </div>
    );
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-primary/5 border-b border-border/50 p-6 text-center relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                <Lock size={20} />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">Verify Contact Details</h3>
              <p className="text-sm text-muted-foreground">For security, please verify your email to unlock direct contact numbers.</p>
            </div>

            <div className="p-6">
              {step === 'contact' ? (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={16} />
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={16} />
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  {error && <p className="text-destructive text-xs font-medium">{error}</p>}
                  
                  <button 
                    type="submit" 
                    disabled={loading || !email || !phone}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <>Send Verification Code <ArrowRight size={16} /></>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium mb-3">
                      <CheckCircle2 size={14} /> Code sent to {email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5 text-center">Enter 6-Digit Code</label>
                    <input 
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full text-center tracking-[0.5em] font-display font-bold text-2xl py-3 rounded-xl bg-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      placeholder="------"
                    />
                  </div>
                  
                  {error && <p className="text-destructive text-xs font-medium text-center">{error}</p>}
                  
                  <button 
                    type="submit" 
                    disabled={loading || code.length < 6}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Verify & Unlock"}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => { setStep('contact'); setCode(""); setError(""); }}
                    className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-2"
                  >
                    Use a different email
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {variant === 'footer-whatsapp' && (
        <button onClick={() => setIsOpen(true)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-gray-600 hover:text-[#25D366] transition-colors group relative cursor-pointer" title="Verify contact to message us on WhatsApp">
          <WhatsAppIcon size={15} />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center border-2 border-white">
            <Lock size={8} className="text-white" />
          </div>
        </button>
      )}
      
      {variant === 'sidebar-whatsapp' && (
        <button onClick={() => setIsOpen(true)} className="w-9 h-9 relative rounded-full flex items-center justify-center shadow-sm bg-[#25D366] hover:bg-[#20ba56] text-white shadow-[#25D366]/20 hover:scale-110 transition-transform cursor-pointer group" title="Verify contact to message us on WhatsApp">
          <MessageSquare size={18} />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center border-2 border-[#25D366] shadow-sm">
            <Lock size={8} className="text-white" />
          </div>
        </button>
      )}
      
      {variant === 'default' && (
        <div className="w-full">
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3.5 group cursor-pointer text-left w-full mt-1 mb-1"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Lock size={14} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">Verify Contact to Unlock</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">Secure OTP required for direct contact</span>
            </div>
          </button>
        </div>
      )}
      
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
