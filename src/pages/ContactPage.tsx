import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

import { formatPriceRange } from "@/lib/currency";

const budgetOptions = [
  formatPriceRange(5000, 10000),
  formatPriceRange(10000, 25000),
  formatPriceRange(25000, 50000),
  "Custom Premium Plan"
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", budget: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", business: "", budget: "", message: "" });
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputClass =
    "w-full px-5 py-3.5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 text-sm";

  return (
    <>
      <section className="section-padding pt-32 sm:pt-40">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold">
              Let's <span className="text-primary">Build</span> Together
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Tell us about your project and we'll craft a tailored plan within 24 hours.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input value={form.name} onChange={update("name")} placeholder="Your Name" required className={inputClass} />
                  <input value={form.email} onChange={update("email")} type="email" placeholder="Email Address" required className={inputClass} />
                  <input value={form.phone} onChange={update("phone")} placeholder="Phone Number" className={inputClass} />
                  <input value={form.business} onChange={update("business")} placeholder="Business Type" className={inputClass} />
                </div>
                <select value={form.budget} onChange={update("budget")} className={`${inputClass} ${!form.budget ? "text-muted-foreground/60" : ""}`}>
                  <option value="">Select Budget Range</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className={`${inputClass} resize-none`}
                />
                <button type="submit" className="glow-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 text-sm">
                  Start Your Project <Send size={16} />
                </button>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.15} className="lg:col-span-2 space-y-6">
              <div className="clay-card p-8 space-y-6">
                <h3 className="font-display font-bold text-lg">Contact Info</h3>
                {[
                  { icon: Mail, label: "hello@takeinstudio.com" },
                  { icon: Phone, label: "+1 (555) 234-5678" },
                  { icon: MapPin, label: "San Francisco, CA" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="clay-card p-8 space-y-4">
                <h3 className="font-display font-bold text-lg">Office Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Monday – Friday: 9AM – 6PM PST</p>
                  <p>Saturday: By appointment</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
