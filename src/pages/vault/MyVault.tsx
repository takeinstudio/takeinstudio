import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

export default function MyVault() {
  const [entitlements, setEntitlements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntitlements = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("vault_entitlements")
        .select("*, vault_products(*)")
        .eq("user_id", session.user.id)
        .order("granted_at", { ascending: false });

      if (data) setEntitlements(data);
      setLoading(false);
    };
    fetchEntitlements();
  }, []);

  if (loading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading your resources...</div>;
  }

  return (
    <>
      <SEO
        title="My Vault — TakeIN Studio Customer Portal"
        description="Your purchased TakeIN Studio resources, courses and digital products in one place."
        url="https://takeinstudio.com/vault/dashboard/my-vault"
      />

      <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-gray-200 pb-8"
        >
          <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-1">
            DIGITAL LIBRARY
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            My Vault
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Your purchased TakeIN Studio resources, courses and digital products in one place.
          </p>
        </motion.div>

        {entitlements.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm max-w-2xl mx-auto">
            <Package size={40} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-gray-950 mb-2">You don't own any products yet</h3>
            <p className="text-sm text-gray-500 mb-6">
              Head over to Explore to see what's available.
            </p>
            <Link
              to="/vault/dashboard/explore"
              className="inline-flex bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 transition-all items-center justify-center gap-2"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {entitlements.map((ent, idx) => {
              const product = ent.vault_products;
              const isActive = ent.status === "active";
              const isPending = ent.status === "pending";
              const isRevoked = ent.status === "revoked";
              const isExpired = ent.status === "expired";

              return (
                <motion.div
                  key={ent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                      {product.category || "PRODUCT"}
                    </span>
                    {isActive && (
                      <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={12} />
                        ACTIVE ACCESS
                      </span>
                    )}
                    {isPending && (
                      <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock size={12} />
                        PENDING
                      </span>
                    )}
                    {(isRevoked || isExpired) && (
                      <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                        <AlertCircle size={12} />
                        {ent.status.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="mb-6 border-b border-gray-100 pb-6">
                    <h2 className="font-display text-2xl font-black text-gray-950 tracking-tight mb-2">
                      {product.name}
                    </h2>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {product.description || product.short_description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <Clock size={12} />
                    Purchased {new Date(ent.granted_at).toLocaleDateString()}
                  </div>

                  {isActive ? (
                    <Link
                      to={`/vault/${product.slug}/access`}
                      className="w-full bg-[#FF6B00] text-white py-3.5 rounded-xl font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 shadow-sm transition-all flex items-center justify-center"
                    >
                      CONTINUE
                    </Link>
                  ) : isPending ? (
                    <div className="w-full bg-gray-100 text-gray-500 py-3.5 rounded-xl font-black tracking-widest text-[11px] uppercase text-center border border-gray-200">
                      PAYMENT VERIFICATION IN PROGRESS
                    </div>
                  ) : (
                    <Link
                      to="/vault/dashboard/support"
                      className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-3.5 rounded-xl font-black tracking-widest text-[11px] uppercase text-center border border-gray-200 transition-colors"
                    >
                      CONTACT SUPPORT
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
