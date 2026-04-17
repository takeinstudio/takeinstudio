import { motion } from "framer-motion";
import { Search, Zap, Rocket, ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, title: "Analyze", description: "We scan your business, website, and workflows to find automation opportunities." },
  { icon: Zap, title: "Automate", description: "Our AI builds custom automation systems tailored to your specific needs." },
  { icon: Rocket, title: "Launch", description: "Deploy production-ready tools and watch your efficiency multiply." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-cyan uppercase tracking-widest">Process</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">How It Works</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col items-center text-center w-64"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-cyan flex items-center justify-center mb-6 shadow-glow">
                  <step.icon size={32} className="text-primary-foreground" />
                </div>
                <span className="text-xs font-bold text-cyan uppercase tracking-widest mb-2">Step {i + 1}</span>
                <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="hidden lg:block"
                >
                  <ArrowRight size={24} className="text-cyan" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
