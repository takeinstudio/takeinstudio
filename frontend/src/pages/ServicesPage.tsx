import { useState } from "react";
import { Link } from "react-router-dom";
import { Monitor, Video, Palette, Megaphone, TrendingUp, Building, ArrowRight, CheckCircle2, ShieldCheck, Share2, Smartphone, Code, Bot, Wrench } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    id: "web-development",
    title: "Website Design & Development",
    icon: Monitor,
    description: "We create fast, responsive, and conversion-focused websites that strengthen your brand, enhance user experience, and help your business grow online. From corporate websites to custom e-commerce platforms, we deliver complete digital solutions.",
    offerings: [
      "Business & portfolio websites",
      "School, college & coaching websites",
      "Hospital & NGO websites",
      "Custom e-commerce stores",
      "High-speed cloud hosting setup",
      "Advanced SEO optimization",
      "Clean semantic architecture",
      "Domain & SSL configuration"
    ]
  },
  {
    id: "app-development",
    title: "App Development",
    icon: Smartphone,
    description: "Build powerful mobile applications that deliver seamless user experiences across Android and iOS. Our apps are designed for performance, scalability, and long-term business growth.",
    offerings: [
      "Android & iOS applications",
      "Cross-platform development",
      "Custom backend development",
      "API integration",
      "App Store & Play Store deployment",
      "UI/UX design & prototyping"
    ]
  },
  {
    id: "custom-software",
    title: "Custom Software",
    icon: Code,
    description: "Transform your operations with tailored software solutions designed around your unique workflows, business goals, and operational requirements.",
    offerings: [
      "ERP & CRM systems",
      "Custom booking platforms",
      "Internal dashboards",
      "Business management tools",
      "API development & integration",
      "Workflow automation"
    ]
  },
  {
    id: "ai-automation",
    title: "AI Automation & Chatbot Solutions",
    icon: Bot,
    description: "Leverage AI-powered automation to improve customer engagement, automate repetitive tasks, and streamline business operations while providing round-the-clock support.",
    offerings: [
      "Website AI chatbots",
      "WhatsApp Business automation",
      "AI customer support systems",
      "Lead generation & qualification bots",
      "Appointment booking automation",
      "CRM & API integrations",
      "Knowledge base assistants",
      "Workflow automation"
    ]
  },
  {
    id: "digital-branding-smm",
    title: "Digital Branding & Social Media Management",
    icon: Megaphone,
    description: "Build a strong and memorable brand presence through strategic content, consistent visual identity, and engaging social media management that drives audience growth and customer loyalty.",
    offerings: [
      "Social media management",
      "Brand identity development",
      "Content creation & planning",
      "Ad creatives & campaign assets",
      "Instagram & Facebook growth",
      "Local business branding",
      "Institute & influencer branding"
    ]
  },
  {
    id: "seo-marketing",
    title: "SEO & Marketing",
    icon: TrendingUp,
    description: "Increase your online visibility and generate qualified leads through data-driven SEO strategies, targeted advertising campaigns, and performance-focused digital marketing.",
    offerings: [
      "Google SEO",
      "Local SEO optimization",
      "Google Business Profile optimization",
      "Google Ads management",
      "Instagram & Facebook marketing",
      "Keyword research & strategy"
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: Palette,
    description: "Create visually compelling brand assets that communicate professionalism, build recognition, and leave a lasting impression across digital and print platforms.",
    offerings: [
      "Logo design",
      "Posters & banners",
      "Social media creatives",
      "Brochures & flyers",
      "Business cards",
      "Marketing collateral"
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing Services",
    icon: Video,
    description: "Capture attention and tell your story with professionally edited videos designed for social media, advertising, education, and brand promotion.",
    offerings: [
      "Promotional videos",
      "Reels & Shorts editing",
      "YouTube video editing",
      "Educational videos",
      "Advertisement videos",
      "Motion graphics & animations"
    ]
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance & Support Plans",
    icon: Wrench,
    description: "Keep your website secure, optimized, and running smoothly with proactive maintenance, regular updates, technical support, and performance monitoring.",
    offerings: [
      "Website maintenance",
      "Security monitoring",
      "Regular backups",
      "Content updates",
      "Performance optimization",
      "Bug fixes & troubleshooting",
      "Hosting management",
      "Monthly maintenance reports"
    ]
  }
];

const institutions = [
  "Schools", "Colleges", "Coaching institutes", "Hospitals",
  "Restaurants", "Gyms", "Startups", "NGOs",
  "Religious institutions", "Real estate businesses", "Personal brands"
];

const whyChooseUs = [
  "Modern responsive design", "Fast delivery & active starts", "Affordable pricing (Minimal costs)", 
  "Mobile-friendly websites", "Free hosting configuration", "Advanced SEO optimization"
];



const techStack = [
  "WordPress", "React", "HTML/CSS", "Shopify", "Adobe Premiere Pro", "Canva", "Figma"
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 pt-24 sm:pt-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <AnimatedSection>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase mb-4">
              Digital Excellence
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Our <span className="text-primary">Services & Solutions</span>
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-4">
              Empowering brands with cutting-edge web design, branding, and digital growth strategies tailored for your success.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-muted/20">
        <div className="container mx-auto">
          <SectionHeading badge="What We Offer" title="Comprehensive Digital Services" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <div className="glass-card p-6 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="text-primary group-hover:text-primary-foreground w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>

                  <div className="mb-5 flex-grow">
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {service.offerings.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4 mt-auto">
                    {service.id === "web-development" ? (
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <Link
                          to="/work?category=websites"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs rounded-xl bg-card border border-border text-foreground font-bold hover:bg-muted transition-all duration-300"
                        >
                          View Portfolio <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to="/pricing"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300"
                        >
                          Pricing
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to="/pricing"
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300"
                      >
                        Pricing <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Institution Solutions */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h2 className="font-display text-2xl font-bold mb-2">Tailored Institution Solutions</h2>
            <p className="text-muted-foreground text-sm">We build specialized digital ecosystems, AI automation, and maintenance services designed specifically for:</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {institutions.map((inst, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <div className="px-4 py-2 rounded-full border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center gap-1.5 shadow-sm">
                  <Building className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-xs">{inst}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-primary/5">
        <div className="container mx-auto">
          <SectionHeading badge="Our Advantage" title="Why Choose Us" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
            {whyChooseUs.map((reason, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="p-4 rounded-xl bg-card border border-border/50 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-xs">{reason}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>



      {/* Technologies */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Technologies We Use</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-4xl mx-auto opacity-70">
            {techStack.map((tech, idx) => (
              <span key={idx} className="font-display font-bold text-sm sm:text-base text-foreground/80">{tech}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
