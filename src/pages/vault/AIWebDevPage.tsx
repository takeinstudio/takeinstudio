import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Check,
  Lock,
  BookOpen,
  Code2,
  Terminal,
  Layers,
  Zap,
  Shield,
  Users,
  Globe,
  Star,
} from "lucide-react";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

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

// ─── Data ─────────────────────────────────────────────────────────────────────
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
      { id: "v3-10", num: "10", title: "Cold Email", points: ["Permission-based email"] },
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

// ─── Sub-components ────────────────────────────────────────────────────────────

function VolumeCard({ vol, index }: { vol: VolumeData; index: number }) {
  const colors = [
    { bg: "bg-[#0d0d0d]", accent: "#FF6B00", border: "border-orange-500/30" },
    { bg: "bg-[#111116]", accent: "#FF6B00", border: "border-orange-500/20" },
    { bg: "bg-[#0f0f14]", accent: "#FF6B00", border: "border-orange-500/25" },
  ];
  const c = colors[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-2xl border ${c.border} ${c.bg} p-7 flex flex-col min-h-[280px] overflow-hidden`}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#FF6B00] opacity-60" />
      </div>

      {/* Volume label */}
      <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] mb-3 uppercase">
        TAKEIN STUDIO
      </p>

      {/* Volume number - large typographic treatment */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-[64px] font-black leading-none text-white/5 select-none font-display">
          {vol.num}
        </span>
        <div className="mt-2">
          <p className="text-[11px] tracking-widest text-white/40 uppercase mb-1">
            {vol.subtitle}
          </p>
          <h3 className="text-sm font-black text-white tracking-tight leading-tight font-display">
            {vol.title}
          </h3>
        </div>
      </div>

      <div className="mt-auto">
        <div className="w-8 h-px bg-[#FF6B00] mb-3" />
        <p className="text-[11px] tracking-widest text-[#FF6B00] font-bold">
          {vol.pages}
        </p>
      </div>
    </motion.div>
  );
}

function CurriculumAccordion({ volume, defaultOpen = false }: { volume: VolumeData; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      {/* Volume header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50/80 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-full bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] text-xs font-black">
            {volume.num}
          </span>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] tracking-widest text-[#FF6B00] font-black uppercase">
                {volume.subtitle}
              </span>
              <span className="text-[10px] text-gray-400 tracking-wider">
                {volume.pages}
              </span>
            </div>
            <h3 className="text-sm font-black text-gray-900 tracking-tight font-display mt-0.5">
              {volume.title}
            </h3>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {/* Volume description */}
            <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                {volume.description}
              </p>
            </div>

            {/* Curriculum items */}
            <div className="divide-y divide-gray-100/80">
              {volume.items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50/60 transition-colors"
                  >
                    <span className="text-[10px] font-black text-[#FF6B00]/60 tracking-widest shrink-0 w-6">
                      {item.num}
                    </span>
                    <span className="text-sm font-semibold text-gray-800 flex-1 leading-snug">
                      {item.title}
                    </span>
                    <ChevronRight
                      size={14}
                      className={`text-gray-300 shrink-0 transition-transform duration-200 ${openItems.has(item.id) ? "rotate-90" : ""}`}
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
                        <div className="px-6 pb-4 pl-16">
                          <ul className="space-y-1">
                            {item.points.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#FF6B00]/50 shrink-0" />
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
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-900 leading-snug pr-4">
              {item.q}
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-400 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-5 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Sticky floating CTA
function StickyVaultCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 hidden lg:block"
        >
          <div className="bg-[#0d0d0d] text-white rounded-2xl px-5 py-3.5 shadow-2xl border border-white/5 flex items-center gap-4">
            <div>
              <p className="text-[10px] tracking-widest text-[#FF6B00] font-black uppercase">
                AIWebDev
              </p>
              <p className="text-xs text-white/60 font-medium">3-Volume Vault</p>
            </div>
            <Link
              to="/vault/aiwebdev/checkout"
              className="bg-[#FF6B00] text-white text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl hover:bg-orange-500 transition-colors whitespace-nowrap"
            >
              GET ACCESS
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
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
        keywords="AIWebDev, AI web development, AI coding agents, Claude Code, Antigravity IDE, web development playbook, AI-native development, context engineering, Supabase security, freelance web development"
        url="https://takeinstudio.com/vault/aiwebdev"
      />

      <StickyVaultCTA />

      {/* ── PAGE WRAPPER ── */}
      <div className="bg-white min-h-screen">

        {/* ══════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
          {/* Subtle grid bg */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          {/* Very soft orange glow top-left */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#FF6B00] blur-[160px] opacity-[0.04] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[10px] tracking-widest text-gray-400 font-bold uppercase mb-10"
            >
              <Link to="/" className="hover:text-[#FF6B00] transition-colors">
                TakeIN Studio
              </Link>
              <span>/</span>
              <span className="text-[#FF6B00]">AIWebDev</span>
            </motion.div>

            {/* Studio label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[10px] tracking-[0.25em] text-gray-400 font-black uppercase mb-5"
            >
              TAKEIN STUDIO PRESENTS
            </motion.p>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(56px,10vw,100px)] font-black leading-none tracking-tight text-gray-950 mb-4"
            >
              AIWeb
              <span className="text-[#FF6B00]">Dev</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-xl sm:text-2xl font-display font-semibold text-gray-700 tracking-tight mb-6 max-w-2xl"
            >
              The AI-Native<br />
              Web Development Playbook.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mb-8"
            >
              Learn to understand, build, debug, secure,
              deploy and deliver modern web applications
              using AI.
            </motion.p>

            {/* Meta tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] tracking-widest font-black text-gray-400 uppercase mb-10"
            >
              {["3 Volumes", "73 Pages", "Practical Labs", "Exact Prompts", "Capstones", "Client Systems"].map((tag) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#FF6B00]" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={scrollToCurriculum}
                className="px-6 py-3.5 border-2 border-gray-900 text-gray-900 text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Explore What's Inside
              </button>
              <Link
                to="/vault/aiwebdev/checkout"
                className="px-6 py-3.5 bg-[#FF6B00] text-white text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-orange-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
              >
                Get Vault Access
              </Link>
            </motion.div>

            {/* Audience line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-gray-400 leading-relaxed border-l-2 border-[#FF6B00]/30 pl-4 max-w-lg"
            >
              Built for beginners, developers and freelancers
              who want to use AI as a development system —
              not just a code generator.
            </motion.p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            VOLUME VISUALIZATION
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-3">
                PRODUCT FORMAT
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                3-Volume Digital Vault
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {volumes.map((vol, i) => (
                <VolumeCard key={vol.id} vol={vol} index={i} />
              ))}
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 grid grid-cols-3 divide-x divide-white/5 border border-white/5 rounded-2xl"
            >
              {[
                { n: "3", label: "Volumes" },
                { n: "73", label: "Pages" },
                { n: "60+", label: "Topics" },
              ].map((s) => (
                <div key={s.label} className="py-6 flex flex-col items-center justify-center">
                  <span className="font-display text-3xl font-black text-white mb-1">{s.n}</span>
                  <span className="text-[10px] tracking-widest text-white/30 uppercase font-bold">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            VALUE PROPOSITION
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-16">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                WHAT THIS IS
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight mb-6 max-w-2xl">
                This is not another<br />
                "100 AI prompts" PDF.
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-xl">
                AIWebDev teaches a repeatable workflow — not a list of prompts to copy.
              </p>
            </AnimatedSection>

            {/* Workflow steps */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-16">
              {["UNDERSTAND", "PROMPT", "BUILD", "INSPECT", "DEBUG", "VERIFY", "DEPLOY", "DELIVER"].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white px-5 py-5 flex flex-col gap-2"
                >
                  <span className="text-[9px] tracking-widest text-gray-300 font-bold">
                    0{i + 1}
                  </span>
                  <span className="text-xs font-black text-gray-900 tracking-wider">
                    {step}
                  </span>
                  {i < 7 && (
                    <ArrowRight size={10} className="text-[#FF6B00] mt-1 hidden sm:block" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Supporting text */}
            <AnimatedSection className="grid sm:grid-cols-2 gap-8 max-w-3xl">
              <div>
                <h3 className="font-display text-sm font-black text-gray-900 tracking-tight mb-3">
                  You won't just receive prompts to copy.
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  You'll learn why applications work, how client/server architecture fits together,
                  and how to provide AI agents with the right context.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-black text-gray-900 tracking-tight mb-3">
                  You'll know how to choose models and recover.
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  How to choose models for different tasks, how to inspect generated code,
                  and how to recover when the AI gets something wrong.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHO THIS IS FOR
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#FAFAF8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-3">
                WHO THIS IS FOR
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Three distinct paths. One system.
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "BEGINNER",
                  desc: "You can describe what you want but don't yet understand how modern web applications fit together.",
                  detail: "Learn the fundamentals while building with AI.",
                  icon: BookOpen,
                },
                {
                  num: "02",
                  title: "DEVELOPER",
                  desc: "You already understand development but want to use coding agents more effectively.",
                  detail: "Learn context engineering, model routing, debugging, security and multi-agent workflows.",
                  icon: Code2,
                },
                {
                  num: "03",
                  title: "FREELANCER",
                  desc: "You want to turn AI-assisted development into a repeatable client-delivery system.",
                  detail: "Learn acquisition, qualification, proposals, pricing, delivery and retainers.",
                  icon: Globe,
                },
              ].map((card, i) => (
                <AnimatedSection key={card.num} delay={i * 0.1}>
                  <div className="border border-gray-100 rounded-2xl p-7 bg-white h-full flex flex-col hover:border-[#FF6B00]/20 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] tracking-widest text-[#FF6B00] font-black">{card.num}</span>
                      <card.icon size={16} className="text-gray-300" />
                    </div>
                    <h3 className="font-display text-base font-black text-gray-900 tracking-tight mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                      {card.desc}
                    </p>
                    <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            AI INDEPENDENCE JOURNEY
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-16 items-start">
              {/* Left copy */}
              <AnimatedSection>
                <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                  THE PROGRESSION
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mb-6">
                  The AI Independence Journey
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  The goal isn't to make you dependent on prompts.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  The goal is to teach you how to direct, inspect and verify AI-generated software.
                </p>
              </AnimatedSection>

              {/* Right: levels */}
              <div className="space-y-1">
                {independenceLevels.map((lvl, i) => (
                  <motion.div
                    key={lvl.level}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    {/* Connector line */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-black transition-colors ${i === 5 ? "border-[#FF6B00] bg-[#FF6B00] text-white" : "border-gray-200 text-gray-400 group-hover:border-[#FF6B00]/30"}`}>
                        {i}
                      </div>
                      {i < 5 && <div className="w-px h-4 bg-gray-100 my-1" />}
                    </div>
                    <div className="pt-1">
                      <p className="text-[9px] tracking-widest text-gray-400 font-bold uppercase mb-0.5">{lvl.level}</p>
                      <p className="text-sm font-black text-gray-900 tracking-tight mb-1">{lvl.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{lvl.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CURRICULUM
        ══════════════════════════════════════════════════════════════ */}
        <section ref={curriculumRef} className="py-20 sm:py-28 bg-[#FAFAF8]" id="curriculum">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                CURRICULUM
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-gray-950 tracking-tight mb-4">
                What's Inside AIWebDev
              </h2>
              <p className="text-base text-gray-500 max-w-xl mx-auto">
                Three volumes. One complete learning and delivery system.
              </p>
            </AnimatedSection>

            <div className="space-y-3">
              {volumes.map((vol, i) => (
                <AnimatedSection key={vol.id} delay={i * 0.1}>
                  <CurriculumAccordion volume={vol} defaultOpen={i === 0} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            PRACTICAL LEARNING — DON'T JUST READ
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-16 max-w-2xl">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                HOW YOU LEARN
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight">
                You don't just read it.<br />
                You build with it.
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
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
                <AnimatedSection key={item.step} delay={i * 0.05}>
                  <div className="border border-gray-100 rounded-xl p-4 hover:border-[#FF6B00]/20 transition-colors h-full">
                    <p className="text-[9px] tracking-widest font-black text-[#FF6B00] mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-xs font-black text-gray-900 tracking-tight mb-2">
                      {item.step}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Practical components */}
            <AnimatedSection>
              <p className="text-[10px] tracking-widest text-gray-400 font-bold uppercase mb-5">
                INCLUDED THROUGHOUT
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Guided Labs",
                  "Independent Tasks",
                  "Debugging Challenges",
                  "Capstone Projects",
                  "Verification Checklists",
                  "Copy-ready Prompts",
                  "Architecture Exercises",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-gray-600 border border-gray-200 rounded-full px-4 py-1.5 hover:border-[#FF6B00]/30 hover:text-gray-800 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            PROMPT PREVIEW
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                PROMPT QUALITY
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                Build with AI
              </h2>
              <p className="text-sm text-white/40 max-w-sm">
                A partial preview. The complete prompt library is inside the Vault.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="border border-white/5 rounded-2xl overflow-hidden">
                {/* Terminal bar */}
                <div className="bg-white/5 px-5 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/40" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <span className="w-3 h-3 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-[10px] tracking-widest text-white/20 font-mono ml-2">
                    context-prompt.md
                  </span>
                </div>

                {/* Prompt content */}
                <div className="p-7 font-mono text-sm leading-relaxed">
                  <p className="text-white/60 mb-4">
                    <span className="text-[#FF6B00]/80">"</span>
                    You are working inside my existing application.
                  </p>
                  <p className="text-white/50 mb-2">Before writing code:</p>
                  <div className="space-y-1.5 mb-4 pl-4">
                    {[
                      "1. Inspect the project architecture.",
                      "2. Identify reusable components.",
                      "3. Identify the current design system.",
                      "4. Explain the files you intend to modify.",
                      "5. Produce an implementation plan.",
                    ].map((line) => (
                      <p key={line} className="text-white/40 text-[13px]">{line}</p>
                    ))}
                  </div>
                  <p className="text-white/30 italic">Then...</p>
                </div>

                {/* CTA */}
                <div className="border-t border-white/5 px-7 py-4 flex items-center justify-between">
                  <p className="text-xs text-white/20">
                    Prompt continues inside the Vault
                  </p>
                  <Link
                    to="/vault/aiwebdev/checkout"
                    className="text-[10px] font-black tracking-widest text-[#FF6B00] hover:text-orange-400 transition-colors flex items-center gap-1.5 uppercase"
                  >
                    Get Vault Access <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            AI WORKFLOW CONTRAST
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                THE DIFFERENCE
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Don't just ask AI to "make a website."
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 gap-6 items-start">
              {/* Bad */}
              <AnimatedSection delay={0.05}>
                <div className="border border-red-100 rounded-2xl overflow-hidden">
                  <div className="bg-red-50/60 px-5 py-3 border-b border-red-100">
                    <span className="text-[10px] tracking-widest font-black text-red-400 uppercase">
                      ✕ BAD
                    </span>
                  </div>
                  <div className="p-7 font-mono">
                    <p className="text-gray-400 text-sm italic">
                      "make me a modern website"
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Good workflow */}
              <AnimatedSection delay={0.1}>
                <div className="border border-green-100 rounded-2xl overflow-hidden">
                  <div className="bg-green-50/60 px-5 py-3 border-b border-green-100">
                    <span className="text-[10px] tracking-widest font-black text-green-600 uppercase">
                      ✓ AIWebDev Workflow
                    </span>
                  </div>
                  <div className="p-5">
                    {["CONTEXT", "ARCHITECTURE", "PLAN", "IMPLEMENT", "RUN", "INSPECT", "DEBUG", "VERIFY"].map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-[#FF6B00]/10 flex items-center justify-center text-[9px] font-black text-[#FF6B00]">
                            {i + 1}
                          </div>
                          {i < 7 && <div className="w-px h-3 bg-gray-100" />}
                        </div>
                        <span className="text-xs font-black text-gray-700 tracking-wider py-1.5">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.2} className="mt-8 max-w-xl">
              <p className="text-sm text-gray-500 leading-relaxed">
                AIWebDev teaches you how to supervise an AI coding agent instead of blindly accepting generated code.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            MODEL ROUTING TABLE
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-[#FAFAF8] border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                MODEL ROUTING
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mb-3">
                Different tasks. Different models.
              </h2>
              <p className="text-sm text-gray-400 max-w-md">
                The complete model-routing matrix with current model recommendations is inside the Vault. Model availability changes — we keep it current.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 text-[10px] tracking-widest font-black text-gray-400 uppercase px-6 py-3 bg-gray-50 border-b border-gray-100">
                  <span>TASK</span>
                  <span>MODEL ROLE</span>
                </div>
                {modelRouting.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                  >
                    <span className="text-sm text-gray-700 font-medium">{row.task}</span>
                    <span className="text-sm text-gray-500">{row.role}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHAT YOU RECEIVE
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                INCLUDED
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Your Vault Includes
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.floor(i / 3) * 0.05 }}
                  className="flex items-start gap-3 py-2"
                >
                  <Check size={14} className="text-[#FF6B00] shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-gray-700 leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ROADMAP / MORE COMING
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-[#0d0d0d] border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-10">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                ROADMAP
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                The Vault doesn't end here.
              </h2>
              <p className="text-sm text-white/40 leading-relaxed max-w-lg">
                AIWebDev is being developed as an evolving resource library.
                Future additions may include new prompts, workflows, templates,
                practical builds and supporting resources.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="border border-white/5 rounded-2xl p-6 inline-block">
                <p className="text-[10px] tracking-widest text-[#FF6B00] font-black uppercase mb-4">
                  COMING SOON
                </p>
                <ul className="space-y-2">
                  {[
                    "Additional build missions",
                    "More industry website prompts",
                    "Expanded debugging cases",
                    "Additional workflow templates",
                    "New reusable development assets",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/40">
                      <span className="w-1 h-1 rounded-full bg-[#FF6B00]/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            HOW ACCESS WORKS
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                THE PROCESS
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                How Access Works
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { n: "01", title: "EXPLORE", desc: "Review exactly what is included." },
                { n: "02", title: "CHECKOUT", desc: "Proceed to the AIWebDev checkout." },
                { n: "03", title: "PAYMENT VERIFICATION", desc: "Payment details are manually verified by TakeIN Studio." },
                { n: "04", title: "VAULT ACCESS", desc: "After successful verification, personal Vault credentials/access instructions are provided." },
              ].map((step, i) => (
                <AnimatedSection key={step.n} delay={i * 0.1}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-display text-3xl font-black text-gray-100">{step.n}</span>
                      <div className="flex-1 h-px bg-gray-100" />
                      {i < 3 && <ChevronRight size={12} className="text-gray-200" />}
                    </div>
                    <h3 className="font-display text-xs font-black text-gray-900 tracking-widest mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.3} className="mt-10">
              <p className="text-xs text-gray-400 border-l-2 border-gray-200 pl-4 max-w-lg">
                Your Vault credentials are intended for your individual access and should not be publicly shared.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECURITY MESSAGE
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-10 bg-[#FAFAF8] border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-start gap-4 border border-gray-100 rounded-2xl p-6 bg-white">
                <Shield size={20} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 tracking-widest uppercase mb-2">
                    PAYMENT & ACCESS
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Payments are verified before Vault access is activated. TakeIN Studio will never ask for your UPI PIN, OTP, CVV or banking password.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12 text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00] font-black uppercase mb-4">
                QUESTIONS
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Frequently Asked
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <FaqAccordion items={faqs} />
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-36 bg-[#0d0d0d] border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <p className="text-[10px] tracking-[0.25em] text-[#FF6B00]/60 font-black uppercase mb-6">
                TAKEIN STUDIO · AIWEBDEV
              </p>
              <h2 className="font-display text-[clamp(32px,6vw,64px)] font-black text-white tracking-tight leading-tight mb-6">
                Stop treating AI<br />
                like autocomplete.
              </h2>
              <p className="text-base sm:text-lg text-white/40 leading-relaxed mb-12 max-w-lg mx-auto">
                Learn how to direct it,<br />
                debug it, verify it,<br />
                and ship with it.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/vault/aiwebdev/checkout"
                  className="px-8 py-4 bg-[#FF6B00] text-white text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-orange-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
                >
                  Get AIWebDev Vault Access
                </Link>
                <button
                  onClick={scrollToCurriculum}
                  className="px-8 py-4 border border-white/10 text-white/60 text-[11px] font-black tracking-widest uppercase rounded-full hover:border-white/20 hover:text-white/80 transition-all duration-300"
                >
                  Explore Curriculum
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </div>
    </>
  );
}
