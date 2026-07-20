import { supabase } from '@/lib/supabase';
import { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { 
  LayoutDashboard, LogOut, Users, Briefcase, FileText, Settings, Key, Lock, Send, AlertCircle, Edit, Trash2, Plus, Sparkles, Loader2, Save, X, Eye, ArrowRight, CheckCircle2, Monitor, Video, Palette, Megaphone, TrendingUp, Building, ShieldCheck, Smartphone, Code, Bot, Wrench, MessageSquare, Menu
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PricingPage, { pricingData } from "./PricingPage"; // For live preview and default data
import { servicesData } from "./ServicesPage";



import OverviewBuilder from "./admin/OverviewBuilder";
import ServicesBuilder from "./admin/ServicesBuilder";
import PricingBuilder from "./admin/PricingBuilder";
import RecruitmentHubBuilder from "./admin/RecruitmentHubBuilder";
import DocumentsBuilder from "./admin/DocumentsBuilder";
import EmailCenterBuilder from "./admin/EmailCenterBuilder";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data State
  const [data, setData] = useState<any>({ leads: [], careers: [], pricing: [], services: [], content: [], jobs: [], testimonials: [] });
  const [loading, setLoading] = useState(true); // Start loading true
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    // Check Authentication on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin");
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Modals state
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [editingPricing, setEditingPricing] = useState<any>({
    category: "Web Development", name: "", description: "", price_in: "", price_intl: "", features: "", is_popular: 0, cta_text: ""
  });
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>({
    title: "", description: "", icon: "", offerings: "", buttons: ""
  });
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Settings state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});
  const [cmsUpdating, setCmsUpdating] = useState(false);

  // Jobs state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>({
    title: "", department: "", location: "", type: "Full-time", description: "", requirements: "", status: "Open"
  });
  
  // Testimonial state
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>({
    name: "", role: "", text: "", rating: 5, is_approved: 1
  });

  // High-fidelity UI State
  const [pricingActiveTab, setPricingActiveTab] = useState("web-development");
  const [pricingRegion, setPricingRegion] = useState("IN");

  const displayCategories = [
    { id: "web-development", name: "Web Development" },
    { id: "app-development", name: "App Development" },
    { id: "custom-software", name: "Custom Software" },
    { id: "ai-automation", name: "AI Automation" },
    { id: "website-maintenance", name: "Maintenance & Support" },
    { id: "video-editing", name: "Video Editing" },
    { id: "graphic-design", name: "Graphic Design" },
    { id: "digital-branding-smm", name: "Branding & SMM" },
    { id: "seo-marketing", name: "SEO & Marketing" }
  ];

  const getPriceValue = (t: any) => {
    if (t.price_in === "Contact Sales" || t.price_intl === "Contact Sales") return "Contact Sales";
    return pricingRegion === "INTL" && t.price_intl ? t.price_intl : t.price_in;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resLeads, resCareers, resPricing, resServices, resContent, resJobs, resTestimonials] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('careers').select('*').order('created_at', { ascending: false }),
        supabase.from('pricing').select('*'),
        supabase.from('services').select('*'),
        supabase.from('content').select('*'),
        supabase.from('jobs').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      ]);
      setData({
        leads: resLeads.data || [],
        careers: resCareers.data || [],
        pricing: (resPricing.data || []).sort((a: any, b: any) => {
          if ((a.sort_order || 0) !== (b.sort_order || 0)) {
            return (a.sort_order || 0) - (b.sort_order || 0);
          }
          const getNum = (p: string) => {
            if (!p || p === "Contact Sales" || p === "Custom") return 99999999;
            return parseInt(p.replace(/[^0-9]/g, '')) || 0;
          };
          return getNum(a.price_in) - getNum(b.price_in);
        }),
        services: (resServices.data || []).filter((service: any, index: number, self: any[]) => index === self.findIndex((s: any) => s.title === service.title)),
        jobs: resJobs.data || [],
        testimonials: resTestimonials.data || []
      });
      setCmsContent(resContent.data?.reduce((acc: any, curr: any) => ({ ...acc, [curr.section_key]: curr.text_value }), {}) || {});
    } catch (err: any) {
      console.error(err);
      // Removed the hardcoded bypass.
      // If fetching fails due to RLS, they need to log in again.
      if (err.response?.status === 401) handleLogout();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const unlockDefaultPricing = async () => {
    setUnlocking(true);
    try {
      const payloads = [];
      for (const [cat, tiers] of Object.entries(pricingData)) {
        for (const tier of tiers) {
          payloads.push({
            category: cat,
            name: tier.name,
            description: tier.description,
            price_in: tier.price,
            price_intl: tier.internationalPrice,
            is_popular: tier.popular ? 1 : 0,
            features: JSON.stringify(tier.features),
            cta_text: tier.cta_text || "Get Started"
          });
        }
      }
      
      const { error } = await supabase.from('pricing').insert(payloads);
      if (error) throw error;
      
      await fetchData(); // Refresh data from backend
    } catch (err) {
      console.error(err);
      alert("Failed to unlock default pricing.");
    } finally {
      setUnlocking(false);
    }
  };

  const unlockDefaultServices = async () => {
    setUnlocking(true);
    // Map icon components to string names (Vite minifies function names so we can't read them dynamically)
    const iconNames: Record<string, string> = {
      "web-development": "Monitor",
      "app-development": "Smartphone",
      "custom-software": "Code",
      "ai-automation": "Bot",
      "digital-branding-smm": "Megaphone",
      "seo-marketing": "TrendingUp",
      "graphic-design": "Palette",
      "video-editing": "Video",
      "website-maintenance": "Wrench"
    };
    try {
      const payloads = servicesData.map(service => ({
        title: service.title,
        description: service.description,
        icon: iconNames[service.id] || "Monitor",
        offerings: JSON.stringify(service.offerings),
        buttons: JSON.stringify(service.buttons)
      }));
      
      const { error } = await supabase.from('services').insert(payloads);
      if (error) throw error;
      
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to unlock default services.");
    } finally {
      setUnlocking(false);
    }
  };


  const unlockDefaultTestimonials = async () => {
    setUnlocking(true);
    try {
      const data = [
        { name: "Rahul Sharma", role: "Founder, EduSpark Academy", text: "TakeIN Studio completely transformed our coaching institute website. The new design looks professional, loads quickly, and has significantly improved student inquiries. Their team was responsive throughout the project and delivered everything on time.", rating: 5, is_approved: 1 },
        { name: "Priya Mehta", role: "Director, Mehta Healthcare Clinic", text: "We needed a modern website and appointment management system for our clinic. TakeIN Studio delivered exactly what we envisioned. The platform is easy to use, and patient bookings have become much more organized.", rating: 5, is_approved: 1 },
        { name: "Arjun Patel", role: "Owner, Patel Fitness Hub", text: "Our gym website and membership portal were built professionally and within budget. The team understood our requirements perfectly and provided excellent post-launch support.", rating: 5, is_approved: 1 },
        { name: "Sneha Roy", role: "Founder, Bloom Boutique", text: "TakeIN Studio developed our e-commerce website and helped us establish a strong online presence. The website is beautiful, user-friendly, and has increased our online sales noticeably.", rating: 5, is_approved: 1 },
        { name: "Vikram Singh", role: "Managing Director, Singh Realty", text: "The custom website and lead management system built by TakeIN Studio have streamlined our real estate operations. Their attention to detail and professionalism exceeded our expectations.", rating: 5, is_approved: 1 },
        { name: "Neha Agarwal", role: "Founder, SkillBridge Learning", text: "Our educational platform required a modern website with multiple integrations. The team delivered a polished solution and ensured everything worked flawlessly. Highly recommended for educational institutions.", rating: 5, is_approved: 1 },
        { name: "Karan Verma", role: "CEO, Verma Enterprises", text: "The mobile application developed by TakeIN Studio has improved customer engagement and simplified our internal processes. Their communication and technical expertise were outstanding throughout the project.", rating: 5, is_approved: 1 },
        { name: "Ananya Gupta", role: "Founder, Urban Eats Restaurant", text: "We partnered with TakeIN Studio for our restaurant website and ongoing maintenance. Their support team is always available, and our website remains secure, fast, and updated.", rating: 5, is_approved: 1 },
        { name: "Ritesh Nair", "role": "Operations Head, Nexa Logistics", text: "TakeIN Studio developed a custom business dashboard that helped us automate several manual processes. The solution saved our team countless hours and improved efficiency across departments.", rating: 5, is_approved: 1 },
        { name: "Pooja Kapoor", "role": "Founder, Kapoor Digital Services", text: "Their website maintenance service has been exceptional. From security updates to performance optimization, everything is handled proactively. We can focus on our business while they manage the technical side.", rating: 5, is_approved: 1 }
      ];
      const { error } = await supabase.from('testimonials').insert(data);
      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to insert testimonials.");
    } finally {
      setUnlocking(false);
    }
  };

  // ----- MODALS -----
  const openEditPricing = (tier: any = null) => {
    if (tier) {
      setEditingPricing({ ...tier, features: typeof tier.features === 'string' ? JSON.parse(tier.features).join("\n") : tier.features.join("\n") });
    } else {
      setEditingPricing({ category: "Web Development", name: "", price_in: "", price_intl: "", description: "", features: "", cta_text: "Get Started", is_popular: 0 });
    }
    setIsPricingModalOpen(true);
  };

  const savePricing = async () => {
    try {
      const payload = {
        ...editingPricing,
        features: editingPricing.features.split("\n").filter((f: string) => f.trim() !== ""),
        is_popular: editingPricing.is_popular ? 1 : 0
      };
      if (editingPricing.id) {
        await supabase.from('pricing').update(payload).eq('id', editingPricing.id);
      } else {
        await supabase.from('pricing').insert([payload]);
      }
      setIsPricingModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Error saving pricing data");
    }
  };

  const deletePricing = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this pricing tier?")) return;
    try {
      await supabase.from('pricing').delete().eq('id', id);
      fetchData();
    } catch (err) {
      alert("Error deleting");
    }
  };

  const openEditService = (service: any = null) => {
    if (service) {
      setEditingService({ 
        ...service, 
        offerings: Array.isArray(service.offerings) ? service.offerings.join("\n") : (typeof service.offerings === 'string' ? JSON.parse(service.offerings).join("\n") : ""),
        buttons: Array.isArray(service.buttons) ? JSON.stringify(service.buttons) : (typeof service.buttons === 'string' ? service.buttons : JSON.stringify([{ text: "View Pricing", url: "/pricing", variant: "primary" }]))
      });
    } else {
      setEditingService({ title: "", description: "", icon: "Monitor", offerings: "", buttons: JSON.stringify([{ text: "View Pricing", url: "/pricing", variant: "primary" }]) });
    }
    setIsServiceModalOpen(true);
  };

  const saveService = async () => {
    try {
      const payload = {
        ...editingService,
        offerings: Array.isArray(editingService.offerings) ? editingService.offerings : editingService.offerings.split("\n").map((f: string) => f.trim()).filter(Boolean),
        buttons: Array.isArray(editingService.buttons) ? editingService.buttons : (editingService.buttons ? JSON.parse(editingService.buttons) : [{ text: "View Pricing", url: "/pricing", variant: "primary" }])
      };
      if (editingService.id) {
        await supabase.from('services').update(payload).eq('id', editingService.id);
      } else {
        await supabase.from('services').insert([payload]);
      }
      setIsServiceModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Error saving service data");
    }
  };

  const deleteService = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await supabase.from('services').delete().eq('id', id);
      fetchData();
    } catch (err) {
      alert("Error deleting");
    }
  };

  // ----- JOBS METHODS -----
  const openEditJob = (job: any = null) => {
    if (job) {
      setEditingJob({ 
        ...job, 
        requirements: Array.isArray(job.requirements) ? job.requirements.join("\n") : (typeof job.requirements === 'string' ? JSON.parse(job.requirements).join("\n") : "")
      });
    } else {
      setEditingJob({ title: "", department: "", location: "", type: "Full-time", description: "", requirements: "", status: "Open" });
    }
    setIsJobModalOpen(true);
  };

  const saveJob = async () => {
    try {
      const payload = {
        ...editingJob,
        requirements: Array.isArray(editingJob.requirements) ? editingJob.requirements : editingJob.requirements.split("\n").map((r: string) => r.trim()).filter(Boolean)
      };
      if (editingJob.id) {
        await supabase.from('jobs').update(payload).eq('id', editingJob.id);
      } else {
        await supabase.from('jobs').insert([payload]);
      }
      setIsJobModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Error saving job data");
    }
  };

  const deleteJob = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await supabase.from('jobs').delete().eq('id', id);
      fetchData();
    } catch (err) {
      alert("Error deleting job");
    }
  };

  // ----- TESTIMONIAL METHODS -----
  const openEditTestimonial = (testimonial: any = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
    } else {
      setEditingTestimonial({ name: "", role: "", text: "", rating: 5, is_approved: 1 });
    }
    setIsTestimonialModalOpen(true);
  };

  const saveTestimonial = async () => {
    try {
      if (editingTestimonial.id) {
        await supabase.from('testimonials').update(editingTestimonial).eq('id', editingTestimonial.id);
      } else {
        await supabase.from('testimonials').insert([editingTestimonial]);
      }
      setIsTestimonialModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Error saving testimonial data");
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await supabase.from('testimonials').delete().eq('id', id);
      fetchData();
    } catch (err) {
      alert("Error deleting testimonial");
    }
  };

  const toggleTestimonialApproval = async (testimonial: any) => {
    try {
      await supabase.from('testimonials').update({ ...testimonial, is_approved: testimonial.is_approved == 1 ? 0 : 1 }).eq('id', testimonial.id);
      fetchData();
    } catch (err) {
      alert("Error updating approval status");
    }
  };

  // ----- SETTINGS METHODS -----
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return alert("Password must be at least 6 characters");
    setPasswordUpdating(true);
    try {
      alert("Password change is not supported in hardcoded demo mode.");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
    setPasswordUpdating(false);
  };

  const handleSaveCMS = async () => {
    setCmsUpdating(true);
    try {
            // Convert cmsContent object to array of { section_key, text_value }
      const contentArray = Object.keys(cmsContent).map(key => ({
        section_key: key,
        text_value: cmsContent[key]
      }));
      // UPSERT is required for content items.
      await supabase.from('content').upsert(contentArray, { onConflict: 'section_key' });
      alert("Website content updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update content");
    }
    setCmsUpdating(false);
  };

  const updateCmsField = (key: string, value: string) => {
    setCmsContent(prev => ({ ...prev, [key]: value }));
  };

  // ----- LEADS METHODS -----
  const toggleLeadStatus = async (lead: any) => {
    const newStatus = lead.status === 'Contacted' ? 'New' : 'Contacted';
    try {
      await supabase.from('leads').update({ status: newStatus }).eq('id', lead.id);
      fetchData();
    } catch (err) {
      alert("Error updating lead status");
    }
  };

  const deleteLead = async (id: number) => {
    const pwd = window.prompt("Enter password to delete this lead:");
    if (pwd !== "8908") {
      alert("Incorrect password!");
      return;
    }
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    
    try {
      await supabase.from('leads').delete().eq('id', id);
      fetchData();
    } catch (err) {
      alert("Error deleting lead");
    }
  };


  // --- LOGIN SCREEN REDIRECT ---

  // --- DASHBOARD LAYOUT ---
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border/50 bg-card/90 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo/logo_no_text.png" alt="TakeIN Logo" className="h-7 w-auto mix-blend-multiply object-contain" />
          <div className="flex items-center text-xl">
            <span className="text-foreground font-black tracking-tight">Take</span>
            <span className="text-primary font-black tracking-tight">IN</span>
            <span className="text-muted-foreground font-semibold ml-1.5 tracking-normal text-sm self-end pb-0.5 uppercase">Panel</span>
          </div>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-foreground">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-card/95 md:bg-card/30 border-r border-border/50 flex flex-col backdrop-blur-xl fixed md:sticky top-[69px] md:top-0 h-[calc(100vh-69px)] md:h-screen z-40 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-border/50 hidden md:block">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo/logo_no_text.png" alt="TakeIN Logo" className="h-7 w-auto mix-blend-multiply object-contain" />
            <div className="flex items-center text-xl">
              <span className="text-foreground font-black tracking-tight">Take</span>
              <span className="text-primary font-black tracking-tight">IN</span>
              <span className="text-muted-foreground font-semibold ml-1.5 tracking-normal text-sm self-end pb-0.5 uppercase">Panel</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button onClick={() => { setActiveTab("overview"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "overview" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><LayoutDashboard size={18}/> Overview</button>
          <button onClick={() => { setActiveTab("pricing"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "pricing" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><FileText size={18}/> Pricing Studio</button>
          <button onClick={() => { setActiveTab("services"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "services" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><Briefcase size={18}/> Services Builder</button>
          <button onClick={() => { setActiveTab("email-center"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "email-center" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><Send size={18}/> Email Center</button>
          <button onClick={() => { setActiveTab("leads"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "leads" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><Send size={18}/> Leads & Inquiries</button>
          <button onClick={() => { setActiveTab("documents"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "documents" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><FileText size={18}/> Documents</button>
          <button onClick={() => { setActiveTab("jobs"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "jobs" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><Building size={18}/> Job Postings</button>
          <button onClick={() => { setActiveTab("testimonials"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "testimonials" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><MessageSquare size={18}/> Testimonials</button>
          <button onClick={() => { setActiveTab("careers"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "careers" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><Users size={18}/> Recruitment Hub</button>
          <button onClick={() => { setActiveTab("settings"); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "settings" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}><Settings size={18}/> Settings</button>
        </nav>
        
        <div className="p-4 border-t border-border/50">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={16}/> Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
        )}

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-display font-bold capitalize">{activeTab.replace("-", " ")}</h2>
              <p className="text-muted-foreground text-sm mt-1">Manage your website data in real-time.</p>
            </div>
            


            {activeTab === "testimonials" && (
              <div className="flex gap-3">
                <button onClick={() => openEditTestimonial(null)} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                  <Plus size={16}/> Add Testimonial
                </button>
              </div>
            )}
          </header>

          {activeTab === "overview" && <OverviewBuilder data={data} setActiveTab={setActiveTab} />}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <PricingBuilder data={data} fetchData={fetchData} unlockDefaultPricing={unlockDefaultPricing} unlocking={unlocking} />
          )}
          
          {/* Services Tab */}
          {activeTab === "services" && (
            <ServicesBuilder data={data} fetchData={fetchData} unlockDefaultServices={unlockDefaultServices} unlocking={unlocking} />
          )}

          {activeTab === "email-center" && <EmailCenterBuilder />}

          {/* Documents Tab */}
          {activeTab === "documents" && <DocumentsBuilder />}

          {/* Other Tabs (Placeholder for brevity, similar to before but darker UI) */}
          {activeTab === "leads" && (
            <div className="bg-card border border-border/50 rounded-2xl overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal min-w-[800px]">
                  <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {data.leads.map((l:any) => (
                      <tr key={l.id} className={`hover:bg-muted/20 transition-colors align-top ${l.status === 'Contacted' ? 'opacity-60 grayscale-[30%]' : ''}`}>
                        <td className="p-4 font-medium whitespace-nowrap">{l.name}</td>
                        <td className="p-4 whitespace-nowrap">
                          <div>{l.email}</div>
                          {l.phone && <div className="text-muted-foreground text-xs mt-1">{l.phone}</div>}
                        </td>
                        <td className="p-4"><span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs leading-tight inline-block">{l.service}</span></td>
                        <td className="p-4">
                          <div className="max-w-[350px] whitespace-pre-wrap text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
                            {l.message || "No message"}
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground whitespace-nowrap">{new Date(l.created_at).toLocaleDateString()}</td>
                        <td className="p-4">
                          <button 
                            onClick={() => toggleLeadStatus(l)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${l.status === 'Contacted' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'}`}
                          >
                            {l.status === 'Contacted' ? <><CheckCircle2 size={14}/> Contacted</> : <><AlertCircle size={14}/> New</>}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => deleteLead(l.id)} className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors" title="Delete Lead">
                            <Trash2 size={14}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                <div>
                  <h3 className="font-display font-bold text-lg">Manage Jobs</h3>
                  <p className="text-xs text-muted-foreground">Add and manage open roles</p>
                </div>
                <button onClick={() => openEditJob()} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90">
                  <Plus size={16}/> Post New Job
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.jobs.map((j: any) => (
                  <div key={j.id} className="bg-card border border-border/50 rounded-2xl p-5 relative group overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 ${j.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                          {j.status}
                        </span>
                        <h4 className="font-display font-bold text-lg leading-tight">{j.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{j.department} • {j.location} • {j.type}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground/80 line-clamp-2 mt-3">{j.description}</p>
                    
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditJob(j)} className="w-8 h-8 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-primary transition-all">
                        <Edit size={14}/>
                      </button>
                      <button onClick={() => deleteJob(j.id)} className="w-8 h-8 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-destructive transition-all">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Careers Tab */}
          {activeTab === "careers" && (
            <RecruitmentHubBuilder data={data} fetchData={fetchData} />
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.testimonials.map((t: any) => (
                  <div key={t.id} className={`bg-card border rounded-2xl p-6 relative group overflow-hidden ${t.is_approved == 1 ? 'border-primary/50 shadow-sm shadow-primary/10' : 'border-border/50 opacity-80 grayscale-[20%]'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-display font-bold text-lg">{t.name}</h4>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm italic text-muted-foreground mb-4">"{t.text}"</p>
                    <div className="flex justify-between items-center mt-auto border-t border-border/50 pt-4">
                      <button 
                        onClick={() => toggleTestimonialApproval(t)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${t.is_approved == 1 ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'}`}
                      >
                        {t.is_approved == 1 ? <><CheckCircle2 size={14}/> Approved</> : <><Lock size={14}/> Pending</>}
                      </button>
                      <div className="flex gap-2">
                        <button onClick={() => openEditTestimonial(t)} className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"><Edit size={14}/></button>
                        <button onClick={() => deleteTestimonial(t.id)} className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  </div>
                ))}
                {data.testimonials.length === 0 && (
                   <div className="col-span-full py-12 text-center bg-card border border-dashed border-border/60 rounded-3xl">
                     <p className="text-muted-foreground text-sm font-medium">No testimonials available.</p>
                   </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 max-w-md mx-auto gap-6 mt-8">
              
              {/* Password Settings */}
              <div className="space-y-6">
                <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Key className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">Security</h3>
                      <p className="text-xs text-muted-foreground">Update administrator password</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="relative">
                      <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">New Password</label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm pr-10" 
                        placeholder="Enter new password"
                        minLength={6}
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="relative">
                      <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Confirm Password</label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm pr-10" 
                        placeholder="Confirm new password"
                        minLength={6}
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      type="submit" 
                      disabled={passwordUpdating || newPassword !== confirmPassword || !newPassword}
                      className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                    >
                      {passwordUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* PRICING MODAL EDITOR */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border/50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
              <h3 className="text-xl font-bold font-display">{editingPricing?.id ? "Edit Pricing Tier" : "Add New Tier"}</h3>
              <button onClick={() => setIsPricingModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Category</label>
                  <input type="text" value={editingPricing.category} onChange={e => setEditingPricing({...editingPricing, category: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Web Development" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Tier Name</label>
                  <input type="text" value={editingPricing.name} onChange={e => setEditingPricing({...editingPricing, name: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Starter" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Price (India)</label>
                  <input type="text" value={editingPricing.price_in} onChange={e => setEditingPricing({...editingPricing, price_in: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="₹4,999" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Price (International)</label>
                  <input type="text" value={editingPricing.price_intl} onChange={e => setEditingPricing({...editingPricing, price_intl: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="$499" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Description</label>
                <textarea value={editingPricing.description} onChange={e => setEditingPricing({...editingPricing, description: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" rows={2}></textarea>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block flex justify-between">
                  <span>Features</span>
                  <span className="text-[10px] text-muted-foreground normal-case">One feature per line</span>
                </label>
                <textarea value={editingPricing.features} onChange={e => setEditingPricing({...editingPricing, features: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-mono leading-relaxed" rows={6}></textarea>
              </div>
              
              <div className="flex items-center gap-6 bg-muted/20 p-4 rounded-xl border border-border/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={editingPricing.is_popular == 1} onChange={e => setEditingPricing({...editingPricing, is_popular: e.target.checked ? 1 : 0})} className="w-5 h-5 rounded border-border text-primary focus:ring-primary bg-background" />
                  <span className="text-sm font-semibold">Mark as "Most Popular"</span>
                </label>
                
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Button Text</label>
                  <input type="text" value={editingPricing.cta_text} onChange={e => setEditingPricing({...editingPricing, cta_text: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm" placeholder="Get Started" />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-border/50 bg-muted/10 flex justify-end gap-3">
              <button onClick={() => setIsPricingModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={savePricing} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2">
                <Save size={16}/> Save & Publish
              </button>
            </div>
          </div>
        </div>
      )}
      {/* SERVICES MODAL EDITOR */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border/50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
              <h3 className="text-xl font-bold font-display">{editingService?.id ? "Edit Service" : "Add New Service"}</h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Title</label>
                  <input type="text" value={editingService.title} onChange={e => setEditingService({...editingService, title: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Website Development" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Icon Name</label>
                  <input type="text" value={editingService.icon} onChange={e => setEditingService({...editingService, icon: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Monitor, Smartphone" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Description</label>
                <textarea value={editingService.description} onChange={e => setEditingService({...editingService, description: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" rows={3}></textarea>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block flex justify-between">
                  <span>Offerings (Bullet Points)</span>
                  <span className="text-[10px] text-muted-foreground normal-case">One offering per line</span>
                </label>
                <textarea value={editingService.offerings} onChange={e => setEditingService({...editingService, offerings: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-mono leading-relaxed" rows={5}></textarea>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block flex justify-between">
                  <span>Buttons (JSON format)</span>
                </label>
                <textarea value={editingService.buttons} onChange={e => setEditingService({...editingService, buttons: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs font-mono leading-relaxed" rows={3} placeholder='[{"text":"View Pricing","url":"/pricing","variant":"primary"}]'></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t border-border/50 bg-muted/10 flex justify-end gap-3">
              <button onClick={() => setIsServiceModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={saveService} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2">
                <Save size={16}/> Save & Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOB EDITOR MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border/50 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative custom-scrollbar">
            <div className="sticky top-0 bg-card/80 backdrop-blur-xl border-b border-border/50 p-6 flex justify-between items-center z-10">
              <div>
                <h3 className="font-display font-bold text-xl">{editingJob.id ? "Edit Job Posting" : "Create New Job"}</h3>
                <p className="text-xs text-muted-foreground">Fill in the details to publish a role</p>
              </div>
              <button onClick={() => setIsJobModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-colors">
                <X size={18}/>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Job Title</label>
                  <input type="text" value={editingJob.title} onChange={e => setEditingJob({...editingJob, title: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Department</label>
                  <input type="text" value={editingJob.department} onChange={e => setEditingJob({...editingJob, department: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Engineering" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Location</label>
                  <input type="text" value={editingJob.location} onChange={e => setEditingJob({...editingJob, location: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Remote / On-site" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Job Type</label>
                  <select value={editingJob.type} onChange={e => setEditingJob({...editingJob, type: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Status</label>
                  <select value={editingJob.status} onChange={e => setEditingJob({...editingJob, status: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm">
                    <option value="Open">Open (Visible)</option>
                    <option value="Closed">Closed (Hidden)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Job Description</label>
                <textarea value={editingJob.description} onChange={e => setEditingJob({...editingJob, description: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm h-32" placeholder="Briefly describe the role..."></textarea>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Requirements & Qualifications</label>
                <p className="text-[10px] text-muted-foreground mb-2">Enter one requirement per line</p>
                <textarea value={editingJob.requirements} onChange={e => setEditingJob({...editingJob, requirements: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm h-32" placeholder="- 3+ years of React experience&#10;- Strong communication skills"></textarea>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-card/80 backdrop-blur-xl border-t border-border/50 p-4 sm:p-6 flex justify-end gap-3 z-10">
              <button onClick={() => setIsJobModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-muted/50 hover:bg-muted transition-colors">Cancel</button>
              <button onClick={saveJob} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 flex items-center gap-2 shadow-sm">
                <Save size={16}/> Save Job Posting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIAL EDITOR MODAL */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border/50 rounded-3xl w-full max-w-lg shadow-2xl relative">
            <div className="border-b border-border/50 p-6 flex justify-between items-center">
              <div>
                <h3 className="font-display font-bold text-xl">{editingTestimonial.id ? "Edit Testimonial" : "Add Testimonial"}</h3>
              </div>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-colors">
                <X size={18}/>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Name</label>
                <input type="text" value={editingTestimonial.name} onChange={e => setEditingTestimonial({...editingTestimonial, name: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Role / Company</label>
                <input type="text" value={editingTestimonial.role} onChange={e => setEditingTestimonial({...editingTestimonial, role: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="CEO, Example Corp" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Testimonial Text</label>
                <textarea value={editingTestimonial.text} onChange={e => setEditingTestimonial({...editingTestimonial, text: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm h-24" placeholder="Their service was amazing..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Rating</label>
                  <select value={editingTestimonial.rating} onChange={e => setEditingTestimonial({...editingTestimonial, rating: parseInt(e.target.value)})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm">
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Status</label>
                  <select value={editingTestimonial.is_approved} onChange={e => setEditingTestimonial({...editingTestimonial, is_approved: parseInt(e.target.value)})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm">
                    <option value={1}>Approved</option>
                    <option value={0}>Pending</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border/50 p-6 flex justify-end gap-3 bg-muted/10 rounded-b-3xl">
              <button onClick={() => setIsTestimonialModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-muted/50 hover:bg-muted transition-colors">Cancel</button>
              <button onClick={saveTestimonial} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 flex items-center gap-2 shadow-sm">
                <Save size={16}/> Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
