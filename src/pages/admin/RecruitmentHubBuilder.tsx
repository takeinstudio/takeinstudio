import { useState } from "react";
import { Search, Filter, MoreVertical, Briefcase, Mail, Phone, Calendar, Download, ExternalLink, CheckCircle2, Clock, XCircle, AlertCircle, Edit } from "lucide-react";
import { supabase } from '@/lib/supabase';

const STATUS_COLORS: Record<string, string> = {
  "New": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Reviewing": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "Interview Scheduled": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Assessment Sent": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Shortlisted": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Rejected": "bg-red-500/10 text-red-500 border-red-500/20",
  "Hired": "bg-green-500/10 text-green-600 border-green-500/20",
};

export default function RecruitmentHubBuilder({ data, fetchData }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const applications = data.careers || [];

  const statuses = ["All", "New", "Reviewing", "Interview Scheduled", "Assessment Sent", "Shortlisted", "Rejected", "Hired"];

  const filteredApps = applications.filter((app: any) => {
    const matchesSearch = app.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || (app.status || "New") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCount = (status: string) => {
    return applications.filter((a: any) => (a.status || "New") === status).length;
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await supabase.from('careers').update({ status: newStatus }).eq('id', id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const deleteApplication = async (id: number) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await supabase.from('careers').delete().eq('id', id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error deleting application");
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto custom-scrollbar pr-2">
      
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "New Applications", count: getCount("New"), icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Reviewing", count: getCount("Reviewing"), icon: Clock, color: "text-yellow-600", bg: "bg-yellow-500/10" },
          { label: "Interviews", count: getCount("Interview Scheduled"), icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Hired", count: getCount("Hired"), icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" }
        ].map((metric, i) => (
          <div key={i} className="bg-card border border-border/50 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:border-primary/30 transition-colors cursor-pointer" onClick={() => setStatusFilter(metric.label.includes("New") ? "New" : metric.label.includes("Review") ? "Reviewing" : metric.label.includes("Interview") ? "Interview Scheduled" : "Hired")}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bg} ${metric.color}`}>
              <metric.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{metric.count}</p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-72 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search candidates..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:border-primary outline-none"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
          {statuses.map(s => (
            <button 
              key={s} 
              onClick={() => setStatusFilter(s)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === s ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        {filteredApps.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-card border border-dashed border-border/60 rounded-3xl">
            <p className="text-muted-foreground text-sm font-medium">No applications found.</p>
          </div>
        ) : filteredApps.map((app: any) => {
          const currentStatus = app.status || "New";
          return (
            <div key={app.id} className="bg-card border border-border/50 hover:border-primary/30 rounded-2xl p-6 shadow-sm transition-all flex flex-col relative group">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">{app.name}</h3>
                  <p className="text-sm text-primary font-medium">{app.role}</p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <select 
                    value={currentStatus}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full outline-none appearance-none cursor-pointer border ${STATUS_COLORS[currentStatus] || STATUS_COLORS["New"]}`}
                  >
                    {statuses.filter(s => s !== "All").map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Briefcase size={14} className="text-foreground/40" />
                  <span className="font-medium text-foreground/80">{app.experience || "Not specified"} experience</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail size={14} className="text-foreground/40" />
                  <a href={`mailto:${app.email}`} className="hover:text-primary transition-colors">{app.email}</a>
                </div>
                {app.phone && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone size={14} className="text-foreground/40" />
                    <span>{app.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} className="text-foreground/40" />
                  <span>Applied on {new Date(app.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {app.message && (
                <div className="bg-muted/30 rounded-xl p-3 mb-6 text-xs text-muted-foreground line-clamp-3">
                  <span className="font-semibold block mb-1">Cover Letter:</span>
                  {app.message}
                </div>
              )}

              <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border/50 pt-4">
                {app.resume_url ? (
                  <a href={app.resume_url.startsWith('http') ? app.resume_url : `https://${app.resume_url}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                    <Download size={14} /> Resume
                  </a>
                ) : (
                  <button disabled className="flex justify-center items-center gap-1.5 bg-muted/50 text-muted-foreground/50 px-3 py-2 rounded-lg text-xs font-bold cursor-not-allowed">
                    No Resume
                  </button>
                )}
                {app.portfolio ? (
                  <a href={app.portfolio.startsWith('http') ? app.portfolio : `https://${app.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-1.5 bg-muted text-foreground hover:bg-muted/80 px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                    <ExternalLink size={14} /> Portfolio
                  </a>
                ) : (
                  <button disabled className="flex justify-center items-center gap-1.5 bg-muted/50 text-muted-foreground/50 px-3 py-2 rounded-lg text-xs font-bold cursor-not-allowed">
                    No Portfolio
                  </button>
                )}
              </div>
              
              <button onClick={() => deleteApplication(app.id)} className="absolute top-4 right-4 p-2 bg-destructive/10 text-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white">
                <XCircle size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
