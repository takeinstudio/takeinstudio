import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin, ChevronRight, ArrowRight, Send, Globe } from "lucide-react";

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

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
  { name: "Our Portfolio", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
  { name: "Careers", href: "/career" },
  { name: "Contact Us", href: "/contact" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
];

export default function Footer() {
  const location = useLocation();
  const isCareerPage = location.pathname === '/career' || location.pathname === '/careers';

  return (
    <footer className="relative w-full bg-[#FCFBF9] text-gray-800 pt-16 overflow-hidden">
      
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Soft floating glow orbs */}
        <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] bg-[#FF6B00] rounded-full blur-[140px] opacity-[0.12]" />
        <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-[#FF6B00] rounded-full blur-[160px] opacity-[0.08]" />
        <div className="absolute bottom-[0%] left-[30%] w-[400px] h-[400px] bg-[#FF6B00] rounded-full blur-[120px] opacity-[0.06]" />
        <div className="absolute bottom-[5%] right-[5%] w-[250px] h-[250px] bg-[#FF6B00] rounded-full blur-[90px] opacity-[0.1]" />

        {/* Abstract Curved Line Patterns - Waves */}
        <svg className="absolute top-[20%] left-0 w-full h-[80%]" preserveAspectRatio="none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 300C200 300 300 150 600 200C900 250 1000 50 1440 150L1440 800L0 800Z" fill="url(#wave-grad-1)" opacity="0.3" />
          <path d="M0 400C300 200 400 300 700 250C1000 200 1100 100 1440 200L1440 800L0 800Z" fill="url(#wave-grad-2)" opacity="0.2" />
          <path d="M0 500C400 400 500 500 800 400C1100 300 1200 300 1440 400L1440 800L0 800Z" fill="url(#wave-grad-3)" opacity="0.1" />
          
          <path d="M0 150C250 50 400 250 750 200C1100 150 1250 0 1440 100" stroke="url(#line-grad)" strokeWidth="1.5" opacity="0.5" />
          <path d="M0 250C300 350 450 150 800 200C1150 250 1300 100 1440 150" stroke="url(#line-grad)" strokeWidth="1" opacity="0.3" />

          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFDFB" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dotted Patterns */}
        <div className="absolute top-20 left-[12%] w-[80px] h-[80px] bg-[radial-gradient(#FF6B00_2px,transparent_2px)] [background-size:12px_12px] opacity-20" />
        <div className="absolute top-24 right-[12%] w-[80px] h-[80px] bg-[radial-gradient(#FF6B00_2px,transparent_2px)] [background-size:12px_12px] opacity-20" />
        <div className="absolute bottom-[35%] left-[5%] w-4 h-4 rounded-full border border-[#FF6B00] opacity-30" />
        <div className="absolute bottom-[20%] right-[25%] w-3 h-3 rounded-full border border-[#FF6B00] opacity-30" />
      </div>

      {/* ── Top CTA Section ── */}
      {!isCareerPage && (
        <div className="relative z-10 w-full max-w-[850px] mx-auto px-4 sm:px-6 mt-8 mb-20">
          <div className="bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_20px_60px_-15px_rgba(255,107,0,0.15)] relative px-6 py-14 sm:py-16 text-center border border-white">
            
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-[0_10px_30px_rgba(255,107,0,0.15)] flex items-center justify-center">
              <Send className="text-[#FF6B00] ml-[-2px] mt-[2px]" size={24} />
            </div>
            
            <h2 className="text-[2rem] sm:text-[2.75rem] font-black text-gray-900 mb-4 font-display tracking-tight leading-[1.2]">
              Ready to Build Something <br className="hidden sm:block"/>
              <span className="text-[#FF6B00]">Amazing</span>?
            </h2>
            
            <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[450px] mx-auto mb-8 font-medium leading-relaxed">
              Let's turn your ideas into websites, mobile apps, <br className="hidden sm:block"/> AI automations and digital experiences that grow your brand.
            </p>
            
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-[12px] sm:text-[13px] tracking-widest shadow-[0_8px_25px_-8px_rgba(255,107,0,0.8)] hover:shadow-[0_12px_30px_-8px_rgba(255,107,0,1)] hover:-translate-y-1 transition-all duration-300">
              START YOUR PROJECT <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            
          </div>
        </div>
      )}

      {/* ── Footer Links Grid ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 mb-16">
        
        {/* Column 1: Brand & About */}
        <div className="lg:col-span-4 flex flex-col items-start lg:pr-6">
          <Link to="/" className="inline-block mb-4">
            <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-9 sm:h-10 object-contain" />
          </Link>
          <p className="text-[13px] text-gray-500 leading-relaxed font-medium mb-6 max-w-[280px]">
            We build modern digital solutions that help brands grow, automate and succeed in the digital world.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3.5">
            {[
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Facebook, href: "https://facebook.com" },
              { icon: WhatsAppIcon, href: "https://wa.me/918908233590" },
              { icon: Mail, href: "mailto:info@takeinstudio.com" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-gray-600 hover:text-[#FF6B00] transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="lg:col-span-2">
          <h4 className="font-extrabold text-gray-900 mb-5 text-[12px] tracking-widest">SERVICES</h4>
          <ul className="space-y-3.5">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-2.5">
                  <ChevronRight size={12} strokeWidth={3} className="text-[#FF6B00] shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/services" className="text-[13px] font-bold text-[#FF6B00] flex items-center gap-1.5 hover:gap-2 transition-all">
                View All Services <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="lg:col-span-2">
          <h4 className="font-extrabold text-gray-900 mb-5 text-[12px] tracking-widest">COMPANY</h4>
          <ul className="space-y-3.5">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-2.5">
                  <ChevronRight size={12} strokeWidth={3} className="text-[#FF6B00] shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="font-extrabold text-gray-900 mb-5 text-[12px] tracking-widest">QUICK LINKS</h4>
          <ul className="space-y-3.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-2.5">
                  <ChevronRight size={12} strokeWidth={3} className="text-[#FF6B00] shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Contact Us */}
        <div className="lg:col-span-2">
          <h4 className="font-extrabold text-gray-900 mb-5 text-[12px] tracking-widest">CONTACT US</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#FF6B00] shrink-0">
                <Mail size={14} strokeWidth={2.5} />
              </div>
              <a href="mailto:takeinstudio@gmail.com" className="text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors">takeinstudio@gmail.com</a>
            </li>
            <li className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#FF6B00] shrink-0">
                <Phone size={14} strokeWidth={2.5} />
              </div>
              <a href="tel:+918908233590" className="text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors">+91 89082 33590</a>
            </li>
            <li className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#FF6B00] shrink-0">
                <Phone size={14} strokeWidth={2.5} />
              </div>
              <a href="tel:+919124442040" className="text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors">+91 91244 42040</a>
            </li>
            <li className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                <MapPin size={14} strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-medium text-gray-600 leading-[1.6]">
                TakeIN Studio, India<br/>
                <span className="text-[12px] text-gray-400">Serving clients worldwide</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-[#FF6B00]/10 mt-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-medium text-gray-500">
          <p>© 2026 <span className="text-[#FF6B00]">TakeIN Studio</span>. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy-policy" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</Link>
            <div className="w-1 h-1 rounded-full bg-[#FF6B00]" />
            <Link to="/terms-and-conditions" className="hover:text-[#FF6B00] transition-colors">Terms &amp; Conditions</Link>
            <div className="w-1 h-1 rounded-full bg-[#FF6B00]" />
            <Link to="/refund-policy" className="hover:text-[#FF6B00] transition-colors">Refund Policy</Link>
            <div className="w-1 h-1 rounded-full bg-[#FF6B00]" />
            <Link to="/cookie-policy" className="hover:text-[#FF6B00] transition-colors">Cookie Policy</Link>
          </div>

          <p className="flex items-center gap-1.5">
            <Globe size={13} className="text-[#FF6B00]" /> Empowering Global Brands
          </p>
        </div>
      </div>

    </footer>
  );
}
