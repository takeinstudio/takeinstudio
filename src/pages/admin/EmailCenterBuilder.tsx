import { useState } from "react";
import { Send, CheckCircle2, XCircle, AlertCircle, Calendar, UploadCloud, LayoutTemplate, Briefcase, CalendarCheck, CheckSquare, FileText } from "lucide-react";
import { toast } from "sonner";
import AnimatedSection from "@/components/AnimatedSection";
import { sendBrevoEmail } from "@/lib/email";

export default function EmailCenterBuilder() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    identity: "support", // "support" or "noreply"
    recipientType: "single",
    to: "",
    subject: "",
    body: ""
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const templates = [
    {
      id: 1,
      name: "Booking Confirmation",
      icon: CalendarCheck,
      subject: "Your Booking is Confirmed 🎉",
      body: "Hi there,\n\nYour booking with TakeIN Studio is confirmed! We are thrilled to start working with you. Please find the details of your project schedule below.\n\nBest,\nThe TakeIN Studio Team"
    },
    {
      id: 2,
      name: "Payment Receipt",
      icon: FileText,
      subject: "Payment Receipt - TakeIN Studio",
      body: "Hi there,\n\nWe have successfully received your recent payment. Attached is your official receipt.\n\nThank you for choosing TakeIN Studio."
    },
    {
      id: 3,
      name: "Action Required",
      icon: CheckSquare,
      subject: "Action Required: Update your Project Details",
      body: "Hi there,\n\nWe need a little more information from you to proceed with your project. Please log into your client portal or reply to this email to provide the necessary details.\n\nThanks,\nTakeIN Studio"
    },
    {
      id: 4,
      name: "Application Received",
      icon: Briefcase,
      subject: "Application Received - TakeIN Studio Careers",
      body: "Hi,\n\nThank you for applying to TakeIN Studio! We have received your application and our recruitment team will review it shortly. If your profile matches our requirements, we will reach out to you.\n\nBest,\nTakeIN Studio Recruitment"
    }
  ];

  const handleTemplateClick = (t: typeof templates[0]) => {
    setForm(f => ({ ...f, subject: t.subject, body: t.body }));
    toast.success(`Loaded template: ${t.name}`);
  };

  const wrapWithTemplate = (bodyText: string) => {
    // Replace newlines with <br> for HTML rendering
    const formattedText = bodyText.replace(/\n/g, "<br>");
    
    return `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaebed; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0;">
          <img src="https://takeinstudio.com/logo/logo_text.png" alt="TakeIN Studio" style="max-height: 45px; display: inline-block; margin: 0 auto; background-color: #ffffff; padding: 8px 16px; border-radius: 8px;" />
        </div>
        <div style="color: #333333; font-size: 15px; line-height: 1.6;">
          ${formattedText}
        </div>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f0; text-align: center; color: #888888; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} TakeIN Studio. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">Bhubaneswar, Odisha, India & Global</p>
        </div>
      </div>
    `;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.to || !form.subject || !form.body) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const htmlBody = wrapWithTemplate(form.body);

    const success = await sendBrevoEmail(
      form.subject,
      htmlBody,
      form.identity as "support" | "noreply" | "careers" | "hello",
      form.to
    );

    setLoading(false);

    if (success) {
      toast.success("Email sent successfully! 🎉");
      setForm(f => ({ ...f, subject: "", body: "", to: "" }));
    } else {
      toast.error("Failed to send email. Check your Brevo IP settings.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Mock Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Sent Today", value: "0", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Sent This Month", value: "0", icon: Send, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Success Rate", value: "0%", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Failed Deliveries", value: "0", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
        ].map((stat, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="bg-card border border-border/50 p-5 rounded-2xl flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Form */}
        <AnimatedSection delay={0.2} className="lg:col-span-2">
          <form onSubmit={handleSend} className="bg-card border border-border/50 rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-border/40 bg-muted/20 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2"><Send size={16} className="text-primary" /> Compose Email</h3>
            </div>
            
            <div className="p-6 space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">From Identity</label>
                  <select 
                    value={form.identity}
                    onChange={update("identity")}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="support">TakeIN Studio Support (support@takeinstudio.com)</option>
                    <option value="noreply">TakeIN Studio (noreply@takeinstudio.com)</option>
                    <option value="careers">TakeIN Studio Careers (careers@takeinstudio.com)</option>
                    <option value="hello">TakeIN Studio Hello (hello@takeinstudio.com)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Recipient Type</label>
                  <select 
                    value={form.recipientType}
                    onChange={update("recipientType")}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="single">Single Email</option>
                    <option value="multiple">Multiple Emails</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">To (Recipient Email)</label>
                <input 
                  type={form.recipientType === "multiple" ? "text" : "email"}
                  required
                  value={form.to}
                  onChange={update("to")}
                  placeholder={form.recipientType === "multiple" ? "client1@example.com, client2@example.com" : "customer@example.com"}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Subject</label>
                <input 
                  type="text"
                  required
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="E.g., Booking Confirmed 🎉"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Email Body</label>
                <textarea 
                  required
                  value={form.body}
                  onChange={update("body")}
                  placeholder="Type your email content here..."
                  className="w-full flex-1 min-h-[250px] px-4 py-3 rounded-xl bg-background border border-border/60 text-sm focus:outline-none focus:border-primary/50 resize-y"
                />
              </div>

              {/* Fake attachment for UI completeness */}
              <div>
                <button type="button" className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors py-2">
                  <UploadCloud size={14} /> Attach Files (Coming Soon)
                </button>
              </div>
            </div>

            <div className="p-5 border-t border-border/40 bg-muted/10 flex items-center justify-end gap-3">
              <button 
                type="button" 
                className="px-6 py-2.5 rounded-xl text-xs font-bold border border-border hover:bg-muted transition-colors"
                onClick={() => setForm(f => ({ ...f, subject: "", body: "", to: "" }))}
              >
                Clear
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md hover:shadow-primary/20 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Now"} <Send size={14} />
              </button>
            </div>
          </form>
        </AnimatedSection>

        {/* Quick Templates Sidebar */}
        <AnimatedSection delay={0.3} className="lg:col-span-1">
          <div className="bg-card border border-border/50 rounded-2xl p-5 h-full flex flex-col">
            <h3 className="font-bold flex items-center gap-2 mb-4 pb-4 border-b border-border/40">
              <LayoutTemplate size={16} className="text-primary" /> Quick Templates
            </h3>
            
            <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
              {templates.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTemplateClick(t)}
                  className="w-full text-left p-4 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all group flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <t.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 truncate max-w-[200px]">{t.subject}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 items-start">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Emails are sent beautifully formatted with the TakeIN Studio logo and branding automatically applied to the header and footer.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
