import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Our Work", href: "/work" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "UI/UX Design", href: "#" },
      { name: "Branding", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/footer.mp4" type="video/mp4" />
        </video>
        {/* Darker Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-2xl font-bold">
              <span className="text-primary">TakeIN</span> Studio
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              We craft premium digital experiences that elevate brands and drive growth. Let's build something extraordinary together.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                >
                  <s.icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-primary">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} TakeIN Studio. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            Designed with passion & precision
          </p>
        </div>
      </div>
    </footer>
  );
}
