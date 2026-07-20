import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, GraduationCap, Camera, HeartPulse, HardDrive, Hotel, Film, Layers, X, BookOpen, MessageSquare, Briefcase, Sparkles, Server, CheckCircle2, Search, Code, Rocket, PenTool, ShoppingCart, User, LayoutTemplate, Share2, FolderOpen, Heart, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { useContent } from "@/context/ContentContext";

const categories = [
  { name: "All", icon: Layers },
  { name: "Informational", icon: BookOpen },
  { name: "Transactional", icon: ShoppingCart },
  { name: "Interactive", icon: Users },
  { name: "Apps & Software", icon: Code },
  { name: "AI Solutions", icon: Sparkles }
];

const gradientMap: Record<string, string> = {
  All: "from-primary to-accent",
  "Informational": "from-blue-500 to-indigo-500",
  "Transactional": "from-orange-500 to-amber-500",
  "Interactive": "from-emerald-500 to-teal-500",
  "Apps & Software": "from-sky-500 to-blue-500",
  "AI Solutions": "from-fuchsia-500 to-pink-500"
};

const websiteTypes = [
  { name: "E-Commerce", icon: ShoppingCart, desc: "Online stores and digital marketplaces designed for high conversions." },
  { name: "Business", icon: Briefcase, desc: "Corporate identity and B2B platforms for professional services." },
  { name: "Personal", icon: User, desc: "Individual profiles, digital resumes, and personal branding." },
  { name: "Portfolio", icon: LayoutTemplate, desc: "Showcases for creative professionals to display their best work." },
  { name: "Blog", icon: BookOpen, desc: "Content-driven publishing platforms optimized for readership." },
  { name: "Social Media", icon: Share2, desc: "Community platforms fostering engagement and networking." },
  { name: "Directory", icon: FolderOpen, desc: "Categorized listings and robust search-driven portals." },
  { name: "Entertainment", icon: Film, desc: "Streaming platforms and interactive media consumption sites." },
  { name: "Educational", icon: GraduationCap, desc: "E-learning platforms and comprehensive course management." },
  { name: "Non-Profit", icon: Heart, desc: "Charity portals built for awareness and seamless donations." },
  { name: "Wiki / Forum", icon: MessageSquare, desc: "Collaborative knowledge bases and discussion boards." },
  { name: "Membership", icon: Users, desc: "Exclusive community-driven sites with gated premium content." },
];

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
  const isWebsitesCategory = new URLSearchParams(location.search).get("category") === "websites";

  const projects = [
    // INFORMATIONAL
    { id: "p1", title: "Business Websites", category: "Informational", desc: "Professional corporate identities and B2B platforms designed to establish credibility and support long-term growth.", color: "from-blue-500/20 to-indigo-500/20", features: ["Corporate identity", "Lead generation", "Service showcase"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p2", title: "Blog & News/Magazine", category: "Informational", desc: "Content-driven publishing platforms optimized for high readership, SEO, and seamless content distribution.", color: "from-indigo-500/20 to-purple-500/20", features: ["Content management", "SEO optimized", "High readership"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p3", title: "Portfolio & Personal", category: "Informational", desc: "Digital resumes and creative showcases for professionals and individuals building their personal brand.", color: "from-pink-500/20 to-rose-500/20", features: ["Creative showcase", "Personal branding", "Media kit"], image: "/placeholder.png", section: "Solution Showcase" },
    
    // TRANSACTIONAL / E-COMMERCE
    { id: "p4", title: "E-commerce Platforms", category: "Transactional", desc: "Scalable online stores and digital marketplaces engineered for high conversions and streamlined product management.", color: "from-orange-500/20 to-amber-500/20", features: ["Secure checkout", "Inventory management", "Sales analytics"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p5", title: "Booking & Reservation", category: "Transactional", desc: "Automated booking systems for travel, clinics, events, and real estate scheduling.", color: "from-emerald-500/20 to-teal-500/20", features: ["Calendar sync", "Automated reminders", "Payment integration"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p6", title: "Membership & Crowdfunding", category: "Transactional", desc: "Gated premium content portals and crowdfunding platforms for exclusive communities.", color: "from-fuchsia-500/20 to-pink-500/20", features: ["Subscription models", "User dashboards", "Payment gateways"], image: "/placeholder.png", section: "Solution Showcase" },
    
    // INTERACTIVE
    { id: "p7", title: "Educational & E-Learning", category: "Interactive", desc: "Comprehensive learning ecosystems, course management systems, and student portals.", color: "from-blue-500/20 to-cyan-500/20", features: ["Course management", "Progress tracking", "Student portals"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p8", title: "Social Networking & Forums", category: "Interactive", desc: "Community platforms, discussion boards, and wikis fostering user engagement and networking.", color: "from-violet-500/20 to-purple-500/20", features: ["User profiles", "Real-time chat", "Content moderation"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p9", title: "Directory & Job Boards", category: "Interactive", desc: "Categorized listings, robust search-driven portals, and specialized job networks.", color: "from-slate-500/20 to-gray-500/20", features: ["Advanced search", "Listing management", "User reviews"], image: "/placeholder.png", section: "Solution Showcase" },

    // APPS & AI BOTS
    { id: "p10", title: "Mobile & Web Applications", category: "Apps & Software", desc: "High-performance iOS, Android, and Progressive Web Apps (PWAs) tailored for specific business logic.", color: "from-sky-500/20 to-blue-500/20", features: ["Cross-platform", "Offline capabilities", "Push notifications"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p11", title: "AI Assistants & Bots", category: "AI Solutions", desc: "Intelligent conversational agents and automation workflows to streamline customer support and operations.", color: "from-rose-500/20 to-orange-500/20", features: ["Natural Language Processing", "Workflow automation", "CRM Integration"], image: "/placeholder.png", section: "Solution Showcase" },
    { id: "p12", title: "Specialized Platforms", category: "Apps & Software", desc: "Custom systems for Real Estate, Non-profit/Charity, Entertainment, and Government services.", color: "from-emerald-500/20 to-cyan-500/20", features: ["Custom workflows", "High security", "Scalable architecture"], image: "/placeholder.png", section: "Solution Showcase" }
  ];

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

          {isWebsitesCategory && (
            <section className="py-16 bg-background relative overflow-hidden mt-12 rounded-3xl border border-border/50">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10" />
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <AnimatedSection>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase mb-4">
                      Web Architecture
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                      The 12 Main Types of Websites
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      Defined by their primary purpose and core functionality, we specialize in building these essential web platforms engineered for maximum impact and fully responsive across all devices.
                    </p>
                  </AnimatedSection>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {websiteTypes.map((type, idx) => {
                    const Icon = type.icon;
                    return (
                      <AnimatedSection key={idx} delay={idx * 0.05}>
                        <div className="group relative p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                            <Icon className="w-16 h-16 text-primary" />
                          </div>
                          
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm relative z-10">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          
                          <h3 className="font-display font-bold text-base sm:text-lg mb-2 relative z-10">{type.name}</h3>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed relative z-10 flex-grow">
                            {type.desc}
                          </p>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </div>
            </section>
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
