import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UploadCloud, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";

export default function ApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Application Submitted | TakeIN Studio</title>
        </Helmet>
        <AnimatedSection>
          <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="font-display text-2xl font-bold mb-3 text-gray-900">Application Received!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Thank you for applying. Our team will review your application and get back to you within 1-2 weeks.
            </p>
            <button 
              onClick={() => window.close()}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all"
            >
              Close Window
            </button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Apply Now | TakeIN Studio</title>
      </Helmet>

      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <img src="/logo/logo_text.png" alt="TakeIN Studio" className="h-10 object-contain" />
          <button 
            onClick={() => window.close()} 
            className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Back to site
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1">
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Submit Your Application</h1>
            <p className="text-gray-500 text-sm">Join TakeIN Studio and help us build exceptional digital experiences.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 outline-none transition-all" placeholder="John Doe" />
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
                <input required type="email" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Phone Number <span className="text-red-500">*</span></label>
                <input required type="tel" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 outline-none transition-all" placeholder="+1 (555) 000-0000" />
              </div>
              
              {/* Role */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Role Applying For <span className="text-red-500">*</span></label>
                <select required className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 outline-none transition-all appearance-none cursor-pointer">
                  <option value="" disabled selected>Select a role...</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
                  <option value="Video Editor">Video Editor</option>
                  <option value="Other / General Application">Other / General Application</option>
                </select>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Resume / CV <span className="text-red-500">*</span></label>
              <div 
                className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                {fileName ? (
                  <p className="text-sm font-semibold text-primary">{fileName}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-900">Click to upload your resume</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (Max. 5MB)</p>
                  </>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx"
                  required 
                />
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Portfolio / LinkedIn / GitHub URL</label>
              <input type="url" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 outline-none transition-all" placeholder="https://" />
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Additional Notes or Cover Letter</label>
              <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 outline-none transition-all resize-none" placeholder="Tell us why you'd be a great fit..."></textarea>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 size={18} className="animate-spin" /> Submitting Application...</>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
            
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} TakeIN Studio. All information provided is confidential and stored securely.
        </p>

      </div>
    </div>
  );
}
