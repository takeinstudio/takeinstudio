import { supabase } from '@/lib/supabase';
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Palette, Sparkles, Star, ArrowUpRight, Users, FolderKanban, TrendingUp, Award, LayoutDashboard, Zap, MapPin, Mail, Play, Video, CheckCircle2, Code2, Monitor, Layout, Rocket, Settings, Bot, ShieldCheck, Paintbrush, Cloud, Database, Layers } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { useEffect, useState, useRef } from "react";
import SEO from "@/components/SEO";
import AuditModal from "@/components/AuditModal";
import { useContent } from "@/context/ContentContext";
import Preloader from "@/components/Preloader";

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8000" : "/api";

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
function Hero() {
  const { getText } = useContent();
  const heroTitle = getText('home_hero_title', '');
  const heroSubtitle = getText('home_hero_subtitle', '');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[calc(100vh-80px)] pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white flex items-center border-b border-border/20">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left space-y-6 lg:pr-10"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-sm">
                <Rocket size={14} className="text-primary" /> Premium Digital Agency
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              {heroTitle ? (
                <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-gray-900">
                  {heroTitle}
                </h1>
              ) : (
                <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-gray-900">
                  Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">Digital Products</span> That Help Businesses Grow
                </h1>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium max-w-lg">
                {heroSubtitle || "Websites, mobile apps, AI automation, branding, and custom software designed to improve visibility, streamline operations, and create measurable business impact."}
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 pb-2">
              {["Business-Focused Solutions", "Modern Technology Stack", "Scalable Architecture", "Long-Term Support"].map((trust, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                  <CheckCircle2 size={14} className="text-primary" /> {trust}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto glow-btn bg-primary text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Your Project <ArrowRight size={16} />
              </Link>
              <Link
                to="/work"
                className="w-full sm:w-auto bg-white border border-gray-200 text-gray-900 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                View Portfolio
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium pt-2 flex items-center gap-2">
                <ShieldCheck size={14} className="text-green-500" /> Helping businesses build stronger digital experiences and smarter workflows.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side Visual */}
          <div className="relative w-full flex items-center justify-center sm:min-h-[400px] lg:min-h-[550px] mt-10 lg:mt-0">
            {/* Ambient Glow behind Logo - Desktop Only for Performance */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0 hidden sm:block"
            />
            
            {/* Static Ambient Glow for Mobile */}
            <div className="absolute w-[280px] h-[280px] bg-primary/10 rounded-full blur-[80px] pointer-events-none z-0 sm:hidden" />

            {/* Central Logo - Hidden on Mobile */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-48 sm:w-64 hidden sm:block"
            >
              <img src="/logo/logo_text.png" alt="TakeIN Studio" className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(255,107,0,0.2)] mix-blend-multiply" />
            </motion.div>

            {/* Floating Stat Cards - Mobile Grid View */}
            <div className="z-20 grid grid-cols-2 gap-3 w-full sm:hidden mt-8 px-2">
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-full hover:scale-105 transition-transform h-full">
                <h3 className="font-display text-2xl font-black text-gray-900 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">50+</h3>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">Projects Delivered</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-full hover:scale-105 transition-transform h-full">
                <h3 className="font-display text-2xl font-black text-gray-900 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">20+</h3>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">Industries Served</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-full hover:scale-105 transition-transform h-full">
                <Award size={28} className="text-gray-800" strokeWidth={2.5} />
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-2">Client-Focused Delivery</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-full hover:scale-105 transition-transform h-full">
                <Settings size={28} className="text-gray-800" strokeWidth={2.5} />
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-2">Ongoing Technical Support</p>
              </div>
            </div>

            {/* Floating Stat Cards - Desktop Absolute View */}
            <div className="hidden sm:block">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -left-2 sm:-left-4 top-10 sm:top-16 z-20">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-36 sm:w-40 hover:scale-105 transition-transform">
                  <h3 className="font-display text-3xl font-black text-gray-900 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">50+</h3>
                  <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Projects Delivered</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-2 sm:-right-4 top-0 sm:top-10 z-20">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-36 sm:w-40 hover:scale-105 transition-transform">
                  <h3 className="font-display text-3xl font-black text-gray-900 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">20+</h3>
                  <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Industries Served</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute -left-0 sm:-left-4 bottom-16 sm:bottom-24 z-20">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-36 sm:w-40 hover:scale-105 transition-transform">
                  <Award size={32} className="text-gray-800" strokeWidth={2.5} />
                  <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-2">Client-Focused Delivery</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="absolute -right-0 sm:-right-4 bottom-8 sm:bottom-16 z-20">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center w-36 sm:w-40 hover:scale-105 transition-transform">
                  <Settings size={32} className="text-gray-800" strokeWidth={2.5} />
                  <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-2">Ongoing Technical Support</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ─── Technology Showcase ─── */
function TechnologyShowcase() {
  const techStack = [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Globe },
    { name: "Node.js", icon: Monitor },
    { name: "TypeScript", icon: Code2 },
    { name: "Shopify", icon: Settings },
    { name: "Flutter", icon: Smartphone },
    { name: "Figma", icon: Paintbrush },
    { name: "Firebase", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "Google Cloud", icon: Cloud },
  ];

  return (
    <section className="pt-16 pb-8 bg-transparent text-center px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted Technologies</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-default group"
            >
              <tech.icon size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Active Launch Phase Highlight ─── */
const defaultRotatingProjects = [
  {
    title: "Education Platforms",
    category: "Education",
    desc: "Custom e-learning and management platforms designed to simplify education delivery and student tracking.",
    color: "from-blue-500/20 to-indigo-500/20",
    features: ["Virtual Classrooms", "Progress Dashboards", "Seamless Payments"]
  },
  {
    title: "Portfolio Websites",
    category: "Photographers",
    desc: "Premium portfolio showcases with integrated booking and scheduling for creative professionals.",
    color: "from-pink-500/20 to-rose-500/20",
    features: ["Interactive Galleries", "Client Proofing", "Automated Booking"]
  },
  {
    title: "Business Dashboards",
    category: "ERP Systems",
    desc: "Comprehensive business management systems offering real-time data analytics and task tracking.",
    color: "from-emerald-500/20 to-teal-500/20",
    features: ["Inventory Control", "Live Cost Analytics", "Task Management"]
  },
  {
    title: "Healthcare Portals",
    category: "HealthTech",
    desc: "Secure patient portals and telehealth dashboards tailored for modern healthcare providers.",
    color: "from-orange-500/20 to-amber-500/20",
    features: ["Patient Check-ins", "Secure Telehealth", "Billing Integration"]
  }
];

function PortfolioShowcaseSideBySide() {
  const { content } = useContent();
  let projects = defaultRotatingProjects;

  if (content && content['portfolio_items']) {
    try {
      const parsed = JSON.parse(content['portfolio_items']);
      if (Array.isArray(parsed) && parsed.length > 0) {
        projects = parsed.slice(0, 4); // Show only top 4 on homepage
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-8 mb-10">
      {/* Side-by-Side Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto px-4">
        {projects.map((project: any, i: number) => (
          <AnimatedSection key={project.title + i} delay={i * 0.1} className="h-full">
            <Link to={project.website_link || "/work"} className="group block h-full">
              <div className="glass-card h-full overflow-hidden p-4 border border-border/50 shadow-lg relative bg-card/30 backdrop-blur-md rounded-2xl hover:border-primary/20 hover:shadow-primary/5 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between">
                <div>
                  {/* High-Fidelity Visual Container */}
                  <div className={`aspect-[16/10] rounded-xl overflow-hidden relative mb-4 shadow-inner flex items-center justify-center bg-gradient-to-br ${project.color || 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-30 blur-md`} />
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                    
                    {/* Fallback Icon if no image */}
                    {!project.image && (
                      <div className="z-10 text-white/50 group-hover:text-white/80 transition-colors duration-300">
                        <Layers size={48} strokeWidth={1} />
                      </div>
                    )}
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
                    {Array.isArray(project.features) && project.features.slice(0, 2).map((feat: string) => (
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
  const { getText } = useContent();
  const aboutTitle = getText('home_about_title', '');
  const aboutText = getText('home_about_text', '');

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
          {aboutTitle ? (
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-foreground">{aboutTitle}</h2>
          ) : (
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Websites <span className="text-primary">Built for Growth</span>
            </h2>
          )}
          <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            {aboutText || "Modern websites designed to strengthen your online presence, generate leads, and support long-term business growth."}
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
        <SectionHeading badge="What We Do" title="Services Built for Impact" subtitle="From websites and mobile apps to AI automation and branding, we create digital solutions tailored to business growth." />
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
        
        <div className="mt-12 sm:mt-16 flex justify-center">
          <AnimatedSection delay={0.6}>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 bg-white border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary px-8 py-3.5 sm:py-4 rounded-full font-bold text-[12px] sm:text-[13px] tracking-widest shadow-sm hover:shadow-[0_8px_25px_-8px_rgba(255,107,0,0.8)] hover:-translate-y-1 transition-all duration-300">
              VIEW ALL SERVICES <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}



/* ─── Testimonials ─── */


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
          subtitle="Transparent pricing for businesses, startups, and organizations at every stage of growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* View Pricing Card */}
          <AnimatedSection delay={0.1}>
            <div className="clay-card p-6 sm:p-8 h-full flex flex-col items-center justify-between text-center space-y-6 group border border-border/40 hover:border-primary/30 shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden bg-card/25 backdrop-blur-md rounded-3xl">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-700" />
              <div className="space-y-4 flex flex-col items-center z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <FolderKanban size={24} />
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-extrabold uppercase tracking-wider mb-1">
                    Transparent Plans
                  </span>
                  <h3 className="font-display text-2xl font-bold">View Pricing</h3>
                  <p className="text-muted-foreground text-sm px-4 leading-relaxed">Explore our transparent pricing tiers for web development, app creation, and design services.</p>
                </div>
              </div>

              <div className="flex w-full z-10">
                <Link
                  to="/pricing"
                  className="w-full glow-btn bg-white border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary py-3 rounded-xl text-xs font-bold shadow-sm transition-all duration-300 text-center flex items-center justify-center"
                >
                  Explore Pricing
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Us Card */}
          <AnimatedSection delay={0.2}>
            <div className="clay-card p-6 sm:p-8 h-full flex flex-col items-center justify-between text-center space-y-6 group relative border border-primary/20 hover:border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden bg-card/40 backdrop-blur-md rounded-3xl">
              {/* Shine effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/15 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-700" />

              <div className="space-y-4 flex flex-col items-center z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <Sparkles size={24} />
                </div>
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[9px] font-extrabold uppercase tracking-wider mb-2 animate-pulse">
                    Let's Connect
                  </div>
                  <h3 className="font-display text-2xl font-bold">Contact Us</h3>
                  <p className="text-muted-foreground text-sm px-4 leading-relaxed">Get in touch to receive a custom estimate, project consultation, or website audit.</p>
                </div>
              </div>

              <div className="flex w-full z-10">
                <Link
                  to="/contact"
                  className="w-full glow-btn bg-primary text-primary-foreground py-3 rounded-xl text-xs font-bold shadow-glow hover:scale-[1.02] transition-all text-center flex items-center justify-center"
                >
                  Get in Touch
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
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (Array.isArray(res.data)) {
        setTestimonials(res.data.slice(0, 3));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (!loading && testimonials.length === 0) return null;

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
        
        <div className="mt-12 sm:mt-16 flex justify-center">
          <AnimatedSection delay={0.3}>
            <Link to="/testimonials" className="inline-flex items-center justify-center gap-2 bg-white border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary px-8 py-3.5 sm:py-4 rounded-full font-bold text-[12px] sm:text-[13px] tracking-widest shadow-sm hover:shadow-[0_8px_25px_-8px_rgba(255,107,0,0.8)] hover:-translate-y-1 transition-all duration-300">
              SEE MORE TESTIMONIALS <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </AnimatedSection>
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
  { label: "Projects Delivered", value: 50, suffix: "+", icon: FolderKanban, isCurrency: false },
  { label: "Industries Served", value: 20, suffix: "+", icon: TrendingUp, isCurrency: false },
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
  const [loading, setLoading] = useState(true);
  const { content } = useContent();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  let sections = [
    { id: "hero", visible: true },
    { id: "tech", visible: true },
    { id: "launch", visible: true },
    { id: "services", visible: true },
    { id: "pricing", visible: true },
    { id: "testimonials", visible: true },
    { id: "stats", visible: true }
  ];

  if (content && content['home_sections']) {
    try {
      const parsed = JSON.parse(content['home_sections']);
      if (Array.isArray(parsed) && parsed.length > 0) {
        sections = parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const componentMap: Record<string, React.FC> = {
    hero: Hero,
    tech: TechnologyShowcase,
    launch: ActiveLaunchSection,
    services: Services,
    pricing: Pricing,
    testimonials: Testimonials,
    stats: Stats
  };

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <SEO
        title="Premier Web & Mobile App Development Studio in Bhubaneswar, Odisha & Global"
        description="TakeIN Studio is a top digital agency in Bhubaneswar (BBSR), Odisha. We offer premium web development, mobile app development, and UI/UX design services locally and globally."
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
      
      {sections.filter((s: any) => s.visible).map((s: any) => {
        const Component = componentMap[s.id];
        return Component ? <Component key={s.id} /> : null;
      })}
    </>
  );
}
