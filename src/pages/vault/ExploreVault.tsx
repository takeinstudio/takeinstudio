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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.filter(p => p.status !== "coming_soon").map((product, idx) => {
            const studentCount = product.slug === "aiwebdev" ? "35" : "50+";

            return (
              <motion.div
                key={product.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all shadow-sm group overflow-hidden relative"
              >
                <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-black tracking-widest uppercase text-gray-400">
                      {product.category || "Execution Guide"}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={10} /> AVAILABLE
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-black text-gray-950 tracking-tight leading-tight mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 line-clamp-3">
                    {product.description || product.short_description}
                  </p>

                  <div className="flex gap-4 py-3 border-y border-gray-100 mb-6 mt-auto">
                    <div className="text-center pr-4 border-r border-gray-100">
                      <div className="text-sm font-black text-gray-900">{studentCount}</div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Students</div>
                    </div>
                    <div className="text-center px-4">
                      <div className="text-sm font-black text-gray-900">5.0★</div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Rating</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-gray-950">₹{product.price_in || product.price || 99}</span>
                    </div>
                    <Link
                      to={`/vault/${product.slug}`}
                      className="bg-gray-950 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                    >
                      EXPLORE <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <section className="bg-[#fafaf8] -mx-4 sm:-mx-8 px-4 sm:px-8 py-12 lg:py-16 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Vote For Next
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={10} /> Upcoming Releases
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.status === "coming_soon").map((product, idx) => {
                return (
                  <motion.div
                    key={product.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white border border-gray-200 rounded-2xl flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all shadow-sm group overflow-hidden relative opacity-90"
                  >
                    <div className="h-1 w-full bg-gray-200" />
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-black tracking-widest uppercase text-gray-400">
                          {product.category || "Execution Guide"}
                        </span>
                        <button 
                          onClick={() => toast.success(`Thanks for voting! We'll let you know when ${product.name} is ready.`)}
                          className="bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full transition-colors"
                        >
                          VOTE NOW
                        </button>
                      </div>

                      <h3 className="font-display text-xl font-black text-gray-400 tracking-tight leading-tight mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium leading-relaxed mb-6 line-clamp-3">
                        {product.description || product.short_description}
                      </p>

                      <div className="flex gap-4 py-3 border-y border-gray-100 mb-6 mt-auto">
                        <div className="text-center pr-4 border-r border-gray-100">
                          <div className="text-sm font-black text-gray-400">Upcoming</div>
                          <div className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Students</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-black text-gray-300">TBA</span>
                        </div>
                        <button
                          onClick={() => toast.success(`Your vote for ${product.name} has been recorded!`)}
                          className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg transition-all"
                        >
                          VOTE
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
