tsx_code = """import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Rocket, Lightbulb, Users, Globe, 
  MapPin, Clock, ArrowRight, CheckCircle2, 
  HeartHandshake, Sparkles, BookOpen, ChevronDown, Code, PenTool, Layout, Video, Mail, ShieldCheck, FileText,
  Briefcase, Check, Building
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";

const whyChooseUs = [
  { icon: Building, title: "Real Project Experience", desc: "Work directly on client-facing products and massive platforms." },
  { icon: Code, title: "Modern Tech Stack", desc: "React, AI tools, automation platforms, cloud technologies." },
  { icon: BookOpen, title: "Learning-Focused Culture", desc: "Build practical skills through real-world projects." },
  { icon: Globe, title: "Flexible Work Environment", desc: "Remote-first opportunities based on role requirements." }
];

const whoWeAreLookingFor = [
  "Problem Solvers",
  "Self-Learners",
  "Strong Communicators",
  "Creative Thinkers",
  "Builders & Innovators"
];

const openPositions = [
  {
    title: "Frontend Developer",
    icon: Code,
    location: "Remote",
    duration: "Full-Time / Contract",
    skills: ["React", "HTML/CSS", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "UI/UX Designer",
    icon: Layout,
    location: "Remote",
    duration: "Full-Time / Contract",
    skills: ["Figma", "Wireframing", "UI Design", "Prototyping"],
  },
  {
    title: "Digital Marketing Specialist",
    icon: PenTool,
    location: "Remote",
    duration: "Full-Time / Contract",
    skills: ["SEO", "Social Media", "Content Marketing", "Google Ads"],
  },
  {
    title: "Video Editor",
    icon: Video,
    location: "Remote",
    duration: "Full-Time / Contract",
    skills: ["Premiere Pro", "After Effects", "Content Editing", "Motion Graphics"],
  },
  {
    title: "Frontend Developer Intern",
    icon: Code,
    location: "Remote",
    duration: "Internship",
    skills: ["React Basics", "HTML/CSS", "Tailwind", "Eagerness to Learn"],
  },
  {
    title: "UI/UX Design Intern",
    icon: Layout,
    location: "Remote",
    duration: "Internship",
    skills: ["Figma Basics", "Design Principles", "Creativity"],
  },
  {
    title: "Digital Marketing Intern",
    icon: PenTool,
    location: "Remote",
    duration: "Internship",
    skills: ["Social Media", "Communication", "Marketing Basics"],
  },
  {
    title: "Content & Social Media Intern",
    icon: Sparkles,
    location: "Remote",
    duration: "Internship",
    skills: ["Copywriting", "Instagram/LinkedIn", "Creative Strategy"],
  }
];

const stats = [
  { value: "25+", label: "Projects Delivered" },
  { value: "10+", label: "Industries Served" },
  { value: "100%", label: "Remote-Friendly Workflow" },
  { value: "∞", label: "Continuous Learning Culture" }
];

const hiringProcess = [
  { step: "Application Review", desc: "We evaluate skills and experience." },
  { step: "Initial Discussion", desc: "Short conversation to understand fit." },
  { step: "Practical Assessment", desc: "Role-specific task or portfolio review." },
  { step: "Offer & Onboarding", desc: "Welcome to the team." }
];

const faqs = [
  { q: "What kind of roles do you offer?", a: "We offer full-time, part-time, and contract roles across engineering, design, marketing, and management. We value talent over rigid structures." },
  { q: "Is remote work available?", a: "Many of our positions offer flexible remote or hybrid work arrangements depending on the role." },
  { q: "Do you hire freelancers or contractors?", a: "Yes, occasionally we hire contractors for specific projects. Feel free to apply and mention your preference." },
  { q: "What skills are required?", a: "Required skills vary by position. Check individual job descriptions for specific technical requirements. We highly value passion and willingness to learn." },
  { q: "How long is the hiring process?", a: "Our process is streamlined. You can expect to hear back within 1-2 weeks after your initial application." }
];

export default function CareerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Careers | TakeIN Studio</title>
        <meta name="description" content="Explore career opportunities, internships, and growth-focused roles at TakeIN Studio. Join our team of developers, designers, marketers, and creators." />
      </Helmet>

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
              Join Our Team
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              Work on Real Projects.<br className="hidden sm:block" />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"> Learn Fast. Grow Faster.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
              At TakeIN Studio, you'll work on websites, applications, AI solutions, branding projects, and digital products for clients across industries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#open-positions" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                View Open Opportunities <ChevronDown size={18} />
              </a>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-foreground border border-border shadow-sm font-bold tracking-wide hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                Contact HR
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/20 border-t border-b border-border/50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading badge="Why TakeIN" title="Why Choose TakeIN Studio?" />
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

      {/* Who We're Looking For */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="clay-card border border-border/50 p-8 rounded-3xl bg-gradient-to-br from-card to-muted/20 text-center shadow-sm">
              <h3 className="font-display font-bold text-2xl mb-6 text-foreground">Who We're Looking For</h3>
              <p className="text-muted-foreground text-sm mb-6">We value individuals who bring passion and drive to our projects:</p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {whoWeAreLookingFor.map((trait, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-border text-xs sm:text-sm font-semibold text-foreground shadow-sm">
                    <CheckCircle2 size={16} className="text-primary" /> {trait}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-6 text-center border border-border shadow-sm">
                  <h4 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-1">{stat.value}</h4>
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/10 border-y border-border/50 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeading badge="Join Us" title="Open Opportunities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {openPositions.map((job, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 transition-all duration-300 flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <job.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-foreground">{job.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <MapPin size={12} className="text-primary" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <Clock size={12} className="text-primary" /> {job.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground/80">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to="/apply" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm tracking-wide hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Apply Now <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl text-center">
          <SectionHeading badge="Simple & Transparent" title="Our Hiring Process" />
          
          <div className="relative mt-16 max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-muted z-0 rounded-full overflow-hidden">
              <div className="h-full bg-primary/20 w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
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

      {/* FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/20 border-t border-border/50">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading badge="Got Questions?" title="Frequently Asked Questions" />
          
          <div className="mt-10 space-y-4">
            {faqs.map((faq, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <div 
                  className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${openFaq === idx ? 'border-primary shadow-md' : 'border-border shadow-sm hover:border-primary/30'}`}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-bold text-sm sm:text-base text-foreground">{faq.q}</span>
                    <ChevronDown size={18} className={`text-primary transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-12 sm:p-16 text-center text-white shadow-2xl">
              <div className="absolute inset-0 bg-[url('/dots.svg')] opacity-10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="font-display text-3xl sm:text-4xl font-bold">Ready to Start Your Journey?</h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                  We're always looking for passionate individuals who want to create exceptional digital experiences.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href="#open-positions"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-primary font-bold tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    View Opportunities <ArrowRight size={18} />
                  </a>
                  <a 
                    href="mailto:careers@takeinstudio.com"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent border-2 border-white/30 text-white font-bold tracking-wide hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    Email HR
                  </a>
                </div>
                
                <p className="pt-6 text-sm text-white/70 flex items-center justify-center gap-2">
                  <Mail size={14} /> careers@takeinstudio.com
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom Legal/Info Section */}
      <section className="border-t border-border/50 py-8 px-4 bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-muted-foreground text-center md:text-left">
            <span className="flex items-center gap-1.5 font-medium"><FileText size={14} className="text-primary" /> Privacy Notice for Applicants</span>
            <span className="hidden md:inline text-border">|</span>
            <span className="flex items-center gap-1.5 font-medium"><Mail size={14} className="text-primary" /> careers@takeinstudio.com</span>
          </div>
        </div>
      </section>
    </>
  );
}
"""

with open('src/pages/CareerPage.tsx', 'w', encoding='utf-8') as f:
    f.write(tsx_code)

print("CareerPage successfully rewritten.")
