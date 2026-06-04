import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Palette, MousePointer2, Layout, Sparkles, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function UXDesignAgency() {
  const faq = [
    { question: "What services does a UI/UX design agency provide?", answer: "A UI/UX agency provides user research, wireframing, interactive prototyping, and visual interface design." },
    { question: "How much do UI/UX design services cost?", answer: "Pricing depends on project scope, but typical design phases for a modern app start at ₹30,000." }
  ];

  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Premium UI/UX Design Agency in Bhubaneswar, Odisha & Global" 
        description="TakeIN Studio is a premier UI/UX design agency in Bhubaneswar (BBSR), Odisha. We create intuitive, world-class interfaces for local and global brands."
        faqSchema={faq}
      />

      {/* Hero */}
      <section className="section-padding pt-32 text-center max-w-4xl mx-auto">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            Aesthetic & Functional
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-8">
            Designing <span className="text-primary italic">Interfaces</span> That Feel Like Magic
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            We don't just push pixels. We design experiences that solve problems, delight users, and drive meaningful growth for ambitious brands.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/work" className="glow-btn bg-foreground text-background text-sm font-bold">
              View Showcase
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Design Pillars */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading 
            badge="The Process" 
            title="Our Design Philosophy" 
            subtitle="We believe in the perfect balance of beauty and utility."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: Layout, title: "Deep UX Research", desc: "We study your users, their pain points, and their goals before drawing a single line. Design is only as good as the research behind it." },
              { icon: Palette, title: "Modern Brand Identity", desc: "We create cohesive visual systems that reflect your brand's soul — from typography and color theory to custom iconography." },
              { icon: MousePointer2, title: "Interactive Prototypes", desc: "Experience your product before it's built. We create high-fidelity prototypes that feel real, ensuring the flow is perfect." },
              { icon: Sparkles, title: "Micro-Interactions", desc: "The magic is in the details. We add subtle animations and transitions that make using your product a joy." },
            ].map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div className="flex gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-soft group-hover:bg-primary group-hover:text-white transition-all">
                    <p.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto text-center max-w-2xl">
          <Heart size={40} className="mx-auto text-primary mb-6 animate-pulse" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Need a Design That Converts?</h2>
          <p className="text-background/60 mb-10">Stop losing users to bad UX. Let's rebuild your product with a design system that works.</p>
          <Link to="/contact" className="glow-btn bg-primary text-primary-foreground">
            Book a Design Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
