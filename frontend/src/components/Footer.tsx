import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, Code2 } from "lucide-react";

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/about" },
  { name: "Careers", href: "/career" },
];

const servicesLinks = [
  { name: "Website Design & Development", href: "/services" },
  { name: "Video Editing Services", href: "/services" },
  { name: "Graphic Design", href: "/services" },
  { name: "Digital Branding", href: "/services" },
  { name: "SEO & Marketing", href: "/services" },
  { name: "Social Media Management", href: "/services" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Portfolio", href: "/work" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: Instagram, href: "https://instagram.com/takein_studio" },
];

export default function Footer() {
  return (
    <footer className="relative bg-background text-foreground overflow-hidden pt-12">
      {/* Footer Top Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Logo & Description Column */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <div className="flex items-center">
              <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-14 sm:h-16 w-auto mix-blend-multiply rounded-xl object-contain" />
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-semibold">
              We build modern, fast and user-friendly websites that help brands grow online.
            </p>

            {/* Social Icons - Circle with border and simple centering */}
            <div className="flex items-center gap-3.5 pt-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-primary/20 bg-card hover:bg-primary hover:text-white flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-all duration-300"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">

            {/* Company Column */}
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-display font-black text-base text-foreground tracking-wide">
                  Studio
                </h4>
                <div className="w-6 h-[2.5px] bg-primary mt-1" />
              </div>
              <ul className="space-y-2.5 pt-1">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-semibold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-display font-black text-base text-foreground tracking-wide">
                  Services
                </h4>
                <div className="w-6 h-[2.5px] bg-primary mt-1" />
              </div>
              <ul className="space-y-2.5 pt-1">
                {servicesLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-semibold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-display font-black text-base text-foreground tracking-wide">
                  Quick Links
                </h4>
                <div className="w-6 h-[2.5px] bg-primary mt-1" />
              </div>
              <ul className="space-y-2.5 pt-1">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-semibold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch Column */}
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-display font-black text-base text-foreground tracking-wide">
                  Get In Touch
                </h4>
                <div className="w-6 h-[2.5px] bg-primary mt-1" />
              </div>
              <ul className="space-y-3.5 pt-1">
                <li className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm font-semibold">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Mail size={14} />
                  </div>
                  <a href="mailto:takeinstudio@gmail.com">takeinstudio@gmail.com</a>
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm font-semibold">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Phone size={14} />
                  </div>
                  <a href="tel:+918908233590">+91 89082 33590</a>
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm font-semibold">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Phone size={14} />
                  </div>
                  <a href="tel:+919124442040">+91 91244 42040</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Orange Bottom Wave Background Section */}
      <div className="relative w-full bg-primary pt-10 pb-6 z-10 text-white">

        {/* Dynamic Curved Wave Divider to transition from White to Orange */}
        <svg
          className="absolute bottom-full left-0 w-full h-16 sm:h-24 fill-primary pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C320,120 480,120 720,120 C960,120 1120,120 1440,20 L1440,120 L0,120 Z" />
        </svg>

        {/* Content Inside Orange Wave */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 relative">

            {/* Copyright text, centered by default on mobile, aligned left on desktop */}
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-white/95 mx-auto sm:mx-0">
              © 2026 TakeIN Studio. All rights reserved.
            </p>

            {/* Premium Code Indicator Icon & Dot Grid on Right (matching the reference image) */}
            <div className="hidden sm:flex items-center gap-6 text-white/20">
              {/* Dot Grid */}
              <div className="grid grid-cols-3 gap-1 animate-pulse">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                ))}
              </div>

              {/* Code Brackets */}
              <Code2 size={28} className="text-white/30 stroke-[2.5]" />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
