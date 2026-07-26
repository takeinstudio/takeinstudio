import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Phone, LogOut, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";

export default function AccountVault() {
  const [profile, setProfile] = useState<any>(null);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdError, setPwdError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [profileRes, purchasesRes] = await Promise.all([
        supabase.from("vault_profiles").select("*").eq("id", session.user.id).single(),
        supabase.from("vault_purchases").select("*, vault_products(*)").eq("user_id", session.user.id).order("purchased_at", { ascending: false })
      ]);

      if (profileRes.data) {
        const phone = session.user.phone
          || session.user.user_metadata?.phone
          || session.user.user_metadata?.Phone
          || profileRes.data.phone
          || null;
        setProfile({ ...profileRes.data, phone });
      }
      if (purchasesRes.data) setPurchases(purchasesRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/vault/login");
  };

  const handlePasswordChange = async () => {
    setPwdError("");
    setPwdSuccess(false);

    if (!newPassword || newPassword.length < 8) {
      setPwdError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("Passwords do not match.");
      return;
    }

    setPwdLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      // Log notification for admin
      const { data: { session } } = await supabase.auth.getSession();
      await supabase.from("vault_notifications").insert({
        type: "password_changed",
        user_id: session?.user.id,
        user_email: session?.user.email,
        user_name: profile?.full_name || session?.user.email,
        message: `Vault member ${profile?.full_name || session?.user.email} changed their password.`,
        read: false,
      });

      setPwdSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwdError(err.message || "Failed to update password. Please try again.");
    }
    setPwdLoading(false);
  };

  if (loading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading account...</div>;
  }

  return (
    <>
      <SEO
        title="Account — TakeIN Studio Customer Portal"
        description="Manage your TakeIN Studio Vault account and view your purchase history."
        url="https://takeinstudio.com/vault/dashboard/account"
      />

      <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-gray-200 pb-8"
        >
          <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-1">
            SETTINGS & HISTORY
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Account
          </h1>
        </motion.div>

        <div className="space-y-8">

          {/* ── Profile Info ── */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display text-xl font-bold text-gray-950 mb-6">Profile Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 flex items-center gap-2">
                  <User size={12} /> FULL NAME
                </label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-900">
                  {profile?.full_name || "Not provided"}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 flex items-center gap-2">
                  <Mail size={12} /> EMAIL ADDRESS
                </label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-900">
                  {profile?.email}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 flex items-center gap-2">
                  <Phone size={12} /> PHONE NUMBER
                </label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-900">
                  {profile?.phone || "Not provided"}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 flex items-center gap-2">
                  <Calendar size={12} /> MEMBER SINCE
                </label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-900">
                  {new Date(profile?.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </motion.section>

          {/* ── Change Password ── */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <KeyRound size={16} className="text-[#FF6B00]" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-gray-950 leading-tight">Change Password</h2>
                <p className="text-xs text-gray-400 mt-0.5">Set a new secure password for your Vault account.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* New Password */}
              <div>
                <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 block">
                  NEW PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2 block">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className={`w-full p-3 pr-10 bg-gray-50 border rounded-xl text-sm font-medium text-gray-900 focus:outline-none transition-all ${
                      confirmPassword && confirmPassword !== newPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100"
                        : confirmPassword && confirmPassword === newPassword
                        ? "border-green-300 focus:border-green-400 focus:ring-1 focus:ring-green-100"
                        : "border-gray-200 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {/* Live match indicator */}
                {confirmPassword && (
                  <p className={`text-[10px] font-bold mt-1.5 flex items-center gap-1 ${
                    confirmPassword === newPassword ? "text-green-600" : "text-red-500"
                  }`}>
                    {confirmPassword === newPassword
                      ? <><CheckCircle2 size={10} /> Passwords match</>
                      : <><AlertCircle size={10} /> Passwords do not match</>
                    }
                  </p>
                )}
              </div>
            </div>

            {/* Feedback */}
            {pwdError && (
              <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <AlertCircle size={15} /> {pwdError}
              </div>
            )}
            {pwdSuccess && (
              <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <CheckCircle2 size={15} /> Password updated successfully!
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePasswordChange}
                disabled={pwdLoading || !newPassword || !confirmPassword}
                className="flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
              >
                {pwdLoading ? (
                  <><span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full" /> Updating…</>
                ) : (
                  <><KeyRound size={13} /> Update Password</>
                )}
              </button>
            </div>
          </motion.section>

          {/* ── Purchase History ── */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <h2 className="font-display text-xl font-bold text-gray-950">Purchase History</h2>
            </div>

            {purchases.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No purchases found on this account.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Product</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {purchases.map(purchase => (
                      <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-sm text-gray-900">
                          {purchase.vault_products?.name || "Unknown Product"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(purchase.purchased_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            purchase.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {purchase.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.section>

        </div>
      </div>
    </>
  );
}
