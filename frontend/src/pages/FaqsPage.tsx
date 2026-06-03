import { useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Send, MessageCircle, User, Mail, ChevronDown, Clock, CheckCircle2, ShieldAlert } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { toast } from "sonner";

interface UserQuestion {
  id: string;
  name: string;
  email: string;
  question: string;
  createdAt: string;
  status: "pending" | "answered";
  reply?: string;
  replyAt?: string;
}

const defaultFaqs = [
  {
    q: "How long does a standard Startup website take to launch?",
    a: "Our typical turnaround time for a Startup tier website is 7 to 14 days, depending on content availability. Growth tier projects average 3 to 5 weeks."
  },
  {
    q: "Do you offer post-launch maintenance packages?",
    a: "Yes! Every project includes a complimentary warranty (60 days for Startup, 120 days for Growth). After that, we offer monthly retainer packages starting at ₹5,000 / month."
  },
  {
    q: "Can we migrate our current site to React and Tailwind?",
    a: "Absolutely. We specialize in migrating legacy WordPress, Webflow, or PHP sites to modern React/Vite/Next.js frameworks with zero downtime and SEO safety checks."
  },
  {
    q: "What payment structures do you support?",
    a: "Typically, we operate on a milestone structure: 50% upfront to initiate wireframing, and 50% upon final verification and launch on your domain."
  }
];

function ParallaxOrb({
  className,
  yRange = [-80, 80],
  rotateRange = [0, 180],
}: {
  className?: string;
  yRange?: [number, number];
  rotateRange?: [number, number];
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], yRange);
  const r = useTransform(scrollY, [0, 1000], rotateRange);

  return (
    <motion.div
      style={{ y, rotate: r }}
      className={`absolute rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none opacity-20 sm:opacity-35 ${className}`}
    />
  );
}

export default function FaqsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);

  // Load custom questions
  useEffect(() => {
    const loaded = localStorage.getItem("takein_user_faqs");
    if (loaded) {
      setUserQuestions(JSON.parse(loaded));
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !question.trim()) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const newQ: UserQuestion = {
      id: "q-" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      question: question.trim(),
      createdAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: "pending",
    };

    const updated = [newQ, ...userQuestions];
    setUserQuestions(updated);
    localStorage.setItem("takein_user_faqs", JSON.stringify(updated));

    setName("");
    setEmail("");
    setQuestion("");
    toast.success("Question submitted successfully! Admin will respond shortly.");
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | TakeIN Studio" 
        description="Find answers to common questions about our web design, pricing, custom integrations, and branding systems. Submit your own questions directly to our team."
      />

      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-background via-cream to-background border-b border-border/40 pt-28 pb-16 flex flex-col justify-center">
        {/* Background Dot & Mesh Glow Texture */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none z-0" />
        <ParallaxOrb 
          className="top-1/4 left-1/12 w-[350px] h-[350px] bg-gradient-to-tr from-primary/20 to-amber-500/10 animate-blob" 
          yRange={[-50, 50]} 
        />
        <ParallaxOrb 
          className="bottom-1/4 right-1/10 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 to-primary/20 animate-blob-delayed" 
          yRange={[-90, 90]} 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <AnimatedSection>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-black uppercase tracking-widest mb-1 animate-pulse">
                💬 Help & Q&A
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground mt-2">
                Frequently Asked <br />
                <span className="bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Inquiries & Q&A
                </span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-semibold max-w-xl mx-auto mt-4">
                Explore standard answers on contract terms, delivery speeds, and architectures, or submit your own custom query to chat directly with our administration.
              </p>
            </AnimatedSection>
          </div>

          {/* Grid Layout: FAQs Accordion vs Interactive Q&A Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
            {/* Left Column: Migrated Accordion FAQs */}
            <div className="lg:col-span-7 space-y-4">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="text-primary" size={18} />
                  <h2 className="font-display text-lg font-bold text-foreground">Common Studio Questions</h2>
                </div>
              </AnimatedSection>

              <div className="space-y-3">
                {defaultFaqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <AnimatedSection key={faq.q} delay={i * 0.08}>
                      <div 
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                          isOpen ? "border-primary/40 bg-primary/5 shadow-md" : "border-border/60 bg-card hover:border-primary/25"
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 focus:outline-none"
                        >
                          <span className="font-display text-sm font-bold text-foreground leading-snug">{faq.q}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              isOpen ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <ChevronDown size={14} />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6 border-t border-primary/10">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Submission Form */}
            <div className="lg:col-span-5">
              <AnimatedSection delay={0.2}>
                <div className="clay-card p-6 sm:p-8 bg-card/60 backdrop-blur-md border border-border/50 shadow-xl rounded-3xl relative overflow-hidden space-y-5">
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-primary to-orange-500" />
                  
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">Ask a Custom Question</h3>
                    <p className="text-muted-foreground text-xs font-semibold leading-relaxed mt-1">
                      Can't find what you need? Send your question. Our administration logs are checked regularly and will reply right on this page!
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5 relative group">
                      <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground pl-1">Full Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 relative group">
                      <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground pl-1">Email Address</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 relative group">
                      <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground pl-1">Your Question</label>
                      <textarea
                        placeholder="Write your specific question or inquire details about a custom system design..."
                        rows={4}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold leading-relaxed"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="glow-btn bg-primary text-primary-foreground w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.01]"
                    >
                      Submit Question <Send size={12} />
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
