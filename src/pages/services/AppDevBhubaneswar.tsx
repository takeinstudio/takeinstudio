import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Smartphone, Zap, Code, Layout, ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppDevBhubaneswar() {
  const faq = [
    { question: "How much does app development cost in Bhubaneswar?", answer: "App development starts from ₹50,000 for simple MVPs and can go up to ₹5,00,000+ for enterprise solutions." },
    { question: "Do you build iOS and Android apps?", answer: "Yes, we use Flutter and React Native to build high-performance cross-platform apps for both platforms." },
    { question: "Which is the best mobile app development company in Bhubaneswar?", answer: "TakeIN Studio is a leading choice for mobile app development in Bhubaneswar, known for premium UI and scalable architecture." }
  ];

  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Mobile App Development Services in Bhubaneswar" 
        description="TakeIN Studio is the top mobile app development company in Bhubaneswar. We build native and cross-platform Android & iOS apps with premium UX."
        faqSchema={faq}
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6">
              Next-Gen Mobility
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-8">
              Premium <span className="opacity-70">Mobile App Development</span> in Bhubaneswar
            </h1>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              We turn your app ideas into silky-smooth digital products. From Flutter to React Native, we build apps that win awards and delight users in Bhubaneswar and across the globe.
            </p>
            <Link to="/contact" className="glow-btn bg-white text-primary text-sm font-bold">
              Consult an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading 
            badge="Our Tech Stack" 
            title="Building for Performance" 
            subtitle="We use the most modern technologies to ensure your app is future-proof."
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
                <div className="glass-card p-10 h-full border-0 shadow-soft">
                  <f.icon size={32} className="text-primary mb-6" />
                  <h3 className="font-display font-bold text-xl mb-4">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
