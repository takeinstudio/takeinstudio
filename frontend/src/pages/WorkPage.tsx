import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, GraduationCap, Camera, HeartPulse, HardDrive, Hotel, Film, Layers, X, BookOpen, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

  // Categories mapping with specific icons for premium highlight styling
  const categories = [
    { name: "All", icon: Layers },
    { name: "Education", icon: GraduationCap },
    { name: "Photographers", icon: Camera },
    { name: "HealthTech", icon: HeartPulse },
    { name: "ERP Systems", icon: HardDrive },
    { name: "Hotels and Bars", icon: Hotel },
    { name: "Video Editing", icon: Film }
  ];

  // Gradient map for each category to use in active filter button highlight
  const gradientMap: Record<string, string> = {
    All: "from-primary to-accent",
    Education: "from-blue-500 to-indigo-500",
    Photographers: "from-pink-500 to-rose-500",
    HealthTech: "from-green-500 to-emerald-500",
    "ERP Systems": "from-purple-500 to-fuchsia-500",
    "Hotels and Bars": "from-sky-500 to-indigo-500",
    "Video Editing": "from-red-500 to-pink-500"
  };


const projects = [
  { 
    title: "Aura Learn Platform", 
    path: "/projects/fitzone-gym-app", 
    category: "Education", 
    desc: "High-performance online learning & student resource management ecosystem for international universities.", 
    color: "from-primary/25 to-accent/15",
    image: "/aura_learn.png"
  },
  { 
    title: "Prism Studio Hub", 
    path: "/projects/medicare-portal", 
    category: "Photographers", 
    desc: "Premium portfolio gallery, client proofing, and booking hub for high-fashion digital photographers.", 
    color: "from-accent/25 to-primary/15",
    image: "/prism_studio.png"
  },
  { 
    title: "Vertex Build ERP", 
    path: "/projects/vertex-build-erp",
    category: "ERP Systems", 
    desc: "Comprehensive supply chain tracking and project management suite with real-time site analytics.", 
    color: "from-primary/20 to-warm-light",
    image: "/vertex_erp.png"
  },
  { 
    title: "Nexa Health Portal", 
    path: "/projects/nexa-health-portal",
    category: "HealthTech", 
    desc: "AI-powered diagnostic assistant, patient charting, and teleconsultation platform for modern clinics.", 
    color: "from-accent/20 to-warm-light",
    image: "/portfolio_project.png"
  },
  { 
    title: "Luxe Lounges Portal", 
    path: "/projects/luxe-lounges-portal",
    category: "Hotels and Bars", 
    desc: "Bespoke hospitality reservation, concierge, and menu platform for boutique hotels and private bars.", 
    color: "from-accent/15 to-primary/25",
    image: "/portfolio_web.png"
  },
  { 
    title: "Vault Media Server", 
    path: "/projects/vault-media-server",
    category: "Video Editing", 
    desc: "Enterprise cloud storage, collaborative timeline rendering, and media assets library for editing agencies.", 
    color: "from-warm-light to-primary/20",
    image: "/portfolio_video.png"
  },
];

export default function WorkPage() {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      const decoded = categoryParam.toLowerCase();
      if (decoded === "websites" || decoded === "web-development") {
        setActive("Websites");
      } else {
        const matched = categories.find(
          (c) => c.name.toLowerCase() === decoded.replace("-", " ")
        );
        if (matched) {
          setActive(matched.name);
        }
      }
    }
  }, [location]);

  const filtered = active === "All" 
    ? projects 
    : active === "Websites" 
    ? projects.filter((p) => p.category !== "Video Editing") 
    : projects.filter((p) => p.category === active);

  return (
    <>
      <SEO 
        title="Our Portfolios | Best Web Design Agency in Bhubaneswar, Odisha"
        description="Explore our specialized digital solutions across Education, Photography, HealthTech, ERP Systems, Hotels & Bars, and Video Editing. Built in Bhubaneswar, serving globally."
      />
      <section className="section-padding pt-32 sm:pt-40">
        <div className="container mx-auto">
          <SectionHeading
            badge="Our Work"
            title="Projects We've Built"
            subtitle="Explore our finest digital platforms tailored for specialized professional verticals."
          />

          {/* Premium Filter Tabs with Icons */}
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = active === cat.name;
              const activeGradient = gradientMap[cat.name] || "from-primary to-accent";
              return (
                <button
                  key={cat.name}
                  onClick={() => setActive(cat.name)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${activeGradient} text-primary-foreground shadow-glow scale-105`
                      : "bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-[1.02]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-primary-foreground animate-pulse" : "text-primary/70"} />
                  {cat.name}
                </button>
              );
            })}
          </AnimatedSection>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.08} className="h-full">
                {p.path ? (
                  <div 
                    onClick={() => setSelectedProject(p)} 
                    className="group flex flex-col h-full bg-card/25 hover:bg-card/50 border border-border/40 hover:border-primary/30 rounded-2xl p-4 transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer"
                  >
                    <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${p.color} relative overflow-hidden mb-5 shadow-inner flex items-center justify-center`}>
                      {p.image && (
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-center justify-center z-10">
                        <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-center">
                          <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-glow">
                            View Case Study <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-[10px] text-primary font-extrabold uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full">{p.category}</span>
                        <h3 className="font-display font-bold text-lg mt-3 group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.desc}</p>
                      </div>
                      
                      {/* Mobile View Case Study Action Option */}
                      <div className="mt-4 pt-3 border-t border-border/10 flex md:hidden items-center justify-between text-xs text-primary font-bold">
                        <span>View Case Study</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setSelectedProject(p)} 
                    className="group flex flex-col h-full bg-card/10 hover:bg-card/25 border border-border/20 hover:border-primary/10 rounded-2xl p-4 opacity-75 hover:opacity-95 transition-all duration-500 cursor-pointer"
                  >
                    <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${p.color} relative overflow-hidden mb-5 shadow-inner flex items-center justify-center`}>
                      {p.image && (
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-70" 
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest bg-muted px-2.5 py-1 rounded-full">{p.category}</span>
                        <h3 className="font-display font-bold text-lg mt-3 leading-tight">{p.title} <span className="text-xs text-muted-foreground font-normal">(Demo Scope)</span></h3>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.desc}</p>
                      </div>
                      
                      {/* Mobile View Custom Consultation Option */}
                      <div className="mt-4 pt-3 border-t border-border/10 flex md:hidden items-center justify-between text-xs text-primary font-bold">
                        <span>Consult Custom Scope</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Confirmation Dialog Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="glass-card w-full max-w-md bg-card/95 border border-border/80 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 text-left space-y-6 overflow-hidden"
            >
              {/* Close Button Icon */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {selectedProject.path ? <BookOpen size={24} /> : <MessageSquare size={24} />}
                </div>
                <div>
                  <span className="inline-block text-[10px] text-primary font-extrabold uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-xl font-bold leading-tight">
                    {selectedProject.path ? "Explore Case Study?" : "Consult Tailored Scope?"}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    {selectedProject.path 
                      ? `Would you like to view the comprehensive case study and full-scale product breakdown for the ${selectedProject.title}?` 
                      : `The ${selectedProject.title} is a specialized custom design demo. Would you like to get a free consultation to build a tailored solution for your brand?`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selectedProject.path ? (
                  <Link
                    to={selectedProject.path}
                    onClick={() => setSelectedProject(null)}
                    className="glow-btn bg-primary text-primary-foreground flex-1 py-3 text-center text-xs font-bold shadow-glow hover:scale-[1.02] transition-all"
                  >
                    View Case Study
                  </Link>
                ) : (
                  <Link
                    to="/contact"
                    onClick={() => setSelectedProject(null)}
                    className="glow-btn bg-primary text-primary-foreground flex-1 py-3 text-center text-xs font-bold shadow-glow hover:scale-[1.02] transition-all"
                  >
                    Get Free Consultation
                  </Link>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="glow-btn bg-white border border-border text-foreground hover:bg-muted py-3 px-5 text-xs font-bold shadow-sm"
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
