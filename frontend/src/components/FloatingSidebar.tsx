import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Instagram, Linkedin, Facebook, Phone, MessageSquare, ChevronLeft } from "lucide-react";

// Premium custom SVG WhatsApp Icon
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function FloatingSidebar() {
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon size={18} />,
      href: "https://wa.me/918908233590",
      color: "bg-[#25D366] hover:bg-[#20ba56] text-white shadow-[#25D366]/20",
    },
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      href: "https://instagram.com/takein_studio",
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-[#ee2a7b]/20 hover:scale-110",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/company/takeinstudio",
      color: "bg-[#0077b5] hover:bg-[#006396] text-white shadow-[#0077b5]/20",
    },
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      href: "https://facebook.com",
      color: "bg-[#1877f2] hover:bg-[#166fe5] text-white shadow-[#1877f2]/20",
    },
  ];

  return (
    <div className="fixed right-3 md:right-4 top-1/2 -translate-y-1/2 z-[99] flex flex-col items-center">
      {/* Social Links Stack - Unified into a single clean vertical pill */}
      <div className="flex flex-col gap-2.5 p-2 rounded-full bg-white border border-gray-100 shadow-[0_12px_35px_rgba(0,0,0,0.08)]">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            whileHover={{ scale: 1.4, x: -6, zIndex: 50 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`w-9 h-9 relative rounded-full flex items-center justify-center shadow-sm ${link.color}`}
          >
            {link.icon}
          </motion.a>
        ))}

        {/* Floating Phone Popout Button - inside the same container */}
        <div className="relative">
          <motion.button
            onClick={() => setShowPhoneMenu(!showPhoneMenu)}
            onMouseEnter={() => setShowPhoneMenu(true)}
            title="Call Support"
            whileHover={{ scale: 1.4, x: -6, zIndex: 50 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`w-9 h-9 relative rounded-full flex items-center justify-center bg-primary text-white shadow-sm ${
              showPhoneMenu ? "ring-2 ring-primary/45" : ""
            }`}
          >
            <motion.div
              animate={{ rotate: showPhoneMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              {showPhoneMenu ? <ChevronLeft size={16} /> : <Phone size={16} />}
            </motion.div>
          </motion.button>

          {/* Expandable Phone popout panel to the left */}
          <AnimatePresence>
            {showPhoneMenu && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onMouseLeave={() => setShowPhoneMenu(false)}
                className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-56 p-4 rounded-2xl bg-white border border-gray-100 shadow-2xl backdrop-blur-md text-left z-50"
              >
                <div className="space-y-3.5">
                  <div className="border-b border-border/40 pb-2">
                    <p className="font-display font-bold text-xs text-foreground uppercase tracking-widest">
                      Call Support
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Ready to assist you 24/7
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <a
                      href="tel:+918908233590"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-primary/10 text-xs font-semibold text-foreground transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Phone size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wide">
                          Primary Support
                        </span>
                        <span className="text-foreground font-semibold group-hover:text-primary transition-colors">
                          +91 89082 33590
                        </span>
                      </div>
                    </a>

                    <a
                      href="tel:+919124442040"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-primary/10 text-xs font-semibold text-foreground transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Phone size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wide">
                          Secondary Support
                        </span>
                        <span className="text-foreground font-semibold group-hover:text-primary transition-colors">
                          +91 91244 42040
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
