import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Send, Mail, Globe, Clock, Phone, MessageSquare, User, Building2, CheckCircle2, X, Instagram } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";


export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan");
  const selectedService = searchParams.get("service");
  const selectedPrice = searchParams.get("price");

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "",
    message: ""
  });

  const getMessageBody = () => {
    let body = `Name: ${form.name}
`;
    if (form.company) body += `Company: ${form.company}
`;
    body += `Email: ${form.email}
`;
    body += `Phone: ${form.phone}
`;
    if (selectedPlan) {
      body += `
--- Selected Plan ---
Service: ${selectedService}
Plan: ${selectedPlan}
Price: ${selectedPrice}
----------------------

`;
    }
    body += `Budget: ${form.budget}

Project Details:
${form.message}`;
    return encodeURIComponent(body);
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.message) return false;
    if (!selectedPlan && !form.budget) return false;
    return true;
  };

  const handleEmail = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields first.");
      return;
    }
    window.location.href = `mailto:takeinstudio@gmail.com?subject=New Inquiry from ${form.name}&body=${getMessageBody()}`;
  };

  const handleWhatsApp = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields first.");
      return;
    }
    window.open(`https://wa.me/918908233590?text=${getMessageBody()}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Save to localStorage for Admin Dashboard
    const newEnquiry = {
      id: "enq-" + Math.floor(Math.random() * 1000000),
      name: form.name,
      company: form.company || "N/A",
      type: selectedService ? `${selectedService} (${selectedPlan})` : "General Inquiry",
      budget: selectedPrice ? selectedPrice : form.budget,
      email: form.email,
      desc: form.message,
      date: new Date().toISOString().split('T')[0],
      status: "New"
    };
    
    const existing = JSON.parse(localStorage.getItem("takein_enquiries") || "[]");
    localStorage.setItem("takein_enquiries", JSON.stringify([newEnquiry, ...existing]));

    setTimeout(() => {
      setLoading(false);
      toast.success("Message received! We'll get back to you within 24 hours 🚀");
      setShowSuccess(true);
      setForm({ name: "", company: "", email: "", phone: "", budget: "", message: "" });
    }, 1500);
  };
const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-card border border-border/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all duration-300 text-sm";

  const labelClass = "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5";

  return (
    <>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-widest uppercase mb-5">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Let's <span className="text-primary">Work Together</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
              Share your project details and we'll get back to you within <strong>24 hours</strong> with a free consultation.
            </p>
          </AnimatedSection>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Form — takes 2/3 width */}
            <AnimatedSection className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">


                {/* Section label */}
                {selectedPlan && (
                  <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl mb-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1">Selected Plan</h3>
                        <p className="font-display font-bold text-xl text-foreground capitalize">{decodeURIComponent(selectedPlan).replace(/-/g, " ")}</p>
                        <p className="text-sm font-semibold text-muted-foreground mt-1 capitalize">{decodeURIComponent(selectedService || "").replace(/-/g, " ")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Price</p>
                        <p className="font-display font-bold text-lg text-foreground">{decodeURIComponent(selectedPrice || "")}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-primary/10 flex justify-end">
                      <Link to="/pricing" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                        Change Plan
                      </Link>
                    </div>
                  </div>
                )}
                
                <div className="border-b border-border/40 pb-4">

                  <h2 className="font-display font-bold text-lg">Your Information</h2>
                  <p className="text-muted-foreground text-xs mt-1">Tell us who you are so we can reach you.</p>
                </div>

                {/* Row 1: Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><User size={11} /> Your Name</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={update("name")}
                      placeholder=""
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><Building2 size={11} /> Company / Brand Name</span>
                    </label>
                    <input
                      value={form.company}
                      onChange={update("company")}
                      placeholder=""
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><Mail size={11} /> Email Address</span>
                    </label>
                    <input
                      value={form.email}
                      onChange={update("email")}
                      type="email"
                      placeholder=""
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center gap-1.5"><Phone size={11} /> Phone Number</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={update("phone")}
                      type="tel"
                      placeholder=""
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-b border-border/40 pb-4 pt-1">
                  <h2 className="font-display font-bold text-lg">Project Details</h2>
                  <p className="text-muted-foreground text-xs mt-1">Describe what you're looking to build or achieve.</p>
                </div>

                {/* Budget */}
                {!selectedPlan && (
                  <div>
                    <label className={labelClass}>Estimated Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={update("budget")}
                      className={inputClass}
                      required
                    >
                      <option value="">Select a budget range</option>
                      <option value="under-5000">Under ₹5,000</option>
                      <option value="5000-15000">₹5,000 – ₹15,000</option>
                      <option value="15000-40000">₹15,000 – ₹40,000</option>
                      <option value="40000+">₹40,000+</option>
                      <option value="custom">Custom / Not Sure</option>
                    </select>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1.5"><MessageSquare size={11} /> Describe Your Project</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us about your project — what service do you need (website, video editing, branding, SEO etc.), your goals, timeline, and any specific requirements..."
                    rows={5}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                
                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:col-span-2 flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60"
                  >
                    {loading ? "Sending to Dashboard..." : "Submit to Admin Dashboard"}
                    <Send size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleEmail}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-card border-2 border-border text-foreground font-bold text-xs tracking-wide hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <Mail size={14} /> Send via Email
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366]/10 border-2 border-[#25D366]/30 text-[#075E54] font-bold text-xs tracking-wide hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
                  >
                    <MessageSquare size={14} /> Direct WhatsApp
                  </button>
                </div>


                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-5 pt-2 border-t border-border/30 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>✔ Free Consultation</span>
                  <span>✔ No Obligation</span>
                  <span>✔ Reply in 24 hrs</span>
                </div>
              </form>
            </AnimatedSection>

            {/* Sidebar Info — 1/3 width */}
            <AnimatedSection delay={0.15} className="space-y-5">

              {/* Contact Details */}
              <div className="clay-card p-6 space-y-5">
                <h3 className="font-display font-bold text-base border-b border-border/40 pb-3">Contact Details</h3>
                
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</p>
                    <a href="mailto:takeinstudio@gmail.com" className="text-sm text-foreground hover:text-primary transition-colors font-medium mt-0.5 block">
                      takeinstudio@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</p>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <a href="tel:+918908233590" className="text-sm text-foreground hover:text-primary transition-colors font-medium">
                        +91 89082 33590
                      </a>
                      <a href="tel:+919124442040" className="text-sm text-foreground hover:text-primary transition-colors font-medium">
                        +91 91244 42040
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Instagram size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Instagram</p>
                    <a href="https://instagram.com/takein_studio" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors font-medium mt-0.5 block">
                      takein_studio
                    </a>
                  </div>
                </div>

                {/* Reach */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reach</p>
                    <p className="text-sm text-foreground font-medium mt-0.5">Worldwide (US, UK, India & Asia)</p>
                  </div>
                </div>

                {/* Response */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Response</p>
                    <p className="text-sm text-foreground font-medium mt-0.5">Within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* How We Work */}
              <div className="clay-card p-6 space-y-3">
                <h3 className="font-display font-bold text-base border-b border-border/40 pb-3">How We Work</h3>
                {[
                  { step: "01", text: "You submit this form" },
                  { step: "02", text: "We review your requirements" },
                  { step: "03", text: "Free strategy call scheduled" },
                  { step: "04", text: "We start building together!" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">{s.step}</span>
                    <p className="text-sm text-muted-foreground">{s.text}</p>
                  </div>
                ))}
              </div>

              {/* Collaboration tools */}
              <div className="clay-card p-6">
                <h3 className="font-display font-bold text-base border-b border-border/40 pb-3 mb-3">We Collaborate Via</h3>
                <div className="flex flex-wrap gap-2">
                  {["Google Meet", "Slack", "Trello", "WhatsApp", "Offline Meet (if local)"].map((tool) => (
                    <span key={tool} className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-semibold text-primary shadow-md">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
            />
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border border-border/50 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-all"
              >
                <X size={20} />
              </button>

              {/* Success Content */}
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 size={36} className="text-green-500 animate-bounce" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Thank you! Your query has been successfully submitted. We'll review your details and get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-primary/90 hover:scale-[1.02] transition-all"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
