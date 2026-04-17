import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Join Us", path: "/join" },
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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl transition-all duration-500">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`px-6 h-10 sm:h-12 flex items-center justify-between rounded-full border border-white/20 backdrop-blur-xl transition-all duration-500 shadow-xl ${
          scrolled ? "bg-white/90 dark:bg-black/90 scale-95" : "bg-white/80 dark:bg-black/80"
        }`}
      >
        <Link to="/" className="font-display text-base sm:text-lg font-bold tracking-tight">
          <span className="text-primary">TakeIN</span>{" "}
          <span className="text-foreground font-extrabold">Studio</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((l) => (
            <motion.div key={l.path} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={l.path}
                className={`text-[11px] uppercase tracking-widest font-bold px-3 py-1 rounded-full transition-all duration-300 ${
                  location.pathname === l.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {l.name}
              </Link>
            </motion.div>
          ))}
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full hover:scale-105 transition-all"
          >
            Start
          </Link>
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
            className="absolute top-full left-0 right-0 mt-2 md:hidden bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-3 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-xs font-bold uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all ${
                    location.pathname === l.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {l.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest text-center mt-1 py-3 rounded-xl"
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
