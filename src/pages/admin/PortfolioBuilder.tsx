import { useState, useEffect } from "react";
import { Plus, Settings, X, Save, Edit, Trash2, Loader2, GripVertical, ArrowUpRight } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { Reorder } from "framer-motion";

const defaultPortfolio = [
  {
    id: "p1",
    title: "Education Platforms",
    category: "Education",
    desc: "A custom online learning management ecosystem engineered for global universities and student resources.",
    color: "from-primary/30 to-accent/20",
    features: ["Virtual Classrooms", "Progress Dashboards", "Seamless Payments"],
    image: "/aura_learn.png",
    website_link: "",
    case_study: "",
    section: "Solution Showcase",
    featured: true
  },
  {
    id: "p2",
    title: "Portfolio Websites",
    category: "Photographers",
    desc: "A premium portfolio showcase, automated scheduling, and instant booking platform for digital creators.",
    color: "from-accent/30 to-primary/20",
    features: ["Interactive Galleries", "Client Proofing", "Automated Booking"],
    image: "/prism_studio.png",
    website_link: "",
    case_study: "",
    section: "Solution Showcase",
    featured: false
  }
];

export default function PortfolioBuilder({ data, fetchData, unlockDefaultPortfolio, unlocking }: any) {
  const [items, setItems] = useState<any[]>(defaultPortfolio);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [draftItem, setDraftItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [hasAttemptedAutoLoad, setHasAttemptedAutoLoad] = useState(false);

  useEffect(() => {
    if (data && data.content) {
      const dbContent = data.content;
      let configStr = null;
      if (Array.isArray(dbContent)) {
        const row = dbContent.find(c => c.section_key === 'portfolio_items');
        if (row) configStr = row.text_value;
      } else if (dbContent['portfolio_items']) {
        configStr = dbContent['portfolio_items'];
      }
      
      if (configStr) {
        try {
          const parsed = JSON.parse(configStr);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        } catch (e) {
          console.error("Failed to parse portfolio_items from DB", e);
        }
      } else if (unlockDefaultPortfolio && !unlocking && !hasAttemptedAutoLoad) {
        setHasAttemptedAutoLoad(true);
        unlockDefaultPortfolio();
      }
    }
  }, [data, unlocking, unlockDefaultPortfolio, hasAttemptedAutoLoad]);

  const handleAddNew = () => {
    setSelectedItem({ id: "new" });
    setDraftItem({
      id: "new",
      title: "",
      category: "",
      desc: "",
      color: "from-primary/30 to-accent/20",
      features: [],
      image: "",
      website_link: "",
      case_study: "",
      section: "Solution Showcase",
      featured: false
    });
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setDraftItem({ ...item });
  };

  const handleReorder = (newOrder: any[]) => {
    setItems(newOrder);
  };

  const savePortfolio = async () => {
    setSaving(true);
    let newItems = [...items];
    
    if (selectedItem.id === "new") {
      const newItem = { ...draftItem, id: `p_${Date.now()}` };
      newItems = [newItem, ...newItems];
    } else {
      newItems = newItems.map(item => item.id === selectedItem.id ? draftItem : item);
    }

    try {
      const payload = {
        section_key: 'portfolio_items',
        text_value: JSON.stringify(newItems)
      };
      await supabase.from('content').upsert([payload], { onConflict: 'section_key' });
      await fetchData();
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      alert("Error saving portfolio item.");
    }
    setSaving(false);
  };

  const deletePortfolio = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setSaving(true);
    const newItems = items.filter(item => item.id !== selectedItem.id);
    
    try {
      const payload = {
        section_key: 'portfolio_items',
        text_value: JSON.stringify(newItems)
      };
      await supabase.from('content').upsert([payload], { onConflict: 'section_key' });
      await fetchData();
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting portfolio item.");
    }
    setSaving(false);
  };

  const addFeature = () => {
    setDraftItem({ ...draftItem, features: [...(draftItem.features || []), "New Feature"] });
  };

  const updateFeature = (index: number, val: string) => {
    const newF = [...(draftItem.features || [])];
    newF[index] = val;
    setDraftItem({ ...draftItem, features: newF });
  };

  const removeFeature = (index: number) => {
    const newF = (draftItem.features || []).filter((_:any, i:number) => i !== index);
    setDraftItem({ ...draftItem, features: newF });
  };

  const colorOptions = [
    { label: "Primary / Accent", val: "from-primary/30 to-accent/20" },
    { label: "Blue / Purple", val: "from-blue-600/20 to-purple-600/20" },
    { label: "Emerald / Teal", val: "from-emerald-600/20 to-teal-600/20" },
    { label: "Rose / Orange", val: "from-rose-500/20 to-orange-500/20" },
    { label: "Gray / Zinc", val: "from-gray-500/20 to-zinc-500/20" },
  ];

  const sections = [
    "Featured Client Work",
    "Solution Showcase",
    "Internal Products"
  ];

  const setFeaturesOrder = (newOrder: string[]) => setDraftItem({ ...draftItem, features: newOrder });

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Canvas */}
      <div className={`flex-1 overflow-y-auto pr-4 custom-scrollbar transition-all duration-300 ${selectedItem ? 'w-2/3' : 'w-full'}`}>
        
        <div className="flex justify-between items-center bg-card border border-border/50 p-6 rounded-3xl shadow-sm mb-8">
          <div>
            <h3 className="font-display font-bold text-xl">Portfolio Builder</h3>
            <p className="text-muted-foreground text-sm mt-1">Manage project case studies and showcase items.</p>
          </div>
          <button onClick={handleAddNew} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus size={16}/> Add Project
          </button>
        </div>

        <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item}>
              <PortfolioCardPreview 
                data={selectedItem?.id === item.id ? draftItem : item} 
                isEditing={selectedItem?.id === item.id} 
                onClick={() => handleEdit(item)} 
              />
            </Reorder.Item>
          ))}
          {selectedItem?.id === "new" && (
            <div className="opacity-80">
              <PortfolioCardPreview data={draftItem} isEditing={true} onClick={() => {}} />
            </div>
          )}
          {items.length === 0 && !selectedItem && (
             <div className="col-span-full py-16 text-center bg-card border border-dashed border-border/60 rounded-3xl flex flex-col items-center justify-center gap-4">
               <p className="text-muted-foreground text-sm font-medium">No portfolio items added yet.</p>
               {unlockDefaultPortfolio && (
                 <button onClick={unlockDefaultPortfolio} disabled={unlocking} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                   {unlocking ? <Loader2 className="animate-spin w-4 h-4"/> : <Plus className="w-4 h-4"/>} Load Industry Showcases
                 </button>
               )}
             </div>
          )}
        </Reorder.Group>
      </div>

      {/* Editor Drawer */}
      {selectedItem && (
        <div className="w-[400px] shrink-0 bg-card border border-border/50 rounded-3xl shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-300">
          <div className="p-5 border-b border-border/50 flex justify-between items-center bg-muted/20">
            <h3 className="font-display font-bold text-lg">{selectedItem.id === "new" ? "Add Project" : "Edit Project"}</h3>
            <button onClick={() => setSelectedItem(null)} className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground"><X size={18}/></button>
          </div>
          
          <div className="p-5 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
            
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Project Title</label>
                <input type="text" value={draftItem.title} onChange={e => setDraftItem({...draftItem, title: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Industry / Category</label>
                <input type="text" value={draftItem.category} onChange={e => setDraftItem({...draftItem, category: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Short Description</label>
                <textarea value={draftItem.desc} onChange={e => setDraftItem({...draftItem, desc: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" rows={3}></textarea>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Image URL</label>
                <input type="text" value={draftItem.image} onChange={e => setDraftItem({...draftItem, image: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="/image.png or https://" />
              </div>
            </div>

            <div className="border-t border-border/50 pt-4 mt-2 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Portfolio Section</label>
                <select 
                  value={draftItem.section || "Solution Showcase"} 
                  onChange={(e) => setDraftItem({...draftItem, section: e.target.value})}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
                >
                  {sections.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Theme Gradient</label>
                <select 
                  value={draftItem.color} 
                  onChange={(e) => setDraftItem({...draftItem, color: e.target.value})}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm"
                >
                  {colors.map(c => <option key={c.val} value={c.val}>{c.label}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-xl mt-4">
              <label className="text-sm font-bold text-foreground">Highlight as Featured</label>
              <input type="checkbox" checked={draftItem.featured === true} onChange={(e) => setDraftItem({...draftItem, featured: e.target.checked})} className="w-5 h-5 accent-primary cursor-pointer" />
            </div>

            <div className="border-t border-border/50 pt-4 mt-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Links (Optional)</label>
              <div className="space-y-3">
                <input type="text" value={draftItem.website_link || ""} onChange={e => setDraftItem({...draftItem, website_link: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="Live Website Link" />
                <input type="text" value={draftItem.case_study || ""} onChange={e => setDraftItem({...draftItem, case_study: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="Case Study URL" />
              </div>
            </div>

            {/* Features Editor */}
            <div className="border-t border-border/50 pt-4 mt-2">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Key Features & Tags</label>
                <button onClick={addFeature} className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-bold uppercase hover:bg-primary hover:text-white transition-all">+ Add</button>
              </div>
              
              <Reorder.Group axis="y" values={draftItem.features} onReorder={setFeaturesOrder} className="space-y-2">
                {draftItem.features.map((feat: string, i: number) => (
                  <Reorder.Item key={`${feat}-${i}`} value={feat} className="flex items-center gap-2 bg-muted/30 border border-border/50 p-2 rounded-lg relative group">
                    <div className="cursor-grab text-muted-foreground hover:text-primary"><GripVertical size={14} /></div>
                    <input type="text" value={feat} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 bg-transparent text-sm outline-none border-none focus:ring-0 p-0 h-6" />
                    <button onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-destructive shrink-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
            
          </div>

          <div className="p-5 border-t border-border/50 bg-muted/10 flex flex-col gap-3">
            <button onClick={savePortfolio} disabled={saving} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
              <Save size={16}/> {saving ? "Publishing..." : "Publish Item"}
            </button>
            {selectedItem.id !== "new" && (
              <button onClick={deletePortfolio} className="w-full bg-transparent text-destructive hover:bg-destructive/10 py-2.5 rounded-xl font-bold text-sm transition-all">
                Delete Item
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PortfolioCardPreview({ data, isEditing, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`glass-card h-full overflow-hidden p-4 border shadow-lg relative bg-card/30 backdrop-blur-md rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
        isEditing ? "border-primary ring-4 ring-primary/10 shadow-xl" : "border-border/50 hover:border-primary/20 hover:shadow-primary/5 hover:scale-[1.02]"
      }`}
    >
      {isEditing && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider animate-pulse z-30">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div> Editing
        </div>
      )}

      {data.featured && (
        <div className="absolute top-0 right-0 left-0 flex justify-center z-10">
          <span className="bg-primary text-primary-foreground text-[9px] uppercase font-bold tracking-widest px-3 py-0.5 rounded-b-lg shadow-sm">
            Featured Project
          </span>
        </div>
      )}
      
      {/* High-Fidelity Visual Container */}
      <div className="aspect-[16/10] rounded-xl overflow-hidden relative mb-4 shadow-inner">
        <div className={`absolute inset-0 bg-gradient-to-tr ${data.color} opacity-20 blur-md`} />
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-3 left-3 flex gap-2">
          {data.website_link && <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] px-2 py-1 rounded shadow-sm">Live Site</span>}
          {data.case_study && <span className="bg-primary/90 text-white text-[9px] px-2 py-1 rounded shadow-sm">Case Study</span>}
        </div>
      </div>

      {/* Content Block */}
      <div className="space-y-2 text-left flex-1">
        <span className="inline-block text-[9px] text-primary font-extrabold uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
          {data.category}
        </span>
        <h3 className="font-display font-bold text-base group-hover:text-primary transition-colors flex items-center gap-1 text-foreground">
          {data.title} <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
          {data.desc}
        </p>
      </div>

      {/* Deliverables tags at the bottom */}
      <div className="mt-4 pt-3 border-t border-border/10">
        <div className="flex flex-wrap gap-1.5">
          {data.features && data.features.slice(0, 3).map((feat: string, i: number) => (
            <span key={i} className="text-[9px] bg-foreground/5 dark:bg-white/5 border border-border/30 px-2 py-1 rounded-lg font-medium text-muted-foreground">
              {feat}
            </span>
          ))}
          {data.features && data.features.length > 3 && (
            <span className="text-[9px] text-muted-foreground px-1 py-1">+{data.features.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}
