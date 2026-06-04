import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, CheckCircle2, Trophy, Clock, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

export default function NexaHealthProject() {
  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Nexa Health Case Study | Premium HealthTech App" 
        description="See how TakeIN Studio developed Nexa Health, an AI-powered diagnostic and clinic coordination hub."
      />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to="/work" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          <header className="mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 block underline decoration-2 underline-offset-4">Success Story</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6">Nexa Health Portal</h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
              Developing a highly secure, AI-powered diagnostic helper and consultation suite for modern medical clinics.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <AnimatedSection className="aspect-[4/5] rounded-3xl overflow-hidden relative border border-border/40 shadow-2xl flex items-center justify-center bg-card">
              <img 
                src="/portfolio_project.png" 
                alt="Nexa Health platform screenshot" 
                className="absolute inset-0 w-full h-full object-cover object-top opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </AnimatedSection>
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Target size={24} />
                  <h3 className="font-display font-bold text-2xl">The Mandate</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Clinics needed to lower wait times, safely store electronic health records (EHR), and offer patients an easy portal to book and attend digital teleconsultations in high definition.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Lightbulb size={24} />
                  <h3 className="font-display font-bold text-2xl">Our Architecture</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We built a secure, fully responsive portal utilizing end-to-end encrypted video modules and HIPAA-compliant charting databases. Integrated AI triage assists clinical staff in grouping appointments logically.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <section className="bg-foreground text-background p-10 sm:p-20 rounded-3xl mb-20">
            <div className="flex items-center gap-3 mb-10">
              <Trophy size={32} className="text-primary" />
              <h3 className="font-display font-bold text-3xl">Impact & Results</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div>
                <p className="text-5xl font-bold text-primary mb-2">45%</p>
                <p className="text-sm text-background/60 font-medium">Reduction in patient waiting durations</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">100%</p>
                <p className="text-sm text-background/60 font-medium">Secure, encrypted patient databases</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">99.9%</p>
                <p className="text-sm text-background/60 font-medium">Uptime on live video consult calls</p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <footer className="text-center">
            <p className="text-muted-foreground mb-6">Need a secure, specialized HealthTech hub?</p>
            <Link to="/contact" className="glow-btn bg-primary text-primary-foreground">
              Develop Your Health App
            </Link>
          </footer>
        </div>
      </section>
    </div>
  );
}
