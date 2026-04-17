import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Globe, Zap, Shield, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function WebDevGlobal() {
  const faq = [
    { 
      question: "What technologies do you use for web development?", 
      answer: "We specialize in modern tech stacks including React, Next.js, and Node.js to ensure maximum performance and scalability." 
    },
    { 
      question: "How long does it take to build a premium website?", 
      answer: "A standard high-performance corporate website typically takes 3-5 weeks from strategy to launch." 
    },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Premium Web Development Services | TakeIN Studio" 
        description="We design and develop high-performance websites and digital platforms for modern businesses worldwide. Build with TakeIN Studio."
        faqSchema={faq}
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto relative z-10 text-center sm:text-left">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              World-Class Engineering
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Premium <span className="text-primary italic">Web Development</span> <br />
              Built for Performance & Scale
            </h1>
            <p className="text-background/70 text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl">
              At TakeIN Studio, we create high-performance websites engineered for speed, scalability, and exceptional user experience. We design digital platforms that drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/contact" className="glow-btn bg-primary text-primary-foreground text-sm font-bold px-10 py-4">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading 
            badge="Our Approach" 
            title="Custom Web Solutions for Modern Businesses" 
            subtitle="We specialize in building tailored web solutions that align with your business goals. Our approach focuses on performance, flexibility, and future scalability."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "High-Performance", desc: "Blazing-fast frontend using React and Next.js for instant loading." },
              { icon: Shield, title: "Scalable Backend", desc: "Robust and secure server-side architecture that grows with you." },
              { icon: Search, title: "SEO Optimized", desc: "Clean, semantic code designed to rank #1 from day one." },
              { icon: Globe, title: "Global Standards", desc: "We adhere to world-class design and engineering benchmarks." },
            ].map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="clay-card p-10 h-full group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <s.icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="section-padding bg-cream-dark/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-4xl font-bold mb-6">What We Deliver</h2>
              <div className="space-y-4">
                {[
                  "Custom Website Development",
                  "High-Performance Frontend (React / Next.js)",
                  "Scalable Backend Systems",
                  "SEO-Optimized Architecture",
                  "Responsive & Mobile-First Design",
                  "API Integrations & Cloud Hosting"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary" />
                    <span className="font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                  Start Your Project <ArrowRight size={20} />
                </Link>
              </div>
            </AnimatedSection>
            <div className="relative">
              <AnimatedSection className="glass-card p-12 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
                 <h3 className="font-display text-2xl font-bold mb-4 italic text-primary">Serving Businesses Worldwide</h3>
                 <p className="text-muted-foreground leading-relaxed mb-6">
                   We collaborate with startups, businesses, and organizations across industries and regions, delivering digital solutions that meet global standards.
                 </p>
                 <div className="w-full h-px bg-border mb-6" />
                 <p className="text-sm font-bold uppercase tracking-widest text-foreground/40">Global Perspective • Local Roots</p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
