import { AlertTriangle, Briefcase, MapPin, Heart, Cpu, Smile, Users, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

const perks = [
  { icon: Heart, title: "Health & Wellbeing", desc: "Co-sponsored wellness plans, gym support, and mental wellbeing resources." },
  { icon: Cpu, title: "Elite Hardware Setup", desc: "Receive direct budgets for premium laptops, noise-canceling headsets, and desk setups." },
  { icon: Smile, title: "Unlimited Time Off", desc: "We focus on outcomes and performance, not hours clocked. Take time when needed." },
  { icon: Users, title: "Global Team Retreats", desc: "Annual company getaways to collaborate, celebrate milestones, and design the future." }
];

export default function CareerPage() {
  return (
    <>
      {/* Top Banner indicating facility unavailable - Highlighted */}
      <section className="pt-24 sm:pt-28 pb-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative rounded-2xl border border-red-500/30 bg-card/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-2xl">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <AlertTriangle size={24} className="animate-bounce" />
                </div>
                <div className="text-center sm:text-left space-y-2 flex-1">
                  <h4 className="font-display font-bold text-xl text-foreground flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-red-500">Notice:</span> Facility Unavailable
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    This facility is not available right now. We are currently reforming our talent acquisition pipeline. Please check back later or contact our general help desk for inquiries.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-10 pt-4 text-center px-4">
        <div className="container mx-auto max-w-3xl">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
              Join Our Team
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Design the Future of the <span className="text-primary">Decentralized Web</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
              We work with elite creators, developers, and designers globally. Build high-concurrency systems, rich design frameworks, and interactive frontend solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Workspace Perks */}
      <section className="py-12 sm:py-16 px-4 bg-cream-dark/40">
        <div className="container mx-auto">
          <div className="mb-8">
            <SectionHeading badge="Work Culture" title="Global Workspace Benefits" subtitle="We believe in creating environments where creators can do their absolute best work." />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div className="clay-card p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                      <p.icon size={16} />
                    </div>
                    <h3 className="font-display font-bold text-sm mb-1.5">{p.title}</h3>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Spec */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Our Engineering Ecosystem</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-8">We push code that compiles into lightweight, accessible, and fast runtimes. Here is what we build with daily:</p>
            
            <div className="flex flex-wrap justify-center gap-2.5">
              {["React 18+", "TypeScript", "Tailwind CSS", "Vite", "Supabase", "Node.js", "GraphQL", "Framer Motion", "Playwright", "Vitest"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm text-xs font-semibold text-foreground/80 hover:border-primary/30 transition-colors shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* General Applications Info */}
      <section className="py-12 sm:py-16 px-4 bg-cream-dark/40 mb-10">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <AnimatedSection>
            <div className="clay-card p-6 sm:p-8 border border-white/10 space-y-3">
              <h3 className="font-display font-bold text-lg sm:text-xl">General Talent Pool</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
                While active job listings are suspended during pipeline integration, we are always eager to meet elite builders. Submit your portfolio for future review.
              </p>
              <div className="pt-3">
                <a 
                  href="mailto:takeinstudio@gmail.com?subject=General Application - TakeIN Studio"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:scale-105 active:scale-100 transition-all shadow-lg shadow-primary/20"
                >
                  Send Portfolio <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
