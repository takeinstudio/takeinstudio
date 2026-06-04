import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`px-6 h-16 sm:h-13 flex items-center justify-between rounded-full transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-md border border-gray-100/50 ${scrolled ? "scale-95 shadow-[0_12px_45px_rgba(255,107,0,0.08)] border-primary/10" : ""
          }`}
      >
        <div>
          <Link to="/" className="font-display text-base sm:text-lg tracking-tight leading-none flex items-center gap-2.5">
            <img src="/logo/logo_no_text.png" alt="TakeIN Studio Logo" className="h-8 sm:h-10 w-auto mix-blend-multiply rounded-md object-contain" />
            <div className="flex items-center">
              <span className="text-foreground font-black tracking-tight">Take</span>
              <span className="text-primary font-black tracking-tight">IN</span>
              <span className="text-foreground font-normal ml-1 tracking-normal">Studio</span>
            </div>
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <motion.div key={l.path} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={l.path}
                className={`text-[10px] tracking-widest font-black px-4 py-2 rounded-full transition-all duration-300 ${location.pathname === l.path
                  ? "bg-gradient-to-r from-orange-500 to-primary text-white shadow-lg shadow-primary/25"
                  : "text-muted-foreground/80 hover:text-foreground"
                  }`}
              >
                {l.name}
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/contact"
              className="bg-gradient-to-r from-orange-500 to-primary text-white text-[10px] font-black tracking-widest px-6 py-2 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 block"
            >
              CONTACT US
            </Link>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 md:hidden bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl overflow-hidden p-3 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-xs font-bold uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all ${location.pathname === l.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    }`}
                >
                  {l.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest text-center mt-1 py-3 rounded-xl shadow-lg shadow-primary/20"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
