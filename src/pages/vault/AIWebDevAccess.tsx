import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Terminal,
  Shield,
  Layers,
  Zap,
  ArrowLeft,
  ChevronRight,
  Download,
  Lock,
  Search,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import SEO from "@/components/SEO";
import { toast } from "sonner";

// ─── Volume Data ──────────────────────────────────────────────────────────────
const volumesDetail = [
  {
    id: "volume-1",
    num: "VOLUME I",
    title: "AI-Native Foundations",
    pages: "28 Pages",
    subtitle: "Terminal Workflows, Prompt Architecture & Client-Server Fundamentals",
    chapters: [
      {
        num: "01",
        title: "What is Claude Code & the New Workflow",
        summary: "Terminal-based AI development vs traditional IDE workflow.",
        content: `Modern AI development has shifted from copy-pasting code snippets to direct terminal supervision. Terminal-based AI tools operate directly inside your git directory, inspect file trees, run test scripts, and modify files autonomously under your supervision.

Key concepts:
- Old workflow: Prompt browser -> Copy snippet -> Paste into VS Code -> Test manually -> Debug in browser console.
- AI-Native workflow: Give high-level instruction + architectural constraints -> Agent inspects files -> Produces diff -> Executes build/test -> Repairs failures -> Commits change.
- CLI Setup: Running agent CLI inside working project root.`,
      },
      {
        num: "02",
        title: "Framer Motion & 21st.dev Component Integration",
        summary: "High-perceived-quality animations and component library integration.",
        content: `Perceived quality in web applications is 80% motion and visual finish.

Key techniques:
- Spring physics over linear transitions: Use type: "spring", stiffness: 200, damping: 20 for organic interactive elements.
- Staggered child animations: Use staggerChildren: 0.08 in container variants to create smooth staggered entry effects.
- 21st.dev integration: Modular UI component ingestion with custom tailwind tokens.`,
      },
      {
        num: "03",
        title: "The Golden Website Prompt & C.R.E.F. Architecture",
        summary: "Master prompt structure for generating production-grade websites.",
        content: `Never ask AI to "make me a website". Use the C.R.E.F framework:
- Context: Provide exact codebase structure, tech stack, and design tokens.
- Role: "You are a Principal Frontend Architect at a top design studio."
- Execution: Step 1 (Inspect), Step 2 (Plan), Step 3 (Component Build), Step 4 (Verify).
- Format: Return structured files, standard CSS utility classes, and zero placeholder content.`,
        codeSnippet: `// The Golden Website Prompt Architecture
"You are a Senior Frontend Engineer at TakeIN Studio.
Context: Tailwind CSS, Space Grotesk font (headings), Inter font (body), primary accent #FF6B00.
Instruction: Build a responsive hero component.
Before writing code:
1. Inspect project architecture.
2. Outline component structure.
3. Write clean TSX without external broken dependencies."`,
      },
      {
        num: "04",
        title: "12 Website Architectures & Agency Niche Templates",
        summary: "Architectural patterns for SaaS, Agency, E-commerce, Clinics, and Real Estate.",
        content: `Different client niches require specific layout storylines:
- Problem/Solution Storyline: Problem statement -> Pain points -> Solution preview -> Social proof -> Risk reversal CTA.
- Founder Storyline: Mission statement -> Origin -> Craftsmanship -> Portfolio -> Directly book call.
- SaaS Conversion Path: Hero value prop -> Product UI mock -> Feature matrix -> Pricing tiers -> FAQ -> Bottom CTA.`,
      },
    ],
  },
  {
    id: "volume-2",
    num: "VOLUME II",
    title: "Advanced Building, Agents & Security",
    pages: "22 Pages",
    subtitle: "Multi-Agent Orchestration, 4-Step Debugging & Supabase RLS Blueprints",
    chapters: [
      {
        num: "01",
        title: "Multi-Agent Orchestration Matrix",
        summary: "Routing complex tasks across reasoning, coding, and review models.",
        content: `Using a single model for all tasks leads to hallucination and bloated code.

Routing strategy:
- Gemini Pro / Reasoning Model: Initial system architecture, schema design, and step-by-step implementation plan.
- Primary Builder (Sonnet / Coding Model): Writing actual production TSX components and API routes.
- Independent Reviewer: Inspecting diffs for security flaws, missing null checks, or edge-case bugs.`,
      },
      {
        num: "02",
        title: "The 4-Step Systematic Debugging System",
        summary: "How to fix broken builds and runtime errors without endless retry loops.",
        content: `When code breaks:
1. Reproduce: Extract exact terminal error trace or console log. Never guess.
2. Trace: Follow execution path from trigger site to upstream provider.
3. Smallest Fix: Apply the minimal diff required to satisfy the contract.
4. Verify: Run full build or test suite to ensure zero collateral regressions.`,
      },
      {
        num: "03",
        title: "Application Security & Supabase RLS Blueprints",
        summary: "Protecting user data, multi-tenant schemas, and API keys.",
        content: `Never expose service-role keys in public frontend clients.

Row Level Security (RLS) Blueprint:
- Enable RLS on all Postgres tables: ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
- Multi-Tenant Isolation Policy: CREATE POLICY "Users access own data" ON leads FOR SELECT USING (auth.uid() = user_id);
- Zod Schema Validation: Always validate incoming request payloads server-side before database mutation.`,
        codeSnippet: `-- Supabase Multi-Tenant RLS Blueprint
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow individual read access"
ON public.user_profiles FOR SELECT
USING (auth.uid() = id);`,
      },
    ],
  },
  {
    id: "volume-3",
    num: "VOLUME III",
    title: "Freelancing & Client Delivery",
    pages: "23 Pages",
    subtitle: "Client Acquisition, Audit Worksheets, Proposals & Maintenance Retainers",
    chapters: [
      {
        num: "01",
        title: "Pre-Sales AI Website Audits",
        summary: "Conducting fact-based client website audits that close deals.",
        content: `Do not pitch "you need a website". Pitch specific, observable performance, mobile layout, and CTA conversion gaps.

Audit Checklist:
1. Mobile viewport overflow check (375px rendering).
2. Primary CTA visibility above the fold.
3. Page load speed & image optimization status.
4. Form conversion experience and instant WhatsApp / SMS lead triggers.`,
      },
      {
        num: "02",
        title: "Client Acquisition & Permission-Based Outreach",
        summary: "India & International outreach frameworks.",
        content: `The 3-Step Outreach Formula:
1. Observe: Point out a real gap on their live website/app.
2. Demonstrate: Create a 30-second video or prototype preview showing the fix.
3. Ask Permission: "Would you like me to send over the complete breakdown?"`,
      },
      {
        num: "03",
        title: "Proposals, Scope Boundaries & Maintenance Retainers",
        summary: "Pricing frameworks, delivery pipelines, and recurring revenue.",
        content: `Structure your packages cleanly:
- Starter Website: High-converting landing page + mobile optimization + lead capture.
- Business Platform: Custom design system + Admin dashboard + CMS integration.
- Maintenance Retainer: Monthly hosting, security updates, minor copy tweaks, and performance monitoring.`,
      },
    ],
  },
];

export default function AIWebDevAccess() {
  const { volumeId } = useParams<{ volumeId?: string }>();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Active volume selection based on URL parameter or default to volume-1
  const activeVolId = volumeId || "volume-1";
  const currentVol = volumesDetail.find((v) => v.id === activeVolId) || volumesDetail[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Code snippet copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <>
      <SEO
        title={`${currentVol.title} — AIWebDev Playbook | TakeIN Vault`}
        description="Protected reader area for TakeIN Studio AIWebDev Digital Vault subscribers."
        url={`https://takeinstudio.com/vault/aiwebdev/access/${activeVolId}`}
      />

      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
        {/* Header Navigation */}
        <header className="border-b border-white/10 bg-[#121216] sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/vault/dashboard"
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                Dashboard
              </Link>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#FF6B00]">AIWebDev</span>
                <span className="text-xs text-white/30">/ Protected Reader</span>
              </div>
            </div>

            {/* Volume selector tabs */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
              {volumesDetail.map((vol) => {
                const isActive = vol.id === activeVolId;
                return (
                  <Link
                    key={vol.id}
                    to={`/vault/aiwebdev/access/${vol.id}`}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#FF6B00] text-white shadow-md"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {vol.num}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1 space-y-6">
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-1">
                {currentVol.num}
              </p>
              <h2 className="font-display text-lg font-black text-white leading-tight mb-2">
                {currentVol.title}
              </h2>
              <p className="text-xs text-white/40 mb-4">{currentVol.pages}</p>

              <div className="border-t border-white/5 pt-4 space-y-2">
                <p className="text-[9px] tracking-widest font-black text-white/30 uppercase mb-2">
                  CHAPTER INDEX
                </p>
                {currentVol.chapters.map((ch, i) => (
                  <a
                    key={ch.num}
                    href={`#chapter-${ch.num}`}
                    className="flex items-center justify-between text-xs text-white/60 hover:text-[#FF6B00] py-1.5 transition-colors"
                  >
                    <span className="truncate pr-2">{ch.num}. {ch.title}</span>
                    <ChevronRight size={12} className="shrink-0 text-white/20" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Access Card */}
            <div className="bg-[#121216]/60 border border-white/5 rounded-2xl p-5 text-xs">
              <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">
                SECURITY REMINDER
              </p>
              <p className="text-white/50 leading-relaxed">
                This Vault resource is authorized exclusively for your registered email. Direct resource URLs remain protected under your session.
              </p>
            </div>
          </aside>

          {/* Reader Body */}
          <div className="md:col-span-3 space-y-8">
            {/* Title Banner */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#FF6B00]/10 text-[#FF6B00] text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-[#FF6B00]/20">
                  {currentVol.num}
                </span>
                <span className="text-xs text-white/40">{currentVol.pages}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                {currentVol.title}
              </h1>
              <p className="text-sm text-white/60 leading-relaxed">
                {currentVol.subtitle}
              </p>
            </div>

            {/* Chapter Details */}
            <div className="space-y-6">
              {currentVol.chapters.map((ch) => (
                <motion.div
                  key={ch.num}
                  id={`chapter-${ch.num}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#121216] border border-white/10 rounded-2xl p-7 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black text-[#FF6B00] tracking-widest">
                      CHAPTER {ch.num}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-xs text-white/40 italic">{ch.summary}</span>
                  </div>

                  <h3 className="font-display text-xl font-black text-white tracking-tight mb-4">
                    {ch.title}
                  </h3>

                  <div className="text-sm text-white/70 leading-relaxed whitespace-pre-line font-sans mb-6">
                    {ch.content}
                  </div>

                  {/* Code Snippet Box if available */}
                  {ch.codeSnippet && (
                    <div className="mt-4 border border-white/10 rounded-xl bg-black/60 overflow-hidden">
                      <div className="bg-white/5 px-4 py-2.5 flex items-center justify-between border-b border-white/5">
                        <span className="text-[10px] tracking-widest font-mono text-white/40">
                          PROMPT / BLUEPRINT CODE
                        </span>
                        <button
                          onClick={() => handleCopy(ch.codeSnippet!)}
                          className="flex items-center gap-1.5 text-[10px] text-[#FF6B00] font-bold hover:underline"
                        >
                          {copiedCode === ch.codeSnippet ? (
                            <>
                              <Check size={12} /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Copy Code
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-white/80 overflow-x-auto">
                        <code>{ch.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Volume Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <Link
                to="/vault/dashboard"
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                ← Back to Vault Dashboard
              </Link>
              <div className="flex gap-3">
                {activeVolId !== "volume-1" && (
                  <Link
                    to="/vault/aiwebdev/access/volume-1"
                    className="text-xs font-bold text-white/70 hover:text-white border border-white/10 rounded-lg px-4 py-2"
                  >
                    Volume I
                  </Link>
                )}
                {activeVolId !== "volume-2" && (
                  <Link
                    to="/vault/aiwebdev/access/volume-2"
                    className="text-xs font-bold text-white/70 hover:text-white border border-white/10 rounded-lg px-4 py-2"
                  >
                    Volume II
                  </Link>
                )}
                {activeVolId !== "volume-3" && (
                  <Link
                    to="/vault/aiwebdev/access/volume-3"
                    className="text-xs font-bold text-white/70 hover:text-white border border-white/10 rounded-lg px-4 py-2"
                  >
                    Volume III
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-4 text-center text-xs text-white/30">
          © 2026 TakeIN Studio. AIWebDev Protected Playbook Environment.
        </footer>
      </div>
    </>
  );
}
