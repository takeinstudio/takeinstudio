import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin, ChevronRight, ArrowRight, Send, Globe } from "lucide-react";
import PhoneUnlockButton from "./PhoneUnlockButton";
import AdBanner from "./AdBanner";
import NativeBanner from "./NativeBanner";

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
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
    <footer className="relative w-full bg-[#FCFBF9] text-gray-800 pt-10 sm:pt-16 overflow-hidden">

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

      {/* ── Ads Section ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col items-center gap-4">
        {/* Native Banner */}
        <NativeBanner />
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {/* 728x90 Banner (hidden on very small screens) */}
          <div className="hidden md:block">
            <AdBanner id="7d7b041b468f6fef50648b2c165512dd" width={728} height={90} />
          </div>
          {/* 320x50 Banner (visible on small screens) */}
          <div className="block md:hidden">
            <AdBanner id="fca570475bcf634800abd5d144f75d6f" width={320} height={50} />
          </div>
          {/* 468x60 Banner */}
          <div className="hidden sm:block md:hidden">
            <AdBanner id="1a5d5b7d7a5f7e60b761cfa153421406" width={468} height={60} />
          </div>
        </div>
      </div>

      {/* ── Top CTA Section Removed ── */}

      {/* ── Footer Links Grid ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-x-4 gap-y-6 sm:gap-8 lg:gap-6 mb-8 sm:mb-16">

        {/* Column 1: Brand & About */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-4 flex flex-col items-start lg:pr-6">
          <Link to="/" className="inline-flex items-center gap-3 mb-3 group">
            <img src="/logo/logo_no_text.png" alt="TakeIN Studio Logo" className="h-9 sm:h-11 object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="font-display text-xl sm:text-2xl font-black text-gray-900 tracking-tight group-hover:text-[#FF6B00] transition-colors duration-300">TakeIN Studio</span>
          </Link>
          <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed font-medium mb-4 sm:mb-6 max-w-[280px]">
            We build modern digital solutions that help brands grow, automate and succeed in the digital world.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3.5">
            {[
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/takein-studio-62650a414" },
              { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61590782905151" },
              { icon: WhatsAppIcon, href: "https://wa.me/918908233590" },
              { icon: Mail, href: "mailto:info@takeinstudio.com" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-gray-600 hover:text-[#FF6B00] transition-colors"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="col-span-1 lg:col-span-2">
          <h4 className="font-extrabold text-gray-900 mb-3 sm:mb-5 text-[11px] sm:text-[12px] tracking-widest">SERVICES</h4>
          <ul className="space-y-2.5 sm:space-y-3.5">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-[12px] sm:text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 sm:gap-2.5">
                  <ChevronRight size={10} strokeWidth={3} className="text-[#FF6B00] shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-1.5">
              <Link to="/services" className="text-[12px] sm:text-[13px] font-bold text-[#FF6B00] flex items-center gap-1.5 hover:gap-2 transition-all">
                View All <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="col-span-1 lg:col-span-2">
          <h4 className="font-extrabold text-gray-900 mb-3 sm:mb-5 text-[11px] sm:text-[12px] tracking-widest">COMPANY</h4>
          <ul className="space-y-2.5 sm:space-y-3.5">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-[12px] sm:text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 sm:gap-2.5">
                  <ChevronRight size={10} strokeWidth={3} className="text-[#FF6B00] shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Quick Links */}
        <div className="col-span-1 lg:col-span-2 mt-4 sm:mt-0">
          <h4 className="font-extrabold text-gray-900 mb-3 sm:mb-5 text-[11px] sm:text-[12px] tracking-widest">QUICK LINKS</h4>
          <ul className="space-y-2.5 sm:space-y-3.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-[12px] sm:text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 sm:gap-2.5">
                  <ChevronRight size={10} strokeWidth={3} className="text-[#FF6B00] shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Contact Us */}
        <div className="col-span-1 lg:col-span-2 mt-4 sm:mt-0">
          <h4 className="font-extrabold text-gray-900 mb-3 sm:mb-5 text-[11px] sm:text-[12px] tracking-widest">CONTACT US</h4>
          <ul className="space-y-2.5 sm:space-y-4">
            <li className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#FF6B00] shrink-0">
                <Mail size={14} strokeWidth={2.5} />
              </div>
              <a href="mailto:takeinstudio@gmail.com" className="text-[12px] sm:text-[13px] font-medium text-gray-600 hover:text-[#FF6B00] transition-colors whitespace-nowrap">takeinstudio@gmail.com</a>
            </li>
            <PhoneUnlockButton />
            <li className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                <MapPin size={14} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] sm:text-[13px] font-medium text-gray-600 leading-[1.6]">
                TakeIN Studio, India<br />
                <span className="text-[11px] sm:text-[12px] text-gray-400">Serving clients worldwide</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-[#FF6B00]/10 mt-4 sm:mt-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-medium text-gray-500">
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
            <Globe size={13} className="text-[#FF6B00]" /> Building Digital Experiences That Drive Growth
          </p>
        </div>
      </div>

    </footer>
  );
}
