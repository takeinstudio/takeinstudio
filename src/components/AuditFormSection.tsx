import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AuditFormSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", website: "", project_description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.website) {
      toast.error("Please fill in required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address containing '@'.");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from("client_requests").insert({
      name: form.name,
      email: form.email,
      company: form.company || null,
      website: form.website,
      project_description: form.project_description || null,
    });

    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    setSubmitted(true);
    toast.success("Your audit request has been submitted!");
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <section id="audit" className="py-32 bg-surface">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <CheckCircle2 size={64} className="mx-auto text-cyan mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-foreground">Request Received!</h2>
            <p className="text-muted-foreground">
              Thank you! We'll analyze your website and get back to you within 24-48 hours with your free AI audit report.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="audit" className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-sm font-medium text-cyan uppercase tracking-widest">Free Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">
              Get a Free AI Website Audit
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Submit your website and TakeIN Studio will analyze it using AI — uncovering performance, SEO, and automation opportunities.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 bg-surface-elevated rounded-2xl border border-border shadow-card p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                <Input placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                <Input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                <Input placeholder="Company name" value={form.company} onChange={(e) => update("company", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Website URL *</label>
                <Input placeholder="https://yourwebsite.com" value={form.website} onChange={(e) => update("website", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Project Description</label>
              <Textarea placeholder="Tell us about your project or what you'd like automated..." value={form.project_description} onChange={(e) => update("project_description", e.target.value)} rows={3} />
            </div>

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full bg-gradient-cyan text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {loading ? "Submitting..." : "Request Free Audit"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default AuditFormSection;
