import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Globe, Users, Code, Mail, FileText, Building, MapPin, Clock, ArrowRight, Briefcase, Zap, BookOpen
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
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

      {/* Hero Section - Compact */}
      <section className="px-4 py-8 pt-24 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-widest mb-4 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Join TakeIN Studio
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-3 text-white tracking-tight">
                  Work on Real Projects. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Build Real Skills.</span>
                </h1>
                <p className="text-gray-400 text-sm max-w-xl font-medium">
                  We're always interested in meeting talented developers, designers, marketers, and creators who want to build the future of digital products.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#open-positions"
                  className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  View Open Roles <ArrowRight size={14} />
                </a>
                <Link
                  to="/vault"
                  className="px-6 py-2.5 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/30 text-sm font-bold hover:bg-orange-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />Resource Vault - Learn with US
                </Link>
                <a
                  href="mailto:takeinstudio@gmail.com"
                  className="px-6 py-2.5 rounded-lg bg-white/10 text-white border border-white/10 text-sm font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Mail size={14} /> career@takeinstudio.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section id="open-positions" className="px-4 py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Open Positions</h2>
              <p className="text-xs text-gray-500">All roles are remote-friendly. Apply once.</p>
            </div>
            <span className="bg-primary/10 text-primary px-2.5 py-1 rounded text-xs font-bold">Now Hiring</span>
          </div>

          <div className="space-y-3">
            {loadingJobs ? (
              <div className="text-center py-8 text-gray-400 text-sm">Loading positions...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500">
                No Open Positions Right Now. Send your portfolio to <strong className="text-gray-800">career@takeinstudio.com</strong>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="group relative bg-white rounded-xl border border-gray-200 hover:border-primary/50 p-4 transition-all hover:shadow-sm overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-4 z-10">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 font-medium mt-1">
                        {job.department && <span className="flex items-center gap-1"><Building size={10} /> {job.department}</span>}
                        {job.location && <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>}
                        {job.type && <span className="flex items-center gap-1"><Clock size={10} /> {job.type}</span>}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/apply"
                    className="relative z-10 flex-shrink-0 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold opacity-100 sm:opacity-0 sm:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-primary transition-all flex items-center gap-1.5 w-fit"
                  >
                    Apply <ArrowRight size={12} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── SALES PARTNER PROGRAM ── */}
      <section className="px-4 py-8 bg-gradient-to-br from-orange-50 to-white border-b border-orange-100/50">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-6 md:w-1/3 bg-orange-50/30 border-r border-orange-100/50">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest mb-3">
                <Zap size={10} className="fill-orange-600" /> High Earning Potential
              </div>
              <h2 className="font-display text-lg font-bold text-gray-900 mb-2">TakeIN Sales Partner</h2>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                Bring clients for web development, apps, or SEO and earn huge commissions instantly. We handle the work, you take the profit.
              </p>
              <Link
                to="/apply?role=Sales Partner / Cold Calling"
                className="w-full py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Apply for Sales Partner <ArrowRight size={12} />
              </Link>
            </div>
            <div className="p-6 md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                <div className="text-primary font-black text-lg mb-1">20%</div>
                <h3 className="font-bold text-xs text-gray-900 mb-1">Flat Commission</h3>
                <p className="text-[10px] text-gray-500">Earn 20% of the entire project cost for every client you convert.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                <Briefcase size={18} className="text-primary mb-1.5" />
                <h3 className="font-bold text-xs text-gray-900 mb-1">Work Directly</h3>
                <p className="text-[10px] text-gray-500">Get verified and trained personally to close bigger deals.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                <Zap size={18} className="text-primary mb-1.5" />
                <h3 className="font-bold text-xs text-gray-900 mb-1">Rewards</h3>
                <p className="text-[10px] text-gray-500">Hit monthly targets and unlock cash bonuses and tech rewards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout: Why Join Us & Hiring Process */}
      <section className="px-4 py-8 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Why Join Us */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Why Join Us?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyChooseUs.map((perk, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary/30 transition-colors">
                    <perk.icon size={16} className="text-primary mb-2" />
                    <h3 className="font-bold text-xs text-gray-900 mb-1">{perk.title}</h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Application Process</h2>
              <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4">
                {hiringProcess.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      {idx !== hiringProcess.length - 1 && <div className="w-0.5 h-6 bg-gray-100 mt-1" />}
                    </div>
                    <div className="pb-2">
                      <h4 className="font-bold text-xs text-gray-900">{item.step}</h4>
                      <p className="text-[10px] text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#0A0A0A] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-800">
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-1">Ready to Build the Future?</h2>
              <p className="text-xs text-gray-400">Connect with us and create meaningful impact.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link to="/apply" className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors text-center">
                Apply Now
              </Link>
              <a href="mailto:takeinstudio@gmail.com" className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors border border-white/10 text-center">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <section className="border-t border-gray-200 py-4 px-4 bg-gray-50 text-center">
        <div className="container mx-auto max-w-7xl flex justify-center items-center gap-4 text-[10px] text-gray-500 font-medium">
          <span className="flex items-center gap-1"><FileText size={12} /> Privacy Notice for Applicants</span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1"><Mail size={12} /> career@takeinstudio.com</span>
        </div>
      </section>
    </>
  );
}
