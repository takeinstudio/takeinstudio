import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageSquare, Package, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

export default function VaultDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [entitlements, setEntitlements] = useState<any[]>([]);
  const [supportCount, setSupportCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [profileRes, entRes, suppRes] = await Promise.all([
        supabase.from("vault_profiles").select("*").eq("id", session.user.id).single(),
        supabase.from("vault_entitlements").select("*, vault_products(*)").eq("user_id", session.user.id),
        supabase.from("vault_support_conversations").select("id", { count: "exact" }).eq("customer_id", session.user.id).eq("status", "awaiting_customer")
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (entRes.data) setEntitlements(entRes.data);
      if (suppRes.count !== null) setSupportCount(suppRes.count);

      setLoading(false);
    };
    fetchData();
  }, []);

  const getFirstName = (fullName: string) => fullName ? fullName.split(" ")[0] : "";
  const activeEntitlements = entitlements.filter(e => e.status === "active");
  const latestEntitlement = activeEntitlements.length > 0 ? activeEntitlements.reduce((a, b) => new Date(a.granted_at) > new Date(b.granted_at) ? a : b) : null;
  const latestProduct = latestEntitlement?.vault_products;

  if (loading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading your Vault...</div>;
  }

  return (
    <>
      <SEO
        title="Vault Dashboard — TakeIN Studio Customer Portal"
        description="Access your purchased playbooks, digital volumes, and developer tools."
        url="https://takeinstudio.com/vault/dashboard"
      />

      <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-gray-200 pb-8"
        >
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Welcome back, {getFirstName(profile?.full_name) || profile?.email.split('@')[0]} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Your TakeIN Studio Vault. Access your purchased resources, manage your account and get support.
          </p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Package size={14} />
              <p className="text-[10px] tracking-widest font-black uppercase">MY PRODUCTS</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{entitlements.length}</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-[#FF6B00] mb-2">
              <CheckCircle2 size={14} />
              <p className="text-[10px] tracking-widest font-black uppercase">ACTIVE ACCESS</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeEntitlements.length}</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MessageSquare size={14} />
              <p className="text-[10px] tracking-widest font-black uppercase">SUPPORT</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{supportCount} <span className="text-xs font-normal text-gray-500">Replies</span></p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Clock size={14} />
              <p className="text-[10px] tracking-widest font-black uppercase">MEMBER SINCE</p>
            </div>
            <p className="text-sm font-bold text-gray-900 mt-2">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown'}
            </p>
          </div>
        </div>

        {latestProduct ? (
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div className="mb-6 border-b border-gray-100 pb-4">
                <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-1">
                  CONTINUE LEARNING
                </p>
                <h2 className="font-display text-2xl font-black text-gray-950 tracking-tight">
                  {latestProduct.name}
                </h2>
                <p className="text-xs text-gray-500 mt-1">{latestProduct.short_description}</p>
              </div>

              <div className="mb-6 text-sm font-semibold text-gray-700">
                BUILD <span className="text-gray-300 mx-2">→</span> ENGINEER <span className="text-gray-300 mx-2">→</span> EARN
              </div>

              <Link
                to={`/vault/${latestProduct.slug}/access`}
                className="w-full bg-[#FF6B00] text-white py-3.5 rounded-xl font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                OPEN {latestProduct.name}
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] font-black text-gray-400 uppercase mb-4">
                  RECENT PURCHASE
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck size={20} className="text-green-500" />
                  <h3 className="font-display text-lg font-bold text-gray-950">{latestProduct.name}</h3>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-green-600 capitalize">{latestEntitlement.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Access Granted</span>
                    <span className="font-medium text-gray-900">{new Date(latestEntitlement.granted_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/vault/dashboard/account"
                className="w-full mt-6 bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                VIEW PURCHASE HISTORY
                <ChevronRight size={14} />
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm max-w-2xl mx-auto">
            <Package size={40} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-gray-950 mb-2">Your Vault is currently empty</h3>
            <p className="text-sm text-gray-500 mb-6">
              Explore TakeIN Studio resources and products to start building.
            </p>
            <Link
              to="/vault/dashboard/explore"
              className="inline-flex bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 shadow-md shadow-orange-500/20 transition-all items-center justify-center gap-2"
            >
              EXPLORE THE VAULT
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
