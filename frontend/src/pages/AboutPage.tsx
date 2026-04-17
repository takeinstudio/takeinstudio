import { Link } from "react-router-dom";
import { Target, Eye, Zap, Clock, Lightbulb, Heart, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

const whyUs = [
  { icon: Zap, title: "Lightning Fast", desc: "We ship quality work at startup speed without cutting corners." },
  { icon: Lightbulb, title: "Design-First", desc: "Every pixel is intentional. We obsess over the details so you don't have to." },
  { icon: Heart, title: "Partnership", desc: "We're not vendors — we're partners invested in your long-term success." },
];

const timeline = [
  { year: "2019", title: "Founded", desc: "Started as a two-person studio with a vision to redefine digital craft." },
  { year: "2020", title: "First Major Client", desc: "Landed our first enterprise contract and grew the team to 8." },
  { year: "2021", title: "Global Reach", desc: "Expanded to serve clients across 12 countries on 4 continents." },
  { year: "2022", title: "Award Season", desc: "Won 6 industry awards including Best Digital Agency under 50." },
  { year: "2023", title: "Innovation Lab", desc: "Launched our R&D lab focused on AI-driven design tools." },
  { year: "2024", title: "Premium Scale", desc: "Crossed 400 projects delivered with a 97% client satisfaction rate." },
];

const team = [
  { name: "Alex Chen", role: "Founder & CEO", emoji: "👨‍💻" },
  { name: "Maria Santos", role: "Creative Director", emoji: "🎨" },
  { name: "David Kim", role: "Lead Engineer", emoji: "⚙️" },
  { name: "Priya Sharma", role: "UX Strategist", emoji: "🧠" },
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
              We're a collective of designers, engineers, and strategists who believe every brand deserves a digital presence as bold as its ambition.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding !pt-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection>
            <div className="clay-card p-10 h-full space-y-4">
              <Target size={32} className="text-primary" />
              <h3 className="font-display font-bold text-xl">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratise premium digital experiences — making world-class design and technology accessible to ambitious businesses of every size.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="clay-card p-10 h-full space-y-4">
              <Eye size={32} className="text-accent" />
              <h3 className="font-display font-bold text-xl">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every interaction with a brand feels effortless, beautiful, and memorable — powered by thoughtful design and cutting-edge code.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-cream-dark/40">
        <div className="container mx-auto">
          <SectionHeading badge="Why Us" title="What Sets Us Apart" subtitle="We don't just build products — we craft experiences that move people." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="glass-card p-8 text-center h-full space-y-4 group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <item.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading badge="The Team" title="Meet the Minds" subtitle="Passionate people building the future of digital." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="clay-card p-6 text-center space-y-3 group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-3xl group-hover:scale-110 transition-transform duration-500">
                    {t.emoji}
                  </div>
                  <h4 className="font-display font-semibold">{t.name}</h4>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
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
