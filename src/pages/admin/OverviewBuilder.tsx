import { 
  Users, Briefcase, FileText, Send, Activity, Plus 
} from "lucide-react";

export default function OverviewBuilder({ data, setActiveTab }: { data: any, setActiveTab: (tab: string) => void }) {
  const leadsCount = data.leads?.length || 0;
  const careerCount = data.careers?.length || 0;
  const servicesCount = data.services?.length || 0;
  const pricingCount = data.pricing?.length || 0;

  const portfolioCount = (data.content?.find((c: any) => c.section_key === 'portfolio_items')?.text_value ? JSON.parse(data.content.find((c: any) => c.section_key === 'portfolio_items').text_value).length : 0);

  const recentActivity = [...(data.leads || []).map((l:any) => ({ type: 'lead', title: l.name, date: l.created_at })),
                          ...(data.careers || []).map((c:any) => ({ type: 'career', title: c.name, date: c.created_at }))]
                         .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                         .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card border border-border/50 p-6 rounded-3xl shadow-sm text-center md:text-left">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Welcome Back!</h2>
          <p className="text-muted-foreground text-sm mt-1">Here is the latest overview of your digital agency.</p>
        </div>
        <div className="md:text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Published</p>
          <p className="text-sm font-medium text-foreground">Today, 10:42 AM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Leads" value={leadsCount} icon={Send} />
        <MetricCard title="Applications" value={careerCount} icon={Users} />
        <MetricCard title="Portfolio Projects" value={portfolioCount} icon={Briefcase} />
        <MetricCard title="Pricing Plans" value={pricingCount} icon={FileText} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2"><Activity size={18} /> Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.type === 'lead' ? 'bg-primary/10 text-primary' : 'bg-blue-500/10 text-blue-500'}`}>
                  {act.type === 'lead' ? <Send size={16} /> : <Users size={16} />}
                </div>
                <div>
                  <p className="font-bold text-sm">New {act.type === 'lead' ? 'Lead' : 'Application'}: {act.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(act.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && <p className="text-sm text-muted-foreground">No recent activity.</p>}
          </div>
        </div>

        <div className="lg:col-span-1 bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => setActiveTab('services')} className="w-full text-left p-4 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors flex items-center gap-3 group">
              <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:scale-110 transition-transform"><Plus size={16} /></div>
              <span className="font-bold text-sm">Add Service</span>
            </button>
            <button onClick={() => setActiveTab('pricing')} className="w-full text-left p-4 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors flex items-center gap-3 group">
              <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:scale-110 transition-transform"><Plus size={16} /></div>
              <span className="font-bold text-sm">Add Pricing Plan</span>
            </button>
            <button onClick={() => setActiveTab('portfolio')} className="w-full text-left p-4 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors flex items-center gap-3 group">
              <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:scale-110 transition-transform"><Plus size={16} /></div>
              <span className="font-bold text-sm">Add Portfolio Item</span>
            </button>
            <button className="w-full text-left p-4 rounded-2xl border border-border/50 hover:bg-primary hover:border-primary transition-colors flex items-center gap-3 group mt-4 shadow-sm">
              <div className="bg-primary/20 text-primary group-hover:text-white p-2 rounded-xl group-hover:bg-white/20 transition-all"><Send size={16} /></div>
              <span className="font-bold text-sm group-hover:text-white transition-colors">Publish Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon }: any) {
  return (
    <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon size={20} />
        </div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
      </div>
      <p className="font-display text-4xl font-bold">{value}</p>
    </div>
  );
}
