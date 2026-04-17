import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-cyan uppercase tracking-widest">About</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              Building the Future of AI Automation
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                TakeIN Studio is an AI automation startup focused on empowering developers
                and businesses with intelligent tools that streamline workflows, uncover
                opportunities, and accelerate growth.
              </p>
              <p>
                Our mission is to democratize AI automation & making powerful tools accessible
                to startups, indie hackers, and growing businesses who want to compete with
                enterprise-level efficiency.
              </p>
              <p>
                We believe the future belongs to those who automate. From website analysis to
                lead discovery to full micro-SaaS development, we build the tools that let
                you focus on what matters.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl bg-surface border border-border p-8 shadow-card">
              <div className="w-16 h-16 rounded-full bg-gradient-cyan flex items-center justify-center mb-6 text-2xl font-bold text-primary-foreground">
                A
              </div>
              <h3 className="text-xl font-bold mb-1 text-foreground">TakeIN Studio</h3>
              <p className="text-sm text-cyan font-medium mb-4">Being Automated</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Passionate about building AI-driven tools that solve real problems.
                Focused on creating automation systems that help developers and startups
                move faster and scale smarter.
              </p>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, hsl(var(--cyan)), transparent)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
