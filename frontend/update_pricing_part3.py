import re

with open('src/pages/PricingPage.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

maintenance_dev = """  "website-maintenance": [
    {
      name: "Starter Care",
      price: "₹2,499 / 3 Months",
      internationalPrice: "$149 / 3 Months",
      description: "Basic protection package to keep your digital assets running smoothly.",
      bestFor: "Portfolios, photographers, freelancers, and small businesses",
      features: [
        "Security monitoring",
        "Website/app health checks",
        "Backup management",
        "Minor content updates",
        "Bug fixes",
        "Email support"
      ],
      cta: "Get Protection",
      popular: false
    },
    {
      name: "Growth Care",
      price: "₹4,999 / 6 Months",
      internationalPrice: "$399 / 6 Months",
      description: "Proactive care for active digital products and campaigns.",
      bestFor: "Active business websites and applications",
      features: [
        "Everything in Starter",
        "Priority support",
        "Performance optimization",
        "SEO health monitoring",
        "Database maintenance",
        "Content update assistance"
      ],
      cta: "Get Growth Care",
      popular: true
    },
    {
      name: "Business Care",
      price: "₹9,999 / Year",
      internationalPrice: "$999 / Year",
      description: "Comprehensive annual coverage for mission-critical operations.",
      bestFor: "Businesses relying on their website or application daily",
      features: [
        "Everything in Growth",
        "Advanced monitoring",
        "Faster issue resolution",
        "Quarterly optimization reviews",
        "Dedicated support channel",
        "Detailed maintenance reports"
      ],
      cta: "Get Business Care",
      popular: false
    },
    {
      name: "Enterprise Support",
      price: "Contact Sales",
      internationalPrice: "Contact Sales",
      description: "Dedicated resources for massive scale architectures.",
      bestFor: "Organizations requiring long-term maintenance and technical assistance",
      features: [
        "Dedicated support plans",
        "Infrastructure management",
        "AI system maintenance",
        "Enterprise integrations",
        "Long-term roadmap consulting",
        "Priority response agreements"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]"""

# Replace website-maintenance
code = re.sub(
    r'"website-maintenance":\s*\[.*?\](?:,\n  "video-editing")',
    maintenance_dev + ',\n  "video-editing"',
    code,
    flags=re.DOTALL
)

with open('src/pages/PricingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Pricing page part 3 (Maintenance) successfully updated.")
