import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Users, Star, Lock, BookOpen,
  Shield, Sparkles, ChevronRight, Download, Mail, Loader2,
  ArrowLeft, Phone, User, Rocket, Compass, Calendar, Code, Briefcase, FileText
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

/* ─── Inline Auth Widget ─── */
type AuthStep = "email" | "otp" | "profile" | "done";

function AuthWidget() {
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    setError("");
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (err) { setError(err.message); setLoading(false); return; }
    setStep("otp");
    setLoading(false);
  };

  const verifyOtp = async () => {
    setError("");
    if (!otp || otp.length < 6) { setError("Enter the 6-digit code from your email."); return; }
    setLoading(true);
    let { data, error: err } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    
    // Fallback for brand new users: Supabase treats their first OTP as a "signup" token instead of an "email" token
    if (err && err.message.toLowerCase().includes("invalid")) {
      const retry = await supabase.auth.verifyOtp({ email, token: otp, type: "signup" });
      if (!retry.error) {
        data = retry.data;
        err = null;
      }
    }

    if (err) { setError(err.message); setLoading(false); return; }

    // Check if profile already exists
    const { data: profile } = await supabase
      .from("vault_profiles")
      .select("id, full_name")
      .eq("id", data.user!.id)
      .single();

    if (profile?.full_name) {
      // Existing user → go to dashboard
      navigate("/vault/dashboard");
    } else {
      // New user → collect profile
      setStep("profile");
    }
    setLoading(false);
  };

  const saveProfile = async () => {
    setError("");
    if (!name.trim()) { setError("Please enter your full name."); return; }
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Session expired. Please try again."); setLoading(false); return; }

    await supabase.from("vault_profiles").upsert({
      id: session.user.id,
      email: session.user.email,
      full_name: name.trim(),
      phone: phone.trim() || null,
    });

    navigate("/vault/dashboard");
    setLoading(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header strip */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
          <Lock size={15} className="text-white" />
        </div>
        <div>
          <p className="text-white font-black text-sm leading-tight">Member Access</p>
          <p className="text-white/75 text-[10px] font-semibold">Sign in or create your free account</p>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1 — Email */}
          {step === "email" && (
            <motion.div key="email" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendOtp()}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
              </div>
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <><Mail size={14} /> Continue with Email</>}
              </button>
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                New? We'll send a one-time code — no password needed.
              </p>
            </motion.div>
          )}

          {/* Step 2 — OTP */}
          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <button onClick={() => setStep("email")} className="text-gray-400 hover:text-gray-600">
                  <ArrowLeft size={15} />
                </button>
                <div>
                  <p className="text-sm font-black text-gray-900">Check your inbox</p>
                  <p className="text-xs text-gray-400">Code sent to <span className="font-bold text-gray-700">{email}</span></p>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">VERIFICATION CODE</label>
                <input
                  type="text"
                  maxLength={8}
                  value={otp}
                  onChange={e => setOtp(e.target.value.trim())}
                  onKeyDown={e => e.key === "Enter" && verifyOtp()}
                  placeholder="Enter code"
                  className="w-full text-center text-2xl font-black tracking-[0.3em] py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all uppercase"
                />
                {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
              </div>
              <button
                onClick={verifyOtp}
                disabled={loading || otp.length < 6}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <>Verify & Continue <ArrowRight size={13} /></>}
              </button>
              <button onClick={sendOtp} className="w-full text-center text-xs text-gray-400 hover:text-orange-500 font-semibold transition-colors">
                Resend code
              </button>
            </motion.div>
          )}

          {/* Step 3 — Profile */}
          {step === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div>
                <p className="text-sm font-black text-gray-900">Almost there!</p>
                <p className="text-xs text-gray-400 mt-0.5">Tell us your name to set up your Vault.</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">FULL NAME *</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">PHONE (optional)</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 9999999999"
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
              </div>
              <button
                onClick={saveProfile}
                disabled={loading || !name.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <>Enter My Vault <ArrowRight size={13} /></>}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Course data ─── */
const fallbackCourse = {
  id: "aiwebdev",
  name: "The AI Web Developer's Playbook",
  slug: "aiwebdev",
  short_description: "Build premium websites & SaaS platforms in hours using modern tools & prompt systems.",
  price: 99,
  currency: "INR",
  highlights: [
    "44 Master Prompts — copy & paste ready",
    "3 Volumes: Tools, Code & Freelancing",
    "PDF + In-App Interactive Reader",
    "Lifetime Access · One-time payment",
  ],
  volumes: [
    "Volume I — Foundations & Setup",
    "Volume II — Code Blueprints & Architecture",
    "Volume III — Freelance Manual & Client System",
  ],
  included: [
    "3 Premium PDF Volumes",
    "In-App Interactive Reader",
    "44 Copy-Paste Prompts",
    "Freelance Business Templates",
    "Private Vault Access",
  ],
  modules: 12,
  pages: "~64 pages",
  students: "50+",
  rating: 5,
};

const upcomingGuides = [
  { id: "ai-ml", name: "AI / ML Engineer", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
  { id: "fullstack", name: "Full-Stack Web Developer", icon: Code, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "data-science", name: "Data Science & Analyst", icon: Compass, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
  { id: "cybersecurity", name: "Cybersecurity", icon: Shield, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
  { id: "app-dev", name: "App Developer", icon: Phone, color: "text-cyan-500", bg: "bg-cyan-50", border: "border-cyan-200" },
  { id: "cloud-devops", name: "Cloud / DevOps", icon: Rocket, color: "text-sky-500", bg: "bg-sky-50", border: "border-sky-200" },
  { id: "sde", name: "Software Engineer (DSA+Prep)", icon: User, color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200" },
  { id: "ui-ux", name: "UI/UX Designer", icon: Star, color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" },
];

/* ─── Main Page ─── */
export default function VaultPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    supabase.from("vault_products").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setProducts(data || []); setLoading(false); });
  }, []);

  const courses = !loading && products.length > 0
    ? products.map(p => ({ ...fallbackCourse, ...p }))
    : [fallbackCourse];

  return (
    <>
      <SEO
        title="TakeIN Vault — Premium Tech Resources & Guides"
        description="Premium digital handbooks, roadmaps, and execution guides for tech careers."
        url="https://takeinstudio.com/vault"
      />

      {/* ── Hero ── */}
      <section className="bg-[#fafaf8] pt-24 pb-12 px-4 sm:px-6 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-80 h-80 bg-orange-50 rounded-full blur-[80px] pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left — headline */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <BookOpen size={11} className="text-orange-500" /> The Premium Tech Vault
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.05] mb-4">
                Execute Your <br />
                <span className="text-orange-500">Tech Career.</span>
              </h1>
              <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed mb-6 max-w-md">
                Premium resources, masterclasses, and complete Career Execution Guides to take you from Day 1 to Job Ready.
              </p>

              {/* Trust row */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Users, text: "Community" },
                  { icon: Star, text: "5.0 Rating" },
                  { icon: Shield, text: "Lifetime Access" },
                  { icon: Download, text: "Instant Resources" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-gray-500">
                    <Icon size={13} className="text-gray-400" />
                    <span className="text-xs font-semibold">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Auth widget or dashboard button */}
            <div className="w-full lg:w-80 flex-shrink-0 relative z-20">
              {isLoggedIn ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-4">
                    <Lock size={18} className="text-orange-500" />
                  </div>
                  <p className="font-black text-gray-900 text-sm mb-1">You're signed in</p>
                  <p className="text-xs text-gray-400 mb-4 font-medium">Access your purchased resources from your Vault dashboard.</p>
                  <Link
                    to="/vault/dashboard/my-vault"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    Open My Vault <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                <AuthWidget />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vault Marketplace Grid ── */}
      <section className="bg-white px-4 sm:px-6 py-12 lg:py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Premium Resources
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={10} /> The Complete Catalog
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => {
              const isComingSoon = product.status === "coming_soon" || !product.is_published;
              const studentCount = product.slug === "aiwebdev" ? "35" : "Upcoming";

              return (
                <motion.div
                  key={product.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white border border-gray-200 rounded-2xl flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all shadow-sm group overflow-hidden relative"
                >
                  <div className={`h-1 w-full ${isComingSoon ? 'bg-gray-200' : 'bg-gradient-to-r from-orange-500 to-amber-400'}`} />
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-black tracking-widest uppercase text-gray-400">
                        {product.category || "Execution Guide"}
                      </span>
                      {isComingSoon ? (
                        <button 
                          onClick={() => toast.success(`Thanks for voting! We'll let you know when ${product.name} is ready.`)}
                          className="bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full transition-colors"
                        >
                          VOTE NOW
                        </button>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={10} /> AVAILABLE
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-black text-gray-950 tracking-tight leading-tight mb-2 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 line-clamp-3">
                      {product.description || product.short_description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 py-3 border-y border-gray-100 mb-6 mt-auto">
                      <div className="text-center pr-4 border-r border-gray-100">
                        <div className="text-sm font-black text-gray-900">{studentCount}</div>
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Students</div>
                      </div>
                      {!isComingSoon && (
                        <div className="text-center px-4">
                          <div className="text-sm font-black text-gray-900">5.0★</div>
                          <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Rating</div>
                        </div>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        {isComingSoon ? (
                          <span className="text-lg font-black text-gray-400">TBA</span>
                        ) : (
                          <>
                            <span className="text-xl font-black text-gray-950">₹{product.price_in || product.price || 99}</span>
                          </>
                        )}
                      </div>
                      
                      {isComingSoon ? (
                        <button
                          onClick={() => toast.success(`Your vote for ${product.name} has been recorded!`)}
                          className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg transition-all"
                        >
                          VOTE
                        </button>
                      ) : (
                        <Link
                          to={`/vault/${product.slug}`}
                          className="bg-gray-950 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                        >
                          VIEW <ChevronRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
