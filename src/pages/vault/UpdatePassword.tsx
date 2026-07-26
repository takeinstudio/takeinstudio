import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { toast } from "sonner";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is actually authenticated from the invite/recovery link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Invalid or expired invite link. Please try logging in.");
        navigate("/vault/login");
      } else {
        setIsSessionActive(true);
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;

      toast.success("Password updated successfully!");
      navigate("/vault/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!isSessionActive) {
    return (
      <div className="min-h-screen bg-[#FCFBF9] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6B00]" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Secure Your Account — TakeIN Studio Vault"
        description="Set your password to secure your TakeIN Studio Vault."
        url="https://takeinstudio.com/vault/update-password"
      />
      
      <div className="min-h-screen bg-[#FCFBF9] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm relative overflow-hidden">
          
          <div className="mb-10 text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-100">
              <Lock className="text-[#FF6B00] w-6 h-6" />
            </div>
            <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-2">
              WELCOME TO THE VAULT
            </p>
            <h1 className="font-display text-2xl font-black text-gray-950 tracking-tight">
              Set Your Password
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Please choose a secure password to access your TakeIN Studio digital resources.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase block mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-sm font-medium"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            
            <div>
              <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase block mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-sm font-medium"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B00] hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-[#FF6B00] text-white py-3.5 rounded-xl font-black tracking-widest text-xs uppercase shadow-sm transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Secure Account"}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
