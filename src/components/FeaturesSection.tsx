import { motion } from "framer-motion";
import { Search, Target, Wrench, Rocket } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI Website Analyzer",
    description: "Deep-scan any website with AI to uncover SEO gaps, performance issues, and growth opportunities.",
  },
  {
    icon: Target,
    title: "Lead Discovery Engine",
    description: "Automatically find and qualify leads using AI-powered prospecting across the web.",
  },
  {
    icon: Wrench,
    title: "Automation Toolkit",
    description: "Pre-built automation workflows that connect your tools and eliminate repetitive tasks.",
  },
  {
    icon: Rocket,
    title: "Micro SaaS Builder",
    description: "Launch small, focused SaaS products in days with our AI-assisted development framework.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="products" className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-cyan uppercase tracking-widest">Products</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">
            AI Automation Platform
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-surface-elevated border border-border shadow-card
                         hover:shadow-card-hover transition-all duration-500 cursor-default"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--cyan) / 0.06) 0%, transparent 60%)" }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-cyan flex items-center justify-center mb-6">
                  <feature.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
