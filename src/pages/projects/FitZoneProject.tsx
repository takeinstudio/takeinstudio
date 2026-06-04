import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, CheckCircle2, Trophy, Clock, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

export default function FitZoneProject() {
  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Aura Platform Case Study | Premium SaaS Development" 
        description="See how TakeIN Studio built Aura Platform, a high-performance SaaS ecosystem engineered for scalability and modern user engagement."
      />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to="/work" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          <header className="mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 block underline decoration-2 underline-offset-4">Success Story</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6">Aura Platform (SaaS)</h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
              Engineering a high-performance SaaS ecosystem designed to scale user engagement and automate complex business workflows.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <AnimatedSection className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden flex items-center justify-center p-12">
              <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">AP</div>
                <div className="w-2/3 h-2 bg-primary/20 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary" />
                </div>
                <p className="text-xs font-bold text-primary italic uppercase tracking-widest">Premium SaaS Foundation</p>
              </div>
            </AnimatedSection>
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Target size={24} />
                  <h3 className="font-display font-bold text-2xl">The Problem</h3>
                </div>
                  <p className="text-muted-foreground leading-relaxed">
                    The client faced Fragmented workflow management and low user retention in their legacy environment. They required a premium digital foundation that could bridge the gap between complex functionality and an effortless user experience.
                  </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Lightbulb size={24} />
                  <h3 className="font-display font-bold text-2xl">The Solution</h3>
                </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We engineered a custom SaaS architecture focused on real-time data synchronization and modular component design. The platform features advanced analytics dashboards, automated user onboarding, and a silky-smooth React-based interface.
                  </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <section className="bg-foreground text-background p-10 sm:p-20 rounded-3xl mb-20">
            <div className="flex items-center gap-3 mb-10">
              <Trophy size={32} className="text-primary" />
              <h3 className="font-display font-bold text-3xl">The Results</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div>
                <p className="text-5xl font-bold text-primary mb-2">400%</p>
                <p className="text-sm text-background/60 font-medium">Increase in digital engagement</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">2x</p>
                <p className="text-sm text-background/60 font-medium">Class booking efficiency</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">98%</p>
                <p className="text-sm text-background/60 font-medium">User satisfaction rate</p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <footer className="text-center">
            <p className="text-muted-foreground mb-6">Looking for a similar digital transformation?</p>
            <Link to="/contact" className="glow-btn bg-primary text-primary-foreground">
              Consult for Your App
            </Link>
          </footer>
        </div>
      </section>
    </div>
  );
}
