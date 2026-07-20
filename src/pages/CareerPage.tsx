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
      <section className="px-4 sm:px-6 lg:px-8 py-16 pt-28 sm:pt-36 relative overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-[11px] font-bold tracking-widest uppercase mb-8 shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Join TakeIN Studio
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 text-white tracking-tight">
              Work on Real Projects.<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-500"> Build Real Skills.</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
              We're always interested in meeting talented developers, designers, marketers, and creators who want to build the future of digital products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/apply"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold tracking-wide hover:shadow-[0_0_40px_-10px_rgba(255,87,34,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Open Roles <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:takeinstudio@gmail.com"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 backdrop-blur-md text-white border border-white/10 shadow-lg font-bold tracking-wide hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
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
                  <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-transparent p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    
                    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 z-10">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-sm">
                          <Briefcase size={24} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium mb-3">
                            {job.department && (
                              <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                                <Building size={12} /> {job.department}
                              </span>
                            )}
                            {job.location && (
                              <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                                <MapPin size={12} /> {job.location}
                              </span>
                            )}
                            {job.type && (
                              <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                                <Clock size={12} /> {job.type}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest border border-green-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              {job.status || "Open"}
                            </span>
                          </div>
                          {job.description && (
                            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl line-clamp-2">{job.description}</p>
                          )}
                        </div>
                      </div>
                      <Link
                        to="/apply"
                        className="flex-shrink-0 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold opacity-100 sm:opacity-0 sm:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-primary group-hover:shadow-[0_0_20px_-5px_rgba(255,87,34,0.5)] transition-all duration-300 flex items-center gap-2"
                      >
                        Apply Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>


      {/* Why Choose Us (Bento Box) */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gray-50/50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading badge="Why TakeIN" title="Why Join Us?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {whyChooseUs.map((perk, idx) => (
              <AnimatedSection 
                key={idx} 
                delay={idx * 0.1}
                className={idx === 0 || idx === 3 ? "md:col-span-2" : "md:col-span-1"}
              >
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 h-full group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-500/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(255,87,34,0.4)] transition-all duration-500 relative z-10">
                    <perk.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3 text-gray-900 relative z-10">{perk.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed relative z-10">{perk.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process (Connected Timeline) */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 overflow-hidden">
        <div className="container mx-auto max-w-5xl text-center">
          <SectionHeading badge="Simple & Transparent" title="Application Process" />

          <div className="relative mt-20 max-w-4xl mx-auto">
            {/* Animated Connecting Line */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary via-orange-400 to-yellow-500 w-[80%] opacity-50" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
              {hiringProcess.map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="flex flex-col items-center gap-5 group">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 shadow-lg flex items-center justify-center text-gray-400 font-bold font-display text-xl group-hover:border-primary group-hover:text-primary group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(255,87,34,0.3)] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10">0{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors">{item.step}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed px-2">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pb-32">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] px-6 py-16 sm:p-20 text-center shadow-2xl border border-white/5">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/20 blur-[100px] rounded-full mix-blend-screen" />
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">Ready to Build the Future?</h2>
                <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 font-medium">
                  We're always open to connecting with talented individuals who want to create meaningful impact.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <Link
                    to="/apply"
                    className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-lg tracking-wide hover:shadow-[0_0_40px_-10px_rgba(255,87,34,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
                  >
                    Apply Now <ArrowRight size={20} />
                  </Link>
                  <a
                    href="mailto:takeinstudio@gmail.com"
                    className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold text-lg tracking-wide hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail size={20} /> career@takeinstudio.com
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
