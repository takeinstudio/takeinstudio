import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, Users, Briefcase, DollarSign, TrendingUp, Sun, Moon, 
  LayoutDashboard, LogOut, MapPin, MessageSquare, Globe, Search, Filter,
  CheckCircle2, AlertCircle, Clock, Eye, ChevronRight, Download, HelpCircle, Send
} from "lucide-react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/currency";
import { toast } from "sonner";

// Static mock data representing inquiries
const initialEnquiries = [
  {
    id: "enq-1",
    name: "Aman Senapati",
    company: "Utkal Fintech",
    type: "Web Application",
    budget: 65000,
    email: "aman@utkalfin.com",
    desc: "In need of a secure financial dashboard connecting with local banking gateways. Requires custom analytical charts.",
    date: "2026-05-18",
    status: "New"
  },
  {
    id: "enq-2",
    name: "Clara Vance",
    company: "Vibe Fitness",
    type: "Mobile App",
    budget: 95000,
    email: "clara@vibefit.co",
    desc: "Cross-platform React Native app for trainer booking, video subscriptions, and payment processing.",
    date: "2026-05-16",
    status: "Contacted"
  },
  {
    id: "enq-3",
    name: "Ritesh Mohanty",
    company: "Bhubaneswar Realty",
    type: "Web Application",
    budget: 40000,
    email: "ritesh@bbsrrealty.in",
    desc: "Real estate listing platform with interactive map search, virtual tours embeds, and WhatsApp booking integrations.",
    date: "2026-05-15",
    status: "Proposal Sent"
  },
  {
    id: "enq-4",
    name: "Sarah Jenkins",
    company: "Aura Skincare",
    type: "UI/UX Redesign",
    budget: 25000,
    email: "sarah@auraskin.com",
    desc: "Complete overhaul of our Shopify storefront UX to boost conversion. Deliverables include wireframes and Figma files.",
    date: "2026-05-12",
    status: "Closed"
  },
  {
    id: "enq-5",
    name: "John Miller",
    company: "SaaS Devs",
    type: "SaaS Product",
    budget: 120000,
    email: "john@saasdevs.io",
    desc: "Cloud-native resource monitoring tool with real-time alerting systems. Built with React and Supabase backend.",
    date: "2026-05-10",
    status: "New"
  }
];

// Revenue breakdown metrics
const monthlyRevenue = [
  { month: "Jan", revenue: 18000, projects: 3 },
  { month: "Feb", revenue: 22000, projects: 4 },
  { month: "Mar", revenue: 28000, projects: 5 },
  { month: "Apr", revenue: 24000, projects: 3 },
  { month: "May", revenue: 32000, projects: 6 },
  { month: "Jun", revenue: 38000, projects: 7 },
  { month: "Jul", revenue: 35000, projects: 5 },
  { month: "Aug", revenue: 42000, projects: 8 },
  { month: "Sep", revenue: 39000, projects: 6 },
  { month: "Oct", revenue: 45000, projects: 8 },
  { month: "Nov", revenue: 48000, projects: 9 },
  { month: "Dec", revenue: 52000, projects: 10 },
];

const revenueByCategory = [
  { name: "Web Application", value: 120000, percent: "48%", color: "hsl(18, 80%, 55%)" },
  { name: "Mobile App", value: 80000, percent: "32%", color: "hsl(200, 70%, 50%)" },
  { name: "UI/UX Redesign", value: 30000, percent: "12%", color: "hsl(220, 15%, 40%)" },
  { name: "SaaS Product", value: 18000, percent: "8%", color: "hsl(25, 30%, 80%)" }
];

const geoDistribution = [
  { name: "USA", value: 35, color: "hsl(200, 70%, 50%)" },
  { name: "India", value: 30, color: "hsl(18, 80%, 55%)" },
  { name: "UK", value: 15, color: "hsl(220, 15%, 40%)" },
  { name: "Europe", value: 10, color: "hsl(25, 30%, 80%)" },
  { name: "Others", value: 10, color: "hsl(25, 40%, 90%)" },
];

const clients = [
  { name: "Elevate Co.", project: "Website Redesign", status: "Active", budget: 24000, location: "USA", work: "Frontend + Backend Overhaul" },
  { name: "NovaTech", project: "Mobile App", status: "Active", budget: 45000, location: "India", work: "React Native Development" },
  { name: "PureForm", project: "Branding", status: "Completed", budget: 12000, location: "UK", work: "Logo & Identity System" },
  { name: "Zenith Labs", project: "Web Platform", status: "In Review", budget: 38000, location: "Germany", work: "E-learning Platform Build" }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  // Interactive states
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [searchEnquiry, setSearchEnquiry] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  // FAQ Messaging System states
  const [userQuestions, setUserQuestions] = useState<any[]>([]);
  const [selectedUserQuestion, setSelectedUserQuestion] = useState<any | null>(null);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [searchQuestion, setSearchQuestion] = useState("");
  const [filterQuestionStatus, setFilterQuestionStatus] = useState("");

  // Load user FAQ questions from persistent store
  useEffect(() => {
    const loaded = localStorage.getItem("takein_user_faqs");
    if (loaded) {
      setUserQuestions(JSON.parse(loaded));
    }
  }, [activeTab]);

  const handleSendReply = (e: React.FormEvent, questionId: string) => {
    e.preventDefault();
    if (!adminReplyText.trim()) {
      toast.error("Reply text cannot be empty.");
      return;
    }
    const updated = userQuestions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          status: "answered",
          reply: adminReplyText.trim(),
          replyAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        };
      }
      return q;
    });
    setUserQuestions(updated);
    localStorage.setItem("takein_user_faqs", JSON.stringify(updated));
    setSelectedUserQuestion((prev: any) => ({
      ...prev,
      status: "answered",
      reply: adminReplyText.trim(),
      replyAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }));
    setAdminReplyText("");
    toast.success("Administrative response posted successfully!");
  };

  useEffect(() => {
    const auth = localStorage.getItem("takein_demo_auth");
    if (!auth) navigate("/admin");
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("takein_demo_auth");
    toast.info("Signed out successfully");
    navigate("/admin");
  };

  // Change Enquiry Status
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev: any) => ({ ...prev, status: newStatus }));
    }
    toast.success(`Enquiry status updated to ${newStatus}`);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Proposal Sent":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Closed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Filter & Search enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(searchEnquiry.toLowerCase()) || 
                          e.company.toLowerCase().includes(searchEnquiry.toLowerCase()) ||
                          e.desc.toLowerCase().includes(searchEnquiry.toLowerCase());
    const matchesType = filterType === "" || e.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-500 font-sans">
      {/* Sidebar - Premium Minimalist */}
      <aside className="hidden lg:flex flex-col w-20 xl:w-64 bg-card/40 backdrop-blur-2xl border-r border-border/50 p-6 transition-all duration-300">
        <div className="font-display text-xl font-bold mb-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary shadow-glow flex-shrink-0" />
          <span className="hidden xl:inline"><span className="text-primary">TakeIN</span> Studio</span>
        </div>
        
        <nav className="flex-1 space-y-3">
          {[
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: MessageSquare, label: "Project Enquiry" },
            { icon: HelpCircle, label: "User Questions" },
            { icon: DollarSign, label: "Revenue Generated" },
            { icon: Users, label: "Clients Portfolio" },
          ].map((item) => (
            <div 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group ${
                activeTab === item.label 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <item.icon size={20} />
              <span className="hidden xl:inline text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-300 mt-auto"
        >
          <LogOut size={20} />
          <span className="hidden xl:inline text-sm font-semibold">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-border/50 px-8 flex items-center justify-between sticky top-0 bg-background/60 backdrop-blur-xl z-20">
          <div>
            <h1 className="font-display text-2xl font-bold">{activeTab}</h1>
            <p className="text-xs text-muted-foreground">Admin Console · Live Insights</p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDark(!dark)}
              className="w-10 h-10 rounded-2xl bg-card border border-border/50 flex items-center justify-center hover:bg-muted transition-all duration-300"
            >
              {dark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-primary" />}
            </button>
            <div className="flex items-center gap-3 bg-card border border-border/50 px-4 py-2 rounded-2xl text-foreground">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
              <span className="text-sm font-bold hidden sm:inline">Admin User</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="p-8 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* TAB 1: SUMMARY DASHBOARD */}
              {activeTab === "Dashboard" && (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[
                      { icon: Users, label: "Total Clients", value: "18", change: "+1", color: "text-primary" },
                      { icon: MessageSquare, label: "Project Enquiries", value: `${enquiries.length}`, change: "2 New", color: "text-accent" },
                      { icon: DollarSign, label: "Revenue Generated", value: "₹2,48,000", change: "+24%", color: "text-primary" },
                      { icon: Globe, label: "Global Presence", value: "5 Countries", change: "+1", color: "text-accent" },
                    ].map((s) => (
                      <div key={s.label} className="clay-card p-6 flex flex-col justify-between h-40 border border-white/10">
                        <div className="flex justify-between items-start">
                          <div className={`w-12 h-12 rounded-2xl bg-background/50 flex items-center justify-center ${s.color}`}>
                            <s.icon size={22} />
                          </div>
                          <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full">{s.change}</span>
                        </div>
                        <div>
                          <h4 className="text-sm text-muted-foreground font-medium">{s.label}</h4>
                          <p className="text-2xl font-bold font-display">{s.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Revenue Trend Area Chart */}
                    <div className="xl:col-span-2 clay-card p-8 border border-white/10">
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <h3 className="font-display text-xl font-bold">Revenue Velocity</h3>
                          <p className="text-sm text-muted-foreground">Monthly billing generated through project milestones</p>
                        </div>
                      </div>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={monthlyRevenue}>
                            <defs>
                              <linearGradient id="dashboardRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(18, 80%, 55%)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="hsl(18, 80%, 55%)" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="revenue" stroke="hsl(18, 80%, 55%)" strokeWidth={3} fillOpacity={1} fill="url(#dashboardRev)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Geo Distribution Pie */}
                    <div className="clay-card p-8 border border-white/10 flex flex-col justify-between">
                      <h3 className="font-display text-lg font-bold mb-4">Origin Distribution</h3>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={geoDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={75}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {geoDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        {geoDistribution.map((item) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="font-semibold text-muted-foreground">{item.name} ({item.value}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active Inquiries Snapshot */}
                  <div className="clay-card p-8 border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-display text-xl font-bold">Latest Enquiries</h3>
                      <button onClick={() => setActiveTab("Project Enquiry")} className="text-primary hover:underline text-sm font-semibold flex items-center gap-1">
                        View All Enquiries <ChevronRight size={16} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {enquiries.slice(0, 3).map((e) => (
                        <div key={e.id} className="p-4 rounded-xl border border-border/40 hover:border-primary/20 transition-all flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="font-bold text-sm">{e.name}</span>
                              <span className="text-xs text-muted-foreground">({e.company})</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 font-medium">Requested: <span className="text-foreground">{e.type}</span> (Budget: {formatPrice(e.budget)})</p>
                          </div>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full ${statusBadge(e.status)}`}>
                            {e.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: PROJECT ENQUIRY SECTION */}
              {activeTab === "Project Enquiry" && (
                <div className="space-y-6">
                  {/* Filters Header */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/60 backdrop-blur-md p-6 rounded-2xl border border-border/50">
                    <div className="relative w-full md:max-w-xs">
                      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                      <input 
                        type="text" 
                        placeholder="Search enquirers..."
                        value={searchEnquiry}
                        onChange={(e) => setSearchEnquiry(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <Filter size={16} className="text-primary flex-shrink-0" />
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-background border border-border text-xs focus:outline-none w-full md:w-44"
                      >
                        <option value="">All Project Types</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="UI/UX Redesign">UI/UX Redesign</option>
                        <option value="SaaS Product">SaaS Product</option>
                      </select>
                    </div>
                  </div>

                  {/* Enquiry Table */}
                  <div className="clay-card overflow-hidden border border-white/10">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className="bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                            <th className="px-6 py-4 font-bold">Enquirer</th>
                            <th className="px-6 py-4 font-bold">Project Type</th>
                            <th className="px-6 py-4 font-bold">Description</th>
                            <th className="px-6 py-4 font-bold">Budget</th>
                            <th className="px-6 py-4 font-bold">Received Date</th>
                            <th className="px-6 py-4 font-bold text-center">Status</th>
                            <th className="px-6 py-4 font-bold text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                          {filteredEnquiries.map((e) => (
                            <tr key={e.id} className="hover:bg-primary/5 transition-all">
                              <td className="px-6 py-5">
                                <div>
                                  <p className="font-bold text-foreground">{e.name}</p>
                                  <p className="text-xs text-muted-foreground">{e.company} · {e.email}</p>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <span className="font-semibold text-xs text-primary">{e.type}</span>
                              </td>
                              <td className="px-6 py-5 max-w-xs truncate text-xs text-muted-foreground">
                                {e.desc}
                              </td>
                              <td className="px-6 py-5 font-bold font-display">
                                {formatPrice(e.budget)}
                              </td>
                              <td className="px-6 py-5 text-xs text-muted-foreground">
                                {e.date}
                              </td>
                              <td className="px-6 py-5 text-center">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full ${statusBadge(e.status)}`}>
                                  {e.status}
                                </span>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <div className="flex gap-2 justify-center">
                                  <button 
                                    onClick={() => setSelectedEnquiry(e)}
                                    className="p-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-lg text-muted-foreground transition-all"
                                    title="View Specs"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  {e.status === "New" && (
                                    <button 
                                      onClick={() => handleUpdateStatus(e.id, "Contacted")}
                                      className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all"
                                      title="Mark Contacted"
                                    >
                                      <CheckCircle2 size={14} />
                                    </button>
                                  )}
                                  {e.status === "Contacted" && (
                                    <button 
                                      onClick={() => handleUpdateStatus(e.id, "Proposal Sent")}
                                      className="p-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg transition-all"
                                      title="Mark Proposal Sent"
                                    >
                                      <ChevronRight size={14} />
                                    </button>
                                  )}
                                  {e.status === "Proposal Sent" && (
                                    <button 
                                      onClick={() => handleUpdateStatus(e.id, "Closed")}
                                      className="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-lg transition-all"
                                      title="Mark Won/Closed"
                                    >
                                      <CheckCircle2 size={14} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredEnquiries.length === 0 && (
                        <div className="py-12 text-center text-muted-foreground text-xs font-semibold">
                          No matching enquiries found.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enquiry Details Modal */}
                  {selectedEnquiry && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                      <div className="glass-card max-w-lg w-full p-8 relative space-y-6 animate-in zoom-in-95">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display font-bold text-xl">{selectedEnquiry.name}</h3>
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{selectedEnquiry.company}</p>
                          </div>
                          <button onClick={() => setSelectedEnquiry(null)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all">✕</button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs border-y border-border/50 py-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest block">Project Type</span>
                            <span className="font-bold text-sm text-primary mt-1 block">{selectedEnquiry.type}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest block">Budget Size</span>
                            <span className="font-bold text-sm text-foreground mt-1 block">{formatPrice(selectedEnquiry.budget)}</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest block">Contact Email</span>
                            <span className="font-bold text-sm text-foreground mt-1 block">{selectedEnquiry.email}</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest block">Status</span>
                            <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full mt-1.5 ${statusBadge(selectedEnquiry.status)}`}>
                              {selectedEnquiry.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Enquiry Description</span>
                          <p className="bg-muted/40 p-4 rounded-xl border border-border/40 text-foreground leading-relaxed italic">{selectedEnquiry.desc}</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                          <select 
                            value={selectedEnquiry.status}
                            onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
                            className="px-3 py-2 bg-background border border-border text-xs rounded-xl focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <button onClick={() => setSelectedEnquiry(null)} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg">
                            Close Specs
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: REVENUE GENERATED */}
              {activeTab === "Revenue Generated" && (
                <div className="space-y-8">
                  {/* Financial Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Total Bookings Generated", value: "₹2,48,000", sub: "Calculated across active milestones", change: "+18% MoM" },
                      { label: "Average Value per project", value: "₹31,000", sub: "Core services contracts", change: "+8% growth" },
                      { label: "Accounts Receivable", value: "₹45,000", sub: "Payment pending final deploy", change: "2 invoices" }
                    ].map((card) => (
                      <div key={card.label} className="clay-card p-6 border border-white/10 flex flex-col justify-between h-36">
                        <div>
                          <h4 className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{card.label}</h4>
                          <p className="text-2xl font-bold font-display mt-2">{card.value}</p>
                        </div>
                        <div className="flex justify-between items-center text-xs mt-4 border-t border-border/30 pt-3">
                          <span className="text-muted-foreground">{card.sub}</span>
                          <span className="font-bold text-green-500">{card.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Revenue Distribution Chart & Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Big Bar Chart */}
                    <div className="lg:col-span-2 clay-card p-8 border border-white/10">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="font-display text-lg font-bold">Revenue Generated Timeline</h3>
                          <p className="text-xs text-muted-foreground">Monthly aggregated billing completions</p>
                        </div>
                        <button className="flex items-center gap-1.5 px-3.5 py-2 bg-muted hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all">
                          <Download size={14} /> Export Report
                        </button>
                      </div>
                      <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                            <Bar dataKey="revenue" fill="hsl(18, 80%, 55%)" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Breakdown Progress Bars */}
                    <div className="clay-card p-8 border border-white/10 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-lg font-bold mb-2">Category Contribution</h3>
                        <p className="text-xs text-muted-foreground mb-6">Sales percentage per service category</p>
                      </div>
                      
                      <div className="space-y-5">
                        {revenueByCategory.map((c) => (
                          <div key={c.name} className="space-y-1.5 text-xs">
                            <div className="flex justify-between font-bold text-foreground">
                              <span>{c.name}</span>
                              <span>{c.percent} ({formatPrice(c.value)})</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ backgroundColor: c.color, width: c.percent }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-border/30 pt-6 mt-6 text-center text-xs text-muted-foreground font-semibold">
                        Core Agency Billing Rate: <span className="text-foreground">₹2,800/hr avg</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Audit Trail */}
                  <div className="clay-card overflow-hidden border border-white/10">
                    <div className="p-6 border-b border-border/40">
                      <h3 className="font-display text-lg font-bold">Strategic Revenue Accounts</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className="bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                            <th className="px-6 py-4 font-bold">Client Portfolios</th>
                            <th className="px-6 py-4 font-bold">Category</th>
                            <th className="px-6 py-4 font-bold">Budget Allocation</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                          {clients.map((c) => (
                            <tr key={c.name} className="hover:bg-primary/5 transition-all">
                              <td className="px-6 py-4 font-bold text-foreground">{c.name}</td>
                              <td className="px-6 py-4 text-xs text-muted-foreground">{c.project}</td>
                              <td className="px-6 py-4 font-bold font-display">{formatPrice(c.budget)}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  c.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                }`}>
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CLIENTS PORTFOLIO */}
              {activeTab === "Clients Portfolio" && (
                <div className="clay-card overflow-hidden border border-white/10">
                  <div className="p-8 border-b border-border/50 flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold">Client Portfolios</h3>
                      <p className="text-sm text-muted-foreground font-semibold">Tracking ongoing works and strategic value</p>
                    </div>
                    <button onClick={() => toast.success("Opening safe-vault for client registry...")} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-2xl text-xs font-bold shadow-glow hover:scale-105 transition-all">
                      Add New Client
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto text-foreground">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/30 text-left text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                          <th className="px-8 py-5 font-bold">Client / Entity</th>
                          <th className="px-8 py-5 font-bold">Strategic Work</th>
                          <th className="px-8 py-5 font-bold">Region</th>
                          <th className="px-8 py-5 font-bold text-right">Investment</th>
                          <th className="px-8 py-5 font-bold text-center">Protocol</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {clients.map((c) => (
                          <tr key={c.name} className="group hover:bg-primary/5 transition-all duration-300">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-display font-bold text-primary group-hover:scale-110 transition-transform">
                                  {c.name[0]}
                                </div>
                                <div>
                                  <p className="font-bold">{c.name}</p>
                                  <p className="text-xs text-muted-foreground">{c.project}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2 text-xs">
                                <Briefcase size={14} className="text-muted-foreground" />
                                <span>{c.work}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin size={14} />
                                <span>{c.location}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right font-bold font-display">
                              {formatPrice(c.budget)}
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className={`inline-block px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider ${
                                c.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                c.status === "Completed" ? "bg-primary/10 text-primary" :
                                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}>
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: USER QUESTIONS (FAQ INTERACTIVE MESSAGING) */}
               {activeTab === "User Questions" && (
                 <div className="space-y-6">
                   {/* Filters Header */}
                   <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/60 backdrop-blur-md p-6 rounded-2xl border border-border/50">
                     <div className="relative w-full md:max-w-xs">
                       <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                       <input 
                         type="text" 
                         placeholder="Search questions or users..."
                         value={searchQuestion}
                         onChange={(e) => setSearchQuestion(e.target.value)}
                         className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary text-foreground"
                       />
                     </div>
                     <div className="flex items-center gap-3 w-full md:w-auto">
                       <Filter size={16} className="text-primary flex-shrink-0" />
                       <select
                         value={filterQuestionStatus}
                         onChange={(e) => setFilterQuestionStatus(e.target.value)}
                         className="px-4 py-3 rounded-xl bg-background border border-border text-xs focus:outline-none w-full md:w-44 text-foreground font-semibold"
                       >
                         <option value="">All Statuses</option>
                         <option value="pending">Pending Response</option>
                         <option value="answered">Answered</option>
                       </select>
                     </div>
                   </div>

                   {/* Questions Table */}
                   <div className="clay-card overflow-hidden border border-white/10">
                     <div className="overflow-x-auto text-foreground">
                       <table className="w-full text-sm text-left">
                         <thead>
                           <tr className="bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                             <th className="px-6 py-4 font-bold">User Details</th>
                             <th className="px-6 py-4 font-bold">Submitted Question</th>
                             <th className="px-6 py-4 font-bold">Submitted Date</th>
                             <th className="px-6 py-4 font-bold text-center">Status</th>
                             <th className="px-6 py-4 font-bold text-center">Actions</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-border/20">
                           {userQuestions
                             .filter((q) => {
                               const matchesSearch = 
                                 q.name.toLowerCase().includes(searchQuestion.toLowerCase()) || 
                                 q.email.toLowerCase().includes(searchQuestion.toLowerCase()) || 
                                 q.question.toLowerCase().includes(searchQuestion.toLowerCase());
                               const matchesStatus = filterQuestionStatus === "" || q.status === filterQuestionStatus;
                               return matchesSearch && matchesStatus;
                             })
                             .map((q) => (
                               <tr key={q.id} className="hover:bg-primary/5 transition-all">
                                 <td className="px-6 py-5">
                                   <div>
                                     <p className="font-bold text-foreground">{q.name}</p>
                                     <p className="text-xs text-muted-foreground">{q.email}</p>
                                   </div>
                                 </td>
                                 <td className="px-6 py-5 max-w-sm truncate text-xs text-muted-foreground font-semibold">
                                   "{q.question}"
                                 </td>
                                 <td className="px-6 py-5 text-xs text-muted-foreground">
                                   {q.createdAt}
                                 </td>
                                 <td className="px-6 py-5 text-center">
                                   <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full ${
                                     q.status === "answered" 
                                       ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                       : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 animate-pulse"
                                   }`}>
                                     {q.status === "answered" ? "Answered" : "Pending"}
                                   </span>
                                 </td>
                                 <td className="px-6 py-5 text-center">
                                   <button 
                                     onClick={() => {
                                       setSelectedUserQuestion(q);
                                       setAdminReplyText(q.reply || "");
                                     }}
                                     className="px-4 py-2 bg-primary text-primary-foreground hover:scale-105 rounded-xl text-xs font-bold transition-all shadow-glow flex items-center gap-1.5 mx-auto"
                                   >
                                     <Eye size={12} /> {q.status === "answered" ? "View Conversation" : "Reply Message"}
                                   </button>
                                 </td>
                               </tr>
                             ))}
                         </tbody>
                       </table>
                       {userQuestions.length === 0 && (
                         <div className="py-12 text-center text-muted-foreground text-xs font-semibold">
                           No user questions recorded in local persistence.
                         </div>
                       )}
                     </div>
                   </div>

                   {/* Messaging Reply Modal */}
                   {selectedUserQuestion && (
                     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                       <div className="glass-card max-w-lg w-full p-8 relative space-y-6 animate-in zoom-in-95">
                         
                         <div className="flex justify-between items-start">
                           <div>
                             <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-wider mb-2">
                               FAQ Messaging System
                             </span>
                             <h3 className="font-display font-bold text-xl text-foreground">Conversation with {selectedUserQuestion.name}</h3>
                             <p className="text-[10px] text-muted-foreground/60 font-semibold">{selectedUserQuestion.email}</p>
                           </div>
                           <button onClick={() => setSelectedUserQuestion(null)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all text-foreground font-black">✕</button>
                         </div>
                         
                         {/* Conversation Thread */}
                         <div className="space-y-4 border-y border-border/40 py-4 max-h-[300px] overflow-y-auto">
                           {/* User Question */}
                           <div className="space-y-1 text-left">
                             <span className="text-[9px] font-black uppercase text-muted-foreground tracking-wider block">{selectedUserQuestion.name} (Client Question)</span>
                             <div className="bg-muted/40 p-4 rounded-2xl border border-border/40 text-xs text-foreground font-semibold leading-relaxed max-w-[85%] inline-block">
                               "{selectedUserQuestion.question}"
                             </div>
                             <span className="text-[8px] text-muted-foreground/50 font-medium block pl-1">{selectedUserQuestion.createdAt}</span>
                           </div>

                           {/* Admin Reply */}
                           {selectedUserQuestion.status === "answered" && selectedUserQuestion.reply && (
                             <div className="space-y-1 flex flex-col items-end text-right">
                               <span className="text-[9px] font-black uppercase text-primary tracking-wider block">TakeIN Studio Administrator</span>
                               <div className="bg-primary text-primary-foreground p-4 rounded-2xl text-xs font-semibold leading-relaxed max-w-[85%] text-left inline-block">
                                 {selectedUserQuestion.reply}
                               </div>
                               {selectedUserQuestion.replyAt && (
                                 <span className="text-[8px] text-muted-foreground/50 font-medium block pr-1">{selectedUserQuestion.replyAt}</span>
                               )}
                             </div>
                           )}
                         </div>

                         {/* Interactive Message Input Box */}
                         <form onSubmit={(e) => handleSendReply(e, selectedUserQuestion.id)} className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block text-left">
                             {selectedUserQuestion.status === "answered" ? "Update Administrative Response" : "Type Reply Message"}
                           </label>
                           <textarea
                             placeholder="Type a high-fidelity, helpful reply message to display on the FAQ page..."
                             rows={3}
                             value={adminReplyText}
                             onChange={(e) => setAdminReplyText(e.target.value)}
                             className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold leading-relaxed text-foreground"
                             required
                           />

                           <div className="flex justify-end gap-3 pt-2">
                             <button 
                               type="button" 
                               onClick={() => setSelectedUserQuestion(null)} 
                               className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-muted transition-all"
                             >
                               Discard
                             </button>
                             <button 
                               type="submit" 
                               className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all hover:scale-102"
                             >
                               Send Message <Send size={12} />
                             </button>
                           </div>
                         </form>
                       </div>
                     </div>
                   )}
                 </div>
               )}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
