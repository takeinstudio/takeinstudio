import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Palette, Zap, FolderKanban, ArrowRight, CheckCircle2, Laptop, ShieldCheck, HeartHandshake } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";

/* ─── Parallax Scrolling Components ─── */
function ParallaxOrb({
  className,
  yRange = [-60, 60],
  rotateRange = [0, 180],
}: {
  className?: string;
  yRange?: [number, number];
  rotateRange?: [number, number];
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], yRange);
  const r = useTransform(scrollY, [0, 1000], rotateRange);

  return (
    <motion.div
      style={{ y, rotate: r }}
      className={`absolute rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none opacity-20 sm:opacity-30 ${className}`}
    />
  );
}

function ParallaxShape({
  children,
  className,
  yRange = [-80, 80],
  rotateRange = [0, 90],
}: {
  children: React.ReactNode;
  className?: string;
  yRange?: [number, number];
  rotateRange?: [number, number];
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1500], yRange);
  const r = useTransform(scrollY, [0, 1500], rotateRange);

  return (
    <motion.div
      style={{ y, rotate: r }}
      className={`absolute pointer-events-none select-none z-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

const approach = [
  {
    title: "Strategy First",
    desc: "We align every project with your exact business objectives, user demographics, and long-term scaling pathways.",
    icon: Target,
    gradient: "from-primary to-orange-500"
  },
  {
    title: "Design Driven",
    desc: "Clean, immersive interfaces designed to capture instant engagement and structure seamless user actions.",
    icon: Palette,
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "Performance Engineered",
    desc: "Optimized pipelines delivering lightning-fast rendering speeds, strong core vitals, and search credibility.",
    icon: Zap,
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    title: "Scalable Systems",
    desc: "Flexible, decoupled architectures engineered to expand effortlessly alongside your growing operations.",
    icon: FolderKanban,
    gradient: "from-yellow-500 to-primary"
  },
];

const commitments = [
  {
    icon: Laptop,
    title: "Modern Technologies",
    desc: "We use fast, modern tools to build lightweight websites that load instantly."
  },
  {
    icon: ShieldCheck,
    title: "High-Quality Code",
    desc: "Every website is carefully tested to make sure it looks and works perfectly on phones, tablets, and computers."
  },
  {
    icon: HeartHandshake,
    title: "Affordable Prices",
    desc: "By working smart, we deliver top-quality designs without the expensive agency price tag."
  }
];

export default function AboutPage() {
  // Staggered entrance animations for Hero elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <SEO 
        title="About Us | Top Digital Agency in Bhubaneswar, Odisha & Globally" 
        description="Learn about TakeIN Studio — a leading digital agency in Bhubaneswar (BBSR), Odisha, providing modern websites, mobile apps, and scalable web software globally."
      />

      {/* Hero: Space-Optimized Split Layout */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-orange-50/10 to-white border-b border-border/30 pt-24 pb-10 flex items-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />
        
        {/* Scrolling Parallax Mesh Orbs with drift */}
        <ParallaxOrb 
          className="top-1/4 left-1/12 w-[300px] h-[300px] bg-gradient-to-tr from-primary/15 to-amber-500/5 animate-blob" 
          yRange={[-40, 40]} 
        />
        <ParallaxOrb 
          className="bottom-1/4 right-1/10 w-[350px] h-[350px] bg-gradient-to-tr from-purple-500/5 to-primary/15 animate-blob-delayed" 
          yRange={[-70, 70]} 
        />

        {/* Floating Parallax Vectors */}
        <ParallaxShape className="top-1/5 right-1/3" yRange={[-90, 70]}>
          <div className="grid grid-cols-4 gap-2 opacity-10">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
            ))}
          </div>
        </ParallaxShape>

        <ParallaxShape className="bottom-1/5 left-1/4" yRange={[-50, 80]}>
          <div className="w-16 h-16 rounded-full border border-primary/20 border-dashed animate-spin" style={{ animationDuration: '20s' }} />
        </ParallaxShape>

        <ParallaxShape className="top-1/3 left-1/10" yRange={[-80, 50]}>
          <span className="text-primary/20 font-display text-4xl font-light select-none">+</span>
        </ParallaxShape>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-5"
          >
            
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-primary text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                ⚡ About Our Studio
              </span>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground">
                The Studio Behind <br />
                <span className="bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  The Digital Magic
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
                We are a global digital studio focused on building high-performance websites, mobile applications, and custom software systems that drive real business growth.
              </p>
            </motion.div>

            {/* Bullet Pillars for high-prominent value highlight */}
            <motion.div variants={itemVariants} className="w-full flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-2 text-xs sm:text-sm font-bold text-foreground/80 justify-items-start">
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="group-hover:text-primary transition-colors">Performance Engineers</span>
                </div>
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="group-hover:text-primary transition-colors">Human-Centered UX</span>
                </div>
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="group-hover:text-primary transition-colors">Scalable Architectures</span>
                </div>
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="group-hover:text-primary transition-colors">Bespoke Code Quality</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex justify-center">
              <div className="flex items-center justify-center gap-4 pt-2">
                <Link 
                  to="/contact" 
                  className="bg-gradient-to-r from-orange-500 to-primary text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 rounded-full hover:scale-105"
                >
                  Start Your Project
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy: Compact Split Section */}
      <section className="relative py-12 bg-white overflow-hidden">
        {/* Parallax elements */}
        <ParallaxOrb 
          className="top-1/3 left-1/3 w-[250px] h-[250px] bg-gradient-to-tr from-primary/8 to-amber-500/3 animate-blob" 
          yRange={[-30, 30]} 
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl relative z-10">
          
          <AnimatedSection className="lg:col-span-7 text-left space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
              Our Vision
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Engineering Digital Products <br />
              <span className="text-primary">Built for Clear Results</span>
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
              <p>
                At TakeIN Studio, we balance design aesthetics with code efficiency. Every product we build starts with a detailed strategic assessment of your business goals, user paths, and loading requirements.
              </p>
              <p>
                We collaborate as a remote digital network to avoid traditional agency overhead costs. This developer-centric structure allows us to offer premium design and custom frameworks at highly competitive rates.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1} className="lg:col-span-5 w-full">
            <motion.div 
              whileHover={{ scale: 1.02, y: -4, boxShadow: "0 20px 40px -15px rgba(255,107,0,0.1)" }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="relative p-7 rounded-3xl bg-white border border-primary/20 shadow-lg overflow-hidden group cursor-default"
            >
              {/* Shine glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
              
              <blockquote className="text-base sm:text-lg font-display font-bold italic text-foreground leading-relaxed relative z-10">
                "TakeIN Studio operates as a dedicated growth partner. We replace generic website structures with responsive, search-optimized platforms engineered to scale."
              </blockquote>
              <div className="mt-5 flex items-center gap-3 relative z-10">
                <div className="w-8 h-[1.5px] bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Our Philosophy</span>
              </div>
            </motion.div>
          </AnimatedSection>

        </div>
      </section>

      {/* Our Approach: Compact Pipeline */}
      <section className="relative py-12 bg-orange-50/15 border-y border-border/30 overflow-hidden">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none z-0" />
        
        {/* Parallax glows */}
        <ParallaxOrb 
          className="bottom-1/4 right-1/10 w-[300px] h-[300px] bg-gradient-to-tr from-primary/8 to-amber-500/3 animate-blob-delayed" 
          yRange={[-50, 50]} 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionHeading
            badge="Our Approach"
            title="Strategic Excellence"
            subtitle="We follow a structured process to deliver high-quality, scalable digital solutions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {approach.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08} className="h-full">
                <motion.div 
                  whileHover={{ y: -6, boxShadow: "0 20px 30px -10px rgba(255,107,0,0.05)" }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="relative group p-6 bg-white border border-border/60 hover:border-primary/40 rounded-2xl shadow-sm transition-all duration-300 overflow-hidden flex flex-col justify-between h-full min-h-[200px] cursor-default"
                >
                  {/* Glowing background orb on hover */}
                  <div className={`absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-tr ${item.gradient} opacity-0 blur-2xl group-hover:opacity-10 group-hover:scale-150 transition-all duration-700 rounded-full pointer-events-none`} />
                  
                  {/* Step Number */}
                  <div className="absolute top-5 right-5 text-4xl font-display font-black text-primary/10 group-hover:text-primary/20 transition-all pointer-events-none">
                    {`0${i + 1}`}
                  </div>

                  <div>
                    {/* Icon Container */}
                    <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-4 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden shadow-inner">
                      <item.icon size={16} className="text-primary group-hover:text-white transition-colors relative z-10" />
                    </div>

                    <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Bottom expanding border line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment: Streamlined Core Pillars */}
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none z-0" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider mb-3 animate-pulse">
              Our Commitment
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-foreground">
              Modern Design, <br className="sm:hidden" />
              <span className="text-primary">Optimized Cost</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              We leverage clean custom architectures and advanced developer workflows to deliver outstanding digital platforms at transparent, minimal costs.
            </p>
          </AnimatedSection>

          {/* Commitments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 text-left">
            {commitments.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <motion.div 
                  whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 35px -10px rgba(0,0,0,0.05)" }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="p-6 rounded-2xl bg-white border border-border/50 shadow-sm hover:border-primary/30 transition-all duration-300 group cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform mb-4">
                    <item.icon size={16} />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="mt-8" delay={0.15}>
            <Link 
              to="/services" 
              className="bg-gradient-to-r from-orange-500 to-primary text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-300 rounded-full inline-flex items-center gap-2"
            >
              Explore Our Services <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
