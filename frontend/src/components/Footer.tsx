import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight, Rocket, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const servicesLinks = [
  { name: "Website Development", href: "/services" },
  { name: "App Development", href: "/services" },
  { name: "AI Automation", href: "/services" },
  { name: "Custom Software", href: "/services" },
  { name: "Digital Branding", href: "/services" },
  { name: "SEO & Marketing", href: "/services" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
  { name: "Careers", href: "/career" },
  { name: "Contact Us", href: "/contact" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#FFFDFB] text-gray-800 pt-32 overflow-hidden border-t border-gray-100">
      
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Soft floating glow orbs */}
        <motion.div 
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-20 w-[600px] h-[600px] bg-[#FF6B00]/[0.04] blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#FF6B00]/[0.03] blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-amber-500/[0.02] blur-[150px] rounded-full" 
        />

        {/* Abstract Curved Line Patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
          <path d="M-200 300 C 400 100, 800 600, 1600 300" stroke="url(#footer-grad)" strokeWidth="1" fill="none" />
          <path d="M-100 500 C 500 800, 900 200, 1800 500" stroke="url(#footer-grad)" strokeWidth="0.5" fill="none" />
          <path d="M-300 700 C 300 400, 1000 900, 1900 700" stroke="url(#footer-grad)" strokeWidth="1" fill="none" />
          <defs>
            <linearGradient id="footer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle Dotted Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      {/* ── Top CTA Section ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-24 md:pb-32 border-b border-gray-100 mb-20">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B00]/10 to-[#FF6B00]/20 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-8 shadow-lg shadow-[#FF6B00]/5"
        >
          <Rocket size={26} className="ml-0.5 -mt-0.5" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[4rem] font-black text-gray-900 mb-6 font-display tracking-tight leading-tight"
        >
          Ready to Build Something <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#ff8c3a]">Amazing?</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Let's turn your ideas into websites, mobile apps, <br className="hidden sm:block"/> AI automations and digital experiences that grow your brand.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#ff8c3a] text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase shadow-[0_10px_40px_-10px_rgba(255,107,0,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(255,107,0,0.8)] hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" /></span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </Link>
        </motion.div>
      </div>

      {/* ── Footer Links Grid ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
        
        {/* Column 1: Brand & About */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 flex flex-col items-start lg:pr-10"
        >
          <Link to="/" className="inline-block mb-6">
            <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-10 md:h-12 object-contain" />
          </Link>
          <p className="text-[15px] text-gray-500 leading-relaxed font-medium mb-10 max-w-sm">
            We build modern digital solutions that help brands grow, automate and succeed in the digital world.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Facebook, href: "https://facebook.com" },
              { icon: MessageCircle, href: "https://wa.me/918908233590" },
              { icon: Mail, href: "mailto:info@takeinstudio.com" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/30 hover:shadow-[0_0_20px_rgba(255,107,0,0.15)] hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <s.icon size={18} className="group-hover:scale-110 transition-transform" />
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
          className="lg:col-span-2 lg:ml-auto"
        >
          <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Services</h4>
          <ul className="space-y-4">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-[15px] font-medium text-gray-500 hover:text-[#FF6B00] transition-colors inline-block hover:-translate-y-0.5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link to="/services" className="text-sm font-bold text-[#FF6B00] flex items-center gap-1.5 hover:gap-2 transition-all group">
                View All Services <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Column 3: Company */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 lg:ml-auto"
        >
          <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
          <ul className="space-y-4">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-[15px] font-medium text-gray-500 hover:text-[#FF6B00] transition-colors inline-block hover:-translate-y-0.5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 lg:ml-auto"
        >
          <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-[15px] font-medium text-gray-500 hover:text-[#FF6B00] transition-colors inline-block hover:-translate-y-0.5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 5: Contact Us */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 flex flex-col items-start lg:ml-auto"
        >
          <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
          <ul className="space-y-5">
            <li className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#FF6B00] group-hover:border-[#FF6B00]/30 transition-all shrink-0">
                <Mail size={16} />
              </div>
              <a href="mailto:info@takeinstudio.com" className="text-[15px] font-medium text-gray-500 hover:text-[#FF6B00] transition-colors">info@takeinstudio.com</a>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#FF6B00] group-hover:border-[#FF6B00]/30 transition-all shrink-0">
                <Phone size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <a href="tel:+918908233590" className="text-[15px] font-medium text-gray-500 hover:text-[#FF6B00] transition-colors">+91 89082 33590</a>
                <a href="tel:+919124442040" className="text-[15px] font-medium text-gray-500 hover:text-[#FF6B00] transition-colors">+91 91244 42040</a>
              </div>
            </li>
            <li className="flex items-start gap-4 group pt-1">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#FF6B00] group-hover:border-[#FF6B00]/30 transition-all shrink-0 mt-0.5">
                <MapPin size={16} />
              </div>
              <span className="text-[15px] font-medium text-gray-500 leading-relaxed">
                TakeIN Studio, India<br/>
                <span className="text-[13px] text-gray-400">Serving clients worldwide</span>
              </span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-gray-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-[13px] font-medium text-gray-500">
          <p>© {new Date().getFullYear()} TakeIN Studio. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link to="/privacy-policy" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/terms" className="hover:text-[#FF6B00] transition-colors">Terms & Conditions</Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/refund-policy" className="hover:text-[#FF6B00] transition-colors">Refund Policy</Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/cookie-policy" className="hover:text-[#FF6B00] transition-colors">Cookie Policy</Link>
          </div>

          <p className="flex items-center gap-1.5 font-medium">
            ❤ Proudly Built in India
          </p>
        </div>
      </div>

    </footer>
  );
}

