import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, Info, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";

const categories = [
  { id: "web-development", name: "Web Development" },
  { id: "app-development", name: "App Development" },
  { id: "custom-software", name: "Custom Software" },
  { id: "ai-automation", name: "AI Automation" },
  { id: "website-maintenance", name: "Maintenance & Support" },
  { id: "video-editing", name: "Video Editing" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "digital-branding-smm", name: "Branding & SMM" },
  { id: "seo-marketing", name: "SEO & Marketing" }
];

const pricingData: Record<string, any[]> = {
  "web-development": [
    {
      name: "Basic",
      price: "₹6,999",
      internationalPrice: "$199",
      description: "Ideal for startups and local businesses seeking a premium web presence quickly and securely. Includes 5 UI/UX slides.",
      features: [
        "Custom 3-Page Website Design",
        "Tailwind-native responsive layout",
        "Full SEO Setup & Meta Tags",
        "Free Hosting Setup & Domain Link",
        "Contact Form Integration",
        "Mobile-first optimization",
        "60 Days standard maintenance",
        "5 UI/UX Slides",
      ],
      cta: "Launch Now",
      popular: false
    },
    {
      name: "Premium Webdesign",
      price: "₹14,999",
      internationalPrice: "$599",
      description: "Full website design with rich animations and API integrations.",
      features: [
        "Up to 8 Pages tailored UI system",
        "Advanced motion design & transitions",
        "Advanced SEO & Speed Optimization",
        "Cloud Hosting & Domain Setup",
        "Headless CMS integration",
        "Contact forms & database dashboards",
        "Custom backend API integrations",
        "120 Days dedicated team support"
      ],
      cta: "Scale Studio",
      popular: true
    },
    {
      name: "Enterprise Custom",
      price: "Custom",
      internationalPrice: "Custom Tier",
      description: "For corporate structures needing zero-trust security setups, high-concurrency microservices, and design systems.",
      features: [
        "Unlimited pages & platform builds",
        "Dedicated senior engineers & architect",
        "Real-time analytics & database pipelines",
        "Penetration testing & secure hosting",
        "Custom CRM/ERP connection layers",
        "SLA support with 24-hour response"
      ],
      cta: "Contact Architect",
      popular: false
    }
  ],
  "video-editing": [
    {
      name: "Reels & Shorts",
      price: "₹999",
      internationalPrice: "$49",
      description: "High-retention short-form video editing for Instagram Reels, TikTok, and YouTube Shorts.",
      features: [
        "Up to 60 seconds duration",
        "Engaging captions & subtitles",
        "Trending audio & sound design",
        "Motion graphics & B-roll",
        "Color correction & grading",
        "2 Revisions included"
      ],
      cta: "Start Creating",
      popular: false
    },
    {
      name: "YouTube Standard",
      price: "₹3,999",
      internationalPrice: "$199",
      description: "Professional long-form video editing designed for YouTube creators and educational content.",
      features: [
        "Up to 15 minutes duration",
        "Intros, outros & lower thirds",
        "Advanced audio mixing & leveling",
        "Multi-cam syncing & cuts",
        "Thumbnail design included",
        "3 Revisions included"
      ],
      cta: "Grow Channel",
      popular: true
    },
    {
      name: "Cinematic & Ads",
      price: "Custom",
      internationalPrice: "Project Based",
      description: "High-end cinematic editing and motion graphics for promotional videos and commercial ads.",
      features: [
        "Advanced VFX & Motion Graphics",
        "Storyboarding & creative direction",
        "Licensed premium music tracks",
        "4K/8K High-bitrate delivery",
        "Format optimization for all platforms",
        "Unlimited revisions"
      ],
      cta: "Discuss Project",
      popular: false
    }
  ],
  "graphic-design": [
    {
      name: "Social Media Kit",
      price: "₹499",
      internationalPrice: "$29",
      description: "Eye-catching graphic creatives for your daily social media posts and stories.",
      features: [
        "1 Custom Post/Story Design",
        "Platform-specific sizing",
        "Brand color & typography matching",
        "High-res PNG/JPG delivery",
        "Source file included",
        "1 Revision"
      ],
      cta: "Get Design",
      popular: false
    },
    {
      name: "Brand Identity",
      price: "₹999",
      internationalPrice: "$49",
      description: "Professional logo design and foundational branding assets for new businesses.",
      features: [
        "3 Custom Logo Concepts",
        "Primary & Secondary Logos",
        "Brand Color Palette & Typography",
        "Business Card & Letterhead",
        "Social Media Profile Kits",
        "All vector source files"
      ],
      cta: "Build Brand",
      popular: true
    },
    {
      name: "Full Corporate Kit",
      price: "Custom",
      internationalPrice: "Project Based",
      description: "Complete corporate design covering brochures, presentations, UI kits, and extensive branding.",
      features: [
        "Comprehensive Brand Guidelines",
        "Custom Illustrations & Iconography",
        "Company Profile / Brochure Design",
        "Pitch Deck / Presentation Design",
        "Merchandise & Packaging Mockups",
        "Dedicated Art Director"
      ],
      cta: "Contact Agency",
      popular: false
    }
  ],
  "digital-branding-smm": [
    {
      name: "Core Branding",
      price: "₹1,499",
      internationalPrice: "$99",
      description: "Establish a consistent and professional digital presence across your primary platforms.",
      features: [
        "Brand Audit & Consultation",
        "Social Media Profile Optimization",
        "Basic Content Strategy",
        "Brand Voice Guidelines",
        "Competitor Analysis",
        "Monthly Performance Report"
      ],
      cta: "Start Branding",
      popular: false
    },
    {
      name: "Growth Strategy",
      price: "₹4,999",
      internationalPrice: "$299",
      description: "Aggressive digital positioning and cohesive brand aesthetics to dominate your market.",
      features: [
        "Advanced Content Strategy",
        "Ad Creative Direction",
        "Influencer Outreach Plan",
        "Community Management Framework",
        "Cross-platform Content Calendar",
        "Bi-weekly Strategy Calls"
      ],
      cta: "Scale Brand",
      popular: true
    },
    {
      name: "Complete Makeover",
      price: "Custom",
      internationalPrice: "Project Based",
      description: "End-to-end brand transformation including repositioning, full content production, and PR.",
      features: [
        "Complete Rebranding Strategy",
        "Omnichannel Marketing Plan",
        "High-end Video & Photo Production",
        "Executive Branding & PR",
        "Crisis Management Protocol",
        "Dedicated Brand Manager"
      ],
      cta: "Transform Brand",
      popular: false
    }
  ],
  "seo-marketing": [
    {
      name: "Local SEO Starter",
      price: "₹3,999",
      internationalPrice: "$199",
      description: "Get your local business ranking on Google Maps and local search results.",
      features: [
        "Google My Business Optimization",
        "Local Keyword Research",
        "On-page SEO for 5 Pages",
        "Local Citations & Directory Listings",
        "Basic Backlink Strategy",
        "Monthly Ranking Report"
      ],
      cta: "Rank Locally",
      popular: false
    },
    {
      name: "National SEO Growth",
      price: "₹7,999",
      internationalPrice: "$399",
      description: "Comprehensive SEO campaigns to drive organic traffic and qualified leads on a larger scale.",
      features: [
        "In-depth Technical SEO Audit",
        "Advanced Keyword & Content Gap Analysis",
        "On-page SEO for up to 20 Pages",
        "High-Authority Link Building",
        "Blog Content Strategy & Briefs",
        "Conversion Rate Optimization (CRO)"
      ],
      cta: "Dominate Search",
      popular: true
    },
    {
      name: "Full Ad Management",
      price: "Custom",
      internationalPrice: "Retainer",
      description: "Data-driven paid search and social media marketing campaigns for maximum ROI.",
      features: [
        "Google, Meta & LinkedIn Ads",
        "Custom Audience & Retargeting Setup",
        "A/B Testing & Ad Copywriting",
        "Landing Page Optimization",
        "Advanced Analytics & Tracking setup",
        "Dedicated Media Buyer"
      ],
      cta: "Maximize ROI",
      popular: false
    }
  ],
  "app-development": [
    {
      name: "Starter App",
      price: "₹24,999",
      internationalPrice: "$899",
      description: "Ideal for small businesses needing a robust mobile presence on Android and iOS.",
      features: [
        "Cross-platform (React Native/Flutter)",
        "Up to 5 Core Screens",
        "Basic Firebase Backend",
        "User Authentication",
        "App Store Submission",
        "30 Days Free Support"
      ],
      cta: "Build App",
      popular: false
    },
    {
      name: "Pro Application",
      price: "₹49,999",
      internationalPrice: "$1499",
      description: "Advanced applications with custom backends, payments, and rich animations.",
      features: [
        "Custom UI/UX App Design",
        "Node.js/Python Backend",
        "Payment Gateway Integration",
        "Push Notifications & Chat",
        "Admin Dashboard Included",
        "90 Days Maintenance & Support"
      ],
      cta: "Scale Mobile",
      popular: true
    },
    {
      name: "Enterprise Native",
      price: "Custom",
      internationalPrice: "Project Based",
      description: "Complex scalable applications tailored for massive user bases and enterprise workflows.",
      features: [
        "Native Android & Swift iOS",
        "Microservices Architecture",
        "Advanced Security & Encryption",
        "AI/ML Integrations",
        "Continuous CI/CD Pipeline",
        "Dedicated Engineering Team"
      ],
      cta: "Contact Team",
      popular: false
    }
  ],
  "custom-software": [
    {
      name: "Starter Automation",
      price: "₹19,999",
      internationalPrice: "$699",
      description: "Simple internal tools and automation scripts to streamline repetitive tasks.",
      features: [
        "Single workflow automation",
        "Basic internal dashboard",
        "Third-party API integration (up to 2)",
        "User authentication",
        "30 Days Support"
      ],
      cta: "Automate Tasks",
      popular: false
    },
    {
      name: "Business Platform",
      price: "₹59,999",
      internationalPrice: "$1999",
      description: "Custom booking platforms and specialized internal tools tailored to your business.",
      features: [
        "Custom booking/management system",
        "Role-based access control",
        "Payment gateway integration",
        "Automated email/SMS notifications",
        "Data analytics dashboard",
        "90 Days Maintenance"
      ],
      cta: "Build Platform",
      popular: true
    },
    {
      name: "Enterprise ERP",
      price: "Custom",
      internationalPrice: "Project Based",
      description: "Full-scale ERP and CRM systems to manage your entire business operations.",
      features: [
        "Comprehensive ERP/CRM modules",
        "Legacy system migration",
        "Advanced data visualization",
        "Custom mobile app companion",
        "High-availability cloud setup",
        "Dedicated engineering team"
      ],
      cta: "Contact Architect",
      popular: false
    }
  ],
  "ai-automation": [
    {
      name: "Starter",
      price: "₹14,999",
      internationalPrice: "$599",
      description: "Basic intelligent AI chatbot for websites or WhatsApp to handle standard customer queries.",
      features: [
        "Website AI chatbot",
        "Basic WhatsApp automation",
        "Standard FAQ knowledge base",
        "Lead capture functionality",
        "Up to 500 monthly interactions",
        "30 Days Support"
      ],
      cta: "Automate Now",
      popular: false
    },
    {
      name: "Business",
      price: "₹24,999",
      internationalPrice: "$899",
      description: "Advanced AI automation system with CRM integrations and complex conversation flows.",
      features: [
        "Advanced WhatsApp & Web Bots",
        "Lead generation & qualification bots",
        "Appointment booking automation",
        "CRM & API integrations",
        "Custom knowledge base",
        "90 Days Maintenance"
      ],
      cta: "Scale Support",
      popular: true
    },
    {
      name: "Premium",
      price: "₹49,999+",
      internationalPrice: "Custom Tier",
      description: "Enterprise-grade intelligent automation covering all customer touchpoints and internal workflows.",
      features: [
        "Omnichannel AI support systems",
        "Complex workflow automation",
        "Internal knowledge base assistants",
        "Advanced analytics & reporting",
        "Unlimited custom integrations",
        "Dedicated account manager"
      ],
      cta: "Contact Architect",
      popular: false
    }
  ],
  "website-maintenance": [
    {
      name: "Basic",
      price: "₹2,999/mo",
      internationalPrice: "$36/mo",
      description: "Essential ongoing maintenance to keep your website secure, fast, and operational.",
      features: [
        "Monthly security monitoring",
        "Regular weekly backups",
        "Basic performance optimization",
        "Core plugin & theme updates",
        "Uptime monitoring",
        "Basic monthly report"
      ],
      cta: "Start Basic",
      popular: false
    },
    {
      name: "Growth",
      price: "₹4,999/mo",
      internationalPrice: "$60/mo",
      description: "Proactive management with content updates and faster technical support.",
      features: [
        "Daily automated backups",
        "Advanced security monitoring",
        "Up to 2 hrs content updates/mo",
        "Priority bug fixes & troubleshooting",
        "Database optimization",
        "Detailed monthly reporting"
      ],
      cta: "Get Growth",
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹9,999/mo",
      internationalPrice: "$120/mo",
      description: "Comprehensive care plan for complex platforms requiring constant updates and high security.",
      features: [
        "Real-time security & backups",
        "Unlimited content updates",
        "Full hosting management",
        "Dedicated technical support",
        "Custom performance tuning",
        "Weekly strategy & reports"
      ],
      cta: "Get Enterprise",
      popular: false
    }
  ]
};



export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<string>("web-development");
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const location = useLocation();

  const [isOutsideIndia, setIsOutsideIndia] = useState<boolean>(false);

  useEffect(() => {
    // Determine location using IP API
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code && data.country_code !== 'IN') {
          setIsOutsideIndia(true);
        }
      })
      .catch(err => {
        console.error("Failed to fetch location", err);
        // Fallback to USD pricing if blocked
        setIsOutsideIndia(true);
      });
  }, []);

  const getPriceValue = (t: any) => {
    if (isOutsideIndia && t.internationalPrice) {
      return t.internationalPrice;
    }
    return t.price;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service");
    if (serviceParam && pricingData[serviceParam]) {
      setActiveTab(serviceParam);
    }
  }, [location]);

  const currentTiers = pricingData[activeTab] || pricingData["web-development"];

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-8 pt-24 sm:pt-28">
        <div className="container mx-auto text-center max-w-3xl">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Active Project Starts & Minimal Costs
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Invest in <span className="text-primary">Performance</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
              We are actively accepting new web projects with 100% positive feedback! Get modern, premium websites at minimal costs, with complete hosting setup and SEO optimization included.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 border-b border-border/50 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${activeTab === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                  : "bg-card border border-border/50 text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 pt-2 bg-muted/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {currentTiers.map((t, i) => (
              <AnimatedSection key={`${activeTab}-${t.name}`} delay={i * 0.1}>
                <div
                  onMouseEnter={() => setHoveredTier(t.name)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={`clay-card p-5 h-full flex flex-col justify-between border-2 transition-all duration-500 relative overflow-hidden ${t.popular ? "border-primary shadow-glow scale-[1.02] bg-primary/5" : "border-transparent"
                    }`}
                >
                  {t.popular && (
                    <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles size={8} /> Popular
                    </span>
                  )}

                  <div>
                    <h3 className="font-display font-bold text-lg mb-1">{t.name}</h3>
                    <p className="text-muted-foreground text-[11px] leading-snug mb-4 h-10">{t.description}</p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold font-display">{getPriceValue(t)}</span>
                    </div>

                    <div className="border-t border-border/30 pt-4 mb-5">
                      <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-3">Included Features</p>
                      <ul className="space-y-1.5">
                        {t.features.map((f: string) => (
                          <li key={f} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
                            <Check size={12} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to={`/contact?plan=${encodeURIComponent(t.name)}&service=${encodeURIComponent(activeTab)}&price=${encodeURIComponent(getPriceValue(t))}`}
                    className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center gap-1.5 bg-primary text-primary-foreground hover:scale-[1.02]"
                  >
                    Connect with us <ArrowRight size={12} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote / Banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-primary/10 bg-primary/5">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm">Need a completely tailored setup?</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Let's book a custom strategy session to scope out complex system builds, custom integrations, or long-term product roadmaps.</p>
                </div>
              </div>
              <Link to="/contact" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex-shrink-0">
                Book Consultation
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>


    </>
  );
}
