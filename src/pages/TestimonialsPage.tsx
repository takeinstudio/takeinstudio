import { supabase } from '@/lib/supabase';
import { useEffect, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Star, MessageSquare, CheckCircle2, User, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8000" : "/api";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      setTestimonials(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;
    setSubmitting(true);
    setSubmitMessage("");
    try {
      await supabase.from('testimonials').insert([{
        name, role, text, rating
      }]);
      setSubmitMessage("Thank you! Your testimonial has been submitted and is pending review.");
      setName("");
      setRole("");
      setText("");
      setRating(5);
    } catch (err) {
      setSubmitMessage("There was an error submitting your testimonial. Please try again.");
    }
    setSubmitting(false);
  };

  return (
      <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
        <SEO 
          title="Client Testimonials" 
          description="Read what our clients have to say about working with TakeIN Studio." 
          canonical="https://takeinstudio.com/testimonials"
        />
        {/* Background Effects */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Client <span className="text-primary italic">Testimonials</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Don't just take our word for it. Here is what some of our amazing clients have to say about working with TakeIN Studio.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-24">
              {testimonials.map((t, idx) => (
                <AnimatedSection key={t.id} delay={idx * 0.1} className="break-inside-avoid">
                  <div className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <MessageSquare size={80} />
                    </div>
                    <div className="flex text-yellow-500 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'fill-current' : 'text-muted-foreground/30'}`} />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-foreground/90 italic mb-8 relative z-10">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-4 relative z-10 border-t border-border/50 pt-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold font-display">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
              {testimonials.length === 0 && (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No testimonials available at the moment.</p>
                </div>
              )}
            </div>
          )}

          {/* Submit Testimonial Section */}
          <AnimatedSection delay={0.3} className="max-w-2xl mx-auto mt-20">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
               
               <div className="text-center mb-10">
                 <h2 className="text-3xl font-display font-bold mb-4">Leave a Review</h2>
                 <p className="text-muted-foreground">Have you worked with us? We'd love to hear your feedback!</p>
               </div>

               {submitMessage ? (
                 <div className={`p-6 rounded-2xl flex items-center gap-4 ${submitMessage.includes('error') ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'} border`}>
                   <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                   <p className="font-medium">{submitMessage}</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="text-xs font-semibold uppercase tracking-wider mb-2 block text-muted-foreground">Name *</label>
                       <input 
                         type="text" required
                         value={name} onChange={e => setName(e.target.value)}
                         className="w-full bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm transition-all"
                         placeholder="John Doe"
                       />
                     </div>
                     <div>
                       <label className="text-xs font-semibold uppercase tracking-wider mb-2 block text-muted-foreground">Role / Company</label>
                       <input 
                         type="text"
                         value={role} onChange={e => setRole(e.target.value)}
                         className="w-full bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm transition-all"
                         placeholder="Founder, Acme Inc."
                       />
                     </div>
                   </div>
                   
                   <div>
                     <label className="text-xs font-semibold uppercase tracking-wider mb-2 block text-muted-foreground">Rating *</label>
                     <div className="flex gap-2 text-yellow-500 cursor-pointer">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           className={`w-8 h-8 transition-all ${i < rating ? 'fill-current scale-110' : 'text-muted-foreground/30 hover:text-yellow-500/50'}`} 
                           onClick={() => setRating(i + 1)}
                         />
                       ))}
                     </div>
                   </div>

                   <div>
                     <label className="text-xs font-semibold uppercase tracking-wider mb-2 block text-muted-foreground">Your Experience *</label>
                     <textarea 
                       required
                       value={text} onChange={e => setText(e.target.value)}
                       className="w-full bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm transition-all min-h-[120px]"
                       placeholder="Tell us about your experience working with TakeIN Studio..."
                     ></textarea>
                   </div>

                   <button 
                     type="submit" disabled={submitting}
                     className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
                   >
                     {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquare className="w-5 h-5" />}
                     {submitting ? "Submitting..." : "Submit Testimonial"}
                   </button>
                 </form>
               )}
            </div>
          </AnimatedSection>
        </div>
      </div>
  );
}
