import { supabase } from '@/lib/supabase';
import { Link } from "react-router-dom";
import { 
  Monitor, Video, Palette, Megaphone, TrendingUp, Building, ArrowRight, 
  CheckCircle2, ShieldCheck, Smartphone, Code, Bot, Wrench,
  ShoppingCart, Briefcase, User, LayoutTemplate, BookOpen, Share2, 
  FolderOpen, Film, GraduationCap, Heart, MessageSquare, Users
} from "lucide-react";
import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";

export const servicesData = [
  {
    id: "web-development",
    title: "Website Development",
    icon: Monitor,
    description: "Create a powerful online presence with websites designed to build trust, generate leads, and convert visitors into customers.",
    offerings: [
      "Business Websites",
      "Portfolio Websites",
      "Educational Institution Websites",
      "E-commerce Stores",
      "Landing Pages",
      "Website Optimization"
    ],
    buttons: [
      { text: "View Portfolio", url: "/work?category=websites", variant: "secondary" },
      { text: "View Pricing", url: "/pricing?service=web-development", variant: "primary" }
    ]
  },
  {
    id: "app-development",
    title: "App Development",
    icon: Smartphone,
    description: "Build modern mobile applications that deliver seamless user experiences and support long-term business growth.",
    offerings: [
      "Android Applications",
      "iOS Applications",
      "Cross-Platform Apps",
      "Custom Dashboards",
      "Payment Integrations",
      "App Deployment"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=app-development", variant: "primary" }
    ]
  },
  {
    id: "custom-software",
    title: "Custom Software",
    icon: Code,
    description: "Tailored software solutions built around your business workflows, helping teams work more efficiently and make better decisions.",
    offerings: [
      "Business Management Systems",
      "Booking Platforms",
      "Internal Dashboards",
      "CRM Solutions",
      "Workflow Automation",
      "Reporting Systems"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=custom-software", variant: "primary" }
    ]
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    icon: Bot,
    description: "Automate customer interactions and repetitive tasks using intelligent systems that save time and improve efficiency.",
    offerings: [
      "AI Chatbots",
      "WhatsApp Automation",
      "Lead Qualification",
      "Appointment Booking",
      "Knowledge Base Assistants",
      "Business Automation"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=ai-automation", variant: "primary" }
    ]
  },
  {
    id: "digital-branding-smm",
    title: "Branding & Social Media",
    icon: Megaphone,
    description: "Build a memorable brand identity and strengthen your presence across digital platforms.",
    offerings: [
      "Brand Strategy",
      "Social Media Management",
      "Content Planning",
      "Creative Assets",
      "Profile Optimization",
      "Growth Campaigns"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=digital-branding-smm", variant: "primary" }
    ]
  },
  {
    id: "seo-marketing",
    title: "SEO & Marketing",
    icon: TrendingUp,
    description: "Increase visibility, attract qualified traffic, and generate consistent leads through data-driven marketing strategies.",
    offerings: [
      "Local SEO",
      "Search Optimization",
      "Google Business Profile",
      "Content Strategy",
      "Paid Advertising",
      "Conversion Optimization"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=seo-marketing", variant: "primary" }
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: Palette,
    description: "Professional visual assets designed to strengthen your brand and improve communication.",
    offerings: [
      "Logo Design",
      "Social Media Creatives",
      "Brochures",
      "Business Cards",
      "Presentation Design",
      "Marketing Materials"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=graphic-design", variant: "primary" }
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: Video,
    description: "Professional editing services for creators, brands, and businesses looking to engage their audience through video.",
    offerings: [
      "Reels & Shorts",
      "YouTube Editing",
      "Promotional Videos",
      "Educational Content",
      "Motion Graphics",
      "Commercial Ads"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=video-editing", variant: "primary" }
    ]
  },
  {
    id: "website-maintenance",
    title: "Maintenance & Support",
    icon: Wrench,
    description: "Keep your website or application secure, updated, and performing at its best.",
    offerings: [
      "Security Monitoring",
      "Backups",
      "Performance Optimization",
      "Content Updates",
      "Technical Support",
      "Ongoing Maintenance"
    ],
    buttons: [
      { text: "View Pricing", url: "/pricing?service=website-maintenance", variant: "primary" }
    ]
  }
];

const institutions = [
  "Schools", "Colleges", "Coaching institutes", "Hospitals",
  "Restaurants", "Gyms", "Startups", "NGOs",
  "Religious institutions", "Real estate businesses", "Personal brands"
];

const whyChooseUs = [
  "Modern Digital Solutions",
  "Business-Focused Approach",
  "Transparent Communication",
  "Scalable Technologies",
  "Long-Term Support",
  "Global Service Standards"
];

const websiteTypes = [
  { name: "E-Commerce", icon: ShoppingCart, desc: "Online stores and digital marketplaces designed for high conversions." },
  { name: "Business", icon: Briefcase, desc: "Corporate identity and B2B platforms for professional services." },
  { name: "Personal", icon: User, desc: "Individual profiles, digital resumes, and personal branding." },
  { name: "Portfolio", icon: LayoutTemplate, desc: "Showcases for creative professionals to display their best work." },
  { name: "Blog", icon: BookOpen, desc: "Content-driven publishing platforms optimized for readership." },
  { name: "Social Media", icon: Share2, desc: "Community platforms fostering engagement and networking." },
  { name: "Directory", icon: FolderOpen, desc: "Categorized listings and robust search-driven portals." },
  { name: "Entertainment", icon: Film, desc: "Streaming platforms and interactive media consumption sites." },
  { name: "Educational", icon: GraduationCap, desc: "E-learning platforms and comprehensive course management." },
  { name: "Non-Profit", icon: Heart, desc: "Charity portals built for awareness and seamless donations." },
  { name: "Wiki / Forum", icon: MessageSquare, desc: "Collaborative knowledge bases and discussion boards." },
  { name: "Membership", icon: Users, desc: "Exclusive community-driven sites with gated premium content." },
];

export default function ServicesPage() {
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from('services').select('*');
        if (error) throw error;
        
        if (data && data.length > 0) {
          const parsed = data.map((s: any) => ({
            ...s,
            offerings: typeof s.offerings === 'string' ? JSON.parse(s.offerings || '[]') : (s.offerings || []),
            buttons: typeof s.buttons === 'string' ? JSON.parse(s.buttons || '[]') : (s.buttons || [])
          }));
          const uniqueServices = parsed.filter((service, index, self) => 
            index === self.findIndex((s) => s.title === service.title)
          );
          setDbServices(uniqueServices);
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  const displayServices = dbServices.length > 0 ? dbServices : servicesData;

  return (
    <>
      <SEO 
        title="Our Services" 
        description="From websites and mobile apps to AI automation and branding, we help businesses launch faster, operate smarter, and scale with confidence." 
        canonical="https://takeinstudio.com/services"
      />
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 pt-24 sm:pt-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <AnimatedSection>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase mb-4">
              Our Services
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Digital Solutions Built for <span className="text-primary">Growth</span>
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-4">
              From websites and mobile apps to AI automation and branding, we help businesses launch faster, operate smarter, and scale with confidence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-muted/20">
        <div className="container mx-auto">
          <SectionHeading badge="What We Offer" title="Comprehensive Digital Services" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {displayServices.map((service, index) => {
              // Handle dynamically loaded icon string or component
              const IconComponent = typeof service.icon === 'string' 
                ? [Monitor, Video, Palette, Megaphone, TrendingUp, Building, ArrowRight, CheckCircle2, ShieldCheck, Smartphone, Code, Bot, Wrench].find(i => i.displayName === service.icon || i.name === service.icon) || Monitor
                : service.icon;
                
              return (
              <AnimatedSection key={service.id || index} delay={index * 0.1}>
                <div className="glass-card p-6 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="text-primary group-hover:text-primary-foreground w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>

                  <div className="mb-6 flex-grow">
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {service.offerings.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border/50 pt-5 mt-auto">
                    <div className={`flex flex-col sm:flex-row gap-2.5 ${service.buttons.length === 1 ? 'justify-end' : ''}`}>
                      {service.buttons.map((btn: any, i: number) => (
                        <Link
                          key={i}
                          to={btn.url}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm sm:text-xs rounded-xl font-bold transition-all duration-300 ${
                            btn.variant === 'primary' 
                              ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20' 
                              : 'bg-card border border-border text-foreground hover:bg-muted'
                          }`}
                        >
                          {btn.text} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12 Types of Websites */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-background relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10" />
        
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AnimatedSection>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase mb-4">
                Web Architecture
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                The 12 Main Types of Websites
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Defined by their primary purpose and core functionality, we specialize in building these essential web platforms engineered for maximum impact and fully responsive across all devices.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {websiteTypes.map((type, idx) => {
              const Icon = type.icon;
              return (
                <AnimatedSection key={idx} delay={idx * 0.05}>
                  <div className="group relative p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                      <Icon className="w-16 h-16 text-primary" />
                    </div>
                    
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm relative z-10">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    
                    <h3 className="font-display font-bold text-base sm:text-lg mb-2 relative z-10">{type.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed relative z-10 flex-grow">
                      {type.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institution Solutions */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="font-display text-2xl font-bold mb-2">Tailored Institution Solutions</h2>
            <p className="text-muted-foreground text-sm">We build specialized digital ecosystems, AI automation, and maintenance services designed specifically for:</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {institutions.map((inst, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <div className="px-5 py-2.5 rounded-full border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center gap-1.5 shadow-sm">
                  <Building className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-sm sm:text-xs">{inst}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-primary/5">
        <div className="container mx-auto">
          <SectionHeading badge="Our Advantage" title="Why Choose TakeIN Studio" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            {whyChooseUs.map((reason, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="p-5 rounded-2xl bg-card border border-border/50 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-semibold text-sm">{reason}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
