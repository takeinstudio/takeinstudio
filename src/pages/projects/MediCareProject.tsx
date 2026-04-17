import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, CheckCircle2, Shield, Heart, Search, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

export default function MediCareProject() {
  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="MediCare Portal Case Study | Healthcare Web Platform" 
        description="Explore how TakeIN Studio developed the MediCare Portal — a secure, fast, and patient-centric healthcare platform for a major hospital in Odisha."
      />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to="/work" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          <header className="mb-16">
            <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4 block underline decoration-2 underline-offset-4">Web Transformation</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6">MediCare Portal</h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
              Designing a secure, high-speed, and patient-first digital ecosystem for one of Odisha's premier healthcare institutions.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-12 order-2 md:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Shield size={24} />
                  <h3 className="font-display font-bold text-2xl">The Problem</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  The institution lacked a centralized digital portal for patient data, appointment scheduling, and remote consultation. Their existing legacy system was slow, insecure, and confusing for both patients and staff.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Heart size={24} />
                  <h3 className="font-display font-bold text-2xl">The Solution</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We engineered a HIPAA-compliant (standard) web portal using Next.js for blazing-fast speed and a robust cloud backend. We prioritized accessibility, ensuring elderly patients could easily navigate the appointment system.
                </p>
              </div>
            </div>
            <AnimatedSection className="aspect-[4/5] bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl overflow-hidden flex items-center justify-center p-12 order-1 md:order-2">
              <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white text-3xl font-bold">MC</div>
                <div className="w-2/3 h-2 bg-accent/20 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-accent" />
                </div>
                <p className="text-xs font-bold text-accent italic uppercase tracking-widest">Healthcare Redefined</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Results */}
          <section className="bg-primary text-primary-foreground p-10 sm:p-20 rounded-3xl mb-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="flex items-center gap-3 mb-10 relative z-10">
              <Monitor size={32} className="text-white" />
              <h3 className="font-display font-bold text-3xl">The Outcome</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative z-10">
              <div>
                <p className="text-5xl font-bold text-white mb-2">60k+</p>
                <p className="text-sm text-white/60 font-medium">Patients onboarded per month</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">99%</p>
                <p className="text-sm text-white/60 font-medium">Uptime during peak hours</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">35%</p>
                <p className="text-sm text-white/60 font-medium">Reduction in administrative overhead</p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <footer className="text-center">
            <p className="text-muted-foreground mb-6">Need a secure platform for your healthcare business?</p>
            <Link to="/contact" className="glow-btn bg-foreground text-background">
              Start Your Quote
            </Link>
          </footer>
        </div>
      </section>
    </div>
  );
}
