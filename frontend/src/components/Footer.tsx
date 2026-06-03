import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, ChevronRight, Calendar, Code2 } from "lucide-react";

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/about" },
  { name: "Careers", href: "/career" },
];

const servicesLinks = [
  { name: "Website Design & Development", href: "/services" },
  { name: "App Development", href: "/services" },
  { name: "Custom Software", href: "/services" },
  { name: "AI Automation & Chatbot Solutions", href: "/services" },
  { name: "Digital Branding & SMM", href: "/services" },
  { name: "SEO & Marketing", href: "/services" },
  { name: "Graphic Design", href: "/services" },
  { name: "Video Editing Services", href: "/services" },
  { name: "Website Maintenance & Support Plans", href: "/services" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Instagram, href: "https://instagram.com/takein_studio" },
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Code2, href: "https://takeinstudio.com" }, // Using Code2 as a placeholder for the X logo if needed, or something similar
];

export default function Footer() {
  return (
    <footer className="relative bg-white pt-16 sm:pt-24 pb-6 overflow-hidden text-gray-800">
      
      {/* Top Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Premium Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Subtle orange gradient mesh / glow on the sides */}
        <div className="absolute -top-20 left-0 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[140px] rounded-full translate-x-1/3 translate-y-1/3" />
        
        {/* Subtle Faint Dot Accent */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-[url('/dots.svg')] opacity-[0.04]" />
        
        {/* Curved SVG Line (Adjusted to not overlap content) */}
        <svg
          className="absolute top-0 left-0 w-full text-primary opacity-30"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ height: '60px' }}
        >
          {/* Very shallow smooth curve */}
          <path d="M0,0 Q720,60 1440,0" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-60" />
          <path d="M0,0 Q720,60 1440,0 L1440,0 L0,0 Z" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* 1. Logo & Info Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center -ml-2">
              <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-14 sm:h-16 object-contain" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs -mt-2">
              We build modern, fast and user-friendly websites, mobile apps and digital solutions that help brands grow online.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>

            {/* Dot Grid */}
            <div className="grid grid-cols-5 gap-2 mt-4 w-fit opacity-[0.15]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
              ))}
            </div>
          </div>

          {/* 2. Services Column */}
          <div className="lg:col-span-3 lg:ml-auto">
            <h4 className="font-bold text-gray-900 mb-5 relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3.5 mt-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2.5 group"
                  >
                    <ChevronRight size={14} className="text-primary opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Quick Links Column */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-bold text-gray-900 mb-5 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3.5 mt-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2.5 group"
                  >
                    <ChevronRight size={14} className="text-primary opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Get In Touch Column */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-left">
            <div className="w-full max-w-[260px]">
              <h4 className="font-bold text-gray-900 mb-5 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary rounded-full"></span>
              </h4>
              <ul className="space-y-4 mt-2">
                <li className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="w-6 h-6 rounded-md border border-primary/20 flex items-center justify-center text-primary shrink-0 bg-primary/5">
                    <Mail size={12} />
                  </div>
                  <a href="mailto:takeinstudio@gmail.com" className="hover:text-primary transition-colors truncate">takeinstudio@gmail.com</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="w-6 h-6 rounded-md border border-primary/20 flex items-center justify-center text-primary shrink-0 bg-primary/5">
                    <Phone size={12} />
                  </div>
                  <a href="tel:+918908233590" className="hover:text-primary transition-colors">+91 89082 33590</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="w-6 h-6 rounded-md border border-primary/20 flex items-center justify-center text-primary shrink-0 bg-primary/5">
                    <Phone size={12} />
                  </div>
                  <a href="tel:+919124442040" className="hover:text-primary transition-colors">+91 91244 42040</a>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-500">
                  <div className="w-6 h-6 rounded-md border border-primary/20 flex items-center justify-center text-primary shrink-0 bg-primary/5 mt-0.5">
                    <MapPin size={12} />
                  </div>
                  <span className="leading-relaxed">TakeIN Studio, India<br/>Helping brands across the globe</span>
                </li>
              </ul>
              
              {/* Floating CTA Card */}
              <div className="mt-8 bg-white rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-500" />
                <div className="flex items-start gap-3 relative z-10">
                  <Calendar className="text-primary w-7 h-7 shrink-0" />
                  <div>
                    <h5 className="font-bold text-gray-900 text-[13px]">Have a project in mind?</h5>
                    <p className="text-[11px] text-gray-500 mt-1">Let's build something amazing together!</p>
                  </div>
                </div>
                <Link to="/contact" className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/25 relative z-10">
                  LET'S TALK <ChevronRight size={14} className="stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          
          <p>© {new Date().getFullYear()} <span className="font-bold text-primary">TakeIN Studio</span>. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link to="/cancellation-policy" className="hover:text-primary transition-colors">Cancellation Policy</Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>

          <p className="flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
            Designed & Engineered by <span className="font-bold text-primary">TakeIN Studio</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
