import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const FloatingCard = ({ className, delay, children }: { className?: string; delay: number; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className={`absolute rounded-xl border border-border bg-surface-elevated/80 backdrop-blur-sm shadow-card p-4 ${className}`}
    style={{ animation: `float ${6 + delay}s ease-in-out infinite` }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--cyan)) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8"
          >
            <Sparkles size={14} className="text-cyan" />
            <span className="text-xs font-medium text-muted-foreground">AI-Powered Automation Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          >
            Build AI Tools.
            <br />
            <span className="text-gradient-cyan">Automate Everything.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            TakeIN Studio helps developers and businesses build AI automation systems,
            discover leads, and launch micro-SaaS products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#audit">
              <Button size="lg" className="bg-gradient-cyan text-primary-foreground hover:opacity-90 transition-opacity px-8 text-base">
                Join Early Access
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </a>
            <a href="#work-with-us">
              <Button size="lg" variant="outline" className="px-8 text-base border-border hover:bg-secondary">
                Work With Us
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Floating cards */}
        <div className="hidden lg:block">
          <FloatingCard className="top-20 -left-4 w-48" delay={1.2}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
              <span className="text-xs font-medium text-foreground">AI Analysis</span>
            </div>
            <div className="h-2 rounded-full bg-secondary w-full mb-1" />
            <div className="h-2 rounded-full bg-secondary w-3/4" />
          </FloatingCard>

          <FloatingCard className="top-40 -right-4 w-52" delay={1.5}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse-glow" />
              <span className="text-xs font-medium text-foreground">Leads Found</span>
            </div>
            <span className="text-2xl font-bold text-foreground">2,847</span>
            <span className="text-xs text-cyan ml-2">+12.5%</span>
          </FloatingCard>

          <FloatingCard className="bottom-32 left-10 w-44" delay={1.8}>
            <div className="text-xs font-medium text-foreground mb-1">Automations</div>
            <div className="flex gap-1">
              {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                <div key={i} className="w-3 rounded-sm bg-gradient-cyan" style={{ height: `${h * 0.4}px` }} />
              ))}
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
