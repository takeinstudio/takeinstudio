import { useState, useEffect } from "react";
import { GripVertical, Eye, EyeOff, Save, Loader2, LayoutDashboard, Settings2, RefreshCw } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { Reorder } from "framer-motion";

const defaultSections = [
  { id: "hero", name: "Hero Section", visible: true },
  { id: "tech", name: "Technology Stack", visible: true },
  { id: "launch", name: "Active Launch CTA", visible: true },
  { id: "services", name: "Services Preview", visible: true },
  { id: "pricing", name: "Pricing Cards", visible: true },
  { id: "testimonials", name: "Testimonials", visible: true },
  { id: "stats", name: "Statistics", visible: true }
];

export default function HomePageBuilder({ data, fetchData }: any) {
  const [sections, setSections] = useState<any[]>(defaultSections);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  
  // Hero Text State
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  // Testimonials Text State
  const [testiTitle, setTestiTitle] = useState("");
  const [testiSubtitle, setTestiSubtitle] = useState("");
  
  // Iframe Refresh Key
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (data && data.content) {
      const dbContent = data.content;
      
      // Load Sections
      let sectionsConfigStr = null;
      if (Array.isArray(dbContent)) {
        const row = dbContent.find(c => c.section_key === 'home_sections');
        if (row) sectionsConfigStr = row.text_value;
        
        const titleRow = dbContent.find((c: any) => c.section_key === 'home_hero_title');
        if (titleRow) setHeroTitle(titleRow.text_value);
        
        const subtitleRow = dbContent.find((c: any) => c.section_key === 'home_hero_subtitle');
        if (subtitleRow) setHeroSubtitle(subtitleRow.text_value);

        const tTitleRow = dbContent.find((c: any) => c.section_key === 'home_testi_title');
        if (tTitleRow) setTestiTitle(tTitleRow.text_value);
        
        const tSubtitleRow = dbContent.find((c: any) => c.section_key === 'home_testi_subtitle');
        if (tSubtitleRow) setTestiSubtitle(tSubtitleRow.text_value);
      } else {
        if (dbContent['home_sections']) sectionsConfigStr = dbContent['home_sections'];
        if (dbContent['home_hero_title']) setHeroTitle(dbContent['home_hero_title']);
        if (dbContent['home_hero_subtitle']) setHeroSubtitle(dbContent['home_hero_subtitle']);
        if (dbContent['home_testi_title']) setTestiTitle(dbContent['home_testi_title']);
        if (dbContent['home_testi_subtitle']) setTestiSubtitle(dbContent['home_testi_subtitle']);
      }
      
      if (sectionsConfigStr) {
        try {
          const parsed = JSON.parse(sectionsConfigStr);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSections(parsed);
          }
        } catch (e) {
          console.error("Failed to parse home_sections from DB", e);
        }
      }
    }
  }, [data]);

  const toggleVisibility = (id: string, e: any) => {
    e.stopPropagation();
    setSections(sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payloads = [
        { section_key: 'home_sections', text_value: JSON.stringify(sections) },
        { section_key: 'home_hero_title', text_value: heroTitle },
        { section_key: 'home_hero_subtitle', text_value: heroSubtitle },
        { section_key: 'home_testi_title', text_value: testiTitle },
        { section_key: 'home_testi_subtitle', text_value: testiSubtitle }
      ];
      
      await supabase.from('content').upsert(payloads, { onConflict: 'section_key' });
      await fetchData();
      setRefreshKey(prev => prev + 1); // Refresh iframe
    } catch (err) {
      console.error(err);
      alert("Error saving page layout.");
    }
    setSaving(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Bar */}
      <div className="bg-card border border-border/50 rounded-3xl p-4 shadow-sm mb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl"><LayoutDashboard size={20} /></div>
          <div>
            <h2 className="font-display font-bold text-lg leading-none mb-1 text-foreground">Page Builder</h2>
            <p className="text-muted-foreground text-xs font-medium">Visually manage your website content.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setRefreshKey(k => k + 1)}
            className="p-2.5 bg-muted text-muted-foreground rounded-xl hover:text-foreground transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {saving ? <Loader2 size={16} className="animate-spin"/> : <Save size={16} />} 
            {saving ? "Publishing..." : "Publish to Live Site"}
          </button>
        </div>
      </div>

      {/* 3-Column Workspace */}
      <div className="flex-1 flex flex-col xl:flex-row gap-4 min-h-0 overflow-y-auto xl:overflow-visible">
        
        {/* Left Column: Sections List */}
        <div className="w-full xl:w-[300px] shrink-0 bg-card border border-border/50 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[300px] xl:min-h-0">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Sections</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-2">
              {sections.map((section) => (
                <Reorder.Item 
                  key={section.id} 
                  value={section} 
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 border p-3 rounded-2xl cursor-pointer transition-all ${
                    activeSection === section.id ? 'border-primary shadow-sm bg-primary/5' : 
                    section.visible ? 'border-border/50 bg-card hover:border-border' : 'border-dashed border-border/30 bg-card opacity-60'
                  }`}
                >
                  <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary transition-colors p-1 -ml-1">
                    <GripVertical size={16} />
                  </div>
                  <div className={`flex-1 font-semibold text-sm ${activeSection === section.id ? 'text-primary' : 'text-foreground'}`}>
                    {section.name}
                  </div>
                  <button 
                    onClick={(e) => toggleVisibility(section.id, e)}
                    className={`p-1.5 rounded-lg transition-colors ${section.visible ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground hover:bg-muted'}`}
                  >
                    {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>

        {/* Center Column: Live Preview iframe */}
        <div className="flex-1 min-h-[500px] xl:min-h-0 bg-muted/20 border border-border/50 rounded-3xl overflow-hidden relative shadow-inner">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-card border border-border/50 px-4 py-1.5 rounded-full shadow-sm z-10 flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live Preview
          </div>
          {/* Iframe displaying the actual frontend */}
          <iframe 
            key={refreshKey}
            src="/" 
            className="w-full h-full border-none"
            title="Live Website Preview"
          />
        </div>

        {/* Right Column: Settings Drawer */}
        <div className="w-full xl:w-[350px] shrink-0 bg-card border border-border/50 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[400px] xl:min-h-0">
          <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center gap-2">
            <Settings2 size={18} className="text-muted-foreground" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
              {sections.find(s => s.id === activeSection)?.name} Settings
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
            
            {activeSection === "hero" ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Hero Headline</label>
                    <textarea 
                      value={heroTitle} 
                      onChange={e => setHeroTitle(e.target.value)} 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" 
                      rows={3}
                      placeholder="Build Digital Products That Help Businesses Grow"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Hero Subtitle</label>
                    <textarea 
                      value={heroSubtitle} 
                      onChange={e => setHeroSubtitle(e.target.value)} 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" 
                      rows={4}
                      placeholder="Websites, mobile apps, AI automation..."
                    />
                  </div>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-xs text-primary/80 leading-relaxed font-medium">
                  <span className="font-bold">Pro Tip:</span> Click "Publish to Live Site" to save changes and refresh the live preview window.
                </div>
              </>
            ) : activeSection === "testimonials" ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Section Title</label>
                    <input 
                      value={testiTitle} 
                      onChange={e => setTestiTitle(e.target.value)} 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      placeholder="What Our Clients Say"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Section Subtitle</label>
                    <textarea 
                      value={testiSubtitle} 
                      onChange={e => setTestiSubtitle(e.target.value)} 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" 
                      rows={3}
                      placeholder="Don't just take our word for it."
                    />
                  </div>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-xs text-primary/80 leading-relaxed font-medium mt-4">
                  <span className="font-bold">Note:</span> Actual testimonials are managed in the main "Testimonials" tab on the left.
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full pt-12 gap-3">
                <Settings2 size={32} className="opacity-20" />
                <p className="text-sm font-medium">No editable text fields for this section yet.</p>
                <p className="text-xs opacity-70">Use the left panel to toggle visibility or reorder.</p>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
