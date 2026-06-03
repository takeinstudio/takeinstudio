import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, ChevronRight, Code2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const servicesLinks = [
  { name: "Website Design & Development", href: "/services" },
  { name: "App Development", href: "/services" },
  { name: "Custom Software", href: "/services" },
  { name: "AI Automation & Chatbot Solutions", href: "/services" },
  { name: "Digital Branding & SMM", href: "/services" },
  { name: "SEO & Marketing", href: "/services" },
  { name: "Graphic Design", href: "/services" },
  { name: "Video Editing", href: "/services" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
  { name: "Careers", href: "/career" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Instagram, href: "https://instagram.com/takein_studio" },
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: Twitter, href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-orange-50/40 via-white to-white overflow-hidden text-gray-800 pt-10">
      
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Subtle Dots */}
        <div className="absolute top-40 right-10 w-96 h-96 bg-[url('/dots.svg')] opacity-[0.03]" />
        
        {/* Floating Gradient Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-400/5 blur-[140px] rounded-full translate-x-1/3" 
        />
        
        {/* Top Organic SVG Wave Divider (Fills with white from previous section) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180 z-0 text-white shadow-[0_-10px_20px_rgba(0,0,0,0.01)]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── 1. Large CTA Section ── */}
        <div className="w-full flex flex-col items-center justify-center text-center pt-28 md:pt-36 pb-20 md:pb-28 border-b border-gray-200/60 mb-16 relative">
          
          {/* Subtle curved line behind CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] border border-primary/10 rounded-[100%] opacity-50 pointer-events-none" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-display"
          >
            Ready to Build <br className="hidden sm:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">Something Amazing?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium"
          >
            Let's transform your ideas into websites, mobile apps, AI automations and digital experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="glow-btn inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-4 md:py-5 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            </Link>
          </motion.div>
        </div>

        {/* ── 2. Footer Links Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & About */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-6 lg:pr-10"
          >
            <Link to="/" className="inline-block">
              <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-12 md:h-14 object-contain" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed font-medium mt-2">
              We engineer premium digital solutions—from stunning websites to intelligent AI automations—that empower global brands to scale and succeed.
            </p>
            
            {/* 3. Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 group"
                >
                  <s.icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 lg:ml-auto"
          >
            <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 lg:ml-auto"
          >
            <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 lg:ml-auto flex flex-col items-start"
          >
            <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:takeinstudio@gmail.com" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors truncate">takeinstudio@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Phone size={14} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+918908233590" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">+91 89082 33590</a>
                  <a href="tel:+919124442040" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">+91 91244 42040</a>
                </div>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <span className="text-sm font-medium text-gray-500 leading-relaxed">
                  TakeIN Studio, India<br/>
                  <span className="text-[11px] text-gray-400">Serving global clients</span>
                </span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* ── 5. Bottom Bar ── */}
        <div className="py-8 border-t border-gray-200/60 flex flex-col lg:flex-row justify-between items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          
          <p>© {new Date().getFullYear()} <span className="text-primary">TakeIN Studio</span>. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>

          <p className="flex items-center gap-1.5">
            Designed & Engineered by <span className="text-primary">TakeIN Studio</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
