import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function WebsiteCostBhubaneswar() {
  return (
    <div className="bg-cream min-h-screen">
      <SEO 
        title="Website Development Cost in Bhubaneswar (2026 Guide)" 
        description="Looking for web development costs in Bhubaneswar? This detailed guide breaks down pricing for corporate sites, e-commerce, and startups in Odisha."
      />

      <article className="pt-32 pb-20">
        {/* Header */}
        <header className="container mx-auto max-w-4xl px-4 py-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to Insights
          </Link>
          <span className="block text-primary text-xs font-bold uppercase tracking-widest mb-4">Business & Finance</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-8">
            The Realistic Cost of <span className="text-primary italic">Website Development</span> in Bhubaneswar (2026)
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground text-sm font-medium border-y border-border/40 py-4">
            <div className="flex items-center gap-2"><Calendar size={14} /> April 17, 2026</div>
            <div className="flex items-center gap-2"><Clock size={14} /> 8 min read</div>
            <div className="flex items-center gap-2"><User size={14} /> By TakeIN Studio Team</div>
          </div>
        </header>

        {/* Content */}
        <section className="container mx-auto max-w-3xl px-4 prose prose-neutral lg:prose-lg prose-primary">
          <p className="lead text-lg sm:text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 mb-12">
            "How much does a website cost?" is the most common question we get at TakeIN Studio. In 2026, the answer depends entirely on whether you want a digital business card or a revenue-generating machine.
          </p>

          <h2 className="font-display font-bold text-2xl mt-12 mb-4">The Bhubaneswar Market Reality</h2>
          <p>
            Bhubaneswar has evolved into a major IT hub. While you can find developers offering websites for ₹5,000, those sites often lack SEO, security, and professional design. A premium website that actually ranks on Google and converts users requires a higher investment.
          </p>

          <h3 className="font-display font-bold text-xl mt-8 mb-4">1. Basic Corporate Website (Static)</h3>
          <p>
            Best for small businesses or personal portfolios. 
            <br /><strong>Price Range:</strong> ₹15,000 – ₹35,000
            <br /><strong>Timeline:</strong> 1-2 weeks
          </p>

          <h3 className="font-display font-bold text-xl mt-8 mb-4">2. Professional Business Website (Dynamic)</h3>
          <p>
            Includes a CMS (Content Management System), SEO-optimized architecture, and custom UI design.
            <br /><strong>Price Range:</strong> ₹40,000 – ₹85,000
            <br /><strong>Timeline:</strong> 3-5 weeks
          </p>

          <h3 className="font-display font-bold text-xl mt-8 mb-4">3. E-commerce & Web Applications</h3>
          <p>
            Full-scale online stores with payment gateways, inventory management, and high security.
            <br /><strong>Price Range:</strong> ₹90,000 – ₹2,50,000+
            <br /><strong>Timeline:</strong> 6-12 weeks
          </p>

          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 my-12">
            <h4 className="font-display font-bold text-primary mb-2">Pro Tip: Don't ignore the hidden costs!</h4>
            <p className="text-sm">Remember to budget for domain registration, high-speed hosting, SSL certificates, and professional copywriting. At TakeIN Studio, we include these in our premium packages.</p>
          </div>

          <h2 className="font-display font-bold text-2xl mt-12 mb-4">Why the Gap in Pricing?</h2>
          <p>
            A cheaper website uses generic templates. A premium website is built with **modern tech stacks** like React or Next.js, ensuring 100% Core Web Vitals scores and superior SEO. In the long run, a ₹50,000 website that brings 10 clients is cheaper than a ₹5,000 website that brings zero. Check out our <Link to="/web-development-bhubaneswar" className="text-primary font-bold hover:underline">premium web development services</Link> to see how we build for performance.
          </p>

          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
            <p className="font-bold">Share this insight:</p>
            <div className="flex gap-4">
              <Share2 size={20} className="text-primary cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="container mx-auto max-w-4xl px-4 mt-20">
          <div className="clay-card p-10 text-center bg-foreground text-background">
            <h3 className="font-display text-2xl font-bold mb-4">Ready for an accurate quote?</h3>
            <p className="text-background/60 mb-8 max-w-md mx-auto">Skip the guesswork. Let's discuss your project goals and give you a tailored investment plan.</p>
            <Link to="/contact" className="glow-btn bg-primary text-primary-foreground inline-flex items-center gap-2">
              Start Your Free Audit <ArrowRight size={18} />
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
