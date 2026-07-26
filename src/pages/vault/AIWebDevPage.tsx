import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Check,
  Shield,
  BookOpen,
  Code2,
  Globe,
  ArrowUpRight,
  Copy,
  Lock,
} from "lucide-react";
import SEO from "@/components/SEO";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CurriculumItem {
  id: string;
  num: string;
  title: string;
  points: string[];
}

interface VolumeData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  pages: string;
  description: string;
  items: CurriculumItem[];
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Curriculum Data ──────────────────────────────────────────────────────────
const volumes: VolumeData[] = [
  {
    id: "vol-1",
    num: "I",
    title: "AI-NATIVE FOUNDATIONS",
    subtitle: "Volume I",
    pages: "28 Pages",
    description:
      "Understand modern AI-assisted web development, learn the core architecture behind websites, and build your first complete projects.",
    items: [
      { id: "v1-01", num: "01", title: "What is Claude Code & the New Workflow", points: ["Terminal-based AI development", "Old workflow vs AI-native workflow", "CLI setup"] },
      { id: "v1-02", num: "02", title: "Framer Motion & 21st.dev", points: ["Motion and perceived quality", "Component libraries", "Installation workflow"] },
      { id: "v1-03", num: "03", title: "The Golden Website Prompt", points: ["Weak vs structured prompts", "Design specifications", "Prompt architecture"] },
      { id: "v1-04", num: "04", title: "8-Stage Website Structure", points: ["Hero → Footer conversion flow", "Problem/Solution storyline", "Dream Outcome storyline", "Founder Story storyline"] },
      { id: "v1-05", num: "05", title: "Specialized Prompt Vault", points: ["SaaS", "Agency", "Personal Brand"] },
      { id: "v1-06", num: "06", title: "$100k-Level SaaS Master Prompt", points: ["Production-grade SaaS website prompt", "Premium visual requirements"] },
      { id: "v1-07", num: "07", title: "Gemini & C.R.E.F.", points: ["Context", "Role", "Execution", "Format"] },
      { id: "v1-08", num: "08", title: "Gemini Cheatsheet", points: ["Coding", "Writing", "Context", "Do's and Don'ts"] },
      { id: "v1-09", num: "09", title: "Six Levels of AI Independence", points: ["Prompt Copier", "Builder", "Debugger", "Orchestrator", "AI-Native Developer"] },
      { id: "v1-10", num: "10", title: "Client vs Server Architecture", points: ["Browser", "HTTPS", "Next.js", "Server", "Supabase"] },
      { id: "v1-11", num: "11", title: "Interactive Codebase Prompts", points: ["Frontend analysis", "Backend tracing", "Schema inspection"] },
      { id: "v1-12", num: "12", title: "Antigravity IDE", points: ["Explorer", "Editor", "Agent Panel", "Terminal", "Browser", "Model selection"] },
      { id: "v1-13", num: "13", title: "Context Engineering", points: ["Request context", "File context", "Directory context", "Terminal/error context"] },
      { id: "v1-14", num: "14", title: "Model Routing", points: ["Gemini Flash", "Gemini Pro", "Claude Sonnet", "Claude Opus", "Task-based model selection"] },
      { id: "v1-15", num: "15", title: "12 Website Architectures", points: ["Business", "E-commerce", "Portfolio", "Blog", "Booking", "SaaS", "Educational", "Social", "Directory", "Entertainment", "Non-profit", "Membership/community"] },
      { id: "v1-16", num: "16", title: "Agency Niche Templates", points: ["Restaurant", "Clinic", "Gym", "Real Estate", "Legal", "NGO", "Events", "and more"] },
      { id: "v1-17", num: "17", title: "Practical Labs", points: ["Hero Scaffold", "Services Grid"] },
      { id: "v1-18", num: "18", title: "Build Mission", points: ["Restaurant website"] },
      { id: "v1-19", num: "19", title: "Debugging Challenge", points: ["Broken form diagnosis and repair"] },
      { id: "v1-20", num: "20", title: "Dual-Track Deployment", points: ["GUI workflow", "Terminal workflow"] },
      { id: "v1-21", num: "21", title: "GitHub Desktop Deployment", points: ["Repository", "Commit", "Push", "Vercel"] },
      { id: "v1-22", num: "22", title: "Capstone", points: ["Build and deploy a premium SaaS website"] },
      { id: "v1-23", num: "23", title: "Modern Design Principles", points: ["Visual hierarchy", "Typography", "Color", "Whitespace", "Mobile-first design"] },
      { id: "v1-24", num: "24", title: "Conversion Design", points: ["Hero formula", "CTA psychology", "Trust", "Conversion principles"] },
    ],
  },
  {
    id: "vol-2",
    num: "II",
    title: "ADVANCED BUILDING, AGENTS & SECURITY",
    subtitle: "Volume II",
    pages: "22 Pages",
    description:
      "Move beyond basic prompting into reusable agent systems, full-stack development, debugging and application security.",
    items: [
      { id: "v2-01", num: "01", title: "UI/UX Pro Max Skill", points: ["Antigravity Skills", "SKILL.md", "Reusable UI intelligence"] },
      { id: "v2-02", num: "02", title: "Animation Mastery", points: ["Hero", "Features", "Testimonials", "CTA", "Navigation"] },
      { id: "v2-03", num: "03", title: "Multi-Agent Orchestration", points: ["Gemini Pro → planning", "Gemini Flash → implementation", "Claude Sonnet → review/debugging", "Browser → verification"] },
      { id: "v2-04", num: "04", title: "Workspace Rules", points: ["Persistent project instructions", ".agents configuration"] },
      { id: "v2-05", num: "05", title: "Saved Workflows", points: ["/security-review", "Reusable development workflows"] },
      { id: "v2-06", num: "06", title: "Four-Step Debugging System", points: ["Reproduce", "Trace", "Smallest Fix", "Verify"] },
      { id: "v2-07", num: "07", title: "Application Security", points: ["SQL injection", "API key exposure", "Broken authentication", "Defensive development"] },
      { id: "v2-08", num: "08", title: "Rate Limiting", points: ["Next.js middleware", "Request protection"] },
      { id: "v2-09", num: "09", title: "Zod Validation", points: ["Input schemas", "Server-side validation"] },
      { id: "v2-10", num: "10", title: "Supabase Security", points: ["anon", "authenticated", "service_role"] },
      { id: "v2-11", num: "11", title: "RLS Blueprints", points: ["Multi-tenant isolation", "User privacy", "CRUD security", "Signup triggers"] },
      { id: "v2-12", num: "12", title: "Multi-Agent Lab", points: ["Animated leads feature"] },
      { id: "v2-13", num: "13", title: "Workflow Task", points: ["Build /responsive-audit"] },
      { id: "v2-14", num: "14", title: "Debugging Challenge", points: ["403 RLS failure"] },
      { id: "v2-15", num: "15", title: "Full-Stack Capstone", points: ["SaaS", "Authentication", "Database", "RLS", "Animation"] },
      { id: "v2-16", num: "16", title: "Sample Project Pack", points: ["AI Agency", "Personal Brand", "Course Sales", "D2C", "SaaS"] },
      { id: "v2-17", num: "17", title: "Reusable Templates", points: ["D2C prompt", "Portfolio prompt", "brand.config.ts factory"] },
    ],
  },
  {
    id: "vol-3",
    num: "III",
    title: "FREELANCING & CLIENT DELIVERY",
    subtitle: "Volume III",
    pages: "23 Pages",
    description:
      "Turn your development workflow into a structured freelance/client-delivery system.",
    items: [
      { id: "v3-01", num: "01", title: "Pre-Sales AI Analyst", points: ["Fact-based website audits", "No fabricated metrics"] },
      { id: "v3-02", num: "02", title: "India Client Acquisition", points: ["Niche", "Research", "Audit", "Prototype", "Outreach", "Close"] },
      { id: "v3-03", num: "03", title: "International Acquisition", points: ["LinkedIn", "Product communities", "Freelance platforms", "International delivery considerations"] },
      { id: "v3-04", num: "04", title: "Pricing Systems", points: ["Starter websites", "Full-stack platforms", "Enterprise AI"] },
      { id: "v3-05", num: "05", title: "Proposals & Scope", points: ["Deliverables", "Out-of-scope boundaries", "Client delays", "IP handover"] },
      { id: "v3-06", num: "06", title: "Maintenance Retainers", points: ["Hosting", "Updates", "Maintenance", "Support"] },
      { id: "v3-07", num: "07", title: "Outreach System", points: ["Observe", "Demonstrate", "Ask permission"] },
      { id: "v3-08", num: "08", title: "WhatsApp Outreach", points: ["Copy-ready structure"] },
      { id: "v3-09", num: "09", title: "LinkedIn Outreach", points: ["Professional DM structure"] },
      { id: "v3-[#]", num: "10", title: "Cold Email", points: ["Permission-based email"] },
      { id: "v3-11", num: "11", title: "Website Audit Worksheet", points: ["Performance", "Layout", "CTA", "Security", "Mobile"] },
      { id: "v3-12", num: "12", title: "Qualification Scorecard", points: ["Budget", "Decision maker", "Content", "Timeline"] },
      { id: "v3-13", num: "13", title: "Proposal Generator", points: ["Scope", "Deliverables", "Payments", "Terms"] },
      { id: "v3-14", num: "14", title: "Client Onboarding", points: ["Requirements", "Assets", "Goals", "Access"] },
      { id: "v3-15", num: "15", title: "DNS & Deployment", points: ["Domain", "A records", "CNAME", "Vercel"] },
      { id: "v3-16", num: "16", title: "Client Capstone", points: ["Land", "Build", "Deploy", "Deliver"] },
      { id: "v3-17", num: "17", title: "AI Production Pipeline", points: ["Brief", "Research", "Prompt", "Generate", "Review", "Brand", "Deploy", "Deliver"] },
      { id: "v3-18", num: "18", title: "AI Website Factories", points: ["Reusable systems", "Templates", "Production workflows"] },
      { id: "v3-19", num: "19", title: "Expert Roadmap", points: ["Beginner", "Builder", "Developer", "Orchestrator", "AI Web Architect"] },
    ],
  },
];

const faqs: FaqItem[] = [
  {
    q: "Is AIWebDev only for experienced developers?",
    a: "No. Volume I starts with foundations and progressively introduces AI-assisted development workflows. Developers can move faster through introductory sections and focus on advanced workflows.",
  },
  {
    q: "Is this just a prompt collection?",
    a: "No. Prompts are included, but the resource also covers architecture, context engineering, debugging, security, deployment, practical tasks and client delivery.",
  },
  {
    q: "Do I need to know coding?",
    a: "Prior experience helps but is not required for the introductory path. The goal is to help readers understand what the AI is building rather than blindly copy generated code.",
  },
  {
    q: "How will I receive the resources?",
    a: "After payment verification, your Vault access credentials or access instructions will be sent using the details provided during checkout.",
  },
  {
    q: "Are the resources downloadable?",
    a: "Access and delivery details are confirmed during the Vault onboarding process after payment verification.",
  },
  {
    q: "Will more resources be added?",
    a: "Additional resources are planned. The AIWebDev Vault is being developed as an evolving resource library. Access to future additions is subject to the update policy provided at the time of purchase.",
  },
  {
    q: "Can I share my Vault credentials?",
    a: "Vault credentials are intended for the purchaser's individual access and should not be publicly shared.",
  },
];

const deliverables = [
  "3 detailed volumes",
  "73 pages at current release",
  "Exact AI prompts",
  "AI development workflows",
  "Website architecture guides",
  "Antigravity guidance",
  "Model-routing strategies",
  "Design & conversion principles",
  "Full-stack security blueprints",
  "Supabase RLS examples",
  "Debugging frameworks",
  "Practical labs",
  "Student tasks",
  "Challenges",
  "Capstone projects",
  "Freelance outreach systems",
  "Proposal & onboarding templates",
  "Deployment guidance",
  "Future Vault additions where provided under our update policy",
];

const independenceLevels = [
  { level: "LEVEL 0", title: "Prompt Copier", desc: "Copying prompts from the internet without understanding the output." },
  { level: "LEVEL 1", title: "AI-Assisted Builder", desc: "Using AI to build but struggling when something breaks." },
  { level: "LEVEL 2", title: "Independent Builder", desc: "Building complete projects with AI guidance and minimal friction." },
  { level: "LEVEL 3", title: "AI Debugger", desc: "Tracing failures systematically and repairing generated code." },
  { level: "LEVEL 4", title: "AI Orchestrator", desc: "Routing tasks across multiple models and agents effectively." },
  { level: "LEVEL 5", title: "AI-Native Developer", desc: "Directing, inspecting and delivering AI-generated software end-to-end." },
];

const modelRouting = [
  { task: "Small UI changes", role: "Fast implementation model" },
  { task: "Normal feature work", role: "Primary builder" },
  { task: "Architecture", role: "Strong reasoning model" },
  { task: "Complex debugging", role: "Thinking/reasoning model" },
  { task: "Final review", role: "Independent reviewer" },
  { task: "Browser verification", role: "Execution/verification" },
];

// ─── Accordion Components ─────────────────────────────────────────────────────

function CurriculumAccordion({ volume, defaultOpen = false }: { volume: VolumeData; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] text-xs font-black">
            {volume.num}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest text-[#FF6B00] font-black uppercase">
                {volume.subtitle}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                • {volume.pages}
              </span>
            </div>
            <h3 className="text-sm font-black text-gray-900 tracking-tight font-display">
              {volume.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 py-3 bg-gray-50/60 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
              {volume.description}
            </div>

            <div className="divide-y divide-gray-100">
              {volume.items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50/60 transition-colors"
                  >
                    <span className="text-[10px] font-black text-[#FF6B00]/70 tracking-widest shrink-0 w-5">
                      {item.num}
                    </span>
                    <span className="text-xs font-bold text-gray-800 flex-1 leading-snug">
                      {item.title}
                    </span>
                    <ChevronRight
                      size={12}
                      className={`text-gray-300 shrink-0 transition-transform duration-200 ${
                        openItems.has(item.id) ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openItems.has(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-3 pl-12">
                          <ul className="space-y-1">
                            {item.points.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#FF6B00]" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-xs font-bold text-gray-900 leading-snug pr-4">
              {item.q}
            </span>
            <ChevronDown
              size={14}
              className={`text-gray-400 shrink-0 transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-5 pb-3.5 pt-1 border-t border-gray-50">
                  <p className="text-xs text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Main Standalone Product Page ──────────────────────────────────────────────
export default function AIWebDevPage() {
  const curriculumRef = useRef<HTMLDivElement>(null);

  const scrollToCurriculum = (e: React.MouseEvent) => {
    e.preventDefault();
    curriculumRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="AIWebDev — The AI-Native Web Development Playbook | TakeIN Studio"
        description="Learn AI-native web development with practical prompts, Antigravity workflows, debugging systems, full-stack security, deployment and freelance client delivery."
        keywords="AIWebDev, AI web development, AI coding agents, Claude Code, Antigravity IDE, web development playbook, AI-native development"
        url="https://takeinstudio.com/vault/aiwebdev"
      />

      <div className="bg-[#FCFBF9] min-h-screen text-gray-900 font-sans selection:bg-[#FF6B00] selection:text-white">

        {/* ── Standalone Clean Header Bar ── */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3.5 px-4 sm:px-6 shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/logo/logo_no_text.png"
                alt="TakeIN Studio"
                className="h-7 w-auto mix-blend-multiply object-contain"
              />
              <div className="flex items-center text-sm font-display">
                <span className="text-gray-950 font-black">Take</span>
                <span className="text-[#FF6B00] font-black">IN</span>
                <span className="text-gray-400 font-normal ml-1">Studio / AIWebDev</span>
              </div>
            </Link>

            <Link
              to="/vault/aiwebdev/checkout"
              className="bg-[#FF6B00] text-white text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-full hover:bg-orange-500 transition-colors shadow-sm"
            >
              Get Vault Access
            </Link>
          </div>
        </header>

        {/* ── HERO SECTION ── */}
        <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-3">
              TAKEIN STUDIO PRESENTS
            </p>

            <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-gray-950 mb-3 leading-tight">
              AIWeb<span className="text-[#FF6B00]">Dev</span>
            </h1>

            <p className="text-lg sm:text-xl font-display font-bold text-gray-800 mb-4 max-w-xl">
              The AI-Native Web Development Playbook.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mb-6">
              Learn to understand, build, debug, secure, deploy and deliver modern web applications using AI coding agents.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 text-[10px] tracking-wider font-bold text-gray-500 uppercase mb-8">
              {["3 VOLUMES", "73 PAGES", "PRACTICAL LABS", "EXACT PROMPTS", "CAPSTONES", "CLIENT SYSTEMS"].map((b) => (
                <span key={b} className="bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-gray-700">
                  {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={scrollToCurriculum}
                className="px-5 py-3 border border-gray-950 text-gray-950 text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-gray-950 hover:text-white transition-colors"
              >
                Explore What's Inside
              </button>
              <Link
                to="/vault/aiwebdev/checkout"
                className="px-6 py-3 bg-[#FF6B00] text-white text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-orange-500 shadow-md shadow-orange-500/20 transition-colors"
              >
                Get Vault Access
              </Link>
            </div>

            <p className="text-xs text-gray-400 border-l-2 border-[#FF6B00] pl-3 max-w-md">
              Built for beginners, developers and freelancers who want to use AI as a development system — not just a code generator.
            </p>
          </div>
        </section>

        {/* ── PRODUCT FORMAT (3 VOLUMES) ── */}
        <section className="py-10 sm:py-14 bg-[#0d0d0d] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                PRODUCT FORMAT
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight">
                3-Volume Digital Vault
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {volumes.map((vol, i) => (
                <div
                  key={vol.id}
                  className="bg-[#121216] border border-white/10 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] tracking-widest font-black text-[#FF6B00] uppercase">
                      TAKEIN STUDIO
                    </span>
                    <div className="flex items-baseline gap-2 my-2">
                      <span className="text-3xl font-black font-display text-white/20">{vol.num}</span>
                      <h3 className="text-xs font-black font-display uppercase tracking-wider text-white">
                        {vol.title}
                      </h3>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-white/40">{vol.subtitle}</span>
                    <span className="text-[10px] font-bold text-[#FF6B00]">{vol.pages}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 rounded-xl py-4 bg-[#121216]/50 text-center">
              <div>
                <p className="font-display text-2xl font-black text-white">3</p>
                <p className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Volumes</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-white">73</p>
                <p className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Pages</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-white">60+</p>
                <p className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Topics</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT THIS IS (VALUE PROP) ── */}
        <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-2">
                WHAT THIS IS
              </p>
              <h2 className="font-display text-xl sm:text-3xl font-black text-gray-950 tracking-tight mb-2">
                This is not another "100 AI prompts" PDF.
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                AIWebDev teaches a repeatable workflow — not a list of prompts to copy.
              </p>
            </div>

            {/* Workflow Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {["UNDERSTAND", "PROMPT", "BUILD", "INSPECT", "DEBUG", "VERIFY", "DEPLOY", "DELIVER"].map((step, i) => (
                <div key={step} className="border border-gray-100 rounded-lg p-3 bg-gray-50/50">
                  <span className="text-[9px] font-black text-[#FF6B00] tracking-widest block mb-1">
                    0{i + 1}
                  </span>
                  <span className="text-xs font-black text-gray-900 tracking-wider uppercase">
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="border-l-2 border-[#FF6B00] pl-4">
                <h3 className="text-xs font-black text-gray-900 tracking-tight mb-1">
                  You won't just receive prompts to copy.
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You'll learn why applications work, how client/server architecture fits together, and how to provide AI agents with the right context.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <h3 className="text-xs font-black text-gray-900 tracking-tight mb-1">
                  You'll know how to choose models and recover.
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  How to choose models for different tasks, how to inspect generated code, and how to recover when the AI gets something wrong.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section className="py-12 sm:py-16 bg-[#FAFAF8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                WHO THIS IS FOR
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-black text-gray-950">
                Three distinct paths. One system.
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  num: "01",
                  title: "BEGINNER",
                  desc: "You can describe what you want but don't yet understand how modern web applications fit together.",
                  detail: "Learn the fundamentals while building with AI.",
                },
                {
                  num: "02",
                  title: "DEVELOPER",
                  desc: "You already understand development but want to use coding agents more effectively.",
                  detail: "Learn context engineering, model routing, debugging, security and multi-agent workflows.",
                },
                {
                  num: "03",
                  title: "FREELANCER",
                  desc: "You want to turn AI-assisted development into a repeatable client-delivery system.",
                  detail: "Learn acquisition, qualification, proposals, pricing, delivery and retainers.",
                },
              ].map((card) => (
                <div key={card.num} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#FF6B00] tracking-widest">{card.num}</span>
                    <h3 className="font-display text-sm font-black text-gray-900 tracking-tight my-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{card.desc}</p>
                  </div>
                  <p className="text-[11px] font-bold text-gray-800 pt-3 border-t border-gray-100">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE AI INDEPENDENCE JOURNEY ── */}
        <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-5 gap-8 items-start">
              <div className="sm:col-span-2">
                <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-2">
                  THE PROGRESSION
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-black text-gray-950 mb-3">
                  The AI Independence Journey
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  The goal isn't to make you dependent on prompts.
                </p>
                <p className="text-xs font-bold text-gray-800 leading-relaxed">
                  The goal is to teach you how to direct, inspect and verify AI-generated software.
                </p>
              </div>

              <div className="sm:col-span-3 space-y-2">
                {independenceLevels.map((lvl, i) => (
                  <div key={lvl.level} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50/60 border border-gray-100">
                    <span className="w-5 h-5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {i}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] tracking-widest text-gray-400 font-bold uppercase">{lvl.level}</span>
                        <span className="text-xs font-black text-gray-900">{lvl.title}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-snug">{lvl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL CURRICULUM ── */}
        <section ref={curriculumRef} className="py-12 sm:py-16 bg-[#FAFAF8]" id="curriculum">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                CURRICULUM
              </p>
              <h2 className="font-display text-xl sm:text-3xl font-black text-gray-950 tracking-tight mb-1">
                What's Inside AIWebDev
              </h2>
              <p className="text-xs text-gray-500">
                Three volumes. One complete learning and delivery system.
              </p>
            </div>

            <div className="space-y-3">
              {volumes.map((vol, i) => (
                <CurriculumAccordion key={vol.id} volume={vol} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PRACTICAL LEARNING ── */}
        <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                HOW YOU LEARN
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-black text-gray-950">
                You don't just read it. You build with it.
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { step: "LEARN", desc: "Understand the concept." },
                { step: "PROMPT", desc: "Use a production-ready AI instruction." },
                { step: "BUILD", desc: "Implement it inside a real project." },
                { step: "TASK", desc: "Complete the feature yourself." },
                { step: "BREAK", desc: "Encounter or reproduce a failure." },
                { step: "DEBUG", desc: "Trace and repair it." },
                { step: "VERIFY", desc: "Test the actual result." },
                { step: "SHIP", desc: "Deploy the application." },
              ].map((item, i) => (
                <div key={item.step} className="border border-gray-200 rounded-lg p-3 bg-white">
                  <span className="text-[9px] font-black text-[#FF6B00] block mb-1">
                    0{i + 1}
                  </span>
                  <p className="text-xs font-black text-gray-900 tracking-tight mb-1">{item.step}</p>
                  <p className="text-[10px] text-gray-500 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 py-1">INCLUDED THROUGHOUT:</span>
              {[
                "Guided Labs",
                "Independent Tasks",
                "Debugging Challenges",
                "Capstone Projects",
                "Verification Checklists",
                "Copy-ready Prompts",
                "Architecture Exercises",
              ].map((tag) => (
                <span key={tag} className="text-[10px] font-semibold text-gray-600 border border-gray-200 rounded-md px-2.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROMPT PREVIEW ── */}
        <section className="py-10 sm:py-14 bg-[#0d0d0d] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                PROMPT QUALITY
              </p>
              <h2 className="font-display text-xl font-black">Build with AI</h2>
              <p className="text-xs text-white/40">A partial preview. The complete prompt library is inside the Vault.</p>
            </div>

            <div className="border border-white/10 rounded-xl bg-[#121216] overflow-hidden text-xs">
              <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-[10px] font-mono text-white/40">
                context-prompt.md
              </div>
              <div className="p-5 font-mono leading-relaxed text-white/70">
                <p className="mb-3">"You are working inside my existing application.</p>
                <p className="mb-2 text-white/50">Before writing code:</p>
                <ol className="list-decimal pl-5 space-y-1 mb-3 text-white/50">
                  <li>Inspect the project architecture.</li>
                  <li>Identify reusable components.</li>
                  <li>Identify the current design system.</li>
                  <li>Explain the files you intend to modify.</li>
                  <li>Produce an implementation plan.</li>
                </ol>
                <p className="text-white/30 italic">Then..."</p>
              </div>
              <div className="px-5 py-3 border-t border-white/5 bg-white/5 flex items-center justify-between">
                <span className="text-[10px] text-white/30">Prompt continues inside the Vault</span>
                <Link to="/vault/aiwebdev/checkout" className="text-[10px] font-bold text-[#FF6B00] hover:underline uppercase">
                  Get Vault Access →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE DIFFERENCE ── */}
        <section className="py-10 sm:py-14 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                THE DIFFERENCE
              </p>
              <h2 className="font-display text-xl font-black text-gray-950">
                Don't just ask AI to "make a website."
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="border border-red-200 rounded-xl p-4 bg-red-50/30">
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-2">
                  ✕ BAD
                </span>
                <p className="font-mono text-xs text-gray-500 italic">"make me a modern website"</p>
              </div>

              <div className="border border-green-200 rounded-xl p-4 bg-green-50/30">
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest block mb-2">
                  ✓ AIWEBDEV WORKFLOW
                </span>
                <div className="flex flex-wrap gap-1 text-[10px] font-black tracking-wider text-gray-700">
                  {["CONTEXT", "→ ARCHITECTURE", "→ PLAN", "→ IMPLEMENT", "→ RUN", "→ INSPECT", "→ DEBUG", "→ VERIFY"].map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4 max-w-md mx-auto">
              AIWebDev teaches you how to supervise an AI coding agent instead of blindly accepting generated code.
            </p>
          </div>
        </section>

        {/* ── MODEL ROUTING ── */}
        <section className="py-10 sm:py-14 bg-[#FAFAF8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                MODEL ROUTING
              </p>
              <h2 className="font-display text-xl font-black text-gray-950">
                Different tasks. Different models.
              </h2>
              <p className="text-xs text-gray-400">
                The complete model-routing matrix with current model recommendations is inside the Vault. Model availability changes — we keep it current.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white text-xs">
              <div className="grid grid-cols-2 px-4 py-2 bg-gray-50 border-b border-gray-200 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <span>TASK</span>
                <span>MODEL ROLE</span>
              </div>
              {modelRouting.map((row, i) => (
                <div key={i} className="grid grid-cols-2 px-4 py-2.5 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-800">{row.task}</span>
                  <span className="text-gray-500">{row.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU RECEIVE ── */}
        <section className="py-10 sm:py-14 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                INCLUDED
              </p>
              <h2 className="font-display text-xl font-black text-gray-950">Your Vault Includes</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-2 text-xs">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Check size={12} className="text-[#FF6B00] shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROADMAP ── */}
        <section className="py-10 sm:py-14 bg-[#0d0d0d] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-4">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                ROADMAP
              </p>
              <h2 className="font-display text-xl font-black">The Vault doesn't end here.</h2>
              <p className="text-xs text-white/40 max-w-lg mt-1">
                AIWebDev is being developed as an evolving resource library. Future additions may include new prompts, workflows, templates, practical builds and supporting resources.
              </p>
            </div>

            <div className="bg-[#121216] border border-white/10 rounded-xl p-4 inline-block text-xs">
              <span className="text-[9px] font-black text-[#FF6B00] uppercase tracking-widest block mb-2">COMING SOON</span>
              <ul className="space-y-1 text-white/50">
                {["Additional build missions", "More industry website prompts", "Expanded debugging cases", "Additional workflow templates", "New reusable development assets"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#FF6B00]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── HOW ACCESS WORKS ── */}
        <section className="py-10 sm:py-14 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                THE PROCESS
              </p>
              <h2 className="font-display text-xl font-black text-gray-950">How Access Works</h2>
            </div>

            <div className="grid sm:grid-cols-4 gap-3 text-xs">
              {[
                { n: "01", title: "EXPLORE", desc: "Review exactly what is included." },
                { n: "02", title: "CHECKOUT", desc: "Proceed to the AIWebDev checkout." },
                { n: "03", title: "PAYMENT VERIFICATION", desc: "Payment details are manually verified by TakeIN Studio." },
                { n: "04", title: "VAULT ACCESS", desc: "After successful verification, personal Vault credentials/access instructions are provided." },
              ].map((step) => (
                <div key={step.n} className="border border-gray-200 rounded-xl p-4 bg-white">
                  <span className="text-lg font-black text-gray-300 font-display block mb-1">{step.n}</span>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-[11px] leading-snug">{step.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-400 mt-4 text-center">
              Your Vault credentials are intended for your individual access and should not be publicly shared.
            </p>
          </div>
        </section>

        {/* ── PAYMENT & ACCESS NOTE ── */}
        <section className="py-6 bg-[#FAFAF8] border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 text-xs">
              <Shield size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-gray-900 uppercase tracking-widest block mb-0.5">
                  PAYMENT & ACCESS
                </span>
                <p className="text-gray-500 leading-relaxed">
                  Payments are verified before Vault access is activated. TakeIN Studio will never ask for your UPI PIN, OTP, CVV or banking password.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-6 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-1">
                QUESTIONS
              </p>
              <h2 className="font-display text-xl font-black text-gray-950">Frequently Asked</h2>
            </div>

            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-14 sm:py-20 bg-[#0d0d0d] text-white text-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-[10px] tracking-[0.25em] text-[#FF6B00]/70 font-black uppercase mb-3">
              TAKEIN STUDIO · AIWEBDEV
            </p>

            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Stop treating AI like autocomplete.
            </h2>

            <p className="text-sm text-white/50 mb-8 max-w-sm mx-auto">
              Learn how to direct it, debug it, verify it, and ship with it.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/vault/aiwebdev/checkout"
                className="px-6 py-3.5 bg-[#FF6B00] text-white text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-orange-500 shadow-md shadow-orange-500/20 transition-colors"
              >
                Get AIWebDev Vault Access
              </Link>
              <button
                onClick={scrollToCurriculum}
                className="px-6 py-3.5 border border-white/20 text-white/70 text-[11px] font-black tracking-widest uppercase rounded-full hover:border-white/40 hover:text-white transition-colors"
              >
                Explore Curriculum
              </button>
            </div>
          </div>
        </section>

        {/* ── STANDALONE PAGE FOOTER ── */}
        <footer className="border-t border-white/5 bg-[#08080a] py-6 text-center text-xs text-gray-500">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">TakeIN Studio</span>
              <span>— AIWebDev Vault</span>
            </div>
            <p>© 2026 TakeIN Studio. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
