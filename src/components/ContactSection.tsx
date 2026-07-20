import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";

const contactCards = [
  {
    icon: <Mail size={22} />,
    title: "Email Us",
    value: "support@takeinstudio.com",
    href: "mailto:support@takeinstudio.com",
    isLink: true,
  },
  {
    icon: <MapPin size={22} />,
    title: "Location",
    value: "Remote & Global",
    href: null,
    isLink: false,
  },
  {
    icon: <Clock size={22} />,
    title: "Availability",
    value: "24/7 Support",
    href: null,
    isLink: false,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-cyan-600 uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-cyan-200 bg-cyan-50 mb-5">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Let's Build{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(187 80% 42%), hsl(174 60% 38%))" }}>
              Together
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Have an idea, a project, or just want to explore how AI automation can transform
            your business? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-7 flex flex-col items-center gap-4 text-center shadow-sm hover:shadow-md hover:border-cyan-200 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ background: "linear-gradient(135deg, hsl(187 80% 48%), hsl(174 60% 45%))" }}
              >
                {card.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1.5">{card.title}</p>
                {card.isLink ? (
                  <a
                    href={card.href!}
                    className="text-sm text-cyan-600 hover:text-cyan-500 transition-colors hover:underline underline-offset-2"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-500">{card.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
        >
          Whether you're looking to automate workflows, build custom AI tools, or launch
          your next micro-SaaS product, TakeIN Studio is here to help you succeed. Reach out
          today and let's build something amazing together.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
