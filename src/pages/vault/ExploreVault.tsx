import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

export default function ExploreVault() {
  const [products, setProducts] = useState<any[]>([]);
  const [entitlements, setEntitlements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      const [prodRes, entRes] = await Promise.all([
        supabase.from("vault_products").select("*").order("created_at", { ascending: true }),
        session ? supabase.from("vault_entitlements").select("*").eq("user_id", session.user.id) : { data: [] }
      ]);

      if (prodRes.data) setProducts(prodRes.data);
      if (entRes.data) setEntitlements(entRes.data);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading catalog...</div>;
  }

  return (
    <>
      <SEO
        title="Explore Vault — TakeIN Studio Customer Portal"
        description="Discover resources, courses and digital products available from TakeIN Studio."
        url="https://takeinstudio.com/vault/dashboard/explore"
      />

      <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-gray-200 pb-8"
        >
          <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-1">
            CATALOG
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Explore the Vault
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Discover resources, courses and digital products available from TakeIN Studio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, idx) => {
            const entitlement = entitlements.find(e => e.product_id === product.id);
            const isOwned = entitlement?.status === "active";
            const isPending = entitlement?.status === "pending";
            const isComingSoon = product.status === "coming_soon";

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                    {product.category || "PRODUCT"}
                  </span>
                  {isOwned && (
                    <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 size={12} />
                      IN YOUR VAULT
                    </span>
                  )}
                  {isComingSoon && (
                    <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                      COMING SOON
                    </span>
                  )}
                  {isPending && !isOwned && !isComingSoon && (
                    <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                      VERIFICATION PENDING
                    </span>
                  )}
                </div>

                <div className="mb-5 border-b border-gray-100 pb-5">
                  <h2 className="font-display text-xl font-black text-gray-950 tracking-tight mb-1.5">
                    {product.name}
                  </h2>
                  <p className="text-[11px] text-gray-600 leading-relaxed h-12 line-clamp-3">
                    {product.description || product.short_description}
                  </p>
                </div>

                {!isOwned && !isComingSoon && (
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price_in}
                    </span>
                    <span className="text-xs text-gray-500 mb-1">INR</span>
                  </div>
                )}

                {isOwned ? (
                  <Link
                    to={`/vault/view/${product.slug}`}
                    className="w-full bg-white border border-gray-200 text-gray-900 py-3 rounded-xl font-black tracking-widest text-[10px] uppercase hover:bg-gray-50 shadow-sm transition-all flex items-center justify-center gap-2 mt-auto"
                  >
                    OPEN
                  </Link>
                ) : (
                  <Link
                    to={`/vault/${product.slug}`}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-black tracking-widest text-[10px] uppercase hover:bg-gray-800 shadow-sm transition-all flex items-center justify-center gap-2 mt-auto"
                  >
                    EXPLORE {product.name}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
