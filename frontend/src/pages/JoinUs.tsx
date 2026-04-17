import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, Users, Rocket, Palette } from "lucide-react";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { useRef } from "react";

const whyJoinUs = [
  { icon: Rocket, title: "Real Impact", desc: "Work on global projects that reach millions of users and solve actual problems." },
  { icon: Users, title: "Elite Network", desc: "Collaborate with top 1% designers and developers from around the world." },
  { icon: Palette, title: "Design Culture", desc: "We are obsessed with aesthetics. Your craft will be celebrated here." },
];

const categories = [
  { title: "Frontend Development", role: "React / Next.js Expert" },
  { title: "Backend Systems", role: "Node.js / PostgreSQL Expert" },
  { title: "UI/UX Design", role: "Product Designer" },
  { title: "Mobile Apps", role: "Flutter / React Native Expert" },
  { title: "Business Dev", role: "Growth Strategist" },
  { title: "Full Stack", role: "T-Shaped Engineer" },
];

export default function JoinUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="relative bg-cream min-h-screen overflow-hidden">
      <SEO 
        title="Join the Elite Network" 
        description="Apply to work with TakeIN Studio. We are looking for world-class designers, developers, and innovators to build the future."
      />

      {/* Floating Blobs */}
      <motion.div style={{ y: y1 }} className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <motion.div style={{ y: y2 }} className="absolute bottom-40 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-blob-delayed" />

      {/* Hero */}
      <section className="section-padding pt-40 relative z-10">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-soft font-display">
              Join the TakeIN Network — Elite Talent Circle
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight tracking-tight mb-8">
              Join the <span className="text-primary italic">TakeIN Network</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Work on real client projects, build your portfolio, and grow as a freelancer alongside a curated network of designers and developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#form" className="glow-btn bg-primary text-primary-foreground flex items-center justify-center gap-2 text-lg px-8 py-4">
                Apply Now <ArrowRight size={20} />
              </a>
              <Link to="/about" className="glow-btn bg-white text-foreground border border-border flex items-center justify-center gap-2 text-lg px-8 py-4">
                Our Story <Users size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-padding relative z-10 bg-white/40 backdrop-blur-sm border-y border-white/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoinUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="clay-card p-10 text-center h-full group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-soft">
                    <item.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Open Roles</h2>
            <p className="text-muted-foreground">Select your expertise and join the circle.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.05}>
                <div className="glass-card p-8 group hover:border-primary/40 transition-all duration-500 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">{c.title}</h4>
                      <p className="text-primary text-xs font-semibold uppercase tracking-widest">{c.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                      <ArrowRight size={16} className="group-hover:text-white transition-all" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* For Students & Freelancers */}
      <section className="section-padding bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 pointer-events-none" />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">Start Your <span className="text-primary italic">Freelance Journey</span></h2>
              <p className="text-background/70 text-lg mb-8 leading-relaxed">
                Whether you're a student or an aspiring freelancer, TakeIN Studio gives you the opportunity to work on real-world projects, gain experience, and build a strong portfolio.
              </p>
              <p className="text-background/70 text-lg mb-10 leading-relaxed font-medium border-l-2 border-primary pl-6">
                We connect you with live projects, guide your growth, and help you become industry-ready while earning and learning.
              </p>
              <div className="flex gap-4">
                <a href="#form" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
                  Join the Circle
                </a>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-40 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                   <Star className="text-primary mb-2" size={24} />
                   <p className="text-xs font-bold uppercase tracking-widest">Live Projects</p>
                </div>
                <div className="h-40 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                   <Users className="text-primary mb-2" size={24} />
                   <p className="text-xs font-bold uppercase tracking-widest">Elite Mentorship</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-40 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                   <Rocket className="text-primary mb-2" size={24} />
                   <p className="text-xs font-bold uppercase tracking-widest">Rapid Growth</p>
                </div>
                <div className="h-40 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                   <CheckCircle2 className="text-primary mb-2" size={24} />
                   <p className="text-xs font-bold uppercase tracking-widest">Portfolio Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="section-padding relative z-10 bg-cream-dark/30">
        <div className="container mx-auto max-w-3xl">
          <AnimatedSection className="glass-card p-8 sm:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold mb-2">Application Form</h2>
              <p className="text-muted-foreground text-sm">Tell us about your craft.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1">Portfolio Link</label>
                <input type="url" className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="https://behance.net/johndoe" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1">Why TakeIN Studio?</label>
                <textarea className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none min-h-[120px]" placeholder="Tell us what excites you about building premium digital experiences..." />
              </div>

              <button type="submit" className="w-full glow-btn bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold">
                Submit Application
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Collaborators", val: "100+" },
              { label: "Countries", val: "15+" },
              { label: "Avg. Hourly", val: "$45+" },
              { label: "Happiness", val: "99%" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center group">
                <p className="font-display text-4xl font-bold mb-1 group-hover:text-primary transition-colors">{stat.val}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
