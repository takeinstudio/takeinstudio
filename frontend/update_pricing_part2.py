import re
import json

with open('src/pages/PricingPage.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Update web-development
web_dev = """  "web-development": [
    {
      name: "Starter",
      price: "₹4,999",
      internationalPrice: "$499",
      description: "Get your business online quickly and securely.",
      bestFor: "Portfolios, photographers, freelancers, local businesses",
      features: [
        "Modern responsive website",
        "Mobile optimization",
        "Contact form integration",
        "Basic SEO setup",
        "WhatsApp integration",
        "Domain & hosting connection",
        "30 days support"
      ],
      cta: "Start Project",
      popular: false
    },
    {
      name: "Professional",
      price: "₹14,999",
      internationalPrice: "$1,499",
      description: "A premium digital experience tailored for growing brands.",
      bestFor: "Small businesses, restaurants, agencies, clinics",
      features: [
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
      cta: "Go Professional",
      popular: true
    },
    {
      name: "Business",
      price: "₹29,999",
      internationalPrice: "$3,999",
      description: "Advanced architectures requiring dynamic operations.",
      bestFor: "Schools, startups, organizations, dashboard-based websites",
      features: [
        "Everything in Professional",
        "Admin dashboard",
        "Dynamic content management",
        "Database integration",
        "API integrations",
        "Business workflows",
        "Analytics setup",
        "Priority support"
      ],
      cta: "Scale Business",
      popular: false
    },
    {
      name: "Enterprise Custom",
      price: "Contact Sales",
      internationalPrice: "Contact Sales",
      description: "Massive scale custom software and automation.",
      bestFor: "SaaS, AI platforms, large-scale business systems",
      features: [
        "Custom software architecture",
        "AI integrations",
        "Business automation",
        "CRM/ERP integrations",
        "Internal dashboards",
        "Scalable infrastructure",
        "Long-term support plans"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]"""

# Update app-development
app_dev = """  "app-development": [
    {
      name: "MVP App",
      price: "₹24,999",
      internationalPrice: "$1,499",
      description: "Launch your core mobile application quickly.",
      bestFor: "Startups, creators, validation-stage products",
      features: [
        "Cross-platform mobile app",
        "Modern UI",
        "User authentication",
        "Firebase integration",
        "Basic backend",
        "App deployment assistance",
        "30 days support"
      ],
      cta: "Launch MVP",
      popular: false
    },
    {
      name: "Business App",
      price: "₹59,999",
      internationalPrice: "$4,999",
      description: "Production-ready apps designed for seamless user experiences.",
      bestFor: "Businesses requiring production-ready apps",
      features: [
        "Premium UI/UX",
        "Custom backend",
        "Database integration",
        "Push notifications",
        "Payment gateway integration",
        "Admin dashboard",
        "Analytics setup",
        "60 days support"
      ],
      cta: "Build Business App",
      popular: true
    },
    {
      name: "Growth App",
      price: "₹1,49,999",
      internationalPrice: "$9,999",
      description: "Scalable mobile systems with advanced real-time functionality.",
      bestFor: "Scalable apps with advanced functionality",
      features: [
        "Everything in Business",
        "Role-based access",
        "API integrations",
        "Real-time functionality",
        "Advanced dashboards",
        "Performance optimization",
        "Priority support"
      ],
      cta: "Scale App",
      popular: false
    },
    {
      name: "Enterprise Application",
      price: "Contact Sales",
      internationalPrice: "Contact Sales",
      description: "Ecosystems and multi-platform networks.",
      bestFor: "Large-scale products and ecosystems",
      features: [
        "AI-powered applications",
        "Multi-platform ecosystems",
        "Enterprise integrations",
        "Advanced automation",
        "Scalable architecture",
        "Dedicated project planning"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]"""

# Replace web-development
code = re.sub(
    r'"web-development":\s*\[.*?\](?:,\n  "video-editing")',
    web_dev + ',\n  "video-editing"',
    code,
    flags=re.DOTALL
)

# Replace app-development
code = re.sub(
    r'"app-development":\s*\[.*?\](?:,\n  "custom-software")',
    app_dev + ',\n  "custom-software"',
    code,
    flags=re.DOTALL
)

# Inject Best For UI
best_for_ui = """                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold font-display">{getPriceValue(t)}</span>
                    </div>

                    {t.bestFor && (
                      <p className="text-[10px] text-muted-foreground italic mb-4 leading-snug">
                        <span className="font-semibold text-foreground not-italic">Best For: </span>{t.bestFor}
                      </p>
                    )}"""

code = code.replace("""                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold font-display">{getPriceValue(t)}</span>
                    </div>""", best_for_ui)

# Inject Disclaimer UI
disclaimer_ui = """      {/* Pricing Disclaimer */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground italic leading-relaxed border-t border-border/50 pt-4">
            <span className="font-bold">Pricing Disclaimer:</span> Development services only. Domain registration, hosting, cloud services, API usage fees, App Store/Play Store fees, third-party subscriptions, and premium software licenses are billed separately and are not included in project pricing.
          </p>
        </div>
      </section>

      {/* Trust Quote / Banner */}"""

code = code.replace('      {/* Trust Quote / Banner */}', disclaimer_ui)

with open('src/pages/PricingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Pricing page part 2 successfully updated.")
