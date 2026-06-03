import re

with open('src/pages/PricingPage.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update web-development pricing data
web_dev_data = """  "web-development": [
    {
      name: "Starter",
      price: "₹4,999",
      internationalPrice: "$299",
      description: "Perfect for getting your business online with a modern and responsive presence.",
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
      internationalPrice: "$899",
      description: "A premium digital experience tailored for growing brands looking to scale.",
      features: [
        "Premium custom website",
        "Advanced UI/UX",
        "Smooth animations",
        "SEO optimization",
        "CMS integration",
        "Gallery management",
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
      internationalPrice: "$1,999",
      description: "Advanced architectures for established businesses requiring dynamic operations.",
      features: [
        "Everything in Professional",
        "Admin dashboard",
        "Dynamic content management",
        "Database integration",
        "API integrations",
        "Advanced business workflows",
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
      description: "Massive scale custom software and automation for enterprise workflows.",
      features: [
        "AI integrations",
        "Business automation",
        "Internal dashboards",
        "CRM/ERP systems",
        "Custom software",
        "Scalable architecture",
        "Long-term support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ],"""

# Replace the web-development array using regex
code = re.sub(
    r'"web-development":\s*\[.*?\](?:,\n  "video-editing")',
    web_dev_data + '\n  "video-editing"',
    code,
    flags=re.DOTALL
)

# 2. Update React states & logic
old_logic = """  const [isOutsideIndia, setIsOutsideIndia] = useState<boolean>(false);

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
  };"""

new_logic = """  const [region, setRegion] = useState<"IN" | "INTL">("IN");

  const getPriceValue = (t: any) => {
    if (t.price === "Contact Sales" || t.internationalPrice === "Contact Sales") {
        return "Contact Sales";
    }
    if (region === "INTL" && t.internationalPrice) {
      return t.internationalPrice;
    }
    return t.price;
  };"""

code = code.replace(old_logic, new_logic)


# 3. Inject Toggle UI before the Categories tabs
toggle_ui = """      {/* Region Toggle */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="container mx-auto flex justify-center">
          <div className="bg-card border border-border/50 p-1.5 rounded-full flex items-center shadow-lg shadow-primary/5">
            <button
              onClick={() => setRegion("IN")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                region === "IN" 
                  ? "bg-primary text-primary-foreground shadow-md scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-lg">🇮🇳</span> India
            </button>
            <button
              onClick={() => setRegion("INTL")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                region === "INTL" 
                  ? "bg-primary text-primary-foreground shadow-md scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-lg">🌍</span> International
            </button>
          </div>
        </div>
      </section>

      {/* Categories Tabs */}"""

code = code.replace('      {/* Categories Tabs */}', toggle_ui)

with open('src/pages/PricingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Pricing page successfully updated.")
