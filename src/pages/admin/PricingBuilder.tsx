import { useState, useEffect } from "react";
import { Plus, Settings, X, Save, Edit, Trash2, Sparkles, Loader2, Key, CheckCircle2, GripVertical } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { Reorder } from "framer-motion";

export default function PricingBuilder({ data, fetchData, token, unlockDefaultPricing, unlocking }: any) {
  const [selectedPricing, setSelectedPricing] = useState<any>(null);
  const [draftPricing, setDraftPricing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState("web-development");
  const [region, setRegion] = useState("IN");

  const pricingList = data.pricing || [];

  const [hasAttemptedAutoLoad, setHasAttemptedAutoLoad] = useState(false);

  useEffect(() => {
    if (pricingList.length === 0 && unlockDefaultPricing && !unlocking && !hasAttemptedAutoLoad) {
      setHasAttemptedAutoLoad(true);
      unlockDefaultPricing();
    }
  }, [pricingList.length, unlocking, unlockDefaultPricing, hasAttemptedAutoLoad]);

  const categories = [
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

  const handleEdit = (tier: any) => {
    setSelectedPricing(tier);
    setDraftPricing({
      ...tier,
      features: Array.isArray(tier.features) ? tier.features : (typeof tier.features === 'string' ? JSON.parse(tier.features || "[]") : [])
    });
  };

  const handleAddNew = () => {
    setSelectedPricing({ id: "new" });
    setDraftPricing({
      category: activeCategory,
      name: "New Tier",
      description: "Description of this tier",
      price_in: "₹4999",
      price_intl: "$99",
      is_popular: 0,
      features: ["Feature 1", "Feature 2"],
      cta_text: "Get Started"
    });
  };

  const savePricing = async () => {
    setSaving(true);
    try {
      const payload = {
        ...draftPricing,
        features: JSON.stringify(draftPricing.features),
        is_popular: draftPricing.is_popular ? 1 : 0
      };
      
      if (selectedPricing.id !== "new") {
        await supabase.from('pricing').update(payload).eq('id', selectedPricing.id);
      } else {
        await supabase.from('pricing').insert([payload]);
      }
      await fetchData();
      setSelectedPricing(null);
    } catch (err) {
      alert("Error saving pricing");
    }
    setSaving(false);
  };

  const deletePricing = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await supabase.from('pricing').delete().eq('id', selectedPricing.id);
      await fetchData();
      setSelectedPricing(null);
    } catch (err) {
      alert("Error deleting");
    }
  };

  const setFeaturesOrder = (newOrder: string[]) => {
    setDraftPricing({ ...draftPricing, features: newOrder });
  };

  const addFeature = () => {
    setDraftPricing({ ...draftPricing, features: [...draftPricing.features, "New Feature"] });
  };

  const updateFeature = (index: number, val: string) => {
    const newF = [...draftPricing.features];
    newF[index] = val;
    setDraftPricing({ ...draftPricing, features: newF });
  };

  const removeFeature = (index: number) => {
    const newF = draftPricing.features.filter((_:any, i:number) => i !== index);
    setDraftPricing({ ...draftPricing, features: newF });
  };

  const filteredPricing = pricingList.filter((p: any) => p.category === activeCategory);

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Canvas */}
      <div className={`flex-1 overflow-y-auto pr-4 custom-scrollbar transition-all duration-300 ${selectedPricing ? 'w-2/3' : 'w-full'}`}>
        
        {/* Top Controls */}
        <div className="flex flex-col gap-4 mb-8 bg-card border border-border/50 p-4 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-xl">Pricing Studio</h3>
            <div className="bg-muted/50 border border-border/50 p-1 rounded-full flex items-center shadow-inner">
              <button onClick={() => setRegion("IN")} className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${region === "IN" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}>🇮🇳 India</button>
              <button onClick={() => setRegion("INTL")} className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${region === "INTL" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}>🌍 International</button>
            </div>
            <button onClick={handleAddNew} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <Plus size={16}/> Add Plan
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setSelectedPricing(null); }} className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${activeCategory === cat.id ? "bg-primary/10 text-primary border border-primary/20" : "bg-card border border-border/50 text-muted-foreground hover:bg-muted"}`}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 items-stretch">
          {filteredPricing.map((tier: any) => {
            const isEditing = selectedPricing?.id === tier.id;
            const displayData = isEditing ? draftPricing : tier;
            return <PricingCardPreview key={tier.id} data={displayData} isEditing={isEditing} onClick={() => handleEdit(tier)} region={region} />;
          })}
          {selectedPricing?.id === "new" && (
            <PricingCardPreview key="new" data={draftPricing} isEditing={true} onClick={() => {}} region={region} />
          )}
          {filteredPricing.length === 0 && !selectedPricing && (
             <div className="col-span-full py-16 text-center bg-card border border-dashed border-border/60 rounded-3xl flex flex-col items-center justify-center gap-4">
               <p className="text-muted-foreground text-sm font-medium">No pricing plans created for {categories.find(c => c.id === activeCategory)?.name} yet.</p>
               <Loader2 className="animate-spin text-primary w-6 h-6"/>
               <p className="text-xs text-muted-foreground">Auto-loading default pricing...</p>
             </div>
          )}
        </div>
      </div>

      {/* Editor Drawer */}
      {selectedPricing && (
        <div className="w-[400px] shrink-0 bg-card border border-border/50 rounded-3xl shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-300">
          <div className="p-5 border-b border-border/50 flex justify-between items-center bg-muted/20">
            <h3 className="font-display font-bold text-lg">{selectedPricing.id === "new" ? "Add Plan" : "Edit Plan"}</h3>
            <button onClick={() => setSelectedPricing(null)} className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground"><X size={18}/></button>
          </div>
          
          <div className="p-5 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
            
            <div className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-xl">
              <label className="text-sm font-bold text-foreground">Highlight as Popular</label>
              <input type="checkbox" checked={draftPricing.is_popular == 1} onChange={(e) => setDraftPricing({...draftPricing, is_popular: e.target.checked ? 1 : 0})} className="w-5 h-5 accent-primary cursor-pointer" />
            </div>

            <div className="space-y-4 border-t border-border/50 pt-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Plan Name</label>
                <input type="text" value={draftPricing.name} onChange={e => setDraftPricing({...draftPricing, name: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Price (INR)</label>
                  <input type="text" value={draftPricing.price_in} onChange={e => setDraftPricing({...draftPricing, price_in: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-mono" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Price (USD)</label>
                  <input type="text" value={draftPricing.price_intl} onChange={e => setDraftPricing({...draftPricing, price_intl: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-mono" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Description</label>
                <textarea value={draftPricing.description} onChange={e => setDraftPricing({...draftPricing, description: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" rows={2}></textarea>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Button CTA Text</label>
                <input type="text" value={draftPricing.cta_text} onChange={e => setDraftPricing({...draftPricing, cta_text: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" />
              </div>
            </div>

            {/* Features Chip Editor */}
            <div className="border-t border-border/50 pt-4">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Features List</label>
                <button onClick={addFeature} className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-bold uppercase hover:bg-primary hover:text-white transition-all">+ Add</button>
              </div>
              
              <Reorder.Group axis="y" values={draftPricing.features} onReorder={setFeaturesOrder} className="space-y-2">
                {draftPricing.features.map((feat: string, i: number) => (
                  <Reorder.Item key={`${feat}-${i}`} value={feat} className="flex items-center gap-2 bg-muted/30 border border-border/50 p-2 rounded-lg relative overflow-hidden group">
                    <div className="w-6 h-full flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground shrink-0 hover:text-primary transition-colors">
                       <GripVertical size={14} />
                    </div>
                    <input 
                      type="text" 
                      value={feat} 
                      onChange={(e) => updateFeature(i, e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none border-none focus:ring-0 p-0 h-8"
                    />
                    <button onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-destructive shrink-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
            
          </div>

          <div className="p-5 border-t border-border/50 bg-muted/10 flex flex-col gap-3">
            <button onClick={savePricing} disabled={saving} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
              <Save size={16}/> {saving ? "Publishing..." : "Publish Plan"}
            </button>
            {selectedPricing.id !== "new" && (
              <button onClick={deletePricing} className="w-full bg-transparent text-destructive hover:bg-destructive/10 py-2.5 rounded-xl font-bold text-sm transition-all">
                Delete Plan
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PricingCardPreview({ data, isEditing, onClick, region }: any) {
  const price = region === "INTL" && data.price_intl ? data.price_intl : data.price_in;
  const features = Array.isArray(data.features) ? data.features : (typeof data.features === 'string' ? JSON.parse(data.features || "[]") : []);

  return (
    <div 
      onClick={onClick}
      className={`clay-card p-6 h-full flex flex-col cursor-pointer border-2 transition-all duration-300 relative overflow-hidden bg-card ${
        isEditing ? "border-primary shadow-xl ring-4 ring-primary/10" :
        data.is_popular == 1 ? "border-primary/50 shadow-lg bg-gradient-to-b from-primary/5 to-transparent hover:border-primary" : "border-border/50 hover:border-primary/30"
      }`}
    >
      {isEditing && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider animate-pulse z-30">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div> Editing
        </div>
      )}

      {data.is_popular == 1 && (
        <div className="absolute top-0 right-0 left-0 flex justify-center z-10">
          <span className="bg-primary text-primary-foreground text-[9px] uppercase font-bold tracking-widest px-3 py-0.5 rounded-b-lg flex items-center gap-1 shadow-sm">
            <Sparkles size={10} /> Most Popular
          </span>
        </div>
      )}

      <div className={`mt-${data.is_popular == 1 ? '4' : '0'}`}>
        <h3 className="font-display font-bold text-xl mb-1 text-foreground">{data.name}</h3>
        <div className="flex items-baseline gap-2 mt-4 mb-3">
          <span className={`text-3xl font-black font-display tracking-tight ${data.is_popular == 1 ? "text-primary" : "text-foreground"}`}>
            {price}
          </span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed mb-6 min-h-[48px]">{data.description}</p>
        
        <div className="border-t border-border/50 pt-5 mb-6">
          <ul className="space-y-3">
            {features.map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-tight">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`w-full py-3 rounded-xl text-xs font-bold tracking-wide text-center transition-all mt-auto ${data.is_popular == 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
        {data.cta_text || "Get Started"}
      </div>
    </div>
  );
}
