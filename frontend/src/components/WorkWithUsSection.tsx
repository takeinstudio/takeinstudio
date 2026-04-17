import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Workflow, Globe, Code2 } from "lucide-react";

const services = [
  { icon: Bot, title: "AI Automation", description: "Custom AI agents and workflows that handle complex business processes autonomously." },
  { icon: Workflow, title: "Workflow Automation", description: "Connect your tools and automate repetitive tasks across your entire stack." },
  { icon: Globe, title: "Website Analysis", description: "Comprehensive AI audits that reveal hidden opportunities and technical debt." },
  { icon: Code2, title: "Custom AI Tools", description: "Bespoke AI-powered applications designed for your unique business challenges." },
];

const WorkWithUsSection = () => {
  return (
    <section id="work-with-us" className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-cyan uppercase tracking-widest">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">Work With Us</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Partner with TakeIN Studio to transform your business with cutting-edge AI automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 p-6 rounded-xl bg-surface-elevated border border-border shadow-card hover:shadow-card-hover transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-cyan flex items-center justify-center shrink-0">
                <service.icon size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a href="#audit">
            <Button size="lg" className="bg-gradient-navy text-primary-foreground hover:opacity-90 transition-opacity px-8">
              Start a Project
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUsSection;
