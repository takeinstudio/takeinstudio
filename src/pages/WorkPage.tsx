import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

const categories = ["All", "Institutions", "Gyms", "Medical", "Construction", "Interior Design", "NGOs"];

const projects = [
  { title: "Oxford Academy Portal", category: "Institutions", desc: "Full-stack student management platform with real-time dashboards.", color: "from-primary/20 to-accent/10" },
  { title: "FitZone Pro", path: "/projects/fitzone-gym-app", category: "Gyms", desc: "Membership app with workout tracking, bookings, and social features.", color: "from-accent/20 to-primary/10" },
  { title: "MediCare Connect", path: "/projects/medicare-portal", category: "Medical", desc: "Telemedicine platform connecting patients with specialists globally.", color: "from-warm-light to-accent/15" },
  { title: "BuildRight Co.", category: "Construction", desc: "Project management suite for construction firms with 3D site views.", color: "from-primary/15 to-warm-light" },
  { title: "Luxe Interiors", category: "Interior Design", desc: "Immersive portfolio with AR room visualiser and booking system.", color: "from-accent/10 to-primary/20" },
  { title: "HopeFoundation", category: "NGOs", desc: "Donation platform with impact tracking and transparent reporting.", color: "from-warm-light to-primary/10" },
  { title: "Peak Performance", category: "Gyms", desc: "Cross-platform gym chain app with 200+ video workouts.", color: "from-primary/20 to-accent/20" },
  { title: "SmartClinic", category: "Medical", desc: "AI-powered diagnostic assistant for rural healthcare providers.", color: "from-accent/15 to-warm-light" },
  { title: "UrbanBuild", category: "Construction", desc: "Real-time fleet and equipment tracking for major contractors.", color: "from-primary/10 to-accent/20" },
];

export default function WorkPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <SEO 
        title="Our Work | Premium Portfolio of TakeIN Studio"
        description="Explore the best web and app development projects built by TakeIN Studio — from high-performance fitness apps to enterprise-grade medical portals."
      />
      <section className="section-padding pt-32 sm:pt-40">
        <div className="container mx-auto">
          <SectionHeading
            badge="Portfolio"
            title="Our Work Speaks Louder"
            subtitle="Explore our curated collection of projects across industries."
          />

          {/* Filters */}
          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.06}>
                {(p as any).path ? (
                  <Link to={(p as any).path} className="group block h-full">
                    <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${p.color} relative overflow-hidden mb-4`}>
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-center">
                          <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold">
                            View Case Study <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-display font-bold text-lg mt-1 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
                  </Link>
                ) : (
                  <div className="group h-full cursor-default opacity-80">
                    <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${p.color} relative overflow-hidden mb-4`}>
                    </div>
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-display font-bold text-lg mt-1">{p.title} (Draft)</h3>
                    <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
