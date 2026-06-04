import { useState, useEffect } from "react";
import { Monitor, Video, Palette, Megaphone, TrendingUp, Building, CheckCircle2, ShieldCheck, Smartphone, Code, Bot, Wrench, Globe, LayoutDashboard, Plus, Settings, X, Save, Loader2 } from "lucide-react";
import { supabase } from '@/lib/supabase';

// Helper to get icon component
export const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Monitor, Video, Palette, Megaphone, TrendingUp, Building, Smartphone, Code, Bot, Wrench, Globe, LayoutDashboard, Settings
  };
  return icons[iconName] || Monitor;
};

export default function ServicesBuilder({ data, fetchData, token, unlockDefaultServices, unlocking }: any) {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [draftService, setDraftService] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [hasAttemptedAutoLoad, setHasAttemptedAutoLoad] = useState(false);

  const services = data.services || [];

  useEffect(() => {
    if (services.length === 0 && unlockDefaultServices && !unlocking && !hasAttemptedAutoLoad) {
      setHasAttemptedAutoLoad(true);
      unlockDefaultServices();
    }
  }, [services.length, unlocking, unlockDefaultServices, hasAttemptedAutoLoad]);

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setDraftService({ 
      ...service, 
      offerings: Array.isArray(service.offerings) ? service.offerings.join("\n") : (typeof service.offerings === 'string' ? JSON.parse(service.offerings).join("\n") : ""),
      buttons: Array.isArray(service.buttons) ? JSON.stringify(service.buttons, null, 2) : (typeof service.buttons === 'string' ? service.buttons : JSON.stringify([{ text: "View Pricing", url: "/pricing", variant: "primary" }], null, 2))
    });
  };

  const handleAddNew = () => {
    const newSvc = { title: "New Service", description: "Description goes here.", icon: "Monitor", offerings: "", buttons: "[]" };
    setSelectedService({ id: "new" });
    setDraftService(newSvc);
  };

  const saveService = async () => {
    setSaving(true);
    try {
      const payload = {
        title: draftService.title,
        description: draftService.description,
        icon: draftService.icon,
        offerings: draftService.offerings.split("\n").map((f: string) => f.trim()).filter(Boolean),
        buttons: draftService.buttons ? JSON.parse(draftService.buttons) : []
      };
      
      if (selectedService.id !== "new") {
        await supabase.from('services').update(payload).eq('id', selectedService.id);
      } else {
        await supabase.from('services').insert([payload]);
      }
      await fetchData();
      setSelectedService(null);
    } catch (err) {
      alert("Error saving service data. Check JSON format.");
    }
    setSaving(false);
  };

  const deleteService = async () => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await supabase.from('services').delete().eq('id', selectedService.id);
      await fetchData();
      setSelectedService(null);
    } catch (err) {
      alert("Error deleting");
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Canvas - Visual Preview */}
      <div className={`flex-1 overflow-y-auto pr-4 custom-scrollbar transition-all duration-300 ${selectedService ? 'w-2/3' : 'w-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display font-bold text-xl">Services Canvas</h3>
            <p className="text-xs text-muted-foreground">Live preview of your service cards.</p>
          </div>
          <button onClick={handleAddNew} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus size={16}/> Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
          {services.map((s: any) => {
            const isEditing = selectedService?.id === s.id;
            const displayData = isEditing ? draftService : s;
            const offeringsList = isEditing ? draftService.offerings.split("\n").filter(Boolean) : (Array.isArray(s.offerings) ? s.offerings : JSON.parse(s.offerings || "[]"));
            
            return (
              <ServiceCardPreview 
                key={s.id} 
                data={displayData} 
                offerings={offeringsList} 
                isEditing={isEditing} 
                onClick={() => handleEdit(s)} 
              />
            );
          })}
          {selectedService?.id === "new" && (
            <ServiceCardPreview 
              key="new" 
              data={draftService} 
              offerings={draftService.offerings.split("\n").filter(Boolean)} 
              isEditing={true} 
              onClick={() => {}} 
            />
          )}
          {services.length === 0 && !selectedService && (
             <div className="col-span-full py-16 text-center bg-card border border-dashed border-border/60 rounded-3xl flex flex-col items-center justify-center gap-4">
               <Loader2 className="animate-spin text-primary w-6 h-6"/>
               <p className="text-xs text-muted-foreground">Auto-loading default services...</p>
             </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Settings Drawer */}
      {selectedService && (
        <div className="w-[380px] shrink-0 bg-card border border-border/50 rounded-3xl shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-300">
          <div className="p-5 border-b border-border/50 flex justify-between items-center bg-muted/20">
            <h3 className="font-display font-bold text-lg">{selectedService.id === "new" ? "Add Service" : "Edit Service"}</h3>
            <button onClick={() => setSelectedService(null)} className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground"><X size={18}/></button>
          </div>
          
          <div className="p-5 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Service Title</label>
              <input type="text" value={draftService.title} onChange={e => setDraftService({...draftService, title: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block flex justify-between">
                <span>Icon Name</span>
                <span className="text-[10px] lowercase normal-case opacity-70">Lucide icon</span>
              </label>
              <input type="text" value={draftService.icon} onChange={e => setDraftService({...draftService, icon: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Description</label>
              <textarea value={draftService.description} onChange={e => setDraftService({...draftService, description: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" rows={3}></textarea>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 flex justify-between block">
                <span>Offerings / Features</span>
                <span className="text-[10px] normal-case opacity-70">One per line</span>
              </label>
              <textarea value={draftService.offerings} onChange={e => setDraftService({...draftService, offerings: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-mono leading-relaxed focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" rows={6}></textarea>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block flex justify-between">
                <span>Buttons (JSON)</span>
              </label>
              <textarea value={draftService.buttons} onChange={e => setDraftService({...draftService, buttons: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs font-mono leading-relaxed focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" rows={4}></textarea>
            </div>
          </div>
          
          <div className="p-5 border-t border-border/50 bg-muted/10 flex flex-col gap-3">
            <button onClick={saveService} disabled={saving} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
              <Save size={16}/> {saving ? "Publishing..." : "Publish Changes"}
            </button>
            {selectedService.id !== "new" && (
              <button onClick={deleteService} className="w-full bg-transparent text-destructive hover:bg-destructive/10 py-2.5 rounded-xl font-bold text-sm transition-all">
                Delete Service
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCardPreview({ data, offerings, isEditing, onClick }: any) {
  const IconComponent = getIconComponent(data.icon);
  
  return (
    <div 
      onClick={onClick}
      className={`relative glass-card p-5 h-full group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 block overflow-hidden bg-card/30 backdrop-blur-md border cursor-pointer rounded-2xl ${isEditing ? 'border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20' : 'border-border/40 hover:border-primary/30'}`}
    >
      {isEditing && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div> Editing
        </div>
      )}
      
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-500 relative overflow-hidden">
        <IconComponent size={20} className="text-primary relative z-10" />
      </div>

      <h3 className="font-display font-bold text-lg mb-2 text-foreground flex items-center gap-1.5">
        {data.title || "Untitled Service"}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{data.description || "No description provided."}</p>

      {/* Offerings Preview */}
      {offerings && offerings.length > 0 && (
        <div className="pt-4 border-t border-border/30">
          <ul className="space-y-2">
            {offerings.slice(0, 4).map((off: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                <span>{off}</span>
              </li>
            ))}
            {offerings.length > 4 && (
              <li className="text-xs text-muted-foreground italic pl-6">+ {offerings.length - 4} more features</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
