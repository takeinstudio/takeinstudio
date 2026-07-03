import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, GraduationCap, Camera, HeartPulse, HardDrive, Hotel, Film, Layers, X, BookOpen, MessageSquare, Briefcase, Sparkles, Server, CheckCircle2, Search, Code, Rocket, PenTool } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { useContent } from "@/context/ContentContext";

const categories = [
  { name: "All", icon: Layers },
  { name: "Business Websites", icon: Briefcase },
  { name: "Education", icon: GraduationCap },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Creative Portfolios", icon: Camera },
  { name: "E-commerce", icon: Search },
  { name: "Dashboards & ERP", icon: HardDrive },
  { name: "AI Solutions", icon: Sparkles }
];

const gradientMap: Record<string, string> = {
  All: "from-primary to-accent",
  "Business Websites": "from-blue-500 to-indigo-500",
  Education: "from-indigo-500 to-purple-500",
  Healthcare: "from-emerald-500 to-teal-500",
  "Creative Portfolios": "from-pink-500 to-rose-500",
  "E-commerce": "from-orange-500 to-amber-500",
  "Dashboards & ERP": "from-slate-500 to-gray-500",
  "AI Solutions": "from-fuchsia-500 to-pink-500"
};

const processSteps = [
  { icon: Search, title: "Discovery", desc: "Understanding goals, requirements, and competitive landscape." },
  { icon: PenTool, title: "Design", desc: "Creating wireframes, layouts, and high-fidelity user experiences." },
  { icon: Code, title: "Development", desc: "Building fast, scalable, and robust software solutions." },
  { icon: Rocket, title: "Launch", desc: "Deployment, optimization, and post-launch support." }
];

export default function WorkPage() {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const location = useLocation();
  const { content } = useContent();

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    if (content && content['portfolio_items']) {
      try {
        const parsed = JSON.parse(content['portfolio_items']);
        setProjects(parsed);
      } catch (e) {
        console.error("Failed to parse portfolio", e);
      }
    }
  }, [content]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      const decoded = categoryParam.toLowerCase();
      const matched = categories.find((c) => c.name.toLowerCase() === decoded.replace("-", " "));
      if (matched) {
        setActive(matched.name);
      }
    }
  }, [location]);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  // Group by sections
  const clientWork = filtered.filter(p => p.section === "Featured Client Work");
  const solutionShowcase = filtered.filter(p => p.section === "Solution Showcase" || !p.section);
  const internalProducts = filtered.filter(p => p.section === "Internal Products");

  const ProjectGrid = ({ items, title, subtitle }: { items: any[], title: string, subtitle?: string }) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-20">
        <div className="mb-8">
          <h2 className="font-display font-bold text-3xl text-foreground mb-2 flex items-center gap-3">
            {title === "Featured Client Work" && <span className="bg-primary/10 text-primary p-1.5 rounded-lg"><Briefcase size={20}/></span>}
            {title === "Solution Showcase" && <span className="bg-accent/10 text-accent p-1.5 rounded-lg"><Sparkles size={20}/></span>}
            {title === "Internal Products" && <span className="bg-blue-500/10 text-blue-500 p-1.5 rounded-lg"><Server size={20}/></span>}
            {title}
          </h2>
          {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p, i) => (
            <AnimatedSection key={p.id || i} delay={i * 0.08} className="h-full">
              <div 
                onClick={() => setSelectedProject(p)} 
                className={`group flex flex-col h-full bg-card/40 backdrop-blur-sm border ${p.featured ? 'border-primary/50 shadow-md' : 'border-border/40'} hover:border-primary/50 rounded-2xl p-4 transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden`}
              >
                {p.featured && (
                   <div className="absolute top-0 right-6 bg-primary text-primary-foreground text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-b-lg shadow-sm z-20">
                     Featured
                   </div>
                )}
                
                <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${p.color || 'from-primary/20 to-accent/20'} relative overflow-hidden mb-5 shadow-inner flex items-center justify-center`}>
                  {p.image && (
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  
                  {/* Fallback Icon if no image */}
                  {!p.image && (
                    <div className="z-10 text-white/50 group-hover:text-white/80 transition-colors duration-300">
                      <Layers size={48} strokeWidth={1} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-center justify-center z-10">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-center">
                      <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-glow">
                        {p.section === "Featured Client Work" ? "View Case Study" : p.section === "Internal Products" ? "View Product" : "Explore Concept"} <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <span className="inline-block text-[10px] text-primary font-extrabold uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full">{p.category}</span>
                    <h3 className="font-display font-bold text-lg mt-3 group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.desc}</p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-border/10 flex md:hidden items-center justify-between text-xs text-primary font-bold">
                    <span>{p.section === "Featured Client Work" ? "View Case Study" : p.section === "Internal Products" ? "View Product" : "Explore Concept"}</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO 
        title="Work & Solutions | TakeIN Studio"
        description="Explore our digital solutions, client projects, and industry concepts."
      />
      <section className="section-padding pt-32 sm:pt-40">
        <div className="container mx-auto">
          <SectionHeading
            badge="Our Portfolio"
            title="Solution Showcase"
            subtitle="Explore industry-focused digital experiences, automation systems, websites, applications, and business solutions designed to demonstrate what's possible for modern organizations."
          />

          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-16 max-w-5xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = active === cat.name;
              const activeGradient = gradientMap[cat.name] || "from-primary to-accent";
              return (
                <button
                  key={cat.name}
                  onClick={() => setActive(cat.name)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${activeGradient} text-white shadow-glow scale-105`
                      : "bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-[1.02]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-white animate-pulse" : "text-primary/70"} />
                  {cat.name}
                </button>
              );
            })}
          </AnimatedSection>

          {projects.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground"><Layers size={24}/></div>
              <h3 className="font-display font-bold text-xl text-foreground">No Projects Found</h3>
              <p className="text-muted-foreground text-sm mt-2">Check back soon for new solutions.</p>
            </div>
          ) : (
            <>
              <ProjectGrid 
                items={clientWork} 
                title="Featured Client Work" 
                subtitle="Live solutions delivered to our clients." 
              />
              <ProjectGrid 
                items={solutionShowcase} 
                title="Solution Showcase" 
                subtitle="Design concepts and industry-specific platform architectures." 
              />
              <ProjectGrid 
                items={internalProducts} 
                title="Internal Products" 
                subtitle="Systems and tools we've built for our own operations." 
              />
            </>
          )}

        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-muted/20 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container mx-auto relative z-10 max-w-6xl">
          <SectionHeading badge="How We Work" title="Our Development Process" subtitle="A structured approach to building scalable digital solutions." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {processSteps.map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-card border border-border/50 p-6 rounded-3xl relative hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                      {idx + 1}
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{step.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study / Project Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="glass-card w-full max-w-md bg-card/95 border border-border/80 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 text-left space-y-6 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {selectedProject.section === "Featured Client Work" ? <Briefcase size={24} /> : selectedProject.section === "Internal Products" ? <Server size={24} /> : <Sparkles size={24} />}
                </div>
                <div>
                  <span className="inline-block text-[10px] text-primary font-extrabold uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-xl font-bold leading-tight text-foreground">
                    {selectedProject.section === "Featured Client Work" ? "View Case Study?" : selectedProject.section === "Internal Products" ? "View Product Details?" : "Explore Solution Concept?"}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    {selectedProject.section === "Featured Client Work" 
                      ? `Would you like to view the comprehensive case study for the ${selectedProject.title}?` 
                      : selectedProject.section === "Internal Products"
                      ? `Want to learn more about how we built ${selectedProject.title}?`
                      : `The ${selectedProject.title} is a specialized custom design concept. Would you like to get a free consultation to build a tailored solution for your brand?`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selectedProject.case_study || selectedProject.website_link ? (
                  <Link
                    to={selectedProject.case_study || selectedProject.website_link || "/contact"}
                    onClick={() => setSelectedProject(null)}
                    className="glow-btn bg-primary text-primary-foreground flex-1 py-3 text-center text-xs font-bold shadow-glow hover:scale-[1.02] transition-all rounded-xl"
                  >
                    View Details
                  </Link>
                ) : (
                  <Link
                    to="/contact"
                    onClick={() => setSelectedProject(null)}
                    className="glow-btn bg-primary text-primary-foreground flex-1 py-3 text-center text-xs font-bold shadow-glow hover:scale-[1.02] transition-all rounded-xl"
                  >
                    Get Free Consultation
                  </Link>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-transparent border border-border text-foreground hover:bg-muted py-3 px-5 text-xs font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
