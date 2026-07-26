import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Users, Star, Lock, BookOpen,
  Shield, Sparkles, ChevronRight, Download, Play, Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

const fallbackCourse = {
  id: "aiwebdev",
  name: "The AI Web Developer's Playbook",
  slug: "aiwebdev",
  short_description:
    "A 3-volume technical handbook to build premium websites, SaaS platforms & client projects in hours using Claude Code, Antigravity IDE & the C.R.E.F. prompt system.",
  price: 99,
  currency: "INR",
  highlights: [
    "44 Master Prompts — copy & paste ready",
    "3 Volumes: Tools, Code & Freelancing",
    "PDF + In-App Interactive Reader",
    "Lifetime Access · One-time payment",
  ],
  included: [
    "3 Premium PDF Volumes",
    "In-App Interactive Reader",
    "44 Copy-Paste Prompts",
    "Freelance Business Templates",
    "Private Vault Access",
  ],
  volumes: ["Volume I — AI-Native Foundations & Claude Code", "Volume II — Code Blueprints & Architecture", "Volume III — Freelance Manual & Client System"],
  modules: 12,
  pages: "~64 pages",
  students: "50+",
  rating: 5,
};

const trusts = [
  { icon: Users, label: "50+ Students" },
  { icon: Star, label: "5.0 Rating" },
  { icon: Shield, label: "Lifetime Access" },
  { icon: Download, label: "Instant Download" },
];

export default function VaultPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("vault_products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setProducts(data && data.length > 0 ? data : []);
        setLoading(false);
      });
  }, []);

  const courses =
    !loading && products.length > 0
      ? products.map((p) => ({ ...fallbackCourse, ...p }))
      : [fallbackCourse];

  return (
    <>
      <SEO
        title="TakeIN Vault — Premium AI & Web Development Courses"
        description="Explore premium digital handbooks from TakeIN Studio. Learn to build with AI, ship fast, and earn more as a freelancer."
        url="https://takeinstudio.com/vault"
      />

      {/* ──────────── HERO ──────────── */}
      <section className="relative bg-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-orange-100">
        {/* Ambient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-50 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8">
              <BookOpen size={11} />
              TakeIN Vault · Digital Courses
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-[1.03] mb-6">
              Learn to Build<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                with AI.
              </span>
            </h1>

            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Premium handbooks for developers who want to ship real products fast using Claude Code, Antigravity IDE, and proven prompt systems.
            </p>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trusts.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-500">
                  <Icon size={14} className="text-orange-500" />
                  <span className="text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────── COURSE LISTING ──────────── */}
      <section className="bg-[#fafaf8] px-4 sm:px-6 lg:px-8 py-16">
        <div className="container mx-auto max-w-5xl">

          {/* Row header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {loading ? "Loading…" : `${courses.length} Course${courses.length !== 1 ? "s" : ""} Available`}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Live Now</span>
            </div>
            <Link
              to="/vault/login"
              className="text-[10px] font-black text-gray-400 hover:text-orange-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              Already enrolled <ChevronRight size={11} />
            </Link>
          </div>

          {/* Cards */}
          <div className="space-y-8">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
              >
                <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-400 group">

                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400" />

                  <div className="grid lg:grid-cols-3">

                    {/* ── LEFT PANEL (2 cols) ── */}
                    <div className="lg:col-span-2 p-8 sm:p-10">

                      {/* Labels */}
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="bg-orange-50 border border-orange-200 text-orange-600 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                          Vol I · II · III
                        </span>
                        <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                          Live Now
                        </span>
                        <span className="bg-gray-100 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full">
                          {course.pages}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-[1.1] mb-3">
                        {course.name}
                      </h2>

                      <p className="text-gray-500 text-sm leading-relaxed mb-7 max-w-lg">
                        {course.short_description}
                      </p>

                      {/* Volumes list */}
                      <div className="space-y-2 mb-8">
                        {(course.volumes || fallbackCourse.volumes).map((v: string, i: number) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-md bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[8px] font-black text-orange-600">{i + 1}</span>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{v}</span>
                          </div>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 pt-7">
                        {/* Price + CTA */}
                        <div className="flex items-center gap-5 flex-wrap">
                          <div>
                            <div className="text-4xl font-black text-gray-950">
                              {course.currency === "INR" ? "₹" : "$"}{course.price}
                            </div>
                            <div className="text-gray-400 text-xs mt-0.5 font-medium">
                              One-time · No subscription
                            </div>
                          </div>

                          <Link
                            to={`/vault/${course.slug}/checkout`}
                            className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-[0_6px_24px_rgba(249,115,22,0.28)] hover:shadow-[0_10px_32px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            Get Instant Access <ArrowRight size={14} />
                          </Link>

                          <Link
                            to={`/vault/${course.slug}`}
                            className="text-gray-400 hover:text-orange-500 text-xs font-black uppercase tracking-widest flex items-center gap-1 transition-colors"
                          >
                            View Details <ChevronRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* ── RIGHT PANEL (1 col) ── */}
                    <div className="bg-[#fafaf8] border-t lg:border-t-0 lg:border-l border-gray-100 p-8 sm:p-10 flex flex-col">

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-8 pb-6 border-b border-gray-100">
                        {[
                          { val: course.modules || 12, label: "Modules" },
                          { val: course.students || "50+", label: "Students" },
                          { val: `${course.rating || 5}★`, label: "Rating" },
                        ].map(({ val, label }) => (
                          <div key={label} className="text-center">
                            <div className="text-lg font-black text-gray-950">{val}</div>
                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-wider mt-0.5">{label}</div>
                          </div>
                        ))}
                      </div>

                      {/* What's included */}
                      <div className="flex-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">What's Included</p>
                        <div className="space-y-2.5">
                          {(course.included || fallbackCourse.included).map((item: string) => (
                            <div key={item} className="flex items-center gap-2.5">
                              <div className="w-4 h-4 rounded bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 size={9} className="text-orange-500" />
                              </div>
                              <span className="text-xs text-gray-600 font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Already enrolled */}
                      <Link
                        to="/vault/login"
                        className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600 text-xs font-black uppercase tracking-widest transition-all"
                      >
                        <Lock size={11} /> Access Your Vault
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center bg-white"
          >
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={18} className="text-orange-400" />
            </div>
            <p className="text-sm font-black text-gray-700 mb-1">More courses coming soon</p>
            <p className="text-xs text-gray-400 font-medium">
              Advanced AI SaaS Builder · Freelance Client OS · Agency Growth System
            </p>
          </motion.div>

        </div>
      </section>

      {/* ──────────── BOTTOM CTA ──────────── */}
      <section className="bg-white border-t border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3">Already have access?</p>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-gray-950 mb-3">
            Sign in to your Vault
          </h3>
          <p className="text-gray-400 text-sm mb-7 max-w-md mx-auto">
            Access your purchased courses, download PDFs, and read in the premium interactive viewer.
          </p>
          <Link
            to="/vault/login"
            className="inline-flex items-center gap-2 bg-gray-950 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-orange-200 hover:-translate-y-0.5"
          >
            <Lock size={13} /> Sign In to Vault <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </>
  );
}
