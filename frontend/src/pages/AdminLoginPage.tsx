import { useState } from "react";
import { Lock, User, ArrowRight, ArrowLeft, LayoutDashboard, Users, FolderKanban } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("takein_demo_auth", "true");
      navigate("/admin/dashboard");
      toast.success("Welcome back, Administrator!");
    } else {
      toast.error("Invalid administrator credentials.");
    }
  };

  const features = [
    {
      icon: LayoutDashboard,
      title: "System Overview",
      desc: "Monitor studio analytics, active project tracks, and system health."
    },
    {
      icon: Users,
      title: "Client Management",
      desc: "Process incoming inquiries, consult queries, and project specs."
    },
    {
      icon: FolderKanban,
      title: "Creative Updates",
      desc: "Easily manage work portfolios, update prices, and edit offerings."
    }
  ];

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
    <div className="min-h-screen w-full flex items-center justify-center bg-cream/30 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Dot & Mesh Glow Texture */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating Back to Home button in top-left */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-20 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/60 text-xs font-bold text-muted-foreground hover:text-foreground hover:scale-105 transition-all shadow-md backdrop-blur-md"
      >
        <ArrowLeft size={14} /> Back to Home
      </Link>

      {/* Main Split-Screen Panel Container Card */}
      <div className="relative w-full max-w-4xl min-h-[580px] grid grid-cols-1 md:grid-cols-2 rounded-[2.5rem] bg-card border border-border/40 shadow-2xl overflow-hidden z-10">
        
        {/* Left Side: Brand Colored Feature Console */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-primary via-orange-600 to-amber-600 text-white relative overflow-hidden">
          {/* Subtle inside gradient blur shapes */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/10 blur-xl rounded-full" />
          <div className="absolute -bottom-20 -right-10 w-44 h-44 bg-amber-500/20 blur-2xl rounded-full" />

          {/* Fixed Logo Card inside Left Panel */}
          <div className="bg-white px-4 py-3 rounded-2xl border border-white/20 self-start shadow-lg flex items-center relative z-10">
            <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-8 w-auto object-contain mix-blend-multiply rounded-md" />
          </div>

          {/* Central Title Details */}
          <div className="my-auto space-y-6 relative z-10 py-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-black tracking-tight leading-tight">
                Admin Console
              </h2>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-medium">
                Securely manage website content, track consultation payments, and handle client inquiries from one central dashboard.
              </p>
            </div>

            {/* Structured Console Features */}
            <div className="space-y-4 pt-2">
              {features.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <item.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm leading-snug">{item.title}</h3>
                    <p className="text-white/70 text-[11px] font-medium leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer inside Left Panel */}
          <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest relative z-10">
            Internal Use Only · TakeIN Studio
          </p>
        </div>

        {/* Right Side: Clean White Login Panel */}
        <div className="flex flex-col justify-center p-8 sm:p-12 md:p-14 bg-card text-foreground relative">
          
          {/* Animated Central Login Card Form Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            
            {/* Mini Avatar and Title Row */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                {/* Pulse Glow Border Ring */}
                <span className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 animate-ping opacity-75" />
                <motion.div 
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="relative w-12 h-12 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-black shadow-lg"
                >
                  <span className="text-base tracking-tighter">&lt;T&gt;</span>
                </motion.div>
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-wider mb-0.5 animate-pulse">
                  Admin Login
                </span>
                <h1 className="font-display text-lg sm:text-xl font-bold leading-tight tracking-tight">
                  Welcome Back, Admin
                </h1>
              </div>
            </motion.div>

            {/* Subtext info */}
            <motion.p variants={itemVariants} className="text-muted-foreground text-xs font-semibold leading-relaxed">
              Enter your credentials to securely access the portal.
            </motion.p>

            {/* Sign-in Form */}
            <motion.form 
              variants={itemVariants}
              onSubmit={handleLogin} 
              className="space-y-4 pt-1"
            >
              
              {/* Username Input */}
              <div className="relative group">
                <User size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-sm shadow-sm"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Lock size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder="Secret Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-sm shadow-sm"
                  required
                />
              </div>

              {/* Submit Action Button in primary orange theme */}
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.995 }}
                className="glow-btn bg-primary text-primary-foreground w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold tracking-wide mt-6 shadow-lg shadow-primary/20"
              >
                SIGN IN <ArrowRight size={16} />
              </motion.button>
            </motion.form>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
