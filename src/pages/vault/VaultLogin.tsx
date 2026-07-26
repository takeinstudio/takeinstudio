import { useState } from "react";
import { Lock, User, ArrowRight, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

export default function VaultLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) throw error;

      if (data.session) {
        toast.success("Welcome to your Vault!");
        navigate("/vault/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Form Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <>
      <SEO
        title="Vault Login — TakeIN Studio Customer Vault"
        description="Sign in to access your digital vault resources, playbooks, and developer materials."
        url="https://takeinstudio.com/vault/login"
      />
      <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#FAF9F6] font-sans">

        {/* Left Column: Brand Cover & Slogan */}
        <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-cover bg-center select-none bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')]">

          {/* Soft overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55 z-0" />

          {/* Brand Logo Header */}
          <div className="z-10 flex items-center gap-2.5 self-start">
            <img src="/logo/logo_no_text.png" alt="TakeIN Studio" className="h-10 w-auto invert brightness-0" />
            <span className="font-display font-extrabold text-white text-xl tracking-tight">
              TakeIN Studio
            </span>
          </div>

          {/* Central Slogan Section */}
          <div className="mt-auto space-y-5 max-w-lg z-10">
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your Exclusive <span className="text-primary font-black">Digital Vault</span>
            </h2>
            <p className="text-white/80 text-sm font-semibold leading-relaxed">
              Access your premium resources, training materials, and support directly from the TakeIN Studio team.
            </p>

            {/* Accent Pill Badge */}
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                CAREER PORTAL
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Premium Off-White Login Form */}
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#FAF9F6] text-foreground relative z-10 min-h-screen">

          {/* Floating top-right back button */}
          <div className="self-end mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/80 bg-white/85 hover:bg-white text-xs font-bold text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm hover:shadow hover:scale-[1.02] backdrop-blur-sm"
            >
              <ArrowLeft size={14} /> BACK TO WEBSITE
            </Link>
          </div>

          {/* Animated Central Credential Card Form */}
          <div className="my-auto w-full max-w-md mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Heading text */}
              <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#161514]">
                  Sign in to your Vault
                </h1>
                <p className="text-muted-foreground text-sm font-semibold">
                  Enter your credentials to access your purchased resources.
                </p>
              </motion.div>

              {/* Input fields form */}
              <motion.form
                variants={itemVariants}
                onSubmit={handleLogin}
                className="space-y-5"
              >
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-[#5A5755] uppercase block">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative group">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#E5E2DE] text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-sm shadow-sm"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-[#5A5755] uppercase block">
                    PASSWORD
                  </label>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white border border-[#E5E2DE] text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-sm shadow-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit CTA button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-2 text-sm font-bold tracking-wider shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 disabled:opacity-75 disabled:pointer-events-none mt-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <span className="flex items-center gap-2">
                      SIGN IN <ArrowRight size={16} />
                    </span>
                  )}
                </motion.button>
              </motion.form>

              {/* Assistance Link */}
              <motion.div variants={itemVariants} className="text-center pt-2">
                <p className="text-xs text-muted-foreground font-semibold">
                  Forgot your password?{" "}
                  <Link to="/contact" className="text-primary hover:underline font-bold transition-colors">
                    Contact Support
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Brand Copyright Footer */}
          <p className="text-[10px] text-muted-foreground/75 font-semibold text-center mt-8 uppercase tracking-widest">
            © 2026 TakeIN Studio. All rights reserved.
          </p>

        </div>

      </div>
    </>
  );
}
