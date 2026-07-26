import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Phone, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";

export default function AccountVault() {
  const [profile, setProfile] = useState<any>(null);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [profileRes, purchasesRes] = await Promise.all([
        supabase.from("vault_profiles").select("*").eq("id", session.user.id).single(),
        supabase.from("vault_purchases").select("*, vault_products(*)").eq("user_id", session.user.id).order("purchased_at", { ascending: false })
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (purchasesRes.data) setPurchases(purchasesRes.data);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/vault/login");
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
          {/* Profile Section */}
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

          {/* Purchases Section */}
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
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest hidden sm:table-cell">Reference</th>
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
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                          {purchase.currency === 'INR' ? '₹' : purchase.currency} {purchase.amount}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-gray-400 hidden sm:table-cell">
                          {purchase.provider_payment_id || purchase.id.split('-')[0]}
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
