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
      // In a real scenario we'd upload the files to Supabase Storage first.
      // For now we map to the careers table structure.
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        experience: formData.experience,
        portfolio: formData.portfolioUrl || formData.linkedin,
        message: formData.message,
        status: "New" // Adding status column directly here
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
    <div className="min-h-screen bg-[#fafafa] flex flex-col py-6 px-4 sm:px-6 lg:px-8">
      <SEO title="Apply Now - Careers" description="Apply for a role at TakeIN Studio and join our team of creators and builders." />

      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <Link to="/">
            <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-6 sm:h-8 object-contain" />
          </Link>
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-900 flex items-center gap-1.5 text-xs font-semibold transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
          >
            <ArrowLeft size={14} /> Cancel
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 overflow-hidden">
          <div className="bg-primary/5 px-6 sm:px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-primary font-bold tracking-wider text-[10px] mb-1">TakeIN Studio Careers</p>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Submit Application</h1>
            </div>
            <p className="text-gray-500 text-[11px] sm:text-right max-w-xs leading-tight">Complete the application below. Our team will review your profile shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 space-y-6">
              {/* Section 1: Personal Information */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm text-gray-900 border-b border-gray-100 pb-1.5">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">First Name *</label>
                    <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Last Name *</label>
                    <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Email Address *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Current Location *</label>
                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" placeholder="City, Country" />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">LinkedIn *</label>
                    <input required type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">GitHub (Opt)</label>
                    <input type="url" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Portfolio (Opt)</label>
                    <input type="url" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" placeholder="https://" />
                  </div>
                </div>
              </div>

              {/* Section 4: File Uploads (Moved to Left Column) */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-sm text-gray-900 border-b border-gray-100 pb-1.5">Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Resume Upload */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      Resume (PDF) 
                      {formData.role !== "Sales Partner / Cold Calling" && <span className="text-red-500"> *</span>}
                    </label>
                    <div 
                      className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 py-3 px-4 flex items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                      onClick={() => resumeInputRef.current?.click()}
                    >
                      <UploadCloud className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
                      <div className="min-w-0">
                        {resumeName ? (
                          <p className="text-xs font-semibold text-primary truncate">{resumeName}</p>
                        ) : (
                          <p className="text-xs font-medium text-gray-900 truncate">Upload Resume</p>
                        )}
                      </div>
                      <input type="file" className="hidden" ref={resumeInputRef} onChange={handleResumeChange} accept=".pdf" required={formData.role !== "Sales Partner / Cold Calling"} />
                    </div>
                  </div>

                  {/* Portfolio Upload */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Portfolio (Opt)</label>
                    <div 
                      className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 py-3 px-4 flex items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                      onClick={() => portfolioInputRef.current?.click()}
                    >
                      <UploadCloud className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
                      <div className="min-w-0">
                        {portfolioName ? (
                          <p className="text-xs font-semibold text-primary truncate">{portfolioName}</p>
                        ) : (
                          <p className="text-xs font-medium text-gray-900 truncate">Upload Portfolio</p>
                        )}
                      </div>
                      <input type="file" className="hidden" ref={portfolioInputRef} onChange={handlePortfolioChange} accept=".pdf" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex-1 space-y-6">
              
              {/* Section 2: Position Information */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm text-gray-900 border-b border-gray-100 pb-1.5">Position Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Role *</label>
                    <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all appearance-none cursor-pointer">
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
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Employment Type *</label>
                    <select required value={formData.employmentType} onChange={e => setFormData({...formData, employmentType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all appearance-none cursor-pointer">
                      <option value="" disabled>Select type...</option>
                      <option value="Freelance / Contract">Freelance / Contract</option>
                      <option value="Commission Based">Commission Based</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Experience *</label>
                    <input required type="text" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" placeholder="e.g. 3 years" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Expected Comp *</label>
                    <input required type="text" value={formData.compensation} onChange={e => setFormData({...formData, compensation: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" placeholder="e.g. 20% Commission" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Available Start Date *</label>
                    <input required type="text" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all" placeholder="e.g. Immediately" />
                  </div>
                </div>
              </div>

              {/* Section 3: Skills */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-sm text-gray-900 border-b border-gray-100 pb-1.5">Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {availableSkills.map((skill) => {
                    const isSelected = formData.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all border ${
                          isSelected 
                            ? 'bg-primary text-white border-primary shadow-sm' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:bg-primary/5'
                        }`}
                      >
                        {skill} {isSelected && <X size={10} className="inline ml-0.5 mb-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Cover Letter & Submit */}
              <div className="space-y-3 pt-2 border-t border-gray-100 mt-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Cover Letter</label>
                  <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none transition-all resize-none" placeholder="Briefly tell us about your experience..."></textarea>
                </div>

                <div className="flex items-start gap-2.5 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <input 
                    type="checkbox" 
                    id="declaration"
                    checked={formData.declaration}
                    onChange={e => setFormData({...formData, declaration: e.target.checked})}
                    className="mt-0.5 w-3.5 h-3.5 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="declaration" className="text-[10px] text-gray-600 leading-snug cursor-pointer select-none">
                    I confirm that the information provided is accurate. False statements may result in disqualification.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide rounded-lg shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>

            </div>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-[10px] text-gray-400 mt-4 font-medium mb-8">
          TakeIN Studio © {new Date().getFullYear()}. All information is strictly confidential.
        </p>

      </div>
    </div>
  );
}
