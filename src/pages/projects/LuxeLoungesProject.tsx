import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, CheckCircle2, Trophy, Clock, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

export default function LuxeLoungesProject() {
  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Luxe Lounges Case Study | Luxury Hospitality Web" 
        description="See how TakeIN Studio designed Luxe Lounges, a bespoke booking and reservation web platform for luxury hotels."
      />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to="/work" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          <header className="mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 block underline decoration-2 underline-offset-4">Success Story</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6">Luxe Lounges Portal</h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
              Crafting a bespoke reservation and concierge system designed to match high-end boutique hospitality.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <AnimatedSection className="aspect-[4/5] rounded-3xl overflow-hidden relative border border-border/40 shadow-2xl flex items-center justify-center bg-card">
              <img 
                src="/portfolio_web.png" 
                alt="Luxe Lounges platform screenshot" 
                className="absolute inset-0 w-full h-full object-cover object-top opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </AnimatedSection>
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Target size={24} />
                  <h3 className="font-display font-bold text-2xl">The Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Boutique hotels required an online reservation funnel that matched their premium, sensory physical space, offering a frictionless table and suite selection experience.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Lightbulb size={24} />
                  <h3 className="font-display font-bold text-2xl">Our Craft</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We engineered an ultra-premium layout featuring immersive storytelling, elegant transition physics, and an instantaneous reservation system. Designed with responsive grids to look equally stunning on smartphones.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <section className="bg-foreground text-background p-10 sm:p-20 rounded-3xl mb-20">
            <div className="flex items-center gap-3 mb-10">
              <Trophy size={32} className="text-primary" />
              <h3 className="font-display font-bold text-3xl">Delivered Metrics</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div>
                <p className="text-5xl font-bold text-primary mb-2">180%</p>
                <p className="text-sm text-background/60 font-medium">Increase in online direct bookings</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">&lt;1.2s</p>
                <p className="text-sm text-background/60 font-medium">Page loading latency speed globally</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">94%</p>
                <p className="text-sm text-background/60 font-medium">Conversion improvement on mobile</p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <footer className="text-center">
            <p className="text-muted-foreground mb-6">Want a modern booking experience for your space?</p>
            <Link to="/contact" className="glow-btn bg-primary text-primary-foreground">
              Build Your Website
            </Link>
          </footer>
        </div>
      </section>
    </div>
  );
}
