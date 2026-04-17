import { Link } from "react-router-dom";
import { Target, Palette, Zap, FolderKanban, Globe, TrendingUp, Clock, Award, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

const approach = [
  { 
    title: "Strategy First", 
    desc: "We begin by understanding your business, goals, and audience to ensure every decision is aligned with your growth.",
    icon: Target
  },
  { 
    title: "Design Driven", 
    desc: "Clean, modern, and user-focused interfaces that create strong first impressions and seamless experiences.",
    icon: Palette
  },
  { 
    title: "Performance Focused", 
    desc: "Fast-loading, optimized systems built for real-world usage and long-term scalability.",
    icon: Zap
  },
  { 
    title: "Scalable Systems", 
    desc: "We build solutions that grow with your business — flexible, adaptable, and future-ready.",
    icon: FolderKanban
  },
];

const whyUs = [
  { 
    title: "Global Mindset", 
    desc: "We work with clients across different regions, ensuring smooth communication and world-class standards.",
    icon: Globe
  },
  { 
    title: "Business Focused", 
    desc: "Every solution is designed with one goal — helping your business grow and perform better.",
    icon: TrendingUp
  },
  { 
    title: "Fast & Reliable", 
    desc: "We value your time and deliver projects efficiently without compromising quality.",
    icon: Clock
  },
  { 
    title: "Premium Execution", 
    desc: "From design to development, every detail is crafted with precision and modern standards.",
    icon: Award
  },
];

const timeline = [
  { year: "2019", title: "Global Mission", desc: "Started as a specialized studio with a vision to redefine digital craft for international markets." },
  { year: "2021", title: "Remote Infrastructure", desc: "Transitioned to a fully cloud-first remote studio serving clients across 12+ countries." },
  { year: "2023", title: "Scale Phase", desc: "Successfully delivered 400+ custom projects with a focus on enterprise-grade performance." },
  { year: "2024", title: "Premium Pivot", desc: "Official launch of our high-ticket digital growth framework for global startups." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding pt-32 sm:pt-40">
        <div className="container mx-auto text-center max-w-3xl">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              About Us
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              The Studio Behind the <span className="text-primary">Magic</span>
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              We are a global digital studio focused on building high-performance websites, mobile applications, and custom software systems that drive real business growth.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section-padding !pt-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedSection>
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold">Engineering Excellence</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  At TakeIN Studio, we don’t just design — we engineer digital experiences that are fast, scalable, and built with purpose. Every project is approached with a deep understanding of business goals, user behavior, and modern technology.
                </p>
                <p>
                  Our work spans across industries — from startups to established businesses — helping them transform ideas into powerful digital products. We believe in simplicity, performance, and precision.
                </p>
                <p>
                  Serving clients worldwide, we operate as a global remote studio — collaborating across time zones to deliver consistent, high-quality results.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="clay-card p-8 sm:p-10 bg-primary/5 border-primary/10">
              <blockquote className="text-xl font-display font-medium italic text-foreground/80 leading-relaxed">
                "TakeIN Studio is not just a service provider — we are your digital growth partner."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-1px bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Philosophy</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-cream-dark/40">
        <div className="container mx-auto">
          <SectionHeading 
            badge="Our Approach" 
            title="Strategic Excellence" 
            subtitle="We follow a structured process to deliver high-quality, scalable digital solutions." 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="clay-card p-8 h-full group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <item.icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading 
            badge="Why Us" 
            title="Results, Not Just Designs" 
            subtitle="We focus on delivering products that grow with your business goals." 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="glass-card p-8 h-full space-y-4 hover:border-primary/20 transition-all group">
                   <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon size={18} />
                  </div>
                  <h3 className="font-display font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-cream-dark/40">
        <div className="container mx-auto">
          <SectionHeading badge="Our Journey" title="Growth Timeline" />
          <div className="max-w-2xl mx-auto space-y-0">
            {timeline.map((t, i) => (
              <AnimatedSection key={t.year} delay={i * 0.08}>
                <div className="flex gap-6 pb-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 z-10">
                      <Clock size={16} className="text-primary" />
                    </div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="pb-4">
                    <span className="text-primary font-bold text-sm">{t.year}</span>
                    <h4 className="font-display font-bold mt-1">{t.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{t.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Want to Join Our Story?</h2>
            <p className="text-muted-foreground mb-8">Let's build something extraordinary together.</p>
            <Link to="/contact" className="glow-btn bg-primary text-primary-foreground inline-flex items-center gap-2">
              Get In Touch <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
