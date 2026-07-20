import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Globe, Users, Code, Mail, FileText, Building, MapPin, Clock, ArrowRight, Briefcase, Zap
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";

const whyChooseUs = [
  { icon: Building, title: "Real Client Work", desc: "Work on websites, applications, AI solutions, branding projects, and business systems used by actual clients." },
  { icon: Globe, title: "Flexible Opportunities", desc: "Remote-friendly collaboration with project-based and long-term opportunities." },
  { icon: Code, title: "Learn & Grow", desc: "Gain practical experience with modern technologies, design systems, AI tools, and business workflows." },
  { icon: Users, title: "Supportive Environment", desc: "Collaborate with people who value creativity, ownership, and continuous improvement." }
];

const hiringProcess = [
  { step: "Submit Application", desc: "Complete the online application form and upload your resume." },
  { step: "Initial Review", desc: "We review your experience, skills, and portfolio." },
  { step: "Discussion", desc: "A short conversation to understand your goals and fit." },
  { step: "Project or Task", desc: "Depending on the role, we may request a practical assessment." },
  { step: "Welcome Onboard", desc: "Successful applicants receive an offer and onboarding details." }
];

export default function CareerPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "Open")
        .order("created_at", { ascending: false });
      setJobs(data || []);
      setLoadingJobs(false);
    };
    fetchJobs();
  }, []);

  return (
    <>
      <SEO
        title="Careers at TakeIN Studio | Web & App Development Jobs Bhubaneswar"
        description="Explore career opportunities, internships, and growth-focused roles at TakeIN Studio. Join our team of developers, designers, marketers, and creators in Bhubaneswar."
        canonical="https://takeinstudio.com/career"
      />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 pt-24 sm:pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase mb-6 shadow-sm border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Join TakeIN Studio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              Work on Real Projects.<br className="hidden sm:block" />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"> Build Real Skills.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
              We're always interested in meeting talented developers, designers, marketers, and creators who want to work on meaningful digital products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/apply"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Apply Now <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:takeinstudio@gmail.com"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-foreground border border-border shadow-sm font-bold tracking-wide hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                career@takeinstudio.com
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SALES PARTNER PROGRAM ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-white to-orange-50">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="bg-white rounded-3xl border border-primary/20 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-orange-400"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              
              <div className="p-8 sm:p-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-6">
                  <Zap size={14} className="fill-orange-600" /> High Earning Potential
                </div>
                
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  TakeIN Sales Partner <span className="text-primary italic">&</span> Affiliate Program
                </h2>
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl leading-relaxed">
                  You don't need to be a developer to earn with us. Bring clients for web development, apps, or SEO and earn huge commissions instantly. We handle the work, you take the profit.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-4">
                      <span className="font-black text-xl">20%</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Flat Commission</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Earn a massive 20% of the entire project cost for every client you convert. No upper limit.</p>
                  </div>
                  
                  <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-4">
                      <Briefcase size={22} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Work Directly With Us</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Perform well and get verified as an official TakeIN Sales Partner. We'll train you personally to close bigger deals.</p>
                  </div>
                  
                  <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 8h20"/><path d="M2 16h20"/></svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Unlock Rewards & Bonuses</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Hit monthly targets and unlock cash bonuses, premium tech rewards, and lead-generation tools.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
                  <Link
                    to="/apply?role=Sales Partner / Cold Calling"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    Apply for Sales Partner <ArrowRight size={18} />
                  </Link>
                  <span className="text-sm text-muted-foreground font-medium text-center sm:text-left">
                    Send your resume or tell us how you plan to generate leads.
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── OPEN POSITIONS (Live from Supabase) ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white border-t border-b border-border/50">
        <div className="container mx-auto max-w-5xl">
          <SectionHeading badge="Now Hiring" title="Open Positions" subtitle="All roles are remote-friendly. Apply once — our team reviews every submission." />

          <div className="mt-12 space-y-4">
            {loadingJobs ? (
              <div className="text-center py-16 text-muted-foreground">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-medium">Loading positions...</p>
              </div>
            ) : jobs.length === 0 ? (
              <AnimatedSection>
                <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border/50">
                  <Briefcase size={40} className="text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="font-display font-bold text-lg mb-2">No Open Positions Right Now</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    We're not actively hiring at the moment, but we're always open to great talent.
                    Send us your portfolio at <strong>career@takeinstudio.com</strong>
                  </p>
                </div>
              </AnimatedSection>
            ) : (
              jobs.map((job, idx) => (
                <AnimatedSection key={job.id} delay={idx * 0.08}>
                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 p-6 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground mb-1">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium">
                          {job.department && (
                            <span className="flex items-center gap-1">
                              <Building size={12} /> {job.department}
                            </span>
                          )}
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} /> {job.location}
                            </span>
                          )}
                          {job.type && (
                            <span className="flex items-center gap-1">
                              <Clock size={12} /> {job.type}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            {job.status || "Open"}
                          </span>
                        </div>
                        {job.description && (
                          <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-xl line-clamp-2">{job.description}</p>
                        )}
                      </div>
                    </div>
                    <Link
                      to="/apply"
                      className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:shadow-md hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                      Apply <ArrowRight size={15} />
                    </Link>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading badge="Why TakeIN" title="Why Join Us?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyChooseUs.map((perk, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <perk.icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 text-foreground">{perk.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{perk.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl text-center">
          <SectionHeading badge="Simple & Transparent" title="Application Process" />

          <div className="relative mt-16 max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-muted z-0 rounded-full overflow-hidden">
              <div className="h-full bg-primary/20 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {hiringProcess.map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="flex flex-col items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-muted flex items-center justify-center text-foreground font-bold font-display group-hover:border-primary group-hover:text-primary transition-colors shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground leading-tight mb-1">{item.step}</h4>
                      <p className="text-[11px] text-muted-foreground leading-snug px-2">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-12 sm:p-16 text-center text-white shadow-2xl">
              <div className="absolute inset-0 bg-[url('/dots.svg')] opacity-10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="font-display text-3xl sm:text-4xl font-bold">Ready to Apply?</h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                  We're always open to connecting with talented individuals.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/apply"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-primary font-bold tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    Apply Now <ArrowRight size={18} />
                  </Link>
                  <a
                    href="mailto:takeinstudio@gmail.com"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent border-2 border-white/30 text-white font-bold tracking-wide hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    career@takeinstudio.com
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer Legal */}
      <section className="border-t border-border/50 py-8 px-4 bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-muted-foreground text-center md:text-left">
            <span className="flex items-center gap-1.5 font-medium"><FileText size={14} className="text-primary" /> Privacy Notice for Applicants</span>
            <span className="hidden md:inline text-border">|</span>
            <span className="flex items-center gap-1.5 font-medium"><Mail size={14} className="text-primary" /> career@takeinstudio.com</span>
          </div>
        </div>
      </section>
    </>
  );
}
