import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "/about" },
  { name: "SERVICES", path: "/services" },
  { name: "PORTFOLIO", path: "/work" },
  { name: "PRICING", path: "/pricing" },
  { name: "FAQS", path: "/faqs" },
  { name: "CAREERS", path: "/career" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const isVaultActive = location.pathname.startsWith("/vault");

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl transition-all duration-500 ${
        hidden ? "-top-32" : "top-4"
      }`}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`px-4 sm:px-6 h-16 sm:h-14 flex items-center justify-between rounded-full transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-md border border-gray-100/50 ${
          scrolled
            ? "scale-[0.98] shadow-[0_12px_45px_rgba(255,107,0,0.08)] border-primary/10"
            : ""
        }`}
      >
        {/* Brand Logo */}
        <div>
          <Link
            to="/"
            className="font-display text-base sm:text-lg tracking-tight leading-none flex items-center gap-2"
          >
            <img
              src="/logo/logo_no_text.png"
              alt="TakeIN Studio Logo"
              className="h-8 sm:h-9 w-auto mix-blend-multiply rounded-md object-contain"
            />
            <div className="flex items-center">
              <span className="text-foreground font-black tracking-tight">Take</span>
              <span className="text-primary font-black tracking-tight">IN</span>
              <span className="text-foreground font-normal ml-1 tracking-normal">Studio</span>
            </div>
          </Link>
        </div>

        {/* Desktop Links & CTAs */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((l) => (
            <motion.div key={l.path} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={l.path}
                className={`text-[10px] tracking-wider font-bold px-3 py-1.5 rounded-full transition-all duration-200 ${
                  location.pathname === l.path
                    ? "bg-gray-100 text-foreground font-black"
                    : "text-muted-foreground/90 hover:text-foreground"
                }`}
              >
                {l.name}
              </Link>
            </motion.div>
          ))}

          {/* Contact Link */}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/contact"
              className={`text-[10px] tracking-wider font-bold px-3 py-1.5 rounded-full transition-all duration-200 ${
                location.pathname === "/contact"
                  ? "bg-gray-100 text-foreground font-black"
                  : "text-muted-foreground/90 hover:text-foreground"
              }`}
            >
              CONTACT US
            </Link>
          </motion.div>

          {/* Prominent AIWebDev Vault CTA */}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="ml-1">
            <Link
              to="/vault/aiwebdev"
              aria-label="Explore the AIWebDev Vault"
              className={`text-[10px] font-bold tracking-wider px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-1 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 ${
                isVaultActive
                  ? "bg-[#e05e00] font-black shadow-sm"
                  : "bg-[#FF6B00] hover:bg-[#e05e00]"
              }`}
            >
              GET THE VAULT
              <ArrowUpRight size={13} strokeWidth={2.5} className="shrink-0" />
            </Link>
          </motion.div>
        </div>

        {/* Desktop condensed view for medium screens (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center gap-2">
          <Link
            to="/services"
            className="text-[10px] tracking-wider font-bold px-3 py-1.5 text-muted-foreground hover:text-foreground"
          >
            SERVICES
          </Link>
          <Link
            to="/work"
            className="text-[10px] tracking-wider font-bold px-3 py-1.5 text-muted-foreground hover:text-foreground"
          >
            PORTFOLIO
          </Link>
          <Link
            to="/pricing"
            className="text-[10px] tracking-wider font-bold px-3 py-1.5 text-muted-foreground hover:text-foreground"
          >
            PRICING
          </Link>

          <Link
            to="/vault/aiwebdev"
            aria-label="Explore the AIWebDev Vault"
            className={`text-[10px] font-bold tracking-wider px-4 py-2 rounded-full text-white flex items-center gap-1 transition-colors ${
              isVaultActive ? "bg-[#e05e00]" : "bg-[#FF6B00] hover:bg-[#e05e00]"
            }`}
          >
            GET THE VAULT
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close main menu" : "Open main menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 lg:hidden bg-white/98 backdrop-blur-xl border border-gray-100 rounded-2xl overflow-hidden p-3.5 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-xs font-bold uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all ${
                    location.pathname === l.path
                      ? "bg-gray-100 text-foreground"
                      : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
                  }`}
                >
                  {l.name}
                </Link>
              ))}

              <Link
                to="/contact"
                className={`text-xs font-bold uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all ${
                  location.pathname === "/contact"
                    ? "bg-gray-100 text-foreground"
                    : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
                }`}
              >
                CONTACT US
              </Link>

              {/* Full-width Visually Distinct Vault CTA for Mobile */}
              <Link
                to="/vault/aiwebdev"
                aria-label="Explore the AIWebDev Vault"
                className={`text-xs font-bold uppercase tracking-widest text-center mt-2 py-3.5 px-4 rounded-xl text-white flex items-center justify-center gap-2 transition-colors ${
                  isVaultActive
                    ? "bg-[#e05e00] shadow-md"
                    : "bg-[#FF6B00] hover:bg-[#e05e00] shadow-sm"
                }`}
              >
                GET THE VAULT
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
