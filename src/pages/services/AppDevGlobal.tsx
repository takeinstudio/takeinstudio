import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Smartphone, Zap, Code, Layout, ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppDevGlobal() {
  const faq = [
    { 
      question: "Do you build for both iOS and Android?", 
      answer: "Yes, we use Flutter and React Native to build high-performance cross-platform apps for both platforms from a single codebase." 
    },
    { 
      question: "How long does it take to develop a startup MVP?", 
      answer: "A feature-rich MVP typically takes 6-10 weeks to develop, test, and launch on the app stores." 
    },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Mobile App Development Services | Bhubaneswar, Odisha & Global" 
        description="TakeIN Studio develops high-performance Android & iOS mobile apps for startups and businesses in Bhubaneswar, Odisha, and worldwide."
        faqSchema={faq}
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-white/5 skew-x-12 translate-x-1/2 blur-3xl" />
        <div className="container mx-auto relative z-10 text-center sm:text-left">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6">
              Next-Gen Mobility
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Mobile Apps <br />
              <span className="opacity-70">Designed to Scale</span>. <br /> Built to Perform.
            </h1>
            <p className="text-white/80 text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl">
              At TakeIN Studio, we craft high-performance mobile applications that deliver seamless user experiences and real business impact. We build apps that are fast, scalable, and future-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/contact" className="glow-btn bg-white text-primary text-sm font-bold px-10 py-4 shadow-xl">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading 
            badge="Our Approach" 
            title="End-to-End Mobile App Development" 
            subtitle="We handle everything from idea validation to deployment. We provide complete mobile solutions tailored to your business goals."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Cross-Platform Experts", desc: "Write once, run everywhere with Flutter and React Native without compromising on native feel." },
              { icon: Layout, title: "Pixel Perfect UI", desc: "Our design team ensures your app looks stunning on every screen size, from iPhone to Android tablet." },
              { icon: Zap, title: "Instant Performance", desc: "Optimized backend and lightning-fast state management for zero-lag interactions." },
              { icon: Layers, title: "Cloud Integration", desc: "Seamless integration with AWS, Firebase, and Supabase for real-time data sync." },
              { icon: Smartphone, title: "iOS & Android", desc: "Full-cycle development from design to deployment on Apple App Store & Google Play Store." },
              { icon: ArrowRight, title: "Ongoing Support", desc: "We don't just ship and leave. We provide ongoing updates and maintenance for your app." },
            ].map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="glass-card p-10 h-full border-0 shadow-soft group hover:bg-primary/5 transition-all">
                  <f.icon size={32} className="text-primary mb-6" />
                  <h3 className="font-display font-bold text-xl mb-4 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="font-display text-4xl font-bold mb-8">What We Build</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  "Android Applications (Kotlin / Java)",
                  "iOS Applications (Swift)",
                  "Cross-Platform Apps (Flutter / React Native)",
                  "Startup MVPs & Prototypes",
                  "Scalable Backend Integrations",
                  "App UI/UX Design"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary" />
                    <span className="font-medium text-background/80">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-display font-bold text-lg mb-2 text-primary">Scalable Architecture</h4>
                  <p className="text-sm text-background/60 leading-relaxed">Built to handle millions of users with rock-solid cloud infrastructure.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-display font-bold text-lg mb-2 text-primary">Premium UI/UX</h4>
                  <p className="text-sm text-background/60 leading-relaxed">Research-driven design that ensures high user retention and delight.</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection className="clay-card p-12 text-foreground relative overflow-hidden bg-white">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
               <h3 className="font-display text-2xl font-bold mb-6">Serving Clients Worldwide</h3>
               <p className="text-muted-foreground leading-relaxed mb-8">
                 We collaborate with startups, businesses, and organizations across the globe, delivering mobile apps that meet international standards.
               </p>
               <Link to="/contact" className="glow-btn bg-primary text-primary-foreground w-full text-center py-4 font-bold shadow-soft">
                  Launch Your App with Us
               </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
