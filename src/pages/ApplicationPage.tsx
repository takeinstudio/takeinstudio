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
          <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="font-display text-2xl font-bold mb-3 text-gray-900">Application Received!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Thank you for applying. Your application will be reviewed by our team and we'll contact you if there's a suitable opportunity.
            </p>
            <Link 
              to="/"
              className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all"
            >
              Return Home
            </Link>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col py-10 px-4 sm:px-6 lg:px-8">
      <SEO title="Apply Now - Careers" description="Apply for a role at TakeIN Studio and join our team of creators and builders." />

      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <Link to="/">
            <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-8 sm:h-10 object-contain" />
          </Link>
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-semibold transition-colors bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm"
          >
            <ArrowLeft size={16} /> Cancel
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1 overflow-hidden">
          <div className="bg-primary/5 px-8 sm:px-12 py-10 border-b border-gray-100 text-center sm:text-left">
            <p className="text-primary font-bold tracking-wider uppercase text-xs mb-3">TakeIN Studio Careers</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Submit Your Application</h1>
            <p className="text-gray-500 text-sm max-w-xl">Complete the application below and our team will review your profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 sm:px-12 py-10 space-y-12">
            
            {/* Section 1: Personal Information */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">First Name <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Last Name <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Phone Number <span className="text-red-500">*</span></label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Current Location <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" placeholder="City, Country" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">LinkedIn Profile <span className="text-red-500">*</span></label>
                  <input required type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">GitHub Profile (Optional)</label>
                  <input type="url" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" placeholder="https://github.com/..." />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Portfolio Website (Optional)</label>
                  <input type="url" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" placeholder="https://" />
                </div>
              </div>
            </div>

            {/* Section 2: Position Information */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-gray-900 border-b border-gray-100 pb-2">Position Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Role Applying For <span className="text-red-500">*</span></label>
                  <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all appearance-none cursor-pointer">
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
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Employment Type <span className="text-red-500">*</span></label>
                  <select required value={formData.employmentType} onChange={e => setFormData({...formData, employmentType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Select type...</option>
                    <option value="Freelance / Contract">Freelance / Contract</option>
                    <option value="Commission Based">Commission Based</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Years of Experience <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" placeholder="e.g. 3 years" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Expected Compensation <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.compensation} onChange={e => setFormData({...formData, compensation: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" placeholder="e.g. ₹50,000/month or 20% Commission" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Available Start Date <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-all" placeholder="e.g. Immediately, or 2 weeks notice" />
                </div>
              </div>
            </div>

            {/* Section 3: Skills */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-gray-900 border-b border-gray-100 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                        isSelected 
                          ? 'bg-primary text-white border-primary shadow-md' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:bg-primary/5'
                      }`}
                    >
                      {skill} {isSelected && <X size={14} className="inline ml-1 mb-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: File Uploads */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="font-display font-bold text-xl text-gray-900 pb-2">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Resume Upload */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                    Resume (PDF) 
                    {formData.role !== "Sales Partner / Cold Calling" && <span className="text-red-500">*</span>}
                    {formData.role === "Sales Partner / Cold Calling" && <span className="text-gray-400 font-normal normal-case ml-1">(Optional for Sales)</span>}
                  </label>
                  <div 
                    className="w-full border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    onClick={() => resumeInputRef.current?.click()}
                  >
                    <UploadCloud className="mx-auto h-8 w-8 text-gray-400 mb-2 group-hover:text-primary transition-colors" />
                    {resumeName ? (
                      <p className="text-sm font-semibold text-primary truncate px-2">{resumeName}</p>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-gray-900">Upload Resume PDF</p>
                        <p className="text-xs text-gray-500 mt-1">Maximum Size: 10 MB</p>
                      </>
                    )}
                    <input type="file" className="hidden" ref={resumeInputRef} onChange={handleResumeChange} accept=".pdf" required={formData.role !== "Sales Partner / Cold Calling"} />
                  </div>
                </div>

                {/* Portfolio Upload */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Portfolio (Optional)</label>
                  <div 
                    className="w-full border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    onClick={() => portfolioInputRef.current?.click()}
                  >
                    <UploadCloud className="mx-auto h-8 w-8 text-gray-400 mb-2 group-hover:text-primary transition-colors" />
                    {portfolioName ? (
                      <p className="text-sm font-semibold text-primary truncate px-2">{portfolioName}</p>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-gray-900">Upload Portfolio PDF</p>
                        <p className="text-xs text-gray-500 mt-1">Maximum Size: 10 MB</p>
                      </>
                    )}
                    <input type="file" className="hidden" ref={portfolioInputRef} onChange={handlePortfolioChange} accept=".pdf" />
                  </div>
                </div>

              </div>
            </div>

            {/* Section 5: Cover Letter & Declaration */}
            <div className="space-y-6 border-t border-gray-100 pt-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Cover Letter</label>
                <textarea rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-4 outline-none transition-all resize-y" placeholder="Tell us about yourself, your experience, and why you'd like to work with TakeIN Studio..."></textarea>
              </div>

              <div className="flex items-start gap-3 mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input 
                  type="checkbox" 
                  id="declaration"
                  checked={formData.declaration}
                  onChange={e => setFormData({...formData, declaration: e.target.checked})}
                  className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="declaration" className="text-sm text-gray-600 leading-relaxed cursor-pointer select-none">
                  I confirm that the information provided is accurate and true to the best of my knowledge. I understand that any false statements may result in disqualification or termination.
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-12 py-4 bg-primary hover:bg-primary/90 text-white font-bold text-base tracking-wide rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mx-auto"
              >
                {isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" /> Submitting Application...</>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
            
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8 font-medium">
          TakeIN Studio © {new Date().getFullYear()}. All information is strictly confidential.
        </p>

      </div>
    </div>
  );
}
