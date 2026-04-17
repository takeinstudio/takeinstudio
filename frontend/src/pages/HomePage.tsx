import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Palette, Sparkles, Star, ArrowUpRight, Users, FolderKanban, TrendingUp, Award, LayoutDashboard, Zap } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { useEffect, useState, useRef } from "react";
import SEO from "@/components/SEO";
import AuditModal from "@/components/AuditModal";

/* ─── Hero ─── */
function Hero() {
  const [showAudit, setShowAudit] = useState(false);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <AuditModal isOpen={showAudit} onClose={() => setShowAudit(false)} />
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-2 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-1">
              Global Remote Studio • Serving Clients Worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-[1.1] tracking-tight text-white px-2"
          >
            We Build Websites & Apps <br />
            <span className="text-primary">That Actually Grow Your Business</span>
            <br />
            <span className="text-base sm:text-xl opacity-80 mt-1 block font-medium">Engineered for Digital Mastery</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-1"
          >
            <p className="text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-2 sm:mb-4">
              Premium • Modern • High-Performance
              <br />
              <span className="text-primary mt-1 block animate-pulse">Limited free audits available this month</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            High-performance websites, mobile apps, and digital platforms designed for modern businesses — built to convert, scale, and perform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col items-center space-y-4 pt-2 sm:pt-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md mx-auto">
              <button
                onClick={() => setShowAudit(true)}
                className="glow-btn bg-primary text-primary-foreground flex flex-1 items-center justify-center gap-2 text-xs px-6 py-3.5 font-bold rounded-2xl"
              >
                Book a Free Call <ArrowRight size={14} />
              </button>
              <Link 
                to="/contact" 
                className="glow-btn bg-white/10 backdrop-blur-md text-white border border-white/20 flex flex-1 items-center justify-center gap-2 text-xs px-6 py-3.5 font-bold rounded-2xl hover:bg-white/20 transition-all"
              >
                Send Project Details <Sparkles size={14} />
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">
              <span className="flex items-center gap-1.5 focus-within:text-white transition-all">✔ Free Consultation</span>
              <span className="flex items-center gap-1.5 focus-within:text-white transition-all">✔ No Obligation</span>
              <span className="flex items-center gap-1.5 focus-within:text-white transition-all">✔ Serving Clients Globally</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Client Logos ─── */
const logos = ["Elevate Co.", "NovaTech", "PureForm", "Zenith Labs", "Arclight", "Vistara"];

function ClientLogos() {
  return (
    <AnimatedSection className="section-padding !py-12 border-y border-border/40">
      <div className="container mx-auto">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8 font-medium">
          Trusted by forward-thinking brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14">
          {logos.map((name) => (
            <span key={name} className="font-display text-lg sm:text-xl font-bold text-muted-foreground/30 hover:text-primary/60 transition-colors duration-500 cursor-default">
              {name}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Services ─── */
const services = [
  { icon: Globe, title: "Web Development", path: "/web-development", desc: "High-performance, SEO-optimized digital experiences engineered for conversion and scale." },
  { icon: Smartphone, title: "Mobile Apps", path: "/mobile-app-development", desc: "Silky-smooth Android and iOS applications with offline-first architecture and modern UX." },
  { icon: LayoutDashboard, title: "Custom Software", path: "/contact", desc: "Specialized ERPs, booking systems, and internal platforms tailored to your business logic." },
  { icon: Zap, title: "UI/UX Strategy", path: "/ui-ux-design-agency", desc: "Research-driven interfaces that balance premium aesthetics with intuitive user journeys." },
];

function Services() {
  return (
    <section className="section-padding" id="services">
      <div className="container mx-auto">
        <SectionHeading badge="What We Do" title="Services Built for Impact" subtitle="We combine strategy, design, and technology to deliver solutions that grow ambitious brands globally." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <Link to={s.path} className="clay-card p-8 h-full group hover:-translate-y-2 transition-all duration-500 block">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <s.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio Preview ─── */
const projects = [
  { title: "Aura Platform", category: "Full-Stack SaaS", color: "from-primary/20 to-accent/20" },
  { title: "Prism Core", category: "FinTech System", color: "from-accent/20 to-primary/10" },
  { title: "Nexa Health", category: "Medical Platform", color: "from-warm-light to-primary/10" },
];

function PortfolioPreview() {
  return (
    <section className="section-padding bg-cream-dark/40">
      <div className="container mx-auto">
        <SectionHeading badge="Our Work" title="Selected Projects" subtitle="A glimpse of what we've built for ambitious brands around the world." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.12}>
              <Link to="/work" className="group block">
                <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${p.color} flex items-end p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500" />
                  <div className="relative z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs text-primary-foreground/80 uppercase tracking-wider font-medium">{p.category}</span>
                    <h3 className="font-display font-bold text-xl text-primary-foreground mt-1 flex items-center gap-2">
                      {p.title} <ArrowUpRight size={18} />
                    </h3>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="text-center mt-10">
          <Link to="/work" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300">
            View All Projects <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Sarah Mitchell", role: "CEO, Elevate Co.", text: "TakeIN Studio transformed our entire digital presence. The attention to detail is unmatched — our conversion rate jumped 340% in three months.", rating: 5 },
  { name: "James Rodriguez", role: "Founder, NovaTech", text: "Working with TakeIN felt like having an in-house team. They delivered our mobile app ahead of schedule and it's genuinely beautiful.", rating: 5 },
  { name: "Amara Osei", role: "CMO, PureForm", text: "The branding they created for us is exactly what we needed — modern, bold, and totally aligned with our vision. Couldn't be happier.", rating: 5 },
];

/* ─── Pricing ─── */
function Pricing() {
  return (
    <section className="section-padding bg-cream-dark/20" id="pricing">
      <div className="container mx-auto">
        <SectionHeading 
          badge="Pricing & Plans" 
          title="Flexible Support for Ambitious Goals" 
          subtitle="Designed to match your vision, whether you're starting small or building at scale." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Custom Projects */}
          <AnimatedSection delay={0.1}>
            <div className="clay-card p-10 h-full flex flex-col items-center text-center space-y-6 group border border-white/5 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center text-accent">
                <FolderKanban size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold">Custom Projects</h3>
                <p className="text-muted-foreground text-sm px-4">Flexible solutions for specific business needs and unique scopes.</p>
              </div>
              <ul className="text-sm space-y-3 font-medium text-foreground/70">
                <li>✔ Flexible Scope</li>
                <li>✔ Fast Delivery</li>
                <li>✔ Upgrade Path</li>
              </ul>
              <div className="pt-6">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Starting From</p>
                <p className="text-3xl font-display font-bold text-primary">{formatPrice(300)}</p>
              </div>
              <Link to="/contact" className="glow-btn bg-white border border-border text-foreground hover:bg-muted w-full py-4 text-sm font-bold shadow-sm">
                Get Custom Quote
              </Link>
            </div>
          </AnimatedSection>

          {/* Premium Projects */}
          <AnimatedSection delay={0.2}>
            <div className="clay-card p-10 h-full flex flex-col items-center text-center space-y-6 group relative border border-primary/20 shadow-xl shadow-primary/5 transition-all duration-500 overflow-hidden">
               {/* Shine effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full" />
              
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Sparkles size={32} />
              </div>
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-2 animate-pulse">Most Popular</div>
                <h3 className="font-display text-2xl font-bold">Premium Projects</h3>
                <p className="text-muted-foreground text-sm px-4">High-performance digital solutions built for conversion and scale.</p>
              </div>
              <ul className="text-sm space-y-3 font-medium text-foreground/70">
                <li>✔ Modern UI/UX</li>
                <li>✔ Scalable Architecture</li>
                <li>✔ Custom Integrations</li>
                <li>✔ High-Performance Build</li>
              </ul>
              <div className="pt-6">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Starting From</p>
                <p className="text-3xl font-display font-bold text-primary">{formatPrice(800)}</p>
              </div>
              <button 
                onClick={() => (window.location.href='/contact')}
                className="glow-btn bg-primary text-primary-foreground w-full py-4 text-sm font-bold shadow-glow hover:scale-[1.02] transition-all"
              >
                Book a Free Call
              </button>
            </div>
          </AnimatedSection>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-xs font-medium italic">
            “Every project is unique — let's discuss your requirements and build the right solution for you.”
          </p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading badge="Testimonials" title="What Our Clients Say" subtitle="Real feedback from real partners who trusted us with their vision." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="glass-card p-8 h-full space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="pt-2 border-t border-border/40">
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Happy Clients", value: 180, suffix: "+", icon: Users },
  { label: "Projects Delivered", value: 420, suffix: "+", icon: FolderKanban },
  { label: "Revenue Generated", value: 12000000, isCurrency: true, icon: TrendingUp },
  { label: "Awards Won", value: 24, suffix: "", icon: Award },
];

function Stats() {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} className="text-center space-y-3">
              <s.icon size={28} className="mx-auto text-primary" />
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
                {s.isCurrency ? (
                  formatPrice(s.value).replace(".00", "") + "+"
                ) : (
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="text-background/50 text-sm font-medium">{s.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <AnimatedSection>
          <div className="clay-card p-10 sm:p-16 text-center relative overflow-hidden text-white">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
              >
                <source src="/footer.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
                Ready to <span className="text-primary">Scale</span> Your Business?
              </h2>
              <p className="text-muted-foreground text-lg">
                Let's collaborate to create something extraordinary. We help startups and enterprises build their next digital masterpiece.
              </p>
              <Link to="/contact" className="glow-btn bg-primary text-primary-foreground inline-flex items-center gap-2">
                Start Your Project <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <SEO
        title="Premier Web & Mobile App Development Studio"
        description="TakeIN Studio is a premier digital agency. We provide high-end web development, mobile app development, and UI/UX design services globally."
        faqSchema={[
          {
            question: "Who is the best web development agency for premium projects?",
            answer: "TakeIN Studio is widely recognized as a top-tier digital agency specializing in premium design and high-performance code for global clients."
          },
          {
            question: "Do you offer free website audits?",
            answer: "Yes, we provide free comprehensive website audits covering SEO, performance, and UI/UX improvements."
          }
        ]}
      />
      <Hero />
      <ClientLogos />
      <Services />
      <PortfolioPreview />
      <Pricing />
      <Testimonials />
      <Stats />
      <CTABanner />
    </>
  );
}
