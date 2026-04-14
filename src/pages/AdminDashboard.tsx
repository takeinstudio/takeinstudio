import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, Users, FolderKanban, DollarSign, TrendingUp, Activity, 
  Eye, MousePointerClick, Sun, Moon, LayoutDashboard, LogOut, 
  MapPin, MessageSquare, Briefcase, Globe 
} from "lucide-react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/currency";
import { toast } from "sonner";

const revenueData = [
  { month: "Jan", revenue: 18000, inquiries: 45 },
  { month: "Feb", revenue: 22000, inquiries: 52 },
  { month: "Mar", revenue: 28000, inquiries: 61 },
  { month: "Apr", revenue: 24000, inquiries: 48 },
  { month: "May", revenue: 32000, inquiries: 75 },
  { month: "Jun", revenue: 38000, inquiries: 89 },
  { month: "Jul", revenue: 35000, inquiries: 82 },
  { month: "Aug", revenue: 42000, inquiries: 95 },
  { month: "Sep", revenue: 39000, inquiries: 88 },
  { month: "Oct", revenue: 45000, inquiries: 110 },
  { month: "Nov", revenue: 48000, inquiries: 125 },
  { month: "Dec", revenue: 52000, inquiries: 140 },
];

const locationData = [
  { name: "USA", value: 35, color: "hsl(200, 70%, 50%)" },
  { name: "India", value: 30, color: "hsl(18, 80%, 55%)" },
  { name: "UK", value: 15, color: "hsl(220, 15%, 40%)" },
  { name: "Europe", value: 10, color: "hsl(25, 30%, 80%)" },
  { name: "Others", value: 10, color: "hsl(25, 40%, 90%)" },
];

const clients = [
  { 
    name: "Elevate Co.", 
    project: "Website Redesign", 
    status: "Active", 
    budget: 24000, 
    location: "USA",
    work: "Frontend + Backend Overhaul"
  },
  { 
    name: "NovaTech", 
    project: "Mobile App", 
    status: "Active", 
    budget: 45000, 
    location: "India",
    work: "React Native Development"
  },
  { 
    name: "PureForm", 
    project: "Branding", 
    status: "Completed", 
    budget: 12000, 
    location: "UK",
    work: "Logo & Identity System"
  },
  { 
    name: "Zenith Labs", 
    project: "Web Platform", 
    status: "In Review", 
    budget: 38000, 
    location: "Germany",
    work: "E-learning Platform Build"
  },
];

const statCards = [
  { icon: Users, label: "Total Clients", value: "182", change: "+12%", color: "text-primary" },
  { icon: MessageSquare, label: "Inquiries", value: "1,240", change: "+24%", color: "text-accent" },
  { icon: DollarSign, label: "Revenue", value: "$52,000", change: "+18%", color: "text-primary" },
  { icon: Globe, label: "Global Reach", value: "14 Countries", change: "+2", color: "text-accent" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

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

  const handleAddClient = () => {
    toast.success("Opening safe-vault for new client entry...");
  };

  const statusColor = (s: string) => {
    if (s === "Active") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (s === "Completed") return "bg-primary/10 text-primary";
    if (s === "In Review") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-muted text-muted-foreground";
  };

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
            { icon: Users, label: "Clients" },
            { icon: Briefcase, label: "Projects" },
            { icon: MessageSquare, label: "Inquiries" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Globe, label: "Geographic" },
          ].map((item) => (
            <div 
              key={item.label}
              onClick={() => {
                setActiveTab(item.label);
                toast.info(`Navigating to ${item.label}...`);
              }}
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
        <header className="h-20 border-b border-border/50 px-8 flex items-center justify-between sticky top-0 bg-background/60 backdrop-blur-xl z-20">
          <div>
            <h1 className="font-display text-2xl font-bold">{activeTab}</h1>
            <p className="text-xs text-muted-foreground">Welcome back, Administrator</p>
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

        <motion.div 
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="p-8 space-y-8"
        >
          {/* Bento Stat Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {statCards.map((s) => (
              <motion.div 
                key={s.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="clay-card p-6 flex flex-col justify-between h-40 group border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl bg-background/50 flex items-center justify-center ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full">{s.change}</span>
                </div>
                <div className="text-foreground">
                  <h4 className="text-sm text-muted-foreground font-medium">{s.label}</h4>
                  <p className="text-2xl font-bold font-display">{s.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Revenue & Inquiries Chart */}
            <motion.div variants={itemVariants} className="xl:col-span-2 clay-card p-8 border border-white/10">
              <div className="flex justify-between items-end mb-8 text-foreground">
                <div>
                  <h3 className="font-display text-xl font-bold">Growth Synergy</h3>
                  <p className="text-sm text-muted-foreground">Monthly revenue vs Contact inquiries</p>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(18, 80%, 55%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(18, 80%, 55%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.4)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.4)' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(18, 80%, 55%)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="inquiries" stroke="hsl(200, 70%, 50%)" strokeWidth={3} fillOpacity={1} fill="url(#colorInq)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Geographic Distribution */}
            <motion.div variants={itemVariants} className="clay-card p-8 border border-white/10">
              <h3 className="font-display text-xl font-bold mb-6 text-foreground">Visitor Origin</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 mt-8">
                {locationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Detailed Clients Table */}
          <motion.div variants={itemVariants} className="clay-card overflow-hidden border border-white/10">
            <div className="p-8 border-b border-border/50 flex flex-col sm:flex-row justify-between gap-4 text-foreground">
              <div>
                <h3 className="font-display text-xl font-bold">Client Portfolios</h3>
                <p className="text-sm text-muted-foreground">Tracking ongoing works and strategic value</p>
              </div>
              <button 
                onClick={handleAddClient}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-2xl text-sm font-bold shadow-glow hover:scale-105 transition-all"
              >
                Add New Client
              </button>
            </div>
            
            <div className="overflow-x-auto text-foreground">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30 text-left text-xs uppercase tracking-widest text-muted-foreground">
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
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase size={14} className="text-muted-foreground" />
                          <span>{c.work}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          <span>{c.location}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right font-bold font-display">
                        {formatPrice(c.budget)}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-block px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider ${statusColor(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
