import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Globe, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Locations() {
  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Our Global Presence | Digital Agency in Bhubaneswar, Odisha & Global" 
        description="TakeIN Studio serves businesses globally while being firmly rooted in Bhubaneswar (BBSR), Odisha. Explore our local and international service tracks for web and app development."
      />

      {/* Hero */}
      <section className="section-padding pt-40 pb-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Global Digital Agency
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-8">
              Our <span className="text-primary italic">Global</span> Presence
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              TakeIN Studio serves businesses globally while being rooted in Bhubaneswar, Odisha. We combine local market knowledge with international standards.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Track Selection */}
      <section className="section-padding !pt-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Global Track */}
            <AnimatedSection>
              <div className="clay-card p-10 h-full flex flex-col justify-between group hover:border-primary/40 transition-all duration-500">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                    <Globe size={32} className="text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-4">Serving Worldwide</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Providing high-performance web and mobile solutions for startups and brands across the globe. We adhere to the highest international standards of design and engineering.
                  </p>
                  <ul className="space-y-3 mb-10">
                    {["Premium Development", "SaaS & Enterprise Apps", "Global Startup Solutions", "International UI/UX Standards"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <Link to="/web-development" className="flex items-center justify-between p-4 rounded-xl bg-foreground text-background font-bold hover:gap-4 transition-all group/btn">
                    Global Web Services <ArrowRight size={18} className="group-hover/btn:translate-x-1" />
                  </Link>
                  <Link to="/mobile-app-development" className="flex items-center justify-between p-4 rounded-xl border border-border font-bold hover:bg-muted transition-all">
                    Global App Services <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Local Track */}
            <AnimatedSection delay={0.1}>
              <div className="clay-card p-10 h-full flex flex-col justify-between border-accent/20 hover:border-accent/40 transition-all duration-500">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8">
                    <MapPin size={32} className="text-accent" />
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-4 text-accent">Bhubaneswar, Odisha</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Our HQ and local base. We are Bhubaneswar's top-rated digital agency, helping local businesses dominate their market with custom web and mobile solutions.
                  </p>
                  <ul className="space-y-3 mb-10">
                    {["Bhubaneswar Web Dev", "Odisha's Top Developers", "Local Business Growth", "Regional App Services"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <Link to="/web-development-bhubaneswar" className="flex items-center justify-between p-4 rounded-xl bg-accent text-white font-bold hover:gap-4 transition-all group/btn">
                    Local Web Services <ArrowRight size={18} className="group-hover/btn:translate-x-1" />
                  </Link>
                  <Link to="/mobile-app-development-bhubaneswar" className="flex items-center justify-between p-4 rounded-xl border border-border font-bold hover:bg-muted transition-all">
                    Local App Services <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-20 text-center">
        <p className="text-muted-foreground font-display font-medium">
            TakeIN Studio — Building for the world, based in Bhubaneswar. 🌍
        </p>
      </section>
    </div>
  );
}
