import { supabase } from '@/lib/supabase';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, Info, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";



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

export const pricingData: Record<string, any[]> = {
  "web-development": [
    {
      "name": "Starter",
      "price": "\u20b94,999",
      "internationalPrice": "$499",
      "description": "Perfect for portfolios, freelancers, photographers, and local businesses.",
      "features": [
        "Modern responsive website",
        "Mobile optimization",
        "Contact form integration",
        "Basic SEO setup",
        "WhatsApp integration",
        "Domain & hosting connection",
        "30 days support"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Professional",
      "price": "\u20b914,999",
      "internationalPrice": "$1,499",
      "description": "Ideal for businesses seeking a stronger online presence and lead generation.",
      "features": [
        "Premium custom website",
        "Advanced UI/UX",
        "Smooth animations",
        "SEO optimization",
        "CMS integration",
        "Gallery/blog management",
        "Lead capture forms",
        "Performance optimization",
        "60 days support"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Business",
      "price": "\u20b929,999",
      "internationalPrice": "$3,999",
      "description": "Built for organizations requiring dashboards, integrations, and advanced functionality.",
      "features": [
        "Everything in Professional",
        "Admin dashboard",
        "Dynamic content management",
        "Database integration",
        "API integrations",
        "Business workflows",
        "Analytics setup",
        "Priority support"
      ],
      "cta": "Book Consultation",
      "popular": false
    },
    {
      "name": "Enterprise Custom",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "Tailored solutions for organizations with unique requirements and long-term growth plans.",
      "features": [
        "Custom software architecture",
        "AI integrations",
        "Business automation",
        "CRM/ERP integrations",
        "Internal dashboards",
        "Scalable infrastructure",
        "Long-term support plans"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "app-development": [
    {
      "name": "MVP App",
      "price": "\u20b924,999",
      "internationalPrice": "$1,499",
      "description": "Launch your core mobile application quickly.",
      "features": [
        "Cross-platform mobile app",
        "Modern UI",
        "User authentication",
        "Firebase integration",
        "Basic backend",
        "App deployment assistance",
        "30 days support"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Business App",
      "price": "\u20b959,999",
      "internationalPrice": "$4,999",
      "description": "Production-ready apps designed for seamless user experiences.",
      "features": [
        "Premium UI/UX",
        "Custom backend",
        "Database integration",
        "Push notifications",
        "Payment gateway integration",
        "Admin dashboard",
        "Analytics setup",
        "60 days support"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Growth App",
      "price": "\u20b91,49,999",
      "internationalPrice": "$9,999",
      "description": "Scalable mobile systems with advanced real-time functionality.",
      "features": [
        "Everything in Business",
        "Role-based access",
        "API integrations",
        "Real-time functionality",
        "Advanced dashboards",
        "Performance optimization",
        "Priority support"
      ],
      "cta": "Book Consultation",
      "popular": false
    },
    {
      "name": "Enterprise Application",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "Large-scale products and multi-platform ecosystems.",
      "features": [
        "AI-powered applications",
        "Multi-platform ecosystems",
        "Enterprise integrations",
        "Advanced automation",
        "Scalable architecture",
        "Dedicated project planning"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "custom-software": [
    {
      "name": "Starter Automation",
      "price": "\u20b914,999",
      "internationalPrice": "$999",
      "description": "Streamline basic workflows and save hours of manual data entry.",
      "features": [
        "Basic process automation",
        "Third-party API connections",
        "Simple webhooks",
        "Data syncing",
        "Basic error handling",
        "30 days support"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Business Platform",
      "price": "\u20b949,999",
      "internationalPrice": "$4,999",
      "description": "Custom internal tools and platforms for growing teams.",
      "features": [
        "Custom web application",
        "Admin control panel",
        "Database design",
        "Role-based authentication",
        "Complex API integrations",
        "Data visualization",
        "60 days support"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Enterprise Solutions",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "Massive scale architecture for global operations.",
      "features": [
        "Microservices architecture",
        "Legacy system modernization",
        "Advanced security protocols",
        "High-availability servers",
        "Custom ERP/CRM systems",
        "Dedicated engineering team"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "ai-automation": [
    {
      "name": "AI Starter",
      "price": "\u20b99,999",
      "internationalPrice": "$999",
      "description": "Introduce AI capabilities to your existing customer flows.",
      "features": [
        "Custom AI Chatbot integration",
        "OpenAI / Claude API setup",
        "Prompt engineering",
        "Basic customer support bot",
        "Contextual memory setup",
        "30 days support"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "AI Business",
      "price": "\u20b929,999",
      "internationalPrice": "$2,999",
      "description": "Advanced AI agents that perform actual tasks and workflows.",
      "features": [
        "AI Agent workflow automation",
        "Document parsing & RAG",
        "Custom fine-tuning consulting",
        "Multi-agent systems",
        "Internal knowledge base AI",
        "API workflow triggers",
        "60 days support"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Enterprise AI",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "Custom LLM deployments and highly secure AI infrastructure.",
      "features": [
        "On-premise / Secure LLM hosting",
        "Proprietary model training",
        "Complex data pipelines",
        "Enterprise security compliance",
        "Voice & Vision AI",
        "Dedicated AI architects"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "website-maintenance": [
    {
      "name": "Starter Care",
      "price": "\u20b92,499 / 3 Months",
      "internationalPrice": "$149 / 3 Months",
      "description": "Basic protection package to keep your digital assets running smoothly.",
      "features": [
        "Security monitoring",
        "Website/app health checks",
        "Backup management",
        "Minor content updates",
        "Bug fixes",
        "Email support"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Growth Care",
      "price": "\u20b94,999 / 6 Months",
      "internationalPrice": "$399 / 6 Months",
      "description": "Proactive care for active digital products and campaigns.",
      "features": [
        "Everything in Starter",
        "Priority support",
        "Performance optimization",
        "SEO health monitoring",
        "Database maintenance",
        "Content update assistance"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Business Care",
      "price": "\u20b99,999 / Year",
      "internationalPrice": "$999 / Year",
      "description": "Comprehensive annual coverage for mission-critical operations.",
      "features": [
        "Everything in Growth",
        "Advanced monitoring",
        "Faster issue resolution",
        "Quarterly optimization reviews",
        "Dedicated support channel",
        "Detailed maintenance reports"
      ],
      "cta": "Book Consultation",
      "popular": false
    },
    {
      "name": "Enterprise Support",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "Dedicated resources for massive scale architectures.",
      "features": [
        "Dedicated support plans",
        "Infrastructure management",
        "AI system maintenance",
        "Enterprise integrations",
        "Long-term roadmap consulting",
        "Priority response agreements"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "video-editing": [
    {
      "name": "Reels & Shorts",
      "price": "\u20b9999",
      "internationalPrice": "$49",
      "description": "High-retention short-form video editing for social platforms.",
      "features": [
        "Up to 60 seconds",
        "Dynamic captions",
        "Trending audio sync",
        "B-roll & transitions",
        "Color correction",
        "1 Revision"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Creator Pro",
      "price": "\u20b93,999",
      "internationalPrice": "$199",
      "description": "Professional long-form edits for YouTube and courses.",
      "features": [
        "Up to 15 minutes",
        "Multi-cam syncing",
        "Advanced motion graphics",
        "Audio mixing & leveling",
        "Thumbnail design",
        "3 Revisions"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Commercial & Ads",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "High-end cinematic editing for brands and advertising.",
      "features": [
        "Cinematic grading",
        "Advanced VFX",
        "Storyboarding",
        "Licensed premium music",
        "Format optimization",
        "Unlimited revisions"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "graphic-design": [
    {
      "name": "Social Design",
      "price": "\u20b9999",
      "internationalPrice": "$49",
      "description": "Eye-catching graphic creatives for your daily social media posts.",
      "features": [
        "2 Custom Post Designs",
        "Platform-specific sizing",
        "Brand color matching",
        "High-res delivery",
        "1 Revision"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Brand Identity",
      "price": "\u20b94,999",
      "internationalPrice": "$299",
      "description": "Professional logo and foundational branding assets.",
      "features": [
        "3 Custom Logo Concepts",
        "Brand Color Palette",
        "Typography Guidelines",
        "Business Card Design",
        "Social Media Kit",
        "3 Revisions"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Corporate Branding",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "Complete corporate identity for massive scale.",
      "features": [
        "Comprehensive Brand Book",
        "UI/UX Design Language",
        "Marketing Collaterals",
        "Presentation Templates",
        "Merchandise Design",
        "Unlimited Revisions"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "digital-branding-smm": [
    {
      "name": "Core Branding",
      "price": "\u20b92,999",
      "internationalPrice": "$149",
      "description": "Essential social media management to keep your profiles active.",
      "features": [
        "8 Posts per month",
        "Basic caption writing",
        "Hashtag research",
        "Monthly scheduling",
        "Basic engagement",
        "Monthly report"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Growth Strategy",
      "price": "\u20b99,999",
      "internationalPrice": "$499",
      "description": "Aggressive social media growth and community management.",
      "features": [
        "15 Posts + 4 Reels/mo",
        "Strategic copywriting",
        "Competitor analysis",
        "Active community engagement",
        "Ad campaign management",
        "Detailed analytics"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Brand Transformation",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "Full-scale digital marketing takeovers for large brands.",
      "features": [
        "Omnichannel strategy",
        "Dedicated Account Manager",
        "Daily posting & engagement",
        "Viral campaign creation",
        "Influencer outreach",
        "Real-time PR management"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ],
  "seo-marketing": [
    {
      "name": "Local SEO",
      "price": "\u20b94,999",
      "internationalPrice": "$299",
      "description": "Dominate local search results and Google My Business.",
      "features": [
        "Google My Business setup",
        "Local keyword targeting",
        "On-page optimization",
        "Basic directory listings",
        "Monthly rank tracking",
        "Technical SEO audit"
      ],
      "cta": "Start Project",
      "popular": false
    },
    {
      "name": "Growth SEO",
      "price": "\u20b914,999",
      "internationalPrice": "$899",
      "description": "Aggressive national SEO strategies for high traffic.",
      "features": [
        "Comprehensive keyword mapping",
        "Advanced on-page SEO",
        "High DA backlink building",
        "Content strategy & briefs",
        "Competitor gap analysis",
        "Speed optimization consulting"
      ],
      "cta": "Get Started",
      "popular": true
    },
    {
      "name": "Performance Marketing",
      "price": "Contact Sales",
      "internationalPrice": "Contact Sales",
      "description": "High-budget ROAS-focused ad campaigns and enterprise SEO.",
      "features": [
        "Google/Meta Ads management",
        "Enterprise site architecture",
        "Programmatic SEO",
        "Conversion Rate Optimization (CRO)",
        "A/B Testing",
        "Dedicated Marketing Lead"
      ],
      "cta": "Contact Sales",
      "popular": false
    }
  ]
};

export default function PricingPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("web-development");
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [dbPricing, setDbPricing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<"IN" | "INTL">("IN");

  useEffect(() => {
    setLoading(true);
    supabase.from('pricing').select('*')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setDbPricing(res.data);
          
          // Set active tab based on URL param if valid
          const params = new URLSearchParams(location.search);
          const serviceParam = params.get("service");
          if (serviceParam) {
            const normalizedParam = serviceParam.replace(/-/g, ' ').toLowerCase();
            const matchingCategory = res.data.find((p: any) => p.category.toLowerCase() === normalizedParam);
            if (matchingCategory) {
              setActiveTab(matchingCategory.category);
            }
          }
        }
      })
      .catch(err => console.error("CMS fetch error", err))
      .finally(() => setLoading(false));
  }, [location.search]);

  let displayCategories = [...categories];
  if (dbPricing.length > 0) {
      const dbCats = new Set(dbPricing.map(p => p.category));
      displayCategories = displayCategories.filter(c => dbCats.has(c.id));
      
      const existingIds = new Set(displayCategories.map(c => c.id));
      dbPricing.forEach(p => {
          if (p.category && !existingIds.has(p.category)) {
              existingIds.add(p.category);
              displayCategories.push({
                  id: p.category,
                  name: p.category.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
              });
          }
      });
  }

  const getPriceValue = (t: any) => {
    if (t.price === "Contact Sales" || t.internationalPrice === "Contact Sales") {
        return "Contact Sales";
    }
    if (region === "INTL" && t.internationalPrice) {
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
  }, [location.search]);

  const currentTiers = dbPricing.length > 0
    ? dbPricing
        .filter((p: any) => p.category === activeTab)
        .map((p: any) => ({
          name: p.name,
          price: p.price_in,
          internationalPrice: p.price_intl,
          description: p.description,
          features: p.features || [],
          cta: p.cta_text || "Contact Sales",
          popular: p.is_popular
        }))
    : (pricingData[activeTab] || pricingData["web-development"]);

  return (
    <div className="pt-20">
      
      {/* Compact Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="container mx-auto text-center max-w-3xl">
          <AnimatedSection>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
              Transparent Pricing for <span className="text-primary">Every Stage</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto mb-6">
              Choose the plan that fits your goals, budget, and business needs. From portfolio websites and mobile apps to AI automation and enterprise solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Badges - Conversion Booster */}
      <section className="px-4 pb-6">
        <div className="container mx-auto max-w-4xl flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> No hidden charges</div>
          <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Free consultation included</div>
          <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Domain & hosting billed separately</div>
          <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> India & International pricing</div>
        </div>
      </section>

      {/* Region Toggle & Tabs Header */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4 sticky top-16 z-40 bg-background/95 backdrop-blur-md pt-2 border-b border-border/40">
        <div className="container mx-auto flex flex-col items-center gap-4">
          <div className="bg-card border border-border/50 p-1 rounded-full flex items-center shadow-sm">
            <button
              onClick={() => setRegion("IN")}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                region === "IN" 
                  ? "bg-primary text-primary-foreground shadow-md scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-base">🇮🇳</span> India
            </button>
            <button
              onClick={() => setRegion("INTL")}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                region === "INTL" 
                  ? "bg-primary text-primary-foreground shadow-md scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-base">🌍</span> International
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-5xl">
            {displayCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 border border-border/50 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-muted/10">
        <div className="container mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 ${currentTiers.length === 4 ? "lg:grid-cols-4 max-w-6xl" : "lg:grid-cols-3 max-w-5xl"} gap-4 mx-auto`}>
            {currentTiers.map((t, i) => (
              <AnimatedSection key={`${activeTab}-${t.name}`} delay={i * 0.1}>
                <div
                  onMouseEnter={() => setHoveredTier(t.name)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={`clay-card p-5 h-full flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden bg-card/80 backdrop-blur-sm ${
                    t.popular ? "border-primary shadow-xl scale-[1.02] bg-gradient-to-b from-primary/10 to-transparent" : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  {t.popular && (
                    <div className="absolute top-0 right-0 left-0 flex justify-center">
                      <span className="bg-primary text-primary-foreground text-[9px] uppercase font-bold tracking-widest px-3 py-0.5 rounded-b-lg flex items-center gap-1 shadow-sm">
                        <Sparkles size={10} /> Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`mt-${t.popular ? '4' : '0'}`}>
                    <h3 className="font-display font-bold text-lg mb-1 text-foreground">{t.name}</h3>
                    
                    <div className="flex items-baseline gap-2 mt-3 mb-2">
                      <span className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${t.popular ? "text-primary" : "text-foreground"}`}>
                        {getPriceValue(t)}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-[11px] leading-relaxed mb-4 min-h-[40px]">{t.description}</p>

                    <div className="border-t border-border/50 pt-4 mb-5">
                      <p className="text-[10px] font-bold text-foreground/80 uppercase tracking-widest mb-3 flex items-center gap-1">
                        What's included
                      </p>
                      <ul className="space-y-2">
                        {t.features.map((f: string) => (
                          <li key={f} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
                            <Check size={14} className="text-primary mt-0 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to={`/contact?plan=${encodeURIComponent(t.name)}&service=${encodeURIComponent(activeTab)}&price=${encodeURIComponent(getPriceValue(t))}`}
                    className="group relative w-full py-2.5 rounded-lg text-xs font-bold tracking-wide text-center transition-all duration-300 flex items-center justify-center overflow-hidden bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {t.cta} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Trust Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="clay-card border border-border/50 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-card to-muted/20">
              <div className="text-center mb-6">
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-display font-bold">Why Choose TakeIN Studio</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> Transparent pricing</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> Modern premium designs</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> SEO-ready development</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> Scalable business solutions</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> Fast communication</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> India & International support</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Disclaimer */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground/70 italic leading-relaxed">
            <span className="font-semibold text-muted-foreground">Pricing Disclaimer:</span> Development and service fees only. Domain registration, hosting, cloud services, API usage fees, advertising budgets, software subscriptions, premium plugins, App Store fees, and third-party services are billed separately and are not included in project pricing.
          </p>
        </div>
      </section>

    </div>
  );
}
