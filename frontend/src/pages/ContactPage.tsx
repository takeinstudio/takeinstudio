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
  const [activeTab, setActiveTab] = useState<"call" | "details">("call");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    business: "", 
    budget: "", 
    message: "",
    date: "",
    timeSlot: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for now — will connect to backend in Phase 3
    setTimeout(() => {
      setLoading(false);
      toast.success(
        activeTab === "call" 
          ? "Call request received! Check your email for the Google Meet link shortly 🚀" 
          : "Details received! We'll review and get back within 24 hours."
      );
      setForm({ name: "", email: "", phone: "", business: "", budget: "", message: "", date: "", timeSlot: "" });
    }, 1500);
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              Global Remote Studio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold">
              Let's <span className="text-primary">Collaborate</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Trusted by businesses globally. Choose how you want to start your journey.
            </p>

            <div className="flex justify-center mt-10">
              <div className="inline-flex p-1 bg-muted rounded-2xl border border-border/50">
                <button 
                  onClick={() => setActiveTab("call")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "call" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Book a Strategy Call
                </button>
                <button 
                  onClick={() => setActiveTab("details")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "details" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Send Project Details
                </button>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-5 relative overflow-hidden">
                {activeTab === "call" ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Full Name</label>
                        <input value={form.name} onChange={update("name")} placeholder="Your Name" required className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Email Address</label>
                        <input value={form.email} onChange={update("email")} type="email" placeholder="john@example.com" required className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Preferred Date</label>
                        <input type="date" value={form.date} onChange={update("date")} required className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Time Slot</label>
                        <select value={form.timeSlot} onChange={update("timeSlot")} required className={inputClass}>
                          <option value="">Select Time</option>
                          <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                          <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                          <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Anything specific to discuss?</label>
                      <textarea
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Goals, pain points, or project vision..."
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <button type="submit" disabled={loading} className="glow-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 py-4 text-sm font-bold shadow-glow disabled:opacity-50">
                      {loading ? "Requesting Call..." : "Confirm Strategy Call"} <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <input value={form.name} onChange={update("name")} placeholder="Your Name" required className={inputClass} />
                      <input value={form.email} onChange={update("email")} type="email" placeholder="Email Address" required className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <input value={form.phone} onChange={update("phone")} placeholder="Phone Number" className={inputClass} />
                      <select value={form.budget} onChange={update("budget")} className={inputClass} required>
                        <option value="">Project Budget</option>
                        <option value="10k-25k">₹10,000 - ₹25,000 ($300 - $800)</option>
                        <option value="25k-50k">₹25,000 - ₹50,000 ($800 - $1.5k)</option>
                        <option value="50k+">₹50,000+ ($1.5k+)</option>
                        <option value="custom">Custom Scale</option>
                      </select>
                    </div>
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us about your project requirements..."
                      rows={5}
                      required
                      className={`${inputClass} resize-none`}
                    />
                    <button type="submit" disabled={loading} className="glow-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 py-4 text-sm font-bold shadow-glow disabled:opacity-50">
                      {loading ? "Sending Details..." : "Send Project Details"} <Send size={16} />
                    </button>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest border-t border-border/30">
                  <span>✔ Free Consultation</span>
                  <span>✔ No Obligation</span>
                  <span>✔ Global Availability</span>
                </div>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.15} className="lg:col-span-2 space-y-6">
              <div className="clay-card p-8 space-y-6">
                <h3 className="font-display font-bold text-lg">Global Presence</h3>
                {[
                  { icon: Mail, label: "takeinstudio@gmail.com" },
                  { icon: Globe, label: "Available Worldwide (US, UK, Asia)" },
                  { icon: Clock, label: "Response within 24 Hours" },
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
                <h3 className="font-display font-bold text-lg">Digital Workspace</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Operating as a Global Remote Studio, we collaborate with clients via <strong>Google Meet, Slack, and Trello</strong>. Distance is no barrier to excellence.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
