import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Check,
  BookOpen,
  Code2,
  Globe,
  Lock,
  ArrowUpRight,
  Shield,
  Layers,
  CheckCircle2,
  XCircle,
  Database,
  Cpu
} from "lucide-react";
import SEO from "@/components/SEO";

// ─── Data Arrays ─────────────────────────────────────────────────────────────────
const includedTopics = [
  "Developer foundations",
  "Python for AI/ML",
  "NumPy & Pandas",
  "Essential mathematics",
  "Machine learning",
  "Model evaluation",
  "Deep learning",
  "PyTorch",
  "Transformers",
  "Modern NLP",
  "LLM engineering",
  "Structured outputs",
  "Embeddings",
  "Vector search",
  "RAG",
  "Reranking",
  "AI agents",
  "FastAPI",
  "Docker",
  "AI system design",
  "Portfolio projects",
  "Career preparation",
  "Curated learning resources"
];

const audiences = [
  { num: "01", title: "BEGINNER", desc: "Starting AI/ML and overwhelmed by the number of topics." },
  { num: "02", title: "COLLEGE STUDENT", desc: "Preparing for AI/ML projects, internships and future opportunities." },
  { num: "03", title: "DEVELOPER", desc: "Moving from software development toward AI engineering." },
  { num: "04", title: "SELF-LEARNER", desc: "Already using courses and YouTube but needs a clear sequence." },
];

const previewSteps = [
  "FOUNDATIONS", "PYTHON", "DATA", "ESSENTIAL MATH", 
  "MACHINE LEARNING", "DEEP LEARNING", "PYTORCH", 
  "TRANSFORMERS", "LLMs", "EMBEDDINGS", "RAG", 
  "AGENTS", "PRODUCTION AI", "PROJECTS", "CAREER PREPARATION"
];

const stepWorks = [
  { num: "01", title: "LEARN", desc: "Understand exactly what matters." },
  { num: "02", title: "DEPTH", desc: "Know how deeply you need to learn it." },
  { num: "03", title: "SKIP", desc: "Avoid unnecessary rabbit holes." },
  { num: "04", title: "PRACTICE", desc: "Apply the concept." },
  { num: "05", title: "BUILD", desc: "Use it in practical work." },
  { num: "06", title: "VERIFY", desc: "Check whether you actually understand it." },
  { num: "07", title: "NEXT", desc: "Continue only when the checkpoint is satisfied." },
];

export default function AIMLPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is this a video course?",
      a: "No. This is a Career Execution Roadmap. It acts as a strict sequential guide that tells you what to learn, what to skip, and how to apply concepts, rather than re-teaching math proofs from scratch.",
    },
    {
      q: "Does this include the external courses?",
      a: "The roadmap curates external resources (like Andrew Ng's courses or Math playlists) as references, but TakeIN Studio does not own those third-party materials. The value is in the execution framework and strict sequencing.",
    },
    {
      q: "Do I need to know coding?",
      a: "Module 01 and 02 start from developer foundations and Python basics, so a complete beginner can start this roadmap.",
    },
    {
      q: "How will I access the roadmap?",
      a: "After checkout and manual payment verification, the AI/ML Roadmap will be unlocked inside your authenticated TakeIN Vault.",
    }
  ];

  return (
    <>
      <SEO
        title="AI/ML Engineer Career Execution Roadmap | TakeIN Studio"
        description="Explore TakeIN Studio's structured AI/ML Engineer Career Execution Roadmap covering foundations, machine learning, deep learning, modern AI engineering, projects and career preparation."
        url="https://takeinstudio.com/vault/ai-ml"
      />

      <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#FF6B00] selection:text-white pb-20">
        
        {/* ── Minimal Header ── */}
        <header className="fixed top-0 w-full z-50 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link to="/vault" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <ArrowLeft size={14} className="text-gray-500" />
              </div>
              <span className="font-display font-black text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                Vault
              </span>
            </Link>
            
            <Link
              to="/vault/ai-ml/checkout"
              className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,107,0,0.3)]"
            >
              Get Access <ArrowRight size={12} />
            </Link>
          </div>
        </header>

        <main className="pt-24 sm:pt-32 px-4 sm:px-6 max-w-6xl mx-auto">
          
          {/* ── HERO ── */}
          <section className="text-center max-w-4xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-[0.2em]">
                TAKEIN STUDIO PRESENTS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-7xl font-black text-gray-950 tracking-tight leading-[1.05] mb-6"
            >
              AI / ML Engineer
              <br />
              <span className="text-gray-400">Career Execution Roadmap</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              A structured career roadmap that tells you what to learn, what to practice, what to build, what to skip for now, and when you're ready to move forward.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {["2026 EDITION", "CAREER EXECUTION GUIDE", "PROJECT-DRIVEN", "BEGINNER → AI ENGINEERING"].map(badge => (
                <span key={badge} className="px-3 py-1.5 bg-[#F7F7F7] border border-[#E5E7EB] rounded-full text-[10px] font-black tracking-widest uppercase text-gray-500">
                  {badge}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/vault/ai-ml/checkout"
                className="w-full sm:w-auto bg-[#111111] hover:bg-black text-white font-black text-[12px] uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
              >
                GET VAULT ACCESS <ArrowRight size={14} />
              </Link>
              <a
                href="#explore"
                className="w-full sm:w-auto bg-white border border-[#E5E7EB] hover:border-gray-400 text-gray-900 font-black text-[12px] uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2"
              >
                EXPLORE ROADMAP <ChevronDown size={14} />
              </a>
            </motion.div>
          </section>

          {/* ── WHAT THIS IS ── */}
          <section id="explore" className="mb-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl font-black tracking-tight mb-6">NOT ANOTHER<br/>AI/ML ROADMAP.</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Most roadmaps tell you WHAT exists. They are just giant lists of Wikipedia links that lead to tutorial hell.
                </p>
                <p className="text-gray-500 leading-relaxed mb-8">
                  TakeIN's Career Execution Roadmap is a sequential execution engine. It cuts the noise and focuses entirely on:
                </p>
                <div className="flex flex-col gap-3 border-l-2 border-[#FF6B00] pl-6 py-2">
                  <span className="font-black text-sm tracking-widest uppercase text-gray-900">WHAT TO LEARN</span>
                  <span className="font-black text-sm tracking-widest uppercase text-gray-800">WHAT DEPTH YOU NEED</span>
                  <span className="font-black text-sm tracking-widest uppercase text-gray-700">WHAT TO SKIP</span>
                  <span className="font-black text-sm tracking-widest uppercase text-gray-600">WHAT TO PRACTICE</span>
                  <span className="font-black text-sm tracking-widest uppercase text-gray-500">WHAT TO BUILD</span>
                  <span className="font-black text-sm tracking-widest uppercase text-gray-400">WHEN TO MOVE FORWARD</span>
                </div>
              </div>
              <div className="bg-[#F7F7F7] rounded-3xl p-8 border border-[#E5E7EB] shadow-sm">
                <div className="space-y-4">
                  {audiences.map(aud => (
                    <div key={aud.num} className="bg-white p-5 rounded-2xl border border-gray-100 flex gap-4 items-start">
                      <span className="text-[#FF6B00] font-black tracking-widest">{aud.num}</span>
                      <div>
                        <h4 className="font-black text-sm tracking-widest uppercase mb-1">{aud.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{aud.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── ROADMAP PREVIEW & DESTINATIONS ── */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-[0.2em] mb-4 block">
                THE PROGRESSION
              </span>
              <h2 className="font-display text-4xl font-black tracking-tight">One Foundation.<br/>Multiple Destinations.</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Destinations */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-[#FFF8F3] border border-orange-100 p-6 rounded-2xl">
                  <h3 className="font-black text-lg mb-4 text-[#CC5500]">TARGET ROLES</h3>
                  <p className="text-sm text-gray-600 mb-6">The common foundation inside this roadmap can lead to specialized engineering paths:</p>
                  <ul className="space-y-3">
                    {["AI Engineer", "ML Engineer", "Data Scientist", "MLOps / ML Platform"].map(role => (
                      <li key={role} className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <CheckCircle2 size={16} className="text-[#FF6B00]" /> {role}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                  <h3 className="font-black text-sm mb-4 text-gray-900 uppercase tracking-widest">Optional Specializations</h3>
                  <p className="text-xs text-gray-500 mb-4">You do NOT need to master every AI field to get hired.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Computer Vision", "Advanced NLP", "Reinforcement Learning"].map(spec => (
                      <span key={spec} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs font-bold text-gray-600">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Path */}
              <div className="lg:col-span-2 bg-[#F7F7F7] border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 text-center">
                <div className="max-w-md mx-auto">
                  {previewSteps.map((step, idx) => (
                    <div key={step}>
                      <div className="inline-block px-6 py-3 bg-white border-2 border-gray-900 rounded-full font-black text-sm tracking-widest uppercase shadow-[4px_4px_0_0_#111111] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111111] transition-all">
                        {step}
                      </div>
                      {idx !== previewSteps.length - 1 && (
                        <div className="h-6 w-0.5 bg-gray-300 mx-auto my-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── SIGNATURE FEATURE ── */}
          <section className="mb-32">
            <div className="bg-[#111111] rounded-3xl p-8 sm:p-16 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Shield size={300} />
              </div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-4xl font-black tracking-tight mb-6">KNOW WHAT<br/>NOT TO LEARN — YET.</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    The biggest problem in AI/ML is trying to learn every mathematical proof, theoretical framework, and research paper before building anything.
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    This roadmap explicitly gates your focus by classifying every topic.
                  </p>
                  
                  <div className="space-y-3">
                    {["ESSENTIAL", "WORKING KNOWLEDGE", "CONCEPTUAL ONLY", "OPTIONAL DEEP DIVE", "SKIP FOR NOW"].map(lvl => (
                      <div key={lvl} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                        <span className="font-black text-xs tracking-widest uppercase text-gray-300">{lvl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Sample: Day 14 (Machine Learning)</div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Logistic Regression</h3>
                  <div className="inline-block px-2.5 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded mb-6">
                    ESSENTIAL
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-green-500" /> LEARN
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1 ml-5 list-disc">
                      <li>Classification basics</li>
                      <li>Sigmoid intuition</li>
                      <li>Confusion matrix</li>
                    </ul>
                  </div>

                  <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4">
                    <div className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <XCircle size={12} /> SKIP FOR NOW
                    </div>
                    <ul className="text-sm text-red-200/70 space-y-1 ml-5 list-disc">
                      <li>Full mathematical derivation of MLE</li>
                      <li>Research-level statistical treatments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── PROJECT SYSTEM ── */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-black tracking-tight mb-4">The Project System</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Do not rely on cliché tutorial datasets for your resume. This roadmap forces you to build progressively through 5 distinct engineering tiers.</p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                { lvl: "LEVEL 01", name: "MINI BUILDS", desc: "Syntax familiarity and basic logic (e.g. Pandas cleaners, Data Scrapers)." },
                { lvl: "LEVEL 02", name: "FOUNDATION PROJECTS", desc: "Model training and classical ML evaluation (e.g. XGBoost Predictors with clean evaluation matrices)." },
                { lvl: "LEVEL 03", name: "PORTFOLIO PROJECTS", desc: "API integration and modern AI engineering (e.g. RAG systems with Vector DBs)." },
                { lvl: "LEVEL 04", name: "PRODUCTION PROJECTS", desc: "End-to-end deployment and observability (e.g. LLM apps on Docker/AWS)." },
                { lvl: "LEVEL 05", name: "CAPSTONE", desc: "Autonomous workflows solving a complex, multi-step problem (e.g. Autonomous Research Agents)." },
              ].map((proj, i) => (
                <div key={proj.lvl} className="flex flex-col md:flex-row gap-6 bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm hover:border-gray-300 transition-colors">
                  <div className="md:w-48 shrink-0">
                    <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest">{proj.lvl}</span>
                    <h4 className="font-black text-lg mt-1 text-gray-900">{proj.name}</h4>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-sm text-gray-500 leading-relaxed m-0">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHAT'S INCLUDED (GRID) ── */}
          <section className="mb-32 bg-[#F7F7F7] -mx-4 sm:-mx-6 px-4 sm:px-6 py-20 border-y border-[#E5E7EB]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl font-black tracking-tight mb-4">What's Inside The Vault</h2>
                <p className="text-gray-500">60 continuous days covering every major pillar of AI/ML Engineering.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                {includedTopics.map(topic => (
                  <div key={topic} className="flex items-center gap-2">
                    <Check size={14} className="text-[#FF6B00] shrink-0" strokeWidth={3} />
                    <span className="text-sm font-bold text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ACCESS MODEL ── */}
          <section className="mb-32 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-black tracking-tight text-center mb-12">How To Access</h2>
            <div className="space-y-4">
              {[
                { step: "01", title: "EXPLORE", desc: "Review the roadmap curriculum and project systems on this page." },
                { step: "02", title: "GET ACCESS", desc: "Proceed through the secure TakeIN Vault checkout process." },
                { step: "03", title: "PAYMENT VERIFICATION", desc: "Your payment is securely verified by TakeIN Studio administration." },
                { step: "04", title: "VAULT ACCESS", desc: "The AI/ML Career Execution Roadmap becomes fully active inside your personal Vault dashboard." },
              ].map(item => (
                <div key={item.step} className="flex gap-6 bg-white p-6 rounded-2xl border border-[#E5E7EB]">
                  <div className="w-12 h-12 rounded-full bg-[#FFF8F3] border border-orange-100 flex items-center justify-center shrink-0">
                    <span className="font-black text-[#FF6B00]">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-sm tracking-widest uppercase mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 m-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-[#F7F7F7] border border-[#E5E7EB] rounded-2xl text-center">
              <h4 className="font-black text-sm mb-2 uppercase tracking-widest">CURATED LEARNING RESOURCES</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-0">
                TakeIN Studio curates excellent third-party resources (YouTube playlists, official documentation) as optional reading. Third-party resources remain the property of their respective creators. TakeIN's product is the sequential execution framework and project system.
              </p>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="mb-32 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-8">
              Stop collecting roadmaps.
              <br/>
              <span className="text-[#FF6B00]">Start executing one.</span>
            </h2>
            <Link
              to="/vault/ai-ml/checkout"
              className="inline-flex bg-[#111111] hover:bg-black text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-full transition-all items-center justify-center gap-2 shadow-xl shadow-black/10"
            >
              GET VAULT ACCESS <ArrowRight size={16} />
            </Link>
          </section>

        </main>
      </div>
    </>
  );
}
