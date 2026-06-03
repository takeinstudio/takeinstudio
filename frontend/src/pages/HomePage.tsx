import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Palette, Sparkles, Star, ArrowUpRight, Users, FolderKanban, TrendingUp, Award, LayoutDashboard, Zap, MapPin, Mail, Play, Video } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { useEffect, useState, useRef } from "react";
import SEO from "@/components/SEO";
import AuditModal from "@/components/AuditModal";

/* ─── Parallax Scrolling Components ─── */
function ParallaxOrb({
  className,
  yRange = [-80, 80],
  rotateRange = [0, 180],
}: {
  className?: string;
  yRange?: [number, number];
  rotateRange?: [number, number];
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1200], yRange);
  const r = useTransform(scrollY, [0, 1200], rotateRange);

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
  yRange = [-120, 120],
  rotateRange = [0, 120],
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

/* ─── Hero ─── */
const heroServices = [
  { icon: Globe, title: "Web Development", tagline: "Modern & Responsive" },
  { icon: Smartphone, title: "App Development", tagline: "Fast & Intuitive" },
  { icon: LayoutDashboard, title: "Custom Software", tagline: "Tailored Solutions" },
  { icon: Play, title: "Video Editing", tagline: "Creative & Engaging" },
  { icon: TrendingUp, title: "SEO Solutions", tagline: "Rank & Grow" },
  { icon: Palette, title: "Branding", tagline: "Identity & Design" },
];

function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for mouse controls
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });

  // Map mouse movement to tilt rotation (between -12 and 12 degrees)
  const rotateX = useTransform(mouseYSpring, [-200, 200], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-200, 200], [-12, 12]);

  // Map mouse movement to opposite slight translate for parallax layers
  const translateX = useTransform(mouseXSpring, [-200, 200], [-6, 6]);
  const translateY = useTransform(mouseYSpring, [-200, 200], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Entrance animations for the left column items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-orange-50/20 to-white border-b border-border/30 pt-28 pb-8 flex flex-col justify-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

      {/* Ambient glowing mesh blur blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-orange-100/30 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-primary/[0.04] rounded-full blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Bottom-right corner orange wave */}
      <div className="absolute bottom-0 right-0 w-[55%] h-[45%] pointer-events-none z-0 overflow-hidden opacity-90">
        <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
          <path d="M0 400 C150 200, 350 250, 600 100 L600 400 Z" fill="url(#heroWave)" />
          <defs>
            <linearGradient id="heroWave" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Shapes gently drifting */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 left-6 sm:left-10 pointer-events-none select-none z-0"
      >
        <span className="text-primary/25 font-display text-3xl sm:text-4xl font-light">+</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[52%] left-4 sm:left-8 pointer-events-none select-none z-0"
      >
        <span className="font-mono text-primary/20 text-2xl sm:text-3xl font-extrabold">&lt;/&gt;</span>
      </motion.div>

      {/* Dot grid — upper right area */}
      <div className="absolute top-32 right-[42%] grid grid-cols-4 gap-2 opacity-15 pointer-events-none z-0 hidden lg:grid">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
        ))}
      </div>

      {/* Dot grid — bottom right */}
      <div className="absolute bottom-24 right-8 grid grid-cols-3 gap-2 opacity-10 pointer-events-none z-0 hidden lg:grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
        ))}
      </div>

      {/* ─── Main Content Grid ─── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center w-full">

          {/* ── Left Column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-start text-left space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50/70 border border-orange-100/50 text-primary text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                PREMIUM DIGITAL STUDIO
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-black leading-[1.08] tracking-tight text-foreground">
                The Future of<br />
                Your Brand<br />
                <span className="text-primary bg-gradient-to-r from-orange-500 to-primary bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-20 h-1 bg-gradient-to-r from-orange-500 to-primary rounded-full"
            />

            <motion.div variants={itemVariants}>
              <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed font-medium max-w-md">
                We craft custom digital experiences that reflect your brand's identity, amplify your message, and create lasting impressions in a crowded online world.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-orange-500 to-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-7 py-3.5 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 rounded-full flex items-center gap-2"
                >
                  START YOUR PROJECT <ArrowRight size={14} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/work"
                  className="bg-white border border-gray-200 text-foreground hover:bg-muted text-[10px] sm:text-xs font-black uppercase tracking-widest px-7 py-3.5 transition-all duration-300 rounded-full flex items-center gap-2 shadow-sm"
                >
                  EXPLORE OUR WORK <span className="text-muted-foreground font-light ml-1">—</span> <ArrowRight size={14} className="text-muted-foreground" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right Column — Logo ── */}
          <div className="lg:col-span-6 flex items-center justify-center relative mt-10 lg:mt-0">
            {/* Soft rotating glowing aura behind logo */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] bg-primary/8 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none z-0"
            />

            {/* 3D Logo + Brand Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="flex flex-col items-center justify-center relative select-none w-full max-w-lg"
            >
              {/* Interactive 3D Monogram container */}
              <div
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] flex items-center justify-center cursor-pointer relative"
                style={{ perspective: 1000 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Monogram wrapper */}
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    translateX,
                    translateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  {/* Subtle 3D dynamic drop shadow */}
                  <motion.div
                    style={{
                      x: useTransform(x, [-200, 200], [10, -10]),
                      y: useTransform(y, [-200, 200], [10, -10]),
                    }}
                    className="absolute inset-4 rounded-full bg-primary/10 blur-xl pointer-events-none"
                  />

                  <img
                    src="/logo/logo_no_text.png"
                    alt="TakeIN Studio Logo"
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_25px_60px_rgba(255,107,0,0.22)] mix-blend-multiply rounded-3xl"
                    style={{ transform: "translateZ(30px)" }}
                  />
                </motion.div>
              </div>

              {/* Text Lockup under Logo */}
              <div className="mt-6 flex flex-col items-center text-center">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground flex items-center justify-center drop-shadow-sm select-none">
                  <span>Take</span>
                  <span className="text-primary">IN</span>
                  <span className="font-medium text-foreground/80 ml-2">Studio</span>
                </h2>
                <div className="flex items-center gap-1.5 mt-4 w-44 sm:w-52">
                  <div className="h-[2.5px] bg-primary flex-1 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── Inline Service Indicators (inside hero) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 sm:mt-18 mb-4 border-t border-border/20 pt-6"
        >
          <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-start md:divide-x divide-border/60 max-w-5xl gap-y-4 md:gap-y-0">
            {heroServices.map((s, index) => (
              <div
                key={s.title}
                className={`flex flex-row items-center gap-3.5 group ${index === 0
                  ? "pr-6 md:pr-8"
                  : index === heroServices.length - 1
                    ? "pl-6 md:pl-8"
                    : "px-6 md:px-8"
                  }`}
              >
                <div className="text-primary shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
                  <s.icon size={24} strokeWidth={1.8} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="font-display font-bold text-xs sm:text-sm text-foreground leading-tight truncate">
                    {s.title}
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs font-semibold leading-tight truncate mt-1">
                    {s.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Active Launch Phase Highlight ─── */
const rotatingProjects = [
  {
    title: "Aura Learn Platform",
    category: "Education",
    desc: "A custom online learning management ecosystem engineered for global universities and student resources.",
    color: "from-primary/30 to-accent/20",
    features: ["Virtual Classrooms", "Progress Dashboards", "Seamless Payments"],
    image: "/aura_learn.png"
  },
  {
    title: "Prism Studio Hub",
    category: "Photographers",
    desc: "A premium portfolio showcase, automated scheduling, and instant booking platform for digital creators.",
    color: "from-accent/30 to-primary/20",
    features: ["Interactive Galleries", "Client Proofing", "Automated Booking"],
    image: "/prism_studio.png"
  },
  {
    title: "Vertex Build ERP",
    category: "ERP Systems",
    desc: "A complete logistics, supply chain, and metrics hub with real-time site analytics and inventory checks.",
    color: "from-blue-600/20 to-purple-600/20",
    features: ["Inventory Control", "Live Cost Analytics", "Task Management"],
    image: "/vertex_erp.png"
  },
  {
    title: "Nexa Health Portal",
    category: "HealthTech",
    desc: "An AI-powered scheduler, patient portal, and secure charting dashboard for modern clinics.",
    color: "from-emerald-600/20 to-teal-600/20",
    features: ["Patient Check-ins", "Secure Telehealth", "Billing Integration"],
    image: "/portfolio_project.png"
  }
];

function PortfolioShowcaseSideBySide() {
  return (
    <div className="space-y-8 mb-10">
      {/* Side-by-Side Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto px-4">
        {rotatingProjects.map((project, i) => (
          <AnimatedSection key={project.title} delay={i * 0.1} className="h-full">
            <Link to="/work" className="group block h-full">
              <div className="glass-card h-full overflow-hidden p-4 border border-border/50 shadow-lg relative bg-card/30 backdrop-blur-md rounded-2xl hover:border-primary/20 hover:shadow-primary/5 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between">
                <div>
                  {/* High-Fidelity Visual Container */}
                  <div className="aspect-[16/10] rounded-xl overflow-hidden relative mb-3 shadow-inner">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-20 blur-md`} />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Content Block */}
                  <div className="space-y-2 text-left">
                    <span className="inline-block text-[9px] text-primary font-extrabold uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
                      {project.category}
                    </span>
                    <h3 className="font-display font-bold text-base group-hover:text-primary transition-colors flex items-center gap-1">
                      {project.title} <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Deliverables tags at the bottom */}
                <div className="mt-3 pt-2 border-t border-border/10">
                  <div className="flex flex-wrap gap-1">
                    {project.features.slice(0, 2).map((feat) => (
                      <span key={feat} className="text-[9px] bg-foreground/5 dark:bg-white/5 border border-border/30 px-2 py-1 rounded-lg font-medium text-muted-foreground">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {/* Button link to explore all case studies */}
      <AnimatedSection className="text-center" delay={0.35}>
        <Link
          to="/work"
          className="glow-btn bg-primary text-primary-foreground shadow-glow inline-flex items-center gap-2 px-8 py-3.5 text-xs font-black uppercase tracking-widest group hover:scale-105 transition-all duration-300 rounded-full"
        >
          Explore Our Full Portfolio Showcase <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform text-primary-foreground" />
        </Link>
      </AnimatedSection>
    </div>
  );
}

function ActiveLaunchSection() {
  return (
    <section className="relative py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-cream-dark/10 border-b border-border/20 overflow-hidden">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none z-0" />

      {/* Parallax elements */}
      <ParallaxOrb
        className="top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-amber-500/10 to-primary/10 animate-blob"
        yRange={[-50, 50]}
      />
      <ParallaxShape className="top-1/4 left-1/12" yRange={[-80, 80]}>
        <span className="font-mono text-primary/15 text-5xl font-light">{"{ }"}</span>
      </ParallaxShape>
      <ParallaxShape className="bottom-1/4 right-1/12" yRange={[-100, 60]}>
        <div className="w-16 h-16 rounded-full border border-primary/20 border-dashed" />
      </ParallaxShape>

      <div className="container mx-auto relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Booking Open for 2026
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            Launch Your Next Website <span className="text-primary">Without the Premium Price Tag</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            We are actively starting new web projects with a proven record of outstanding client feedback. From high-speed web hosting to search engine optimization, we deliver modern, production-grade websites at minimal costs.
          </p>
        </AnimatedSection>

        {/* Dynamic Side-by-Side Portfolios */}
        <PortfolioShowcaseSideBySide />
      </div>
    </section>
  );
}

/* ─── Services ─── */
const services = [
  {
    icon: Globe,
    title: "Web Development",
    path: "/services",
    desc: "High-performance, SEO-optimized digital experiences engineered for conversion and scale.",
    gradient: "from-primary to-accent",
    glowColor: "group-hover:shadow-primary/10 group-hover:border-primary/30"
  },
  {
    icon: Smartphone,
    title: "App Development",
    path: "/services",
    desc: "Silky-smooth Android and iOS applications with robust architecture and modern UX.",
    gradient: "from-accent to-sky-500",
    glowColor: "group-hover:shadow-accent/10 group-hover:border-accent/30"
  },
  {
    icon: LayoutDashboard,
    title: "Custom Software",
    path: "/services",
    desc: "Specialized ERP systems, booking platforms, and internal tools tailored to your business.",
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/30"
  },
  {
    icon: Video,
    title: "Video Editing",
    path: "/services",
    desc: "Cinematic, engaging video editing and dynamic motion graphics to capture attention.",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "group-hover:shadow-purple-500/10 group-hover:border-purple-500/30"
  },
];

function Services() {
  return (
    <section className="relative py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden" id="services">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Parallax background glows & shapes */}
      <ParallaxOrb
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-primary/10 to-purple-500/5 animate-blob-delayed"
        yRange={[-80, 80]}
      />
      <ParallaxShape className="top-1/6 right-1/10" yRange={[-120, 100]}>
        <div className="grid grid-cols-3 gap-2 opacity-15">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
          ))}
        </div>
      </ParallaxShape>
      <ParallaxShape className="bottom-1/6 left-1/8" yRange={[-100, 120]}>
        <span className="text-primary/25 font-display text-4xl font-light">+</span>
      </ParallaxShape>

      <div className="container mx-auto relative z-10">
        <SectionHeading badge="What We Do" title="Services Built for Impact" subtitle="We design and build premium, modernized websites at minimal costs with exceptionally fast turnaround times." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.35}>
              <Link
                to={s.path}
                className={`relative glass-card p-5 h-full group hover:-translate-y-2 hover:shadow-xl transition-all duration-500 block overflow-hidden bg-card/30 backdrop-blur-md border border-border/40 ${s.glowColor} rounded-2xl`}
              >
                {/* Expanding Top Border Line */}
                <div className={`absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r ${s.gradient} group-hover:w-full transition-all duration-500`} />

                {/* Backdrop ambient blur glow orb */}
                <div className={`absolute -right-8 -bottom-8 w-20 h-20 bg-gradient-to-tr ${s.gradient} opacity-0 blur-2xl group-hover:opacity-10 group-hover:scale-150 transition-all duration-700 rounded-full`} />

                {/* Animated Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <s.icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors relative z-10" />
                </div>

                {/* Header with reveal arrow */}
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {s.title}
                  <ArrowUpRight size={16} className="opacity-0 -translate-x-1.5 translate-y-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-primary" />
                </h3>

                {/* Body Text */}
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/90 transition-colors">{s.desc}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ─── Testimonials ─── */
const testimonials = [
  { name: "Sarah Mitchell", role: "CEO, Elevate Co.", text: "TakeIN Studio transformed our entire digital presence. The attention to detail is unmatched — our conversion rate jumped 340% in three months.", rating: 5 },
  { name: "James Rodriguez", role: "Founder, NovaTech", text: "Working with TakeIN felt like having an in-house team. They delivered our mobile app ahead of schedule and it's genuinely beautiful.", rating: 5 },
  { name: "Amara Osei", role: "CMO, PureForm", text: "The branding they created for us is exactly what we needed — modern, bold, and totally aligned with our vision. Couldn't be happier.", rating: 5 },
];

/* ─── Pricing ─── */
function Pricing() {
  return (
    <section className="relative py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-cream-dark/20 overflow-hidden" id="pricing">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none z-0" />

      {/* Parallax glows & shapes */}
      <ParallaxOrb
        className="top-1/4 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-primary/10 to-amber-500/10 animate-blob"
        yRange={[-60, 60]}
      />
      <ParallaxOrb
        className="bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-sky-500/10 to-primary/15 animate-blob-delayed"
        yRange={[-80, 80]}
      />
      <ParallaxShape className="top-1/3 right-1/8" yRange={[-100, 100]}>
        <span className="font-mono text-primary/15 text-4xl font-bold">&lt;/&gt;</span>
      </ParallaxShape>

      <div className="container mx-auto relative z-10">
        <SectionHeading
          badge="Pricing & Plans"
          title="Flexible Support for Ambitious Goals"
          subtitle="Premium, modernized websites engineered at minimal cost and delivered in exceptionally short timeframes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Custom Projects */}
          <AnimatedSection delay={0.1}>
            <div className="clay-card p-6 sm:p-8 h-full flex flex-col items-center justify-between text-center space-y-6 group border border-border/40 hover:border-accent/30 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden bg-card/25 backdrop-blur-md rounded-3xl">
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                  <FolderKanban size={24} />
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-[9px] font-extrabold uppercase tracking-wider mb-1">
                    Tailored Scope
                  </span>
                  <h3 className="font-display text-2xl font-bold">Custom Projects</h3>
                  <p className="text-muted-foreground text-sm px-4 leading-relaxed">Flexible digital solutions modeled precisely around your specific business goals, bespoke features, and unique product requirements.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                <Link
                  to="/pricing?service=web-development"
                  className="flex-1 glow-btn bg-white border border-border text-foreground hover:bg-muted py-2.5 text-xs font-bold shadow-sm transition-all duration-300 text-center flex items-center justify-center"
                >
                  View Pricing
                </Link>
                <Link
                  to="/contact?plan=custom"
                  className="flex-1 glow-btn bg-primary text-primary-foreground py-2.5 text-xs font-bold shadow-glow hover:scale-[1.02] transition-all text-center flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Premium Projects */}
          <AnimatedSection delay={0.2}>
            <div className="clay-card p-6 sm:p-8 h-full flex flex-col items-center justify-between text-center space-y-6 group relative border border-primary/20 hover:border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden bg-card/40 backdrop-blur-md rounded-3xl">
              {/* Shine effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-700" />

              <div className="space-y-4 flex flex-col items-center z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Sparkles size={24} />
                </div>
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[9px] font-extrabold uppercase tracking-wider mb-2 animate-pulse">
                    Full-Scale Delivery
                  </div>
                  <h3 className="font-display text-2xl font-bold">Premium Projects</h3>
                  <p className="text-muted-foreground text-sm px-4 leading-relaxed">Complete digital transformations built for fast performance, custom integrations, advanced SEO, and global scalability.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full z-10">
                <Link
                  to="/pricing?service=web-development"
                  className="flex-1 glow-btn bg-white border border-border text-foreground hover:bg-muted py-2.5 text-xs font-bold shadow-sm transition-all duration-300 text-center flex items-center justify-center"
                >
                  View Pricing
                </Link>
                <Link
                  to="/contact?plan=premium"
                  className="flex-1 glow-btn bg-primary text-primary-foreground py-2.5 text-xs font-bold shadow-glow hover:scale-[1.02] transition-all text-center flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground text-xs font-medium italic">
            “Every project is unique — let's discuss your requirements and build the right solution for you.”
          </p>
          <div className="pt-2">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline uppercase tracking-wider"
            >
              Explore Our Full Offerings & Services <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Dot Pattern & Glow */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none z-0" />

      <ParallaxOrb
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-primary/10 to-amber-500/5 animate-blob"
        yRange={[-50, 50]}
      />
      <ParallaxShape className="top-1/4 left-1/6" yRange={[-100, 100]}>
        <span className="text-primary/20 text-6xl font-serif">“</span>
      </ParallaxShape>
      <ParallaxShape className="bottom-1/4 right-1/6" yRange={[-80, 120]}>
        <span className="text-primary/20 text-6xl font-serif">”</span>
      </ParallaxShape>

      <div className="container mx-auto relative z-10">
        <SectionHeading badge="Testimonials" title="What Our Clients Say" subtitle="Real feedback from real partners who trusted us with their vision." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="glass-card p-6 h-full space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="pt-2 border-t border-border/40">
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Happy Clients", value: 10, suffix: "+", icon: Users, isCurrency: false },
  { label: "Projects Delivered", value: 75, suffix: "+", icon: FolderKanban, isCurrency: false },
  { label: "Revenue Generated", value: 100000, suffix: "+", icon: TrendingUp, isCurrency: true },
];

function Stats() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-12 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} className="text-center space-y-3">
              <s.icon size={28} className="mx-auto text-primary" />
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
                {s.isCurrency ? (
                  formatPrice(s.value).replace(".00", "") + "+"
                ) : (
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="text-background/50 text-sm font-medium">{s.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="Premier Web & Mobile App Development Studio"
        description="TakeIN Studio is a premier digital agency. We provide high-end web development, mobile app development, and UI/UX design services globally."
        faqSchema={[
          {
            question: "Who is the best web development agency for premium projects?",
            answer: "TakeIN Studio is widely recognized as a top-tier digital agency specializing in premium design and high-performance code for global clients."
          },
          {
            question: "Do you offer free website audits?",
            answer: "Yes, we provide free comprehensive website audits covering SEO, performance, and UI/UX improvements."
          }
        ]}
      />
      <Hero />
      <ActiveLaunchSection />
      <Services />
      <Pricing />
      <Testimonials />
      <Stats />
    </>
  );
}
