import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, CheckCircle2, Trophy, Clock, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

export default function VaultMediaProject() {
  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Vault Media Case Study | Enterprise Storage Hub" 
        description="See how TakeIN Studio designed and developed Vault Media Server, a collaborative media sharing and timeline rendering platform."
      />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to="/work" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          <header className="mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 block underline decoration-2 underline-offset-4">Success Story</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6">Vault Media Server</h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
              Engineering collaborative rendering clusters and secure enterprise asset storage servers for video editing studios.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <AnimatedSection className="aspect-[4/5] rounded-3xl overflow-hidden relative border border-border/40 shadow-2xl flex items-center justify-center bg-card">
              <img 
                src="/portfolio_video.png" 
                alt="Vault Media Server screenshot" 
                className="absolute inset-0 w-full h-full object-cover object-top opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </AnimatedSection>
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Target size={24} />
                  <h3 className="font-display font-bold text-2xl">The Requirement</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Editing agencies faced bottlenecks when working on colossal 8K video assets across remote teams. They needed zero-lag collaborative timeline reviews and automatic file synchronization.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Lightbulb size={24} />
                  <h3 className="font-display font-bold text-2xl">Our Architecture</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We engineered custom cloud storage nodes using edge cache routing, combined with WebRTC connections to sync timelines instantly. Real-time feedback tools allow frame-by-frame annotations directly inside the player.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <section className="bg-foreground text-background p-10 sm:p-20 rounded-3xl mb-20">
            <div className="flex items-center gap-3 mb-10">
              <Trophy size={32} className="text-primary" />
              <h3 className="font-display font-bold text-3xl">Delivered Scale</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div>
                <p className="text-5xl font-bold text-primary mb-2">12x</p>
                <p className="text-sm text-background/60 font-medium">Faster synchronization of heavy assets</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">&lt;50ms</p>
                <p className="text-sm text-background/60 font-medium">Remote rendering cluster latency</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">100%</p>
                <p className="text-sm text-background/60 font-medium">Feedback accuracy and time-sync</p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <footer className="text-center">
            <p className="text-muted-foreground mb-6">Need a custom media sharing system or server setup?</p>
            <Link to="/contact" className="glow-btn bg-primary text-primary-foreground">
              Develop Your Media Hub
            </Link>
          </footer>
        </div>
      </section>
    </div>
  );
}
