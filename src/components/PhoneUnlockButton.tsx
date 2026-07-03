import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useUser, useSignIn, useSignUp } from "@clerk/clerk-react";
import { Phone, Lock, X, ArrowRight, Loader2, CheckCircle2, Mail, Smartphone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function PhoneUnlockButton() {
  const { isSignedIn, user } = useUser();
  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'contact' | 'verify'>('contact');
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Custom state for Phone.Email bypass
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // Sync to Supabase in the background once signed in (Clerk Flow)
  useEffect(() => {
    if (isSignedIn && user) {
      const hasEmail = user.emailAddresses && user.emailAddresses.length > 0;
      
      if (!hasEmail) return;

      const syncKey = `synced_lead_${user.id}`;
      if (!localStorage.getItem(syncKey)) {
        const syncLead = async () => {
          try {
            const capturedEmail = hasEmail ? user.emailAddresses[0].emailAddress : 'N/A';

            await supabase.from('leads').insert([{
              name: 'Verified Contact Lead',
              email: capturedEmail,
              phone: 'Verified via Clerk Email OTP',
              company: 'N/A',
              message: 'Captured via Contact Unlock Button',
              status: 'New'
            }]);
            localStorage.setItem(syncKey, 'true');
          } catch (error) {
            console.error("Failed to sync lead to Supabase:", error);
          }
        };
        syncLead();
      }
    }
  }, [isSignedIn, user]);

  // Phone.Email SDK Injection
  useEffect(() => {
    if (isOpen && authType === 'phone') {
      const script = document.createElement('script');
      script.src = "https://www.phone.email/sign_in_button_v1.js";
      script.async = true;
      const buttonContainer = document.querySelector('.pe_signin_button');
      if (buttonContainer) {
        buttonContainer.appendChild(script);
      }

      // @ts-ignore
      window.phoneEmailListener = async function(userObj: any) {
        const user_json_url = userObj.user_json_url;
        try {
          const response = await fetch(user_json_url);
          const data = await response.json();
          
          const verifiedPhone = `${data.user_country_code}${data.user_phone_number}`;
          
          // Save to Supabase
          await supabase.from('leads').insert([{
            name: 'Phone.Email Verified Lead',
            email: 'Verified via Phone.Email',
            phone: verifiedPhone,
            company: 'N/A',
            message: 'Captured via Phone.Email Button',
            status: 'New'
          }]);
          
          setIsPhoneVerified(true);
          setIsOpen(false);
        } catch (err) {
          console.error("Failed to fetch verified phone details", err);
          setError("Failed to verify phone details.");
        }
      };
    }

    return () => {
      // @ts-ignore
      window.phoneEmailListener = null;
    };
  }, [isOpen, authType]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignInLoaded || !isSignUpLoaded) return;
    setError("");
    setLoading(true);

    try {
      if (authType === 'email') {
        const { supportedFirstFactors } = await signIn.create({
          identifier: email,
          strategy: "email_code",
        });
        
        const emailFactor = supportedFirstFactors?.find(
          (factor) => factor.strategy === "email_code"
        );
        
        if (emailFactor && emailFactor.strategy === "email_code") {
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId: emailFactor.emailAddressId,
          });
          setStep('verify');
        }
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "form_identifier_not_found") {
        try {
          await signUp.create({ emailAddress: email });
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
          setStep('verify');
        } catch (signupErr: any) {
          setError(signupErr.errors?.[0]?.message || "Failed to initiate sign up.");
        }
      } else {
        setError(err.errors?.[0]?.message || "Invalid email address.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignInLoaded || !isSignUpLoaded) return;
    setError("");
    setLoading(true);

    try {
      if (signIn.status === "needs_first_factor") {
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code,
        });
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          setIsOpen(false);
        }
      } else if (signUp.status === "missing_requirements") {
        const result = await signUp.attemptEmailAddressVerification({ code });
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          setIsOpen(false);
        }
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  if (isSignedIn || isPhoneVerified) {
    return (
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex items-center gap-3.5 group">
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 shadow-sm transition-transform group-hover:scale-110">
            <Phone size={14} strokeWidth={2.5} />
          </div>
          <a href="tel:+918908233590" className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">+91 89082 33590</a>
        </div>
        <div className="flex items-center gap-3.5 group">
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 shadow-sm transition-transform group-hover:scale-110">
            <Phone size={14} strokeWidth={2.5} />
          </div>
          <a href="tel:+919124442040" className="text-[12px] sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors">+91 91244 42040</a>
        </div>
      </div>
    );
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-card border border-border shadow-2xl rounded-2xl p-6 overflow-hidden flex flex-col items-center"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X size={18} />
              </button>

              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 self-start">
                {step === 'contact' ? (
                  authType === 'email' ? <Mail size={24} /> : <Smartphone size={24} />
                ) : <CheckCircle2 size={24} />}
              </div>

              <h3 className="font-display font-bold text-xl mb-1 text-foreground self-start">
                {step === 'contact' ? "Verify your contact info" : "Enter verification code"}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 self-start">
                {step === 'contact' 
                  ? "We'll send a code to verify your contact info before revealing our direct details."
                  : `We sent a 6-digit code to ${email}.`
                }
              </p>

              {step === 'contact' && (
                <div className="flex bg-muted/50 p-1 rounded-xl mb-6 w-full">
                  <button
                    onClick={() => { setAuthType('email'); setError(""); }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${authType === 'email' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => { setAuthType('phone'); setError(""); }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${authType === 'phone' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Phone
                  </button>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-500 text-center w-full">
                  {error}
                </div>
              )}

              {step === 'contact' ? (
                authType === 'email' ? (
                  <form onSubmit={handleSendCode} className="space-y-4 w-full">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Email Address</label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading || !email}
                      className="w-full glow-btn bg-primary text-primary-foreground py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : "Send Code"} 
                      {!loading && <ArrowRight size={16} />}
                    </button>
                  </form>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center pt-2">
                    <div className="pe_signin_button" data-client-id="12215360135870081321"></div>
                  </div>
                )
              ) : (
                <form onSubmit={handleVerify} className="space-y-4 w-full">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">6-Digit Code</label>
                    <input 
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-center tracking-[0.5em] font-mono font-bold"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading || code.length < 6}
                    className="w-full glow-btn bg-primary text-primary-foreground py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Verify & Unlock"} 
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep('contact')}
                    className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Wrong details? Go back
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
    </AnimatePresence>
  );

  return (
    <>
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
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
