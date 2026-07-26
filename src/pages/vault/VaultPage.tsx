import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, ArrowRight, Lock, CheckCircle2, Users, Star,
  Sparkles, ChevronRight, Shield
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

// Fallback course data in case DB is loading or empty
const fallbackCourses = [
  {
    id: "aiwebdev-fallback",
    name: "The AI Web Developer's Playbook",
    slug: "aiwebdev",
    short_description: "A 3-volume technical handbook to build premium websites, SaaS platforms & client projects in hours using Claude Code, Antigravity IDE & the C.R.E.F. prompt system.",
    price: 99,
    currency: "INR",
    category: "Web Development",
    badge: "Vol I · II · III",
    highlights: [
      "44 Master Prompts — copy & paste ready",
      "3 Volumes: Tools, Code & Freelancing",
      "PDF + In-App Interactive Reader",
      "Lifetime Access · One-time payment",
    ],
    modules: 12,
    pages: "~64 pages",
    students: "50+",
    rating: 5,
  },
];

export default function VaultPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("vault_products")
        .select("*")
        .order("created_at", { ascending: false });
      setProducts(data && data.length > 0 ? data : []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Merge DB products with fallback metadata for display
  const courses = loading
    ? fallbackCourses
    : products.length > 0
    ? products.map((p) => ({
        ...fallbackCourses.find((f) => f.slug === p.slug) || fallbackCourses[0],
        ...p,
        highlights: fallbackCourses.find((f) => f.slug === p.slug)?.highlights || fallbackCourses[0].highlights,
        modules: fallbackCourses.find((f) => f.slug === p.slug)?.modules || 12,
        pages: fallbackCourses.find((f) => f.slug === p.slug)?.pages || "~64 pages",
        students: "50+",
        rating: 5,
      }))
    : fallbackCourses;

  return (
    <>
      <SEO
        title="TakeIN Vault — Premium AI & Web Development Courses"
        description="Explore premium digital handbooks and courses from TakeIN Studio. Learn to build with AI, ship fast, and earn more as a freelancer."
        url="https://takeinstudio.com/vault"
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#0f172a] pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <Lock size={11} /> Members-Only Digital Library
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
              TakeIN{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Vault
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Premium, practical courses and handbooks built for developers who want to ship real products fast using the latest AI tools.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {[
                { icon: Users, text: "50+ Students" },
                { icon: Star, text: "5.0 Rating" },
                { icon: Shield, text: "Lifetime Access" },
                { icon: Lock, text: "Secure Checkout" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon size={13} className="text-orange-400" />
                  <span className="text-xs font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Course Listing ── */}
      <section className="bg-[#0f172a] px-4 sm:px-6 lg:px-8 pb-24">
        <div className="container mx-auto max-w-6xl">

          {/* Section label */}
          <div className="flex items-center justify-between mb-8 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {loading ? "Loading courses..." : `${courses.length} Course${courses.length !== 1 ? "s" : ""} Available`}
            </p>
            <Link to="/vault/login" className="text-[10px] font-bold text-slate-500 hover:text-orange-400 flex items-center gap-1 transition-colors uppercase tracking-widest">
              Already enrolled? Sign in <ChevronRight size={11} />
            </Link>
          </div>

          {/* Course Cards */}
          <div className="space-y-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id || idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="relative bg-[#1e293b] border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl group hover:border-orange-500/30 transition-all duration-500">
                  {/* Orange top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />

                  <div className="grid lg:grid-cols-5 gap-0">
                    {/* Left — course info (3/5) */}
                    <div className="lg:col-span-3 p-8 sm:p-10">
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 text-[10px] font-black tracking-widest uppercase">
                          {course.badge || course.category || "Course"}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-black tracking-widest uppercase">
                          Live Now
                        </span>
                        {course.pages && (
                          <span className="px-3 py-1 rounded-full bg-slate-700/60 text-slate-400 text-[10px] font-bold">
                            {course.pages}
                          </span>
                        )}
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                        {course.name}
                      </h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg">
                        {course.short_description || course.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-8">
                        {(course.highlights || []).map((item: string) => (
                          <div key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center gap-5 flex-wrap">
                        <div>
                          <div className="text-4xl font-black text-white">
                            {course.currency === "INR" ? "₹" : "$"}{course.price}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5">One-time · No subscription</div>
                        </div>
                        <Link
                          to={`/vault/${course.slug}/checkout`}
                          className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-400 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_12px_35px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Get Instant Access <ArrowRight size={14} />
                        </Link>
                        <Link
                          to={`/vault/${course.slug}`}
                          className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                        >
                          View Details <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>

                    {/* Right — stats + modules (2/5) */}
                    <div className="lg:col-span-2 bg-[#0f172a]/60 border-t lg:border-t-0 lg:border-l border-slate-700/40 p-8 sm:p-10 flex flex-col justify-between">
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-4 mb-8 pb-6 border-b border-slate-800">
                        <div className="text-center">
                          <div className="text-xl font-black text-white">{course.modules || 12}</div>
                          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Modules</div>
                        </div>
                        <div className="text-center border-x border-slate-800">
                          <div className="text-xl font-black text-white">{course.students || "50+"}</div>
                          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-black text-white flex items-center justify-center gap-0.5">
                            {course.rating || 5}<Star size={12} className="text-amber-400 fill-amber-400" />
                          </div>
                          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Rating</div>
                        </div>
                      </div>

                      {/* What you get */}
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">What's Included</p>
                        <div className="space-y-2">
                          {[
                            "3 Premium PDF Volumes",
                            "In-App Interactive Reader",
                            "44 Copy-Paste Prompts",
                            "Freelance Business Templates",
                            "Private Vault Access",
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                              <div className="w-4 h-4 rounded bg-orange-500/15 border border-orange-500/25 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 size={9} className="text-orange-400" />
                              </div>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Already enrolled */}
                      <div className="mt-6 pt-5 border-t border-slate-800">
                        <Link
                          to="/vault/login"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 text-xs font-bold transition-all"
                        >
                          <Lock size={11} /> Already enrolled? Access your Vault
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 border-2 border-dashed border-slate-700/40 rounded-3xl p-10 text-center"
          >
            <Sparkles size={24} className="mx-auto text-slate-600 mb-3" />
            <p className="text-sm font-bold text-slate-500">More courses coming soon</p>
            <p className="text-xs text-slate-600 mt-1">Advanced AI SaaS Builder · Freelance Client System · Agency Growth OS</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
