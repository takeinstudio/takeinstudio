import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Globe, Zap, Shield, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function WebDevBhubaneswar() {
  const faq = [
    { question: "How much does web development cost in Bhubaneswar?", answer: "Costs vary depending on complexity, but a premium business website typically ranges from ₹20,000 to ₹1,50,000+." },
    { question: "How long does it take to build a website?", answer: "A standard corporate website takes 2-4 weeks, while complex platforms may take 2-3 months." },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Web Development Company in Bhubaneswar" 
        description="TakeIN Studio is the leading web development company in Bhubaneswar. We build premium, SEO-optimized, and high-converting websites for local and global brands."
        faqSchema={faq}
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Expert Web Solutions
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-8">
              Top-Tier <span className="text-primary italic">Web Development</span> Company in Bhubaneswar
            </h1>
            <p className="text-background/70 text-lg mb-10 leading-relaxed">
              We specialize in building ultra-fast, search-engine-optimized websites that don't just look pretty — they drive revenue. Serving Bhubaneswar and global markets with excellence.
            </p>
            <div className="flex gap-4">
              <Link to="/contact" className="glow-btn bg-primary text-primary-foreground text-sm font-bold">
                Start My Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 border-b border-border/40 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">100ms</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Load Speed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">150+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Sites Built</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">#1</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">SEO Ranking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading 
            badge="Bhubaneswar's Best" 
            title="Why Businesses Trust TakeIN Studio" 
            subtitle="We blend global design standards with deep local market knowledge."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Next-Gen Performance", desc: "We use React, Next.js, and Vite to ensure your site loads instantly on any connection." },
              { icon: Search, title: "SEO at the Core", desc: "Every line of code is written to help you rank #1 for web development searches in Odisha." },
              { icon: Shield, title: "Secure & Scalable", desc: "Enterprise-grade security and cloud architecture that grows with your business." },
            ].map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="clay-card p-10 h-full group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <s.icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-4">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-cream-dark/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-4xl font-bold mb-6">Comprehensive Web Solutions in Bhubaneswar</h2>
              <div className="space-y-4">
                {[
                  "Custom E-commerce Platforms",
                  "Responsive Corporate Websites",
                  "High-Converting Landing Pages",
                  "MERN & Next.js Web Apps",
                  "CMS Development (WordPress/Headless)",
                  "API Integrations & Cloud Hosting"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection className="glass-card p-8">
              <h4 className="font-display font-bold text-lg mb-4">Request a Free Website Audit</h4>
              <p className="text-muted-foreground text-sm mb-6">Enter your website URL and we'll send a professional SEO & speed report within 24 hours — for free.</p>
              <form className="space-y-4">
                <input type="url" placeholder="Your Website URL" className="w-full px-4 py-3 rounded-xl border border-border bg-white" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-border bg-white" />
                <button className="w-full glow-btn bg-primary text-primary-foreground py-3">Audit My Website</button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
