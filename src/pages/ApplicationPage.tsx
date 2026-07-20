import { supabase } from '@/lib/supabase';
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { UploadCloud, CheckCircle2, ArrowLeft, Loader2, X } from "lucide-react";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

export default function ApplicationPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultRole = searchParams.get('role') || "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolioUrl: "",
    github: "",
    role: defaultRole,
    employmentType: "",
    experience: "",
    compensation: "",
    startDate: "",
    skills: [] as string[],
    message: "",
    declaration: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [portfolioName, setPortfolioName] = useState<string | null>(null);
  
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  const availableSkills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", 
    "Flutter", "Figma", "UI/UX Design", "SEO", "Video Editing", 
    "AI Automation", "Marketing", "Graphic Design", "Cold Calling", 
    "B2B Sales", "Lead Generation", "WordPress", "Webflow"
  ];

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPortfolioName(e.target.files[0].name);
    }
  };

  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert("You must confirm the declaration.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        experience: formData.experience,
        portfolio: formData.portfolioUrl || formData.linkedin,
        message: formData.message,
        status: "New"
      };
      
      await supabase.from('careers').insert([payload]);
      setIsSubmitted(true);
    } catch (err) {
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <SEO title="Application Submitted" description="Your application to TakeIN Studio has been submitted successfully." />
        <AnimatedSection>
          <div className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full text-center shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="font-display text-xl font-bold mb-2 text-gray-900">Application Received!</h2>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Thank you for applying. Your application will be reviewed by our team and we'll contact you if there's a suitable opportunity.
            </p>
            <Link 
              to="/"
              className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg transition-all text-sm"
            >
              Return Home
            </Link>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col p-4 sm:p-6 lg:p-8">
      <SEO title="Apply Now - Careers" description="Apply for a role at TakeIN Studio and join our team of creators and builders." />

      {/* FULL WIDTH CONTAINER WITH MARGINS */}
      <div className="w-full mx-auto flex-1 flex flex-col max-w-[1600px]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-2">
          <Link to="/">
            <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-6 sm:h-7 object-contain" />
          </Link>
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-900 flex items-center gap-1.5 text-[11px] font-bold transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
          >
            <ArrowLeft size={12} /> Cancel
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
          <div className="bg-primary/5 px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 flex-shrink-0">
            <div>
              <p className="text-primary font-bold tracking-wider text-[10px] mb-0.5">TakeIN Studio Careers</p>
              <h1 className="font-display text-lg font-bold text-gray-900">Submit Application</h1>
            </div>
            <p className="text-gray-500 text-[10px] sm:text-right max-w-xs leading-tight">Complete the application below. Our team will review your profile shortly.</p>
          </div>

          {/* 3-COLUMN LAYOUT ON DESKTOP FOR ZERO SCROLL */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
            
            {/* ── COLUMN 1: PERSONAL INFO ── */}
            <div className="flex-[1.1] space-y-4">
              <h3 className="font-display font-bold text-xs text-gray-900 border-b border-gray-100 pb-1">Personal Information</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">First Name *</label>
                  <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Last Name *</label>
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Phone *</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" />
                </div>
                <div className="space-y-0.5 col-span-2">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Location *</label>
                  <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" placeholder="City, Country" />
                </div>
                <div className="space-y-0.5 col-span-2">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">LinkedIn *</label>
                  <input required type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">GitHub (Opt)</label>
                  <input type="url" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Portfolio (Opt)</label>
                  <input type="url" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* ── COLUMN 2: POSITION & DOCS ── */}
            <div className="flex-1 space-y-5">
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xs text-gray-900 border-b border-gray-100 pb-1">Position Information</h3>
                <div className="space-y-2.5">
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Role *</label>
                    <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all appearance-none cursor-pointer">
                      <option value="" disabled>Select a role...</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="Graphic Designer">Graphic Designer</option>
                      <option value="Video Editor">Video Editor</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Business Development">Business Development</option>
                      <option value="Sales Partner / Cold Calling">Sales Partner / Cold Calling</option>
                      <option value="General Application">General Application</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Type *</label>
                      <select required value={formData.employmentType} onChange={e => setFormData({...formData, employmentType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all appearance-none cursor-pointer">
                        <option value="" disabled>Select type...</option>
                        <option value="Freelance / Contract">Contract</option>
                        <option value="Commission Based">Commission</option>
                      </select>
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Experience *</label>
                      <input required type="text" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" placeholder="e.g. 3 years" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Exp. Comp *</label>
                      <input required type="text" value={formData.compensation} onChange={e => setFormData({...formData, compensation: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" placeholder="e.g. 20% Comm." />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Start Date *</label>
                      <input required type="text" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all" placeholder="e.g. Immediate" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xs text-gray-900 border-b border-gray-100 pb-1">Documents</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <div 
                    className="w-full border border-dashed border-gray-300 rounded-lg bg-gray-50 py-2 px-3 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center"
                    onClick={() => resumeInputRef.current?.click()}
                  >
                    <UploadCloud className="h-4 w-4 text-gray-400 mb-1" />
                    {resumeName ? (
                      <p className="text-[9px] font-semibold text-primary truncate w-full">{resumeName}</p>
                    ) : (
                      <p className="text-[9px] font-medium text-gray-600">Resume PDF <span className="text-red-500">*</span></p>
                    )}
                    <input type="file" className="hidden" ref={resumeInputRef} onChange={handleResumeChange} accept=".pdf" required={formData.role !== "Sales Partner / Cold Calling"} />
                  </div>

                  <div 
                    className="w-full border border-dashed border-gray-300 rounded-lg bg-gray-50 py-2 px-3 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center"
                    onClick={() => portfolioInputRef.current?.click()}
                  >
                    <UploadCloud className="h-4 w-4 text-gray-400 mb-1" />
                    {portfolioName ? (
                      <p className="text-[9px] font-semibold text-primary truncate w-full">{portfolioName}</p>
                    ) : (
                      <p className="text-[9px] font-medium text-gray-600">Portfolio PDF</p>
                    )}
                    <input type="file" className="hidden" ref={portfolioInputRef} onChange={handlePortfolioChange} accept=".pdf" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── COLUMN 3: SKILLS, COVER & SUBMIT ── */}
            <div className="flex-1 space-y-4 flex flex-col">
              
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xs text-gray-900 border-b border-gray-100 pb-1">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {availableSkills.map((skill) => {
                    const isSelected = formData.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all border ${
                          isSelected 
                            ? 'bg-primary text-white border-primary shadow-sm' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
                        }`}
                      >
                        {skill} {isSelected && <X size={8} className="inline ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-xs text-gray-900 border-b border-gray-100 pb-1">Cover Letter</h3>
                <textarea 
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  className="w-full flex-1 min-h-[60px] bg-gray-50 border border-gray-200 text-gray-900 text-[11px] rounded-md focus:ring-primary focus:border-primary block px-2.5 py-1.5 outline-none transition-all resize-none" 
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-md border border-gray-100">
                  <input 
                    type="checkbox" 
                    id="declaration"
                    checked={formData.declaration}
                    onChange={e => setFormData({...formData, declaration: e.target.checked})}
                    className="mt-0.5 w-3 h-3 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="declaration" className="text-[9px] text-gray-600 leading-tight cursor-pointer select-none">
                    I confirm the information provided is accurate.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs tracking-wide rounded-md shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>

            </div>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-[9px] text-gray-400 mt-2 font-medium">
          TakeIN Studio © {new Date().getFullYear()}. All information is strictly confidential.
        </p>

      </div>
    </div>
  );
}
