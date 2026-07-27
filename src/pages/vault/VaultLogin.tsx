import { useState, useEffect } from "react";
import { Lock, User, ArrowRight, ArrowLeft, Loader2, Mail, Phone, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";
import { sendWelcomeEmail } from "@/lib/email";

export default function VaultLogin() {
  const [step, setStep] = useState<"email" | "otp" | "profile">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) throw error;
      
      toast.success("One-time code sent to your email!");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      if (data.session) {
        // Check if user has a complete profile
        const { data: profile } = await supabase
          .from("vault_profiles")
          .select("full_name, phone")
          .eq("id", data.session.user.id)
          .single();

        if (!profile || !profile.full_name || !profile.phone) {
          // Needs onboarding
          setStep("profile");
        } else {
          // Profile is complete, go to dashboard
          toast.success("Welcome back to your Vault!");
          navigate("/vault/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete Profile
  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !password) return toast.error("Please fill all fields");
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No active session");

      // Set password
      const { error: pwdError } = await supabase.auth.updateUser({ password });
      if (pwdError) throw pwdError;

      // Update profile
      const { error: profileError } = await supabase
        .from("vault_profiles")
        .update({ full_name: name, phone: phone, role: 'customer' })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Trigger Welcome Email via Brevo
      await sendWelcomeEmail(email, name);

      toast.success("Profile complete! Welcome to your Vault.");
      navigate("/vault/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  // Allow signing in with password directly if they already have one
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session) {
        toast.success("Welcome back!");
        navigate("/vault/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <SEO
        title="Member Access — TakeIN Studio Customer Vault"
        description="Sign in to access your digital vault resources, playbooks, and developer materials."
        url="https://takeinstudio.com/vault/login"
      />
      <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#FAF9F6] font-sans">

        {/* Left Column */}
        <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-cover bg-center select-none bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55 z-0" />
          
          <div className="z-10 flex items-center gap-2.5 self-start">
            <img src="/logo/logo_no_text.png" alt="TakeIN Studio" className="h-10 w-auto invert brightness-0" />
            <span className="font-display font-extrabold text-white text-xl tracking-tight">
              TakeIN Studio
            </span>
          </div>

          <div className="mt-auto space-y-5 max-w-lg z-10">
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your Exclusive <span className="text-primary font-black">Digital Vault</span>
            </h2>
            <p className="text-white/80 text-sm font-semibold leading-relaxed">
              Access your premium resources, training materials, and support directly from the TakeIN Studio team.
            </p>
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                MEMBER ACCESS
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#FAF9F6] text-foreground relative z-10 min-h-screen">
          <div className="self-end mb-8">
            <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/80 bg-white/85 hover:bg-white text-xs font-bold text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm hover:shadow hover:scale-[1.02] backdrop-blur-sm">
              <ArrowLeft size={14} /> BACK TO WEBSITE
            </Link>
          </div>

          <div className="my-auto w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: EMAIL */}
              {step === "email" && (
                <motion.div key="step-email" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#161514]">Sign In or Create Account</h1>
                    <p className="text-muted-foreground text-sm font-semibold">New? We'll send a one-time code — no password needed.</p>
                  </motion.div>

                  <motion.form variants={itemVariants} onSubmit={handleSendOtp} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-[#5A5755] uppercase block">EMAIL ADDRESS</label>
                      <div className="relative group">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                        <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#E5E2DE] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm" required />
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-2 text-sm font-bold tracking-wider shadow-lg shadow-primary/20 transition-all disabled:opacity-75 mt-2">
                      {loading ? <Loader2 className="animate-spin" size={16} /> : <span className="flex items-center gap-2">CONTINUE WITH EMAIL <ArrowRight size={16} /></span>}
                    </button>
                  </motion.form>
                  
                  {/* Password Fallback for existing users */}
                  <motion.div variants={itemVariants} className="pt-6 border-t border-border/50">
                    <p className="text-xs text-muted-foreground font-semibold mb-4 text-center">Already have a password set up?</p>
                    <form onSubmit={handlePasswordLogin} className="space-y-4">
                      <div className="relative group">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-11 py-3 rounded-xl bg-white border border-[#E5E2DE] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground">
                           {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      <button type="submit" disabled={loading || !email || !password} className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted flex items-center justify-center text-xs font-bold transition-all disabled:opacity-50">
                        Sign In with Password
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}

              {/* STEP 2: OTP */}
              {step === "otp" && (
                <motion.div key="step-otp" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <button onClick={() => setStep("email")} className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4"><ArrowLeft size={12}/> Back</button>
                    <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#161514]">Check your email</h1>
                    <p className="text-muted-foreground text-sm font-semibold">We sent a 6-digit code to <span className="text-foreground">{email}</span></p>
                  </motion.div>

                  <motion.form variants={itemVariants} onSubmit={handleVerifyOtp} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-[#5A5755] uppercase block">LOGIN CODE</label>
                      <input type="text" placeholder="123456" value={otp} onChange={e => setOtp(e.target.value)} className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#E5E2DE] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-center text-2xl tracking-[0.5em] font-mono shadow-sm" required maxLength={6} />
                    </div>
                    <button type="submit" disabled={loading || otp.length < 6} className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-2 text-sm font-bold tracking-wider shadow-lg shadow-primary/20 transition-all disabled:opacity-75 mt-2">
                      {loading ? <Loader2 className="animate-spin" size={16} /> : "VERIFY CODE"}
                    </button>
                  </motion.form>
                </motion.div>
              )}

              {/* STEP 3: ONBOARDING PROFILE */}
              {step === "profile" && (
                <motion.div key="step-profile" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#161514]">Complete your profile</h1>
                    <p className="text-muted-foreground text-sm font-semibold">Just a few more details to set up your Vault.</p>
                  </motion.div>

                  <motion.form variants={itemVariants} onSubmit={handleCompleteProfile} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-[#5A5755] uppercase block">FULL NAME</label>
                      <div className="relative group">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                        <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#E5E2DE] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-[#5A5755] uppercase block">PHONE NUMBER</label>
                      <div className="relative group">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                        <input type="tel" placeholder="+91 9876543210" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#E5E2DE] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-[#5A5755] uppercase block">SET PASSWORD <span className="lowercase normal-case text-muted-foreground">(for future logins)</span></label>
                      <div className="relative group">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white border border-[#E5E2DE] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm" required minLength={6} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground">
                           {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-2 text-sm font-bold tracking-wider shadow-lg shadow-primary/20 transition-all disabled:opacity-75 mt-2">
                      {loading ? <Loader2 className="animate-spin" size={16} /> : "FINISH SETUP"}
                    </button>
                  </motion.form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          <p className="text-[10px] text-muted-foreground/75 font-semibold text-center mt-8 uppercase tracking-widest">
            © 2026 TakeIN Studio. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
