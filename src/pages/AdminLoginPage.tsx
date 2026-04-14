import { useState } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only — no real auth
    if (email && password) {
      localStorage.setItem("takein_demo_auth", "true");
      navigate("/admin/dashboard");
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center section-padding relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-blob-delayed" />
      </div>

      <div className="glass-card p-10 sm:p-12 max-w-md w-full relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground text-sm">Sign in to TakeIN Studio dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} pl-11`}
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pl-11`}
            />
          </div>
          <button type="submit" className="glow-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 text-sm">
            Sign In <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Demo only — enter any email & password
        </p>
      </div>
    </div>
  );
}
